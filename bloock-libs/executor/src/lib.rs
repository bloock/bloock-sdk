use serde::Serialize;
use thiserror::Error as ThisError;

pub struct Executor {}

impl Executor {
    pub fn block_on<F, R>(fut: F) -> Result<R, ExecutorError>
    where
        F: std::future::Future<Output = R>,
    {
        let runtime = match tokio::runtime::Runtime::new() {
            Ok(r) => r,
            Err(e) => return Err(ExecutorError::ExecutorError(e.to_string())),
        };
        Ok(runtime.block_on(fut))
    }
}

#[derive(ThisError, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum ExecutorError {
    #[error("Executor Error: {0}")]
    ExecutorError(String),
}
