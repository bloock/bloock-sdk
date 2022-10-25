use async_trait::async_trait;
#[cfg(any(test, feature = "testing"))]
use mockall::automock;
use serde::Serialize;
use thiserror::Error as ThisError;

pub mod hosted;
pub mod test;

pub type Result<T> = std::result::Result<T, PublisherError>;

#[cfg_attr(any(test, feature = "testing"), automock)]
#[async_trait(?Send)]
pub trait Publisher {
    async fn publish(&self, payload: &[u8]) -> Result<String>;
}

#[cfg_attr(any(test, feature = "testing"), automock)]
#[async_trait(?Send)]
pub trait Loader {
    async fn retrieve(&self) -> Result<Vec<u8>>;
}

#[derive(ThisError, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum PublisherError {
    #[error("Publish error - {0}")]
    PublishError(String),
    #[error("Load error - {0}")]
    LoadError(String),
}
