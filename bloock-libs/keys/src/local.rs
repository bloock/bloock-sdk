use crate::{
    keys::{aes::AesKey, ec::EcKey, rsa::RsaKey},
    KeyType, Result,
};

pub struct LocalKeyParams {
    pub key_type: KeyType,
}

#[derive(Clone)]
pub struct LocalKey<S: ToString> {
    pub key_type: KeyType,
    pub key: S,
    pub private_key: Option<S>,
}

impl LocalKey<String> {
    pub fn new(params: &LocalKeyParams) -> Result<LocalKey<String>> {
        match params.key_type {
            KeyType::EcP256k => Ok(EcKey::new_ec_p256k().into()),
            KeyType::Rsa2048 => Ok(RsaKey::new_rsa_2048()?.into()),
            KeyType::Rsa3072 => Ok(RsaKey::new_rsa_3072()?.into()),
            KeyType::Rsa4096 => Ok(RsaKey::new_rsa_4096()?.into()),
            KeyType::Aes128 => Ok(AesKey::new_aes_128_key()?.into()),
            KeyType::Aes256 => Ok(AesKey::new_aes_256_key()?.into()),
        }
    }

    pub fn load(key_type: KeyType, key: String, private_key: Option<String>) -> LocalKey<String> {
        LocalKey {
            key_type,
            key,
            private_key,
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::{
        local::{LocalKey, LocalKeyParams},
        KeyType,
    };

    #[test]
    fn test_local_ec_p256k() {
        let key_type = KeyType::EcP256k;

        let params = LocalKeyParams {
            key_type: key_type.clone(),
        };
        let key = LocalKey::new(&params).unwrap();

        assert_eq!(key.key_type, key_type);
        assert_ne!(key.key, "".to_string());
        assert!(key.private_key.is_some());
    }

    #[test]
    fn test_local_rsa_2048() {
        let key_type = KeyType::Rsa2048;

        let params = LocalKeyParams {
            key_type: key_type.clone(),
        };
        let key = LocalKey::new(&params).unwrap();

        assert_eq!(key.key_type, key_type);
        assert_ne!(key.key, "".to_string());
        assert!(key.private_key.is_some());
    }

    #[test]
    fn test_local_rsa_3072() {
        let key_type = KeyType::Rsa3072;

        let params = LocalKeyParams {
            key_type: key_type.clone(),
        };
        let key = LocalKey::new(&params).unwrap();

        assert_eq!(key.key_type, key_type);
        assert_ne!(key.key, "".to_string());
        assert!(key.private_key.is_some());
    }

    #[test]
    fn test_local_rsa_4096() {
        let key_type = KeyType::Rsa4096;

        let params = LocalKeyParams {
            key_type: key_type.clone(),
        };
        let key = LocalKey::new(&params).unwrap();

        assert_eq!(key.key_type, key_type);
        assert_ne!(key.key, "".to_string());
        assert!(key.private_key.is_some());
    }

    #[test]
    fn test_local_aes_128() {
        let key_type = KeyType::Aes128;

        let params = LocalKeyParams {
            key_type: key_type.clone(),
        };
        let key = LocalKey::new(&params).unwrap();

        assert_eq!(key.key_type, key_type);
        assert_ne!(key.key, "".to_string());
        assert!(key.private_key.is_none());
    }

    #[test]
    fn test_local_aes_256() {
        let key_type = KeyType::Aes256;

        let params = LocalKeyParams {
            key_type: key_type.clone(),
        };
        let key = LocalKey::new(&params).unwrap();

        assert_eq!(key.key_type, key_type);
        assert_ne!(key.key, "".to_string());
        assert!(key.private_key.is_none());
    }
}
