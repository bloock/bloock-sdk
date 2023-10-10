use crate::entity::alg::SignAlg;
use crate::entity::signature::Signature;
use crate::{Signer, SignerError};
use async_trait::async_trait;
use bloock_hasher::{keccak::Keccak256, sha256::Sha256, Hasher};
use bloock_http::{BloockHttpClient, Client};
use bloock_keys::keys::local::LocalKey;
use bloock_keys::keys::managed::ManagedKey;
use libsecp256k1::{Message, PublicKey, SecretKey};
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

pub struct EcdsaSigner {
    api_host: String,
    api_key: String,
}

impl EcdsaSigner {
    pub fn new(api_host: String, api_key: String) -> Self {
        Self { api_host, api_key }
    }

    pub fn new_boxed(api_host: String, api_key: String) -> Box<Self> {
        Box::new(Self::new(api_host, api_key))
    }
}

#[async_trait(?Send)]
impl Signer for EcdsaSigner {
    async fn sign_local(&self, payload: &[u8], key: &LocalKey<String>) -> crate::Result<Signature> {
        let private_key = key
            .private_key
            .clone()
            .ok_or_else(|| SignerError::InvalidSecretKey("no private key found".to_string()))?;
        let secret_key_hex =
            hex::decode(private_key).map_err(|e| SignerError::InvalidSecretKey(e.to_string()))?;
        let secret_key = SecretKey::parse_slice(&secret_key_hex)
            .map_err(|e| SignerError::InvalidSecretKey(e.to_string()))?;
        let public_key = PublicKey::from_secret_key(&secret_key);

        let hash = Sha256::generate_hash(&[payload]);

        let message = Message::parse(&hash);

        let (sig, recovery_id) = libsecp256k1::sign(&message, &secret_key);

        // buffer = [signature;0..64 | recovery_id;65]
        let mut buffer = [0u8; 65];
        buffer[0..64].copy_from_slice(&sig.serialize()[..]);
        buffer[64] = recovery_id.serialize();

        let signature = Signature {
            alg: SignAlg::Es256k,
            kid: hex::encode(public_key.serialize()),
            signature: hex::encode(buffer),
            message_hash: hex::encode(hash),
        };

        Ok(signature)
    }

    async fn sign_managed(&self, payload: &[u8], key: &ManagedKey) -> crate::Result<Signature> {
        let hash = Sha256::generate_hash(&[payload]);

        let http = BloockHttpClient::new(self.api_key.clone());

        let req = SignRequest {
            key_id: key.id.clone(),
            algorithm: "ES256K".to_string(),
            payload: hex::encode(hash),
        };
        let res: SignResponse = http
            .post_json(format!("{}/keys/v1/sign", self.api_host), req, None)
            .await
            .map_err(|e| SignerError::SignerError(e.to_string()))?;

        let signature = Signature {
            alg: SignAlg::Es256kM,
            kid: key.id.clone(),
            signature: res.signature,
            message_hash: hex::encode(hash),
        };

        Ok(signature)
    }

    async fn verify_local(&self, payload: &[u8], signature: &Signature) -> crate::Result<bool> {
        let public_key_hex = hex::decode(signature.kid.as_bytes())
            .map_err(|e| SignerError::InvalidPublicKey(e.to_string()))?;
        let public_key = PublicKey::parse_slice(&public_key_hex, None)
            .map_err(|e| SignerError::InvalidPublicKey(e.to_string()))?;

        let hash: [u8; 32] = Sha256::generate_hash(&[payload]);
        let message = Message::parse(&hash);

        let signature_bytes = hex::decode(signature.signature.clone())
            .map_err(|e| SignerError::InvalidSignature(e.to_string()))?;
        let signature = libsecp256k1::Signature::parse_standard_slice(&signature_bytes[..64])
            .map_err(|e| SignerError::InvalidSignature(e.to_string()))?;

        Ok(libsecp256k1::verify(&message, &signature, &public_key))
    }

    async fn verify_managed(&self, payload: &[u8], signature: &Signature) -> crate::Result<bool> {
        let hash = Sha256::generate_hash(&[payload]);

        let http = BloockHttpClient::new(self.api_key.clone());

        let req = VerifyRequest {
            key_id: signature.kid.clone(),
            algorithm: "ES256K".to_string(),
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
    use crate::{
        ecdsa::EcdsaSigner,
        entity::{alg::SignAlg, signature::Signature},
        Signer,
    };
    use bloock_keys::keys::{local::LocalKey, managed::ManagedKey};

    #[tokio::test]
    async fn test_sign_local_ok() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();

        let local_key_params = bloock_keys::keys::local::LocalKeyParams {
            key_type: bloock_keys::KeyType::EcP256k,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();

        let string_payload = "hello world";

        let signer = EcdsaSigner::new(api_host, api_key);

        let signature = signer
            .sign_local(string_payload.as_bytes(), &local_key)
            .await
            .unwrap();

        assert_eq!(signature.alg, SignAlg::Es256k);
        assert_eq!(signature.kid, local_key.key);

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
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945".to_string(),
            ),
            mnemonic: None,
        };

        let c = EcdsaSigner::new(api_host, api_key);
        let result = c.sign_local(string_payload.as_bytes(), &local_key).await;
        assert!(result.is_err());
    }

    #[tokio::test]
    async fn test_verify_local_invalid_signature() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();

        let string_payload = "hello world";

        let signature = Signature {
            alg: SignAlg::Es256k,
            kid: "02c4855e2b4b0ff60b939d943b00043b7fb7b9f3f44ce1c89f8e8402fd3fcb8052".to_string(),
            signature: "3145022100c42e705c0c73f28341eec61d8dfa5c5be006a44e6c48b59103861a7c0914a1df022010b09d5de1d376ac3940b223ffd158e46f6e60d8a2e86f7224f951a850146920".to_string(),
            message_hash: "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945".to_string(),
        };

        let signer = EcdsaSigner::new(api_host, api_key);

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
            alg: SignAlg::Es256k,
            kid: "12c4855e2b4b0ff60b939d943b00043b7fb7b9f3f44ce1c89f8e8402fd3fcb8052".to_string(),
            signature: "3045022100c42e705c0c73f28341eec61d8dfa5c5be006a44e6c48b59103861a7c0914a1df022010b09d5de1d376ac3940b223ffd158e46f6e60d8a2e86f7224f951a850146920".to_string(),
            message_hash: "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945".to_string(),
        };

        let signer = EcdsaSigner::new(api_host, api_key);

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
            alg: SignAlg::Es256k,
            kid: "02c4855e2b4b0ff60b939d943b00043b7fb7b9f3f44ce1c89f8e8402fd3fcb8052".to_string(),
            signature: "3045022100c42e705c0c73f28341eec61d8dfa5c5be006a44e6c48b59103861a7c0914a1df022010b09d5de1d376ac3940b223ffd158e46f6e60d8a2e86f7224f951a850146920".to_string(),
            message_hash: "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945".to_string(),
        };

        let signer = EcdsaSigner::new(api_host, api_key);

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
            key_type: bloock_keys::KeyType::EcP256k,
            protection: bloock_keys::entity::protection_level::ProtectionLevel::SOFTWARE,
            expiration: None,
        };
        let managed_key = ManagedKey::new(&managed_key_params, api_host.clone(), api_key.clone())
            .await
            .unwrap();

        let string_payload = "hello world";

        let signer = EcdsaSigner::new(api_host, api_key);

        let signature = signer
            .sign_managed(string_payload.as_bytes(), &managed_key)
            .await
            .unwrap();

        assert_eq!(signature.alg, SignAlg::Es256kM);
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
            key_type: bloock_keys::KeyType::EcP256k,
            protection: bloock_keys::entity::protection_level::ProtectionLevel::SOFTWARE,
            expiration: None,
        };
        let managed_key = ManagedKey::new(&managed_key_params, api_host.clone(), api_key.clone())
            .await
            .unwrap();

        let signature = Signature {
            alg: SignAlg::Es256k,
            kid: managed_key.id.to_string(),
            signature: "3145022100c42e705c0c73f28341eec61d8dfa5c5be006a44e6c48b59103861a7c0914a1df022010b09d5de1d376ac3940b223ffd158e46f6e60d8a2e86f7224f951a850146920".to_string(),
            message_hash: "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945".to_string(),
        };

        let signer = EcdsaSigner::new(api_host, api_key);

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
            alg: SignAlg::Es256k,
            kid: "00000000-0000-0000-0000-000000000000".to_string(),
            signature: "3045022100c42e705c0c73f28341eec61d8dfa5c5be006a44e6c48b59103861a7c0914a1df022010b09d5de1d376ac3940b223ffd158e46f6e60d8a2e86f7224f951a850146920".to_string(),
            message_hash: "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945".to_string(),
        };

        let signer = EcdsaSigner::new(api_host, api_key);

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
            key_type: bloock_keys::KeyType::EcP256k,
            protection: bloock_keys::entity::protection_level::ProtectionLevel::SOFTWARE,
            expiration: None,
        };
        let managed_key = ManagedKey::new(&managed_key_params, api_host.clone(), api_key.clone())
            .await
            .unwrap();

        let signature = Signature {
            alg: SignAlg::Es256k,
            kid: managed_key.id.to_string(),
            signature: "3045022100c42e705c0c73f28341eec61d8dfa5c5be006a44e6c48b59103861a7c0914a1df022010b09d5de1d376ac3940b223ffd158e46f6e60d8a2e86f7224f951a850146920".to_string(),
            message_hash: "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945".to_string(),
        };

        let signer = EcdsaSigner::new(api_host, api_key);

        let result = signer
            .verify_managed(string_payload.as_bytes(), &signature)
            .await
            .unwrap();

        assert!(!result);
    }
}
