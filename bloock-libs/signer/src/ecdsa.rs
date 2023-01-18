use bloock_hasher::{sha256::Sha256, Hasher, H256};
use libsecp256k1::{Message, PublicKey, RecoveryId, SecretKey};

use crate::{Algorithms, ProtectedHeader, Result, Signature, SignerError, Verifier};

use super::Signer;
use std::str;

pub const ECDSA_ALG: &str = "ES256K";

pub fn get_common_name(signature: &Signature) -> Result<String> {
    ProtectedHeader::deserialize(&signature.protected)
        .map_err(|err| SignerError::CommonNameNotSetOrInvalidFormat(err.to_string()))?
        .common_name
        .ok_or_else(|| {
            SignerError::CommonNameNotSetOrInvalidFormat("common name not set".to_string())
        })
}

pub fn recover_public_key(signature: &Signature, message_hash: H256) -> Result<Vec<u8>> {
    let signature_bytes = hex::decode(signature.signature.clone())
        .map_err(|e| SignerError::InvalidPublicKey(e.to_string()))?;

    if signature_bytes.len() != 65 {
        return Err(SignerError::InvalidSignature(
            "Invalid signature lenght".to_string(),
        ));
    }

    let message = Message::parse(&message_hash);
    let recovery_id = RecoveryId::parse(signature_bytes[64]).unwrap();
    let parsed_sig = libsecp256k1::Signature::parse_standard_slice(&signature_bytes[..64]).unwrap();

    Ok(libsecp256k1::recover(&message, &parsed_sig, &recovery_id)
        .map_err(|e| SignerError::InvalidPublicKey(e.to_string()))?
        .serialize_compressed()
        .to_vec())
}

pub struct EcdsaSignerArgs {
    pub private_key: String,
    pub common_name: Option<String>,
}

impl EcdsaSignerArgs {
    pub fn new(private_key: &str, common_name: Option<String>) -> Self {
        Self {
            private_key: private_key.to_string(),
            common_name,
        }
    }
}

pub struct EcdsaSigner {
    args: EcdsaSignerArgs,
}

impl EcdsaSigner {
    pub fn new(args: EcdsaSignerArgs) -> Self {
        Self { args }
    }

    pub fn new_boxed(args: EcdsaSignerArgs) -> Box<Self> {
        Box::new(Self::new(args))
    }

    pub fn generate_keys() -> crate::Result<(String, String)> {
        let secret_key = SecretKey::random(&mut rand::rngs::OsRng::default());
        let public_key = PublicKey::from_secret_key(&secret_key);
        Ok((
            hex::encode(secret_key.serialize()),
            hex::encode(public_key.serialize_compressed()),
        ))
    }
}

impl Signer for EcdsaSigner {
    fn sign(&self, payload: &[u8]) -> crate::Result<Signature> {
        let secret_key_hex = hex::decode(self.args.private_key.as_bytes())
            .map_err(|e| SignerError::InvalidSecretKey(e.to_string()))?;
        let secret_key = SecretKey::parse_slice(&secret_key_hex)
            .map_err(|e| SignerError::InvalidSecretKey(e.to_string()))?;
        let public_key = PublicKey::from_secret_key(&secret_key);

        let protected = match self.args.common_name.clone() {
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

        let hash = Sha256::generate_hash(if protected == base64_url::encode("{}") {
            // to keep backwards compatibility if the protected header is empty we just sign the payload
            payload
        } else {
            payload_with_protected
        });

        let message = Message::parse(&hash);

        let (sig, recovery_id) = libsecp256k1::sign(&message, &secret_key);

        // buffer = [signature;0..64 | recovery_id;65]
        let mut buffer = [0u8; 65];
        buffer[0..64].copy_from_slice(&sig.serialize()[..]);
        buffer[64] = recovery_id.serialize();

        let signature = Signature {
            protected,
            signature: hex::encode(buffer),
            header: crate::SignatureHeader {
                alg: Algorithms::Ecdsa.to_string(),
                kid: hex::encode(public_key.serialize_compressed()),
            },
        };

        Ok(signature)
    }
}

#[derive(Default)]
pub struct EcdsaVerifier {}

impl Verifier for EcdsaVerifier {
    fn verify(&self, payload: &[u8], signature: Signature) -> crate::Result<bool> {
        let public_key_hex = hex::decode(signature.header.kid.as_bytes())
            .map_err(|e| SignerError::InvalidPublicKey(e.to_string()))?;

        let public_key = PublicKey::parse_slice(&public_key_hex, None)
            .map_err(|e| SignerError::InvalidPublicKey(e.to_string()))?;

        let payload_with_protected = &[signature.protected.clone(), base64_url::encode(payload)]
            .join(".")
            .as_bytes()
            .to_owned();

        let hash = Sha256::generate_hash(if signature.protected == base64_url::encode("{}") {
            // to keep backwards compatibility if the protected header is empty we just verify the payload
            payload
        } else {
            payload_with_protected
        });

        let message = Message::parse(&hash);

        let signature_bytes = hex::decode(signature.signature)
            .map_err(|e| SignerError::InvalidSignature(e.to_string()))?;

        let signature = libsecp256k1::Signature::parse_standard_slice(&signature_bytes[..64])
            .map_err(|e| SignerError::InvalidSignature(e.to_string()))?;

        Ok(libsecp256k1::verify(&message, &signature, &public_key))
    }
}

#[cfg(test)]
mod tests {
    use bloock_hasher::{sha256::Sha256, Hasher};

    use crate::{
        create_verifier_from_signature,
        ecdsa::{get_common_name, EcdsaSigner, EcdsaSignerArgs},
        Signature, SignatureHeader, Signer,
    };

    use super::recover_public_key;

    #[test]
    fn test_sign_and_verify_ok() {
        let (pvk, _pb) = EcdsaSigner::generate_keys().unwrap();

        let string_payload = "hello world";

        let c = EcdsaSigner::new(EcdsaSignerArgs {
            private_key: pvk,
            common_name: None,
        });

        let signature = c.sign(string_payload.as_bytes()).unwrap();

        assert_eq!(signature.header.alg.as_str(), "ES256K");

        let result = create_verifier_from_signature(&signature)
            .unwrap()
            .verify(string_payload.as_bytes(), signature)
            .unwrap();

        assert!(result);
    }

    #[test]
    fn test_sign_and_verify_ok_set_common_name() {
        let (pvk, _pb) = EcdsaSigner::generate_keys().unwrap();

        let string_payload = "hello world";

        let c = EcdsaSigner::new(EcdsaSignerArgs {
            private_key: pvk,
            common_name: Some("a name".to_string()),
        });

        let signature = c.sign(string_payload.as_bytes()).unwrap();

        assert_eq!(signature.header.alg.as_str(), "ES256K");
        assert_eq!(get_common_name(&signature).unwrap().as_str(), "a name");

        let result = create_verifier_from_signature(&signature)
            .unwrap()
            .verify(string_payload.as_bytes(), signature)
            .unwrap();

        assert!(result);
    }

    #[test]
    fn test_sign_and_verify_ok_get_common_name_without_set() {
        let (pvk, _pb) = EcdsaSigner::generate_keys().unwrap();

        let string_payload = "hello world";

        let c = EcdsaSigner::new(EcdsaSignerArgs {
            private_key: pvk,
            common_name: None,
        });

        let signature = c.sign(string_payload.as_bytes()).unwrap();

        assert_eq!(signature.header.alg.as_str(), "ES256K");
        assert!(get_common_name(&signature).is_err());
    }

    #[test]
    fn test_sign_invalid_private_key() {
        let string_payload = "hello world";
        let pvk = "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945";

        let c = EcdsaSigner::new(EcdsaSignerArgs {
            private_key: pvk.to_string(),
            common_name: None,
        });
        let result = c.sign(string_payload.as_bytes());
        assert!(result.is_err());
    }

    #[test]
    fn test_verify_invalid_signature() {
        let string_payload = "hello world";

        let json_header = SignatureHeader {
            alg: "ES256K".to_string(),
            kid: "02c4855e2b4b0ff60b939d943b00043b7fb7b9f3f44ce1c89f8e8402fd3fcb8052".to_string(),
        };

        let json_signature = Signature {
            protected: "e30".to_string(),
            header: json_header,
            signature: "3145022100c42e705c0c73f28341eec61d8dfa5c5be006a44e6c48b59103861a7c0914a1df022010b09d5de1d376ac3940b223ffd158e46f6e60d8a2e86f7224f951a850146920".to_string(),
        };

        let result = create_verifier_from_signature(&json_signature)
            .unwrap()
            .verify(string_payload.as_bytes(), json_signature)
            .unwrap();

        assert!(!result);
    }

    #[test]
    fn test_verify_invalid_public_key() {
        let string_payload = "hello world";

        let json_header = SignatureHeader {
            alg: "ES256K".to_string(),
            kid: "12c4855e2b4b0ff60b939d943b00043b7fb7b9f3f44ce1c89f8e8402fd3fcb8052".to_string(),
        };

        let json_signature = Signature {
            protected: "e30".to_string(),
            header: json_header,
            signature: "3045022100c42e705c0c73f28341eec61d8dfa5c5be006a44e6c48b59103861a7c0914a1df022010b09d5de1d376ac3940b223ffd158e46f6e60d8a2e86f7224f951a850146920".to_string(),
        };

        let result = create_verifier_from_signature(&json_signature)
            .unwrap()
            .verify(string_payload.as_bytes(), json_signature);

        assert!(result.is_err());
    }

    #[test]
    fn test_verify_invalid_payload() {
        let string_payload = "end world";

        let json_header = SignatureHeader {
            alg: "ES256K".to_string(),
            kid: "02c4855e2b4b0ff60b939d943b00043b7fb7b9f3f44ce1c89f8e8402fd3fcb8052".to_string(),
        };

        let json_signature = Signature {
            protected: "e30".to_string(),
            header: json_header,
            signature: "3045022100c42e705c0c73f28341eec61d8dfa5c5be006a44e6c48b59103861a7c0914a1df022010b09d5de1d376ac3940b223ffd158e46f6e60d8a2e86f7224f951a850146920".to_string(),
        };

        let result = create_verifier_from_signature(&json_signature)
            .unwrap()
            .verify(string_payload.as_bytes(), json_signature)
            .unwrap();

        assert!(!result);
    }

    #[test]
    fn recover_public_key_ok() {
        let (pvk, pb) = EcdsaSigner::generate_keys().unwrap();

        let string_payload = "hello world";

        let c = EcdsaSigner::new(EcdsaSignerArgs {
            private_key: pvk,
            common_name: None,
        });

        let signature = c.sign(string_payload.as_bytes()).unwrap();

        let result_key =
            recover_public_key(&signature, Sha256::generate_hash(string_payload.as_bytes()))
                .unwrap();

        assert_eq!(hex::encode(result_key), pb);
    }
}
