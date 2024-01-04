use crate::{
    error::BridgeError, items::ConfigData, server::integrity::entity::map_network_from_i32,
};
use bloock_core::config::config_data::ConfigData as CoreConfigData;

pub fn map_config(config_data: Option<ConfigData>) -> Result<CoreConfigData, BridgeError> {
    let config_data = match config_data {
        Some(config_data) => config_data,
        None => return Err(BridgeError::InvalidArgument),
    };

    let config = match config_data.config {
        Some(config) => config,
        None => return Err(BridgeError::InvalidArgument),
    };

    let mut default_config = CoreConfigData::new(
        config.api_key,
        config.environment,
        config.identity_api_host,
        config.library_name,
        config.disable_analytics,
    );

    for (network, config) in config_data.networks_config {
        let network = match map_network_from_i32(network) {
            Some(network) => network,
            None => return Err(BridgeError::InvalidArgument),
        };

        if let Some(net_config) = default_config.networks_config.get_mut(&network) {
            if !config.http_provider.is_empty() {
                net_config.http_provider = config.http_provider;
            }

            if !config.contract_address.is_empty() {
                net_config.contract_address = config.contract_address;
            }
        }
    }

    if !config.host.is_empty() {
        default_config.config.host = config.host.clone();
        default_config.config.cdn_host = config.host.replace("api", "cdn");
    }

    Ok(default_config)
}
