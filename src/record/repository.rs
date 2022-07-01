use crate::infrastructure::http::HttpClient;
use std::sync::Arc;

#[cfg(test)]
use mockall::automock;

#[cfg_attr(test, automock)]
pub trait RecordRepository {
    fn get_record() -> ();
}

pub struct RecordRepositoryImpl<H: HttpClient> {
    pub http: Arc<H>,
}

impl<H> RecordRepository for RecordRepositoryImpl<H>
where
    H: HttpClient,
{
    fn get_record() {}
}
