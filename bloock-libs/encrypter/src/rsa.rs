use crate::{Decrypter, Encrypter, EncrypterError, Result};
use rsa::{
    pkcs8::{DecodePrivateKey, DecodePublicKey},
    PaddingScheme, PublicKey, RsaPrivateKey, RsaPublicKey,
};

pub const RSA_ALG: &str = "RSA";

pub struct RsaEncrypterArgs {
    public_key: String,
}

impl RsaEncrypterArgs {
    pub fn new(public_key: &str) -> Self {
        Self {
            public_key: public_key.to_string(),
        }
    }
}

pub struct RsaEncrypter {
    args: RsaEncrypterArgs,
}

impl RsaEncrypter {
    pub fn new(args: RsaEncrypterArgs) -> Box<Self> {
        Box::new(Self { args })
    }
}

impl Encrypter for RsaEncrypter {
    fn encrypt(&self, payload: &[u8]) -> Result<Vec<u8>> {
        let mut rng = rand::thread_rng();

        let public_key = RsaPublicKey::from_public_key_pem(&self.args.public_key)
            .map_err(|err| EncrypterError::InvalidKey(err.to_string()))?;

        let padding = PaddingScheme::new_oaep::<sha2::Sha256>();

        public_key
            .encrypt(&mut rng, padding, payload)
            .map_err(|err| EncrypterError::FailedToEncrypt(err.to_string()))
    }

    fn get_alg(&self) -> &str {
        RSA_ALG
    }
}

pub struct RsaDecrypterArgs {
    private_key: String,
}

impl RsaDecrypterArgs {
    pub fn new(private_key: &str) -> Self {
        Self {
            private_key: private_key.to_string(),
        }
    }
}

pub struct RsaDecrypter {
    args: RsaDecrypterArgs,
}

impl RsaDecrypter {
    pub fn new(args: RsaDecrypterArgs) -> Box<Self> {
        Box::new(Self { args })
    }
}

impl Decrypter for RsaDecrypter {
    fn decrypt(&self, cipher_text: &[u8]) -> Result<Vec<u8>> {
        let private_key = RsaPrivateKey::from_pkcs8_pem(&self.args.private_key)
            .map_err(|err| EncrypterError::InvalidKey(err.to_string()))?;
        let padding = PaddingScheme::new_oaep::<sha2::Sha256>();
        private_key
            .decrypt(padding, cipher_text)
            .map_err(|err| EncrypterError::FailedToDecrypt(err.to_string()))
    }
}

#[cfg(test)]
mod tests {
    use bloock_keys::keys::rsa::RsaKey;

    use crate::{
        rsa::{RsaDecrypter, RsaDecrypterArgs, RsaEncrypter, RsaEncrypterArgs},
        Decrypter, Encrypter,
    };

    #[test]
    fn test_rsa_encryption() {
        let payload = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";

        let keys = RsaKey::new_rsa_2048().unwrap();
        let encrypter = RsaEncrypter::new(RsaEncrypterArgs::new(&keys.public_key));

        let ciphertext = encrypter.encrypt(payload.as_bytes()).unwrap();
        assert_ne!(ciphertext, payload.as_bytes());

        let decrypter = RsaDecrypter::new(RsaDecrypterArgs::new(&keys.private_key));

        let decrypted_payload_bytes = decrypter.decrypt(&ciphertext).unwrap();
        let decrypted_payload = std::str::from_utf8(&decrypted_payload_bytes).unwrap();

        assert_eq!(payload.as_bytes(), decrypted_payload_bytes);
        assert_eq!(payload, decrypted_payload);
    }

    #[test]
    fn test_rsa_encryption_invalid_decryption_key() {
        let payload = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
        let payload_bytes = payload.as_bytes();

        let keys = RsaKey::new_rsa_2048().unwrap();

        let encrypter = RsaEncrypter::new(RsaEncrypterArgs::new(&keys.public_key));

        let ciphertext = encrypter.encrypt(payload_bytes).unwrap();

        let decrypter = RsaDecrypter::new(RsaDecrypterArgs::new("incorrect_key"));

        let decrypted_payload_bytes = decrypter.decrypt(&ciphertext);
        assert!(decrypted_payload_bytes.is_err());
    }

    #[test]
    fn test_rsa_decryption_invalid_payload() {
        let unencrypted_payload = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
        let decrypter = RsaDecrypter::new(RsaDecrypterArgs::new("private_key"));
        assert!(decrypter.decrypt(unencrypted_payload.as_bytes()).is_err());
    }
}
