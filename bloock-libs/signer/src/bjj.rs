use crate::entity::alg::SignAlg;
use crate::entity::dto::sign_request::SignRequest;
use crate::entity::dto::sign_response::SignResponse;
use crate::entity::dto::verify_request::VerifyRequest;
use crate::entity::dto::verify_response::VerifyResponse;
use crate::entity::signature::Signature;
use crate::{Signer, SignerError};
use async_trait::async_trait;
use bloock_babyjubjub_rs::{decompress_point, decompress_signature, verify, PrivateKey};
use bloock_hasher::HashAlg;
use bloock_http::{BloockHttpClient, Client};
use bloock_keys::certificates::GetX509Certficate;
use bloock_keys::entity::key::{Key, Local, Managed};
use bloock_keys::KeyType;
use num_bigint::BigInt;

pub struct BJJSigner {
    api_host: String,
    api_key: String,
}

impl BJJSigner {
    pub fn new(api_host: String, api_key: String) -> Self {
        Self {
            api_host,
            api_key,
        }
    }

    pub fn new_boxed(api_host: String, api_key: String) -> Box<Self> {
        Box::new(Self::new(api_host, api_key))
    }
}

#[async_trait(?Send)]
impl Signer for BJJSigner {
    async fn sign_local(
        &self,
        payload: &[u8],
        key: &Local,
        hash_alg: Option<HashAlg>,
    ) -> crate::Result<Signature> {
        let local = match key {
            Local::Key(k) => k.clone(),
            Local::Certificate(c) => c.key.clone(),
        };

        let subject = key
            .get_certificate(
                self.api_host.clone(),
                self.api_key.clone(),
            )
            .await
            .map(|s| s.tbs_certificate.subject.to_string()).ok();

        let private_key = local
            .private_key
            .clone()
            .ok_or_else(|| SignerError::InvalidSecretKey("no private key found".to_string()))?;
        let secret_key_hex =
            hex::decode(private_key).map_err(|e| SignerError::InvalidSecretKey(e.to_string()))?;
        let secret_key = PrivateKey::import(secret_key_hex)
            .map_err(|e| SignerError::InvalidSecretKey(e.to_string()))?;
        let public_key = secret_key.public();

        let hash_alg = hash_alg.unwrap_or(KeyType::from(Key::from(local)).default_hash_alg());
        let hash = hash_alg.hash(&[payload]);

        let mut final_hash = hash.as_ref();
        if hash_alg == HashAlg::None {
            final_hash = payload;
        }

        let signature = secret_key
            .sign(BigInt::from_signed_bytes_be(&final_hash))
            .unwrap();

        let signature = Signature {
            alg: SignAlg::Bjj,
            key: hex::encode(public_key.compress()),
            subject,
            signature: hex::encode(signature.compress()),
            message_hash: hex::encode(final_hash),
            hash_alg: Some(hash_alg),
        };

        Ok(signature)
    }

    async fn sign_managed(
        &self,
        payload: &[u8],
        key: &Managed,
        hash_alg: Option<HashAlg>,
        access_control: Option<String>,
    ) -> crate::Result<Signature> {
        let managed = match key {
            Managed::Key(k) => k.clone(),
            Managed::Certificate(c) => c.key.clone(),
        };

        let subject = key
            .get_certificate(
                self.api_host.clone(),
                self.api_key.clone(),
            )
            .await
            .map(|s| s.tbs_certificate.subject.to_string()).ok();

        let hash_alg =
            hash_alg.unwrap_or(KeyType::from(Key::from(managed.clone())).default_hash_alg());
        let hash = hash_alg.hash(&[payload]);

        let mut final_hash = hash.as_ref();
        if hash_alg == HashAlg::None {
            final_hash = payload;
        }
        let encoded_hash = hex::encode(final_hash);

        let http = BloockHttpClient::new(self.api_key.clone(), None);

        let req = SignRequest {
            key_id: managed.id.clone(),
            algorithm: "BJJ".to_string(),
            payload: encoded_hash.clone(),
            access_code: access_control.clone(),
        };
        let res: SignResponse = http
            .post_json(format!("{}/keys/v1/sign", self.api_host), req, None)
            .await
            .map_err(|e| SignerError::SignerError(e.to_string()))?;

        let signature = Signature {
            signature: res.signature,
            alg: SignAlg::BjjM,
            key: managed.public_key.clone(),
            subject,
            message_hash: encoded_hash,
            hash_alg: Some(hash_alg),
        };

        Ok(signature)
    }

    async fn verify_local(&self, payload: &[u8], signature: &Signature) -> crate::Result<bool> {
        let hash = signature
            .hash_alg
            .clone()
            .unwrap_or(HashAlg::Poseidon)
            .hash(&[payload]);

        let public_key_bytes = hex::decode(signature.key.clone())
            .map_err(|e| SignerError::InvalidPublicKey(e.to_string()))?;
        let prepare_public_key: [u8; 32] = public_key_bytes
            .try_into()
            .map_err(|_| SignerError::InvalidPublicKey("".to_string()))?;
        let pub_key = decompress_point(prepare_public_key)
            .map_err(|e| SignerError::InvalidPublicKey(e.to_string()))?;

        let signature_bytes = hex::decode(signature.signature.clone())
            .map_err(|e| SignerError::InvalidPublicKey(e.to_string()))?;
        let prepare_signature: [u8; 64] = signature_bytes
            .try_into()
            .map_err(|_| SignerError::InvalidPublicKey("".to_string()))?;
        let signature = decompress_signature(&prepare_signature)
            .map_err(|e| SignerError::InvalidPublicKey(e.to_string()))?;

        Ok(verify(
            pub_key,
            signature,
            BigInt::from_signed_bytes_be(&hash),
        ))
    }

    async fn verify_managed(&self, payload: &[u8], signature: &Signature) -> crate::Result<bool> {
        let hash = signature
            .hash_alg
            .clone()
            .unwrap_or(HashAlg::Poseidon)
            .hash(&[payload]);
        let http = BloockHttpClient::new(self.api_key.clone(), None);

        let req = VerifyRequest {
            public_key: signature.key.clone(),
            algorithm: "BJJ".to_string(),
            payload: hex::encode(hash),
            signature: signature.signature.clone(),
        };

        let res: VerifyResponse = match http
            .post_json(format!("{}/keys/v1/verify", self.api_host), req, None)
            .await
        {
            Ok(res) => res,
            Err(_) => return Ok(false),
        };

        Ok(res.verify)
    }
}

#[cfg(test)]
mod tests {
    use crate::bjj::BJJSigner;
    use crate::entity::alg::SignAlg;
    use crate::entity::signature::Signature;
    use crate::Signer;
    use bloock_keys::keys::local::LocalKey;
    use bloock_keys::keys::managed::ManagedKey;

    #[tokio::test]
    async fn test_sign_local_key_ok() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();

        let local_key_params = bloock_keys::keys::local::LocalKeyParams {
            key_type: bloock_keys::KeyType::BJJ,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();

        let string_payload = "hello world";

        let signer = BJJSigner::new(api_host, api_key);

        let signature = signer
            .sign_local(string_payload.as_bytes(), &local_key.clone().into(), None)
            .await
            .unwrap();

        assert_eq!(signature.alg, SignAlg::Bjj);
        assert_eq!(signature.key, local_key.key);

        let result = signer
            .verify_local(string_payload.as_bytes(), &signature)
            .await
            .unwrap();

        assert!(result);
    }

    #[tokio::test]
    async fn test_sign_local_invalid_private_key() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();

        let string_payload = "hello world";
        let local_key = LocalKey {
            key_type: bloock_keys::KeyType::BJJ,
            key: "".to_string(),
            private_key: Some(
                "04dfcc5681f773592f44e40cbb69e33996d510a517772dbb20958a64b64e443e87cd7c67f1b1fe44b63f05435ae817139091f6c9c473983800fbf6d2ea74c47b16".to_string(),
            ),
            mnemonic: None,
        };

        let c = BJJSigner::new(api_host, api_key);
        let result = c
            .sign_local(string_payload.as_bytes(), &local_key.into(), None)
            .await;
        assert!(result.is_err());
    }

    #[tokio::test]
    async fn test_verify_local_invalid_signature() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();

        let string_payload = "hello world";

        let signature = Signature {
            alg: SignAlg::Bjj,
            key: "815528548b274ae520adfa3bbfd4a594ecd926c654b6b8d696de7f708e9f6b95".to_string(),
            subject: None,
            signature: "24eea823bd8d78e8a506fc70a3934a0c3a9e5fb686a9709cae2e00bcf8abc200adef4d043d93ab5aaf8a5dbc5718a55d072e40af82a0cd264f19de7f3a952305".to_string(),
            message_hash: "2722645f0df167977477ce168442d752fda7e95d29f25fa156c991f8eabd7051".to_string(),
            hash_alg: None
        };

        let signer = BJJSigner::new(api_host, api_key);

        let result = signer
            .verify_local(string_payload.as_bytes(), &signature)
            .await
            .unwrap();

        assert!(!result);
    }

    #[tokio::test]
    async fn test_verify_local_invalid_public_key() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();

        let string_payload = "hello world";

        let signature = Signature {
            alg: SignAlg::Bjj,
            key: "04dfcc5681f773592f44e40cbb69e33996d510a517772dbb20958a64b64e443e87cd7c67f1b1fe44b63f05435ae817139091f6c9c473983800fbf6d2ea74c47b16".to_string(),
            subject: None,
            signature: "d32527ea82441e895a281b1022405e90d4f4dfd493586542dd6856b31d976a8dfd7e7dcb9093b063814ec4c6230a891a1e413d9f92c6288350791df5b2edfb02".to_string(),
            message_hash: "2722645f0df167977477ce168442d752fda7e95d29f25fa156c991f8eabd7051".to_string(),
            hash_alg: None
        };

        let signer = BJJSigner::new(api_host, api_key);

        let result = signer
            .verify_local(string_payload.as_bytes(), &signature)
            .await;

        assert!(result.is_err());
    }

    #[tokio::test]
    async fn test_verify_local_invalid_payload() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();

        let string_payload = "end world";

        let signature = Signature {
            alg: SignAlg::Bjj,
            key: "815528548b274ae520adfa3bbfd4a594ecd926c654b6b8d696de7f708e9f6b95".to_string(),
            subject: None,
            signature: "d32527ea82441e895a281b1022405e90d4f4dfd493586542dd6856b31d976a8dfd7e7dcb9093b063814ec4c6230a891a1e413d9f92c6288350791df5b2edfb02".to_string(),
            message_hash: "2722645f0df167977477ce168442d752fda7e95d29f25fa156c991f8eabd7051".to_string(),
            hash_alg: None
        };

        let signer = BJJSigner::new(api_host, api_key);

        let result = signer
            .verify_local(string_payload.as_bytes(), &signature)
            .await
            .unwrap();

        assert!(!result);
    }

    #[tokio::test]
    async fn test_sign_managed_ok() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();

        let managed_key_params = bloock_keys::keys::managed::ManagedKeyParams {
            name: None,
            key_type: bloock_keys::KeyType::BJJ,
            protection: bloock_keys::entity::protection_level::ProtectionLevel::SOFTWARE,
            expiration: None,
        };
        let managed_key =
            ManagedKey::new(&managed_key_params, api_host.clone(), api_key.clone())
                .await
                .unwrap();

        let string_payload = "hello world";

        let signer = BJJSigner::new(api_host, api_key);

        let signature = signer
            .sign_managed(
                string_payload.as_bytes(),
                &managed_key.clone().into(),
                None,
                None,
            )
            .await
            .unwrap();

        assert_eq!(signature.alg, SignAlg::BjjM);
        assert_eq!(signature.key, managed_key.public_key);

        let result = signer
            .verify_managed(string_payload.as_bytes(), &signature)
            .await
            .unwrap();
        assert!(result);

        let result = signer
            .verify_local(string_payload.as_bytes(), &signature)
            .await
            .unwrap();
        assert!(result);
    }

    #[tokio::test]
    async fn test_verify_managed_invalid_signature() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();

        let string_payload = "hello world";

        let managed_key_params = bloock_keys::keys::managed::ManagedKeyParams {
            name: None,
            key_type: bloock_keys::KeyType::BJJ,
            protection: bloock_keys::entity::protection_level::ProtectionLevel::SOFTWARE,
            expiration: None,
        };
        let managed_key =
            ManagedKey::new(&managed_key_params, api_host.clone(), api_key.clone())
                .await
                .unwrap();

        let signature = Signature {
            alg: SignAlg::BjjM,
            key: managed_key.id.to_string(),
            subject: None,
            signature: "3145022100c42e705c0c73f28341eec61d8dfa5c5be006a44e6c48b59103861a7c0914a1df022010b09d5de1d376ac3940b223ffd158e46f6e60d8a2e86f7224f951a850146920".to_string(),
            message_hash: "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945".to_string(),
            hash_alg: None
        };

        let signer = BJJSigner::new(api_host, api_key);

        let result: bool = signer
            .verify_managed(string_payload.as_bytes(), &signature)
            .await
            .unwrap();

        assert!(!result);
    }

    #[tokio::test]
    async fn test_verify_managed_invalid_key() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();

        let string_payload = "hello world";

        let signature = Signature {
            alg: SignAlg::BjjM,
            key: "00000000-0000-0000-0000-000000000000".to_string(),
            subject: None,
            signature: "3045022100c42e705c0c73f28341eec61d8dfa5c5be006a44e6c48b59103861a7c0914a1df022010b09d5de1d376ac3940b223ffd158e46f6e60d8a2e86f7224f951a850146920".to_string(),
            message_hash: "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945".to_string(),
            hash_alg: None
        };

        let signer = BJJSigner::new(api_host, api_key);

        let result = signer
            .verify_managed(string_payload.as_bytes(), &signature)
            .await
            .unwrap();

        assert_eq!(result, false);
    }

    #[tokio::test]
    async fn test_verify_managed_invalid_payload() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();

        let string_payload = "end world";

        let managed_key_params = bloock_keys::keys::managed::ManagedKeyParams {
            name: None,
            key_type: bloock_keys::KeyType::BJJ,
            protection: bloock_keys::entity::protection_level::ProtectionLevel::SOFTWARE,
            expiration: None,
        };
        let managed_key =
            ManagedKey::new(&managed_key_params, api_host.clone(), api_key.clone())
                .await
                .unwrap();

        let signature = Signature {
            alg: SignAlg::BjjM,
            key: managed_key.id.to_string(),
            subject: None,
            signature: "3045022100c42e705c0c73f28341eec61d8dfa5c5be006a44e6c48b59103861a7c0914a1df022010b09d5de1d376ac3940b223ffd158e46f6e60d8a2e86f7224f951a850146920".to_string(),
            message_hash: "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945".to_string(),
            hash_alg: None
        };

        let signer = BJJSigner::new(api_host, api_key);

        let result = signer
            .verify_managed(string_payload.as_bytes(), &signature)
            .await
            .unwrap();

        assert!(!result);
    }
}
