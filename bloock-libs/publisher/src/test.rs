use super::{Loader, Publisher};
use async_trait::async_trait;

#[derive(Default)]
pub struct TestPublisherArgs {}

pub struct TestPublisher {
    _args: TestPublisherArgs,
}

impl TestPublisher {
    pub fn new(args: TestPublisherArgs) -> Self {
        Self { _args: args }
    }
}

#[async_trait(?Send)]
impl Publisher for TestPublisher {
    async fn publish(&self, _payload: &[u8]) -> crate::Result<String> {
        Ok("https://google.com".to_owned())
    }
}

#[derive(Default)]
pub struct TestLoaderArgs {}

pub struct TestLoader {
    _args: TestLoaderArgs,
}

impl TestLoader {
    pub fn new(args: TestLoaderArgs) -> Self {
        Self { _args: args }
    }
}

#[async_trait(?Send)]
impl Loader for TestLoader {
    async fn retrieve(&self) -> crate::Result<Vec<u8>> {
        todo!()
    }
}
