use bloock_http::{Client, HttpClient};
use std::sync::Arc;

pub struct ProofService<H: Client> {
    pub http: Arc<H>,
}

impl<H: Client> ProofService<H> {
    fn get_proof(&self) {}
}
