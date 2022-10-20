use std::mem::size_of;

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

const NUM_ITERATIONS: u32 = 20000;
const ITERATIONS_LEN: usize = size_of::<u32>();

const HEADER_LEN: usize = NONCE_LEN + SALT_LEN + ITERATIONS_LEN;

fn generate_key(password: &str, salt: &[u8], n_iterations: u32) -> [u8; KEY_LEN] {
    let mut key = [0u8; KEY_LEN];
    pbkdf2::<Hmac<Sha256>>(password.as_bytes(), &salt, n_iterations, &mut key);
    key
}

pub struct AesEncrypterArgs {
    password: String,
}

impl AesEncrypterArgs {
    pub fn new(password: &str) -> Self {
        Self {
            password: password.to_string(),
        }
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
        // [ SALT | NUM_ITERATIONS | NONCE | ENCRYPTED_PAYLOAD | TAG ]
        //  |---------- HEADER -----------| |------- CIPHER --------|

        let mut data = vec![0; HEADER_LEN + payload.len() + TAG_LEN];

        // Split data into segments: Salt, Num. Iterations, Nonce, in/out
        let (header, in_out) = data.split_at_mut(HEADER_LEN);
        let (key_info, nonce) = header.split_at_mut(SALT_LEN + ITERATIONS_LEN);
        let (salt_piece, iterations) = key_info.split_at_mut(SALT_LEN);
        let (in_out, tag) = in_out.split_at_mut(payload.len());

        let mut rng = rand::thread_rng();

        let mut salt = [0u8; SALT_LEN];
        rng.try_fill_bytes(&mut salt)
            .map_err(|err| EncrypterError::FailedToGenerateSalt(err.to_string()))?;

        let key = generate_key(&self.args.password, &salt, NUM_ITERATIONS);

        // Fill the buffer by pieces
        salt_piece.copy_from_slice(&salt);
        iterations.copy_from_slice(&NUM_ITERATIONS.to_ne_bytes());
        in_out.copy_from_slice(payload);

        // Fill nonce piece with random data.
        rng.try_fill_bytes(nonce)
            .map_err(|err| EncrypterError::FailedToFillNonce(err.to_string()))?;

        let nonce = GenericArray::clone_from_slice(nonce);

        let aead = Aes256Gcm::new(GenericArray::from_slice(&key));
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
    pub fn new(password: &str) -> Self {
        Self {
            password: password.to_string(),
        }
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
        if data.len() <= HEADER_LEN {
            return Err(EncrypterError::InvalidPayloadLength());
        }

        // [ SALT | NUM_ITERATIONS | NONCE | ENCRYPTED_PAYLOAD | TAG ]
        //  |---------- HEADER -----------| |------- CIPHER --------|

        let (header, cipher) = data.split_at(HEADER_LEN);
        let (key_info, nonce) = header.split_at(SALT_LEN + ITERATIONS_LEN);
        let (salt, iter_slice) = key_info.split_at(SALT_LEN);

        let mut iterations = [0u8; ITERATIONS_LEN];
        iterations.copy_from_slice(iter_slice);
        let n_iterations = u32::from_ne_bytes(iterations);

        let key = generate_key(&self.args.password, salt, n_iterations);

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
    use crate::{
        aes::{AesDecrypter, AesDecrypterArgs},
        Decrypter, Encrypter, EncrypterError,
    };

    use super::{AesEncrypter, AesEncrypterArgs};

    #[test]
    fn test_aes_encryption() {
        let encrypter = AesEncrypter::new(AesEncrypterArgs::new("some_password"));

        let payload = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
        let payload_bytes = payload.as_bytes();
        let aad = "user_id".as_bytes();

        let encryption = encrypter
            .encrypt(payload_bytes, aad, "pdf".to_string())
            .unwrap();

        let decrypter = AesDecrypter::new(AesDecrypterArgs::new("some_password"));

        let decrypted_payload_bytes = decrypter.decrypt(&encryption.ciphertext, aad).unwrap();
        let decrypted_payload = std::str::from_utf8(&decrypted_payload_bytes).unwrap();

        assert_eq!(payload_bytes, decrypted_payload_bytes);
        assert_eq!(payload, decrypted_payload);
    }

    #[test]
    fn test_aes_encryption_invalid_decryption_aad() {
        let encrypter = AesEncrypter::new(AesEncrypterArgs::new("some_password"));

        let payload = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
        let payload_bytes = payload.as_bytes();
        let aad = "user_id".as_bytes();

        let encryption = encrypter
            .encrypt(payload_bytes, aad, "pdf".to_string())
            .unwrap();

        let decrypter = AesDecrypter::new(AesDecrypterArgs::new("some_password"));

        let invalid_aad = "different_user_id".as_bytes();
        let decrypted_payload_bytes = decrypter.decrypt(&encryption.ciphertext, invalid_aad);
        assert_eq!(decrypted_payload_bytes, Err(EncrypterError::BadSeal()));
    }

    #[test]
    fn test_aes_encryption_invalid_decryption_key() {
        let encrypter = AesEncrypter::new(AesEncrypterArgs::new("some_password"));

        let payload = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
        let payload_bytes = payload.as_bytes();
        let aad = "user_id".as_bytes();

        let encryption = encrypter
            .encrypt(payload_bytes, aad, "pdf".to_string())
            .unwrap();

        let decrypter = AesDecrypter::new(AesDecrypterArgs::new("incorrect_password"));

        let decrypted_payload_bytes = decrypter.decrypt(&encryption.ciphertext, aad);
        assert_eq!(decrypted_payload_bytes, Err(EncrypterError::BadSeal()));
    }
}
