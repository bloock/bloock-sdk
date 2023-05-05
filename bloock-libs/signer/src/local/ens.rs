use super::ecdsa::LocalEcdsaSigner;
use crate::{
    entity::alg::ENS_ALG,
    local::ecdsa::{self, LocalEcdsaVerifier},
    Result, Signature, Signer, SignerError, Verifier,
};
use async_trait::async_trait;
use bloock_hasher::{keccak::Keccak256, Hasher, H256};
use bloock_keys::local::LocalKey;
use libsecp256k1::PublicKey;

pub async fn get_common_name(
    signature: &Signature,
    provider: String,
    api_key: String,
) -> Result<String> {
    let hash = bloock_hasher::from_hex(&signature.message_hash)
        .map_err(|err| SignerError::SignerError(err.to_string()))?;

    let public_key = signature.recover_public_key(hash)?;
    let address = derive_eth_address(public_key)?;

    let web3 = bloock_web3::blockchain::Blockchain {};
    web3.reverse_ens(provider, address, api_key)
        .await
        .map_err(|_| SignerError::EthDomainNotFound())
}

pub fn recover_public_key(signature: &Signature, message_hash: H256) -> Result<Vec<u8>> {
    ecdsa::recover_public_key(signature, message_hash)
}

fn derive_eth_address(mut public_key: Vec<u8>) -> Result<String> {
    if public_key.len() != 64 {
        // the key is probably compressed, so we try to decompress it
        public_key = PublicKey::parse_slice(&public_key, None)
            .map_err(|e| SignerError::InvalidPublicKey(e.to_string()))?
            .serialize()[1..]
            .to_vec();
    }

    Ok(hex::encode(&Keccak256::generate_hash(&public_key)[12..]))
}

pub struct LocalEnsSigner {
    local_key: LocalKey<String>,
}

impl LocalEnsSigner {
    pub fn new(key: LocalKey<String>) -> Self {
        Self { local_key: key }
    }

    pub fn new_boxed(key: LocalKey<String>) -> Box<Self> {
        Box::new(Self::new(key))
    }
}

#[async_trait(?Send)]
impl Signer for LocalEnsSigner {
    async fn sign(&self, payload: &[u8]) -> Result<Signature> {
        let ecdsa_signer = LocalEcdsaSigner::new(self.local_key.clone(), None);
        let mut signature = ecdsa_signer.sign(payload).await?;
        signature.header.alg = ENS_ALG.to_string();
        Ok(signature)
    }
}

#[derive(Default)]
pub struct LocalEnsVerifier {}

#[async_trait(?Send)]
impl Verifier for LocalEnsVerifier {
    async fn verify(&self, payload: &[u8], signature: Signature) -> Result<bool> {
        LocalEcdsaVerifier::default()
            .verify(payload, signature)
            .await
    }
}

#[cfg(test)]
mod tests {
    use crate::{
        entity::{alg::Algorithms, signature::SignatureHeader},
        Signature,
    };

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
        let provider = "https://ethereum.bloock.com".to_string();
        let signature = Signature {
            header: SignatureHeader {
                alg: Algorithms::Ens.to_string(),
                kid: "".to_string(),
            },
            protected: "".to_string(),
            signature: "66e0c03ce895173be8afac992c43f49d0bea3768c8146b83df9acbaee7e67d7106fd2a668cb9c90edd984667caf9fbcd54acc460fb22ba5e2824eb9811101fc601".to_string(),
            message_hash: "7e43ddd9df3a0ca242fcf6d1b190811ef4d50e39e228c27fd746f4d1424b4cc6".to_string(),
        };

        let name = get_common_name(
            &signature,
            provider,
            option_env!("API_KEY").unwrap().to_string(),
        )
        .await
        .unwrap();
        assert_eq!(name, "vitalik.eth")
    }

    #[test]
    fn derive_eth_address_ok() {
        let public_key = hex::decode("e95ba0b752d75197a8bad8d2e6ed4b9eb60a1e8b08d257927d0df4f3ea6860992aac5e614a83f1ebe4019300373591268da38871df019f694f8e3190e493e711").unwrap();
        let address = derive_eth_address(public_key).unwrap();
        assert_eq!(address, "d8da6bf26964af9d7eed9e03e53415d37aa96045");
    }

    #[test]
    fn derive_eth_address_compressed_key_ok() {
        let public_key =
            hex::decode("03e95ba0b752d75197a8bad8d2e6ed4b9eb60a1e8b08d257927d0df4f3ea686099")
                .unwrap();
        let address = derive_eth_address(public_key).unwrap();
        assert_eq!(address, "d8da6bf26964af9d7eed9e03e53415d37aa96045");
    }

    #[test]
    fn derive_eth_address_invalid_key() {
        let public_key = hex::decode("e94ba0").unwrap();
        assert!(derive_eth_address(public_key).is_err());
    }
}
