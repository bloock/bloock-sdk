use crate::infrastructure::http::HttpClient;
use std::sync::Arc;

use self::config_data::ConfigData;

pub mod entity;
pub mod repository;
pub mod service;
pub mod config_data;

pub fn configure<H: HttpClient + 'static>(http: Arc<H>, config_data: ConfigData) -> impl service::ConfigService {
    return service::ConfigServiceImpl {
        config_repository: configure_repository(Arc::clone(&http), config_data),
    };
}

pub fn configure_repository<H: HttpClient + 'static>(
    http: Arc<H>, config_data: ConfigData,
) -> impl repository::ConfigRepository
where {
    repository::ConfigRepositoryImpl {
        http: Arc::clone(&http),
        config_data,
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
