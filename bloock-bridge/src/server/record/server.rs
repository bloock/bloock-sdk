use crate::{
    error::BridgeError,
    items::{
        DataAvailabilityType, Decrypter, Encrypter, EncryptionAlg, GetHashRequest, GetHashResponse,
        Loader, LoaderArgs, Record, RecordBuilderResponse, RecordServiceHandler, SetProofRequest,
        SetProofResponse, Signer,
    },
    server::response_types::RequestConfigData,
};
use async_trait::async_trait;
use bloock_core::{
    config::config_data::ConfigData, integrity::entity::proof::Proof, record::builder::Builder,
    record::entity::record::Record as RecordCore, Decrypter as DecrypterCore,
    Encrypter as EncrypterCore, LocalAesDecrypter, LocalAesEncrypter, LocalRsaDecrypter,
    LocalRsaEncrypter, ManagedRsaDecrypter, ManagedRsaEncrypter,
};
use bloock_keys::{entity::key::Key, certificates::{managed::ManagedCertificate as ManagedCertificateCore, local::LocalCertificate as LocalCertificateCore}};
use bloock_keys::keys::local::LocalKey as LocalKeyCore;
use bloock_keys::keys::managed::ManagedKey as ManagedKeyCore;
use std::convert::TryInto;

pub struct RecordServer {}

#[async_trait(?Send)]
impl RecordServiceHandler for RecordServer {
    async fn build_record_from_string(
        &self,
        req: &crate::items::RecordBuilderFromStringRequest,
    ) -> Result<RecordBuilderResponse, String> {
        let config_data = req.get_config_data()?;
        let service = bloock_core::record::configure(config_data.clone());
        let builder = service
            .from_string(req.clone().payload)
            .map_err(|e| e.to_string())?;
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
        let service = bloock_core::record::configure(config_data.clone());
        let builder = service
            .from_hex(req.clone().payload)
            .map_err(|e| e.to_string())?;

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
        let service = bloock_core::record::configure(config_data.clone());
        let builder = service
            .from_json(req.clone().payload)
            .map_err(|e| e.to_string())?;

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
        let service = bloock_core::record::configure(config_data.clone());
        let builder = service
            .from_file(req.clone().payload)
            .map_err(|e| e.to_string())?;

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
        let service = bloock_core::record::configure(config_data.clone());
        let builder = service
            .from_bytes(req.clone().payload)
            .map_err(|e| e.to_string())?;

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

        let service = bloock_core::record::configure(config_data.clone());
        let builder = service.from_record(payload).map_err(|e| e.to_string())?;

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

        let service = bloock_core::record::configure(config_data.clone());
        let builder = service.from_file(payload).map_err(|e| e.to_string())?;

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
        let key: Key = if let Some(managed_key) = signer.managed_key {
            let managed_key_core: ManagedKeyCore = managed_key.into();
            managed_key_core.into()
        } else if let Some(local_key) = signer.local_key {
            let local_key_core: LocalKeyCore<String> = local_key.into();
            local_key_core.into()
        } else if let Some(managed_certificate) = signer.managed_certificate {
            let managed_certificate_core: ManagedCertificateCore = managed_certificate.into();
            managed_certificate_core.into()
        } else if let Some(local_certificate) = signer.local_certificate {
            let local_certificate_core: LocalCertificateCore<String> = local_certificate
                .try_into()
                .map_err(|e: BridgeError| e.to_string())?;
            local_certificate_core.into()
        } else {
            return Err("invalid key provided".to_string());
        };

        builder = builder.with_signer(key);
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
