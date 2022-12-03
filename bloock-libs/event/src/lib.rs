use async_trait::async_trait;
use serde::Serialize;
use serde_json::Value;
use thiserror::Error as ThisError;

pub mod segment;

pub type Result<T> = std::result::Result<T, EventError>;

#[async_trait(?Send)]
pub trait EventLayer {
    async fn push(&self, id: &str, params: Value) -> Result<()>;
}

#[derive(ThisError, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum EventError {
    #[error("Error sending event")]
    PushError(),
}
