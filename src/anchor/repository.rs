use crate::{
    config::service::ConfigService,
    infrastructure::{http::HttpClient, InfrastructureError},
};
use std::sync::Arc;

#[cfg(test)]
use mockall::automock;

use super::entity::anchor::Anchor;

#[cfg_attr(test, automock)]
pub trait AnchorRepository {
    fn get_anchor(&self, anchor_id: i32) -> Result<Anchor, InfrastructureError>;
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
    fn get_anchor(&self, anchor_id: i32) -> Result<Anchor, InfrastructureError> {
        let url = format!(
            "{}/core/anchor/{}",
            self.config_service.get_api_base_url(),
            anchor_id
        );

        self.http.get::<String, Anchor>(url, None)
    }
}

#[cfg(test)]
mod tests {
    use std::sync::Arc;

    use crate::{
        anchor::entity::anchor::Anchor, config, infrastructure::configure_http_client_test,
    };

    use super::{AnchorRepository, AnchorRepositoryImpl};

    #[test]
    fn test_get_anchor() {
        let mut config_service_mock = config::configure_service_test();
        let mut http_mock = configure_http_client_test();

        config_service_mock
            .expect_get_api_base_url()
            .return_const(String::from("some URL"));

        let anchor_id = 1;
        let anchor = Anchor {
            id: anchor_id,
            block_roots: vec![String::from("block_root")],
            networks: vec![],
            root: String::from("root"),
            status: String::from("Success"),
        };

        let expected = anchor.clone();

        http_mock
            .expect_get::<String, Anchor>()
            .return_once(|_, _| Ok(anchor));

        let anchor_repo = AnchorRepositoryImpl {
            http: Arc::new(http_mock),
            config_service: config_service_mock,
        };

        match anchor_repo.get_anchor(anchor_id) {
            Ok(anchor) => assert_eq!(anchor, expected),
            Err(e) => panic!("{}", e),
        };
    }
}
