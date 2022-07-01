use crate::infrastructure::http::HttpClient;
use std::sync::Arc;

pub mod entity;
pub mod repository;
pub mod service;

pub fn configure<H: HttpClient + 'static>(http: Arc<H>) -> impl service::ConfigService {
    return service::ConfigServiceImpl {
        config_repository: configure_repository(Arc::clone(&http)),
    };
}

pub fn configure_repository<H: HttpClient + 'static>(
    http: Arc<H>,
) -> impl repository::ConfigRepository
where {
    repository::ConfigRepositoryImpl {
        http: Arc::clone(&http),
    }
}

#[cfg(test)]
pub fn configure_repository_test() -> repository::MockConfigRepository {
    repository::MockConfigRepository::new()
}

#[cfg(test)]
pub fn configure_service_test() -> service::MockConfigService {
    service::MockConfigService::new()
}
