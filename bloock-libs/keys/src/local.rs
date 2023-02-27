use crate::{
    keys::{ec::EcKey, rsa::RsaKey},
    KeyType, Result,
};

pub struct LocalKeyParams {
    pub key_type: KeyType,
}

pub struct LocalKey {
    pub key_type: KeyType,
    pub key: String,
    pub private_key: Option<String>,
}

impl LocalKey {
    pub fn new(params: &LocalKeyParams) -> Result<LocalKey> {
        match params.key_type {
            KeyType::EcP256k => Ok(EcKey::new_ec_p256k().into()),
            KeyType::Rsa2048 => Ok(RsaKey::new_rsa_2048()?.into()),
            KeyType::Rsa3072 => Ok(RsaKey::new_rsa_3072()?.into()),
            KeyType::Rsa4096 => Ok(RsaKey::new_rsa_4096()?.into()),
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
}
