use crate::{
    error::BridgeError,
    items::{
        DataAvailabilityType, Decrypter, Encrypter, EncryptionAlg, GetHashRequest, GetHashResponse,
        Loader, LoaderArgs, Record, RecordBuilderResponse, RecordServiceHandler, SetProofRequest,
        SetProofResponse, Signer, SignerAlg,
    },
    server::response_types::RequestConfigData,
};
use async_trait::async_trait;
use bloock_core::{
    config::config_data::ConfigData,
    integrity::entity::proof::Proof,
    record::entity::record::Record as RecordCore,
    record::{builder::Builder, service::RecordService},
    Decrypter as DecrypterCore, Encrypter as EncrypterCore, LocalAesDecrypter, LocalAesEncrypter,
    LocalEcdsaSigner, LocalEnsSigner, LocalRsaDecrypter, LocalRsaEncrypter, ManagedBJJSigner,
    ManagedEcdsaSigner, ManagedEnsSigner, ManagedRsaDecrypter, ManagedRsaEncrypter,
    Signer as SignerCore,
};
use std::convert::TryInto;

pub struct RecordServer {}

#[async_trait(?Send)]
impl RecordServiceHandler for RecordServer {
    async fn build_record_from_string(
        &self,
        req: &crate::items::RecordBuilderFromStringRequest,
    ) -> Result<RecordBuilderResponse, String> {
        let config_data = req.get_config_data()?;
        let builder = RecordService::from_string(req.clone().payload).map_err(|e| e.to_string())?;
        match build_record(
            builder,
            req.clone().signer,
            req.clone().encrypter,
            req.clone().decrypter,
            config_data,
        )
        .await
        {
            Ok(r) => Ok(RecordBuilderResponse {
                record: Some(r),
                error: None,
            }),
            Err(e) => Err(e),
        }
    }

    async fn build_record_from_hex(
        &self,
        req: &crate::items::RecordBuilderFromHexRequest,
    ) -> Result<RecordBuilderResponse, String> {
        let config_data = req.get_config_data()?;
        let builder = RecordService::from_hex(req.clone().payload).map_err(|e| e.to_string())?;

        match build_record(
            builder,
            req.clone().signer,
            req.clone().encrypter,
            req.clone().decrypter,
            config_data,
        )
        .await
        {
            Ok(r) => Ok(RecordBuilderResponse {
                record: Some(r),
                error: None,
            }),
            Err(e) => Err(e),
        }
    }

    async fn build_record_from_json(
        &self,
        req: &crate::items::RecordBuilderFromJsonRequest,
    ) -> Result<RecordBuilderResponse, String> {
        let config_data = req.get_config_data()?;
        let builder = RecordService::from_json(req.clone().payload).map_err(|e| e.to_string())?;

        match build_record(
            builder,
            req.clone().signer,
            req.clone().encrypter,
            req.clone().decrypter,
            config_data,
        )
        .await
        {
            Ok(r) => Ok(RecordBuilderResponse {
                record: Some(r),
                error: None,
            }),
            Err(e) => Err(e),
        }
    }

    async fn build_record_from_file(
        &self,
        req: &crate::items::RecordBuilderFromFileRequest,
    ) -> Result<RecordBuilderResponse, String> {
        let config_data = req.get_config_data()?;
        let builder = RecordService::from_file(req.clone().payload).map_err(|e| e.to_string())?;

        match build_record(
            builder,
            req.clone().signer,
            req.clone().encrypter,
            req.clone().decrypter,
            config_data,
        )
        .await
        {
            Ok(r) => Ok(RecordBuilderResponse {
                record: Some(r),
                error: None,
            }),
            Err(e) => Err(e),
        }
    }

    async fn build_record_from_bytes(
        &self,
        req: &crate::items::RecordBuilderFromBytesRequest,
    ) -> Result<RecordBuilderResponse, String> {
        let config_data = req.get_config_data()?;
        let builder = RecordService::from_bytes(req.clone().payload).map_err(|e| e.to_string())?;

        match build_record(
            builder,
            req.clone().signer,
            req.clone().encrypter,
            req.clone().decrypter,
            config_data,
        )
        .await
        {
            Ok(r) => Ok(RecordBuilderResponse {
                record: Some(r),
                error: None,
            }),
            Err(e) => Err(e),
        }
    }

    async fn build_record_from_record(
        &self,
        req: &crate::items::RecordBuilderFromRecordRequest,
    ) -> Result<RecordBuilderResponse, String> {
        let config_data = req.get_config_data()?;
        let payload: RecordCore = req
            .clone()
            .payload
            .ok_or_else(|| "no record payload found".to_string())?
            .try_into()
            .map_err(|e: BridgeError| e.to_string())?;

        let builder = RecordService::from_record(payload).map_err(|e| e.to_string())?;

        match build_record(
            builder,
            req.clone().signer,
            req.clone().encrypter,
            req.clone().decrypter,
            config_data,
        )
        .await
        {
            Ok(r) => Ok(RecordBuilderResponse {
                record: Some(r),
                error: None,
            }),
            Err(e) => Err(e),
        }
    }

    async fn build_record_from_loader(
        &self,
        req: &crate::items::RecordBuilderFromLoaderRequest,
    ) -> Result<RecordBuilderResponse, String> {
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
            None => return Err("invalid loader provided".to_string()),
        };

        let payload = result.map_err(|e| e.to_string())?;

        let builder = RecordService::from_file(payload).map_err(|e| e.to_string())?;

        match build_record(
            builder,
            req.clone().signer,
            req.clone().encrypter,
            req.clone().decrypter,
            config_data,
        )
        .await
        {
            Ok(r) => Ok(RecordBuilderResponse {
                record: Some(r),
                error: None,
            }),
            Err(e) => Err(e),
        }
    }

    async fn get_hash(&self, req: &GetHashRequest) -> Result<GetHashResponse, String> {
        let record: RecordCore = req
            .clone()
            .record
            .ok_or_else(|| "invalid record".to_string())?
            .try_into()
            .map_err(|e: BridgeError| e.to_string())?;

        let hash = record.get_hash();

        Ok(GetHashResponse { hash, error: None })
    }

    async fn set_proof(&self, req: &SetProofRequest) -> Result<SetProofResponse, String> {
        let mut record: RecordCore = req
            .clone()
            .record
            .ok_or_else(|| "invalid record".to_string())?
            .try_into()
            .map_err(|e: BridgeError| e.to_string())?;

        let proof: Proof = req
            .clone()
            .proof
            .ok_or_else(|| "invalid proof".to_string())?
            .try_into()
            .map_err(|e: BridgeError| e.to_string())?;

        record.set_proof(proof).map_err(|e| e.to_string())?;

        let final_record = record.try_into().map_err(|e: BridgeError| e.to_string())?;

        Ok(SetProofResponse {
            record: Some(final_record),
            error: None,
        })
    }
}

async fn build_record(
    mut builder: Builder,
    signer: Option<Signer>,
    encrypter: Option<Encrypter>,
    decrypter: Option<Decrypter>,
    config_data: ConfigData,
) -> Result<Record, String> {
    if let Some(signer) = signer {
        let signer_alg = SignerAlg::from_i32(signer.alg);

        let local_key = signer.local_key;
        let managed_key = signer.managed_key;

        let signer: Box<dyn SignerCore> = if let Some(key) = managed_key {
            match signer_alg {
                Some(SignerAlg::Es256k) => ManagedEcdsaSigner::new_boxed(
                    key.into(),
                    signer.common_name,
                    config_data.config.host.clone(),
                    config_data.config.api_key.clone(),
                ),
                Some(SignerAlg::Bjj) => ManagedBJJSigner::new_boxed(
                    key.into(),
                    signer.common_name,
                    config_data.config.host.clone(),
                    config_data.config.api_key.clone(),
                ),
                Some(SignerAlg::Ens) => ManagedEnsSigner::new_boxed(
                    key.into(),
                    config_data.config.host.clone(),
                    config_data.config.api_key.clone(),
                ),
                None => return Err("invalid signer provided".to_string()),
            }
        } else if let Some(key) = local_key {
            match signer_alg {
                Some(SignerAlg::Es256k) => {
                    LocalEcdsaSigner::new_boxed(key.into(), signer.common_name)
                }
                Some(SignerAlg::Ens) => LocalEnsSigner::new_boxed(key.into()),
                Some(SignerAlg::Bjj) => todo!(),
                None => return Err("invalid signer provided".to_string()),
            }
        } else {
            return Err("invalid key provided".to_string());
        };
        builder = builder.with_signer(signer);
    }

    if let Some(encrypt) = encrypter {
        let encrypter_alg = EncryptionAlg::from_i32(encrypt.alg);

        let local_key = encrypt.local_key;
        let managed_key = encrypt.managed_key;

        let encrypter: Box<dyn EncrypterCore> = if let Some(key) = managed_key {
            match encrypter_alg {
                Some(EncryptionAlg::A256gcm) => {
                    return Err("AES encryption is not yet supported for managed keys".to_string())
                }
                Some(EncryptionAlg::Rsa) => ManagedRsaEncrypter::new(
                    key.into(),
                    config_data.config.host.clone(),
                    config_data.config.api_key.clone(),
                ),
                None => return Err("invalid encrypter provided".to_string()),
            }
        } else if let Some(key) = local_key {
            match encrypter_alg {
                Some(EncryptionAlg::A256gcm) => LocalAesEncrypter::new(key.into()),
                Some(EncryptionAlg::Rsa) => LocalRsaEncrypter::new(key.into()),
                None => return Err("invalid encrypter provided".to_string()),
            }
        } else {
            return Err("invalid key provided".to_string());
        };

        builder = builder.with_encrypter(encrypter);
    }

    if let Some(decrypt) = decrypter {
        let decrypter_alg = EncryptionAlg::from_i32(decrypt.alg);

        let local_key = decrypt.local_key;
        let managed_key = decrypt.managed_key;

        let decrypter: Box<dyn DecrypterCore> = if let Some(key) = managed_key {
            match decrypter_alg {
                Some(EncryptionAlg::A256gcm) => {
                    return Err("AES decryption is not yet supported for managed keys".to_string())
                }
                Some(EncryptionAlg::Rsa) => ManagedRsaDecrypter::new(
                    key.into(),
                    config_data.config.host.clone(),
                    config_data.config.api_key.clone(),
                ),
                None => return Err("invalid decrypter provided".to_string()),
            }
        } else if let Some(key) = local_key {
            match decrypter_alg {
                Some(EncryptionAlg::A256gcm) => LocalAesDecrypter::new(key.into()),
                Some(EncryptionAlg::Rsa) => LocalRsaDecrypter::new(key.into()),
                None => return Err("invalid decrypter provided".to_string()),
            }
        } else {
            return Err("invalid key provided".to_string());
        };

        builder = builder.with_decrypter(decrypter);
    }

    match builder.build().await {
        Ok(record) => record.try_into().map_err(|e: BridgeError| e.to_string()),
        Err(e) => Err(e.to_string()),
    }
}
