use super::entity::event::Event;
use crate::config::service::ConfigService;
use crate::error::BloockResult;
use bloock_event::EventLayer;
use bloock_http::Client;
use serde_json::json;
use std::sync::Arc;

pub struct EventService<H: Client> {
    pub http: Arc<H>,
    pub config_service: ConfigService,
}

impl<H: Client> EventService<H> {
    pub async fn send_event(&self, event: Event) -> BloockResult<()> {
        let config = self.config_service.get_config();
        let args = json!({
            "success": event.success
        });

        let gtag = bloock_event::gtag::GtagLayer::new();
        let _ = gtag.push(&event.name, args.clone()).await;

        let segment = bloock_event::segment::SegmentLayer::new(&config.analytics_key);
        let _ = segment.push(&event.name, args).await;

        Ok(())
    }
}
