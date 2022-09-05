use super::Publisher;

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

    fn retrieve(&self, _uri: String) -> crate::Result<Vec<u8>> {
        todo!()
    }
}
