pub struct Configuration {
    pub HOST: String,
    pub WAIT_MESSAGE_INTERVAL_FACTOR: i32,
    pub WAIT_MESSAGE_INTERVAL_DEFAULT: i32,
    pub KEY_TYPE_ALGORITHM: String,
    pub ELLIPTIC_CURVE_KEY: String,
    pub SIGNATURE_ALGORITHM: String,
}

impl Default for Configuration {
    fn default() -> Self {
        Configuration {
            HOST: String::from(""),
            WAIT_MESSAGE_INTERVAL_FACTOR: 2,
            WAIT_MESSAGE_INTERVAL_DEFAULT: 1000,
            KEY_TYPE_ALGORITHM: String::from("EC"),
            ELLIPTIC_CURVE_KEY: String::from("secp256k1"),
            SIGNATURE_ALGORITHM: String::from("ES256K"),
        }
    }
}

pub struct NetworkConfiguration {
    pub CONTRACT_ADDRESS: String,
    pub CONTRACT_ABI: String,
    pub HTTP_PROVIDER: String,
}
