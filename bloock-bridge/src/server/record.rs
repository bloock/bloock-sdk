use std::convert::TryInto;

use async_trait::async_trait;
use bloock_core::{
    client,
    error::BloockError,
    record::builder::{Builder, RecordBuilder},
    record::entity::record::Record as RecordCore,
    AesEncrypter, AesEncrypterArgs, EcsdaSigner, EcsdaSignerArgs,
};

use super::response_types::ResponseType;
use crate::{
    entity_mappings::config::map_config,
    error::{config_data_error, BridgeError},
    items::{
        Encrypter, EncrypterAlg, Error, GenerateKeysRequest, GenerateKeysResponse, Record,
        RecordBuilderResponse, RecordHash, RecordServiceHandler, SendRecordsResponse, Signer,
        SignerAlg,
    },
};

fn record_builder_response_error(message: &str) -> RecordBuilderResponse {
    RecordBuilderResponse {
        record: None,
        error: Some(Error {
            kind: BridgeError::RecordError.to_string(),
            message: message.to_string(),
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

impl From<GenerateKeysResponse> for ResponseType {
    fn from(res: GenerateKeysResponse) -> Self {
        ResponseType::GenerateKeys(res)
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

    async fn build_record_from_string(
        &self,
        req: crate::items::RecordBuilderFromStringRequest,
    ) -> RecordBuilderResponse {
        let builder = RecordBuilder::from_string(req.payload);
        build_record(builder, req.signer, req.encrypter)
    }

    async fn build_record_from_hex(
        &self,
        req: crate::items::RecordBuilderFromHexRequest,
    ) -> RecordBuilderResponse {
        let builder = match RecordBuilder::from_hex(req.payload) {
            Ok(builder) => builder,
            Err(e) => return record_builder_response_error(&e.to_string()),
        };
        build_record(builder, req.signer, req.encrypter)
    }

    async fn build_record_from_json(
        &self,
        req: crate::items::RecordBuilderFromJsonRequest,
    ) -> RecordBuilderResponse {
        let builder = match RecordBuilder::from_json(req.payload) {
            Ok(builder) => builder,
            Err(e) => return record_builder_response_error(&e.to_string()),
        };
        build_record(builder, req.signer, req.encrypter)
    }

    async fn build_record_from_file(
        &self,
        req: crate::items::RecordBuilderFromFileRequest,
    ) -> RecordBuilderResponse {
        let builder = RecordBuilder::from_file(req.payload);
        build_record(builder, req.signer, req.encrypter)
    }

    async fn build_record_from_bytes(
        &self,
        req: crate::items::RecordBuilderFromBytesRequest,
    ) -> RecordBuilderResponse {
        let builder = RecordBuilder::from_bytes(req.payload);
        build_record(builder, req.signer, req.encrypter)
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
            Err(e) => return record_builder_response_error(&e.to_string()),
        };
        build_record(builder, req.signer, req.encrypter)
    }

    async fn build_record_from_raw(
        &self,
        req: crate::items::RecordBuilderFromRawRequest,
    ) -> RecordBuilderResponse {
        let builder = RecordBuilder::from_raw(req.payload);
        build_record(builder, req.signer, req.encrypter)
    }
}

fn build_record(
    mut builder: Builder,
    signer: Option<Signer>,
    encrypter: Option<Encrypter>,
) -> RecordBuilderResponse {
    if let Some(signer) = signer {
        let signer = match SignerAlg::from_i32(signer.alg) {
            Some(SignerAlg::Es256k) => {
                let signer_arguments = match signer.args {
                    Some(signer_arguments) => signer_arguments,
                    None => return record_builder_response_error("no arguments provided"),
                };
                let private_key = match signer_arguments.private_key {
                    Some(private_key) => private_key,
                    None => return record_builder_response_error("no private key provided"),
                };
                EcsdaSigner::new(EcsdaSignerArgs::new(&private_key))
            }
            None => {
                return record_builder_response_error("invalid signer provided");
            }
        };
        builder = builder.with_signer(signer);
    }

    if let Some(encrypt) = encrypter {
        let encrypter = match EncrypterAlg::from_i32(encrypt.alg) {
            Some(EncrypterAlg::A256gcm) => {
                let encrypter_arguments = match encrypt.args {
                    Some(encrypter_arguments) => encrypter_arguments,
                    None => return record_builder_response_error("no arguments provided"),
                };

                let key = match encrypter_arguments.key {
                    Some(key) => key,
                    None => return record_builder_response_error("no key provided"),
                };

                let key = match base64::decode(key) {
                    Ok(bytes) => match bytes.try_into() {
                        Ok(key) => key,
                        Err(_) => return record_builder_response_error("invalid key provided"),
                    },
                    Err(_) => return record_builder_response_error("invalid key provided"),
                };

                AesEncrypter::new(AesEncrypterArgs::new(key))
            }
            None => {
                return record_builder_response_error("invalid encrypter provided");
            }
        };
        builder = builder.with_encrypter(encrypter);
    }

    let record: Record = match builder.build() {
        Ok(record) => match record.try_into() {
            Ok(record) => record,
            Err(e) => return record_builder_response_error(&e.to_string()),
        },
        Err(e) => return record_builder_response_error(&e.to_string()),
    };

    RecordBuilderResponse {
        record: Some(record),
        error: None,
    }
}

#[cfg(test)]
mod tests {
    use crate::{
        items::{
            EncrypterAlg, EncrypterArgs, GenerateKeysRequest, RecordServiceHandler, SignerAlg,
            SignerArgs,
        },
        server::Server,
    };

    use bloock_core::AES_ALG;

    #[tokio::test]
    async fn test_build_record_from_string_no_signature_nor_encryption() {
        let content = "hello world!";
        let request = crate::items::RecordBuilderFromStringRequest {
            payload: content.to_string(),
            signer: None,
            encrypter: None,
        };

        let server = Server::new();

        let response = server.record.build_record_from_string(request).await;
        let record = response.record.unwrap();
        let result_ty = record.headers.unwrap().ty;
        let result_signature = record.signatures;
        let result_payload = String::from_utf8(record.payload).unwrap();
        let result_encryption = record.encryption;
        let result_proof = record.proof;
        let result_error = response.error;

        assert_eq!("string", result_ty);
        assert_eq!(0, result_signature.len());
        assert_eq!(content, result_payload);
        assert_eq!(None, result_encryption);
        assert_eq!(None, result_proof);
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
        };

        let server = Server::new();
        let response = server.record.build_record_from_string(request).await;
        let record = response.record.unwrap();
        let result_ty = record.headers.unwrap().ty;
        let result_signature = record.signatures.clone();
        let result_protected = record.signatures[0].clone().protected;
        let result_algorithm = record.signatures[0].clone().header.unwrap().alg;
        let result_public_key = record.signatures[0].clone().header.unwrap().kid;
        let result_payload = String::from_utf8(record.payload).unwrap();
        let result_encryption = record.encryption;
        let result_proof = record.proof;
        let result_error = response.error;

        assert_eq!("string", result_ty);
        assert_eq!(1, result_signature.len());
        assert_eq!("e30", result_protected);
        assert_eq!("ES256K", result_algorithm);
        assert_eq!(
            "02d922c1e1d0a0e1f1837c2358fd899c8668b6654595e3e4aa88a69f7f66b00ff8",
            result_public_key
        );
        assert_eq!(content, result_payload);
        assert_eq!(None, result_encryption);
        assert_eq!(None, result_proof);
        assert_eq!(None, result_error);
    }

    #[tokio::test]
    async fn test_build_record_from_string_set_signature_and_encryption() {
        let private = "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb";
        let key = "IYNWK87JfjKgPvFNi8nP18Vg7YYOjEdOXLbRvJwa0yY=";
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
                alg: EncrypterAlg::A256gcm.into(),
                args: Some(EncrypterArgs {
                    key: Some(key.to_string()),
                }),
            }),
        };

        let server = Server::new();
        let response = server.record.build_record_from_string(request).await;
        let record = response.record.unwrap();
        let result_ty = record.headers.unwrap().ty;
        let result_signature = record.signatures.clone();
        let result_encryption_alg = record.encryption.unwrap().header.unwrap().alg;
        let result_error = response.error;

        assert_eq!("string", result_ty);
        assert_eq!(1, result_signature.len());
        assert_eq!(AES_ALG, result_encryption_alg);
        assert_eq!(None, result_error);
    }

    #[tokio::test]
    async fn test_build_record_from_hex() {
        let content = "776463776463776377637765";
        let request = crate::items::RecordBuilderFromHexRequest {
            payload: content.to_string(),
            signer: None,
            encrypter: None,
        };

        let server = Server::new();

        let response = server.record.build_record_from_hex(request).await;
        let record = response.record.unwrap();
        let result_ty = record.headers.unwrap().ty;
        let result_error = response.error;

        assert_eq!("hex", result_ty);
        assert_eq!(None, result_error);
    }

    #[tokio::test]
    async fn test_build_record_from_json() {
        let content = "{\"hello\":\"world\"}";
        let request = crate::items::RecordBuilderFromJsonRequest {
            payload: content.to_string(),
            signer: None,
            encrypter: None,
        };

        let server = Server::new();

        let response = server.record.build_record_from_json(request).await;
        let record = response.record.unwrap();
        let result_ty = record.headers.unwrap().ty;
        let result_error = response.error;

        assert_eq!("application/json", result_ty);
        assert_eq!(None, result_error);
    }

    #[tokio::test]
    async fn test_build_record_from_file() {
        let content = "hello world!";

        let request = crate::items::RecordBuilderFromFileRequest {
            payload: content.as_bytes().to_vec(),
            signer: None,
            encrypter: None,
        };

        let server = Server::new();

        let response = server.record.build_record_from_file(request).await;
        let record = response.record.unwrap();
        let result_ty = record.headers.unwrap().ty;
        let result_payload = String::from_utf8(record.payload).unwrap();
        let result_error = response.error;

        assert_eq!("unknown_file", result_ty);
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
        };

        let server = Server::new();

        let response = server.record.build_record_from_bytes(request).await;
        let record = response.record.unwrap();
        let result_ty = record.headers.unwrap().ty;
        let result_payload = String::from_utf8(record.payload).unwrap();
        let result_error = response.error;

        assert_eq!("bytes", result_ty);
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
        };

        let server = Server::new();
        let response = server
            .record
            .build_record_from_record(request_from_record)
            .await;

        let record = response.record.unwrap();
        let result_ty = record.headers.unwrap().ty;
        let result_payload = String::from_utf8(record.payload).unwrap();
        let result_error = response.error;

        assert_eq!("string", result_ty);
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
}
