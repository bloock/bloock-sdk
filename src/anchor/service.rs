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
