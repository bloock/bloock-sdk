use crate::infrastructure::http::HttpClient;
use std::sync::Arc;

pub mod entity;
pub mod repository;
pub mod service;

pub fn configure<H: HttpClient + 'static>(http: Arc<H>) -> impl service::RecordService {
    return service::RecordServiceImpl {
        record_repository: configure_repository(Arc::clone(&http)),
    };
}

pub fn configure_repository<H: HttpClient + 'static>(
    http: Arc<H>,
) -> impl repository::RecordRepository
where {
    repository::RecordRepositoryImpl {
        http: Arc::clone(&http),
    }
}

#[cfg(test)]
pub fn configure_repository_test() -> repository::MockRecordRepository {
    repository::MockRecordRepository::new()
}

#[cfg(test)]
pub fn configure_service_test() -> service::MockRecordService {
    service::MockRecordService::new()
}
