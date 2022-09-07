use super::{Loader, Publisher};

#[derive(Default)]
pub struct HostedPublisherArgs {}

pub struct HostedPublisher {
    _args: HostedPublisherArgs,
}

impl HostedPublisher {
    pub fn new(args: HostedPublisherArgs) -> Self {
        Self { _args: args }
    }
}

impl Publisher for HostedPublisher {
    fn publish(&self, _payload: &Option<Vec<u8>>) -> crate::Result<String> {
        Ok("https://google.com".to_string())
    }
}

#[derive(Default)]
pub struct HostedLoaderArgs {
    pub bloock_id: String,
}

pub struct HostedLoader {
    _args: HostedLoaderArgs,
}

impl HostedLoader {
    pub fn new(args: HostedLoaderArgs) -> Self {
        Self { _args: args }
    }
}

impl Loader for HostedLoader {
    fn retrieve(&self) -> crate::Result<Vec<u8>> {
        todo!()
    }
}
