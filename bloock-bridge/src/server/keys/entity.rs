use crate::{
    error::{BridgeError, BridgeResult},
    items::{
        CertificateSubject, CertificateType, KeyProtectionLevel, KeyType, LocalCertificate,
        LocalKey, ManagedCertificate, ManagedKey,
    },
};
use bloock_keys::{
    certificates::{
        local::LocalCertificate as CoreLocalCertificate,
        managed::ManagedCertificate as CoreManagedCertificate,
        CertificateSubject as CoreCertificateSubject,
    },
    entity::key::Local as CoreLocal,
    entity::key::Managed as CoreManaged,
    entity::protection_level::ProtectionLevel,
    keys::local::LocalKey as CoreLocalKey,
    keys::managed::ManagedKey as CoreManagedKey,
    CertificateType as CoreCertificateType, KeyType as CoreKeyType,
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
            KeyType::Bjj => CoreKeyType::BJJ,
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
            CoreKeyType::BJJ => KeyType::Bjj,
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

impl From<ManagedKey> for CoreManaged {
    fn from(key: ManagedKey) -> Self {
        let managed = CoreManagedKey::from(key);
        CoreManaged::Key(managed)
    }
}

impl From<ManagedKey> for CoreManagedKey {
    fn from(key: ManagedKey) -> Self {
        let key_protection: ProtectionLevel = key.protection().into();
        let key_type: CoreKeyType = key.key_type().into();

        Self {
            id: key.id,
            public_key: key.key,
            protection: key_protection,
            key_type,
            name: match key.name.as_str() {
                "" => None,
                _ => Some(key.name),
            },
            expiration: match key.expiration {
                0 => None,
                _ => Some(key.expiration),
            },
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
            name: key.name.unwrap_or_default(),
            expiration: key.expiration.unwrap_or(0),
        }
    }
}

impl From<LocalKey> for CoreLocal {
    fn from(key: LocalKey) -> Self {
        let managed = CoreLocalKey::from(key);
        CoreLocal::Key(managed)
    }
}

impl From<LocalKey> for CoreLocalKey<String> {
    fn from(key: LocalKey) -> Self {
        Self {
            key_type: key.key_type().into(),
            key: key.key,
            private_key: key.private_key,
            mnemonic: None,
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

impl From<CertificateSubject> for CoreCertificateSubject {
    fn from(subject: CertificateSubject) -> Self {
        Self {
            common_name: subject.common_name,
            organizational_unit: subject.organizational_unit,
            organization: subject.organization,
            location: subject.location,
            state: subject.state,
            country: subject.country,
        }
    }
}

impl TryFrom<LocalCertificate> for CoreLocal {
    type Error = BridgeError;

    fn try_from(l: LocalCertificate) -> BridgeResult<CoreLocal> {
        let local = CoreLocalCertificate::try_from(l)?;
        Ok(CoreLocal::Certificate(local))
    }
}

impl From<CoreLocalCertificate<String>> for LocalCertificate {
    fn from(key: CoreLocalCertificate<String>) -> Self {
        Self {
            pkcs12: key.pkcs12,
            password: key.password,
        }
    }
}

impl TryFrom<LocalCertificate> for CoreLocalCertificate<String> {
    type Error = BridgeError;

    fn try_from(l: LocalCertificate) -> BridgeResult<CoreLocalCertificate<String>> {
        let local_certificate = CoreLocalCertificate::load_pkcs12(&l.pkcs12, &l.password)
            .map_err(|e| BridgeError::RequestDeserialization(e.to_string()))?;

        Ok(Self {
            key: local_certificate.key,
            certificate: local_certificate.certificate,
            pkcs12: local_certificate.pkcs12,
            password: local_certificate.password,
        })
    }
}

impl From<ManagedCertificate> for CoreManaged {
    fn from(key: ManagedCertificate) -> Self {
        let managed = CoreManagedCertificate::from(key);
        CoreManaged::Certificate(managed)
    }
}

impl From<ManagedCertificate> for CoreManagedCertificate {
    fn from(key: ManagedCertificate) -> Self {
        let key_protection: ProtectionLevel = key.protection().into();
        let key_type: CoreKeyType = key.key_type().into();

        Self {
            id: key.id.clone(),
            protection: key_protection,
            key: CoreManagedKey {
                id: key.id,
                public_key: key.key,
                protection: key_protection,
                key_type,
                expiration: match key.expiration {
                    0 => None,
                    _ => Some(key.expiration),
                },
                name: None,
            },
            expiration: match key.expiration {
                0 => None,
                _ => Some(key.expiration),
            },
        }
    }
}

impl From<ManagedCertificate> for CoreManagedKey {
    fn from(key: ManagedCertificate) -> Self {
        let key_protection: ProtectionLevel = key.protection().into();
        let key_type: CoreKeyType = key.key_type().into();

        Self {
            id: key.id,
            public_key: key.key,
            protection: key_protection,
            key_type,
            expiration: match key.expiration {
                0 => None,
                _ => Some(key.expiration),
            },
            name: None,
        }
    }
}

impl From<CoreManagedCertificate> for ManagedCertificate {
    fn from(key: CoreManagedCertificate) -> Self {
        let key_protection: KeyProtectionLevel = key.protection.into();
        let key_type: KeyType = key.key.key_type.into();

        Self {
            id: key.id,
            key: key.key.public_key,
            protection: key_protection.into(),
            key_type: key_type.into(),
            expiration: key.expiration.unwrap_or(0),
        }
    }
}

impl From<CertificateType> for CoreCertificateType {
    fn from(n: CertificateType) -> Self {
        match n {
            CertificateType::Pem => CoreCertificateType::PEM,
            CertificateType::Pfx => CoreCertificateType::PFX,
        }
    }
}
