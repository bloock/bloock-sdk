use bloock_http::{Client, HttpClient};
use std::sync::Arc;

pub struct RecordService<H: Client> {
    pub http: Arc<H>,
}

impl<H: Client> RecordService<H> {
    fn get_record(&self) {}
}
