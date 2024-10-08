use super::{
    entity::{
        publish_hosted_response::PublishHostedResponse, publish_ipfs_response::PublishIpfsResponse, publish_ipns_response::PublishIpnsResponse,
    },
    AvailabilityError,
};
use crate::{config::service::ConfigService, error::BloockResult, record::entity::record::Record};
use bloock_http::Client;
use std::sync::Arc;

pub struct AvailabilityService<H: Client> {
    pub http: Arc<H>,
    pub config_service: ConfigService,
}

impl<H: Client> AvailabilityService<H> {
    pub async fn publish_hosted(&self, record: Record) -> BloockResult<String> {
        let url = format!(
            "{}/hosting/v1/hosted/upload",
            self.config_service.get_api_base_url()
        );

        let response: PublishHostedResponse = self
            .http
            .post_file(
                url,
                vec![("payload".to_owned(), record.serialize()?.to_vec())],
                vec![],
                None,
                None,
            )
            .await
            .map_err(|e| AvailabilityError::PublishError(e.to_string()))?;
        Ok(response.id)
    }

    pub async fn retrieve_hosted(&self, id: String) -> BloockResult<Vec<u8>> {
        let url = format!(
            "{}/hosting/v1/hosted/{}",
            self.config_service.get_cdn_base_url(),
            id
        );

        self.http
            .get(url, None)
            .await
            .map_err(|e| AvailabilityError::RetrieveError(e.to_string()).into())
    }

    pub async fn publish_ipfs(&self, record: Record) -> BloockResult<String> {
        let url = format!(
            "{}/hosting/v1/ipfs/upload",
            self.config_service.get_api_base_url()
        );

        let response: PublishIpfsResponse = self
            .http
            .post_file(
                url,
                vec![("payload".to_owned(), record.serialize()?.to_vec())],
                vec![],
                None,
                None,
            )
            .await
            .map_err(|e| AvailabilityError::PublishError(e.to_string()))?;
        Ok(response.id)
    }

    pub async fn retrieve_ipfs(&self, id: String) -> BloockResult<Vec<u8>> {
        let url = format!(
            "{}/hosting/v1/ipfs/{}",
            self.config_service.get_cdn_base_url(),
            id
        );

        self.http
            .get(url, None)
            .await
            .map_err(|e| AvailabilityError::RetrieveError(e.to_string()).into())
    }

    pub async fn publish_ipns(&self, record: Record, key_id: Option<String>) -> BloockResult<(String, String)> {
        let mut url = format!(
            "{}/hosting/v1/ipns/upload",
            self.config_service.get_api_base_url(),
        );

        if key_id.is_some() {
            url.push_str(&format!("?key={}", key_id.unwrap()));
        }

        let response: PublishIpnsResponse = self
            .http
            .post_file(
                url,
                vec![("payload".to_owned(), record.serialize()?.to_vec())],
                vec![],
                None,
                None,
            )
            .await
            .map_err(|e| AvailabilityError::PublishError(e.to_string()))?;
        Ok((response.id, response.key_id))
    }

    pub async fn retrieve_ipns(&self, id: String) -> BloockResult<Vec<u8>> {
        let url = format!(
            "{}/hosting/v1/ipns/{}",
            self.config_service.get_cdn_base_url(),
            id
        );

        self.http
            .get(url, None)
            .await
            .map_err(|e| AvailabilityError::RetrieveError(e.to_string()).into())
    }
}

#[cfg(test)]
mod tests {
    use bloock_http::MockClient;
    use mockall::predicate::eq;
    use std::sync::Arc;

    use crate::availability::entity::publish_ipfs_response::PublishIpfsResponse;
    use crate::availability::entity::publish_ipns_response::PublishIpnsResponse;
    use crate::availability::{self, entity::publish_hosted_response::PublishHostedResponse};
    use crate::record::document::Document;
    use crate::record::entity::record::Record;

    #[tokio::test]
    async fn hosted_publish_file() {
        let payload: Vec<u8> = vec![1, 2, 3, 4, 5];
        let response = PublishHostedResponse {
            id: "b012eaf2-e2ed-4196-8a68-172238852a5f".to_owned(),
        };

        let mut http = MockClient::default();
        http.expect_post_file::<String, PublishHostedResponse>()
            .with(
                eq("https://api.bloock.com/hosting/v1/hosted/upload".to_owned()),
                eq(vec![("payload".to_owned(), payload.to_vec())]),
                eq(vec![]),
                eq(None),
                eq(None),
            )
            .return_once(|_, _, _, _, _| Ok(response));

        let service = availability::configure_test(Arc::new(http));

        let record = Record::new(
            Document::new(
                &payload,
                service.config_service.get_api_base_url(),
                service.config_service.get_api_key(),
            )
            .unwrap(),
        );

        let result = service.publish_hosted(record.unwrap()).await.unwrap();

        assert_eq!(
            &result, "b012eaf2-e2ed-4196-8a68-172238852a5f",
            "Should not return an empty result"
        )
    }

    #[tokio::test]
    async fn hosted_retrieve_file() {
        let payload = [1, 2, 3, 4, 5];
        let id = "b012eaf2-e2ed-4196-8a68-172238852a5f";

        let mut http = MockClient::default();
        http.expect_get::<String>()
            .with(
                eq(format!("https://cdn.bloock.com/hosting/v1/hosted/{id}")),
                eq(None),
            )
            .return_once(move |_, _| Ok(payload.to_vec()));

        let service = availability::configure_test(Arc::new(http));
        let result = service
            .retrieve_hosted("b012eaf2-e2ed-4196-8a68-172238852a5f".to_owned())
            .await
            .unwrap();

        assert_eq!(
            payload,
            result.as_slice(),
            "Retrieved payload should match expected"
        )
    }

    #[tokio::test]
    async fn ipfs_publish_file() {
        let payload: Vec<u8> = vec![1, 2, 3, 4, 5];
        let response = PublishIpfsResponse {
            id: "b012eaf2-e2ed-4196-8a68-172238852a5f".to_owned(),
        };

        let mut http = MockClient::default();
        http.expect_post_file::<String, PublishIpfsResponse>()
            .with(
                eq("https://api.bloock.com/hosting/v1/ipfs/upload".to_owned()),
                eq(vec![("payload".to_owned(), payload.to_vec())]),
                eq(vec![]),
                eq(None),
                eq(None),
            )
            .return_once(|_, _, _, _, _| Ok(response));

        let service = availability::configure_test(Arc::new(http));

        let record = Record::new(
            Document::new(
                &payload,
                service.config_service.get_api_base_url(),
                service.config_service.get_api_key(),
            )
            .unwrap(),
        );

        let result = service.publish_ipfs(record.unwrap()).await.unwrap();

        assert_eq!(
            &result, "b012eaf2-e2ed-4196-8a68-172238852a5f",
            "Should not return an empty result"
        )
    }

    #[tokio::test]
    async fn ipfs_retrieve_file() {
        let payload = [1, 2, 3, 4, 5];
        let id = "b012eaf2-e2ed-4196-8a68-172238852a5f";

        let mut http = MockClient::default();
        http.expect_get::<String>()
            .with(
                eq(format!("https://cdn.bloock.com/hosting/v1/ipfs/{id}")),
                eq(None),
            )
            .return_once(move |_, _| Ok(payload.to_vec()));

        let service = availability::configure_test(Arc::new(http));
        let result = service
            .retrieve_ipfs("b012eaf2-e2ed-4196-8a68-172238852a5f".to_owned())
            .await
            .unwrap();

        assert_eq!(
            payload,
            result.as_slice(),
            "Retrieved payload should match expected"
        )
    }

    #[tokio::test]
    async fn ipns_publish_file() {
        let payload: Vec<u8> = vec![1, 2, 3, 4, 5];
        let key_id: String = "b012eaf2-e2ed-4196-8a68-172238852a5f".to_owned();
        let response = PublishIpnsResponse {
            id: "bafzbeigkhrj52va6uud2eeavfnfsr7zgo6sf7wg6bq76iqf37c274q2dy4".to_owned(),
            key_id: key_id.clone(),
        };

        let mut http = MockClient::default();
        let url = format!("https://api.bloock.com/hosting/v1/ipns/upload?key={}", key_id);
        http.expect_post_file::<String, PublishIpnsResponse>()
            .with(
                eq(url.to_owned()),
                eq(vec![("payload".to_owned(), payload.to_vec())]),
                eq(vec![]),
                eq(None),
                eq(None),
            )
            .return_once(|_, _, _, _, _| Ok(response));

        let service = availability::configure_test(Arc::new(http));

        let record = Record::new(
            Document::new(
                &payload,
                service.config_service.get_api_base_url(),
                service.config_service.get_api_key(),
            )
            .unwrap(),
        );

        let result = service.publish_ipns(record.unwrap(), Some(key_id)).await.unwrap();

        assert_eq!(
            &result.0, "bafzbeigkhrj52va6uud2eeavfnfsr7zgo6sf7wg6bq76iqf37c274q2dy4",
            "Retrieved ipns id should match expected"
        );
        assert_eq!(
            &result.1, "b012eaf2-e2ed-4196-8a68-172238852a5f",
            "Retrieved key id should match expected"
        )
    }

    #[tokio::test]
    async fn ipns_retrieve_file() {
        let payload = [1, 2, 3, 4, 5];
        let id = "bafzbeigkhrj52va6uud2eeavfnfsr7zgo6sf7wg6bq76iqf37c274q2dy4";

        let mut http = MockClient::default();
        http.expect_get::<String>()
            .with(
                eq(format!("https://cdn.bloock.com/hosting/v1/ipns/{id}")),
                eq(None),
            )
            .return_once(move |_, _| Ok(payload.to_vec()));

        let service = availability::configure_test(Arc::new(http));
        let result = service
            .retrieve_ipns("bafzbeigkhrj52va6uud2eeavfnfsr7zgo6sf7wg6bq76iqf37c274q2dy4".to_owned())
            .await
            .unwrap();

        assert_eq!(
            payload,
            result.as_slice(),
            "Retrieved payload should match expected"
        )
    }
}
