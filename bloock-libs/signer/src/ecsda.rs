use crate::SignerError;

use super::{JWSignatures, Signature, Signer};
use josekit::jws::{self, alg::ecdsa::EcdsaJwsAlgorithm, JwsHeaderSet, ES256K};
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
        let key_pair = ES256K
            .generate_key_pair()
            .map_err(|e| SignerError::KeyPairError(e.to_string()))?;

        let pem_bytes_pvk = key_pair.to_pem_private_key();
        let pem_string_pvk = str::from_utf8(&pem_bytes_pvk)
            .map_err(|e| SignerError::StringConversionError(e.to_string()))?;

        let pem_bytes_puk = key_pair.to_pem_public_key();
        let pem_string_puk = str::from_utf8(&pem_bytes_puk)
            .map_err(|e| SignerError::StringConversionError(e.to_string()))?;

        Ok((pem_string_pvk.to_string(), pem_string_puk.to_string()))
    }
}

impl Signer for EcsdaSigner {
    fn sign(&self, payload: &[u8]) -> crate::Result<Signature> {
        let key_pair = ES256K
            .key_pair_from_pem(self._args.private_key.as_bytes())
            .map_err(|e| SignerError::KeyPairError(e.to_string()))?;

        let pem_bytes_pub = key_pair.to_pem_public_key();
        let pem_string_pub =
            str::from_utf8(&pem_bytes_pub).map_err(|e| SignerError::KeyPairError(e.to_string()))?;

        let signer = ES256K
            .signer_from_jwk(&key_pair.to_jwk_key_pair())
            .map_err(|e| SignerError::SignerError(e.to_string()))?;

        let mut header = JwsHeaderSet::new();
        header.set_algorithm(EcdsaJwsAlgorithm::Es256k.to_string(), false);
        header.set_key_id(pem_string_pub, false);
        let json = jws::serialize_general_json(payload, &[(&header, &*signer)])
            .map_err(|e| SignerError::GeneralSerializeError(e.to_string()))?;

        let jws_signatures: JWSignatures = serde_json::from_str(&json).unwrap();
        let signature: Signature = Signature::from(jws_signatures);

        Ok(signature)
    }

    fn verify(&self, payload: &[u8], signature: Signature) -> crate::Result<bool> {
        let string_payload = str::from_utf8(payload)
            .map_err(|e| SignerError::StringConversionError(e.to_string()))?;
        let string_base64url_encoded = base64_url::encode(string_payload);

        let pem_bytes_pub = signature.header.kid.as_bytes();

        let verifier = ES256K
            .verifier_from_pem(pem_bytes_pub)
            .map_err(|e| SignerError::VerifierError(e.to_string()))?;

        let vec_signatures = vec![signature];
        let new_json = JWSignatures {
            signatures: vec_signatures,
            payload: string_base64url_encoded,
        };
        let json = serde_json::to_string(&new_json).unwrap();

        let (_payload, _header) = jws::deserialize_json(json.as_bytes(), &verifier)
            .map_err(|e| SignerError::GeneralDeserializeError(e.to_string()))?;

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
        let pvk = "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c9457";

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
            kid: "-----BEGIN PUBLIC KEY-----\nMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEW436VueS4NXvQskFbPuxIaRdZmBxzk1N\nXi/gFe+IJXQU/1o6UyeQEdoxZUWgMZH/r5nMPqDp1SfJ3CsdmYkR0A==\n-----END PUBLIC KEY-----\n".to_string()
        };

        let json_signature = Signature {
            protected: "e30".to_string(),
            header: json_header,
            signature: "plwTypQkIjJlg4jCjqSba4qUonhXuL1IejRwJ-0dwPmFW3_cPh77QcNqETX-K9WBHw2CqAPtPg71g8AY-RFbxg".to_string(),
        };

        let c = EcsdaSigner::new(EcsdaSignerArgs {
            private_key: "".to_string(),
        });
        let result = c.verify(string_payload.as_bytes(), json_signature);

        assert!(result.is_err());
    }

    #[test]
    fn test_verify_invalid_verifier_format() {
        let string_payload = "hello world";

        let json_header = SignatureHeader {
            alg: "ES256K".to_string(),
            kid: "MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEW436VueS4NXvQskFbPuxIaRdZmBxzk1N\nXi/gFe+IJXQU/1o6UyeQEdoxZUWgMZH/r5nMPqDp1SfJ3CsdmYkR0A==".to_string()
        };

        let json_signature = Signature {
            protected: "e30".to_string(),
            header: json_header,
            signature: "plwTypQkIjJlg4jCjqSba4qUonhXuL1IejRwJ-0dwPmFW3_cPh77QcNqETX-K9WBHw2CqAPtPg71g8AY-RFbxg".to_string(),
        };

        let c = EcsdaSigner::new(EcsdaSignerArgs {
            private_key: "".to_string(),
        });
        let result = c.verify(string_payload.as_bytes(), json_signature);

        assert!(result.is_err());
    }

    #[test]
    fn test_verify_invalid_algorithm() {
        let string_payload = "hello world";

        let json_header = SignatureHeader {
            alg: "ES256".to_string(),
            kid: "-----BEGIN PUBLIC KEY-----\nMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAE46ZAneMnEOsK5WvckA4PUqytnH5OxmpO\nRdBtNjvB8f4SWOppIORyY0lrd+BH47tmm0BvPLm8CyAuvjHJPD0gCA==\n-----END PUBLIC KEY-----\n".to_string()
        };

        let json_signature = Signature {
            protected: "e30".to_string(),
            header: json_header,
            signature: "plwTypQkIjJlg4jCjqSba4qUonhXuL1IejRwJ-0dwPmFW3_cPh77QcNqETX-K9WBHw2CqAPtPg71g8AY-RFbxg".to_string(),
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
            kid: "-----BEGIN PUBLIC KEY-----\nMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAE46ZAneMnEOsK5WvckA4PUqytnH5OxmpO\nRdBtNjvB8f4SWOppIORyY0lrd+BH47tmm0BvPLm8CyAuvjHJPD0gCA==\n-----END PUBLIC KEY-----\n".to_string()
        };

        let json_signature = Signature {
            protected: "e30".to_string(),
            header: json_header,
            signature: "plwTypQkIjJlg4jCjqSba4qUonhXuL1IejRwJ-0dwPmFW3_cPh77QcNqETX-K9WBHw2CqAPtPg71g8AY-RFbxg".to_string(),
        };

        let c = EcsdaSigner::new(EcsdaSignerArgs {
            private_key: "".to_string(),
        });
        let result = c.verify(string_payload.as_bytes(), json_signature);

        assert!(result.is_err());
    }
}
