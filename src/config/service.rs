use crate::config::repository::ConfigRepository;

#[cfg(test)]
use mockall::automock;

use super::{
    entity::{
        config::{Configuration, NetworkConfiguration},
        network::Network,
    },
    ConfigError,
};

#[cfg_attr(test, automock)]
pub trait ConfigService {
    fn get_config(&self) -> Result<Configuration, ConfigError>;
    fn get_api_base_url(&self) -> Result<String, ConfigError>;
    fn set_api_host(&mut self, host: String) -> Result<(), ConfigError> ;
    fn get_network_config(&self, network: Network) -> Result<NetworkConfiguration, ConfigError>;
    fn set_network_config(&mut self, network: Network, config: NetworkConfiguration) -> Result<(), ConfigError>;
}

pub struct ConfigServiceImpl<A: ConfigRepository> {
    pub config_repository: A,
}

impl<A> ConfigService for ConfigServiceImpl<A>
where
    A: ConfigRepository,
{
    fn get_config(&self) -> Result<Configuration, ConfigError> {
        self.config_repository.get_config()
    }

    fn get_api_base_url(&self) -> Result<String, ConfigError> {
        match self.config_repository.get_config() {
            Ok(config) => Ok(config.host.clone()),
            Err(e) => Err(e),
        }
    }

    fn set_api_host(&mut self, host: String) -> Result<(), ConfigError> {
        self.config_repository.set_api_host(host)
    }

    fn get_network_config(&self, network: Network) -> Result<NetworkConfiguration, ConfigError> {
        self.config_repository.get_network_config(network)
    }

    fn set_network_config(&mut self, network: Network, config: NetworkConfiguration) -> Result<(), ConfigError> {
        self.config_repository.set_network_config(network, config)
    }
}

#[cfg(test)]
mod tests {
    use super::{ConfigService, ConfigServiceImpl};
    use crate::config::{configure_repository_test, entity::config::Configuration};

    #[test]
    fn test_get_config() {
        let mut config_service = ConfigServiceImpl {
            config_repository: configure_repository_test(),
        };

        config_service
            .config_repository
            .expect_get_config()
            .times(1)
            .return_const(Ok(Configuration::default()));

        assert_eq!(config_service.get_config().unwrap(), Configuration::default());
    }

    #[test]
    fn test_get_base_url() {
        let mut config_service = ConfigServiceImpl {
            config_repository: configure_repository_test(),
        };

        let mut config = Configuration::default();
        config.host = String::from("test");
        config_service
            .config_repository
            .expect_get_config()
            .times(1)
            .return_const(Ok(config));

        assert_eq!(config_service.get_api_base_url().unwrap(), "test")
    }

    #[test]
    fn test_set_host() {
        let mut config_service = ConfigServiceImpl {
            config_repository: configure_repository_test(),
        };

        let host = String::from("https://api.bloock.com");
        config_service
            .config_repository
            .expect_set_api_host()
            .times(1)
            .return_const(Ok(()));

        assert!(config_service.set_api_host(host).is_ok());
    }
}
