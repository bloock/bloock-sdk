use crate::{entity::alg::AES_ALG, Decrypter, Encrypter, EncrypterError, Result};
use aes_gcm::{
    aead::{generic_array::GenericArray, Aead, Payload},
    AeadInPlace, Aes256Gcm, KeyInit,
};
use async_trait::async_trait;
use bloock_keys::local::LocalKey;
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

pub struct LocalAesEncrypter<S: ToString> {
    local_key: LocalKey<S>,
}

impl<S: ToString> LocalAesEncrypter<S> {
    pub fn new(key: LocalKey<S>) -> Box<Self> {
        Box::new(Self { local_key: key })
    }
}

#[async_trait(?Send)]
impl<S: ToString> Encrypter for LocalAesEncrypter<S> {
    async fn encrypt(&self, payload: &[u8]) -> Result<Vec<u8>> {
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

        let key = generate_key(&self.local_key.key.to_string(), &salt, NUM_ITERATIONS);

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

        Ok(data)
    }

    fn get_alg(&self) -> &str {
        AES_ALG
    }
}

pub struct LocalAesDecrypter<S: ToString> {
    local_key: LocalKey<S>,
}

impl<S: ToString> LocalAesDecrypter<S> {
    pub fn new(local_key: LocalKey<S>) -> Box<Self> {
        Box::new(Self { local_key })
    }
}

#[async_trait(?Send)]
impl<S: ToString> Decrypter for LocalAesDecrypter<S> {
    async fn decrypt(&self, data: &[u8]) -> Result<Vec<u8>> {
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

        let key = generate_key(&self.local_key.key.to_string(), salt, n_iterations);

        let payload = Payload {
            msg: cipher,
            aad: &[],
        };

        let aead = Aes256Gcm::new(GenericArray::from_slice(&key));
        aead.decrypt(GenericArray::from_slice(nonce), payload)
            .map_err(|err| EncrypterError::FailedToDecrypt(err.to_string()))
    }
}

#[cfg(test)]
mod tests {
    use bloock_keys::local::LocalKey;

    use crate::{
        local::aes::{LocalAesDecrypter, LocalAesEncrypter},
        Decrypter, Encrypter,
    };

    #[tokio::test]
    async fn test_aes_encryption() {
        let payload = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
        let payload_bytes = payload.as_bytes();

        let local_key_params = bloock_keys::local::LocalKeyParams {
            key_type: bloock_keys::KeyType::Aes256,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();

        let encrypter = LocalAesEncrypter::new(local_key.clone());

        let ciphertext = encrypter.encrypt(payload_bytes).await.unwrap();

        let decrypter = LocalAesDecrypter::new(local_key);

        let decrypted_payload_bytes = decrypter.decrypt(&ciphertext).await.unwrap();
        let decrypted_payload = std::str::from_utf8(&decrypted_payload_bytes).unwrap();

        assert_eq!(payload_bytes, decrypted_payload_bytes);
        assert_eq!(payload, decrypted_payload);
    }

    #[tokio::test]
    async fn test_aes_encryption_invalid_decryption_key() {
        let payload = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
        let payload_bytes = payload.as_bytes();

        let local_key_params = bloock_keys::local::LocalKeyParams {
            key_type: bloock_keys::KeyType::Aes256,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();

        let encrypter = LocalAesEncrypter::new(local_key.clone());

        let ciphertext = encrypter.encrypt(payload_bytes).await.unwrap();

        let invalid_key = LocalKey {
            key_type: bloock_keys::KeyType::Aes256,
            key: "invalid_password".to_string(),
            private_key: None,
            mnemonic: None,
        };
        let decrypter = LocalAesDecrypter::new(invalid_key);

        let decrypted_payload_bytes = decrypter.decrypt(&ciphertext).await;
        assert!(decrypted_payload_bytes.is_err());
    }

    #[tokio::test]
    async fn test_aes_decryption_invalid_payload() {
        let unencrypted_payload = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";

        let local_key_params = bloock_keys::local::LocalKeyParams {
            key_type: bloock_keys::KeyType::Aes256,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();

        let decrypter = LocalAesDecrypter::new(local_key);
        assert!(decrypter
            .decrypt(unencrypted_payload.as_bytes())
            .await
            .is_err());
    }
}
