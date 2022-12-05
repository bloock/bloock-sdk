use std::{convert::TryInto, sync::Arc};

use async_trait::async_trait;
use bloock_core::{
    client,
    error::BloockError,
    record::builder::{Builder, RecordBuilder},
    record::entity::record::Record as RecordCore,
    AesDecrypter, AesDecrypterArgs, AesEncrypter, AesEncrypterArgs, BloockHttpClient,
    Decrypter as DecrypterCore, EcsdaSigner, EcsdaSignerArgs, Encrypter as EncrypterCore,
    RsaDecrypter, RsaDecrypterArgs, RsaEncrypter, RsaEncrypterArgs,
};

use super::response_types::ResponseType;
use crate::{
    entity_mappings::config::map_config,
    error::{config_data_error, BridgeError},
    items::{
        DataAvailabilityType, Decrypter, Encrypter, EncryptionAlg, Error, GenerateKeysRequest,
        GenerateKeysResponse, GenerateRsaKeyPairRequest, GenerateRsaKeyPairResponse, Loader,
        LoaderArgs, PublishRequest, PublishResponse, Publisher, Record, RecordBuilderResponse,
        RecordHash, RecordServiceHandler, RecordSignatures, SendRecordsResponse, Signature, Signer,
        SignerAlg,
    },
};

fn record_builder_response_error(message: String) -> RecordBuilderResponse {
    RecordBuilderResponse {
        record: None,
        error: Some(Error {
            kind: BridgeError::RecordError.to_string(),
            message,
        }),
    }
}

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

impl From<PublishResponse> for ResponseType {
    fn from(res: PublishResponse) -> Self {
        ResponseType::Publish(res)
    }
}

pub struct RecordServer {}

#[async_trait(?Send)]
impl RecordServiceHandler for RecordServer {
    async fn send_records(&self, req: crate::items::SendRecordsRequest) -> SendRecordsResponse {
        let config_data = match map_config(req.config_data) {
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
            .records
            .iter()
            .map(|record| record.try_into())
            .collect::<Result<Vec<RecordCore>, BloockError>>()
        {
            Ok(r) => r,
            Err(e) => {
                return SendRecordsResponse {
                    records: vec![],
                    error: Some(Error {
                        kind: BridgeError::RecordError.to_string(),
                        message: e.to_string(),
                    }),
                }
            }
        };
        let receipts = match client.send_records(records).await {
            Ok(receipts) => receipts,
            Err(e) => {
                return SendRecordsResponse {
                    records: vec![],
                    error: Some(Error {
                        kind: BridgeError::RecordError.to_string(),
                        message: e.to_string(),
                    }),
                };
            }
        };

        SendRecordsResponse {
            records: receipts
                .iter()
                .map(|receipt| receipt.clone().into())
                .collect(),
            error: None,
        }
    }

    async fn build_record_from_string(
        &self,
        req: crate::items::RecordBuilderFromStringRequest,
    ) -> RecordBuilderResponse {
        let builder = match RecordBuilder::from_string(req.payload) {
            Ok(builder) => builder,
            Err(e) => {
                return RecordBuilderResponse {
                    record: None,
                    error: Some(Error {
                        kind: BridgeError::RecordError.to_string(),
                        message: e.to_string(),
                    }),
                }
            }
        };
        build_record(builder, req.signer, req.encrypter, req.decrypter)
    }

    async fn build_record_from_hex(
        &self,
        req: crate::items::RecordBuilderFromHexRequest,
    ) -> RecordBuilderResponse {
        let builder = match RecordBuilder::from_hex(req.payload) {
            Ok(builder) => builder,
            Err(e) => return record_builder_response_error(e.to_string()),
        };
        build_record(builder, req.signer, req.encrypter, req.decrypter)
    }

    async fn build_record_from_json(
        &self,
        req: crate::items::RecordBuilderFromJsonRequest,
    ) -> RecordBuilderResponse {
        let builder = match RecordBuilder::from_json(req.payload) {
            Ok(builder) => builder,
            Err(e) => return record_builder_response_error(e.to_string()),
        };
        build_record(builder, req.signer, req.encrypter, req.decrypter)
    }

    async fn build_record_from_file(
        &self,
        req: crate::items::RecordBuilderFromFileRequest,
    ) -> RecordBuilderResponse {
        let builder = match RecordBuilder::from_file(req.payload) {
            Ok(builder) => builder,
            Err(e) => {
                return RecordBuilderResponse {
                    record: None,
                    error: Some(Error {
                        kind: BridgeError::RecordError.to_string(),
                        message: e.to_string(),
                    }),
                }
            }
        };
        build_record(builder, req.signer, req.encrypter, req.decrypter)
    }

    async fn build_record_from_bytes(
        &self,
        req: crate::items::RecordBuilderFromBytesRequest,
    ) -> RecordBuilderResponse {
        let builder = match RecordBuilder::from_bytes(req.payload) {
            Ok(builder) => builder,
            Err(e) => {
                return RecordBuilderResponse {
                    record: None,
                    error: Some(Error {
                        kind: BridgeError::RecordError.to_string(),
                        message: e.to_string(),
                    }),
                }
            }
        };
        build_record(builder, req.signer, req.encrypter, req.decrypter)
    }

    async fn build_record_from_record(
        &self,
        req: crate::items::RecordBuilderFromRecordRequest,
    ) -> RecordBuilderResponse {
        let payload: RecordCore = match req.payload {
            Some(p) => match p.try_into() {
                Ok(p) => p,
                Err(e) => {
                    return RecordBuilderResponse {
                        record: None,
                        error: Some(Error {
                            kind: BridgeError::RecordError.to_string(),
                            message: e.to_string(),
                        }),
                    }
                }
            },
            None => {
                return RecordBuilderResponse {
                    record: None,
                    error: Some(Error {
                        kind: BridgeError::RecordError.to_string(),
                        message: "no record payload found".to_string(),
                    }),
                }
            }
        };
        let builder = match RecordBuilder::from_record(payload) {
            Ok(builder) => builder,
            Err(e) => return record_builder_response_error(e.to_string()),
        };
        build_record(builder, req.signer, req.encrypter, req.decrypter)
    }

    async fn build_record_from_loader(
        &self,
        req: crate::items::RecordBuilderFromLoaderRequest,
    ) -> RecordBuilderResponse {
        let config_data = match map_config(req.config_data) {
            Ok(config) => config,
            Err(_) => {
                return RecordBuilderResponse {
                    record: None,
                    error: Some(config_data_error()),
                }
            }
        };

        let req_loader: Loader = match req.loader {
            Some(p) => p,
            None => {
                return RecordBuilderResponse {
                    record: None,
                    error: Some(Error {
                        kind: BridgeError::RecordError.to_string(),
                        message: "invalid loader provided".to_string(),
                    }),
                }
            }
        };

        let req_loader_args: LoaderArgs = match req_loader.args {
            Some(p) => p,
            None => {
                return RecordBuilderResponse {
                    record: None,
                    error: Some(Error {
                        kind: BridgeError::RecordError.to_string(),
                        message: "invalid loader provided".to_string(),
                    }),
                }
            }
        };

        let result = match DataAvailabilityType::from_i32(req_loader.r#type) {
            Some(DataAvailabilityType::Hosted) => {
                let http = BloockHttpClient::new(config_data.get_config().api_key);
                let service =
                    bloock_core::publish::configure(Arc::new(http), Arc::new(config_data));
                service.retrieve_hosted(req_loader_args.hash).await
            }
            None => {
                return RecordBuilderResponse {
                    record: None,
                    error: Some(Error {
                        kind: BridgeError::RecordError.to_string(),
                        message: "invalid loader provided".to_string(),
                    }),
                }
            }
        };

        let payload = match result {
            Ok(p) => p,
            Err(e) => {
                return RecordBuilderResponse {
                    record: None,
                    error: Some(Error {
                        kind: BridgeError::RecordError.to_string(),
                        message: e.to_string(),
                    }),
                }
            }
        };

        let builder = match RecordBuilder::from_file(payload) {
            Ok(builder) => builder,
            Err(e) => return record_builder_response_error(e.to_string()),
        };
        build_record(builder, req.signer, req.encrypter, req.decrypter)
    }

    async fn get_hash(&self, _req: Record) -> RecordHash {
        let record: RecordCore = match _req.try_into() {
            Ok(record) => record,
            Err(e) => {
                return RecordHash {
                    hash: "".to_string(),
                    error: Some(Error {
                        kind: BridgeError::RecordError.to_string(),
                        message: e.to_string(),
                    }),
                }
            }
        };
        let hash = record.get_hash();
        RecordHash { hash, error: None }
    }

    async fn get_signatures(&self, _req: Record) -> RecordSignatures {
        let record: RecordCore = match _req.try_into() {
            Ok(record) => record,
            Err(e) => {
                return RecordSignatures {
                    signatures: vec![],
                    error: Some(Error {
                        kind: BridgeError::RecordError.to_string(),
                        message: e.to_string(),
                    }),
                }
            }
        };

        let signatures = match record.get_signatures() {
            Some(signatures) => {
                let mut result: Vec<Signature> = vec![];
                for signature in signatures.iter() {
                    result.push(match signature.clone().try_into() {
                        Ok(res) => res,
                        Err(err) => {
                            return RecordSignatures {
                                signatures: vec![],
                                error: Some(Error {
                                    kind: BridgeError::RecordError.to_string(),
                                    message: err.to_string(),
                                }),
                            }
                        }
                    });
                }
                result
            }
            None => vec![],
        };

        RecordSignatures {
            signatures,
            error: None,
        }
    }

    async fn generate_keys(&self, _req: GenerateKeysRequest) -> GenerateKeysResponse {
        let (private_key, public_key) = match EcsdaSigner::generate_keys() {
            Ok(p) => p,
            Err(e) => {
                return GenerateKeysResponse {
                    private_key: "".to_string(),
                    public_key: "".to_string(),
                    error: Some(Error {
                        kind: BridgeError::RecordError.to_string(),
                        message: e.to_string(),
                    }),
                }
            }
        };
        return GenerateKeysResponse {
            private_key,
            public_key,
            error: None,
        };
    }

    async fn generate_rsa_key_pair(
        &self,
        _req: GenerateRsaKeyPairRequest,
    ) -> GenerateRsaKeyPairResponse {
        let keypair = match bloock_core::generate_rsa_key_pair() {
            Ok(keypair) => keypair,
            Err(e) => {
                return GenerateRsaKeyPairResponse {
                    private_key: "".to_string(),
                    public_key: "".to_string(),
                    error: Some(Error {
                        kind: BridgeError::RecordError.to_string(),
                        message: e.to_string(),
                    }),
                }
            }
        };

        return GenerateRsaKeyPairResponse {
            private_key: keypair.private_key,
            public_key: keypair.public_key,
            error: None,
        };
    }

    async fn publish(&self, req: PublishRequest) -> PublishResponse {
        let config_data = match map_config(req.config_data) {
            Ok(config) => config,
            Err(_) => {
                return PublishResponse {
                    hash: "".to_string(),
                    error: Some(config_data_error()),
                }
            }
        };

        let req_record = match req.record {
            Some(p) => p,
            None => return PublishResponse::new_error("no record provided".to_string()),
        };
        let record: RecordCore = match req_record.try_into() {
            Ok(r) => r,
            Err(e) => return PublishResponse::new_error(e.to_string()),
        };

        let req_publisher: Publisher = match req.publisher {
            Some(p) => p,
            None => return PublishResponse::new_error("invalid publisher provided".to_string()),
        };

        let result = match DataAvailabilityType::from_i32(req_publisher.r#type) {
            Some(DataAvailabilityType::Hosted) => {
                let http = BloockHttpClient::new(config_data.get_config().api_key);
                let service =
                    bloock_core::publish::configure(Arc::new(http), Arc::new(config_data));
                service.publish_hosted(record).await
            }
            None => return PublishResponse::new_error("invalid publisher provided".to_string()),
        };

        let hash = match result {
            Ok(h) => h,
            Err(e) => return PublishResponse::new_error(e.to_string()),
        };

        PublishResponse { hash, error: None }
    }
}

fn build_record(
    mut builder: Builder,
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
                        return record_builder_response_error("no arguments provided".to_string())
                    }
                };
                let private_key = match signer_arguments.private_key {
                    Some(private_key) => private_key,
                    None => {
                        return record_builder_response_error("no private key provided".to_string())
                    }
                };
                EcsdaSigner::new(EcsdaSignerArgs::new(&private_key))
            }
            None => {
                return record_builder_response_error("invalid signer provided".to_string());
            }
        };
        builder = builder.with_signer(signer);
    }

    if let Some(encrypt) = encrypter {
        let args = match encrypt.args {
            Some(encrypter_arguments) => encrypter_arguments,
            None => return record_builder_response_error("no arguments provided".to_string()),
        };

        let encrypter: Box<dyn EncrypterCore> = match EncryptionAlg::from_i32(encrypt.alg) {
            Some(alg) => match alg {
                EncryptionAlg::A256gcm => {
                    Box::new(AesEncrypter::new(AesEncrypterArgs::new(&args.key, &[])))
                }
                EncryptionAlg::Rsa => Box::new(RsaEncrypter::new(RsaEncrypterArgs::new(&args.key))),
            },
            None => {
                return record_builder_response_error("invalid encrypter provided".to_string());
            }
        };
        builder = builder.with_encrypter(encrypter);
    }

    if let Some(decrypt) = decrypter {
        let args = match decrypt.args {
            Some(decrypter_arguments) => decrypter_arguments,
            None => return record_builder_response_error("no arguments provided".to_string()),
        };

        let decrypter: Box<dyn DecrypterCore> = match EncryptionAlg::from_i32(decrypt.alg) {
            Some(alg) => match alg {
                EncryptionAlg::A256gcm => {
                    Box::new(AesDecrypter::new(AesDecrypterArgs::new(&args.key, &[])))
                }
                EncryptionAlg::Rsa => Box::new(RsaDecrypter::new(RsaDecrypterArgs::new(&args.key))),
            },
            None => {
                return record_builder_response_error("invalid decrypter provided".to_string());
            }
        };

        builder = builder.with_decrypter(decrypter);
    }

    let record: Record = match builder.build() {
        Ok(record) => match record.try_into() {
            Ok(record) => record,
            Err(e) => return record_builder_response_error(e.to_string()),
        },
        Err(e) => return record_builder_response_error(e.to_string()),
    };

    RecordBuilderResponse {
        record: Some(record),
        error: None,
    }
}

impl PublishResponse {
    fn new_error(err: String) -> PublishResponse {
        PublishResponse {
            hash: "".to_string(),
            error: Some(Error {
                kind: BridgeError::PublishError.to_string(),
                message: err,
            }),
        }
    }
}

#[cfg(test)]
mod tests {
    use bloock_core::{
        anchor::entity::anchor::AnchorNetwork,
        proof::entity::{anchor::ProofAnchor, proof::Proof},
        record::{document::Document, entity::record::Record},
        Signature, SignatureHeader,
    };

    use crate::{
        items::{
            DecrypterArgs, EncrypterArgs, EncryptionAlg, GenerateKeysRequest,
            GenerateRsaKeyPairRequest, RecordServiceHandler, SignerAlg, SignerArgs,
        },
        server::Server,
    };

    #[tokio::test]
    async fn test_build_record_from_string_no_signature_nor_encryption() {
        let content = "hello world!";
        let request = crate::items::RecordBuilderFromStringRequest {
            payload: content.to_string(),
            signer: None,
            encrypter: None,
            decrypter: None,
        };

        let server = Server::new();

        let response = server.record.build_record_from_string(request).await;
        let record = response.record.unwrap();
        let result_payload = String::from_utf8(record.payload).unwrap();
        let result_error = response.error;

        assert_eq!(content, result_payload);
        assert_eq!(None, result_error);
    }

    #[tokio::test]
    async fn test_build_record_from_string_set_signature() {
        let private = "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb";
        let content = "hello world!";

        let request = crate::items::RecordBuilderFromStringRequest {
            payload: content.to_string(),
            signer: Some(crate::items::Signer {
                alg: SignerAlg::Es256k.into(),
                args: Some(SignerArgs {
                    private_key: Some(private.to_string()),
                }),
            }),
            encrypter: None,
            decrypter: None,
        };

        let server = Server::new();
        let response = server.record.build_record_from_string(request).await;
        let record = response.record.unwrap();

        let document = Document::new(&record.payload).unwrap();

        let result_signature = document.get_signatures().unwrap();
        let result_protected = result_signature[0].clone().protected;
        let result_algorithm = result_signature[0].clone().header.alg;
        let result_public_key = result_signature[0].clone().header.kid;
        let result_payload = String::from_utf8(record.payload).unwrap();
        let result_proof = document.get_proof();
        let result_error = response.error;

        assert_eq!(1, result_signature.len());
        assert_eq!("e30", result_protected);
        assert_eq!("ES256K", result_algorithm);
        assert_eq!(
            "02d922c1e1d0a0e1f1837c2358fd899c8668b6654595e3e4aa88a69f7f66b00ff8",
            result_public_key
        );
        assert_ne!(content, result_payload);
        assert_eq!(None, result_proof);
        assert_eq!(None, result_error);
    }

    #[tokio::test]
    async fn test_build_record_from_string_set_signature_and_encryption() {
        let private = "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb";
        let password = "some_password";
        let content = "hello world!";

        let request = crate::items::RecordBuilderFromStringRequest {
            payload: content.to_string(),
            signer: Some(crate::items::Signer {
                alg: SignerAlg::Es256k.into(),
                args: Some(SignerArgs {
                    private_key: Some(private.to_string()),
                }),
            }),
            encrypter: Some(crate::items::Encrypter {
                alg: EncryptionAlg::A256gcm.into(),
                args: Some(EncrypterArgs {
                    key: password.to_string(),
                }),
            }),
            decrypter: None,
        };

        let server = Server::new();
        let response = server.record.build_record_from_string(request).await;
        let record = response.record.unwrap();

        let result_error = response.error;

        assert_eq!(None, result_error);
        assert_ne!(content.as_bytes(), record.payload);

        let request = crate::items::RecordBuilderFromRecordRequest {
            payload: Some(record.clone()),
            signer: None,
            encrypter: None,
            decrypter: Some(crate::items::Decrypter {
                alg: EncryptionAlg::A256gcm.into(),
                args: Some(DecrypterArgs {
                    key: password.to_string(),
                }),
            }),
        };

        let unencrypted_record: Record = server
            .record
            .build_record_from_record(request)
            .await
            .record
            .unwrap()
            .try_into()
            .unwrap();

        let result_signature = unencrypted_record.get_signatures().unwrap();
        assert_eq!(1, result_signature.len());
        assert_eq!(
            content.as_bytes(),
            unencrypted_record.get_payload().unwrap()
        );
    }

    #[tokio::test]
    async fn test_build_record_from_pdf_set_encryption() {
        let private = "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb";
        let password = "some_password";
        let payload = include_bytes!("../../assets/dummy.pdf");
        let server = Server::new();

        let request = crate::items::RecordBuilderFromFileRequest {
            payload: payload.to_vec(),
            signer: Some(crate::items::Signer {
                alg: SignerAlg::Es256k.into(),
                args: Some(SignerArgs {
                    private_key: Some(private.to_string()),
                }),
            }),
            encrypter: None,
            decrypter: None,
        };

        let default_record: Record = server
            .record
            .build_record_from_file(request)
            .await
            .record
            .unwrap()
            .try_into()
            .unwrap();

        let request = crate::items::RecordBuilderFromFileRequest {
            payload: payload.to_vec(),
            signer: Some(crate::items::Signer {
                alg: SignerAlg::Es256k.into(),
                args: Some(SignerArgs {
                    private_key: Some(private.to_string()),
                }),
            }),
            encrypter: Some(crate::items::Encrypter {
                alg: EncryptionAlg::A256gcm.into(),
                args: Some(EncrypterArgs {
                    key: password.to_string(),
                }),
            }),
            decrypter: None,
        };

        let encrypted_record: Record = server
            .record
            .build_record_from_file(request)
            .await
            .record
            .unwrap()
            .try_into()
            .unwrap();

        assert_ne!(default_record.get_hash(), encrypted_record.get_hash());

        let request = crate::items::RecordBuilderFromRecordRequest {
            payload: Some(encrypted_record.try_into().unwrap()),
            signer: None,
            encrypter: None,
            decrypter: Some(crate::items::Decrypter {
                alg: EncryptionAlg::A256gcm.into(),
                args: Some(DecrypterArgs {
                    key: password.to_string(),
                }),
            }),
        };

        let unencrypted_record: Record = server
            .record
            .build_record_from_record(request)
            .await
            .record
            .unwrap()
            .try_into()
            .unwrap();

        let expected_signatures = vec![
            Signature {
                header: SignatureHeader {
                    alg: "ES256K".to_string(),
                    kid: "02d922c1e1d0a0e1f1837c2358fd899c8668b6654595e3e4aa88a69f7f66b00ff8".to_string(),
                },
                protected: "e30".to_string(),
                signature: "30d9b2f48b3504c86dbf1072417de52b0f64651582b2002bc180ddb950aa21a23f121bfaaed6a967df08b6a7d2c8e6d54b7203c0a7b84286c85b79564e611416".to_string(),
            }
        ];

        assert_eq!(
            unencrypted_record.get_signatures().unwrap(),
            expected_signatures
        );
        assert_eq!(default_record.get_hash(), unencrypted_record.get_hash());
    }

    #[tokio::test]
    async fn test_build_record_with_encryption_and_decryption() {
        let server = Server::new();
        let password = "some_password";
        let content = "hello world!";

        let request = crate::items::RecordBuilderFromStringRequest {
            payload: content.to_string(),
            signer: None,
            encrypter: Some(crate::items::Encrypter {
                alg: EncryptionAlg::A256gcm.into(),
                args: Some(EncrypterArgs {
                    key: password.to_string(),
                }),
            }),
            decrypter: None,
        };

        let response = server.record.build_record_from_string(request).await;
        assert_eq!(None, response.error);
        let encrypted_record = response.record.unwrap();
        assert_ne!(content.as_bytes(), encrypted_record.payload);

        let request = crate::items::RecordBuilderFromRecordRequest {
            payload: Some(encrypted_record.clone()),
            signer: None,
            encrypter: None,
            decrypter: Some(crate::items::Decrypter {
                alg: EncryptionAlg::A256gcm.into(),
                args: Some(DecrypterArgs {
                    key: password.to_string(),
                }),
            }),
        };

        let response = server.record.build_record_from_record(request).await;
        let record: Record = response.record.unwrap().try_into().unwrap();
        assert_eq!(content.as_bytes(), record.get_payload().unwrap());
    }

    #[tokio::test]
    async fn test_build_record_set_signature_encryption_and_decryption() {
        let private = "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb";
        let password = "some_password";
        let content = "hello world!";

        let request = crate::items::RecordBuilderFromStringRequest {
            payload: content.to_string(),
            signer: Some(crate::items::Signer {
                alg: SignerAlg::Es256k.into(),
                args: Some(SignerArgs {
                    private_key: Some(private.to_string()),
                }),
            }),
            encrypter: Some(crate::items::Encrypter {
                alg: EncryptionAlg::A256gcm.into(),
                args: Some(EncrypterArgs {
                    key: password.to_string(),
                }),
            }),
            decrypter: None,
        };

        let server = Server::new();
        let response = server.record.build_record_from_string(request).await;
        let record: Record = response.record.unwrap().try_into().unwrap();

        let request = crate::items::RecordBuilderFromRecordRequest {
            payload: Some(record.try_into().unwrap()),
            signer: None,
            encrypter: None,
            decrypter: Some(crate::items::Decrypter {
                alg: EncryptionAlg::A256gcm.into(),
                args: Some(DecrypterArgs {
                    key: password.to_string(),
                }),
            }),
        };

        let response = server.record.build_record_from_record(request).await;
        let record: Record = response.record.unwrap().try_into().unwrap();
        assert_eq!(content.as_bytes(), record.get_payload().unwrap());
    }

    #[tokio::test]
    async fn test_build_record_set_proof_encryption_and_decryption() {
        let password = "some_password";
        let content = "hello world!";

        let request = crate::items::RecordBuilderFromStringRequest {
            payload: content.to_string(),
            signer: None,
            encrypter: None,
            decrypter: None,
        };

        let server = Server::new();
        let response = server.record.build_record_from_string(request).await;
        let mut record: Record = response.record.unwrap().try_into().unwrap();

        record
            .set_proof(Proof {
                anchor: ProofAnchor {
                    anchor_id: 1,
                    networks: vec![AnchorNetwork {
                        name: "net".to_string(),
                        state: "state".to_string(),
                        tx_hash: "tx_hash".to_string(),
                    }],
                    root: "root".to_string(),
                    status: "status".to_string(),
                },
                bitmap: "111".to_string(),
                depth: "111".to_string(),
                leaves: vec![[0u8; 32]],
                nodes: vec![[0u8; 32]],
            })
            .unwrap();

        let request = crate::items::RecordBuilderFromRecordRequest {
            payload: Some(record.clone().try_into().unwrap()),
            signer: None,
            encrypter: Some(crate::items::Encrypter {
                alg: EncryptionAlg::A256gcm.into(),
                args: Some(EncrypterArgs {
                    key: password.to_string(),
                }),
            }),
            decrypter: None,
        };

        let response = server.record.build_record_from_record(request).await;
        let encrypted_record: Record = response.record.unwrap().try_into().unwrap();

        assert_eq!(encrypted_record.get_proof(), None);
        assert_ne!(encrypted_record.get_payload(), record.get_payload());

        let request = crate::items::RecordBuilderFromRecordRequest {
            payload: Some(encrypted_record.try_into().unwrap()),
            signer: None,
            encrypter: None,
            decrypter: Some(crate::items::Decrypter {
                alg: EncryptionAlg::A256gcm.into(),
                args: Some(DecrypterArgs {
                    key: password.to_string(),
                }),
            }),
        };

        let response = server.record.build_record_from_record(request).await;
        let record: Record = response.record.unwrap().try_into().unwrap();
        assert_eq!(content.as_bytes(), record.get_payload().unwrap());
    }

    #[tokio::test]
    async fn test_build_record_from_hex() {
        let content = "776463776463776377637765";
        let request = crate::items::RecordBuilderFromHexRequest {
            payload: content.to_string(),
            signer: None,
            encrypter: None,
            decrypter: None,
        };

        let server = Server::new();

        let response = server.record.build_record_from_hex(request).await;
        let result_error = response.error;

        assert_eq!(None, result_error);
    }

    #[tokio::test]
    async fn test_build_record_from_json() {
        let content = "{\"hello\":\"world\"}";
        let request = crate::items::RecordBuilderFromJsonRequest {
            payload: content.to_string(),
            signer: None,
            encrypter: None,
            decrypter: None,
        };

        let server = Server::new();

        let response = server.record.build_record_from_json(request).await;
        let result_error = response.error;

        assert_eq!(None, result_error);
    }

    #[tokio::test]
    async fn test_build_record_from_file() {
        let content = "hello world!";

        let request = crate::items::RecordBuilderFromFileRequest {
            payload: content.as_bytes().to_vec(),
            signer: None,
            encrypter: None,
            decrypter: None,
        };

        let server = Server::new();

        let response = server.record.build_record_from_file(request).await;
        let record = response.record.unwrap();
        let result_payload = String::from_utf8(record.payload).unwrap();
        let result_error = response.error;

        assert_eq!(content, result_payload);
        assert_eq!(None, result_error);
    }

    #[tokio::test]
    async fn test_build_record_from_bytes() {
        let content = "hello world!";

        let request = crate::items::RecordBuilderFromBytesRequest {
            payload: content.as_bytes().to_vec(),
            signer: None,
            encrypter: None,
            decrypter: None,
        };

        let server = Server::new();

        let response = server.record.build_record_from_bytes(request).await;
        let record = response.record.unwrap();
        let result_payload = String::from_utf8(record.payload).unwrap();
        let result_error = response.error;

        assert_eq!(content, result_payload);
        assert_eq!(None, result_error);
    }

    #[tokio::test]
    async fn test_build_record_from_record() {
        let content = "hello world!";
        let request_from_string = crate::items::RecordBuilderFromStringRequest {
            payload: content.to_string(),
            signer: None,
            encrypter: None,
            decrypter: None,
        };

        let server = Server::new();
        let record_response = server
            .record
            .build_record_from_string(request_from_string)
            .await;

        let request_from_record = crate::items::RecordBuilderFromRecordRequest {
            payload: record_response.record,
            signer: None,
            encrypter: None,
            decrypter: None,
        };

        let server = Server::new();
        let response = server
            .record
            .build_record_from_record(request_from_record)
            .await;

        let record = response.record.unwrap();
        let result_payload = String::from_utf8(record.payload).unwrap();
        let result_error = response.error;

        assert_eq!(content, result_payload);
        assert_eq!(None, result_error);
    }

    #[tokio::test]
    async fn test_generate_keys() {
        let request_generate_keys = GenerateKeysRequest {};

        let server = Server::new();
        let keys_response = server.record.generate_keys(request_generate_keys).await;
        let error_response = keys_response.error;

        assert_eq!(None, error_response);
    }

    #[tokio::test]
    async fn test_generate_rsa_key_pair() {
        let server = Server::new();
        let keys_response = server
            .record
            .generate_rsa_key_pair(GenerateRsaKeyPairRequest {})
            .await;

        assert_eq!(keys_response.error, None);
    }
}
