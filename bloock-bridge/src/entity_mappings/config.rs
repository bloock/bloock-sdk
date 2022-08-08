use std::collections::HashMap;

use bloock_core::config::{
    config_data::ConfigData as CoreConfigData,
    entity::{
        config::{Configuration, NetworkConfiguration},
        network::Network,
    },
};

use crate::items::ConfigData;

use super::network::{map_network_config, map_network_from_i32};

pub fn map_config(config_data: ConfigData) -> CoreConfigData {
    let config = config_data.config.unwrap();

    let mut networks_config: HashMap<Network, NetworkConfiguration> = HashMap::new();
    for (network, config) in &config_data.networks_config {
        networks_config.insert(
            map_network_from_i32(*network).unwrap(), // TODO Handle unwrap
            map_network_config(config.clone()),
        );
    }

    CoreConfigData {
        config: Configuration {
            host: config.host,
            api_key: config.api_key,
            wait_message_interval_factor: config.wait_message_interval_factor,
            wait_message_interval_default: config.wait_message_interval_default,
            key_type_algorithm: config.key_type_algorithm,
            elliptic_curve_key: config.elliptic_curve_key,
            signature_algorithm: config.signature_algorithm,
        },
        networks_config,
    }
}
