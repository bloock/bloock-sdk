use crate::{
    certificates::{local::LocalCertificate, managed::ManagedCertificate},
    keys::{local::LocalKey, managed::ManagedKey},
};

#[derive(Clone)]
pub enum Key {
    LocalKey(LocalKey<String>),
    ManagedKey(ManagedKey),
    LocalCertificate(LocalCertificate<String>),
    ManagedCertificate(ManagedCertificate),
}

impl From<LocalKey<String>> for Key {
    fn from(value: LocalKey<String>) -> Self {
        Key::LocalKey(value)
    }
}

impl From<ManagedKey> for Key {
    fn from(value: ManagedKey) -> Self {
        Key::ManagedKey(value)
    }
}

impl From<LocalCertificate<String>> for Key {
    fn from(value: LocalCertificate<String>) -> Self {
        Key::LocalCertificate(value)
    }
}

impl From<ManagedCertificate> for Key {
    fn from(value: ManagedCertificate) -> Self {
        Key::ManagedCertificate(value)
    }
}
