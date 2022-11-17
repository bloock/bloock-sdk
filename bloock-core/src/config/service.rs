use crate::config::ConfigData;
use std::sync::Arc;

use super::entity::{
    config::{Configuration, NetworkConfiguration},
    network::Network,
};

pub struct ConfigService {
    pub config_data: Arc<ConfigData>,
}

impl ConfigService {
    pub fn get_config(&self) -> Configuration {
        self.config_data.get_config()
    }

    pub fn get_api_base_url(&self) -> String {
        self.get_config().host
    }

    pub fn get_network_config(&self, network: Network) -> NetworkConfiguration {
        self.config_data.get_network_config(network)
    }

    pub fn get_api_key(&self) -> String {
        self.config_data.get_config().api_key
    }
}
