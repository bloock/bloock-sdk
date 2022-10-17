use aes_gcm::{
    aead::{generic_array::GenericArray, Aead, Payload},
    AeadInPlace, Aes256Gcm, KeyInit,
};
use rand::RngCore;

use crate::{EncrypterError, Result};

use super::{Decrypter, Encrypter, Encryption};

const AES_ALG: &str = "AES";

const NONCE_LEN: usize = 12; // 96 bits
const TAG_LEN: usize = 16; // 128 bits
const KEY_LEN: usize = 32; // 256 bits

pub struct AesEncrypterArgs {
    pub key: [u8; KEY_LEN],
}
impl AesEncrypterArgs {
    pub fn new(secret: [u8; KEY_LEN]) -> Self {
        Self { key: secret }
    }
}

pub struct AesEncrypter {
    args: AesEncrypterArgs,
}

impl AesEncrypter {
    pub fn new(args: AesEncrypterArgs) -> Self {
        Self { args }
    }
}

impl Encrypter for AesEncrypter {
    fn encrypt(&self, payload: &[u8], associated_data: &[u8]) -> Result<Encryption> {
        let mut data = vec![0; NONCE_LEN + payload.len() + TAG_LEN];

        // Split data into three: nonce, input/output, tag
        let (nonce, in_out) = data.split_at_mut(NONCE_LEN);
        let (in_out, tag) = in_out.split_at_mut(payload.len());

        in_out.copy_from_slice(payload);

        // Fill nonce piece with random data.
        rand::thread_rng()
            .try_fill_bytes(nonce)
            .map_err(|err| EncrypterError::FailedToFillNonce(err.to_string()))?;
        let nonce = GenericArray::clone_from_slice(nonce);

        let aead = Aes256Gcm::new(GenericArray::from_slice(&self.args.key));
        let aad_tag = aead
            .encrypt_in_place_detached(&nonce, associated_data, in_out)
            .map_err(|err| EncrypterError::FailedToEncryptInPlace(err.to_string()))?;

        // Copy the tag into the tag piece.
        tag.copy_from_slice(&aad_tag);

        Ok(Encryption {
            protected: base64::encode(&data),
            header: super::EncryptionHeader {
                alg: AES_ALG.to_string(),
            },
        })
    }
}

pub struct AesDecrypterArgs {
    pub key: [u8; KEY_LEN],
}
impl AesDecrypterArgs {
    pub fn new(key: [u8; KEY_LEN]) -> Self {
        Self { key }
    }
}

pub struct AesDecrypter {
    args: AesDecrypterArgs,
}

impl AesDecrypter {
    pub fn new(args: AesDecrypterArgs) -> Self {
        Self { args }
    }
}

impl Decrypter for AesDecrypter {
    fn decrypt(&self, cipher_text: &str, associated_data: &[u8]) -> Result<Vec<u8>> {
        let data = base64::decode(cipher_text).map_err(|_| EncrypterError::InvalidBase64())?;
        if data.len() <= NONCE_LEN {
            return Err(EncrypterError::InvalidPayloadLength());
        }

        let (nonce, cipher) = data.split_at(NONCE_LEN);
        let payload = Payload {
            msg: cipher,
            aad: associated_data,
        };

        let aead = Aes256Gcm::new(GenericArray::from_slice(&self.args.key));
        Ok(aead
            .decrypt(GenericArray::from_slice(nonce), payload)
            .map_err(|_| EncrypterError::BadSeal())?)
    }
}

#[cfg(test)]
mod tests {
    use aes_gcm::{aead::OsRng, Aes256Gcm, KeyInit};

    use crate::{
        aes::{AesDecrypter, AesDecrypterArgs},
        Decrypter, Encrypter,
    };

    use super::{AesEncrypter, AesEncrypterArgs};

    #[test]
    fn test_aes_encryption() {
        let key = Aes256Gcm::generate_key(&mut OsRng);
        let encrypter = AesEncrypter {
            args: AesEncrypterArgs {
                key: key.try_into().expect("Invalid key"),
            },
        };

        let payload = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
        let payload_bytes = payload.as_bytes();
        let aad = "user_id".as_bytes();

        let cipher_text = encrypter.encrypt(payload_bytes, aad).unwrap();

        let decrypter = AesDecrypter {
            args: AesDecrypterArgs {
                key: key.try_into().expect("Invalid key"),
            },
        };

        let decrypted_payload_bytes = decrypter.decrypt(&cipher_text.protected, aad).unwrap();
        let decrypted_payload = std::str::from_utf8(&decrypted_payload_bytes).unwrap();

        assert_eq!(payload_bytes, decrypted_payload_bytes);
        assert_eq!(payload, decrypted_payload);
    }

    #[test]
    fn test_aes_encryption_invalid_decryption_aad() {
        let key = Aes256Gcm::generate_key(&mut OsRng);
        let encrypter = AesEncrypter {
            args: AesEncrypterArgs {
                key: key.try_into().expect("Invalid key"),
            },
        };

        let payload = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
        let payload_bytes = payload.as_bytes();
        let aad = "user_id".as_bytes();

        let cipher_text = encrypter.encrypt(payload_bytes, aad).unwrap();

        let decrypter = AesDecrypter {
            args: AesDecrypterArgs {
                key: key.try_into().expect("Invalid key"),
            },
        };

        let invalid_aad = "different_user_id".as_bytes();
        let decrypted_payload_bytes = decrypter.decrypt(&cipher_text.protected, invalid_aad);
        assert!(decrypted_payload_bytes.is_err());
    }

    #[test]
    fn test_aes_encryption_invalid_decryption_key() {
        let key = Aes256Gcm::generate_key(&mut OsRng);
        let encrypter = AesEncrypter {
            args: AesEncrypterArgs {
                key: key.try_into().expect("Invalid key"),
            },
        };

        let payload = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
        let payload_bytes = payload.as_bytes();
        let aad = "user_id".as_bytes();

        let cipher_text = encrypter.encrypt(payload_bytes, aad).unwrap();

        let decrypter = AesDecrypter {
            args: AesDecrypterArgs { key: [0; 32] },
        };

        let decrypted_payload_bytes = decrypter.decrypt(&cipher_text.protected, aad);
        assert!(decrypted_payload_bytes.is_err());
    }
}
