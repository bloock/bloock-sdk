use std::{
    error, thread,
    time::{Duration, SystemTime},
};

use crate::{anchor::repository::AnchorRepository, config::service::ConfigService};

#[cfg(test)]
use mockall::automock;

use super::{entity::anchor::Anchor, AnchorError};

#[cfg_attr(test, automock)]
pub trait AnchorService {
    fn get_anchor(&self, anchor_id: i32) -> Result<Anchor, Box<dyn error::Error>>;
    fn wait_anchor(&self, anchor_id: i32, timeout: u64) -> Result<Anchor, Box<dyn error::Error>>;
}

pub struct AnchorServiceImpl<A: AnchorRepository, C: ConfigService> {
    pub anchor_repository: A,
    pub config_service: C,
}

impl<A, C> AnchorService for AnchorServiceImpl<A, C>
where
    A: AnchorRepository,
    C: ConfigService,
{
    fn get_anchor(&self, anchor_id: i32) -> Result<Anchor, Box<dyn error::Error>> {
        self.anchor_repository.get_anchor(anchor_id)
    }

    fn wait_anchor(&self, anchor_id: i32, timeout: u64) -> Result<Anchor, Box<dyn error::Error>> {
        let config = match self.config_service.get_config() {
            Ok(config) => config,
            Err(e) => return Err(e).map_err(|e| e.into()),
        };

        let mut attempts = 0;
        let start = SystemTime::now();
        let mut next_try =
            start + Duration::from_millis(config.wait_message_interval_default as u64);

        let timeout_time = start + Duration::from_millis(timeout);

        loop {
            if let Ok(anchor) = self.anchor_repository.get_anchor(anchor_id) {
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
    use crate::{
        anchor::{self, entity::anchor::Anchor, AnchorError},
        config::{self, entity::config::Configuration},
        infrastructure::InfrastructureError,
    };

    use super::{AnchorService, AnchorServiceImpl};

    #[test]
    fn test_get_anchor() {
        let anchor_id = 1;
        let anchor = Anchor {
            id: anchor_id,
            block_roots: vec![String::from("block_root")],
            networks: vec![],
            root: String::from("root"),
            status: String::from("Success"),
        };

        let expected_anchor = anchor.clone();

        let config_service_mock = config::configure_service_test();
        let mut anchor_repo_mock = anchor::configure_repository_test();

        anchor_repo_mock
            .expect_get_anchor()
            .return_once(|_| Ok(anchor));

        let anchor_service = AnchorServiceImpl {
            anchor_repository: anchor_repo_mock,
            config_service: config_service_mock,
        };

        match anchor_service.get_anchor(anchor_id) {
            Ok(anchor) => assert_eq!(anchor, expected_anchor),
            Err(e) => panic!("{}", e),
        };
    }

    #[test]
    fn test_wait_anchor_first_try() {
        test_wait_anchor(0);
    }

    #[test]
    fn test_wait_anchor_after_3_retries() {
        test_wait_anchor(3);
    }

    #[test]
    fn test_wait_anchor_timeout() {
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

        let mut anchor_repo_mock = anchor::configure_repository_test();
        anchor_repo_mock.expect_get_anchor().returning(move |_| {
            if retry_counter < max_retries {
                retry_counter += 1;
                return Err(InfrastructureError::HttpClientApiError(String::from(
                    "Anchor not ready yet",
                )))
                .map_err(|e| e.into());
            }
            Ok(anchor.clone())
        });

        let mut config_service_mock = config::configure_service_test();
        config_service_mock.expect_get_config().return_const(Ok(config));

        let anchor_service = AnchorServiceImpl {
            anchor_repository: anchor_repo_mock,
            config_service: config_service_mock,
        };

        match anchor_service.wait_anchor(anchor_id, 1) {
            Ok(_) => panic!("Wait anchor should've timed out"),
            Err(e) => assert_eq!(e.to_string(), AnchorError::AnchorTimeout().to_string()),
        }
    }

    fn test_wait_anchor(max_retries: usize) {
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

        let mut config_service_mock = config::configure_service_test();
        config_service_mock.expect_get_config().return_const(Ok(config));

        let mut anchor_repo_mock = anchor::configure_repository_test();
        anchor_repo_mock
            .expect_get_anchor()
            .times(max_retries + 1)
            .returning(move |_| {
                if retry_counter < max_retries {
                    retry_counter += 1;
                    return Err(InfrastructureError::HttpClientApiError(String::from(
                        "Anchor not ready yet",
                    ))).map_err(|e| e.into());
                }
                Ok(anchor.clone())
            });

        let anchor_service = AnchorServiceImpl {
            anchor_repository: anchor_repo_mock,
            config_service: config_service_mock,
        };

        match anchor_service.wait_anchor(anchor_id, 5000) {
            Ok(anchor) => assert_eq!(anchor, expected_anchor),
            Err(e) => panic!("{}", e),
        }
    }
}
