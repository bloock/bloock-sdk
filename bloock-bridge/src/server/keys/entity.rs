use crate::items::{KeyProtectionLevel, KeyType};
use bloock_keys::{managed::ProtectionLevel, KeyType as CoreKeyType};

impl From<KeyType> for CoreKeyType {
    fn from(a: KeyType) -> Self {
        match a {
            KeyType::EcP256k => CoreKeyType::EcP256k,
            KeyType::Rsa2048 => CoreKeyType::Rsa2048,
            KeyType::Rsa3072 => CoreKeyType::Rsa3072,
            KeyType::Rsa4096 => CoreKeyType::Rsa4096,
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
