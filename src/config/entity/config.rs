#[derive(Debug, PartialEq, Eq, Clone)]
pub struct Configuration {
    pub host: String,
    pub wait_message_interval_factor: i32,
    pub wait_message_interval_default: i32,
    pub key_type_algorithm: String,
    pub elliptic_curve_key: String,
    pub signature_algorithm: String,
}

impl Default for Configuration {
    fn default() -> Self {
        Self {
            host: String::from(""),
            wait_message_interval_factor: 2,
            wait_message_interval_default: 1000,
            key_type_algorithm: String::from("EC"),
            elliptic_curve_key: String::from("secp256k1"),
            signature_algorithm: String::from("ES256K"),
        }
    }
}

#[derive(Debug, PartialEq, Eq, Clone)]
pub struct NetworkConfiguration {
    pub contract_address: String,
    pub contract_abi: String,
    pub http_provider: String,
}
