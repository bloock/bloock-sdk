use crate::{
    certificates::{local::LocalCertificate, managed::ManagedCertificate},
    keys::{local::LocalKey, managed::ManagedKey},
    KeyType,
};

#[derive(Clone)]
pub enum Local {
    Key(LocalKey<String>),
    Certificate(LocalCertificate<String>),
}

#[derive(Clone)]
pub enum Managed {
    Key(ManagedKey),
    Certificate(ManagedCertificate),
}

#[derive(Clone)]
pub enum Key {
    Managed(Managed),
    Local(Local),
}

impl From<LocalKey<String>> for Local {
    fn from(value: LocalKey<String>) -> Self {
        Local::Key(value)
    }
}

impl From<LocalKey<String>> for Key {
    fn from(value: LocalKey<String>) -> Self {
        Key::Local(Local::Key(value))
    }
}

impl From<ManagedKey> for Managed {
    fn from(value: ManagedKey) -> Self {
        Managed::Key(value)
    }
}

impl From<ManagedKey> for Key {
    fn from(value: ManagedKey) -> Self {
        Key::Managed(Managed::Key(value))
    }
}

impl From<LocalCertificate<String>> for Local {
    fn from(value: LocalCertificate<String>) -> Self {
        Local::Certificate(value)
    }
}

impl From<LocalCertificate<String>> for Key {
    fn from(value: LocalCertificate<String>) -> Self {
        Key::Local(Local::Certificate(value))
    }
}

impl From<ManagedCertificate> for Managed {
    fn from(value: ManagedCertificate) -> Self {
        Managed::Certificate(value)
    }
}

impl From<ManagedCertificate> for Key {
    fn from(value: ManagedCertificate) -> Self {
        Key::Managed(Managed::Certificate(value))
    }
}

impl From<Key> for KeyType {
    fn from(value: Key) -> Self {
        match value {
            Key::Managed(Managed::Key(k)) => k.key_type,
            Key::Managed(Managed::Certificate(k)) => k.key.key_type,
            Key::Local(Local::Key(k)) => k.key_type,
            Key::Local(Local::Certificate(k)) => k.key.key_type,
        }
    }
}
