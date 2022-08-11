use async_trait::async_trait;
use bloock_core::client;

use super::response_types::ResponseType;
use crate::{
    entity_mappings::{
        config::map_config,
        record::{map_record, map_record_receipt},
    },
    error::BridgeError,
    items::{Error, RecordServiceHandler, SendRecordsResponse},
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
        let config_data = match req.config_data {
            Some(config) => match map_config(config) {
                Ok(config) => config,
                Err(_) => {
                    return SendRecordsResponse {
                        records: vec![],
                        error: Some(Error {
                            kind: BridgeError::InvalidArgument.to_string(),
                            message: "Invalid config data".to_string(),
                        }),
                    }
                }
            },
            None => {
                return SendRecordsResponse {
                    records: vec![],
                    error: Some(Error {
                        kind: BridgeError::InvalidArgument.to_string(),
                        message: "Invalid config data".to_string(),
                    }),
                }
            }
        };

        let client = client::configure(config_data);
        let receipts = client
            .send_records(
                req.records
                    .iter()
                    .map(|record| map_record(record.clone()))
                    .collect(),
            )
            .await
            .unwrap();

        SendRecordsResponse {
            records: receipts
                .iter()
                .map(|receipt| map_record_receipt(receipt.clone()))
                .collect(),
            error: None,
        }
    }
}
