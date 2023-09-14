use crate::{
    error::{BridgeError, BridgeResult},
    items::{
        LocalCertificate, LocalKey, ManagedCertificate, ManagedKey, Signature, SignatureHeader,
        SignerAlg,
    },
};
use bloock_core::{
    config::config_data::ConfigData, LocalEcdsaSigner, LocalEnsSigner, ManagedBJJSigner,
    ManagedEcdsaSigner, ManagedEnsSigner, Signature as SignatureCore,
    SignatureHeader as SignatureHeaderCore, Signer,
};
use std::convert::TryFrom;

impl From<SignatureHeader> for SignatureHeaderCore {
    fn from(s: SignatureHeader) -> Self {
        Self {
            alg: s.alg,
            kid: s.kid,
        }
    }
}

impl From<SignatureHeaderCore> for SignatureHeader {
    fn from(s: SignatureHeaderCore) -> Self {
        Self {
            alg: s.alg,
            kid: s.kid,
        }
    }
}

impl TryFrom<Signature> for SignatureCore {
    type Error = BridgeError;
    fn try_from(r: Signature) -> BridgeResult<SignatureCore> {
        let signature_header = match r.header {
            Some(s) => s.into(),
            None => {
                return Err(BridgeError::RequestDeserialization(
                    "couldn't get signature header".to_string(),
                ))
            }
        };

        Ok(Self {
            signature: r.signature,
            header: signature_header,
            protected: r.protected,
            message_hash: r.message_hash,
        })
    }
}

impl From<SignatureCore> for Signature {
    fn from(s: SignatureCore) -> Self {
        Self {
            signature: s.signature,
            protected: s.protected,
            header: Some(s.header.into()),
            message_hash: s.message_hash,
        }
    }
}

pub trait SignerProvider {
    fn get_signer(
        self,
        config_data: &ConfigData,
        common_name: Option<String>,
    ) -> Result<Box<dyn Signer>, String>;
}

impl SignerProvider
    for (
        Option<ManagedKey>,
        Option<LocalKey>,
        Option<LocalCertificate>,
        Option<ManagedCertificate>,
        Option<SignerAlg>,
    )
{
    fn get_signer(
        self,
        config_data: &ConfigData,
        common_name: Option<String>,
    ) -> Result<Box<dyn Signer>, String> {
        match self {
            (Some(key), _, _, _, Some(SignerAlg::Es256k)) => Ok(ManagedEcdsaSigner::new_boxed(
                key.into(),
                common_name,
                config_data.config.host.clone(),
                config_data.config.api_key.clone(),
            )),
            (Some(key), _, _, _, Some(SignerAlg::Bjj)) => Ok(ManagedBJJSigner::new_boxed(
                key.into(),
                common_name,
                config_data.config.host.clone(),
                config_data.config.api_key.clone(),
            )),
            (Some(key), _, _, _, Some(SignerAlg::Ens)) => Ok(ManagedEnsSigner::new_boxed(
                key.into(),
                config_data.config.host.clone(),
                config_data.config.api_key.clone(),
            )),
            (_, Some(key), _, _, Some(SignerAlg::Es256k)) => {
                Ok(LocalEcdsaSigner::new_boxed(key.into(), common_name))
            }
            (_, Some(key), _, _, Some(SignerAlg::Ens)) => Ok(LocalEnsSigner::new_boxed(key.into())),
            (_, _, _, Some(key), Some(SignerAlg::Es256k)) => Ok(ManagedEcdsaSigner::new_boxed(
                key.into(),
                common_name,
                config_data.config.host.clone(),
                config_data.config.api_key.clone(),
            )),
            (_, _, Some(key), _, Some(SignerAlg::Es256k)) => {
                Err("algorithm not implemented for signer provided".to_string())
            }
            (_, _, _, _, Some(SignerAlg::Bjj))
            | (_, _, _, _, Some(SignerAlg::Ens))
            | (_, _, _, _, Some(SignerAlg::Es256k)) => Err("empty signer provided".to_string()),
            (_, _, _, _, None) => Err("empty signer and algorithm provided".to_string()),
        }
    }
}
