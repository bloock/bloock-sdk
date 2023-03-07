use crate::items::{KeyProtectionLevel, KeyType, LocalKey, ManagedKey};
use bloock_keys::{
    local::LocalKey as CoreLocalKey, managed::ManagedKey as CoreManagedKey,
    managed::ProtectionLevel, KeyType as CoreKeyType,
};

impl From<KeyType> for CoreKeyType {
    fn from(a: KeyType) -> Self {
        match a {
            KeyType::EcP256k => CoreKeyType::EcP256k,
            KeyType::Rsa2048 => CoreKeyType::Rsa2048,
            KeyType::Rsa3072 => CoreKeyType::Rsa3072,
            KeyType::Rsa4096 => CoreKeyType::Rsa4096,
            KeyType::Aes128 => CoreKeyType::Aes128,
            KeyType::Aes256 => CoreKeyType::Aes256,
        }
    }
}

impl From<CoreKeyType> for KeyType {
    fn from(a: CoreKeyType) -> Self {
        match a {
            CoreKeyType::EcP256k => KeyType::EcP256k,
            CoreKeyType::Rsa2048 => KeyType::Rsa2048,
            CoreKeyType::Rsa3072 => KeyType::Rsa3072,
            CoreKeyType::Rsa4096 => KeyType::Rsa4096,
            CoreKeyType::Aes128 => KeyType::Aes128,
            CoreKeyType::Aes256 => KeyType::Aes256,
        }
    }
}

impl From<KeyProtectionLevel> for ProtectionLevel {
    fn from(a: KeyProtectionLevel) -> Self {
        match a {
            KeyProtectionLevel::Software => ProtectionLevel::SOFTWARE,
            KeyProtectionLevel::Hsm => ProtectionLevel::HSM,
        }
    }
}

impl From<ProtectionLevel> for KeyProtectionLevel {
    fn from(a: ProtectionLevel) -> Self {
        match a {
            ProtectionLevel::SOFTWARE => KeyProtectionLevel::Software,
            ProtectionLevel::HSM => KeyProtectionLevel::Hsm,
        }
    }
}

impl From<ManagedKey> for CoreManagedKey {
    fn from(key: ManagedKey) -> Self {
        let key_protection: ProtectionLevel = key.protection().into();
        let key_type: CoreKeyType = key.key_type().into();

        Self {
            id: key.id,
            public_key: key.key,
            protection: key_protection.into(),
            key_type: key_type.into(),
            name: key.name,
            expiration: key.expiration,
        }
    }
}

impl From<CoreManagedKey> for ManagedKey {
    fn from(key: CoreManagedKey) -> Self {
        let key_protection: KeyProtectionLevel = key.protection.into();
        let key_type: KeyType = key.key_type.into();

        Self {
            id: key.id,
            key: key.public_key,
            protection: key_protection.into(),
            key_type: key_type.into(),
            name: key.name,
            expiration: key.expiration,
        }
    }
}

impl From<LocalKey> for CoreLocalKey<String> {
    fn from(key: LocalKey) -> Self {
        Self {
            key_type: key.key_type().into(),
            key: key.key,
            private_key: key.private_key,
        }
    }
}

impl From<CoreLocalKey<String>> for LocalKey {
    fn from(key: CoreLocalKey<String>) -> Self {
        let key_type: KeyType = key.key_type.into();

        Self {
            key_type: key_type.into(),
            key: key.key,
            private_key: key.private_key,
        }
    }
}
