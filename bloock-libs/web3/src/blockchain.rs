use crate::BlockchainError;
use crate::Result;
use std::str::FromStr;
use web3::contract::Contract;
use web3::contract::Options;
use web3::types::Address;
use web3::types::H256;
use web3::types::U256;

#[cfg(test)]
use mockall::automock;

pub struct Blockchain {}

#[cfg_attr(test, automock)]
impl Blockchain {
    pub async fn validate_state(
        &self,
        provider: String,
        contract_address: String,
        state: String,
    ) -> Result<u128> {
        let http_provider = web3::transports::Http::new(&provider)
            .map_err(|e| BlockchainError::Web3Error(e.to_string()))?;
        let web3 = web3::Web3::new(http_provider);

        let contract: Contract<web3::transports::Http> = Contract::from_json(
            web3.eth(),
            Address::from_slice(
                &hex::decode(&contract_address)
                    .map_err(|e| BlockchainError::Web3Error(e.to_string()))?,
            ),
            include_bytes!("./abi/evm_abi.json"),
        )
        .map_err(|e| BlockchainError::Web3Error(e.to_string()))?;
        let result = contract.query(
            "getState",
            H256::from_str(&state).map_err(|e| BlockchainError::Web3Error(e.to_string()))?,
            None,
            Options::default(),
            None,
        );

        let state: U256 = result
            .await
            .map_err(|e| BlockchainError::Web3Error(e.to_string()))?;

        return Ok(state.as_u128());
    }
}

#[cfg(test)]
mod tests {

    use super::*;
    use wasm_bindgen_test::wasm_bindgen_test;
    wasm_bindgen_test::wasm_bindgen_test_configure!(run_in_browser);

    #[tokio::test]
    #[cfg(not(feature = "wasm"))]
    async fn test_get_state() {
        let state = "fd6d38f2dbbf3e875af204b5e0a337906e5a00e36ade46a2de8b18ad0f05247c";
        let contract_address = "7E22c795325E76306920293F62a02F353536280b";
        let provider = "https://rinkeby.infura.io/v3/40e23a35d578492daacb318023772b52";

        let web3 = Blockchain {};
        let timestamp = web3
            .validate_state(
                provider.to_string(),
                contract_address.to_string(),
                state.to_string(),
            )
            .await
            .unwrap();

        assert_eq!(
            timestamp, 1655801554,
            "Timestamp doesn't match the expected"
        );
    }

    #[wasm_bindgen_test]
    #[cfg(feature = "wasm")]
    async fn test_get_state() {
        let state = "fd6d38f2dbbf3e875af204b5e0a337906e5a00e36ade46a2de8b18ad0f05247c";
        let contract_address = "7E22c795325E76306920293F62a02F353536280b";
        let provider = "https://rinkeby.infura.io/v3/40e23a35d578492daacb318023772b52";

        let web3 = Blockchain {};
        let timestamp = web3
            .validate_state(
                provider.to_string(),
                contract_address.to_string(),
                state.to_string(),
            )
            .await
            .unwrap();

        assert_eq!(
            timestamp, 1655801554,
            "Timestamp doesn't match the expected"
        );
    }
}
