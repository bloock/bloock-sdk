use crate::infrastructure::http::HttpClient;
use std::sync::{Arc, Mutex};

#[cfg(test)]
use mockall::automock;

use super::{
    config_data::ConfigData,
    entity::{
        config::{Configuration, NetworkConfiguration},
        network::Network,
    },
    ConfigError,
};

#[cfg_attr(test, automock)]
pub trait ConfigRepository {
    fn get_config(&self) -> Result<Configuration, ConfigError>;
    fn get_network_config(&self, network: Network) -> Result<NetworkConfiguration, ConfigError>;
    fn set_network_config(
        &mut self,
        network: Network,
        config: NetworkConfiguration,
    ) -> Result<(), ConfigError>;
    fn set_api_host(&mut self, host: String) -> Result<(), ConfigError>;
}

pub struct ConfigRepositoryImpl<H: HttpClient> {
    pub http: Arc<H>,
    pub config_data: Arc<Mutex<ConfigData>>,
}

impl<H> ConfigRepository for ConfigRepositoryImpl<H>
where
    H: HttpClient,
{
    fn get_config(&self) -> Result<Configuration, ConfigError> {
        match self.config_data.lock() {
            Ok(config_data) => Ok(config_data.get_config()),
            Err(_) => Err(ConfigError::ConfigDataError()),
        }
    }

    fn get_network_config(&self, network: Network) -> Result<NetworkConfiguration, ConfigError> {
        match self.config_data.lock() {
            Ok(config_data) => Ok(config_data.get_network_config(network)),
            Err(_) => Err(ConfigError::ConfigDataError()),
        }
    }

    fn set_network_config(
        &mut self,
        network: Network,
        config: NetworkConfiguration,
    ) -> Result<(), ConfigError> {
        match self.config_data.lock() {
            Ok(mut config_data) => {
                config_data.set_network_config(network, config);
                Ok(())
            }
            Err(_) => Err(ConfigError::ConfigDataError()),
        }
    }

    fn set_api_host(&mut self, host: String) -> Result<(), ConfigError> {
        match self.config_data.lock() {
            Ok(mut config_data) => {
                config_data.set_api_host(host);
                Ok(())
            }
            Err(_) => Err(ConfigError::ConfigDataError()),
        }
    }
}

#[cfg(test)]
mod tests {
    use std::sync::{Arc, Mutex};

    use super::{ConfigRepository, ConfigRepositoryImpl};
    use crate::config::config_data::ConfigData;
    use crate::infrastructure::http::MockHttpClient;

    #[test]
    fn test_config() {
        let mut config_repo = ConfigRepositoryImpl {
            http: Arc::new(MockHttpClient::default()),
            config_data: Arc::new(Mutex::new(ConfigData::new())),
        };

        let host = "https://modified.bloock.com";
        assert!(config_repo.set_api_host(String::from(host)).is_ok());
        assert_eq!(config_repo.get_config().unwrap().host, host)
    }
}
