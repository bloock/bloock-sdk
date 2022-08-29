use std::collections::HashMap;

use bloock_core::config::{
    config_data::ConfigData as CoreConfigData,
    entity::{config::NetworkConfiguration, network::Network},
};

use crate::{error::BridgeError, items::ConfigData};

use super::network::{map_network_config, map_network_from_i32};

pub fn map_config(config_data: Option<ConfigData>) -> Result<CoreConfigData, BridgeError> {
    let config_data = match config_data {
        Some(config_data) => config_data,
        None => return Err(BridgeError::InvalidArgument),
    };

    let config = match config_data.config {
        Some(config) => config,
        None => return Err(BridgeError::InvalidArgument),
    };

    let mut networks_config: HashMap<Network, NetworkConfiguration> = HashMap::new();
    for (network, config) in config_data.networks_config {
        let network = match map_network_from_i32(network) {
            Some(network) => network,
            None => return Err(BridgeError::InvalidArgument),
        };
        networks_config.insert(network, map_network_config(config.clone()));
    }

    let mut default_config = CoreConfigData::new(config.api_key, config.host);

    if !networks_config.is_empty() {
        default_config.networks_config = networks_config;
    }

    Ok(default_config)
}
