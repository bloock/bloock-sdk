use crate::SignerError;

use super::{Signature, Signer};
use secp256k1::ecdsa::Signature as ECDSASignature;
use secp256k1::hashes::sha256;
use secp256k1::rand::rngs::OsRng;
use secp256k1::{Message, PublicKey, Secp256k1, SecretKey};
use std::str::{self, FromStr};

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
        let secp = Secp256k1::new();
        let (secret_key, public_key) = secp.generate_keypair(&mut OsRng);

        let secret_key_string = secret_key.display_secret().to_string();
        let public_key_string = public_key.to_string();

        Ok((secret_key_string, public_key_string))
    }
}

impl Signer for EcsdaSigner {
    fn sign(&self, payload: &[u8]) -> crate::Result<Signature> {
        let secp = Secp256k1::new();
        let secret_key = SecretKey::from_str(self._args.private_key.as_str())
            .map_err(|e| SignerError::InvalidSecretKey(e.to_string()))?;
        let public_key = PublicKey::from_secret_key(&secp, &secret_key);

        let message = Message::from_hashed_data::<sha256::Hash>(payload);

        let sig = secp.sign_ecdsa(&message, &secret_key);

        let signature = Signature {
            protected: base64_url::encode("{}"),
            signature: sig.to_string(),
            header: crate::SignatureHeader {
                alg: ("ES256K".to_string()),
                kid: (public_key.to_string()),
            },
        };

        Ok(signature)
    }

    fn verify(&self, payload: &[u8], signature: Signature) -> crate::Result<bool> {
        let secp = Secp256k1::new();

        let public_key_string = signature.header.kid;
        let public_key = PublicKey::from_str(&public_key_string)
            .map_err(|e| SignerError::InvalidPublicKey(e.to_string()))?;

        let message = Message::from_hashed_data::<sha256::Hash>(payload);

        let signature_string = signature.signature;
        let signature = ECDSASignature::from_str(&signature_string)
            .map_err(|e| SignerError::InvalidSignature(e.to_string()))?;

        secp.verify_ecdsa(&message, &signature, &public_key)
            .map_err(|e| SignerError::VerifierError(e.to_string()))?;

        Ok(true)
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
