use crate::{
    error::BridgeError,
    items::{
        AuthenticityServiceHandler, GetSignaturesRequest, GetSignaturesResponse, HashAlg,
        SignRequest, SignResponse, Signature, VerifyRequest, VerifyResponse,
    },
    server::response_types::RequestConfigData,
};
use async_trait::async_trait;
use bloock_core::{authenticity, record::entity::record::Record as RecordCore};
use bloock_hasher::HashAlg as HashAlgCore;
use bloock_keys::certificates::local::LocalCertificate as LocalCertificateCore;
use bloock_keys::certificates::managed::ManagedCertificate as ManagedCertificateCore;
use bloock_keys::entity::key::Key;
use bloock_keys::keys::local::LocalKey as LocalKeyCore;
use bloock_keys::keys::managed::ManagedKey as ManagedKeyCore;
use bloock_signer::entity::signature::Signature as SignatureCore;

pub struct AuthenticityServer {}

#[async_trait(?Send)]
impl AuthenticityServiceHandler for AuthenticityServer {
    async fn sign(&self, req: &SignRequest) -> Result<SignResponse, String> {
        let config_data = req.get_config_data()?;
        let client = authenticity::configure(config_data.clone());

        let req_record = req
            .clone()
            .record
            .ok_or_else(|| "no record provided".to_string())?;

        let record: RecordCore = req_record
            .try_into()
            .map_err(|e: BridgeError| e.to_string())?;

        let signer = req
            .clone()
            .signer
            .ok_or_else(|| "no signer provided".to_string())?;

        let hash_alg: Option<HashAlgCore> = signer
            .hash_alg
            .and_then(|h| HashAlg::from_i32(h))
            .and_then(|h| Some(HashAlgCore::from(h)));

        let key: Key = if let Some(managed_key) = signer.managed_key {
            let managed_key_core: ManagedKeyCore = managed_key.into();
            managed_key_core.into()
        } else if let Some(local_key) = signer.local_key {
            let local_key_core: LocalKeyCore<String> = local_key.into();
            local_key_core.into()
        } else if let Some(managed_certificate) = signer.managed_certificate {
            let managed_certificate_core: ManagedCertificateCore = managed_certificate.into();
            managed_certificate_core.into()
        } else if let Some(local_certificate) = signer.local_certificate {
            let local_certificate_core: LocalCertificateCore<String> = local_certificate
                .try_into()
                .map_err(|e: BridgeError| e.to_string())?;
            local_certificate_core.into()
        } else {
            return Err("invalid key provided".to_string());
        };

        let signature: SignatureCore = client
            .sign(record, &key, hash_alg)
            .await
            .map_err(|e| e.to_string())?;

        Ok(SignResponse {
            signature: Some(signature.into()),
            error: None,
        })
    }

    async fn verify(&self, req: &VerifyRequest) -> Result<VerifyResponse, String> {
        let config_data = req.get_config_data()?;
        let client = authenticity::configure(config_data);

        let req_record = req
            .clone()
            .record
            .ok_or_else(|| "no record provided".to_string())?;

        let record: RecordCore = req_record
            .try_into()
            .map_err(|e: BridgeError| e.to_string())?;

        let valid = client.verify(record).await.map_err(|e| e.to_string())?;

        Ok(VerifyResponse { valid, error: None })
    }

    async fn get_signatures(
        &self,
        req: &GetSignaturesRequest,
    ) -> Result<GetSignaturesResponse, String> {
        let record: RecordCore = req
            .clone()
            .record
            .ok_or_else(|| "invalid record provided".to_string())?
            .try_into()
            .map_err(|e: BridgeError| e.to_string())?;

        let signatures: Vec<Signature> = record
            .get_signatures()
            .unwrap_or_default()
            .iter()
            .map(|signature| signature.clone().into())
            .collect();

        Ok(GetSignaturesResponse {
            signatures,
            error: None,
        })
    }
}
