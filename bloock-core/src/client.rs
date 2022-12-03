use crate::anchor::entity::anchor::Anchor;
use crate::anchor::service::AnchorService;
use crate::config::config_data::ConfigData;
use crate::config::entity::network::Network;
use crate::error::BloockResult;
use crate::event::entity::event::Event;
use crate::proof::entity::proof::Proof;
use crate::proof::service::ProofService;
use crate::record;
use crate::record::entity::record::Record;
use crate::record::entity::record_receipt::RecordReceipt;
use crate::record::service::RecordService;
use crate::{anchor, event::service::EventService};
use crate::{event, proof};
use bloock_http::{BloockHttpClient, SimpleHttpClient};
use serde_json::Value;
use std::sync::Arc;

pub struct BloockClient {
    anchor_service: AnchorService<BloockHttpClient>,
    record_service: RecordService<BloockHttpClient>,
    proof_service: ProofService<BloockHttpClient>,
    event_service: EventService<SimpleHttpClient>,
}

impl BloockClient {
    pub async fn send_records(&self, records: Vec<Record>) -> BloockResult<Vec<RecordReceipt>> {
        self.record_service.send_records(records).await
    }

    pub async fn get_anchor(&self, anchor_id: i64) -> BloockResult<Anchor> {
        self.anchor_service.get_anchor(anchor_id).await
    }

    pub async fn wait_anchor(&self, anchor_id: i64, timeout: i64) -> BloockResult<Anchor> {
        self.anchor_service.wait_anchor(anchor_id, timeout).await
    }

    pub async fn get_proof(&self, records: Vec<Record>) -> BloockResult<Proof> {
        self.proof_service.get_proof(records).await
    }

    pub async fn validate_root(&self, root: Record, network: Network) -> BloockResult<u128> {
        self.proof_service.validate_root(root, network).await
    }

    pub fn verify_proof(&self, proof: Proof) -> BloockResult<Record> {
        self.proof_service.verify_proof(proof)
    }

    pub async fn verify_records(
        &self,
        records: Vec<Record>,
        network: Option<Network>,
    ) -> BloockResult<u128> {
        self.proof_service.verify_records(records, network).await
    }

    pub async fn send_event(&self, name: &str, error: Option<String>, attr: Option<Value>) -> () {
        let event = Event::new(name, error.is_none(), attr);
        let _ = self.event_service.send_event(event).await;
    }
}

pub fn configure(config_data: ConfigData) -> BloockClient {
    let bloock_http_client = Arc::new(BloockHttpClient::new(config_data.get_config().api_key));
    let simple_http_client = Arc::new(SimpleHttpClient::new());
    let config_data = Arc::new(config_data);

    BloockClient {
        anchor_service: anchor::configure(
            Arc::clone(&bloock_http_client),
            Arc::clone(&config_data),
        ),
        record_service: record::configure(
            Arc::clone(&bloock_http_client),
            Arc::clone(&config_data),
        ),
        proof_service: proof::configure(Arc::clone(&bloock_http_client), Arc::clone(&config_data)),
        event_service: event::configure(Arc::clone(&simple_http_client), Arc::clone(&config_data)),
    }
}
