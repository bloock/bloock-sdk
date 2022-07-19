use crate::{config::service::ConfigService, infrastructure::http::HttpClient};
use std::sync::Arc;

#[cfg(test)]
use mockall::automock;

use super::entity::anchor::Anchor;

#[cfg_attr(test, automock)]
pub trait AnchorRepository {
    fn get_anchor(&self, anchor_id: i32) -> Anchor;
}

pub struct AnchorRepositoryImpl<H: HttpClient, C: ConfigService> {
    pub http: Arc<H>,
    pub config_service: C,
}

impl<H, C> AnchorRepository for AnchorRepositoryImpl<H, C>
where
    H: HttpClient,
    C: ConfigService,
{
    fn get_anchor(&self, anchor_id: i32) -> Anchor {
        let url = format!(
            "{}/core/anchor/{}",
            self.config_service.get_api_base_url(),
            anchor_id
        );
        // TODO
        Anchor { id: 1, block_roots: vec![String::new()], networks: vec![], root: String::new(), status: String::new() }
        // let response = self.http.get::<_, _>(url, None);
    }
}
