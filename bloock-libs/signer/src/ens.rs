use crate::{
    ecdsa::{EcdsaSigner, EcdsaSignerArgs, EcdsaVerifier},
    Result, Verifier,
};

use super::{Signature, Signer};
use std::str;

pub const ENS_ALG: &str = "ENS";

pub fn get_common_name(signature: &Signature) -> Result<String> {
    todo!()
}

#[derive(Clone)]
pub struct EnsSignerArgs {
    pub private_key: String,
}

impl EnsSignerArgs {
    pub fn new(private_key: &str) -> Self {
        Self {
            private_key: private_key.to_string(),
        }
    }
}

impl From<EnsSignerArgs> for EcdsaSignerArgs {
    fn from(args: EnsSignerArgs) -> Self {
        EcdsaSignerArgs {
            private_key: args.private_key,
            common_name: None,
        }
    }
}

pub struct EnsSigner {
    signer: EcdsaSigner,
}

impl EnsSigner {
    pub fn new(args: EnsSignerArgs) -> Self {
        Self {
            signer: EcdsaSigner::new(args.into()),
        }
    }

    pub fn generate_keys() -> Result<(String, String)> {
        EcdsaSigner::generate_keys()
    }
}

impl Signer for EnsSigner {
    fn sign(&self, payload: &[u8]) -> Result<Signature> {
        let mut signature = self.signer.sign(payload)?;
        signature.header.alg = ENS_ALG.to_string();
        Ok(signature)
    }
}

pub struct EnsVerifier {}

impl Verifier for EnsVerifier {
    fn verify(&self, payload: &[u8], signature: Signature) -> Result<bool> {
        EcdsaVerifier::new().verify(payload, signature)
    }
}
