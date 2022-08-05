use bloock_core::client::BloockClient;

use crate::{
    entity_mappings::network::{map_network, map_network_config},
    error::BridgeError,
    items::{ConfigHandler, ConfigResponse, Error},
};

pub struct ConfigServer {
    pub client: BloockClient,
}
impl ConfigHandler for ConfigServer {
    fn set_api_host(&self, input: crate::items::SetApiHostRequest) -> crate::items::ConfigResponse {
        match self.client.set_api_host(input.host) {
            Ok(()) => ConfigResponse { error: None },
            Err(e) => error_response(e.to_string()),
        }
    }

    fn set_network_config(
        &self,
        input: crate::items::SetNetworkConfigRequest,
    ) -> crate::items::ConfigResponse {
        let config = match input.config {
            Some(config) => map_network_config(config),
            None => {
                return error_response(BridgeError::InvalidArgument.to_string());
            }
        };

        let network = map_network(input.network());

        match self.client.set_network_configuration(network, config) {
            Ok(()) => ConfigResponse { error: None },
            Err(e) => error_response(e.to_string()),
        }
    }
}

fn error_response(message: String) -> ConfigResponse {
    ConfigResponse {
        error: Some(Error {
            kind: "Config Error".to_string(),
            message,
        }),
    }
}
