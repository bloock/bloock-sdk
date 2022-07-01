use crate::infrastructure::http::HttpClient;
use std::sync::Arc;

#[cfg(test)]
use mockall::automock;

#[cfg_attr(test, automock)]
pub trait AnchorRepository {
    fn get_anchor() -> ();
}

pub struct AnchorRepositoryImpl<H: HttpClient> {
    pub http: Arc<H>,
}

impl<H> AnchorRepository for AnchorRepositoryImpl<H>
where
    H: HttpClient,
{
    fn get_anchor() {}
}
