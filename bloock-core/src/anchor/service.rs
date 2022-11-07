use super::{entity::anchor::Anchor, AnchorError};
use crate::config::service::ConfigService;
use crate::error::BloockResult;
use crate::error::InfrastructureError;
use async_std::task;
use bloock_http::Client;
use std::sync::Arc;
use std::time::Duration;

pub struct AnchorService<H: Client> {
    pub http: Arc<H>,
    pub config_service: ConfigService,
}

impl<H: Client> AnchorService<H> {
    pub async fn get_anchor(&self, anchor_id: i64) -> BloockResult<Anchor> {
        let base_url = self.config_service.get_api_base_url();
        let url = format!("{}/core/anchor/{}", base_url, anchor_id);
        match self.http.get_json::<String, Anchor>(url, None).await {
            Ok(res) => Ok(res),
            Err(e) => Err(e).map_err(|e| InfrastructureError::Http(e).into()),
        }
    }

    pub async fn wait_anchor(&self, anchor_id: i64, mut timeout: i64) -> BloockResult<Anchor> {
        if timeout == 0 {
            timeout = 120000;
        }
        let config = self.config_service.get_config();

        let mut attempts = 0;
        let start = get_current_timestamp();
        let mut next_try = start + config.wait_message_interval_default;

        let timeout_time = start + timeout as u128;

        loop {
            if let Ok(anchor) = self.get_anchor(anchor_id).await {
                if anchor.status == "Success" {
                    return Ok(anchor);
                }
            }

            let mut current_time = get_current_timestamp();
            if current_time > timeout_time {
                return Err(AnchorError::AnchorTimeout()).map_err(|e| e.into());
            }

            task::sleep(Duration::from_millis(1000)).await;

            current_time = get_current_timestamp();
            while current_time < next_try && current_time < timeout_time {
                task::sleep(Duration::from_millis(200)).await;
                current_time = get_current_timestamp();
            }

            if current_time >= timeout_time {
                return Err(AnchorError::AnchorTimeout()).map_err(|e| e.into());
            }

            next_try += attempts * config.wait_message_interval_factor
                + config.wait_message_interval_default;
            attempts += 1;
        }
    }
}

#[cfg(any(target_arch = "wasm32", target_arch = "wasm64"))]
fn get_current_timestamp() -> u128 {
    (js_sys::Date::now()) as u128
}

#[cfg(not(any(target_arch = "wasm32", target_arch = "wasm64")))]
fn get_current_timestamp() -> u128 {
    use std::time::{SystemTime, UNIX_EPOCH};
    match SystemTime::now().duration_since(UNIX_EPOCH) {
        Ok(d) => d.as_millis(),
        Err(_) => 1,
    }
}

#[cfg(test)]
mod test {
    use std::sync::Arc;

    use bloock_http::{HttpError, MockClient};

    use crate::{
        anchor::{self, entity::anchor::Anchor, AnchorError},
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
        http.expect_get_json::<String, Anchor>()
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
    async fn test_wait_anchor_after_1_retries() {
        test_wait_anchor(1).await;
    }

    #[tokio::test]
    async fn test_wait_anchor_timeout() {
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
        http.expect_get_json::<String, Anchor>()
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

        let mut http = MockClient::default();
        http.expect_get_json::<String, Anchor>()
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
