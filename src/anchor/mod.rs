use crate::infrastructure::http::HttpClient;
use std::sync::Arc;

pub mod entity;
pub mod repository;
pub mod service;

pub fn configure<H: HttpClient + 'static>(http: Arc<H>) -> impl service::AnchorService {
    return service::AnchorServiceImpl {
        anchor_repository: configure_repository(Arc::clone(&http)),
    };
}

pub fn configure_repository<H: HttpClient + 'static>(
    http: Arc<H>,
) -> impl repository::AnchorRepository
where {
    repository::AnchorRepositoryImpl {
        http: Arc::clone(&http),
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
