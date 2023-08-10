use crate::entity::alg::Algorithms;
use crate::entity::signature::{ProtectedHeader, Signature, SignatureHeader};
use crate::{Signer, SignerError, Verifier};
use async_trait::async_trait;
use bloock_hasher::poseidon::{check_poseidon_hash, Poseidon};
use bloock_hasher::{keccak::Keccak256, Hasher};
use bloock_http::{BloockHttpClient, Client};
use bloock_keys::managed::ManagedKey;
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

pub struct ManagedBJJSigner {
    managed_key: ManagedKey,
    common_name: Option<String>,
    api_host: String,
    api_key: String,
}

impl ManagedBJJSigner {
    pub fn new(
        key: ManagedKey,
        common_name: Option<String>,
        api_host: String,
        api_key: String,
    ) -> Self {
        Self {
            managed_key: key,
            common_name,
            api_host,
            api_key,
        }
    }

    pub fn new_boxed(
        key: ManagedKey,
        common_name: Option<String>,
        api_host: String,
        api_key: String,
    ) -> Box<Self> {
        Box::new(Self::new(key, common_name, api_host, api_key))
    }
}

#[async_trait(?Send)]
impl Signer for ManagedBJJSigner {
    async fn sign(&self, payload: &[u8]) -> crate::Result<Signature> {
        let protected = match self.common_name.clone() {
            Some(common_name) => ProtectedHeader {
                common_name: Some(common_name),
            }
            .serialize()?,
            None => base64_url::encode("{}"),
        };

        let payload_with_protected = &[protected.clone(), base64_url::encode(payload)]
            .join(".")
            .as_bytes()
            .to_owned();

        let final_payload;
        if protected == base64_url::encode("{}") {
            // To keep backwards compatibility if the protected header is empty, we just verify the payload
            final_payload = payload;
        } else {
            final_payload = payload_with_protected.as_slice();
        }

        let hash: Vec<u8>;
        let is_poseidon_hash = check_poseidon_hash(payload);
        if is_poseidon_hash {
            hash = final_payload.to_vec();
        } else {
            hash = Poseidon::generate_hash(&[final_payload])[..].to_vec();
        }
        let encoded_hash = hex::encode(hash);

        let http = BloockHttpClient::new(self.api_key.clone());

        let req = SignRequest {
            key_id: self.managed_key.id.clone(),
            algorithm: "BJJ".to_string(),
            payload: encoded_hash,
        };
        let res: SignResponse = http
            .post_json(format!("{}/keys/v1/sign", self.api_host), req, None)
            .await
            .map_err(|e| SignerError::SignerError(e.to_string()))?;

        let signature = Signature {
            protected,
            signature: res.signature,
            header: SignatureHeader {
                alg: Algorithms::BjjM.to_string(),
                kid: self.managed_key.id.clone(),
            },
            message_hash: hex::encode(Keccak256::generate_hash(&[payload])),
        };

        Ok(signature)
    }
}

pub struct ManagedBJJVerifier {
    api_host: String,
    api_key: String,
}

impl ManagedBJJVerifier {
    pub fn new(api_host: String, api_key: String) -> Self {
        Self { api_host, api_key }
    }

    pub fn new_boxed(api_host: String, api_key: String) -> Box<Self> {
        Box::new(Self::new(api_host, api_key))
    }
}

#[async_trait(?Send)]
impl Verifier for ManagedBJJVerifier {
    async fn verify(&self, payload: &[u8], signature: Signature) -> crate::Result<bool> {
        let payload_with_protected = &[signature.protected.clone(), base64_url::encode(payload)]
            .join(".")
            .as_bytes()
            .to_owned();

        let hash: [u8; 32];
        if signature.protected == base64_url::encode("{}") {
            // To keep backwards compatibility if the protected header is empty, we just verify the payload
            hash = Poseidon::generate_hash(&[payload]);
        } else {
            hash = Poseidon::generate_hash(&[payload_with_protected.as_slice()]);
        }

        let http = BloockHttpClient::new(self.api_key.clone());

        let req = VerifyRequest {
            key_id: signature.header.kid.clone(),
            algorithm: "BJJ".to_string(),
            payload: hex::encode(hash),
            signature: signature.signature,
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
    use bloock_hasher::{sha256::Sha256, Hasher};
    use bloock_keys::local::LocalKey;
    use bloock_keys::managed::ManagedKey;

    use crate::entity::alg::Algorithms;
    use crate::entity::signature::{Signature, SignatureHeader};
    use crate::managed::bjj::ManagedBJJSigner;
    use crate::managed::ens::recover_public_key;
    use crate::{
        create_verifier_from_signature,
        local::ecdsa::{get_common_name, LocalEcdsaSigner},
        Signer,
    };

    #[tokio::test]
    async fn test_sign_and_verify_ok() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();
        let managed_key_params = bloock_keys::managed::ManagedKeyParams {
            name: None,
            key_type: bloock_keys::KeyType::BJJ,
            protection: bloock_keys::managed::ProtectionLevel::SOFTWARE,
            expiration: None,
        };
        let managed_key = ManagedKey::new(&managed_key_params, api_host.clone(), api_key.clone())
            .await
            .unwrap();

        let string_payload = "hello world";

        let c = ManagedBJJSigner::new(managed_key, None, api_host.clone(), api_key.clone());

        let signature = c.sign(string_payload.as_bytes()).await.unwrap();

        assert_eq!(signature.header.alg.as_str(), Algorithms::BjjM.to_string());

        let result = create_verifier_from_signature(&signature, api_host.clone(), api_key.clone())
            .unwrap()
            .verify(string_payload.as_bytes(), signature)
            .await
            .unwrap();

        assert!(result);
    }

    #[tokio::test]
    async fn test_sign_and_verify_ok_set_common_name() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();
        let managed_key_params = bloock_keys::managed::ManagedKeyParams {
            name: None,
            key_type: bloock_keys::KeyType::BJJ,
            protection: bloock_keys::managed::ProtectionLevel::SOFTWARE,
            expiration: None,
        };
        let managed_key = ManagedKey::new(&managed_key_params, api_host.clone(), api_key.clone())
            .await
            .unwrap();

        let string_payload = "hello world";

        let c = ManagedBJJSigner::new(
            managed_key,
            Some("a name".to_string()),
            api_host.clone(),
            api_key.clone(),
        );

        let signature = c.sign(string_payload.as_bytes()).await.unwrap();

        assert_eq!(signature.header.alg.as_str(), Algorithms::BjjM.to_string());
        assert_eq!(get_common_name(&signature).unwrap().as_str(), "a name");

        let result = create_verifier_from_signature(&signature, api_host.clone(), api_key.clone())
            .unwrap()
            .verify(string_payload.as_bytes(), signature)
            .await
            .unwrap();

        assert!(result);
    }

    #[tokio::test]
    async fn test_sign_and_verify_ok_get_common_name_without_set() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();
        let managed_key_params = bloock_keys::managed::ManagedKeyParams {
            name: None,
            key_type: bloock_keys::KeyType::BJJ,
            protection: bloock_keys::managed::ProtectionLevel::SOFTWARE,
            expiration: None,
        };
        let managed_key = ManagedKey::new(&managed_key_params, api_host.clone(), api_key.clone())
            .await
            .unwrap();

        let string_payload = "hello world";

        let c = ManagedBJJSigner::new(managed_key, None, api_host.clone(), api_key.clone());

        let signature = c.sign(string_payload.as_bytes()).await.unwrap();

        assert_eq!(signature.header.alg.as_str(), "BJJ_M");
        assert!(get_common_name(&signature).is_err());
    }

    #[tokio::test]
    async fn test_verify_invalid_signature() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();
        let managed_key_params = bloock_keys::managed::ManagedKeyParams {
            name: None,
            key_type: bloock_keys::KeyType::BJJ,
            protection: bloock_keys::managed::ProtectionLevel::SOFTWARE,
            expiration: None,
        };
        let managed_key = ManagedKey::new(&managed_key_params, api_host.clone(), api_key.clone())
            .await
            .unwrap();

        let string_payload = "hello world";

        let json_header = SignatureHeader {
            alg: "BJJ_M".to_string(),
            kid: managed_key.id.to_string(),
        };

        let json_signature = Signature {
            protected: "e30".to_string(),
            header: json_header,
            signature: "3145022100c42e705c0c73f28341eec61d8dfa5c5be006a44e6c48b59103861a7c0914a1df022010b09d5de1d376ac3940b223ffd158e46f6e60d8a2e86f7224f951a850146920".to_string(),
            message_hash: "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945".to_string(),
        };

        let result =
            create_verifier_from_signature(&json_signature, api_host.clone(), api_key.clone())
                .unwrap()
                .verify(string_payload.as_bytes(), json_signature)
                .await
                .unwrap();

        assert!(!result);
    }

    /*#[tokio::test]
    async fn test_verify_invalid_public_key() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();

        let string_payload = "hello world";

        let json_header = SignatureHeader {
            alg: "ES256K".to_string(),
            kid: "12c4855e2b4b0ff60b939d943b00043b7fb7b9f3f44ce1c89f8e8402fd3fcb8052".to_string(),
        };

        let json_signature = Signature {
            protected: "e30".to_string(),
            header: json_header,
            signature: "3045022100c42e705c0c73f28341eec61d8dfa5c5be006a44e6c48b59103861a7c0914a1df022010b09d5de1d376ac3940b223ffd158e46f6e60d8a2e86f7224f951a850146920".to_string(),
            message_hash: "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945".to_string(),
        };

        let result = create_verifier_from_signature(&json_signature, api_host, api_key)
            .unwrap()
            .verify(string_payload.as_bytes(), json_signature)
            .await;

        assert!(result.is_err());
    }*/

    #[tokio::test]
    async fn test_verify_invalid_payload() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();

        let managed_key_params = bloock_keys::managed::ManagedKeyParams {
            name: None,
            key_type: bloock_keys::KeyType::BJJ,
            protection: bloock_keys::managed::ProtectionLevel::SOFTWARE,
            expiration: None,
        };
        let managed_key = ManagedKey::new(&managed_key_params, api_host.clone(), api_key.clone())
            .await
            .unwrap();

        let string_payload = "end world";

        let json_header = SignatureHeader {
            alg: Algorithms::BjjM.to_string(),
            kid: managed_key.id.to_string(),
        };

        let json_signature = Signature {
            protected: "e30".to_string(),
            header: json_header,
            signature: "3045022100c42e705c0c73f28341eec61d8dfa5c5be006a44e6c48b59103861a7c0914a1df022010b09d5de1d376ac3940b223ffd158e46f6e60d8a2e86f7224f951a850146920".to_string(),
            message_hash: "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945".to_string(),
        };

        let result =
            create_verifier_from_signature(&json_signature, api_host.clone(), api_key.clone())
                .unwrap()
                .verify(string_payload.as_bytes(), json_signature)
                .await
                .unwrap();

        assert!(!result);
    }

    #[tokio::test]
    async fn recover_public_key_ok() {
        let local_key_params = bloock_keys::local::LocalKeyParams {
            key_type: bloock_keys::KeyType::EcP256k,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();

        let string_payload = "hello world";

        let c = LocalEcdsaSigner::new(local_key.clone(), None);

        let signature = c.sign(string_payload.as_bytes()).await.unwrap();

        let result_key = recover_public_key(
            &signature,
            Sha256::generate_hash(&[string_payload.as_bytes()]),
        )
        .unwrap();

        assert_eq!(hex::encode(result_key), local_key.key);
    }
}
