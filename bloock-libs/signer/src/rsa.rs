use async_trait::async_trait;
use bloock_hasher::{sha256::Sha256 as Hash256, Hasher};
use bloock_keys::keys::{local::LocalKey, managed::ManagedKey};
use rsa::{
    pkcs1v15::{SigningKey, VerifyingKey, Signature},
    pkcs8::{DecodePrivateKey, DecodePublicKey},
    sha2::Sha256,
    signature::{Signer, Verifier, SignatureEncoding}
};

use crate::{
    entity::{alg::SignAlg, signature::Signature as BloockSignature},
    Signer as BloockSigner,
};

pub struct RsaSigner {
    api_host: String,
    api_key: String,
}

impl RsaSigner {
    pub fn new(api_host: String, api_key: String) -> Self {
        Self { api_host, api_key }
    }

    pub fn new_boxed(api_host: String, api_key: String) -> Box<Self> {
        Box::new(Self::new(api_host, api_key))
    }
}

#[async_trait(?Send)]
impl BloockSigner for RsaSigner {
    async fn sign_local(&self, payload: &[u8], key: &LocalKey<String>) -> crate::Result<BloockSignature> {
        let private_key =
            rsa::RsaPrivateKey::from_pkcs8_pem(&key.private_key.clone().unwrap()).unwrap();
        let signer = SigningKey::<Sha256>::new(private_key.clone());

        let hash = Hash256::generate_hash(&[payload]);
        println!("{:?}", hex::encode(hash));
        let signature = signer.sign(&hash).to_vec();

        let signature = BloockSignature {
            alg: SignAlg::Rsa2048,
            kid: key.key.clone(),
            signature: hex::encode(signature),
            message_hash: hex::encode(hash),
        };

        Ok(signature)
    }

    async fn sign_managed(&self, payload: &[u8], key: &ManagedKey) -> crate::Result<BloockSignature> {
        todo!()
    }

    async fn verify_local(&self, payload: &[u8], signature: &BloockSignature) -> crate::Result<bool> {
        let public_key = rsa::RsaPublicKey::from_public_key_pem(&signature.kid).unwrap();    

        let verifying_key = VerifyingKey::<Sha256>::new(public_key);
        let signature_bytes = hex::decode(signature.signature.clone()).unwrap();

        let sign = Signature::try_from(signature_bytes.as_slice()).unwrap();

        let hash = Hash256::generate_hash(&[payload]);

        Ok(verifying_key.verify(&hash, &sign).is_ok())
    }

    async fn verify_managed(&self, payload: &[u8], signature: &BloockSignature) -> crate::Result<bool> {
        todo!()
    }
}

#[cfg(test)]
mod tests {
    use crate::{entity::alg::SignAlg, rsa::RsaSigner, Signer};
    use bloock_keys::keys::{local::LocalKey};

    #[tokio::test]
    async fn test_sign_local_ok() {
        let api_host = "".to_string();
        let api_key = "".to_string();

        let local_key_params = bloock_keys::keys::local::LocalKeyParams {
            key_type: bloock_keys::KeyType::Rsa2048,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();

        let string_payload = "hello world";

        let signer = RsaSigner::new(api_host, api_key);

        let signature = signer
            .sign_local(string_payload.as_bytes(), &local_key)
            .await
            .unwrap();

        assert_eq!(signature.alg, SignAlg::Rsa2048);
        assert_eq!(signature.kid, local_key.key);

        let result = signer
            .verify_local(string_payload.as_bytes(), &signature)
            .await
            .unwrap();

        assert!(result);
    }
}
