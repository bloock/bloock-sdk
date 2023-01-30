use bloock_hasher::{keccak::Keccak256, Hasher, H256};
use ethers::{providers::Middleware, types::Address};
use libsecp256k1::{PublicKey, PublicKeyFormat};

use crate::{
    ecdsa::{self, EcdsaSigner, EcdsaSignerArgs, EcdsaVerifier},
    Result, SignerError, Verifier,
};

use super::{Signature, Signer};
use std::str;

pub const ENS_ALG: &str = "ENS";

pub async fn get_common_name(signature: &Signature) -> Result<String> {
    let provider = ethers::providers::MAINNET.provider();
    let hash = bloock_hasher::from_hex(&signature.message_hash)
        .map_err(|err| SignerError::SignerError(err.to_string()))?;

    let public_key = signature.recover_public_key(hash)?;
    let address = derive_eth_address(public_key)?;
    provider
        .lookup_address(address)
        .await
        .map_err(|_| SignerError::EthDomainNotFound())
}

pub fn recover_public_key(signature: &Signature, message_hash: H256) -> Result<Vec<u8>> {
    ecdsa::recover_public_key(signature, message_hash)
}

fn derive_eth_address(mut public_key: Vec<u8>) -> Result<Address> {
    if public_key.len() != 64 {
        // the key is probably compressed, so we try to decompress it
        public_key = PublicKey::parse_slice(&public_key, Some(PublicKeyFormat::Compressed))
            .map_err(|e| SignerError::InvalidPublicKey(e.to_string()))?
            .serialize()[1..]
            .to_vec();
    }
    let address = Address::from_slice(&Keccak256::generate_hash(&public_key)[12..]);
    Ok(address)
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

    use super::{derive_eth_address, get_common_name};

    #[cfg(target_arch = "wasm32")]
    mod wasm_tests {
        use wasm_bindgen_test::wasm_bindgen_test;
        wasm_bindgen_test::wasm_bindgen_test_configure!(run_in_browser);
        use super::get_common_name_ens_ok;

        #[wasm_bindgen_test]
        async fn get_common_name_ens_ok_wasm() {
            get_common_name_ens_ok().await;
        }
    }

    #[cfg(not(target_arch = "wasm32"))]
    #[tokio::test]
    async fn get_common_name_ens_ok_default() {
        get_common_name_ens_ok().await;
    }

    async fn get_common_name_ens_ok() {
        let signature = Signature {
            header: crate::SignatureHeader {
                alg: Algorithms::Ens.to_string(),
                kid: "".to_string(),
            },
            protected: "".to_string(),
            signature: "66e0c03ce895173be8afac992c43f49d0bea3768c8146b83df9acbaee7e67d7106fd2a668cb9c90edd984667caf9fbcd54acc460fb22ba5e2824eb9811101fc601".to_string(),
            message_hash: "7e43ddd9df3a0ca242fcf6d1b190811ef4d50e39e228c27fd746f4d1424b4cc6".to_string(),
        };

        let name = get_common_name(&signature).await.unwrap();
        assert_eq!(name, "vitalik.eth")
    }

    #[test]
    fn derive_eth_address_ok() {
        let public_key = hex::decode("e95ba0b752d75197a8bad8d2e6ed4b9eb60a1e8b08d257927d0df4f3ea6860992aac5e614a83f1ebe4019300373591268da38871df019f694f8e3190e493e711").unwrap();
        let address = derive_eth_address(public_key).unwrap();
        assert_eq!(
            hex::encode(address),
            "d8da6bf26964af9d7eed9e03e53415d37aa96045"
        );
    }

    #[test]
    fn derive_eth_address_compressed_key_ok() {
        let public_key =
            hex::decode("03e95ba0b752d75197a8bad8d2e6ed4b9eb60a1e8b08d257927d0df4f3ea686099")
                .unwrap();
        let address = derive_eth_address(public_key).unwrap();
        assert_eq!(
            hex::encode(address),
            "d8da6bf26964af9d7eed9e03e53415d37aa96045"
        );
    }

    #[test]
    fn derive_eth_address_invalid_key() {
        let public_key = hex::decode("e94ba0").unwrap();
        assert!(derive_eth_address(public_key).is_err());
    }
}
