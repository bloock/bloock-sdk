use crate::{
    algs::{aes::AesKey, bjj::BjjKey, ec::EcKey, rsa::RsaKey},
    KeyType, KeysError, Result,
};

pub struct LocalKeyParams {
    pub key_type: KeyType,
}

#[derive(Clone)]
pub struct LocalKey<S: ToString> {
    pub key_type: KeyType,
    pub key: S,
    pub private_key: Option<S>,
    pub mnemonic: Option<S>,
}

impl LocalKey<String> {
    pub fn new(params: &LocalKeyParams) -> Result<LocalKey<String>> {
        match params.key_type {
            KeyType::EcP256k => Ok(EcKey::new_ec_p256k()?.into()),
            KeyType::BJJ => Ok(BjjKey::new()?.into()),
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
            mnemonic: None,
        }
    }

    pub fn load_mnemonic(key_type: KeyType, mnemonic: String) -> Result<LocalKey<String>> {
        match key_type {
            KeyType::EcP256k => Ok(EcKey::load_ec_p256_from_mnemonic(mnemonic)?.into()),
            _ => Err(KeysError::InvalidKeyTypeError()),
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::{
        keys::local::{LocalKey, LocalKeyParams},
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
        assert!(key.mnemonic.is_some())
    }

    #[test]
    fn test_local_ec_p256k_from_mnemonic() {
        let key_type = KeyType::EcP256k;

        let mnemonic = "purse cart ill nothing climb cinnamon example kangaroo forum cause page thunder spend bike grain".to_string();
        let key = LocalKey::load_mnemonic(key_type.clone(), mnemonic.clone()).unwrap();

        assert_eq!(key.key_type, key_type);
        assert_eq!(
            key.key,
            "04e073e1608b3fabfe96d3bdafc80cb13acfbedcc34bf98f9a25c3ef5e5cb6c3d47f2fa6824c7c2b43b401d8a6b1b4be01e195a676cfa284a8002e7e213154a327".to_string()
        );
        assert_eq!(
            key.private_key.unwrap(),
            "74b4c109fd4043c4e10e6aca50a1e91146407ccc4dff7c99419e16bf3ab89934".to_string()
        );
        assert_eq!(key.mnemonic.unwrap(), mnemonic);
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
        assert!(key.mnemonic.is_none());
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
        assert!(key.mnemonic.is_none());
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
        assert!(key.mnemonic.is_none());
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
        assert!(key.mnemonic.is_none());
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
        assert!(key.mnemonic.is_none());
    }

    #[test]
    fn test_local_bjj() {
        let key_type = KeyType::BJJ;

        let params = LocalKeyParams {
            key_type: key_type.clone(),
        };
        let key = LocalKey::new(&params).unwrap();

        assert_eq!(key.key_type, key_type);
        assert_ne!(key.key, "".to_string());
        assert!(key.private_key.is_some());
        assert!(key.mnemonic.is_none());
    }
}
