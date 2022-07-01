use crate::infrastructure::http::HttpClient;
use std::sync::Arc;

#[cfg(test)]
use mockall::automock;

#[cfg_attr(test, automock)]
pub trait ProofRepository {
    fn get_proof() -> ();
}

pub struct ProofRepositoryImpl<H: HttpClient> {
    pub http: Arc<H>,
}

impl<H> ProofRepository for ProofRepositoryImpl<H>
where
    H: HttpClient,
{
    fn get_proof() {}
}
