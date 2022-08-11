use bloock_http::Client;
use bloock_http::HttpError;
use std::sync::Arc;

use crate::{
    config::service::ConfigService,
    error::{BloockResult, InfrastructureError},
};

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

        let url = format!("{}/core/messages", self.config_service.get_api_base_url());

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
}

#[cfg(test)]
mod tests {
    use std::sync::Arc;

    use bloock_http::MockClient;

    use crate::record::{
        configure_test,
        entity::{
            dto::{
                record_write_request::RecordWriteRequest,
                record_write_response::RecordWriteResponse,
            },
            record::Record,
        },
        RecordError,
    };

    #[tokio::test]
    async fn test_send_records_ok() {
        let response = RecordWriteResponse {
            anchor: 80,
            client: "ce10c769-022b-405e-8e7c-3b52eeb2a4ea".to_string(),
            messages: Vec::from([
                "02aae7e86eb50f61a62083a320475d9d60cbd52749dbf08fa942b1b97f50aee5".to_string(),
            ]),
            status: "Pending".to_string(),
        };

        let expected = response.clone();

        let mut http = MockClient::default();
        http.expect_post::<String, RecordWriteRequest, RecordWriteResponse>()
            .return_once(|_, _, _| Ok(response));

        let record_service = configure_test(Arc::new(http));
        let result = record_service
            .send_records(Vec::from([Record::from_hash(
                "02aae7e86eb50f61a62083a320475d9d60cbd52749dbf08fa942b1b97f50aee5",
            )]))
            .await
            .unwrap();

        assert_eq!(result[0].anchor, expected.anchor);
        assert_eq!(result[0].client, expected.client);
        assert_eq!(
            result[0].record,
            "02aae7e86eb50f61a62083a320475d9d60cbd52749dbf08fa942b1b97f50aee5"
        );
        assert_eq!(result[0].status, expected.status);
    }

    #[tokio::test]
    async fn test_send_records_invalid_record() {
        let response = RecordWriteResponse {
            anchor: 80,
            client: "ce10c769-022b-405e-8e7c-3b52eeb2a4ea".to_string(),
            messages: Vec::from([
                "02aae7e86eb50f61a62083a320475d9d60cbd52749dbf08fa942b1b97f50aee5".to_string(),
            ]),
            status: "Pending".to_string(),
        };

        let mut http = MockClient::default();
        http.expect_post::<String, RecordWriteRequest, RecordWriteResponse>()
            .return_once(|_, _, _| Ok(response));

        let record_service = configure_test(Arc::new(http));
        let result = record_service
            .send_records(Vec::from([Record::from_hash("record")]))
            .await;

        assert!(result.is_err());
        assert_eq!(result, Err(RecordError::InvalidRecord().into()));
    }
}
