use crate::infrastructure::http::HttpClient;
use std::sync::Arc;

pub mod entity;
pub mod repository;
pub mod service;

pub fn configure<H: HttpClient + 'static>(http: Arc<H>) -> impl service::ProofService {
    return service::ProofServiceImpl {
        proof_repository: configure_repository(Arc::clone(&http)),
    };
}

pub fn configure_repository<H: HttpClient + 'static>(
    http: Arc<H>,
) -> impl repository::ProofRepository
where {
    repository::ProofRepositoryImpl {
        http: Arc::clone(&http),
    }
}

#[cfg(test)]
pub fn configure_repository_test() -> repository::MockProofRepository {
    repository::MockProofRepository::new()
}

#[cfg(test)]
pub fn configure_service_test() -> service::MockProofService {
    service::MockProofService::new()
}
