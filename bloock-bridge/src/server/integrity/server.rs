use crate::{
    error::BridgeError,
    items::{
        GetAnchorResponse, GetProofRequest, GetProofResponse, IntegrityServiceHandler,
        SendRecordsResponse, ValidateRootRequest, ValidateRootResponse, VerifyProofRequest,
        VerifyProofResponse, VerifyRecordsRequest, VerifyRecordsResponse, WaitAnchorRequest,
        WaitAnchorResponse,
    },
    server::response_types::RequestConfigData,
};
use async_trait::async_trait;
use bloock_core::{
    error::BloockError,
    integrity::{self, entity::proof::Proof},
    record::entity::record::Record as RecordCore,
};

pub struct IntegrityServer {}

#[async_trait(?Send)]
impl IntegrityServiceHandler for IntegrityServer {
    async fn send_records(
        &self,
        req: &crate::items::SendRecordsRequest,
    ) -> Result<SendRecordsResponse, String> {
        let config_data = req.get_config_data()?;

        let records = req
            .clone()
            .records
            .iter()
            .map(|record| record.clone().try_into())
            .collect::<Result<Vec<RecordCore>, BridgeError>>()
            .map_err(|e| e.to_string())?;

        let client = integrity::configure(config_data.clone());
        let receipts = client
            .send_records(records)
            .await
            .map_err(|e| e.to_string())?;

        let response = receipts
            .iter()
            .map(|receipt| receipt.clone().into())
            .collect();

        Ok(SendRecordsResponse {
            records: response,
            error: None,
        })
    }

    async fn get_anchor(
        &self,
        req: &crate::items::GetAnchorRequest,
    ) -> Result<GetAnchorResponse, String> {
        let config_data = req.get_config_data()?;

        let client = integrity::configure(config_data.clone());
        let anchor = client
            .get_anchor(req.anchor_id)
            .await
            .map_err(|e| e.to_string())?;

        Ok(GetAnchorResponse {
            anchor: Some(anchor.into()),
            error: None,
        })
    }

    async fn wait_anchor(&self, req: &WaitAnchorRequest) -> Result<WaitAnchorResponse, String> {
        let config_data = req.get_config_data()?;

        let client = integrity::configure(config_data.clone());
        let anchor = client
            .wait_anchor(req.anchor_id, req.timeout)
            .await
            .map_err(|e| e.to_string())?;

        Ok(WaitAnchorResponse {
            anchor: Some(anchor.into()),
            error: None,
        })
    }

    async fn get_proof(&self, req: &GetProofRequest) -> Result<GetProofResponse, String> {
        let config_data = req.get_config_data()?;

        let client = integrity::configure(config_data.clone());
        let records = req
            .records
            .iter()
            .map(|record| record.clone().try_into())
            .collect::<Result<Vec<RecordCore>, BridgeError>>()
            .map_err(|e| e.to_string())?;

        let proof = client.get_proof(records).await.map_err(|e| e.to_string())?;

        Ok(GetProofResponse {
            proof: Some(proof.into()),
            error: None,
        })
    }

    async fn validate_root(
        &self,
        req: &ValidateRootRequest,
    ) -> Result<ValidateRootResponse, String> {
        let config_data = req.get_config_data()?;

        let client = integrity::configure(config_data.clone());
        let root: RecordCore = (&req.root)
            .try_into()
            .map_err(|e: BloockError| e.to_string())?;

        let timestamp = client
            .validate_root(root, req.network().into())
            .await
            .map_err(|e| e.to_string())?;

        Ok(ValidateRootResponse {
            timestamp: timestamp as u64,
            error: None,
        })
    }

    async fn verify_proof(&self, req: &VerifyProofRequest) -> Result<VerifyProofResponse, String> {
        let config_data = req.get_config_data()?;

        let client = integrity::configure(config_data);
        let proof: Proof = req
            .proof
            .clone()
            .ok_or_else(|| "Missing proof in request".to_string())?
            .try_into()
            .map_err(|e: BridgeError| e.to_string())?;

        let record = client.verify_proof(proof).map_err(|e| e.to_string())?;

        Ok(VerifyProofResponse {
            record: Some(record.get_hash()),
            error: None,
        })
    }

    async fn verify_records(
        &self,
        req: &VerifyRecordsRequest,
    ) -> Result<VerifyRecordsResponse, String> {
        let config_data = req.get_config_data()?;

        let client = integrity::configure(config_data.clone());
        let records = req
            .records
            .iter()
            .map(|r| r.clone().try_into())
            .collect::<Result<Vec<RecordCore>, BridgeError>>()
            .map_err(|e| e.to_string())?;

        let network = req.network.map(|_| req.network().into());

        let timestamp = client
            .verify_records(records, network)
            .await
            .map_err(|e| e.to_string())?;

        Ok(VerifyRecordsResponse {
            timestamp: timestamp as u64,
            error: None,
        })
    }
}
