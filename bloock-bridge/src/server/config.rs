use bloock_core::client::BloockClient;
use bloock_core::config::entity::config::NetworkConfiguration;

use crate::{items::{ConfigHandler, ConfigResponse, Error}, core_entity_mappings};

pub struct ConfigServer {
    pub client: BloockClient,
}
impl ConfigHandler for ConfigServer {
    fn set_api_host(&self, input: crate::items::SetApiHostRequest) -> crate::items::ConfigResponse {
        match self.client.set_api_host(input.host) {
            Ok(()) => ConfigResponse { error: None },
            Err(e) => ConfigResponse {
                error: Some(Error {
                    kind: "Config Error".to_string(),
                    message: e.to_string(),
                }),
            },
        }
    }

    fn set_network_config(
        &self,
        input: crate::items::SetNetworkConfigRequest,
    ) -> crate::items::ConfigResponse {
        let config = NetworkConfiguration {
            // TODO Remove unwrap. Why is config an option?
            contract_address: input.config.as_ref().unwrap().contract_address.clone(),
            contract_abi: input.config.as_ref().unwrap().contract_abi.clone(),
            http_provider: input.config.as_ref().unwrap().http_provider.clone(),
        };

        let network = core_entity_mappings::map_network(input.network());

        match self.client.set_network_configuration(network, config) {
            Ok(()) => ConfigResponse { error: None },
            Err(e) => ConfigResponse {
                error: Some(Error {
                    kind: "Config Error".to_string(),
                    message: e.to_string(),
                }),
            },
        }
    }
}
