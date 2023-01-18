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

use super::{Decrypter, Encrypter};

pub const AES_ALG: &str = "AES256-GCM";

const NONCE_LEN: usize = 12; // 96 bits
const TAG_LEN: usize = 16; // 128 bits
const KEY_LEN: usize = 32; // 256 bits
const SALT_LEN: usize = 16;

const NUM_ITERATIONS: u32 = 100000;
const MAX_ITERATIONS: u32 = 100000; // has to be >= NUM_ITERATIONS
const ITERATIONS_LEN: usize = size_of::<u32>();

const HEADER_LEN: usize = NONCE_LEN + SALT_LEN + ITERATIONS_LEN;

fn generate_key(password: &str, salt: &[u8], n_iterations: u32) -> [u8; KEY_LEN] {
    let mut key = [0u8; KEY_LEN];
    pbkdf2::<Hmac<Sha256>>(password.as_bytes(), salt, n_iterations, &mut key);
    key
}

pub struct AesEncrypterArgs {
    password: String,
    associated_data: Vec<u8>,
}

impl AesEncrypterArgs {
    pub fn new(password: &str, associated_data: &[u8]) -> Self {
        Self {
            password: password.to_string(),
            associated_data: associated_data.to_vec(),
        }
    }
}

pub struct AesEncrypter {
    args: AesEncrypterArgs,
}

impl AesEncrypter {
    pub fn new(args: AesEncrypterArgs) -> Box<Self> {
        Box::new(Self { args })
    }
}

impl Encrypter for AesEncrypter {
    fn encrypt(&self, payload: &[u8]) -> Result<Vec<u8>> {
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
        iterations.copy_from_slice(&NUM_ITERATIONS.to_le_bytes());
        in_out.copy_from_slice(payload);

        // Fill nonce piece with random data.
        rng.try_fill_bytes(nonce)
            .map_err(|err| EncrypterError::FailedToFillNonce(err.to_string()))?;

        let nonce = GenericArray::clone_from_slice(nonce);

        let aead = Aes256Gcm::new(GenericArray::from_slice(&key));
        let aad_tag = aead
            .encrypt_in_place_detached(&nonce, &self.args.associated_data, in_out)
            .map_err(|err| EncrypterError::FailedToEncryptInPlace(err.to_string()))?;

        // Copy the tag into the tag piece.
        tag.copy_from_slice(&aad_tag);

        Ok(data)
    }

    fn get_alg(&self) -> &str {
        AES_ALG
    }
}

pub struct AesDecrypterArgs {
    pub password: String,
    associated_data: Vec<u8>,
}
impl AesDecrypterArgs {
    pub fn new(password: &str, associated_data: &[u8]) -> Self {
        Self {
            password: password.to_string(),
            associated_data: associated_data.to_vec(),
        }
    }
}

pub struct AesDecrypter {
    args: AesDecrypterArgs,
}

impl AesDecrypter {
    pub fn new(args: AesDecrypterArgs) -> Box<Self> {
        Box::new(Self { args })
    }
}

impl Decrypter for AesDecrypter {
    fn decrypt(&self, data: &[u8]) -> Result<Vec<u8>> {
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
        let n_iterations = u32::from_le_bytes(iterations);

        if n_iterations > MAX_ITERATIONS {
            return Err(EncrypterError::InvalidPayload());
        }

        let key = generate_key(&self.args.password, salt, n_iterations);

        let payload = Payload {
            msg: cipher,
            aad: &self.args.associated_data,
        };

        let aead = Aes256Gcm::new(GenericArray::from_slice(&key));
        aead.decrypt(GenericArray::from_slice(nonce), payload)
            .map_err(|err| EncrypterError::FailedToDecrypt(err.to_string()))
    }
}

#[cfg(test)]
mod tests {
    use crate::{
        aes::{AesDecrypter, AesDecrypterArgs},
        Decrypter, Encrypter,
    };

    use super::{AesEncrypter, AesEncrypterArgs};

    #[test]
    fn test_aes_encryption() {
        let payload = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
        let payload_bytes = payload.as_bytes();
        let aad = "user_id".as_bytes();
        let encrypter = AesEncrypter::new(AesEncrypterArgs::new("some_password", aad));

        let ciphertext = encrypter.encrypt(payload_bytes).unwrap();

        let decrypter = AesDecrypter::new(AesDecrypterArgs::new("some_password", aad));

        let decrypted_payload_bytes = decrypter.decrypt(&ciphertext).unwrap();
        let decrypted_payload = std::str::from_utf8(&decrypted_payload_bytes).unwrap();

        assert_eq!(payload_bytes, decrypted_payload_bytes);
        assert_eq!(payload, decrypted_payload);
    }

    #[test]
    fn test_aes_encryption_invalid_decryption_aad() {
        let payload = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
        let payload_bytes = payload.as_bytes();
        let aad = "user_id".as_bytes();

        let encrypter = AesEncrypter::new(AesEncrypterArgs::new("some_password", aad));

        let ciphertext = encrypter.encrypt(payload_bytes).unwrap();

        let invalid_aad = "different_user_id".as_bytes();
        let decrypter = AesDecrypter::new(AesDecrypterArgs::new("some_password", invalid_aad));
        let decrypted_payload_bytes = decrypter.decrypt(&ciphertext);
        assert!(decrypted_payload_bytes.is_err());
    }

    #[test]
    fn test_aes_encryption_invalid_decryption_key() {
        let payload = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
        let payload_bytes = payload.as_bytes();
        let aad = "user_id".as_bytes();

        let encrypter = AesEncrypter::new(AesEncrypterArgs::new("some_password", aad));

        let ciphertext = encrypter.encrypt(payload_bytes).unwrap();

        let decrypter = AesDecrypter::new(AesDecrypterArgs::new("incorrect_password", aad));

        let decrypted_payload_bytes = decrypter.decrypt(&ciphertext);
        assert!(decrypted_payload_bytes.is_err());
    }

    #[test]
    fn test_aes_decryption_invalid_payload() {
        let unencrypted_payload = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
        let decrypter = AesDecrypter::new(AesDecrypterArgs::new("some_password", "".as_bytes()));
        assert!(decrypter.decrypt(unencrypted_payload.as_bytes()).is_err());
    }
}
