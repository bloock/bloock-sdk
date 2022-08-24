use crate::{response::Response, BlockchainError};

pub struct U256(u128);
impl U256 {
    pub fn as_u128(&self) -> u128 {
        self.0
    }
}

impl TryFrom<Response> for U256 {
    type Error = BlockchainError;

    fn try_from(res: Response) -> Result<Self, Self::Error> {
        let value = res.result.strip_prefix("0x").ok_or_else(|| {
            BlockchainError::Web3Error("Invalid hex response received".to_string())
        })?;
        Ok(Self(
            u128::from_str_radix(value, 16)
                .map_err(|e| BlockchainError::Web3Error(e.to_string()))?,
        ))
    }
}
