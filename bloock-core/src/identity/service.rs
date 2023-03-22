use crate::config::entity::network::Network;
use crate::error::BloockResult;
use crate::integrity::entity::proof::Proof;
use crate::integrity::service::IntegrityService;
use crate::shared::util;
use crate::{availability::service::AvailabilityService, config::service::ConfigService};
use async_std::task;
use bloock_http::Client;
use bloock_identity::did::Did;
use bloock_keys::local::{LocalKey, LocalKeyParams};
use bloock_signer::entity::signature::Signature;
use bloock_signer::local::ecdsa::LocalEcdsaSigner;
use bloock_signer::{create_verifier_from_signature, Signer};
use serde_json::{json, Map, Number, Value};
use std::sync::Arc;
use std::time::Duration;

use super::entity::credential::Credential;
use super::entity::credential_offer::CredentialOffer;
use super::entity::credential_verification::CredentialVerification;
use super::entity::dto::create_credential_request::CreateCredentialRequest;
use super::entity::dto::create_credential_response::CreateCredentialResponse;
use super::entity::dto::get_credential_revocation_response::GetCredentialRevocationResponse;
use super::entity::dto::get_offer_response::GetOfferResponse;
use super::entity::dto::redeem_credential_request::RedeemCredentialRequest;
use super::entity::dto::redeem_credential_response::RedeemCredentialResponse;
use super::entity::dto::revoke_credential_request::RevokeCredentialRequest;
use super::entity::dto::revoke_credential_response::RevokeCredentialResponse;
use super::entity::revocation_result::RevocationResult;
use super::entity::schema::Attribute;
use super::{
    entity::{
        dto::{
            create_schema_request::CreateSchemaRequest,
            create_schema_response::CreateSchemaResponse,
        },
        identity::Identity,
        schema::Schema,
    },
    IdentityError,
};

pub struct IdentityService<H: Client> {
    pub http: Arc<H>,
    pub availability_service: AvailabilityService<H>,
    pub integrity_service: IntegrityService<H>,
    pub config_service: ConfigService,
}

impl<H: Client> IdentityService<H> {
    pub async fn create_identity(&self) -> BloockResult<Identity> {
        let key = LocalKey::new(&LocalKeyParams {
            key_type: bloock_keys::KeyType::EcP256k,
        })
        .map_err(|_| IdentityError::CreateKeyError())?;

        let private_key = key.private_key.ok_or(IdentityError::CreateKeyError())?;
        let mnemonic = key.mnemonic.ok_or(IdentityError::CreateKeyError())?;

        Ok(Identity {
            mnemonic,
            key: key.key,
            private_key,
        })
    }

    pub async fn load_identity(&self, mnemonic: String) -> BloockResult<Identity> {
        let key = LocalKey::load_mnemonic(bloock_keys::KeyType::EcP256k, mnemonic)
            .map_err(|_| IdentityError::LoadKeyError())?;

        let private_key = key.private_key.ok_or(IdentityError::CreateKeyError())?;
        let mnemonic = key.mnemonic.ok_or(IdentityError::CreateKeyError())?;

        Ok(Identity {
            mnemonic,
            key: key.key,
            private_key,
        })
    }

    pub async fn build_schema(
        &self,
        display_name: String,
        technical_name: String,
        attributes: Vec<Attribute>,
    ) -> BloockResult<Schema> {
        let mut attr = Map::new();
        for a in attributes {
            let r#type = a.r#type;
            let values = a.values;
            attr.insert(a.name, json!({ "type": r#type, "values": values }));
        }

        let req = CreateSchemaRequest {
            attributes: serde_json::to_value(attr)
                .map_err(|e| IdentityError::CreateSchemaError(e.to_string()))?,
            schema_name: display_name,
            schema_type: technical_name,
        };

        let res: CreateSchemaResponse = self
            .http
            .post_json(
                format!(
                    "{}/identity/v1/issuers/schemas",
                    self.config_service.get_api_base_url()
                ),
                req,
                None,
            )
            .await
            .map_err(|e| IdentityError::CreateSchemaError(e.to_string()))?;

        self.get_schema(res.cid).await
    }

    pub async fn get_schema(&self, id: String) -> BloockResult<Schema> {
        let res = self
            .availability_service
            .retrieve_ipfs(id.clone())
            .await
            .map_err(|e| IdentityError::SchemaParseError(e.to_string()))?;

        let json: Value = serde_json::from_slice(&res)
            .map_err(|e| IdentityError::SchemaParseError(e.to_string()))?;

        Ok(Schema {
            cid: id,
            json: json.to_string(),
        })
    }

    pub async fn create_credential(
        &self,
        schema_id: String,
        holder_key: String,
        attributes: Vec<(String, i64)>,
    ) -> BloockResult<CreateCredentialResponse> {
        let mut map = Map::new();

        for attribute in attributes.iter() {
            map.insert(
                attribute.0.clone(),
                Value::Number(Number::from(attribute.1)),
            );
        }

        let credential_subject = Value::Object(map);

        let req = CreateCredentialRequest {
            schema_cid: schema_id,
            credential_subject,
            expiration: 0,
        };

        let did =
            Did::from_public_key(holder_key).map_err(|_| IdentityError::InvalidKeyProvided())?;

        let res: CreateCredentialResponse = self
            .http
            .post_json(
                format!(
                    "{}/identity/v1/claims?id={}",
                    self.config_service.get_api_base_url(),
                    did.to_string()
                ),
                req,
                None,
            )
            .await
            .map_err(|e| IdentityError::CreateCredentialError(e.to_string()))?;

        Ok(res)
    }

    pub async fn get_offer(&self, id: String) -> BloockResult<CredentialOffer> {
        let res: GetOfferResponse = self
            .http
            .get_json(
                format!(
                    "{}/identity/v1/claims/{}/offer",
                    self.config_service.get_api_base_url(),
                    id
                ),
                None,
            )
            .await
            .map_err(|e| IdentityError::GetOfferError(e.to_string()))?;

        let offer = res.try_into()?;
        Ok(offer)
    }

    pub async fn wait_offer(
        &self,
        offer_id: String,
        mut timeout: i64,
    ) -> BloockResult<CredentialOffer> {
        if timeout == 0 {
            timeout = 120000;
        }
        let config = self.config_service.get_config();

        let mut attempts = 0;
        let start = util::get_current_timestamp();
        let mut next_try = start + config.wait_message_interval_default;

        let timeout_time = start + timeout as u128;

        loop {
            if let Ok(offer) = self.get_offer(offer_id.clone()).await {
                return Ok(offer);
            }

            let mut current_time = util::get_current_timestamp();
            if current_time > timeout_time {
                return Err(IdentityError::OfferTimeoutError().into());
            }

            task::sleep(Duration::from_millis(1000)).await;

            current_time = util::get_current_timestamp();
            while current_time < next_try && current_time < timeout_time {
                task::sleep(Duration::from_millis(200)).await;
                current_time = util::get_current_timestamp();
            }

            if current_time >= timeout_time {
                return Err(IdentityError::OfferTimeoutError().into());
            }

            next_try += attempts * config.wait_message_interval_factor
                + config.wait_message_interval_default;
            attempts += 1;
        }
    }

    pub async fn redeem_credential(
        &self,
        id: String,
        thread_id: String,
        holder_private_key: String,
    ) -> BloockResult<Credential> {
        let key = LocalKey::load(
            bloock_keys::KeyType::EcP256k,
            "".to_string(),
            Some(holder_private_key),
        );
        let signer = LocalEcdsaSigner::new(key, None);
        let signature = signer
            .sign(id.as_bytes())
            .await
            .map_err(|e| IdentityError::RedeemCredentialError(e.to_string()))?;

        let req = RedeemCredentialRequest {
            thread_id,
            signature: signature.signature,
        };

        let res: RedeemCredentialResponse = self
            .http
            .post_json(
                format!(
                    "{}/identity/v1/claims/{}/redeem",
                    self.config_service.get_api_base_url(),
                    id
                ),
                req,
                None,
            )
            .await
            .map_err(|e| IdentityError::RedeemCredentialError(e.to_string()))?;

        let credential: Credential = res.try_into()?;
        Ok(credential)
    }

    pub async fn get_claim(&self, id: String) -> BloockResult<Value> {
        let res: Value = self
            .http
            .get_json(
                format!(
                    "{}/identity/v1/claims/{}",
                    self.config_service.get_api_base_url(),
                    id
                ),
                None,
            )
            .await
            .map_err(|e| IdentityError::GetCredentialError(e.to_string()))?;

        Ok(res)
    }

    pub async fn verify_credential(
        &self,
        credential: Credential,
    ) -> BloockResult<CredentialVerification> {
        let mut credential_payload = credential.clone();
        credential_payload.proof = None;

        let bloock_proof = credential
            .proof
            .clone()
            .ok_or(IdentityError::InvalidProofError())?
            .1;
        let timestamp = self.verify_credential_integrity(bloock_proof).await?;

        let signature_proof = credential
            .proof
            .clone()
            .ok_or(IdentityError::InvalidSignatureError())?
            .0;
        let payload_value = serde_json::to_value(&credential_payload).unwrap();
        let payload = serde_json::to_vec(&payload_value).unwrap();

        let signature_valid = self
            .verify_credential_signature(&payload, signature_proof)
            .await?;

        if !signature_valid {
            return Err(IdentityError::InvalidSignatureError().into());
        }

        let revocation = self
            .get_credential_revocation_status(credential.clone())
            .await?;

        Ok(CredentialVerification {
            timestamp,
            issuer: credential.issuer,
            revocation,
        })
    }

    pub async fn verify_credential_integrity(&self, proof: Proof) -> BloockResult<u128> {
        let network: Network = proof
            .anchor
            .networks
            .get(0)
            .ok_or(IdentityError::InvalidProofError())?
            .name
            .clone()
            .into();

        let root = self.integrity_service.verify_proof(proof)?;
        let timestamp = self.integrity_service.validate_root(root, network).await?;
        Ok(timestamp)
    }

    pub async fn verify_credential_signature(
        &self,
        payload: &[u8],
        signature: Signature,
    ) -> BloockResult<bool> {
        let verifier = create_verifier_from_signature(
            &signature,
            self.config_service.get_api_base_url(),
            self.config_service.get_api_key(),
        )
        .map_err(|_| IdentityError::InvalidSignatureError())?;

        let valid = verifier
            .verify(payload, signature)
            .await
            .map_err(|_| IdentityError::InvalidSignatureError())?;

        Ok(valid)
    }

    pub async fn get_credential_revocation_status(
        &self,
        credential: Credential,
    ) -> BloockResult<u128> {
        let res: GetCredentialRevocationResponse = self
            .http
            .get_json(credential.credential_status.id, None)
            .await
            .map_err(|e| IdentityError::RedeemCredentialError(e.to_string()))?;

        Ok(res.timestamp)
    }

    pub async fn revoke_credential(
        &self,
        credential: Credential,
    ) -> BloockResult<RevocationResult> {
        let req = RevokeCredentialRequest {};

        let res: RevokeCredentialResponse = self
            .http
            .post_json(
                format!(
                    "{}/identity/v1/{}/claims/revoke/{}",
                    self.config_service.get_api_base_url(),
                    credential.issuer,
                    credential.credential_status.revocation_nonce
                ),
                req,
                None,
            )
            .await
            .map_err(|e| IdentityError::RevokeCredentialError(e.to_string()))?;

        Ok(RevocationResult {
            success: res.success,
        })
    }
}

#[cfg(test)]
mod tests {
    use bloock_http::MockClient;
    use std::sync::Arc;

    use crate::{config::config_data::ConfigData, identity::entity::credential::Credential};

    #[tokio::test]
    async fn test_create_identity() {
        let http = MockClient::default();
        let service = crate::identity::configure_test(Arc::new(http));

        let identity = service.create_identity().await.unwrap();

        assert_ne!(identity.key, "".to_string());
        assert_ne!(identity.private_key, "".to_string());
        assert_ne!(identity.mnemonic, "".to_string());
    }

    #[tokio::test]
    async fn test_load_identity() {
        let mnemonic = "purse cart ill nothing climb cinnamon example kangaroo forum cause page thunder spend bike grain".to_string();

        let http = MockClient::default();
        let service = crate::identity::configure_test(Arc::new(http));

        let identity = service.load_identity(mnemonic.clone()).await.unwrap();

        assert_eq!(
            identity.key,
            "03e073e1608b3fabfe96d3bdafc80cb13acfbedcc34bf98f9a25c3ef5e5cb6c3d4".to_string()
        );
        assert_eq!(
            identity.private_key,
            "74b4c109fd4043c4e10e6aca50a1e91146407ccc4dff7c99419e16bf3ab89934".to_string()
        );
        assert_eq!(identity.mnemonic, mnemonic);
    }

    #[tokio::test]
    async fn test_verify_credential() {
        let credential_json = "{\"id\":\"https://api.bloock.com/identity/v1/claims/0f08f63c-0e31-4bb6-8fc3-28893bdeb7aa\",\"@context\":[\"https://www.w3.org/2018/credentials/v1\",\"https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/iden3credential-v2.json-ld\"],\"type\":[\"VerifiableCredential\",\"TestSchema\"],\"issuanceDate\":\"2023-03-22T12:32:33.239583166Z\",\"credentialSubject\":{\"BoolAttr\":0,\"id\":\"did:polygonid:polygon:mumbai:2qHCSnJzmiB9mP5L86h51d6i3FhEgcYg9AmUcUg8jg\",\"type\":\"TestSchema\"},\"credentialStatus\":{\"id\":\"https://api.bloock.com/identity/v1/did:iden3:eth:main:zzGodZP2enAnrp5LBcXVCigERQcTWJbCF67wBc7iJ/claims/revocation/status/1500049182\",\"revocationNonce\":1500049182,\"type\":\"BloockRevocationProof\"},\"issuer\":\"did:iden3:eth:main:zzGodZP2enAnrp5LBcXVCigERQcTWJbCF67wBc7iJ\",\"credentialSchema\":{\"id\":\"https://api.bloock.com/hosting/v1/ipfs/Qmcj962wRkypdbAopKLvcedSkBf33ctJaGJ8PkXiUTMm79\",\"type\":\"JsonSchemaValidator2018\"},\"proof\":[{\"header\":{\"alg\":\"ES256K_M\",\"kid\":\"230303a5-8aef-4e92-bc7c-e06f5c488784\"},\"message_hash\":\"7de2019ac52a160191f748bed783b3582d66cb025b963330c63397aa17503d97\",\"protected\":\"e30\",\"signature\":\"ISAqQwDBMaSSkmAYbifS-uC0UzfAtnA7fzz51G4KQov6JJZwMHOKKZoRblOzvcF2D_W_Bf8ukCZJOBXBMc0_5g==\",\"type\":\"BloockSignatureProof\"},{\"anchor\":{\"anchor_id\":296849,\"networks\":[{\"name\":\"bloock_chain\",\"state\":\"Confirmed\",\"tx_hash\":\"0x5ce3e8e3b4b8735f295dbd8a2e6d98077474177c6f0578f1096dabc60617d6bb\"}],\"root\":\"aa39de63e0fc71aaaa9253086116b24b8a964cd9ba2ab58e33ef2554c0c095c2\",\"status\":\"Success\"},\"bitmap\":\"ffefc0\",\"depth\":\"000100020004000600080009000b000c000d000e001100110010000f000a000700050003\",\"leaves\":[\"b8654cc90adb6ad348287a4017e335c2785be2ef93f16f940b86605fc36d5c97\"],\"nodes\":[\"f566fe90b22641e6c4c89b5a39ea3bd4400303bf7ffa12016325b81cc0984825\",\"408f4da6b4e5b09c26a58f066beb6d81588bc3afddc4b39288e6e80cfe58b45a\",\"79be2e105bfe45b3b91f6749fd66dd920a25dfb0c089a27b98705a012c08e6e6\",\"e270112ede50dfca26404a9a7812df5a777322dedb7421c80abb3061c60a1b35\",\"22eba74324f088f18425cc9e93c2b3a21bced8d5a6cfade4b874abba361ff920\",\"b72dfb3f491e53c4816e83fd607fdaf7c79f64fe563d3f55b16af8241fbe22a6\",\"1688d687f3507abcbf9ebfd286bc2eba0e69f6af585cf2461650d74713c0d670\",\"efc548462843bbb9ddef0965a0c646eeb71c78fd662babb2635722d02a97985b\",\"287a57e146ff9d469ae5b39f11343b3c9e55fdbdc7f4edd9f4ca8fba4bd268c7\",\"94644790f7cd155d3b58c60c3f021f30666e5cfeb683ab12d27fec78aa418397\",\"515ecaf2713b13b8ba615674b4a94694d30d33ce133addd8331af5e56032f4bd\",\"717127712b837d4747d78db3dc55c1e9ded34ff6c124db409c11a72f6c1b2d7d\",\"f6b8d2fdb44c2b0a0e12b5ec232a4097c3bc45db51d89af26e0432b84fe07aca\",\"a00deee4b96eacdd9ff30e4691d805221deb8284e6856c856611766cfa54721f\",\"7b1c1939a58bd75e0dda34d3de7fcaa2143f0b65ffc27645c6a513b819e70601\",\"fc749d3a915ce5429560c8bc4f73d47bcc9cadec8ef3e9779c0462447ae50475\",\"296a21e0117f26be026eb608be5b54f1e305ac241b248ef4e045ec9467f47047\"],\"type\":\"BloockIntegrityProof\"}]}";

        let config = ConfigData::new(
            option_env!("API_KEY").unwrap().to_string(),
            "Javascript".to_string(),
            true,
        );
        let service = crate::identity::configure(config);

        let credential: Credential = serde_json::from_str(credential_json).unwrap();
        let valid = service.verify_credential(credential).await.unwrap();

        assert!(valid.timestamp > 0);
        assert!(valid.revocation == 0);
        assert_eq!(
            valid.issuer,
            "did:iden3:eth:main:zzGodZP2enAnrp5LBcXVCigERQcTWJbCF67wBc7iJ".to_string()
        );
    }
}
