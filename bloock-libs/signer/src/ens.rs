use ethers::providers::Middleware;

use crate::{
    ecdsa::{EcdsaSigner, EcdsaSignerArgs, EcdsaVerifier},
    Result, Verifier,
};

use super::{Signature, Signer};
use std::str;

pub const ENS_ALG: &str = "ENS";

pub async fn get_common_name(signature: &Signature) -> Result<String> {
    let provider = ethers::providers::MAINNET.provider();
    let name = provider
        .lookup_address(signature.header.kid.parse().unwrap())
        .await
        .unwrap();
    Ok(name)
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

#[tokio::test]
async fn get_common_name_ens_ok() {
    let signature = Signature {
        header: crate::SignatureHeader {
            alg: crate::ecdsa::ECDSA_ALG.to_string(),
            kid: "d8dA6BF26964aF9D7eEd9e03E53415D37aA96045".to_string(),
        },
        protected: "".to_string(),
        signature: "".to_string(),
    };

    let name = get_common_name(&signature).await.unwrap();
    assert_eq!(name, "vitalik.eth")
}
