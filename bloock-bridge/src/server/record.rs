use async_trait::async_trait;
use bloock_core::client;

use super::response_types::ResponseType;
use crate::{
    entity_mappings::{
        config::map_config,
        record::{map_record, map_record_receipt},
    },
    error::{config_data_error, BridgeError},
    items::{RecordServiceHandler, SendRecordsResponse, Error},
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
        let receipts = match client
            .send_records(
                req.records
                    .iter()
                    .map(|record| map_record(record.clone()))
                    .collect(),
            )
            .await
        {
            Ok(receipts) => receipts,
            Err(e) => {
                return SendRecordsResponse {
                    records: vec![],
                    error: Some(Error {
                        kind: BridgeError::RecordError.to_string(),
                        message: e.to_string(),
                    }),
                };
            }
        };

        SendRecordsResponse {
            records: receipts
                .iter()
                .map(|receipt| map_record_receipt(receipt.clone()))
                .collect(),
            error: None,
        }
    }
}
