use async_trait::async_trait;
use bloock_core::client;

use super::response_types::ResponseType;
use crate::{
    entity_mappings::config::map_config,
    error::config_data_error,
    items::{RecordServiceHandler, SendRecordsResponse},
};

impl From<SendRecordsResponse> for ResponseType {
    fn from(res: SendRecordsResponse) -> Self {
        ResponseType::SendRecords(res)
    }
}

pub struct RecordServer {}

#[async_trait(?Send)]
impl RecordServiceHandler for RecordServer {
    async fn send_records(&self, req: crate::items::SendRecordsRequest) -> SendRecordsResponse {
        let config_data = match map_config(req.config_data) {
            Ok(config) => config,
            Err(_) => {
                return SendRecordsResponse {
                    records: vec![],
                    error: Some(config_data_error()),
                }
            }
        };

        let client = client::configure(config_data);
        let receipts = client
            .send_records(
                req.records
                    .iter()
                    .map(|record| record.clone().into())
                    .collect(),
            )
            .await
            .unwrap();

        SendRecordsResponse {
            records: receipts
                .iter()
                .map(|receipt| receipt.clone().into())
                .collect(),
            error: None,
        }
    }
}
