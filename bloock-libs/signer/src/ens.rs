use crate::{ecdsa::EcdsaSigner, entity::alg::SignAlg, Result, Signature, Signer, SignerError};
use async_trait::async_trait;
use bloock_hasher::{keccak::Keccak256, Hasher};
use bloock_keys::entity::key::{Local, Managed};
use libsecp256k1::PublicKey;

pub struct EnsSigner {
    api_host: String,
    api_key: String,
    environment: Option<String>,
}

impl EnsSigner {
    pub fn new(api_host: String, api_key: String, environment: Option<String>) -> Self {
        Self {
            api_host,
            api_key,
            environment,
        }
    }

    pub fn new_boxed(api_host: String, api_key: String, environment: Option<String>) -> Box<Self> {
        Box::new(Self::new(api_host, api_key, environment))
    }
}

#[async_trait(?Send)]
impl Signer for EnsSigner {
    async fn sign_local(&self, payload: &[u8], key: &Local) -> crate::Result<Signature> {
        let local = match key {
            Local::Key(k) => k.clone(),
            Local::Certificate(c) => c.key.clone(),
        };

        let ecdsa_signer = EcdsaSigner::new(
            self.api_host.clone(),
            self.api_key.clone(),
            self.environment.clone(),
            None,
        );
        let mut signature = ecdsa_signer.sign_local(payload, &local.into()).await?;
        signature.alg = SignAlg::Es256k;
        Ok(signature)
    }

    async fn sign_managed(&self, payload: &[u8], key: &Managed) -> crate::Result<Signature> {
        let managed = match key {
            Managed::Key(k) => k.clone(),
            Managed::Certificate(c) => c.key.clone(),
        };

        let ecdsa_signer = EcdsaSigner::new(
            self.api_host.clone(),
            self.api_key.clone(),
            self.environment.clone(),
            None,
        );
        let mut signature = ecdsa_signer.sign_managed(payload, &managed.into()).await?;
        signature.alg = SignAlg::Es256kM;
        Ok(signature)
    }

    async fn verify_local(&self, payload: &[u8], signature: &Signature) -> crate::Result<bool> {
        EcdsaSigner::new(
            self.api_host.clone(),
            self.api_key.clone(),
            self.environment.clone(),
            None,
        )
        .verify_local(payload, signature)
        .await
    }

    async fn verify_managed(&self, payload: &[u8], signature: &Signature) -> crate::Result<bool> {
        EcdsaSigner::new(
            self.api_host.clone(),
            self.api_key.clone(),
            self.environment.clone(),
            None,
        )
        .verify_managed(payload, signature)
        .await
    }
}

fn _derive_eth_address(mut public_key: Vec<u8>) -> Result<String> {
    if public_key.len() != 64 {
        // the key is probably compressed, so we try to decompress it
        public_key = PublicKey::parse_slice(&public_key, None)
            .map_err(|e| SignerError::InvalidPublicKey(e.to_string()))?
            .serialize()[1..]
            .to_vec();
    }

    Ok(hex::encode(
        &Keccak256::generate_hash(&[public_key.as_slice()])[12..],
    ))
}

#[cfg(test)]
mod tests {
    use crate::{ens::EnsSigner, entity::alg::SignAlg, Signature, Signer};
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

        let signer = EnsSigner::new(api_host, api_key, None);

        let signature = signer
            .sign_local(string_payload.as_bytes(), &local_key.clone().into())
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

        let c = EnsSigner::new(api_host, api_key, None);
        let result = c
            .sign_local(string_payload.as_bytes(), &local_key.into())
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
        };

        let signer = EnsSigner::new(api_host, api_key, None);

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
        };

        let signer = EnsSigner::new(api_host, api_key, None);

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
        };

        let signer = EnsSigner::new(api_host, api_key, None);

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

        let signer = EnsSigner::new(api_host, api_key, None);

        let signature = signer
            .sign_managed(string_payload.as_bytes(), &managed_key.clone().into())
            .await
            .unwrap();

        assert_eq!(signature.alg, SignAlg::Es256kM);
        assert_eq!(signature.key, managed_key.public_key);

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
        };

        let signer = EnsSigner::new(api_host, api_key, None);

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
        };

        let signer = EnsSigner::new(api_host, api_key, None);

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
        };

        let signer = EnsSigner::new(api_host, api_key, None);

        let result = signer
            .verify_managed(string_payload.as_bytes(), &signature)
            .await
            .unwrap();

        assert!(!result);
    }
}
