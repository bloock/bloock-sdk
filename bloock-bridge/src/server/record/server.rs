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
    integrity::entity::proof::Proof,
    record::entity::record::Record as RecordCore,
    record::{builder::Builder, service::RecordService},
    AesDecrypter, AesDecrypterArgs, AesEncrypter, AesEncrypterArgs, Decrypter as DecrypterCore,
    EcdsaSigner, EcdsaSignerArgs, EciesDecrypter, EciesDecrypterArgs, EciesEncrypter,
    EciesEncrypterArgs, Encrypter as EncrypterCore, EnsSigner, EnsSignerArgs, RsaDecrypter,
    RsaDecrypterArgs, RsaEncrypter, RsaEncrypterArgs, Signer as SignerCore,
};
use std::convert::TryInto;

pub struct RecordServer {}

#[async_trait(?Send)]
impl RecordServiceHandler for RecordServer {
    async fn build_record_from_string(
        &self,
        req: &crate::items::RecordBuilderFromStringRequest,
    ) -> Result<RecordBuilderResponse, String> {
        let builder = RecordService::from_string(req.clone().payload).map_err(|e| e.to_string())?;
        match build_record(
            builder,
            req.clone().signer,
            req.clone().encrypter,
            req.clone().decrypter,
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
        let builder = RecordService::from_hex(req.clone().payload).map_err(|e| e.to_string())?;

        match build_record(
            builder,
            req.clone().signer,
            req.clone().encrypter,
            req.clone().decrypter,
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
        let builder = RecordService::from_json(req.clone().payload).map_err(|e| e.to_string())?;

        match build_record(
            builder,
            req.clone().signer,
            req.clone().encrypter,
            req.clone().decrypter,
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
        let builder = RecordService::from_file(req.clone().payload).map_err(|e| e.to_string())?;

        match build_record(
            builder,
            req.clone().signer,
            req.clone().encrypter,
            req.clone().decrypter,
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
        let builder = RecordService::from_bytes(req.clone().payload).map_err(|e| e.to_string())?;

        match build_record(
            builder,
            req.clone().signer,
            req.clone().encrypter,
            req.clone().decrypter,
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
) -> Result<Record, String> {
    if let Some(signer) = signer {
        let signer_alg = SignerAlg::from_i32(signer.alg);
        let signer: Box<dyn SignerCore> = match signer_alg {
            Some(SignerAlg::Es256k) => {
                let signer_arguments = signer
                    .args
                    .ok_or_else(|| "no arguments provided".to_string())?;

                let private_key = signer_arguments
                    .private_key
                    .ok_or_else(|| "no private key provided".to_string())?;

                EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                    &private_key,
                    signer_arguments.common_name,
                ))
            }
            Some(SignerAlg::Ens) => {
                let signer_arguments = signer
                    .args
                    .ok_or_else(|| "no arguments provided".to_string())?;

                let private_key = signer_arguments
                    .private_key
                    .ok_or_else(|| "no private key provided".to_string())?;

                EnsSigner::new_boxed(EnsSignerArgs::new(&private_key))
            }
            None => return Err("invalid signer provided".to_string()),
        };
        builder = builder.with_signer(signer);
    }

    if let Some(encrypt) = encrypter {
        let args = encrypt
            .args
            .ok_or_else(|| "no arguments provided".to_string())?;

        let encrypter: Box<dyn EncrypterCore> = match EncryptionAlg::from_i32(encrypt.alg) {
            Some(alg) => match alg {
                EncryptionAlg::A256gcm => AesEncrypter::new(AesEncrypterArgs::new(&args.key, &[])),
                EncryptionAlg::Rsa => RsaEncrypter::new(RsaEncrypterArgs::new(&args.key)),
                EncryptionAlg::Ecies => EciesEncrypter::new(EciesEncrypterArgs::new(args.key)),
            },
            None => return Err("invalid encrypter provided".to_string()),
        };
        builder = builder.with_encrypter(encrypter);
    }

    if let Some(decrypt) = decrypter {
        let args = match decrypt.args {
            Some(decrypter_arguments) => decrypter_arguments,
            None => return Err("no arguments provided".to_string()),
        };

        let decrypter: Box<dyn DecrypterCore> = match EncryptionAlg::from_i32(decrypt.alg) {
            Some(alg) => match alg {
                EncryptionAlg::A256gcm => AesDecrypter::new(AesDecrypterArgs::new(&args.key, &[])),
                EncryptionAlg::Rsa => RsaDecrypter::new(RsaDecrypterArgs::new(&args.key)),
                EncryptionAlg::Ecies => EciesDecrypter::new(EciesDecrypterArgs::new(args.key)),
            },
            None => return Err("invalid decrypter provided".to_string()),
        };

        builder = builder.with_decrypter(decrypter);
    }

    match builder.build() {
        Ok(record) => record.try_into().map_err(|e: BridgeError| e.to_string()),
        Err(e) => Err(e.to_string()),
    }
}
