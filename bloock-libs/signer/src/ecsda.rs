use bloock_hasher::{sha256::Sha256, Hasher};
use libsecp256k1::{Message, PublicKey, SecretKey};

use crate::SignerError;

use super::{Signature, Signer};
use std::str;

pub struct EcsdaSignerArgs {
    pub private_key: String,
}
impl EcsdaSignerArgs {
    pub fn new(private_key: &str) -> Self {
        Self {
            private_key: private_key.to_string(),
        }
    }
}

pub struct EcsdaSigner {
    _args: EcsdaSignerArgs,
}

impl EcsdaSigner {
    pub fn new(args: EcsdaSignerArgs) -> Self {
        Self { _args: args }
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

impl Signer for EcsdaSigner {
    fn sign(&self, payload: &[u8]) -> crate::Result<Signature> {
        let secret_key_hex = hex::decode(self._args.private_key.as_bytes())
            .map_err(|e| SignerError::InvalidSecretKey(e.to_string()))?;
        let secret_key = SecretKey::parse_slice(&secret_key_hex)
            .map_err(|e| SignerError::InvalidSecretKey(e.to_string()))?;
        let public_key = PublicKey::from_secret_key(&secret_key);

        let hash = Sha256::generate_hash(payload);

        let message = Message::parse(&hash);

        let sig = libsecp256k1::sign(&message, &secret_key);

        let signature = Signature {
            protected: base64_url::encode("{}"),
            signature: hex::encode(sig.0.serialize()),
            header: crate::SignatureHeader {
                alg: "ES256K".to_string(),
                kid: hex::encode(public_key.serialize_compressed()),
            },
        };

        Ok(signature)
    }

    fn verify(&self, payload: &[u8], signature: Signature) -> crate::Result<bool> {
        let public_key_hex = hex::decode(signature.header.kid.as_bytes())
            .map_err(|e| SignerError::InvalidPublicKey(e.to_string()))?;

        let public_key = PublicKey::parse_slice(&public_key_hex, None)
            .map_err(|e| SignerError::InvalidPublicKey(e.to_string()))?;

        let hash = Sha256::generate_hash(payload);
        let message = Message::parse(&hash);

        let signature_string = hex::decode(signature.signature)
            .map_err(|e| SignerError::InvalidSignature(e.to_string()))?;

        let signature = libsecp256k1::Signature::parse_standard_slice(&signature_string)
            .map_err(|e| SignerError::InvalidSignature(e.to_string()))?;

        Ok(libsecp256k1::verify(&message, &signature, &public_key))
    }
}

#[cfg(test)]
mod tests {
    use crate::{
        ecsda::{EcsdaSigner, EcsdaSignerArgs},
        Signature, SignatureHeader, Signer,
    };

    #[test]
    fn test_sign_and_verify_ok() {
        let (pvk, _pb) = match EcsdaSigner::generate_keys() {
            Ok((pvk, pb)) => (pvk, pb),
            Err(e) => panic!("{}", e),
        };

        let string_payload = "hello world";

        let c = EcsdaSigner::new(EcsdaSignerArgs { private_key: pvk });
        let signature = match c.sign(string_payload.as_bytes()) {
            Ok(signature) => signature,
            Err(e) => panic!("{}", e),
        };
        assert_eq!(signature.header.alg.as_str(), "ES256K");

        let result = match c.verify(string_payload.as_bytes(), signature) {
            Ok(result) => result,
            Err(e) => panic!("{}", e),
        };
        assert!(result);
    }

    #[test]
    fn test_sign_invalid_private_key() {
        let string_payload = "hello world";
        let pvk = "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945";

        let c = EcsdaSigner::new(EcsdaSignerArgs {
            private_key: pvk.to_string(),
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

        let c = EcsdaSigner::new(EcsdaSignerArgs {
            private_key: "".to_string(),
        });
        let result = c.verify(string_payload.as_bytes(), json_signature);

        assert!(result.is_err());
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

        let c = EcsdaSigner::new(EcsdaSignerArgs {
            private_key: "".to_string(),
        });
        let result = c.verify(string_payload.as_bytes(), json_signature);

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

        let c = EcsdaSigner::new(EcsdaSignerArgs {
            private_key: "".to_string(),
        });
        let result = c.verify(string_payload.as_bytes(), json_signature);

        assert!(result.is_err());
    }
}
