use crate::entity::alg::SignAlg;
use crate::entity::signature::Signature;
use crate::{Signer, SignerError};
use async_trait::async_trait;
use babyjubjub_rs::PrivateKey;
use bloock_hasher::poseidon::{check_poseidon_hash, Poseidon};
use bloock_hasher::Hasher;
use bloock_http::{BloockHttpClient, Client};
use bloock_keys::keys::local::LocalKey;
use bloock_keys::keys::managed::ManagedKey;
use serde::{Deserialize, Serialize};

#[derive(Serialize)]
struct SignRequest {
    key_id: String,
    algorithm: String,
    payload: String,
}

#[derive(Deserialize)]
struct SignResponse {
    signature: String,
}

#[derive(Serialize)]
struct VerifyRequest {
    key_id: String,
    algorithm: String,
    signature: String,
    payload: String,
}

#[derive(Deserialize)]
struct VerifyResponse {
    verify: bool,
}

pub struct BJJSigner {
    api_host: String,
    api_key: String,
}

impl BJJSigner {
    pub fn new(api_host: String, api_key: String) -> Self {
        Self { api_host, api_key }
    }

    pub fn new_boxed(api_host: String, api_key: String) -> Box<Self> {
        Box::new(Self::new(api_host, api_key))
    }
}

#[async_trait(?Send)]
impl Signer for BJJSigner {
    async fn sign_local(&self, payload: &[u8], key: &LocalKey<String>) -> crate::Result<Signature> {
        let private_key = key
            .private_key
            .clone()
            .ok_or_else(|| SignerError::InvalidSecretKey("no private key found".to_string()))?;
        let secret_key_hex =
            hex::decode(private_key).map_err(|e| SignerError::InvalidSecretKey(e.to_string()))?;
        let secret_key = PrivateKey::import(secret_key_hex)
            .map_err(|e| SignerError::InvalidSecretKey(e.to_string()))?;
        let public_key = secret_key.public();

        todo!()
    }

    async fn sign_managed(&self, payload: &[u8], key: &ManagedKey) -> crate::Result<Signature> {
        let hash: Vec<u8>;
        let is_poseidon_hash = check_poseidon_hash(payload);
        if is_poseidon_hash {
            hash = payload.to_vec();
        } else {
            hash = Poseidon::generate_hash(&[payload])[..].to_vec();
        }
        let encoded_hash = hex::encode(hash);

        let http = BloockHttpClient::new(self.api_key.clone());

        let req = SignRequest {
            key_id: key.id.clone(),
            algorithm: "BJJ".to_string(),
            payload: encoded_hash.clone(),
        };
        let res: SignResponse = http
            .post_json(format!("{}/keys/v1/sign", self.api_host), req, None)
            .await
            .map_err(|e| SignerError::SignerError(e.to_string()))?;

        let signature = Signature {
            signature: res.signature,
            alg: SignAlg::BjjM,
            kid: key.id.clone(),
            message_hash: encoded_hash,
        };

        Ok(signature)
    }

    async fn verify_local(&self, payload: &[u8], signature: &Signature) -> crate::Result<bool> {
        todo!()
    }

    async fn verify_managed(&self, payload: &[u8], signature: &Signature) -> crate::Result<bool> {
        let hash: [u8; 32] = Poseidon::generate_hash(&[payload]);

        let http = BloockHttpClient::new(self.api_key.clone());

        let req = VerifyRequest {
            key_id: signature.kid.clone(),
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
    use bloock_keys::keys::managed::ManagedKey;

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
        let managed_key = ManagedKey::new(&managed_key_params, api_host.clone(), api_key.clone())
            .await
            .unwrap();

        let string_payload = "hello world";

        let signer = BJJSigner::new(api_host, api_key);

        let signature = signer
            .sign_managed(string_payload.as_bytes(), &managed_key)
            .await
            .unwrap();

        assert_eq!(signature.alg, SignAlg::BjjM);
        assert_eq!(signature.kid, managed_key.id);

        let result = signer
            .verify_managed(string_payload.as_bytes(), &signature)
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
        let managed_key = ManagedKey::new(&managed_key_params, api_host.clone(), api_key.clone())
            .await
            .unwrap();

        let signature = Signature {
            alg: SignAlg::BjjM,
            kid: managed_key.id.to_string(),
            signature: "3145022100c42e705c0c73f28341eec61d8dfa5c5be006a44e6c48b59103861a7c0914a1df022010b09d5de1d376ac3940b223ffd158e46f6e60d8a2e86f7224f951a850146920".to_string(),
            message_hash: "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945".to_string(),
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
            kid: "00000000-0000-0000-0000-000000000000".to_string(),
            signature: "3045022100c42e705c0c73f28341eec61d8dfa5c5be006a44e6c48b59103861a7c0914a1df022010b09d5de1d376ac3940b223ffd158e46f6e60d8a2e86f7224f951a850146920".to_string(),
            message_hash: "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945".to_string(),
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
        let managed_key = ManagedKey::new(&managed_key_params, api_host.clone(), api_key.clone())
            .await
            .unwrap();

        let signature = Signature {
            alg: SignAlg::BjjM,
            kid: managed_key.id.to_string(),
            signature: "3045022100c42e705c0c73f28341eec61d8dfa5c5be006a44e6c48b59103861a7c0914a1df022010b09d5de1d376ac3940b223ffd158e46f6e60d8a2e86f7224f951a850146920".to_string(),
            message_hash: "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945".to_string(),
        };

        let signer = BJJSigner::new(api_host, api_key);

        let result = signer
            .verify_managed(string_payload.as_bytes(), &signature)
            .await
            .unwrap();

        assert!(!result);
    }
}
