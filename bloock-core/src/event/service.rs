use super::entity::event::Event;
use crate::config::service::ConfigService;
use crate::error::BloockResult;
use bloock_event::EventLayer;
use bloock_http::Client;
use std::sync::Arc;

pub struct EventService<H: Client> {
    pub http: Arc<H>,
    pub config_service: ConfigService,
}

impl<H: Client> EventService<H> {
    pub async fn send_event(&self, event: Event) -> BloockResult<()> {
        let config = self.config_service.get_config();

        let segment = bloock_event::segment::SegmentLayer::new(&config.analytics_key);
        let r = segment.push(&event.name, event.properties).await;

        println!("{:?}", r);

        Ok(())
    }
}
