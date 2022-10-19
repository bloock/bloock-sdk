use aes_gcm::{
    aead::{generic_array::GenericArray, Aead, Payload},
    AeadInPlace, Aes256Gcm, KeyInit,
};
use hmac::Hmac;
use pbkdf2::pbkdf2;
use rand::RngCore;
use sha2::Sha256;

use crate::{EncrypterError, Result};

use super::{Decrypter, Encrypter, Encryption};

pub const AES_ALG: &str = "A256GCMKW";
pub const AES_ENC: &str = "A256GCM";

const NONCE_LEN: usize = 12; // 96 bits
const TAG_LEN: usize = 16; // 128 bits
const KEY_LEN: usize = 32; // 256 bits
const SALT_LEN: usize = 16;
const NUM_ITERATIONS: u32 = 10;
const ITERATIONS_LEN: usize = 4; // 32 bits since it's u32

pub struct AesEncrypterArgs {
    key: [u8; KEY_LEN],
    salt: [u8; SALT_LEN],
}

impl AesEncrypterArgs {
    pub fn new(password: String) -> Self {
        let mut key = [0u8; KEY_LEN];
        let mut salt = [0u8; SALT_LEN];

        rand::thread_rng().try_fill_bytes(&mut salt).unwrap(); // TODO Define error

        pbkdf2::<Hmac<Sha256>>(password.as_bytes(), &salt, NUM_ITERATIONS, &mut key);

        Self { key, salt }
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
    fn encrypt(&self, payload: &[u8], associated_data: &[u8], cty: String) -> Result<Encryption> {
        // data = [ SALT | NUM_ITERATIONS | NONCE | ENCRYPTED_PAYLOAD | TAG ]
        let mut data = vec![0; SALT_LEN + ITERATIONS_LEN + NONCE_LEN + payload.len() + TAG_LEN];

        // Split data into three: nonce, input/output, tag
        let (metadata, in_out) = data.split_at_mut(NONCE_LEN);
        let (salt, nonce) = metadata.split_at_mut(SALT_LEN);
        let (in_out, tag) = in_out.split_at_mut(payload.len());

        salt.copy_from_slice(&self.args.salt);
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
            ciphertext: base64_url::encode(&data),
            tag: base64_url::encode(&aad_tag),
            protected: base64_url::encode("{}"),
            header: super::EncryptionHeader {
                alg: AES_ALG.to_string(),
                enc: AES_ENC.to_string(),
            },
            cty,
        })
    }
}

pub struct AesDecrypterArgs {
    pub password: String,
}
impl AesDecrypterArgs {
    pub fn new(password: String) -> Self {
        Self { password }
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
        let data = base64_url::decode(cipher_text).map_err(|_| EncrypterError::InvalidBase64())?;
        let metadata_len = NONCE_LEN + SALT_LEN + ITERATIONS_LEN;
        if data.len() <= metadata_len {
            return Err(EncrypterError::InvalidPayloadLength());
        }

        let (metadata, cipher) = data.split_at(metadata_len);
        let (key_metadata, nonce) = metadata.split_at(SALT_LEN);
        let (salt, iterations) = key_metadata.split_at(SALT_LEN);

        let mut key = [0u8; KEY_LEN];

        pbkdf2::<Hmac<Sha256>>(self.args.password.as_bytes(), &salt, NUM_ITERATIONS, &mut key);

        let payload = Payload {
            msg: cipher,
            aad: associated_data,
        };

        let aead = Aes256Gcm::new(GenericArray::from_slice(&key));
        aead.decrypt(GenericArray::from_slice(nonce), payload)
            .map_err(|_| EncrypterError::BadSeal())
    }
}

#[cfg(test)]
mod tests {
    use aes_gcm::{aead::OsRng, Aes256Gcm, KeyInit};

    use crate::{
        aes::{AesDecrypter, AesDecrypterArgs},
        Decrypter, Encrypter, EncrypterError,
    };

    use super::{AesEncrypter, AesEncrypterArgs};

    #[test]
    fn test_aes_encryption() {
        let key = Aes256Gcm::generate_key(&mut OsRng);
        let encrypter = AesEncrypter {
            args: AesEncrypterArgs {
                key: key.try_into().expect("Invalid key"),
                salt: todo!(),
            },
        };

        let payload = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
        let payload_bytes = payload.as_bytes();
        let aad = "user_id".as_bytes();

        let encryption = encrypter
            .encrypt(payload_bytes, aad, "".to_string())
            .unwrap();

        let decrypter = AesDecrypter {
            args: AesDecrypterArgs {
                password: key.try_into().expect("Invalid key"),
            },
        };

        let decrypted_payload_bytes = decrypter.decrypt(&encryption.ciphertext, aad).unwrap();
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
                salt: todo!(),
                iterations: todo!(),
            },
        };

        let payload = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
        let payload_bytes = payload.as_bytes();
        let aad = "user_id".as_bytes();

        let encryption = encrypter
            .encrypt(payload_bytes, aad, "".to_string())
            .unwrap();

        let decrypter = AesDecrypter {
            args: AesDecrypterArgs {
                password: key.try_into().expect("Invalid key"),
            },
        };

        let invalid_aad = "different_user_id".as_bytes();
        let decrypted_payload_bytes = decrypter.decrypt(&encryption.ciphertext, invalid_aad);
        assert_eq!(decrypted_payload_bytes, Err(EncrypterError::BadSeal()));
    }

    #[test]
    fn test_aes_encryption_invalid_decryption_key() {
        let key = Aes256Gcm::generate_key(&mut OsRng);
        let encrypter = AesEncrypter {
            args: AesEncrypterArgs {
                key: key.try_into().expect("Invalid key"),
                salt: todo!(),
                iterations: todo!(),
            },
        };

        let payload = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
        let payload_bytes = payload.as_bytes();
        let aad = "user_id".as_bytes();

        let encryption = encrypter
            .encrypt(payload_bytes, aad, "".to_string())
            .unwrap();

        let decrypter = AesDecrypter {
            args: AesDecrypterArgs { password: [0; 32] },
        };

        let decrypted_payload_bytes = decrypter.decrypt(&encryption.ciphertext, aad);
        assert_eq!(decrypted_payload_bytes, Err(EncrypterError::BadSeal()));
    }
}
