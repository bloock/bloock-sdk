use crate::{
    config::{self, config_data::ConfigData, service::ConfigService},
    infrastructure::http::HttpClient,
};
use std::sync::{Arc, Mutex};
use thiserror::Error as ThisError;

pub mod entity;
pub mod repository;
pub mod service;

#[derive(ThisError, Debug)]
pub enum AnchorError {
    #[error("Wait Anchor timed out")]
    AnchorTimeout(),
}

pub fn configure<H: HttpClient + 'static>(
    http: Arc<H>,
    config_data: Arc<Mutex<ConfigData>>,
) -> impl service::AnchorService {
    return service::AnchorServiceImpl {
        anchor_repository: configure_repository(
            Arc::clone(&http),
            config::configure(Arc::clone(&http), Arc::clone(&config_data)),
        ),
        config_service: config::configure(Arc::clone(&http), Arc::clone(&config_data)),
    };
}

pub fn configure_repository<H: HttpClient + 'static, C: ConfigService>(
    http: Arc<H>,
    config_service: C,
) -> impl repository::AnchorRepository
where {
    repository::AnchorRepositoryImpl {
        http: Arc::clone(&http),
        config_service,
    }
}

#[cfg(test)]
pub fn configure_repository_test() -> repository::MockAnchorRepository {
    repository::MockAnchorRepository::new()
}

#[cfg(test)]
pub fn configure_service_test() -> service::MockAnchorService {
    service::MockAnchorService::new()
}
