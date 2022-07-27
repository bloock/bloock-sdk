use crate::config::ConfigData;
use crate::error::BloockResult;
use std::sync::Arc;
use std::sync::Mutex;

use super::{
    entity::{
        config::{Configuration, NetworkConfiguration},
        network::Network,
    },
    ConfigError,
};

pub struct ConfigService {
    pub config_data: Arc<Mutex<ConfigData>>,
}

impl ConfigService {
    pub fn get_config(&self) -> BloockResult<Configuration> {
        match self.config_data.lock() {
            Ok(config_data) => Ok(config_data.get_config()),
            Err(_) => Err(ConfigError::ConfigDataError().into()),
        }
    }

    pub fn get_api_base_url(&self) -> BloockResult<String> {
        match self.get_config() {
            Ok(config) => Ok(config.host.clone()),
            Err(e) => Err(e),
        }
    }

    pub fn set_api_host(&self, host: String) -> BloockResult<()> {
        match self.config_data.lock() {
            Ok(mut config_data) => {
                config_data.set_api_host(host);
                Ok(())
            }
            Err(_) => Err(ConfigError::ConfigDataError().into()),
        }
    }

    pub fn get_network_config(&self, network: Network) -> BloockResult<NetworkConfiguration> {
        match self.config_data.lock() {
            Ok(config_data) => Ok(config_data.get_network_config(network)),
            Err(_) => Err(ConfigError::ConfigDataError().into()),
        }
    }

    pub fn set_network_config(
        &self,
        network: Network,
        config: NetworkConfiguration,
    ) -> BloockResult<()> {
        match self.config_data.lock() {
            Ok(mut config_data) => {
                config_data.set_network_config(network, config);
                Ok(())
            }
            Err(_) => Err(ConfigError::ConfigDataError().into()),
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::config::{self, entity::config::Configuration};

    #[test]
    fn test_get_config() {
        let mut config_service = config::configure_test();

        assert_eq!(
            config_service.get_config().unwrap(),
            Configuration::default()
        );
    }

    #[test]
    fn test_get_base_url() {
        let mut config_service = config::configure_test();

        let mut config = Configuration::default();
        config.host = String::from("test");

        assert_eq!(config_service.get_api_base_url().unwrap(), "test")
    }

    #[test]
    fn test_set_host() {
        let mut config_service = config::configure_test();

        let host = String::from("https://api.bloock.com");
        assert!(config_service.set_api_host(host).is_ok());
    }
}
