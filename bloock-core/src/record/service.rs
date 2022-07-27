use bloock_http::Client;
use bloock_http::HttpError;
use std::sync::Arc;

use crate::{
    config::service::ConfigService,
    error::{BloockResult, InfrastructureError},
};

use super::entity::dto::record_retrieve_request::RecordRetrieveRequest;
use super::entity::dto::record_retrieve_response::RecordRetrieveResponse;
use super::{
    entity::{
        dto::{
            record_write_request::RecordWriteRequest, record_write_response::RecordWriteResponse,
        },
        record::Record,
        record_receipt::RecordReceipt,
    },
    RecordError,
};

pub struct RecordService<H: Client> {
    pub http: Arc<H>,
    pub config_service: ConfigService,
}

impl<H: Client> RecordService<H> {
    pub async fn send_records(&self, records: Vec<Record>) -> BloockResult<Vec<RecordReceipt>> {
        if records.is_empty() {
            return Ok(vec![]);
        }

        if records.iter().any(|record| !record.is_valid()) {
            return Err(RecordError::InvalidRecord().into());
        }

        let url = match self.config_service.get_api_base_url() {
            Ok(base_url) => format!("{}/core/messages", base_url),
            Err(e) => return Err(e).map_err(|e| e.into()),
        };

        let body = RecordWriteRequest {
            messages: records.iter().map(|record| record.get_hash()).collect(),
        };

        let response = match self
            .http
            .post::<String, RecordWriteRequest, RecordWriteResponse>(url, body, None)
            .await
        {
            Ok(res) => res,
            Err(e) => {
                return Err(
                    InfrastructureError::Http(HttpError::RequestError(e.to_string())).into(),
                )
            }
        };

        Ok(records
            .iter()
            .map(|record| RecordReceipt {
                anchor: response.anchor.clone(),
                client: response.client.clone(),
                record: record.get_hash(),
                status: response.status.clone(),
            })
            .collect())
    }

    pub async fn get_records(&self, records: Vec<Record>) -> BloockResult<Vec<RecordReceipt>> {
        if records.is_empty() {
            return Ok(vec![]);
        }

        if records.iter().any(|record| !record.is_valid()) {
            return Err(RecordError::InvalidRecord().into());
        }

        let url = match self.config_service.get_api_base_url() {
            Ok(base_url) => format!("{}/core/messages/fetch", base_url),
            Err(e) => return Err(e).map_err(|e| e.into()),
        };

        let body = RecordRetrieveRequest {
            messages: records.iter().map(|record| record.get_hash()).collect(),
        };

        let response = match self
            .http
            .post::<String, RecordRetrieveRequest, RecordRetrieveResponse>(url, body, None)
            .await
        {
            Ok(res) => res,
            Err(e) => {
                return Err(
                    InfrastructureError::Http(HttpError::RequestError(e.to_string())).into(),
                )
            }
        };

        Ok(records
            .iter()
            .map(|record| RecordReceipt {
                anchor: response.anchor.clone(),
                client: response.client.clone(),
                record: record.get_hash(),
                status: response.status.clone(),
            })
            .collect())
    }
}
