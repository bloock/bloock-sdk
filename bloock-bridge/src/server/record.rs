use std::{convert::TryInto, sync::Arc};

use async_trait::async_trait;
use bloock_core::{
    client::{self, BloockClient},
    record::builder::{Builder, RecordBuilder},
    record::entity::record::Record as RecordCore,
    AesDecrypter, AesDecrypterArgs, AesEncrypter, AesEncrypterArgs, BloockHttpClient,
    Decrypter as DecrypterCore, EcdsaSigner, EcdsaSignerArgs, EciesDecrypter, EciesDecrypterArgs,
    EciesEncrypter, EciesEncrypterArgs, EciesKeyPair, Encrypter as EncrypterCore, RsaDecrypter,
    RsaDecrypterArgs, RsaEncrypter, RsaEncrypterArgs, RsaKeyPair, Signature as SignatureCore,
};
use serde_json::json;

use super::response_types::ResponseType;
use crate::{
    entity_mappings::config::map_config,
    error::{config_data_error, BridgeError},
    items::{
        BloockServer, DataAvailabilityType, Decrypter, Encrypter, EncryptionAlg,
        EncryptionAlgResponse, Error, GenerateEciesKeyPairRequest, GenerateEciesKeyPairResponse,
        GenerateKeysRequest, GenerateKeysResponse, GenerateRsaKeyPairRequest,
        GenerateRsaKeyPairResponse, Loader, LoaderArgs, PublishRequest, PublishResponse, Publisher,
        Record, RecordBuilderResponse, RecordHash, RecordReceipt, RecordServiceHandler,
        RecordSignatures, SendRecordsRequest, SendRecordsResponse, Signature,
        SignatureCommonNameRequest, SignatureCommonNameResponse, Signer, SignerAlg,
    },
};

impl From<SendRecordsResponse> for ResponseType {
    fn from(res: SendRecordsResponse) -> Self {
        ResponseType::SendRecords(res)
    }
}

impl From<Record> for ResponseType {
    fn from(res: Record) -> Self {
        ResponseType::Record(res)
    }
}

impl From<RecordBuilderResponse> for ResponseType {
    fn from(res: RecordBuilderResponse) -> Self {
        ResponseType::BuildRecord(res)
    }
}

impl From<RecordHash> for ResponseType {
    fn from(res: RecordHash) -> Self {
        ResponseType::GetHash(res)
    }
}

impl From<RecordSignatures> for ResponseType {
    fn from(res: RecordSignatures) -> Self {
        ResponseType::GetSignatures(res)
    }
}

impl From<SignatureCommonNameResponse> for ResponseType {
    fn from(res: SignatureCommonNameResponse) -> Self {
        ResponseType::GetSignatureCommonName(res)
    }
}

impl From<GenerateKeysResponse> for ResponseType {
    fn from(res: GenerateKeysResponse) -> Self {
        ResponseType::GenerateKeys(res)
    }
}

impl From<GenerateRsaKeyPairResponse> for ResponseType {
    fn from(res: GenerateRsaKeyPairResponse) -> Self {
        ResponseType::GenerateRsaKeyPairResponse(res)
    }
}

impl From<GenerateEciesKeyPairResponse> for ResponseType {
    fn from(res: GenerateEciesKeyPairResponse) -> Self {
        ResponseType::GenerateEciesKeyPairResponse(res)
    }
}

impl From<PublishResponse> for ResponseType {
    fn from(res: PublishResponse) -> Self {
        ResponseType::Publish(res)
    }
}

impl From<EncryptionAlgResponse> for ResponseType {
    fn from(res: EncryptionAlgResponse) -> Self {
        ResponseType::EncryptionAlgResponse(res)
    }
}

pub struct RecordServer {}

#[async_trait(?Send)]
impl RecordServiceHandler for RecordServer {
    async fn send_records(&self, req: crate::items::SendRecordsRequest) -> SendRecordsResponse {
        let config_data = match map_config(req.clone().config_data) {
            Ok(config) => config,
            Err(_) => {
                return SendRecordsResponse {
                    records: vec![],
                    error: Some(config_data_error()),
                }
            }
        };

        let client = client::configure(config_data);

        let records = match req
            .clone()
            .records
            .iter()
            .map(|record| record.clone().try_into())
            .collect::<Result<Vec<RecordCore>, BridgeError>>()
        {
            Ok(r) => r,
            Err(e) => return SendRecordsResponse::new_error(&client, e.to_string(), &req).await,
        };
        let receipts = match client.send_records(records).await {
            Ok(receipts) => receipts,
            Err(e) => return SendRecordsResponse::new_error(&client, e.to_string(), &req).await,
        };

        let response = receipts
            .iter()
            .map(|receipt| receipt.clone().into())
            .collect();

        SendRecordsResponse::new_success(&client, response, &req).await
    }

    async fn build_record_from_string(
        &self,
        req: crate::items::RecordBuilderFromStringRequest,
    ) -> RecordBuilderResponse {
        let req_name = BloockServer::RecordServiceBuildRecordFromString.as_str();

        let config_data = match map_config(req.config_data) {
            Ok(config) => config,
            Err(_) => {
                return RecordBuilderResponse {
                    record: None,
                    error: Some(config_data_error()),
                }
            }
        };

        let client = client::configure(config_data.clone());

        let builder = match RecordBuilder::from_string(req.payload) {
            Ok(builder) => builder,
            Err(e) => {
                return RecordBuilderResponse::new_error(&client, req_name, e.to_string()).await
            }
        };
        build_record(
            builder,
            req_name,
            &client,
            req.signer,
            req.encrypter,
            req.decrypter,
        )
        .await
    }

    async fn build_record_from_hex(
        &self,
        req: crate::items::RecordBuilderFromHexRequest,
    ) -> RecordBuilderResponse {
        let req_name = BloockServer::RecordServiceBuildRecordFromHex.as_str();

        let config_data = match map_config(req.config_data) {
            Ok(config) => config,
            Err(_) => {
                return RecordBuilderResponse {
                    record: None,
                    error: Some(config_data_error()),
                }
            }
        };

        let client = client::configure(config_data.clone());

        let builder = match RecordBuilder::from_hex(req.payload) {
            Ok(builder) => builder,
            Err(e) => {
                return RecordBuilderResponse::new_error(&client, req_name, e.to_string()).await
            }
        };
        build_record(
            builder,
            req_name,
            &client,
            req.signer,
            req.encrypter,
            req.decrypter,
        )
        .await
    }

    async fn build_record_from_json(
        &self,
        req: crate::items::RecordBuilderFromJsonRequest,
    ) -> RecordBuilderResponse {
        let req_name = BloockServer::RecordServiceBuildRecordFromJson.as_str();

        let config_data = match map_config(req.config_data) {
            Ok(config) => config,
            Err(_) => {
                return RecordBuilderResponse {
                    record: None,
                    error: Some(config_data_error()),
                }
            }
        };

        let client = client::configure(config_data.clone());

        let builder = match RecordBuilder::from_json(req.payload) {
            Ok(builder) => builder,
            Err(e) => {
                return RecordBuilderResponse::new_error(&client, req_name, e.to_string()).await
            }
        };
        build_record(
            builder,
            req_name,
            &client,
            req.signer,
            req.encrypter,
            req.decrypter,
        )
        .await
    }

    async fn build_record_from_file(
        &self,
        req: crate::items::RecordBuilderFromFileRequest,
    ) -> RecordBuilderResponse {
        let req_name = BloockServer::RecordServiceBuildRecordFromFile.as_str();

        let config_data = match map_config(req.config_data) {
            Ok(config) => config,
            Err(_) => {
                return RecordBuilderResponse {
                    record: None,
                    error: Some(config_data_error()),
                }
            }
        };

        let client = client::configure(config_data.clone());

        let builder = match RecordBuilder::from_file(req.payload) {
            Ok(builder) => builder,
            Err(e) => {
                return RecordBuilderResponse::new_error(&client, req_name, e.to_string()).await
            }
        };
        build_record(
            builder,
            req_name,
            &client,
            req.signer,
            req.encrypter,
            req.decrypter,
        )
        .await
    }

    async fn build_record_from_bytes(
        &self,
        req: crate::items::RecordBuilderFromBytesRequest,
    ) -> RecordBuilderResponse {
        let req_name = BloockServer::RecordServiceBuildRecordFromBytes.as_str();

        let config_data = match map_config(req.config_data) {
            Ok(config) => config,
            Err(_) => {
                return RecordBuilderResponse {
                    record: None,
                    error: Some(config_data_error()),
                }
            }
        };

        let client = client::configure(config_data.clone());

        let builder = match RecordBuilder::from_bytes(req.payload) {
            Ok(builder) => builder,
            Err(e) => {
                return RecordBuilderResponse::new_error(&client, req_name, e.to_string()).await
            }
        };
        build_record(
            builder,
            req_name,
            &client,
            req.signer,
            req.encrypter,
            req.decrypter,
        )
        .await
    }

    async fn build_record_from_record(
        &self,
        req: crate::items::RecordBuilderFromRecordRequest,
    ) -> RecordBuilderResponse {
        let req_name = BloockServer::RecordServiceBuildRecordFromRecord.as_str();

        let config_data = match map_config(req.config_data) {
            Ok(config) => config,
            Err(_) => {
                return RecordBuilderResponse {
                    record: None,
                    error: Some(config_data_error()),
                }
            }
        };

        let client = client::configure(config_data.clone());

        let payload: RecordCore = match req.payload {
            Some(p) => match p.try_into() {
                Ok(p) => p,
                Err(e) => {
                    return RecordBuilderResponse::new_error(&client, req_name, e.to_string()).await
                }
            },
            None => {
                return RecordBuilderResponse::new_error(
                    &client,
                    req_name,
                    "no record payload found".to_string(),
                )
                .await
            }
        };
        let builder = match RecordBuilder::from_record(payload) {
            Ok(builder) => builder,
            Err(e) => {
                return RecordBuilderResponse::new_error(&client, req_name, e.to_string()).await
            }
        };

        build_record(
            builder,
            req_name,
            &client,
            req.signer,
            req.encrypter,
            req.decrypter,
        )
        .await
    }

    async fn build_record_from_loader(
        &self,
        req: crate::items::RecordBuilderFromLoaderRequest,
    ) -> RecordBuilderResponse {
        let req_name = BloockServer::RecordServiceBuildRecordFromLoader.as_str();

        let config_data = match map_config(req.config_data) {
            Ok(config) => config,
            Err(_) => {
                return RecordBuilderResponse {
                    record: None,
                    error: Some(config_data_error()),
                }
            }
        };

        let client = client::configure(config_data.clone());

        let req_loader: Loader = match req.loader {
            Some(p) => p,
            None => {
                return RecordBuilderResponse::new_error(
                    &client,
                    req_name,
                    "invalid loader provided".to_string(),
                )
                .await
            }
        };

        let loader_args: LoaderArgs = match req_loader.args {
            Some(p) => p,
            None => {
                return RecordBuilderResponse::new_error(
                    &client,
                    req_name,
                    "invalid loader provided".to_string(),
                )
                .await
            }
        };

        let http = BloockHttpClient::new(config_data.get_config().api_key);
        let service =
            bloock_core::publish::configure(Arc::new(http), Arc::new(config_data.clone()));

        let result = match DataAvailabilityType::from_i32(req_loader.r#type) {
            Some(DataAvailabilityType::Hosted) => service.retrieve_hosted(loader_args.hash).await,
            Some(DataAvailabilityType::Ipfs) => service.retrieve_ipfs(loader_args.hash).await,
            None => {
                return RecordBuilderResponse::new_error(
                    &client,
                    req_name,
                    "invalid loader provided".to_string(),
                )
                .await
            }
        };

        let payload = match result {
            Ok(p) => p,
            Err(e) => {
                return RecordBuilderResponse::new_error(&client, req_name, e.to_string()).await
            }
        };

        let builder = match RecordBuilder::from_file(payload) {
            Ok(builder) => builder,
            Err(e) => {
                return RecordBuilderResponse::new_error(&client, req_name, e.to_string()).await
            }
        };

        build_record(
            builder,
            req_name,
            &client,
            req.signer,
            req.encrypter,
            req.decrypter,
        )
        .await
    }

    async fn get_hash(&self, req: Record) -> RecordHash {
        let config_data = match map_config(req.clone().config_data) {
            Ok(config) => config,
            Err(_) => {
                return RecordHash {
                    hash: "".to_string(),
                    error: Some(config_data_error()),
                }
            }
        };

        let client = client::configure(config_data);

        let record: RecordCore = match req.try_into() {
            Ok(record) => record,
            Err(e) => {
                return RecordHash::new_error(&client, e.to_string()).await;
            }
        };
        let hash = record.get_hash();
        RecordHash::new_success(&client, hash).await
    }

    async fn get_signature_common_name(
        &self,
        req: SignatureCommonNameRequest,
    ) -> SignatureCommonNameResponse {
        let config_data = match map_config(req.clone().config_data) {
            Ok(config) => config,
            Err(_) => {
                return SignatureCommonNameResponse {
                    common_name: "".to_string(),
                    error: Some(config_data_error()),
                }
            }
        };

        let client = client::configure(config_data);

        let signature: SignatureCore = match req.signature {
            Some(signature) => match signature.try_into() {
                Ok(signature) => signature,
                Err(err) => {
                    return SignatureCommonNameResponse::new_error(&client, err.to_string()).await
                }
            },
            None => {
                return SignatureCommonNameResponse::new_error(
                    &client,
                    "invalid signature provided".to_string(),
                )
                .await;
            }
        };

        let common_name = match signature.get_common_name() {
            Ok(name) => name,
            Err(err) => {
                return SignatureCommonNameResponse::new_error(&client, err.to_string()).await
            }
        };

        SignatureCommonNameResponse::new_success(&client, common_name).await
    }

    async fn get_signatures(&self, req: Record) -> RecordSignatures {
        let config_data = match map_config(req.clone().config_data) {
            Ok(config) => config,
            Err(_) => {
                return RecordSignatures {
                    signatures: vec![],
                    error: Some(config_data_error()),
                }
            }
        };

        let client = client::configure(config_data);

        let record: RecordCore = match req.try_into() {
            Ok(record) => record,
            Err(e) => {
                return RecordSignatures::new_error(&client, e.to_string()).await;
            }
        };

        let signatures = match record.get_signatures() {
            Some(signatures) => {
                let mut result: Vec<Signature> = vec![];
                for signature in signatures.iter() {
                    result.push(match signature.clone().try_into() {
                        Ok(res) => res,
                        Err(err) => {
                            return RecordSignatures::new_error(&client, err.to_string()).await
                        }
                    });
                }
                result
            }
            None => vec![],
        };

        RecordSignatures::new_success(&client, signatures).await
    }

    async fn generate_keys(&self, req: GenerateKeysRequest) -> GenerateKeysResponse {
        let config_data = match map_config(req.clone().config_data) {
            Ok(config) => config,
            Err(_) => {
                return GenerateKeysResponse {
                    private_key: "".to_string(),
                    public_key: "".to_string(),
                    error: Some(config_data_error()),
                }
            }
        };

        let client = client::configure(config_data);
        let (private_key, public_key) = match EcdsaSigner::generate_keys() {
            Ok(p) => p,
            Err(e) => return GenerateKeysResponse::new_error(&client, e.to_string()).await,
        };

        GenerateKeysResponse::new_success(&client, private_key, public_key).await
    }

    async fn generate_rsa_key_pair(
        &self,
        req: GenerateRsaKeyPairRequest,
    ) -> GenerateRsaKeyPairResponse {
        let config_data = match map_config(req.clone().config_data) {
            Ok(config) => config,
            Err(_) => {
                return GenerateRsaKeyPairResponse {
                    private_key: "".to_string(),
                    public_key: "".to_string(),
                    error: Some(config_data_error()),
                }
            }
        };

        let client = client::configure(config_data);

        let keypair = match bloock_core::generate_rsa_key_pair() {
            Ok(keypair) => keypair,
            Err(e) => return GenerateRsaKeyPairResponse::new_error(&client, e.to_string()).await,
        };

        GenerateRsaKeyPairResponse::new_success(&client, keypair).await
    }

    async fn generate_ecies_key_pair(
        &self,
        req: GenerateEciesKeyPairRequest,
    ) -> GenerateEciesKeyPairResponse {
        let config_data = match map_config(req.clone().config_data) {
            Ok(config) => config,
            Err(_) => {
                return GenerateEciesKeyPairResponse {
                    private_key: "".to_string(),
                    public_key: "".to_string(),
                    error: Some(config_data_error()),
                }
            }
        };

        let client = client::configure(config_data);

        let keypair = bloock_core::generate_ecies_key_pair();

        GenerateEciesKeyPairResponse::new_success(&client, keypair).await
    }

    async fn publish(&self, req: PublishRequest) -> PublishResponse {
        let config_data = match map_config(req.clone().config_data) {
            Ok(config) => config,
            Err(_) => {
                return PublishResponse {
                    hash: "".to_string(),
                    error: Some(config_data_error()),
                }
            }
        };

        let client = client::configure(config_data.clone());

        let req_record = match req.clone().record {
            Some(p) => p,
            None => {
                return PublishResponse::new_error(&client, "no record provided".to_string(), &req)
                    .await
            }
        };
        let record: RecordCore = match req_record.try_into() {
            Ok(r) => r,
            Err(e) => return PublishResponse::new_error(&client, e.to_string(), &req).await,
        };

        let req_publisher: Publisher = match req.clone().publisher {
            Some(p) => p,
            None => {
                return PublishResponse::new_error(
                    &client,
                    "invalid publisher provided".to_string(),
                    &req,
                )
                .await
            }
        };

        let http = BloockHttpClient::new(config_data.get_config().api_key);
        let service = bloock_core::publish::configure(Arc::new(http), Arc::new(config_data));

        let result = match DataAvailabilityType::from_i32(req_publisher.r#type) {
            Some(DataAvailabilityType::Hosted) => service.publish_hosted(record).await,
            Some(DataAvailabilityType::Ipfs) => service.publish_ipfs(record).await,
            None => {
                return PublishResponse::new_error(
                    &client,
                    "invalid publisher provided".to_string(),
                    &req,
                )
                .await
            }
        };

        let hash = match result {
            Ok(h) => h,
            Err(e) => return PublishResponse::new_error(&client, e.to_string(), &req).await,
        };

        PublishResponse::new_success(&client, hash, &req).await
    }

    async fn get_encryption_alg(&self, req: Record) -> EncryptionAlgResponse {
        let config_data = match map_config(req.clone().config_data) {
            Ok(config) => config,
            Err(_) => {
                return EncryptionAlgResponse {
                    alg: None,
                    error: Some(config_data_error()),
                }
            }
        };

        let client = client::configure(config_data);

        let record: RecordCore = match req.try_into() {
            Ok(record) => record,
            Err(e) => {
                return EncryptionAlgResponse::new_error(&client, e.to_string()).await;
            }
        };

        match record.is_encrypted() {
            true => match record.get_encryption_alg() {
                Ok(alg) => EncryptionAlgResponse::new_success(&client, alg.into()).await,
                Err(err) => EncryptionAlgResponse::new_error(&client, err.to_string()).await,
            },
            false => EncryptionAlgResponse::new_error(&client, "Record is not encrypted".to_string()).await,
        }
    }
}

async fn build_record(
    mut builder: Builder,
    req_name: &str,
    client: &BloockClient,
    signer: Option<Signer>,
    encrypter: Option<Encrypter>,
    decrypter: Option<Decrypter>,
) -> RecordBuilderResponse {
    if let Some(signer) = signer {
        let signer = match SignerAlg::from_i32(signer.alg) {
            Some(SignerAlg::Es256k) => {
                let signer_arguments = match signer.args {
                    Some(signer_arguments) => signer_arguments,
                    None => {
                        return RecordBuilderResponse::new_error(
                            client,
                            req_name,
                            "no arguments provided".to_string(),
                        )
                        .await
                    }
                };
                let private_key = match signer_arguments.private_key {
                    Some(private_key) => private_key,
                    None => {
                        return RecordBuilderResponse::new_error(
                            client,
                            req_name,
                            "no private key provided".to_string(),
                        )
                        .await
                    }
                };

                EcdsaSigner::new(EcdsaSignerArgs::new(
                    &private_key,
                    signer_arguments.common_name,
                ))
            }
            None => {
                return RecordBuilderResponse::new_error(
                    client,
                    req_name,
                    "invalid signer provided".to_string(),
                )
                .await
            }
        };
        builder = builder.with_signer(signer);
    }

    if let Some(encrypt) = encrypter {
        let args = match encrypt.args {
            Some(encrypter_arguments) => encrypter_arguments,
            None => {
                return RecordBuilderResponse::new_error(
                    client,
                    req_name,
                    "no arguments provided".to_string(),
                )
                .await
            }
        };

        let encrypter: Box<dyn EncrypterCore> = match EncryptionAlg::from_i32(encrypt.alg) {
            Some(alg) => match alg {
                EncryptionAlg::A256gcm => AesEncrypter::new(AesEncrypterArgs::new(&args.key, &[])),
                EncryptionAlg::Rsa => RsaEncrypter::new(RsaEncrypterArgs::new(&args.key)),
                EncryptionAlg::Ecies => EciesEncrypter::new(EciesEncrypterArgs::new(args.key)),
            },
            None => {
                return RecordBuilderResponse::new_error(
                    client,
                    req_name,
                    "invalid encrypter provided".to_string(),
                )
                .await
            }
        };
        builder = builder.with_encrypter(encrypter);
    }

    if let Some(decrypt) = decrypter {
        let args = match decrypt.args {
            Some(decrypter_arguments) => decrypter_arguments,
            None => {
                return RecordBuilderResponse::new_error(
                    client,
                    req_name,
                    "no arguments provided".to_string(),
                )
                .await
            }
        };

        let decrypter: Box<dyn DecrypterCore> = match EncryptionAlg::from_i32(decrypt.alg) {
            Some(alg) => match alg {
                EncryptionAlg::A256gcm => AesDecrypter::new(AesDecrypterArgs::new(&args.key, &[])),
                EncryptionAlg::Rsa => RsaDecrypter::new(RsaDecrypterArgs::new(&args.key)),
                EncryptionAlg::Ecies => EciesDecrypter::new(EciesDecrypterArgs::new(args.key)),
            },
            None => {
                return RecordBuilderResponse::new_error(
                    client,
                    req_name,
                    "invalid decrypter provided".to_string(),
                )
                .await
            }
        };

        builder = builder.with_decrypter(decrypter);
    }

    let record: Record = match builder.build() {
        Ok(record) => match record.try_into() {
            Ok(record) => record,
            Err(e) => {
                return RecordBuilderResponse::new_error(client, req_name, e.to_string()).await
            }
        },
        Err(e) => return RecordBuilderResponse::new_error(client, req_name, e.to_string()).await,
    };

    RecordBuilderResponse::new_success(client, req_name, record).await
}

impl RecordBuilderResponse {
    async fn new_success(
        client: &BloockClient,
        req_name: &str,
        record: Record,
    ) -> RecordBuilderResponse {
        Self::send_event(client, req_name, None).await;

        RecordBuilderResponse {
            record: Some(record),
            error: None,
        }
    }

    async fn new_error(
        client: &BloockClient,
        req_name: &str,
        err: String,
    ) -> RecordBuilderResponse {
        Self::send_event(client, req_name, Some(&err)).await;

        RecordBuilderResponse {
            record: None,
            error: Some(Error {
                kind: BridgeError::RecordError.to_string(),
                message: err,
            }),
        }
    }

    async fn send_event(client: &BloockClient, req_name: &str, error: Option<&str>) {
        let event_attr = json!({});

        let error = error.map(|_| BridgeError::RecordError.to_string());

        client.send_event(req_name, error, Some(event_attr)).await;
    }
}

impl SendRecordsResponse {
    async fn new_success(
        client: &BloockClient,
        receipts: Vec<RecordReceipt>,
        req: &SendRecordsRequest,
    ) -> SendRecordsResponse {
        Self::send_event(client, None, req).await;

        SendRecordsResponse {
            records: receipts,
            error: None,
        }
    }

    async fn new_error(
        client: &BloockClient,
        err: String,
        req: &SendRecordsRequest,
    ) -> SendRecordsResponse {
        Self::send_event(client, Some(&err), req).await;

        SendRecordsResponse {
            records: vec![],
            error: Some(Error {
                kind: BridgeError::RecordError.to_string(),
                message: err,
            }),
        }
    }

    async fn send_event(client: &BloockClient, error: Option<&str>, req: &SendRecordsRequest) {
        let event_attr = json!({
            "records_size": req.records.len()
        });

        let error = error.map(|_| BridgeError::RecordError.to_string());

        client
            .send_event(
                BloockServer::RecordServiceSendRecords.as_str(),
                error,
                Some(event_attr),
            )
            .await;
    }
}

impl PublishResponse {
    async fn new_success(
        client: &BloockClient,
        hash: String,
        req: &PublishRequest,
    ) -> PublishResponse {
        Self::send_event(client, None, req).await;

        PublishResponse { hash, error: None }
    }

    async fn new_error(
        client: &BloockClient,
        err: String,
        req: &PublishRequest,
    ) -> PublishResponse {
        Self::send_event(client, Some(&err), req).await;

        PublishResponse {
            hash: "".to_string(),
            error: Some(Error {
                kind: BridgeError::PublishError.to_string(),
                message: err,
            }),
        }
    }

    async fn send_event(client: &BloockClient, error: Option<&str>, _req: &PublishRequest) {
        let event_attr = json!({});

        let error = error.map(|_| BridgeError::PublishError.to_string());

        client
            .send_event(
                BloockServer::RecordServicePublish.as_str(),
                error,
                Some(event_attr),
            )
            .await;
    }
}

impl RecordHash {
    async fn new_success(client: &BloockClient, hash: String) -> RecordHash {
        Self::send_event(client, None).await;

        RecordHash { hash, error: None }
    }

    async fn new_error(client: &BloockClient, err: String) -> RecordHash {
        Self::send_event(client, Some(&err)).await;

        RecordHash {
            hash: "".to_string(),
            error: Some(Error {
                kind: BridgeError::RecordError.to_string(),
                message: err,
            }),
        }
    }

    async fn send_event(client: &BloockClient, error: Option<&str>) {
        let event_attr = json!({});

        let error = error.map(|_| BridgeError::RecordError.to_string());

        client
            .send_event(
                BloockServer::RecordServiceGetHash.as_str(),
                error,
                Some(event_attr),
            )
            .await;
    }
}

impl RecordSignatures {
    async fn new_success(client: &BloockClient, signatures: Vec<Signature>) -> RecordSignatures {
        Self::send_event(client, None).await;

        RecordSignatures {
            signatures,
            error: None,
        }
    }

    async fn new_error(client: &BloockClient, err: String) -> RecordSignatures {
        Self::send_event(client, Some(&err)).await;

        RecordSignatures {
            signatures: vec![],
            error: Some(Error {
                kind: BridgeError::RecordError.to_string(),
                message: err,
            }),
        }
    }

    async fn send_event(client: &BloockClient, error: Option<&str>) {
        let event_attr = json!({});

        let error = error.map(|_| BridgeError::RecordError.to_string());

        client
            .send_event(
                BloockServer::RecordServiceGetSignatures.as_str(),
                error,
                Some(event_attr),
            )
            .await;
    }
}

impl GenerateKeysResponse {
    async fn new_success(
        client: &BloockClient,
        private_key: String,
        public_key: String,
    ) -> GenerateKeysResponse {
        Self::send_event(client, None).await;

        GenerateKeysResponse {
            private_key,
            public_key,
            error: None,
        }
    }

    async fn new_error(client: &BloockClient, err: String) -> GenerateKeysResponse {
        Self::send_event(client, Some(&err)).await;

        GenerateKeysResponse {
            private_key: "".to_string(),
            public_key: "".to_string(),
            error: Some(Error {
                kind: BridgeError::RecordError.to_string(),
                message: err,
            }),
        }
    }

    async fn send_event(client: &BloockClient, error: Option<&str>) {
        let event_attr = json!({});

        let error = error.map(|_| BridgeError::RecordError.to_string());

        client
            .send_event(
                BloockServer::RecordServiceGenerateKeys.as_str(),
                error,
                Some(event_attr),
            )
            .await;
    }
}

impl GenerateRsaKeyPairResponse {
    async fn new_success(client: &BloockClient, keypair: RsaKeyPair) -> GenerateRsaKeyPairResponse {
        Self::send_event(client, None).await;

        GenerateRsaKeyPairResponse {
            private_key: keypair.private_key,
            public_key: keypair.public_key,
            error: None,
        }
    }

    async fn new_error(client: &BloockClient, err: String) -> GenerateRsaKeyPairResponse {
        Self::send_event(client, Some(&err)).await;

        GenerateRsaKeyPairResponse {
            private_key: "".to_string(),
            public_key: "".to_string(),
            error: Some(Error {
                kind: BridgeError::RecordError.to_string(),
                message: err,
            }),
        }
    }

    async fn send_event(client: &BloockClient, error: Option<&str>) {
        let event_attr = json!({});

        let error = error.map(|_| BridgeError::RecordError.to_string());

        client
            .send_event(
                BloockServer::RecordServiceGenerateRsaKeyPair.as_str(),
                error,
                Some(event_attr),
            )
            .await;
    }
}

impl GenerateEciesKeyPairResponse {
    async fn new_success(
        client: &BloockClient,
        keypair: EciesKeyPair,
    ) -> GenerateEciesKeyPairResponse {
        Self::send_event(client, None).await;

        GenerateEciesKeyPairResponse {
            private_key: keypair.private_key,
            public_key: keypair.public_key,
            error: None,
        }
    }

    async fn send_event(client: &BloockClient, error: Option<&str>) {
        let event_attr = json!({});

        let error = error.map(|_| BridgeError::RecordError.to_string());

        client
            .send_event(
                BloockServer::RecordServiceGenerateEciesKeyPair.as_str(),
                error,
                Some(event_attr),
            )
            .await;
    }
}

impl SignatureCommonNameResponse {
    async fn new_success(
        client: &BloockClient,
        common_name: String,
    ) -> SignatureCommonNameResponse {
        Self::send_event(client, None).await;

        SignatureCommonNameResponse {
            common_name,
            error: None,
        }
    }

    async fn new_error(client: &BloockClient, err: String) -> SignatureCommonNameResponse {
        Self::send_event(client, Some(&err)).await;

        SignatureCommonNameResponse {
            common_name: "".to_string(),
            error: Some(Error {
                kind: BridgeError::RecordError.to_string(),
                message: err,
            }),
        }
    }

    async fn send_event(client: &BloockClient, error: Option<&str>) {
        let event_attr = json!({});

        let error = error.map(|_| BridgeError::RecordError.to_string());

        client
            .send_event(
                BloockServer::RecordServiceGetSignatureCommonName.as_str(),
                error,
                Some(event_attr),
            )
            .await;
    }
}

impl EncryptionAlgResponse {
    async fn new_success(client: &BloockClient, alg: EncryptionAlg) -> EncryptionAlgResponse {
        Self::send_event(client, None).await;

        EncryptionAlgResponse {
            alg: Some(alg.into()),
            error: None,
        }
    }

    async fn new_error(client: &BloockClient, err: String) -> EncryptionAlgResponse {
        Self::send_event(client, Some(&err)).await;

        EncryptionAlgResponse {
            alg: None,
            error: Some(Error {
                kind: BridgeError::RecordError.to_string(),
                message: err,
            }),
        }
    }

    async fn send_event(client: &BloockClient, error: Option<&str>) {
        let event_attr = json!({});

        let error = error.map(|_| BridgeError::RecordError.to_string());

        client
            .send_event(
                BloockServer::RecordServiceGetEncryptionAlg.as_str(),
                error,
                Some(event_attr),
            )
            .await;
    }
}
