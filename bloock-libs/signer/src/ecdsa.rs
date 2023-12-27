use crate::entity::alg::SignAlg;
use crate::entity::dto::sign_request::SignRequest;
use crate::entity::dto::sign_response::SignResponse;
use crate::entity::dto::verify_request::VerifyRequest;
use crate::entity::dto::verify_response::VerifyResponse;
use crate::entity::signature::Signature;
use crate::{Signer, SignerError};
use async_trait::async_trait;
use bloock_hasher::HashAlg;
use bloock_http::{BloockHttpClient, Client};
use bloock_keys::certificates::GetX509Certficate;
use bloock_keys::entity::key::{Key, Local, Managed};
use bloock_keys::KeyType;
use libsecp256k1::{Message, PublicKey, SecretKey};

pub struct EcdsaSigner {
    api_host: String,
    api_key: String,
    environment: Option<String>,
    api_version: Option<String>,
}

impl EcdsaSigner {
    pub fn new(
        api_host: String,
        api_key: String,
        environment: Option<String>,
        api_version: Option<String>,
    ) -> Self {
        Self {
            api_host,
            api_key,
            environment,
            api_version,
        }
    }

    pub fn new_boxed(
        api_host: String,
        api_key: String,
        environment: Option<String>,
        api_version: Option<String>,
    ) -> Box<Self> {
        Box::new(Self::new(api_host, api_key, environment, api_version))
    }
}

#[async_trait(?Send)]
impl Signer for EcdsaSigner {
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
                self.environment.clone(),
            )
            .await
            .map(|s| s.tbs_certificate.subject.to_string());

        let private_key = local
            .private_key
            .clone()
            .ok_or_else(|| SignerError::InvalidSecretKey("no private key found".to_string()))?;
        let secret_key_hex =
            hex::decode(private_key).map_err(|e| SignerError::InvalidSecretKey(e.to_string()))?;
        let secret_key = SecretKey::parse_slice(&secret_key_hex)
            .map_err(|e| SignerError::InvalidSecretKey(e.to_string()))?;
        let public_key = PublicKey::from_secret_key(&secret_key);

        let hash_alg = hash_alg.unwrap_or(KeyType::from(Key::from(local)).default_hash_alg());
        let hash = hash_alg.hash(&[payload]);

        let message = Message::parse(&hash);

        let (sig, recovery_id) = libsecp256k1::sign(&message, &secret_key);

        // buffer = [signature;0..64 | recovery_id;65]
        let mut buffer = [0u8; 65];
        buffer[0..64].copy_from_slice(&sig.serialize()[..]);
        buffer[64] = recovery_id.serialize();

        let signature = Signature {
            alg: SignAlg::Es256k,
            key: hex::encode(public_key.serialize()),
            subject,
            signature: hex::encode(buffer),
            message_hash: hex::encode(hash),
            hash_alg: Some(hash_alg),
        };

        Ok(signature)
    }

    async fn sign_managed(
        &self,
        payload: &[u8],
        key: &Managed,
        hash_alg: Option<HashAlg>,
    ) -> crate::Result<Signature> {
        let managed = match key {
            Managed::Key(k) => k.clone(),
            Managed::Certificate(c) => c.key.clone(),
        };

        let subject = key
            .get_certificate(
                self.api_host.clone(),
                self.api_key.clone(),
                self.environment.clone(),
            )
            .await
            .map(|s| s.tbs_certificate.subject.to_string());

        let hash_alg =
            hash_alg.unwrap_or(KeyType::from(Key::from(managed.clone())).default_hash_alg());
        let hash = hash_alg.hash(&[payload]);

        let http = BloockHttpClient::new(self.api_key.clone(), self.environment.clone(), None);

        let req = SignRequest {
            key_id: managed.id.clone(),
            algorithm: "ES256K".to_string(),
            payload: hex::encode(hash),
        };
        let res: SignResponse = http
            .post_json(format!("{}/keys/v1/sign", self.api_host), req, None)
            .await
            .map_err(|e| SignerError::SignerError(e.to_string()))?;

        let signature = Signature {
            alg: SignAlg::Es256kM,
            key: managed.public_key.clone(),
            subject,
            signature: res.signature,
            message_hash: hex::encode(hash),
            hash_alg: Some(hash_alg),
        };

        Ok(signature)
    }

    async fn verify_local(&self, payload: &[u8], signature: &Signature) -> crate::Result<bool> {
        let hash = signature
            .hash_alg
            .clone()
            .unwrap_or_default()
            .hash(&[payload]);

        let public_key_hex = hex::decode(signature.key.as_bytes())
            .map_err(|e| SignerError::InvalidPublicKey(e.to_string()))?;
        let public_key = PublicKey::parse_slice(&public_key_hex, None)
            .map_err(|e| SignerError::InvalidPublicKey(e.to_string()))?;

        let message = Message::parse(&hash);

        let signature_bytes = hex::decode(signature.signature.clone())
            .map_err(|e| SignerError::InvalidSignature(e.to_string()))?;
        let signature = libsecp256k1::Signature::parse_standard_slice(&signature_bytes[..64])
            .map_err(|e| SignerError::InvalidSignature(e.to_string()))?;

        Ok(libsecp256k1::verify(&message, &signature, &public_key))
    }

    async fn verify_managed(&self, payload: &[u8], signature: &Signature) -> crate::Result<bool> {
        let hash = signature
            .hash_alg
            .clone()
            .unwrap_or_default()
            .hash(&[payload]);

        let http = BloockHttpClient::new(
            self.api_key.clone(),
            self.environment.clone(),
            self.api_version.clone(),
        );

        let req = VerifyRequest {
            public_key: signature.key.clone(),
            algorithm: "ES256K".to_string(),
            payload: hex::encode(hash),
            signature: signature.signature.clone(),
        };

        let res: VerifyResponse = match http
            .post_json(format!("{}/keys/v1/verify", self.api_host), req, None)
            .await
        {
            Ok(res) => res,
            Err(e) => return Err(SignerError::VerifierError(e.to_string())),
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
    async fn test_sign_local_key_ok() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();

        let local_key_params = bloock_keys::keys::local::LocalKeyParams {
            key_type: bloock_keys::KeyType::EcP256k,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();

        let string_payload = "hello world";

        let signer = EcdsaSigner::new(api_host, api_key, None, None);

        let signature = signer
            .sign_local(string_payload.as_bytes(), &local_key.clone().into(), None)
            .await
            .unwrap();

        assert_eq!(signature.alg, SignAlg::Es256k);
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
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945".to_string(),
            ),
            mnemonic: None,
        };

        let c = EcdsaSigner::new(api_host, api_key, None, None);
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
            alg: SignAlg::Es256k,
            key: "02c4855e2b4b0ff60b939d943b00043b7fb7b9f3f44ce1c89f8e8402fd3fcb8052".to_string(),
            subject: None,
            signature: "3145022100c42e705c0c73f28341eec61d8dfa5c5be006a44e6c48b59103861a7c0914a1df022010b09d5de1d376ac3940b223ffd158e46f6e60d8a2e86f7224f951a850146920".to_string(),
            message_hash: "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945".to_string(),
            hash_alg: None
        };

        let signer = EcdsaSigner::new(api_host, api_key, None, None);

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
            key: "12c4855e2b4b0ff60b939d943b00043b7fb7b9f3f44ce1c89f8e8402fd3fcb8052".to_string(),
            subject: None,
            signature: "3045022100c42e705c0c73f28341eec61d8dfa5c5be006a44e6c48b59103861a7c0914a1df022010b09d5de1d376ac3940b223ffd158e46f6e60d8a2e86f7224f951a850146920".to_string(),
            message_hash: "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945".to_string(),
            hash_alg: None
        };

        let signer = EcdsaSigner::new(api_host, api_key, None, None);

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
            key: "02c4855e2b4b0ff60b939d943b00043b7fb7b9f3f44ce1c89f8e8402fd3fcb8052".to_string(),
            subject: None,
            signature: "3045022100c42e705c0c73f28341eec61d8dfa5c5be006a44e6c48b59103861a7c0914a1df022010b09d5de1d376ac3940b223ffd158e46f6e60d8a2e86f7224f951a850146920".to_string(),
            message_hash: "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945".to_string(),
            hash_alg: None
        };

        let signer = EcdsaSigner::new(api_host, api_key, None, None);

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
        let managed_key =
            ManagedKey::new(&managed_key_params, api_host.clone(), api_key.clone(), None)
                .await
                .unwrap();

        let string_payload = "hello world";

        let signer = EcdsaSigner::new(api_host, api_key, None, None);

        let signature = signer
            .sign_managed(string_payload.as_bytes(), &managed_key.clone().into(), None)
            .await
            .unwrap();

        assert_eq!(signature.alg, SignAlg::Es256kM);
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
            key_type: bloock_keys::KeyType::EcP256k,
            protection: bloock_keys::entity::protection_level::ProtectionLevel::SOFTWARE,
            expiration: None,
        };
        let managed_key =
            ManagedKey::new(&managed_key_params, api_host.clone(), api_key.clone(), None)
                .await
                .unwrap();

        let signature = Signature {
            alg: SignAlg::Es256k,
            key: managed_key.id.to_string(),
            subject: None,
            signature: "3145022100c42e705c0c73f28341eec61d8dfa5c5be006a44e6c48b59103861a7c0914a1df022010b09d5de1d376ac3940b223ffd158e46f6e60d8a2e86f7224f951a850146920".to_string(),
            message_hash: "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945".to_string(),
            hash_alg: None
        };

        let signer = EcdsaSigner::new(api_host, api_key, None, None);

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
            key: "00000000-0000-0000-0000-000000000000".to_string(),
            subject: None,
            signature: "3045022100c42e705c0c73f28341eec61d8dfa5c5be006a44e6c48b59103861a7c0914a1df022010b09d5de1d376ac3940b223ffd158e46f6e60d8a2e86f7224f951a850146920".to_string(),
            message_hash: "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945".to_string(),
            hash_alg: None
        };

        let signer = EcdsaSigner::new(api_host, api_key, None, None);

        let result = signer
            .verify_managed(string_payload.as_bytes(), &signature)
            .await;
        assert!(result.is_err());
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
        let managed_key =
            ManagedKey::new(&managed_key_params, api_host.clone(), api_key.clone(), None)
                .await
                .unwrap();

        let signature = Signature {
            alg: SignAlg::Es256k,
            key: managed_key.id.to_string(),
            subject: None,
            signature: "3045022100c42e705c0c73f28341eec61d8dfa5c5be006a44e6c48b59103861a7c0914a1df022010b09d5de1d376ac3940b223ffd158e46f6e60d8a2e86f7224f951a850146920".to_string(),
            message_hash: "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945".to_string(),
            hash_alg: None
        };

        let signer = EcdsaSigner::new(api_host, api_key, None, None);

        let result = signer
            .verify_managed(string_payload.as_bytes(), &signature)
            .await
            .unwrap();

        assert!(!result);
    }
}
