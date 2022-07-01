use crate::infrastructure::http::HttpClient;
use std::sync::Arc;

#[cfg(test)]
use mockall::automock;

#[cfg_attr(test, automock)]
pub trait ConfigRepository {
    fn get_config() -> ();
}

pub struct ConfigRepositoryImpl<H: HttpClient> {
    pub http: Arc<H>,
}

impl<H> ConfigRepository for ConfigRepositoryImpl<H>
where
    H: HttpClient,
{
    fn get_config() {}
}
