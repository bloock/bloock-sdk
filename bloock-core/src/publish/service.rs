use super::{
    entity::{
        publish_hosted_response::PublishHostedResponse, publish_ipfs_response::PublishIpfsResponse,
    },
    PublishError,
};
use crate::{config::service::ConfigService, error::BloockResult, record::entity::record::Record};
use bloock_http::Client;
use std::sync::Arc;

pub struct PublishService<H: Client> {
    pub http: Arc<H>,
    pub config_service: ConfigService,
}

impl<H: Client> PublishService<H> {
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
                None,
            )
            .await
            .map_err(|e| PublishError::PublishError(e.to_string()))?;
        Ok(response.hash)
    }

    pub async fn retrieve_hosted(&self, hash: String) -> BloockResult<Vec<u8>> {
        let url = format!(
            "{}/hosting/v1/hosted/{}",
            self.config_service.get_api_base_url(),
            hash
        );

        self.http
            .get(url, None)
            .await
            .map_err(|e| PublishError::PublishError(e.to_string()).into())
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
                None,
            )
            .await
            .map_err(|e| PublishError::PublishError(e.to_string()))?;
        Ok(response.hash)
    }

    pub async fn retrieve_ipfs(&self, hash: String) -> BloockResult<Vec<u8>> {
        let url = format!(
            "{}/hosting/v1/ipfs/{}",
            self.config_service.get_api_base_url(),
            hash
        );

        self.http
            .get(url, None)
            .await
            .map_err(|e| PublishError::PublishError(e.to_string()).into())
    }
}

#[cfg(test)]
mod tests {
    use bloock_http::MockClient;
    use mockall::predicate::eq;
    use std::sync::Arc;

    use crate::publish::entity::publish_ipfs_response::PublishIpfsResponse;
    use crate::publish::{self, entity::publish_hosted_response::PublishHostedResponse};
    use crate::record::document::Document;
    use crate::record::entity::record::Record;

    #[tokio::test]
    async fn hosted_publish_file() {
        let payload: Vec<u8> = vec![1, 2, 3, 4, 5];
        let response = PublishHostedResponse {
            hash: "c5a2180e2f97506550f1bba5d863bc6ed05ad8b51daf6fca1ac7d396ef3183c5".to_owned(),
        };

        let mut http = MockClient::default();
        http.expect_post_file::<String, PublishHostedResponse>()
            .with(
                eq("https://api.bloock.com/hosting/v1/hosted/upload".to_owned()),
                eq(vec![("payload".to_owned(), payload.to_vec())]),
                eq(None),
            )
            .return_once(|_, _, _| Ok(response));

        let service = publish::configure_test(Arc::new(http));

        let record = Record::new(Document::new(&payload).unwrap());

        let result = service.publish_hosted(record.unwrap()).await.unwrap();

        assert_eq!(
            &result, "c5a2180e2f97506550f1bba5d863bc6ed05ad8b51daf6fca1ac7d396ef3183c5",
            "Should not return an empty result"
        )
    }

    #[tokio::test]
    async fn hosted_retrieve_file() {
        let payload = [1, 2, 3, 4, 5];
        let hash = "c5a2180e2f97506550f1bba5d863bc6ed05ad8b51daf6fca1ac7d396ef3183c5";

        let mut http = MockClient::default();
        http.expect_get::<String>()
            .with(
                eq(format!("https://api.bloock.com/hosting/v1/hosted/{hash}")),
                eq(None),
            )
            .return_once(move |_, _| Ok(payload.to_vec()));

        let service = publish::configure_test(Arc::new(http));
        let result = service
            .retrieve_hosted(
                "c5a2180e2f97506550f1bba5d863bc6ed05ad8b51daf6fca1ac7d396ef3183c5".to_owned(),
            )
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
            hash: "c5a2180e2f97506550f1bba5d863bc6ed05ad8b51daf6fca1ac7d396ef3183c5".to_owned(),
        };

        let mut http = MockClient::default();
        http.expect_post_file::<String, PublishIpfsResponse>()
            .with(
                eq("https://api.bloock.com/hosting/v1/ipfs/upload".to_owned()),
                eq(vec![("payload".to_owned(), payload.to_vec())]),
                eq(None),
            )
            .return_once(|_, _, _| Ok(response));

        let service = publish::configure_test(Arc::new(http));

        let record = Record::new(Document::new(&payload).unwrap());

        let result = service.publish_ipfs(record.unwrap()).await.unwrap();

        assert_eq!(
            &result, "c5a2180e2f97506550f1bba5d863bc6ed05ad8b51daf6fca1ac7d396ef3183c5",
            "Should not return an empty result"
        )
    }

    #[tokio::test]
    async fn ipfs_retrieve_file() {
        let payload = [1, 2, 3, 4, 5];
        let hash = "c5a2180e2f97506550f1bba5d863bc6ed05ad8b51daf6fca1ac7d396ef3183c5";

        let mut http = MockClient::default();
        http.expect_get::<String>()
            .with(
                eq(format!("https://api.bloock.com/hosting/v1/ipfs/{hash}")),
                eq(None),
            )
            .return_once(move |_, _| Ok(payload.to_vec()));

        let service = publish::configure_test(Arc::new(http));
        let result = service
            .retrieve_ipfs(
                "c5a2180e2f97506550f1bba5d863bc6ed05ad8b51daf6fca1ac7d396ef3183c5".to_owned(),
            )
            .await
            .unwrap();

        assert_eq!(
            payload,
            result.as_slice(),
            "Retrieved payload should match expected"
        )
    }
}
