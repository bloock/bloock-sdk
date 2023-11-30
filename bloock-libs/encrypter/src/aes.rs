use crate::{entity::encryption::Encryption, Encrypter, EncrypterError, Result};
use aes_gcm::{
    aead::{generic_array::GenericArray, Aead, Payload},
    AeadInPlace, Aes256Gcm, KeyInit,
};
use async_trait::async_trait;
use bloock_keys::entity::key::{Local, Managed};
use hmac::Hmac;
use pbkdf2::pbkdf2;
use rand::RngCore;
use sha2::Sha256;
use std::mem::size_of;

const NONCE_LEN: usize = 12; // 96 bits
const TAG_LEN: usize = 16; // 128 bits
const KEY_LEN: usize = 32; // 256 bits
const SALT_LEN: usize = 16;

// it's to control that if the buffer contains an invalid number of iterations it doesn't loop forever
const MAX_ITERATIONS: u32 = 100000; // has to be >= NUM_ITERATIONS
const NUM_ITERATIONS: u32 = 100000;
const ITERATIONS_LEN: usize = size_of::<u32>();

const HEADER_LEN: usize = NONCE_LEN + SALT_LEN + ITERATIONS_LEN;

fn generate_key(password: &str, salt: &[u8], n_iterations: u32) -> [u8; KEY_LEN] {
    let mut key = [0u8; KEY_LEN];
    pbkdf2::<Hmac<Sha256>>(password.as_bytes(), salt, n_iterations, &mut key);
    key
}

pub struct AesEncrypter {
    api_host: String,
    api_key: String,
    environment: Option<String>,
}

impl AesEncrypter {
    pub fn new(api_host: String, api_key: String, environment: Option<String>) -> Self {
        Self {
            api_host,
            api_key,
            environment,
        }
    }

    pub fn new_boxed(api_host: String, api_key: String, environment: Option<String>) -> Box<Self> {
        Box::new(Self::new(api_host, api_key, environment))
    }
}

#[async_trait(?Send)]
impl Encrypter for AesEncrypter {
    async fn encrypt_local(&self, payload: &[u8], key: &Local) -> Result<Encryption> {
        let local = match key.clone() {
            Local::Key(k) => k.clone(),
            Local::Certificate(c) => c.key.clone(),
        };

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

        let key = generate_key(&local.key, &salt, NUM_ITERATIONS);

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
            .encrypt_in_place_detached(&nonce, &[], in_out)
            .map_err(|err| EncrypterError::FailedToEncryptInPlace(err.to_string()))?;

        // Copy the tag into the tag piece.
        tag.copy_from_slice(&aad_tag);

        Ok(Encryption {
            ciphertext: data,
            alg: crate::entity::alg::EncryptionAlg::A256gcm,
            key: None,
        })
    }

    async fn encrypt_managed(&self, _payload: &[u8], _key: &Managed) -> Result<Encryption> {
        Err(EncrypterError::InvalidAlgorithm())
    }

    async fn decrypt_local(&self, payload: &[u8], key: &Local) -> Result<Vec<u8>> {
        if payload.len() <= HEADER_LEN {
            return Err(EncrypterError::InvalidPayloadLength());
        }

        let local = match key.clone() {
            Local::Key(k) => k.clone(),
            Local::Certificate(c) => c.key.clone(),
        };

        // [ SALT | NUM_ITERATIONS | NONCE | ENCRYPTED_PAYLOAD | TAG ]
        //  |---------- HEADER -----------| |------- CIPHER --------|

        let (header, cipher) = payload.split_at(HEADER_LEN);
        let (key_info, nonce) = header.split_at(SALT_LEN + ITERATIONS_LEN);
        let (salt, iter_slice) = key_info.split_at(SALT_LEN);

        let mut iterations = [0u8; ITERATIONS_LEN];
        iterations.copy_from_slice(iter_slice);
        let n_iterations = u32::from_le_bytes(iterations);

        if n_iterations > MAX_ITERATIONS {
            return Err(EncrypterError::InvalidPayload());
        }

        let key = generate_key(&local.key, salt, n_iterations);

        let payload = Payload {
            msg: cipher,
            aad: &[],
        };

        let aead = Aes256Gcm::new(GenericArray::from_slice(&key));
        aead.decrypt(GenericArray::from_slice(nonce), payload)
            .map_err(|err| EncrypterError::FailedToDecrypt(err.to_string()))
    }

    async fn decrypt_managed(&self, _payload: &[u8], _key: &Managed) -> Result<Vec<u8>> {
        Err(EncrypterError::InvalidAlgorithm())
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::entity::alg::EncryptionAlg;
    use bloock_keys::keys::local::LocalKey;

    #[tokio::test]
    async fn test_encrypt_local_key_ok() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();

        let local_key_params = bloock_keys::keys::local::LocalKeyParams {
            key_type: bloock_keys::KeyType::Aes128,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();

        let string_payload = "hello world";

        let encrypter = AesEncrypter::new(api_host, api_key, None);

        let encryption = encrypter
            .encrypt_local(string_payload.as_bytes(), &local_key.clone().into())
            .await
            .unwrap();

        assert_eq!(encryption.alg, EncryptionAlg::A256gcm);
        assert_eq!(encryption.key.unwrap().key, local_key.key);

        let result = encrypter
            .decrypt_local(&encryption.ciphertext, &local_key.clone().into())
            .await
            .unwrap();

        assert_eq!(result, string_payload.as_bytes().to_vec());
    }

    #[tokio::test]
    async fn test_decrypt_local_invalid_payload() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();

        let invalid_payload = "invalid_ciphertext";

        let local_key_params = bloock_keys::keys::local::LocalKeyParams {
            key_type: bloock_keys::KeyType::Aes128,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();
        let encrypter = AesEncrypter::new(api_host, api_key, None);

        let result = encrypter
            .decrypt_local(invalid_payload.as_bytes(), &local_key.into())
            .await;

        assert!(result.is_err());
    }
}
