use crate::{
    local::{ecdsa::LocalEcdsaSigner, ens::LocalEnsSigner},
    managed::{
        bjj::{ManagedBJJSigner, ManagedBJJVerifier},
        ecdsa::{ManagedEcdsaSigner, ManagedEcdsaVerifier},
        ens::{ManagedEnsSigner, ManagedEnsVerifier},
    },
    Result, Signer,
};
use bloock_hasher::H256;
use bloock_keys::entity::key::Key;

use super::alg::SignAlg;

#[derive(Clone)]
pub struct Signature {
    pub alg: SignAlg,
    pub key: Key,
    pub signature: String,
    pub message_hash: String,
}

impl Signature {
    pub async fn get_common_name(&self, ens_provider: String, api_key: String) -> Result<String> {
        let signer: Box<dyn Signer> = match SignAlg::try_from(self.alg.to_string().as_str())? {
            SignAlg::Es256k => LocalEcdsaSigner::new_boxed(),
            SignAlg::Ens => LocalEnsSigner::new_boxed(),
            SignAlg::Es256kM => ManagedEcdsaSigner::new_boxed(api_host, api_key, api_version),
            SignAlg::EnsM => ManagedEnsSigner::new_boxed(api_host, api_key, api_version),
            SignAlg::BjjM => ManagedBJJSigner::new_boxed(api_host, api_key, api_version),
        };

        signer.get_common_name(self).await
    }

    pub fn recover_public_key(&self, message_hash: H256) -> Result<Vec<u8>> {
        let alg = SignAlg::try_from(self.alg.to_string().as_str())?;
        match alg {
            SignAlg::Es256k => crate::local::ecdsa::recover_public_key(self, message_hash),
            SignAlg::Ens => crate::local::ens::recover_public_key(self, message_hash),
            SignAlg::Es256kM => crate::local::ecdsa::recover_public_key(self, message_hash),
            SignAlg::EnsM => crate::local::ens::recover_public_key(self, message_hash),
            SignAlg::BjjM => crate::local::ecdsa::recover_public_key(self, message_hash),
        }
    }

    pub fn get_signer(
        &self,
        api_host: String,
        api_key: String,
        api_version: Option<String>,
    ) -> Result<Box<dyn Signer>> {
        match SignAlg::try_from(self.alg.to_string().as_str())? {
            SignAlg::Es256k => Ok(Box::<LocalEcdsaVerifier>::default()),
            SignAlg::Ens => Ok(Box::<LocalEnsVerifier>::default()),
            SignAlg::Es256kM => Ok(ManagedEcdsaVerifier::new_boxed(
                api_host,
                api_key,
                api_version,
            )),
            SignAlg::EnsM => Ok(ManagedEnsVerifier::new_boxed(
                api_host,
                api_key,
                api_version,
            )),
            SignAlg::BjjM => Ok(ManagedBJJVerifier::new_boxed(
                api_host,
                api_key,
                api_version,
            )),
        }
    }
}
