use super::entity::dto::event_request::EventRequest;
use super::entity::dto::event_response::EventResponse;
use super::entity::event::Event;
use super::EventError;
use crate::config::service::ConfigService;
use crate::error::BloockResult;
use bloock_http::Client;
use std::sync::Arc;

pub struct EventService<H: Client> {
    pub http: Arc<H>,
    pub config_service: ConfigService,
}

impl<H: Client> EventService<H> {
    pub async fn send_event(&self, event: Event) -> BloockResult<()> {
        let config = self.config_service.get_config();

        let auth = format!("{}:", config.analytics_key);

        let headers = vec![(
            "Authorization".to_owned(),
            format!("Basic {}", base64::encode(&auth)),
        )];

        let body = EventRequest::new(event);

        let _: EventResponse = self
            .http
            .post_json("https://api.segment.io/v1/track", body, Some(headers))
            .await
            .map_err(|_| EventError::PushError())?;

        Ok(())
    }
}
