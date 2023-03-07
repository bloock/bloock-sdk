use crate::{
    error::BridgeError,
    items::{
        AuthenticityServiceHandler, GetSignaturesRequest, GetSignaturesResponse, SignRequest,
        SignResponse, Signature, SignatureCommonNameRequest, SignatureCommonNameResponse,
        SignerAlg, VerifyRequest, VerifyResponse,
    },
    server::response_types::RequestConfigData,
};
use async_trait::async_trait;
use bloock_core::{
    authenticity, config::entity::network::Network, record::entity::record::Record as RecordCore,
    LocalEcdsaSigner, LocalEnsSigner, ManagedEcdsaSigner, ManagedEnsSigner,
    Signature as SignatureCore, Signer,
};

pub struct AuthenticityServer {}

#[async_trait(?Send)]
impl AuthenticityServiceHandler for AuthenticityServer {
    async fn sign(&self, req: &SignRequest) -> Result<SignResponse, String> {
        let config_data = req.get_config_data()?;
        let client = authenticity::configure(config_data.clone());

        let req_record = req
            .clone()
            .record
            .ok_or_else(|| "no record provided".to_string())?;

        let record: RecordCore = req_record
            .try_into()
            .map_err(|e: BridgeError| e.to_string())?;

        let signer = req
            .clone()
            .signer
            .ok_or_else(|| "no signer provided".to_string())?;

        let signer_alg = SignerAlg::from_i32(signer.alg);

        let local_key = signer.local_key;
        let managed_key = signer.managed_key;

        let signer: Box<dyn Signer> = if let Some(key) = managed_key {
            match signer_alg {
                Some(SignerAlg::Es256k) => ManagedEcdsaSigner::new_boxed(
                    key.into(),
                    signer.common_name,
                    config_data.config.host,
                    config_data.config.api_key,
                ),
                Some(SignerAlg::Ens) => ManagedEnsSigner::new_boxed(
                    key.into(),
                    config_data.config.host,
                    config_data.config.api_key,
                ),
                None => return Err("invalid signer provided".to_string()),
            }
        } else if let Some(key) = local_key {
            match signer_alg {
                Some(SignerAlg::Es256k) => {
                    LocalEcdsaSigner::new_boxed(key.into(), signer.common_name)
                }
                Some(SignerAlg::Ens) => LocalEnsSigner::new_boxed(key.into()),
                None => return Err("invalid signer provided".to_string()),
            }
        } else {
            return Err("invalid key provided".to_string());
        };

        let signature: SignatureCore = client
            .sign(record, signer)
            .await
            .map_err(|e| e.to_string())?;

        Ok(SignResponse {
            signature: Some(signature.into()),
            error: None,
        })
    }

    async fn verify(&self, req: &VerifyRequest) -> Result<VerifyResponse, String> {
        let config_data = req.get_config_data()?;
        let client = authenticity::configure(config_data);

        let req_record = req
            .clone()
            .record
            .ok_or_else(|| "no record provided".to_string())?;

        let record: RecordCore = req_record
            .try_into()
            .map_err(|e: BridgeError| e.to_string())?;

        let valid = client.verify(record).await.map_err(|e| e.to_string())?;

        Ok(VerifyResponse { valid, error: None })
    }

    async fn get_signature_common_name(
        &self,
        req: &SignatureCommonNameRequest,
    ) -> Result<SignatureCommonNameResponse, String> {
        let config_data = req.get_config_data()?;

        let req_signature = req
            .clone()
            .signature
            .ok_or_else(|| "invalid signature provided".to_string())?;

        let signature: SignatureCore = req_signature
            .try_into()
            .map_err(|e: BridgeError| e.to_string())?;

        let provider = match config_data
            .clone()
            .networks_config
            .get(&Network::EthereumMainnet)
        {
            Some(n) => n.http_provider.clone(),
            None => "".to_string(),
        };

        let common_name = signature
            .get_common_name(provider, config_data.clone().config.api_key)
            .await
            .map_err(|e| e.to_string())?;

        Ok(SignatureCommonNameResponse {
            common_name,
            error: None,
        })
    }

    async fn get_signatures(
        &self,
        req: &GetSignaturesRequest,
    ) -> Result<GetSignaturesResponse, String> {
        let record: RecordCore = req
            .clone()
            .record
            .ok_or_else(|| "invalid record provided".to_string())?
            .try_into()
            .map_err(|e: BridgeError| e.to_string())?;

        let signatures: Vec<Signature> = record
            .get_signatures()
            .unwrap_or_default()
            .iter()
            .map(|signature| signature.clone().into())
            .collect();

        Ok(GetSignaturesResponse {
            signatures,
            error: None,
        })
    }
}
