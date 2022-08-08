use super::{entity::anchor::Anchor, AnchorError};
use crate::config::service::ConfigService;
use crate::error::BloockResult;
use crate::error::InfrastructureError;
use bloock_http::Client;
use std::sync::Arc;
use std::{
    thread,
    time::{Duration, SystemTime},
};

pub struct AnchorService<H: Client> {
    pub http: Arc<H>,
    pub config_service: ConfigService,
}

impl<H: Client> AnchorService<H> {
    pub async fn get_anchor(&self, anchor_id: i64) -> BloockResult<Anchor> {
        let base_url = self.config_service.get_api_base_url();
        let url = format!("{}/core/anchor/{}", base_url, anchor_id);
        match self.http.get::<String, Anchor>(url, None).await {
            Ok(res) => Ok(res),
            Err(e) => Err(e).map_err(|e| InfrastructureError::Http(e).into()),
        }
    }

    pub async fn wait_anchor(&self, anchor_id: i64, timeout: i64) -> BloockResult<Anchor> {
        let config = self.config_service.get_config();

        let mut attempts = 0;
        let start = SystemTime::now();
        let mut next_try =
            start + Duration::from_millis(config.wait_message_interval_default as u64);

        let timeout_time = start + Duration::from_millis(timeout as u64);

        loop {
            if let Ok(anchor) = self.get_anchor(anchor_id).await {
                if anchor.status == "Success" {
                    return Ok(anchor);
                }
            }
            let mut current_time = SystemTime::now();
            if current_time > timeout_time {
                return Err(AnchorError::AnchorTimeout()).map_err(|e| e.into());
            }

            thread::sleep(Duration::from_millis(1000));

            current_time = SystemTime::now();
            while current_time < next_try && current_time < timeout_time {
                thread::sleep(Duration::from_millis(200));
                current_time = SystemTime::now();
            }

            if current_time >= timeout_time {
                return Err(AnchorError::AnchorTimeout()).map_err(|e| e.into());
            }

            next_try += Duration::from_millis(
                (attempts * config.wait_message_interval_factor
                    + config.wait_message_interval_default) as u64,
            );
            attempts += 1;
        }
    }
}

#[cfg(test)]
mod test {
    use std::sync::Arc;

    use bloock_http::{HttpError, MockClient};

    use crate::{
        anchor::{self, entity::anchor::Anchor, AnchorError},
        config::entity::config::Configuration,
        error::ErrorKind,
    };

    #[tokio::test]
    async fn test_get_anchor() {
        let anchor_id = 1;
        let anchor = Anchor {
            id: anchor_id,
            block_roots: vec![String::from("block_root")],
            networks: vec![],
            root: String::from("root"),
            status: String::from("Success"),
        };

        let expected_anchor = anchor.clone();

        let mut http = MockClient::default();
        http.expect_get::<String, Anchor>()
            .return_once(|_, _| Ok(anchor));

        let anchor_service = anchor::configure_test(Arc::new(http));

        match anchor_service.get_anchor(anchor_id).await {
            Ok(anchor) => assert_eq!(anchor, expected_anchor),
            Err(e) => panic!("{}", e),
        };
    }

    #[tokio::test]
    async fn test_wait_anchor_first_try() {
        test_wait_anchor(0).await;
    }

    #[tokio::test]
    async fn test_wait_anchor_after_3_retries() {
        test_wait_anchor(3).await;
    }

    #[tokio::test]
    async fn test_wait_anchor_timeout() {
        let mut config = Configuration::default();
        config.wait_message_interval_default = 10;
        config.wait_message_interval_factor = 0;

        let anchor_id = 1;
        let anchor = Anchor {
            id: anchor_id,
            block_roots: vec![String::from("block_root")],
            networks: vec![],
            root: String::from("root"),
            status: String::from("Success"),
        };

        let mut retry_counter = 0;
        let max_retries = 3;

        let mut http = MockClient::default();
        http.expect_get::<String, Anchor>().returning(move |_, _| {
            if retry_counter < max_retries {
                retry_counter += 1;
                return Err(HttpError::RequestError(String::from(
                    "Anchor not ready yet",
                )));
            }
            Ok(anchor.clone())
        });

        let anchor_service = anchor::configure_test(Arc::new(http));

        match anchor_service.wait_anchor(anchor_id, 1).await {
            Ok(_) => panic!("Wait anchor should've timed out"),
            Err(e) => assert_eq!(
                e.to_string(),
                ErrorKind::Anchor(AnchorError::AnchorTimeout()).to_string()
            ),
        }
    }

    async fn test_wait_anchor(max_retries: usize) {
        let anchor_id = 1;
        let anchor = Anchor {
            id: anchor_id,
            block_roots: vec![String::from("block_root")],
            networks: vec![],
            root: String::from("root"),
            status: String::from("Success"),
        };

        let expected_anchor = anchor.clone();

        let mut retry_counter = 0;

        let mut config = Configuration::default();
        config.wait_message_interval_default = 1;
        config.wait_message_interval_factor = 0;

        let mut http = MockClient::default();
        http.expect_get::<String, Anchor>()
            .times(max_retries + 1)
            .returning(move |_, _| {
                if retry_counter < max_retries {
                    retry_counter += 1;
                    return Err(HttpError::RequestError(String::from(
                        "Anchor not ready yet",
                    )));
                }
                Ok(anchor.clone())
            });

        let anchor_service = anchor::configure_test(Arc::new(http));

        match anchor_service.wait_anchor(anchor_id, 50000).await {
            Ok(anchor) => assert_eq!(anchor, expected_anchor),
            Err(e) => panic!("{}", e),
        }
    }
}
