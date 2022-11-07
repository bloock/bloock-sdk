use super::{entity::publish_hosted_response::PublishHostedResponse, PublishError};
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
            "{}/hosting/v1/upload",
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
            "{}/hosting/v1/{}",
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

    // #[tokio::test]
    // async fn hosted_publish_file() {
    //     let payload: Vec<u8> = vec![1, 2, 3, 4, 5];
    //     let response = PublishHostedResponse {
    //         hash: "a hash".to_owned(),
    //     };

    //     let mut http = MockClient::default();
    //     http.expect_post_file::<String, PublishHostedResponse>()
    //         .with(
    //             eq("https://api.bloock.com/hosting/v1/upload".to_owned()),
    //             eq(vec![("payload".to_owned(), payload.to_vec())]),
    //             eq(None),
    //         )
    //         .return_once(|_, _, _| Ok(response));

    //     let service = configure_test(Arc::new(http));
    //     let result = service.publish_hosted(&payload).await.unwrap();

    //     assert_eq!(
    //         &result, "c5a2180e2f97506550f1bba5d863bc6ed05ad8b51daf6fca1ac7d396ef3183c5",
    //         "Should not return an empty result"
    //     )
    // }

    // #[tokio::test]
    // async fn hosted_retrieve_file() {
    //     let payload = [1, 2, 3, 4, 5];
    //     let hash = "c5a2180e2f97506550f1bba5d863bc6ed05ad8b51daf6fca1ac7d396ef3183c5";

    //     let mut http = MockClient::default();
    //     http.expect_get::<String>()
    //         .with(
    //             eq(format!("https://api.bloock.com/hosting/v1/{}", hash)),
    //             eq(None),
    //         )
    //         .return_once(|_, _| Ok(payload.to_vec()));

    //     let service = configure_test(Arc::new(http));
    //     let result = service
    //         .retrieve("c5a2180e2f97506550f1bba5d863bc6ed05ad8b51daf6fca1ac7d396ef3183c5".to_owned())
    //         .await
    //         .unwrap();

    //     assert_eq!(
    //         payload,
    //         result.as_slice(),
    //         "Retrieved payload should match expected"
    //     )
    // }
}
