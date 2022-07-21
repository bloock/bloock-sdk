use std::{
    thread,
    time::{Duration, SystemTime},
};

use crate::{
    anchor::repository::AnchorRepository, config::service::ConfigService,
    infrastructure::InfrastructureError,
};

#[cfg(test)]
use mockall::automock;

use super::{entity::anchor::Anchor, AnchorError};

#[cfg_attr(test, automock)]
pub trait AnchorService {
    fn get_anchor(&self, anchor_id: i32) -> Result<Anchor, InfrastructureError>;
    fn wait_anchor(&self, anchor_id: i32, timeout: u64) -> Result<Anchor, AnchorError>;
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
    fn get_anchor(&self, anchor_id: i32) -> Result<Anchor, InfrastructureError> {
        self.anchor_repository.get_anchor(anchor_id)
    }

    fn wait_anchor(&self, anchor_id: i32, timeout: u64) -> Result<Anchor, AnchorError> {
        let mut attempts = 0;
        let start = SystemTime::now();
        let mut next_try = start
            + Duration::from_millis(
                self.config_service
                    .get_config()
                    .wait_message_interval_default as u64,
            );

        let timeout_time = start + Duration::from_millis(timeout);

        loop {
            if let Ok(anchor) = self.anchor_repository.get_anchor(anchor_id) {
                if anchor.status == "Success" {
                    return Ok(anchor);
                }
            }
            let mut current_time = SystemTime::now();
            if current_time > timeout_time {
                return Err(AnchorError::AnchorTimeout());
            }

            thread::sleep(Duration::from_millis(1000));

            current_time = SystemTime::now();
            while current_time < next_try && current_time < timeout_time {
                thread::sleep(Duration::from_millis(200));
                current_time = SystemTime::now();
            }

            if current_time >= timeout_time {
                return Err(AnchorError::AnchorTimeout());
            }

            next_try += Duration::from_millis(
                (attempts
                    * self
                        .config_service
                        .get_config()
                        .wait_message_interval_factor
                    + self
                        .config_service
                        .get_config()
                        .wait_message_interval_default) as u64,
            );
            attempts += 1;
        }
    }
}

#[cfg(test)]
mod test {
    use crate::{
        anchor::{self, entity::anchor::Anchor},
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
        let anchor_id = 1;
        let anchor = Anchor {
            id: anchor_id,
            block_roots: vec![String::from("block_root")],
            networks: vec![],
            root: String::from("root"),
            status: String::from("Success"),
        };

        let expected_anchor = anchor.clone();

        let mut counter = 0;
        let max_count = 0;

        let get_anchor_side_effect = move |_| {
            if counter < max_count {
                counter += 1;
                return Err(InfrastructureError::HttpClientApiError(String::from(
                    "Anchor not ready yet",
                )));
            }
            Ok(anchor.clone())
        };

        let mut config = Configuration::default();
        config.wait_message_interval_default = 1;
        config.wait_message_interval_factor = 0;

        let mut config_service_mock = config::configure_service_test();
        config_service_mock.expect_get_config().return_const(config);

        let mut anchor_repo_mock = anchor::configure_repository_test();
        anchor_repo_mock
            .expect_get_anchor()
            .returning(get_anchor_side_effect);

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
