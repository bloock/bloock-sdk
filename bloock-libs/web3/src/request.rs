use crate::BlockchainError;
use ethabi::{ethereum_types::H160, FixedBytes, ParamType, Token};
use hex::FromHex;
use serde::{Deserialize, Serialize};
use std::str::FromStr;

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]

pub struct Request {
    pub jsonrpc: String,
    pub method: String,
    pub params: Vec<serde_json::Value>,
    pub id: u64,
}

impl Request {
    pub fn new_get_state_request(to: String, hash: String) -> Result<Self, BlockchainError> {
        let encoded_method = ethabi::short_signature("getState", &[ParamType::FixedBytes(32)]);
        let bytes = FixedBytes::from_hex(hash)
            .map_err(|e| BlockchainError::InvalidRequest(e.to_string()))?;
        let encoded_data = ethabi::encode(&[Token::FixedBytes(bytes)]);

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

    pub fn new_reverse_ens_request(address: String) -> Result<Self, BlockchainError> {
        let encoded_method = ethabi::short_signature(
            "getNames",
            &[ParamType::Array(Box::new(ParamType::Address))],
        );

        let address_h =
            H160::from_str(&address).map_err(|e| BlockchainError::InvalidRequest(e.to_string()))?;
        let encoded_data = ethabi::encode(&[Token::Array(vec![Token::Address(address_h)])]);

        let data: Vec<u8> = encoded_method
            .into_iter()
            .chain(encoded_data.into_iter())
            .collect();

        let call = CallRequest {
            to: "0x3671aE578E63FdF66ad4F3E12CC0c0d71Ac7510C".to_string(),
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
