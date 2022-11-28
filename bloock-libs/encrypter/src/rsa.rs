use crate::{Decrypter, Encrypter, EncrypterError, Result};
use rsa::{pkcs8::DecodePrivateKey, PaddingScheme, PublicKey, RsaPrivateKey, RsaPublicKey};

pub struct RsaEncrypterArgs {
    private_key: String,
}

impl RsaEncrypterArgs {
    pub fn new(private_key: &str) -> Self {
        Self {
            private_key: private_key.to_string(),
        }
    }
}

pub struct RsaEncrypter {
    args: RsaEncrypterArgs,
}

impl RsaEncrypter {
    pub fn new(args: RsaEncrypterArgs) -> Self {
        Self { args }
    }
}

impl Encrypter for RsaEncrypter {
    fn encrypt(&self, payload: &[u8]) -> Result<Vec<u8>> {
        let mut rng = rand::thread_rng();

        let private_key = RsaPrivateKey::from_pkcs8_pem(&self.args.private_key)
            .map_err(|err| EncrypterError::FailedToEncrypt(err.to_string()))?;

        let public_key = RsaPublicKey::from(private_key);

        let padding = PaddingScheme::new_oaep::<sha2::Sha256>();

        public_key
            .encrypt(&mut rng, padding, &payload[..])
            .map_err(|err| EncrypterError::FailedToEncrypt(err.to_string()))
    }
}

pub struct RsaDecrypterArgs {
    private_key: RsaPrivateKey,
}

impl RsaDecrypterArgs {
    pub fn new(private_key: RsaPrivateKey) -> Self {
        Self { private_key }
    }
}

pub struct RsaDecrypter {
    args: RsaDecrypterArgs,
}

impl RsaDecrypter {
    pub fn new(args: RsaDecrypterArgs) -> Self {
        Self { args }
    }
}

impl Decrypter for RsaDecrypter {
    fn decrypt(&self, cipher_text: &[u8]) -> Result<Vec<u8>> {
        let padding = PaddingScheme::new_oaep::<sha2::Sha256>();
        self.args
            .private_key
            .decrypt(padding, &cipher_text)
            .map_err(|err| EncrypterError::FailedToDecrypt(err.to_string()))
    }
}
