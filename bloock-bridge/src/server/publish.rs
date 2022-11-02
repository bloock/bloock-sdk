use super::response_types::ResponseType;
use crate::{
    error::BridgeError,
    items::{Error, PublishRequest, PublishResponse, PublisherServiceHandler},
};
use async_trait::async_trait;

impl From<PublishResponse> for ResponseType {
    fn from(res: PublishResponse) -> Self {
        ResponseType::Publish(res)
    }
}

pub struct PublishServer {}

#[async_trait(?Send)]
impl PublisherServiceHandler for PublishServer {
    async fn publish(&self, _req: PublishRequest) -> PublishResponse {
        todo!()
        // let config_data = match map_config(req.config_data) {
        //     Ok(config) => config,
        //     Err(_) => {
        //         return PublishResponse {
        //             hash: "".to_string(),
        //             error: Some(config_data_error()),
        //         }
        //     }
        // };

        // let client = client::configure(config_data.clone());

        // let req_record = match req.record {
        //     Some(p) => p,
        //     None => return PublishResponse::new_error("no record provided".to_string()),
        // };
        // let record: RecordCore = match req_record.try_into() {
        //     Ok(r) => r,
        //     Err(e) => return PublishResponse::new_error(e.to_string()),
        // };

        // let req_publisher: Publisher = match req.publisher {
        //     Some(p) => p,
        //     None => return PublishResponse::new_error("invalid publisher provided".to_string()),
        // };

        // let publisher = match PublisherType::from_i32(req_publisher.r#type) {
        //     Some(PublisherType::Hosted) => {
        //         HostedPublisher::new(HostedPublisherArgs::new(config_data.config.api_key))
        //     }
        //     None => return PublishResponse::new_error("invalid publisher provided".to_string()),
        // };

        // let hash = match client.publish(publisher, record).await {
        //     Ok(h) => h,
        //     Err(e) => return PublishResponse::new_error(e.to_string()),
        // };

        // PublishResponse { hash, error: None }
    }
}

impl PublishResponse {
    fn _new_error(err: String) -> PublishResponse {
        PublishResponse {
            hash: "".to_string(),
            error: Some(Error {
                kind: BridgeError::PublishError.to_string(),
                message: err,
            }),
        }
    }
}
