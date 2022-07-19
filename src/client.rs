use crate::anchor;
use crate::config;
use crate::config::config_data::ConfigData;
use crate::config::entity::config::NetworkConfiguration;
use crate::config::entity::network::Network;
use crate::infrastructure::http::{HttpClient, HttpClientImpl};
use crate::proof;
use crate::record;
use std::sync::Arc;

#[cfg(test)]
use mockall::automock;

#[cfg_attr(test, automock)]
pub trait BloockClient {
    fn get_key(&self) -> String;
    fn set_api_host(&mut self, host: String);
    fn set_network_config(&mut self, network: Network, config: NetworkConfiguration);
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
}

pub fn configure(api_key: String) -> impl BloockClient {
    let http_client = Arc::new(HttpClientImpl::new(api_key));

    return BloockClientImpl {
        anchor_service: anchor::configure(Arc::clone(&http_client)),
        config_service: config::configure(Arc::clone(&http_client), ConfigData::new()),
        record_service: record::configure(Arc::clone(&http_client)),
        proof_service: proof::configure(Arc::clone(&http_client)),
        http_client: Arc::clone(&http_client),
    };
}
