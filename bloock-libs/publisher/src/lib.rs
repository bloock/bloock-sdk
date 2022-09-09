use serde::Serialize;
use thiserror::Error as ThisError;

pub mod hosted;
#[cfg(any(test, feature = "testing"))]
pub mod test;

pub type Result<T> = std::result::Result<T, PublisherError>;

pub trait Publisher {
    fn publish(&self, payload: &Option<Vec<u8>>) -> Result<String>;
}

pub trait Loader {
    fn retrieve(&self) -> Result<Vec<u8>>;
}

#[derive(ThisError, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum PublisherError {}
