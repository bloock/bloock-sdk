use crate::{
    error::BridgeError,
    items::{
        AvailabilityServiceHandler, DataAvailabilityType, IpnsKey, Loader, LoaderArgs, PublishRequest, PublishResponse, Publisher, PublisherArgs, Record, RetrieveRequest, RetrieveResponse
    },
    server::response_types::RequestConfigData,
};
use async_trait::async_trait;
use bloock_core::record::entity::record::Record as RecordCore;
use bloock_keys::keys::managed::ManagedKey as ManagedKeyCore;

pub struct AvailabilityServer {}

#[async_trait(?Send)]
impl AvailabilityServiceHandler for AvailabilityServer {
    async fn publish(&self, req: &PublishRequest) -> Result<PublishResponse, String> {
        let config_data = req.get_config_data()?;

        let req_record = req
            .clone()
            .record
            .ok_or_else(|| "no record provided".to_string())?;

        let record: RecordCore = req_record
            .try_into()
            .map_err(|e: BridgeError| e.to_string())?;

        let req_publisher: Publisher = req
            .clone()
            .publisher
            .ok_or_else(|| "invalid publisher provided".to_string())?;

        let service = bloock_core::availability::configure(config_data.clone());

        let result = match DataAvailabilityType::from_i32(req_publisher.r#type) {
            Some(DataAvailabilityType::Hosted) => service.publish_hosted(record).await,
            Some(DataAvailabilityType::Ipfs) => service.publish_ipfs(record).await,
            Some(DataAvailabilityType::Ipns) => {
                let publisher_args: PublisherArgs = req_publisher
                .args
                .ok_or_else(|| "invalid publisher provided".to_string())?;

                let ipns_key: IpnsKey = publisher_args
                .ipns_key
                .ok_or_else(|| "invalid IPNS key provided".to_string())?;

                let key_id: String = if let Some(managed_key) = ipns_key.managed_key.clone() {
                    let managed_key_core: ManagedKeyCore = managed_key.into();
                    managed_key_core.id
                } else if let Some(_) = ipns_key.managed_certificate.clone() {
                    return Err("managed certificate not enabled".to_string());
                } else {
                    return Err("invalid managed key or certificate provided".to_string());
                };
                service.publish_ipns(record, key_id).await
            },
            None => return Err("invalid publisher provided".to_string()),
        };

        let id = result.map_err(|e| e.to_string())?;

        Ok(PublishResponse { id, error: None })
    }

    async fn retrieve(&self, req: &RetrieveRequest) -> Result<RetrieveResponse, String> {
        let config_data = req.get_config_data()?;

        let req_loader: Loader = req
            .clone()
            .loader
            .ok_or_else(|| "invalid loader provided".to_string())?;

        let loader_args: LoaderArgs = req_loader
            .args
            .ok_or_else(|| "invalid loader provided".to_string())?;

        let service = bloock_core::availability::configure(config_data.clone());

        let result = match DataAvailabilityType::from_i32(req_loader.r#type) {
            Some(DataAvailabilityType::Hosted) => service.retrieve_hosted(loader_args.id).await,
            Some(DataAvailabilityType::Ipfs) => service.retrieve_ipfs(loader_args.id).await,
            Some(DataAvailabilityType::Ipns) => service.retrieve_ipns(loader_args.id).await,
            None => return Err("invalid loader provided".to_string()),
        };

        let payload = result.map_err(|e| e.to_string())?;

        let record_service = bloock_core::record::configure(config_data.clone());
        let builder = record_service
            .from_file(payload)
            .map_err(|e| e.to_string())?;

        let record = builder.build().await.map_err(|e| e.to_string())?;

        let res: Record = record.try_into().map_err(|e: BridgeError| e.to_string())?;

        Ok(RetrieveResponse {
            record: Some(res),
            error: None,
        })
    }
}
