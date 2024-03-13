use serde::{Deserialize, Serialize};

#[derive(Debug, PartialEq, Eq, Clone)]
pub struct Configuration {
    pub library_name: String,
    pub host: String,
    pub cdn_host: String,
    pub api_key: String,
    pub identity_api_host: Option<String>,
    pub wait_message_interval_factor: u128,
    pub wait_message_interval_default: u128,
    pub key_type_algorithm: String,
    pub elliptic_curve_key: String,
    pub signature_algorithm: String,
}

impl Default for Configuration {
    fn default() -> Self {
        Self {
            library_name: String::from("unknown"),
            host: String::from(""),
            cdn_host: String::from(""),
            api_key: String::from(""),
            identity_api_host: None,
            wait_message_interval_factor: 2,
            wait_message_interval_default: 1000,
            key_type_algorithm: String::from("EC"),
            elliptic_curve_key: String::from("secp256k1"),
            signature_algorithm: String::from("ES256K"),
        }
    }
}

#[derive(Debug, PartialEq, Eq, Clone, Serialize, Deserialize)]
pub struct NetworkConfiguration {
    pub contract_address: String,
    pub contract_abi: String,
    pub http_provider: String,
}
