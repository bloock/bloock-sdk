use crate::request::Request;
use crate::transport::Transport;
use crate::types::U256;
use crate::Result;

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
        let request = Request::new_get_state_request(contract_address, state)?;

        let state: U256 = Transport::send_request(provider, request).await?;

        Ok(state.as_u128())
    }
}
