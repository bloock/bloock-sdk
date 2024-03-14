use crate::request::Request;
use crate::transport::Transport;
use crate::{BlockchainError, Result};
use ethabi::{ParamType, Token};
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
        api_key: String,
    ) -> Result<u128> {
        let request = Request::new_get_state_request(contract_address, state)?;

        let result = Transport::send_request(provider, request, api_key).await?;

        let result = ethabi::decode(&[ParamType::Uint(256)], &result)
            .map_err(|_| BlockchainError::Web3Error("Invalid response received".to_string()))?;

        if let Some(Token::Uint(a)) = result.first() {
            return Ok(a.as_u128());
        }
        Err(BlockchainError::Web3Error(
            "Couldn't decode response".to_string(),
        ))
    }

    pub async fn reverse_ens(
        &self,
        provider: String,
        address: String,
        api_key: String,
    ) -> Result<String> {
        let request = Request::new_reverse_ens_request(address)?;

        let result = Transport::send_request(provider, request, api_key).await?;

        let result = ethabi::decode(&[ParamType::Array(Box::new(ParamType::String))], &result)
            .map_err(|_| BlockchainError::Web3Error("Invalid response received".to_string()))?;

        if let Some(Token::Array(a)) = result.first() {
            if let Some(Token::String(s)) = a.first() {
                return Ok(s.clone());
            }
        }
        Err(BlockchainError::Web3Error(
            "Couldn't decode response".to_string(),
        ))
    }
}
