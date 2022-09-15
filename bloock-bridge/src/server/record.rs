use async_trait::async_trait;
use bloock_core::{client, error::BloockError, record::entity::record::Record as RecordCore};

use super::response_types::ResponseType;
use crate::{
    entity_mappings::config::map_config,
    error::{config_data_error, BridgeError},
    items::{
        Error, Record, RecordBuilderResponse, RecordHash, RecordServiceHandler, SendRecordsResponse,
    },
};

impl From<SendRecordsResponse> for ResponseType {
    fn from(res: SendRecordsResponse) -> Self {
        ResponseType::SendRecords(res)
    }
}

impl From<Record> for ResponseType {
    fn from(res: Record) -> Self {
        ResponseType::Record(res)
    }
}

/*impl From<FromHexResponse> for ResponseType {
    fn from(res: FromHexResponse) -> Self {
        ResponseType::RecordFromHex(res)
    }
}*/

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

        let records = match req
            .records
            .iter()
            .map(|record| record.try_into())
            .collect::<Result<Vec<RecordCore>, BloockError>>()
        {
            Ok(r) => r,
            Err(e) => {
                return SendRecordsResponse {
                    records: vec![],
                    error: Some(Error {
                        kind: BridgeError::RecordError.to_string(),
                        message: e.to_string(),
                    }),
                }
            }
        };
        let receipts = match client.send_records(records).await {
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
                .map(|receipt| receipt.clone().into())
                .collect(),
            error: None,
        }
    }

    async fn get_hash(&self, _req: Record) -> RecordHash {
        RecordHash {
            hash: "".to_string(),
            error: None,
        }
    }

    async fn build_record(
        &self,
        _req: crate::items::RecordBuilderRequest,
    ) -> RecordBuilderResponse {
        RecordBuilderResponse {
            record: None,
            error: Some(Error {
                kind: BridgeError::RecordError.to_string(),
                message: "not implemented".to_string(),
            }),
        }
    }
}
