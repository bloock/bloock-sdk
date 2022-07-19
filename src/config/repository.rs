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
};

#[cfg_attr(test, automock)]
pub trait ConfigRepository {
    fn get_config(&self) -> Configuration;
    fn get_network_config(&self, network: Network) -> NetworkConfiguration;
    fn set_network_config(&mut self, network: Network, config: NetworkConfiguration);
    fn set_api_host(&mut self, host: String);
}

pub struct ConfigRepositoryImpl<H: HttpClient> {
    pub http: Arc<H>,
    pub config_data: Arc<Mutex<ConfigData>>,
}

impl<H> ConfigRepository for ConfigRepositoryImpl<H>
where
    H: HttpClient,
{
    fn get_config(&self) -> Configuration {
        self.config_data.lock().unwrap().get_config()
    }

    fn get_network_config(&self, network: Network) -> NetworkConfiguration {
        self.config_data.lock().unwrap().get_network_config(network)
    }

    fn set_network_config(&mut self, network: Network, config: NetworkConfiguration) {
        self.config_data.lock().unwrap().set_network_config(network, config)
    }

    fn set_api_host(&mut self, host: String) {
        self.config_data.lock().unwrap().set_api_host(host);
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
        config_repo.set_api_host(String::from(host));
        assert_eq!(config_repo.get_config().host, host)
    }
}
