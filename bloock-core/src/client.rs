use crate::anchor;
use crate::anchor::entity::anchor::Anchor;
use crate::anchor::service::AnchorService;
use crate::config;
use crate::config::config_data::ConfigData;
use crate::config::entity::config::NetworkConfiguration;
use crate::config::entity::network::Network;
use crate::config::service::ConfigService;
use crate::error::BloockResult;
use crate::proof;
use crate::proof::service::ProofService;
use crate::record;
use crate::record::entity::record::Record;
use crate::record::entity::record_receipt::RecordReceipt;
use crate::record::service::RecordService;
use bloock_http::{Client, HttpClient};
use std::sync::Arc;
use std::sync::Mutex;

pub struct BloockClient {
    anchor_service: AnchorService<HttpClient>,
    config_service: ConfigService,
    record_service: RecordService<HttpClient>,
    proof_service: ProofService<HttpClient>,
    http_client: Arc<HttpClient>,
}

impl BloockClient {
    pub fn set_api_host(&self, host: String) -> BloockResult<()> {
        self.config_service.set_api_host(host)
    }

    pub fn set_network_configuration(
        &self,
        network: Network,
        config: NetworkConfiguration,
    ) -> BloockResult<()> {
        self.config_service.set_network_config(network, config)
    }

    pub async fn send_records(&self, records: Vec<Record>) -> BloockResult<Vec<RecordReceipt>> {
        self.record_service.send_records(records).await
    }

    pub async fn get_records(&self, records: Vec<Record>) -> BloockResult<Vec<RecordReceipt>> {
        self.record_service.get_records(records).await
    }

    pub async fn get_anchor(&self, anchor_id: i64) -> BloockResult<Anchor> {
        self.anchor_service.get_anchor(anchor_id).await
    }

    pub async fn wait_anchor(&self, anchor_id: i64, timeout: i64) -> BloockResult<Anchor> {
        self.anchor_service.wait_anchor(anchor_id, timeout).await
    }
}

pub fn configure(api_key: String) -> BloockClient {
    let http_client = Arc::new(HttpClient::new(api_key));
    let config_data = Arc::new(Mutex::new(ConfigData::new()));

    return BloockClient {
        anchor_service: anchor::configure(Arc::clone(&http_client), Arc::clone(&config_data)),
        config_service: config::configure(Arc::clone(&config_data)),
        record_service: record::configure(Arc::clone(&http_client), Arc::clone(&config_data)),
        proof_service: proof::configure(Arc::clone(&http_client)),
        http_client: Arc::clone(&http_client),
    };
}
