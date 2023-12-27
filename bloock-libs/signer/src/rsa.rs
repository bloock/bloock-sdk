use crate::entity::dto::sign_response::SignResponse;
use crate::entity::dto::verify_request::VerifyRequest;
use crate::entity::dto::verify_response::VerifyResponse;
use crate::SignerError;
use crate::{
    entity::{
        alg::SignAlg, dto::sign_request::SignRequest, signature::Signature as BloockSignature,
    },
    Signer as BloockSigner,
};
use async_trait::async_trait;
use bloock_hasher::HashAlg;
use bloock_http::{BloockHttpClient, Client};
use bloock_keys::certificates::GetX509Certficate;
use bloock_keys::entity::key::{Key, Local, Managed};
use bloock_keys::KeyType;
use rsa::pkcs8::spki::SignatureBitStringEncoding;
use rsa::signature::hazmat::PrehashSigner;
use rsa::signature::hazmat::PrehashVerifier;
use rsa::{
    pkcs1v15::{Signature, SigningKey, VerifyingKey},
    pkcs8::{DecodePrivateKey, DecodePublicKey},
    sha2::Sha256,
};

pub struct RsaSigner {
    api_host: String,
    api_key: String,
    environment: Option<String>,
}

impl RsaSigner {
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
impl BloockSigner for RsaSigner {
    async fn sign_local(
        &self,
        payload: &[u8],
        key: &Local,
        hash_alg: Option<HashAlg>,
    ) -> crate::Result<BloockSignature> {
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

        let private_key = rsa::RsaPrivateKey::from_pkcs8_pem(&local.private_key.clone().unwrap())
            .map_err(|e| SignerError::InvalidSecretKey(e.to_string()))?;
        let signer = SigningKey::<Sha256>::new(private_key.clone());

        let hash_alg =
            hash_alg.unwrap_or(KeyType::from(Key::from(local.clone())).default_hash_alg());
        let hash = hash_alg.hash(&[payload]);

        let signature = signer
            .sign_prehash(&hash)
            .map_err(|e| SignerError::SignerError(e.to_string()))?;

        let signature = BloockSignature {
            alg: SignAlg::Rsa,
            key: local.key.clone(),
            subject,
            signature: hex::encode(signature.to_bitstring().unwrap().raw_bytes()),
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
    ) -> crate::Result<BloockSignature> {
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
            algorithm: "RSA".to_string(),
            payload: hex::encode(hash),
        };

        let res: SignResponse = http
            .post_json(format!("{}/keys/v1/sign", self.api_host), req, None)
            .await
            .map_err(|e| SignerError::SignerError(e.to_string()))?;

        let signature = BloockSignature {
            alg: SignAlg::RsaM,
            key: managed.public_key.clone(),
            subject,
            signature: res.signature,
            message_hash: hex::encode(hash),
            hash_alg: Some(hash_alg),
        };

        Ok(signature)
    }

    async fn verify_local(
        &self,
        payload: &[u8],
        signature: &BloockSignature,
    ) -> crate::Result<bool> {
        let hash = signature
            .hash_alg
            .clone()
            .unwrap_or_default()
            .hash(&[payload]);

        let public_key = rsa::RsaPublicKey::from_public_key_pem(&signature.key)
            .map_err(|e| SignerError::InvalidPublicKey(e.to_string()))?;

        let verifying_key = VerifyingKey::<Sha256>::new(public_key);
        let signature_bytes = hex::decode(signature.signature.clone())
            .map_err(|e| SignerError::InvalidSignature(e.to_string()))?;

        let sign = Signature::try_from(signature_bytes.as_slice())
            .map_err(|e| SignerError::InvalidSignature(e.to_string()))?;

        Ok(verifying_key.verify_prehash(&hash, &sign).is_ok())
    }

    async fn verify_managed(
        &self,
        payload: &[u8],
        signature: &BloockSignature,
    ) -> crate::Result<bool> {
        let hash = signature
            .hash_alg
            .clone()
            .unwrap_or_default()
            .hash(&[payload]);

        let http = BloockHttpClient::new(self.api_key.clone(), self.environment.clone(), None);

        let req = VerifyRequest {
            public_key: signature.key.clone(),
            algorithm: "RSA".to_string(),
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
        entity::{alg::SignAlg, signature::Signature},
        rsa::RsaSigner,
        Signer,
    };
    use bloock_keys::{
        certificates::{local::LocalCertificate, CertificateSubject},
        keys::{local::LocalKey, managed::ManagedKey},
    };

    #[tokio::test]
    async fn test_sign_local_ok() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();

        let local_key_params = bloock_keys::keys::local::LocalKeyParams {
            key_type: bloock_keys::KeyType::Rsa2048,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();

        let string_payload = "hello world";

        let signer = RsaSigner::new(api_host, api_key, None);

        let signature = signer
            .sign_local(string_payload.as_bytes(), &local_key.clone().into(), None)
            .await
            .unwrap();

        assert_eq!(signature.alg, SignAlg::Rsa);
        assert_eq!(signature.key, local_key.key);

        let result = signer
            .verify_local(string_payload.as_bytes(), &signature)
            .await
            .unwrap();

        assert!(result);
    }

    #[tokio::test]
    async fn test_sign_local_certificate_ok() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();

        let local_key_params = bloock_keys::certificates::local::LocalCertificateParams {
            key_type: bloock_keys::KeyType::Rsa2048,
            subject: CertificateSubject {
                common_name: "a common name".to_string(),
                organizational_unit: None,
                organization: None,
                location: Some("a location".to_string()),
                state: None,
                country: None,
            },
            password: "".to_string(),
            expiration: 0,
        };
        let local_cert = LocalCertificate::new(&local_key_params).unwrap();

        let string_payload = "hello world";

        let signer = RsaSigner::new(api_host, api_key, None);

        let signature = signer
            .sign_local(string_payload.as_bytes(), &local_cert.clone().into(), None)
            .await
            .unwrap();

        assert_eq!(signature.alg, SignAlg::Rsa);
        assert_eq!(signature.key, local_cert.key.key);
        assert_eq!(
            signature.subject,
            Some(local_cert.certificate.tbs_certificate.subject.to_string())
        );

        let result = signer
            .verify_local(string_payload.as_bytes(), &signature)
            .await
            .unwrap();

        assert!(result);
    }

    #[tokio::test]
    async fn test_sign_local_rsa_3072_ok() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();

        let local_key_params = bloock_keys::keys::local::LocalKeyParams {
            key_type: bloock_keys::KeyType::Rsa3072,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();

        let string_payload = "hello world";

        let signer = RsaSigner::new(api_host, api_key, None);

        let signature = signer
            .sign_local(string_payload.as_bytes(), &local_key.clone().into(), None)
            .await
            .unwrap();

        assert_eq!(signature.alg, SignAlg::Rsa);
        assert_eq!(signature.key, local_key.key);

        let result = signer
            .verify_local(string_payload.as_bytes(), &signature)
            .await
            .unwrap();

        assert!(result);
    }

    #[tokio::test]
    async fn test_sign_local_rsa_4096_ok() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();

        let local_key_params = bloock_keys::keys::local::LocalKeyParams {
            key_type: bloock_keys::KeyType::Rsa4096,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();

        let string_payload = "hello world";

        let signer = RsaSigner::new(api_host, api_key, None);

        let signature = signer
            .sign_local(string_payload.as_bytes(), &local_key.clone().into(), None)
            .await
            .unwrap();

        assert_eq!(signature.alg, SignAlg::Rsa);
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
            key_type: bloock_keys::KeyType::Rsa2048,
            key: "".to_string(),
            private_key: Some(
                "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945".to_string(),
            ),
            mnemonic: None,
        };

        let c = RsaSigner::new(api_host, api_key, None);
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
            alg: SignAlg::Rsa,
            key: "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4cq54cO1mgxS01EUBzRe\n20wDQZHcuEieBKO+2rBstUxNLaJOBr3O944PiBYtDixb3AzqB+Dp4XmdE3lv/UR2\nfr/eKZDC8tBwZwzIsaGt3c5fOqc8HFbS27kGFS8/Z4UJFC9tUvT2Ss0h1u8IRbBw\nLpvE87nxbGeFs6b5jZ5vvasU28IFKzUhZKBXDua1iJ4Nr1yX/u26LY4qjqw/kFQo\n1ECIhofJEYS+RU9Eqf/oNEc8g1NZ1lvt2Q7vpDwGZ6m9ywJnNDE1XdWJM6d3xdRU\nfdMZ4wLkt8WZj0Jsw96frIkIMrdtbH33tTd2gskupaozkNSw5AEL8ZArxxaefXvB\niwIDAQAB\n-----END PUBLIC KEY-----\n".to_string(),
            subject: None,
            signature: "2a57a0482fa6d3cfaaee258a9f3b65dcb525d38e157e4c8ef3fe84202250ed72e225131f503bdd107814f96c161479fa7393c942f58cf2be0f3ea44b922c8842db12509cacac586da82fb5309ebdba794260a47169c3d46f8b39e103521a537c693e266cca5d3b81bce05047bb8ea5ecc70cd1b5171c92308c0b3a3469dd5187118ea3a94394ff493fa9fc52f166c2f2ae9705cc1c5bf1edb3986331967ae3d6fa1581fcf0c4dff4b9f043253bf5367748ba3420b63b6da0ef68df430b66fd8a2058caa38809eb03b8832dd02775396bcc77cbc7fa0e6acf3ae61b063ca4c0e97d2ee9aec1718865822c766b7768e394dd30c2b34387b02540e58020f56edab5".to_string(),
            message_hash: "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9".to_string(),
            hash_alg: None
        };

        let signer = RsaSigner::new(api_host, api_key, None);

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
            alg: SignAlg::Rsa,
            key: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4cq54cO1mgxS01EUBzRe\n20wDQZHcuEieBKO+2rBstUxNLaJOBr3O944PiBYtDixb3AzqB+Dp4XmdE3lv/UR2\nfr/eKZDC8tBwZwzIsaGt3c5fOqc8HFbS27kGFS8/Z4UJFC9tUvT2Ss0h1u8IRbBw\nLpvE87nxbGeFs6b5jZ5vvasU28IFKzUhZKBXDua1iJ4Nr1yX/u26LY4qjqw/kFQo\n1ECIhofJEYS+RU9Eqf/oNEc8g1NZ1lvt2Q7vpDwGZ6m9ywJnNDE1XdWJM6d3xdRU\nfdMZ4wLkt8WZj0Jsw96frIkIMrdtbH33tTd2gskupaozkNSw5AEL8ZArxxaefXvB\niwIDAQAB\n-----END PUBLIC KEY-----\n".to_string(),
            subject: None,
            signature: "0916d3d8818cfbf793e7fe74fae8ad029b8b88e4f9967e8422ec3e91f0b6aa84ceefcd606eeb04dc9c4bfd9dcb07ef1678b587150336a52ca0f03930efeca822412b8f9e85f9a768fe135c471db744cb0f79bc78d670be14e5a96c66765ad74ba978382381c2a158ce7c8ce6cc2cc67a6d8d13cf71054af2980c61c4735eac58da6bf12ac50c7c995c482e29eb0becec78d8ba83308297fdc38502a67e0d86f39e1303ca30098f652cdf08d99f4d567835549a13b688d95f2b84bea0b89c4cfeda1bfa0f27016217ddcef511639a1aacf3536773391527ddf73f37aa1cfff92fe7c1a9d8acaad48986bd3893170eabb82a86942d467979f65f8d15cb14d192da".to_string(),
            message_hash: "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9".to_string(),
            hash_alg: None
        };

        let signer = RsaSigner::new(api_host, api_key, None);

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
            alg: SignAlg::Rsa,
            key: "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4cq54cO1mgxS01EUBzRe\n20wDQZHcuEieBKO+2rBstUxNLaJOBr3O944PiBYtDixb3AzqB+Dp4XmdE3lv/UR2\nfr/eKZDC8tBwZwzIsaGt3c5fOqc8HFbS27kGFS8/Z4UJFC9tUvT2Ss0h1u8IRbBw\nLpvE87nxbGeFs6b5jZ5vvasU28IFKzUhZKBXDua1iJ4Nr1yX/u26LY4qjqw/kFQo\n1ECIhofJEYS+RU9Eqf/oNEc8g1NZ1lvt2Q7vpDwGZ6m9ywJnNDE1XdWJM6d3xdRU\nfdMZ4wLkt8WZj0Jsw96frIkIMrdtbH33tTd2gskupaozkNSw5AEL8ZArxxaefXvB\niwIDAQAB\n-----END PUBLIC KEY-----\n".to_string(),
            subject: None,
            signature: "0916d3d8818cfbf793e7fe74fae8ad029b8b88e4f9967e8422ec3e91f0b6aa84ceefcd606eeb04dc9c4bfd9dcb07ef1678b587150336a52ca0f03930efeca822412b8f9e85f9a768fe135c471db744cb0f79bc78d670be14e5a96c66765ad74ba978382381c2a158ce7c8ce6cc2cc67a6d8d13cf71054af2980c61c4735eac58da6bf12ac50c7c995c482e29eb0becec78d8ba83308297fdc38502a67e0d86f39e1303ca30098f652cdf08d99f4d567835549a13b688d95f2b84bea0b89c4cfeda1bfa0f27016217ddcef511639a1aacf3536773391527ddf73f37aa1cfff92fe7c1a9d8acaad48986bd3893170eabb82a86942d467979f65f8d15cb14d192da".to_string(),
            message_hash: "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9".to_string(),
            hash_alg: None
        };

        let signer = RsaSigner::new(api_host, api_key, None);

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
            key_type: bloock_keys::KeyType::Rsa2048,
            protection: bloock_keys::entity::protection_level::ProtectionLevel::SOFTWARE,
            expiration: None,
        };
        let managed_key =
            ManagedKey::new(&managed_key_params, api_host.clone(), api_key.clone(), None)
                .await
                .unwrap();

        let string_payload = "hello world";

        let signer = RsaSigner::new(api_host, api_key, None);

        let signature = signer
            .sign_managed(string_payload.as_bytes(), &managed_key.clone().into(), None)
            .await
            .unwrap();

        assert_eq!(signature.alg, SignAlg::RsaM);
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
            key_type: bloock_keys::KeyType::Rsa2048,
            protection: bloock_keys::entity::protection_level::ProtectionLevel::SOFTWARE,
            expiration: None,
        };
        let managed_key =
            ManagedKey::new(&managed_key_params, api_host.clone(), api_key.clone(), None)
                .await
                .unwrap();

        let signature = Signature {
            alg: SignAlg::RsaM,
            key: managed_key.id.to_string(),
            subject: None,
            signature: "0916d3d8818cfbf793e7fe74fae8ad029b8b88e4f9967e8422ec3e91f0b6aa84ceefcd606eeb04dc9c4bfd9dcb07ef1678b587150336a52ca0f03930efeca822412b8f9e85f9a768fe135c471db744cb0f79bc78d670be14e5a96c66765ad74ba978382381c2a158ce7c8ce6cc2cc67a6d8d13cf71054af2980c61c4735eac58da6bf12ac50c7c995c482e29eb0becec78d8ba83308297fdc38502a67e0d86f39e1303ca30098f652cdf08d99f4d567835549a13b688d95f2b84bea0b89c4cfeda1bfa0f27016217ddcef511639a1aacf3536773391527ddf73f37aa1cfff92fe7c1a9d8acaad48986bd3893170eabb82a86942d467979f65f8d15cb14d192da".to_string(),
            message_hash: "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9".to_string(),
            hash_alg: None
        };

        let signer = RsaSigner::new(api_host, api_key, None);

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
            alg: SignAlg::RsaM,
            key: "00000000-0000-0000-0000-000000000000".to_string(),
            subject: None,
            signature: "61c4464322a65e23278b1e558ded1702b77fa7c7434feb29381360b862d3e1fc7a33a9af70b7eb50116a6446126319d327f13d6b180d7bff0aab882d14118286b04bc11503f0ea98729be47bdd86d0d5f8b92a3be8bf1d88f90a05b6a9dec36d95590bec2cac073b0f5a34f75a9fe41d22cb2df75338f78c90d544875b8832c829e21638108e7fdec7bdded10b12991a557146b316cf624380f3f8bd9cf9859aed8b65e84bb9a62e2532ec231feebc5aeea94b8b300a110983e11ba68b3673086f1ccb709353bf0232ff2c5c9f71a224f10a356ab008ba879b48a944559cf135f0ab270de175ddef52d80284214e1f2724cd390c990fcbd7e8f429d36ef459f4".to_string(),
            message_hash: "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9".to_string(),
            hash_alg: None
        };

        let signer = RsaSigner::new(api_host, api_key, None);

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
            key_type: bloock_keys::KeyType::Rsa2048,
            protection: bloock_keys::entity::protection_level::ProtectionLevel::SOFTWARE,
            expiration: None,
        };
        let managed_key =
            ManagedKey::new(&managed_key_params, api_host.clone(), api_key.clone(), None)
                .await
                .unwrap();

        let signature = Signature {
            alg: SignAlg::RsaM,
            key: managed_key.id.to_string(),
            subject: None,
            signature: "61c4464322a65e23278b1e558ded1702b77fa7c7434feb29381360b862d3e1fc7a33a9af70b7eb50116a6446126319d327f13d6b180d7bff0aab882d14118286b04bc11503f0ea98729be47bdd86d0d5f8b92a3be8bf1d88f90a05b6a9dec36d95590bec2cac073b0f5a34f75a9fe41d22cb2df75338f78c90d544875b8832c829e21638108e7fdec7bdded10b12991a557146b316cf624380f3f8bd9cf9859aed8b65e84bb9a62e2532ec231feebc5aeea94b8b300a110983e11ba68b3673086f1ccb709353bf0232ff2c5c9f71a224f10a356ab008ba879b48a944559cf135f0ab270de175ddef52d80284214e1f2724cd390c990fcbd7e8f429d36ef459f4".to_string(),
            message_hash: "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9".to_string(),
            hash_alg: None
        };

        let signer = RsaSigner::new(api_host, api_key, None);

        let result = signer
            .verify_managed(string_payload.as_bytes(), &signature)
            .await
            .unwrap();

        assert!(!result);
    }
}
