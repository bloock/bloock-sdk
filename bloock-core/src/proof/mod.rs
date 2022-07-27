use bloock_http::HttpClient;
#[cfg(test)]
use bloock_http::MockClient;
use std::sync::Arc;

pub mod entity;
pub mod service;

pub fn configure(http: Arc<HttpClient>) -> service::ProofService<HttpClient> {
    return service::ProofService {
        http: Arc::clone(&http),
    };
}

#[cfg(test)]
pub fn configure_test(http: Arc<MockClient>) -> service::ProofService<MockClient> {
    return service::ProofService {
        http: Arc::clone(&http),
    };
}
