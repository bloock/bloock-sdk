use bloock_core::config::entity::config::NetworkConfiguration as BloockNetworkConfiguration;
use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen(getter_with_clone)]
pub struct NetworkConfiguration {
    pub contract_address: String,
    pub contract_abi: String,
    pub http_provider: String,
}

#[wasm_bindgen]
impl NetworkConfiguration {
    #[wasm_bindgen(constructor)]
    pub fn new(contract_address: String, contract_abi: String, http_provider: String) -> Self {
        Self {
            contract_address: contract_address,
            contract_abi: contract_abi,
            http_provider: http_provider,
        }
    }
}

impl From<BloockNetworkConfiguration> for NetworkConfiguration {
    fn from(a: BloockNetworkConfiguration) -> Self {
        Self {
            contract_address: a.contract_address,
            contract_abi: a.contract_abi,
            http_provider: a.http_provider,
        }
    }
}

impl Into<BloockNetworkConfiguration> for NetworkConfiguration {
    fn into(self) -> BloockNetworkConfiguration {
        BloockNetworkConfiguration {
            contract_address: self.contract_address,
            contract_abi: self.contract_abi,
            http_provider: self.http_provider,
        }
    }
}
