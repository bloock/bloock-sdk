use bloock_hasher::{keccak::Keccak256, Hasher};
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
    let address = derive_eth_addres(&signature.header.kid);
    let name = provider
        .lookup_address(address.parse().unwrap())
        .await
        .unwrap();
    Ok(name)
}

fn derive_eth_addres(public_key: &str) -> String {
    let public_key = hex::decode(public_key).unwrap();
    let address = hex::encode(&Keccak256::generate_hash(&public_key)[12..]);
    address
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

    pub fn new_boxed(args: EnsSignerArgs) -> Box<Self> {
        Box::new(Self::new(args))
    }
}

impl Signer for EnsSigner {
    fn sign(&self, payload: &[u8]) -> Result<Signature> {
        let mut signature = self.signer.sign(payload)?;
        signature.header.alg = ENS_ALG.to_string();
        Ok(signature)
    }
}

#[derive(Default)]
pub struct EnsVerifier {}

impl Verifier for EnsVerifier {
    fn verify(&self, payload: &[u8], signature: Signature) -> Result<bool> {
        EcdsaVerifier::default().verify(payload, signature)
    }
}

#[cfg(test)]
mod tests {
    use crate::{Algorithms, Signature};

    use super::get_common_name;

    #[tokio::test]
    async fn get_common_name_ens_ok() {
        let signature = Signature {
            header: crate::SignatureHeader {
                alg: Algorithms::ECDSA.to_string(),
                kid: "0323be7883b973ab884070078ecf9a53a747dd1573ef8f507695d100857258eec3"
                    .to_string(),
            },
            protected: "".to_string(),
            signature: "".to_string(),
        };

        let name = get_common_name(&signature).await.unwrap();
        assert_eq!(name, "vitalik.eth")
    }
}
