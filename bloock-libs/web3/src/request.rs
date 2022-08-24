use bloock_hashing::hashing::{Hashing, Keccak256};
use serde::{Deserialize, Serialize};

use crate::BlockchainError;

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]

pub struct Request {
    pub jsonrpc: String,
    pub method: String,
    pub params: Vec<serde_json::Value>,
    pub id: u64,
}

impl Request {
    pub fn new_get_state_request(to: String, hash: String) -> Result<Self, BlockchainError> {
        let encoded_method = Self::encoded_method();
        let encoded_data = Self::encode_state(&hash)?;

        let data: Vec<u8> = encoded_method
            .into_iter()
            .chain(encoded_data.into_iter())
            .collect();

        let call = CallRequest {
            to: Self::add_0x(to),
            data: Self::add_0x(hex::encode(data)),
        };

        let params = vec![
            Self::serialize(&call),
            Self::serialize(&String::from("latest")),
        ];
        Ok(Self {
            jsonrpc: "2.0".to_string(),
            method: "eth_call".to_string(),
            params,
            id: 1,
        })
    }

    fn encoded_method() -> [u8; 4] {
        let mut result = [0u8; 4];

        let data: Vec<u8> = From::from("getState(bytes32)");
        let hashing_algorithm = Keccak256 {};
        let hash = hashing_algorithm.generate_hash(&data);
        let hash_vec = hex::decode(hash).expect("Shouldn't fail to decode hash from hex");
        result.copy_from_slice(&hash_vec[..4]);

        result
    }

    fn encode_state(input: &str) -> Result<[u8; 32], BlockchainError> {
        let mut result = [0u8; 32];
        hex::decode_to_slice(input, &mut result)
            .map_err(|e| BlockchainError::InvalidRequest(e.to_string()))?;
        Ok(result)
    }

    fn serialize<T: serde::Serialize>(t: &T) -> serde_json::Value {
        serde_json::to_value(t).expect("Types never fail to serialize.")
    }

    fn add_0x(str: String) -> String {
        let mut _0x = String::from("0x");
        _0x.push_str(&str);
        _0x
    }
}

#[derive(Clone, Debug, PartialEq, Eq, Default, Serialize, Deserialize)]
pub struct CallRequest {
    to: String,
    data: String,
}
