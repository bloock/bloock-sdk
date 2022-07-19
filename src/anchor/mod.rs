use crate::{config::service::ConfigService, infrastructure::http::HttpClient};
use std::sync::Arc;

pub mod entity;
pub mod repository;
pub mod service;

pub fn configure<H: HttpClient + 'static, C: ConfigService>(http: Arc<H>, config_service: C) -> impl service::AnchorService {
    return service::AnchorServiceImpl {
        anchor_repository: configure_repository(Arc::clone(&http), config_service),
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
