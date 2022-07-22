use crate::anchor;
use crate::anchor::entity::anchor::Anchor;
use crate::config;
use crate::config::config_data::ConfigData;
use crate::config::entity::config::NetworkConfiguration;
use crate::config::entity::network::Network;
use crate::infrastructure::http::{HttpClient, HttpClientImpl};
use crate::proof;
use crate::record;
use std::sync::Arc;
use std::sync::Mutex;

#[cfg(test)]
use mockall::automock;

#[cfg_attr(test, automock)]
pub trait BloockClient {
    fn get_key(&self) -> String;
    fn set_api_host(&mut self, host: String);
    fn set_network_config(&mut self, network: Network, config: NetworkConfiguration);

    fn get_anchor(&self, anchor: i32) -> Result<Anchor, crate::infrastructure::InfrastructureError>;
    fn wait_anchor(&self, anchor: i32, timeout: u64) -> Result<Anchor, anchor::AnchorError>;
}

pub struct BloockClientImpl<
    A: anchor::service::AnchorService,
    C: config::service::ConfigService,
    R: record::service::RecordService,
    P: proof::service::ProofService,
    H: HttpClient,
> {
    anchor_service: A,
    config_service: C,
    record_service: R,
    proof_service: P,
    http_client: Arc<H>,
}

impl<A, C, R, P, H> BloockClient for BloockClientImpl<A, C, R, P, H>
where
    A: anchor::service::AnchorService,
    C: config::service::ConfigService,
    R: record::service::RecordService,
    P: proof::service::ProofService,
    H: HttpClient,
{
    fn get_key(&self) -> String {
        return self.http_client.get_api_key();
    }

    fn set_api_host(&mut self, host: String) {
        self.config_service.set_api_host(host);
    }

    fn set_network_config(&mut self, network: Network, config: NetworkConfiguration) {
        self.config_service.set_network_config(network, config);
    }

    fn get_anchor(&self, anchor_id: i32) -> Result<Anchor, crate::infrastructure::InfrastructureError> {
        self.anchor_service.get_anchor(anchor_id)
    }

    fn wait_anchor(&self, anchor_id: i32, timeout: u64) -> Result<Anchor, anchor::AnchorError> {
        self.anchor_service.wait_anchor(anchor_id, timeout)
    }
}

pub fn configure(api_key: String) -> impl BloockClient {
    let http_client = Arc::new(HttpClientImpl::new(api_key));
    let config_data = Arc::new(Mutex::new(ConfigData::new()));

    return BloockClientImpl {
        anchor_service: anchor::configure(Arc::clone(&http_client), Arc::clone(&config_data)),
        config_service: config::configure(Arc::clone(&http_client), Arc::clone(&config_data)),
        record_service: record::configure(Arc::clone(&http_client)),
        proof_service: proof::configure(Arc::clone(&http_client)),
        http_client: Arc::clone(&http_client),
    };
}
