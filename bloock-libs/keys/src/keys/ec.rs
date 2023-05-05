use crate::Result;
use crate::{local::LocalKey, KeysError};
use bip39::{Language, Mnemonic, MnemonicType, Seed};
use libsecp256k1::{PublicKey, SecretKey};
use std::str::FromStr;
use tiny_hderive::{bip32::ExtendedPrivKey, bip44::ChildNumber};

pub struct EcKey {
    pub public_key: String,
    pub private_key: String,
    pub mnemonic: String,
}

impl From<EcKey> for LocalKey<String> {
    fn from(value: EcKey) -> Self {
        Self {
            key_type: crate::KeyType::EcP256k,
            key: value.public_key,
            private_key: Some(value.private_key),
            mnemonic: Some(value.mnemonic),
        }
    }
}

impl EcKey {
    pub fn new_ec_p256k() -> Result<EcKey> {
        let mnemonic_type = MnemonicType::for_word_count(15)
            .map_err(|e| KeysError::GenerateECKeyError(e.to_string()))?;
        let mnemonic = Mnemonic::new(mnemonic_type, Language::English);
        Self::load_ec_p256_from_mnemonic(mnemonic.into_phrase())
    }

    pub fn load_ec_p256_from_mnemonic(mnemonic_phrase: String) -> Result<EcKey> {
        let mnemonic = Mnemonic::from_phrase(&mnemonic_phrase, Language::English)
            .map_err(|e| KeysError::GenerateECKeyError(e.to_string()))?;

        let seed = Seed::new(&mnemonic, "");
        let hdwallet =
            ExtendedPrivKey::derive(seed.as_bytes(), "m/44'/60'/0'/0").map_err(|_| {
                KeysError::GenerateECKeyError("couldn't derive key from seed".to_string())
            })?;
        let child_number = ChildNumber::from_str("0").map_err(|_| {
            KeysError::GenerateECKeyError("invalid child number provided".to_string())
        })?;
        let account0 = hdwallet
            .child(child_number)
            .map_err(|_| KeysError::GenerateECKeyError("couldn't select seed child".to_string()))?;
        let secret_key = SecretKey::parse(&account0.secret())
            .map_err(|e| KeysError::GenerateECKeyError(e.to_string()))?;
        let public_key = PublicKey::from_secret_key(&secret_key);

        Ok(EcKey {
            private_key: hex::encode(secret_key.serialize()),
            public_key: hex::encode(public_key.serialize()),
            mnemonic: mnemonic.into_phrase(),
        })
    }
}
