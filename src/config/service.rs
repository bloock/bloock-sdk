use crate::config::repository::ConfigRepository;

#[cfg(test)]
use mockall::automock;

use super::entity::{
    config::{Configuration, NetworkConfiguration},
    network::Network,
};

#[cfg_attr(test, automock)]
pub trait ConfigService {
    fn get_config(&self) -> &Configuration;
    fn get_api_base_url(&self) -> &String;
    fn set_api_host(&mut self, host: String);
    fn get_network_config(&self, network: Network) -> &NetworkConfiguration;
    fn set_network_config(&mut self, network: Network, config: NetworkConfiguration);
}

pub struct ConfigServiceImpl<A: ConfigRepository> {
    pub config_repository: A,
}

impl<A> ConfigService for ConfigServiceImpl<A>
where
    A: ConfigRepository,
{
    fn get_config(&self) -> &Configuration {
        self.config_repository.get_config()
    }

    fn get_api_base_url(&self) -> &String {
        &self.config_repository.get_config().host
    }

    fn set_api_host(&mut self, host: String) {
        self.config_repository.set_api_host(host);
    }

    fn get_network_config(&self, network: Network) -> &NetworkConfiguration {
        self.config_repository.get_network_config(network)
    }

    fn set_network_config(&mut self, network: Network, config: NetworkConfiguration) {
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
            .return_const(Configuration::default());

        assert_eq!(*config_service.get_config(), Configuration::default());
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
            .return_const(config);

        assert_eq!(config_service.get_api_base_url(), "test")
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
            .return_const(());

        config_service.set_api_host(host);
    }
}
