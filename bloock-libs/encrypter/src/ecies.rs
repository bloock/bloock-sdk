use crate::{Decrypter, Encrypter, EncrypterError, Result};

pub struct EciesKeyPair {
    pub public_key: Vec<u8>,
    pub private_key: Vec<u8>,
}

pub fn generate_ecies_key_pair() -> EciesKeyPair {
    let (private_key, public_key) = ecies::utils::generate_keypair();
    EciesKeyPair {
        public_key: public_key.serialize().to_vec(),
        private_key: private_key.serialize().to_vec(),
    }
}

pub struct EciesEncrypterArgs {
    public_key: Vec<u8>,
}

impl EciesEncrypterArgs {
    pub fn new(public_key: &[u8]) -> Self {
        Self {
            public_key: public_key.to_vec(),
        }
    }
}

pub struct EciesEncrypter {
    args: EciesEncrypterArgs,
}

impl EciesEncrypter {
    pub fn new(args: EciesEncrypterArgs) -> Self {
        Self { args }
    }
}

impl Encrypter for EciesEncrypter {
    fn encrypt(&self, payload: &[u8]) -> Result<Vec<u8>> {
        Ok(ecies::encrypt(&self.args.public_key, payload)
            .map_err(|err| EncrypterError::FailedToEncrypt(err.to_string()))?)
    }
}

pub struct EciesDecrypterArgs {
    private_key: Vec<u8>,
}

impl EciesDecrypterArgs {
    pub fn new(private_key: &[u8]) -> Self {
        Self {
            private_key: private_key.to_vec(),
        }
    }
}

pub struct EciesDecrypter {
    args: EciesDecrypterArgs,
}

impl EciesDecrypter {
    pub fn new(args: EciesDecrypterArgs) -> Self {
        Self { args }
    }
}

impl Decrypter for EciesDecrypter {
    fn decrypt(&self, cipher_text: &[u8]) -> Result<Vec<u8>> {
        Ok(ecies::decrypt(&self.args.private_key, cipher_text)
            .map_err(|err| EncrypterError::FailedToDecrypt(err.to_string()))?)
    }
}

#[cfg(test)]
mod tests {
    use crate::{
        ecies::{
            generate_ecies_key_pair, EciesDecrypter, EciesDecrypterArgs, EciesEncrypter,
            EciesEncrypterArgs,
        },
        Decrypter, Encrypter,
    };

    #[test]
    fn test_ecies_encryption() {
        let payload = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";

        let key_pair = generate_ecies_key_pair();
        let encrypter = EciesEncrypter::new(EciesEncrypterArgs::new(&key_pair.public_key));

        let ciphertext = encrypter.encrypt(payload.as_bytes()).unwrap();
        assert_ne!(ciphertext, payload.as_bytes());

        let decrypter = EciesDecrypter::new(EciesDecrypterArgs::new(&key_pair.private_key));

        let decrypted_payload_bytes = decrypter.decrypt(&ciphertext).unwrap();
        let decrypted_payload = std::str::from_utf8(&decrypted_payload_bytes).unwrap();

        assert_eq!(payload.as_bytes(), decrypted_payload_bytes);
        assert_eq!(payload, decrypted_payload);
    }

    #[test]
    fn test_ecies_encryption_invalid_decryption_key() {
        let payload = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
        let payload_bytes = payload.as_bytes();

        let key_pair = generate_ecies_key_pair();

        let encrypter = EciesEncrypter::new(EciesEncrypterArgs::new(&key_pair.public_key));

        let ciphertext = encrypter.encrypt(payload_bytes).unwrap();

        let invalid_key = &[1, 2, 3];
        let decrypter = EciesDecrypter::new(EciesDecrypterArgs::new(invalid_key));

        let decrypted_payload_bytes = decrypter.decrypt(&ciphertext);
        assert!(decrypted_payload_bytes.is_err());
    }

    #[test]
    fn test_ecies_decryption_invalid_payload() {
        let unencrypted_payload = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
        let decrypter = EciesDecrypter::new(EciesDecrypterArgs::new(&[1, 2, 3]));
        assert!(decrypter.decrypt(unencrypted_payload.as_bytes()).is_err());
    }
}
