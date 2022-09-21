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
        Encrypter, EncrypterAlg, Error, Record, RecordBuilderResponse, RecordHash,
        RecordServiceHandler, SendRecordsResponse, Signer, SignerAlg,
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
        RecordHash {
            hash: hash,
            error: None,
        }
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
        let builder = RecordBuilder::from_hex(req.payload).unwrap();
        build_record(builder, req.signer, req.encrypter)
    }

    async fn build_record_from_json(
        &self,
        req: crate::items::RecordBuilderFromJsonRequest,
    ) -> RecordBuilderResponse {
        let builder = RecordBuilder::from_json(req.payload).unwrap();
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
                    None => {
                        return RecordBuilderResponse {
                            record: None,
                            error: Some(Error {
                                kind: BridgeError::RecordError.to_string(),
                                message: "no private key provided".to_string(),
                            }),
                        }
                    }
                };
                EcsdaSigner::new(EcsdaSignerArgs::new(&signer_arguments.private_key))
            }
            None => {
                return RecordBuilderResponse {
                    record: None,
                    error: Some(Error {
                        kind: BridgeError::RecordError.to_string(),
                        message: "invalid signer provided".to_string(),
                    }),
                }
            }
        };
        builder = builder.with_signer(signer);
    }

    if let Some(encrypt) = encrypter {
        let encrypter = match EncrypterAlg::from_i32(encrypt.alg) {
            Some(EncrypterAlg::A256gcm) => {
                let encrypter_arguments = match encrypt.args {
                    Some(encrypter_arguments) => encrypter_arguments,
                    None => {
                        return RecordBuilderResponse {
                            record: None,
                            error: Some(Error {
                                kind: BridgeError::RecordError.to_string(),
                                message: "no secret provided".to_string(),
                            }),
                        }
                    }
                };
                AesEncrypter::new(AesEncrypterArgs::new(&encrypter_arguments.secret))
            }
            None => {
                return RecordBuilderResponse {
                    record: None,
                    error: Some(Error {
                        kind: BridgeError::RecordError.to_string(),
                        message: "invalid encrypter provided".to_string(),
                    }),
                }
            }
        };
        builder = builder.with_encrypter(encrypter);
    }

    let record: Record = match builder.build() {
        Ok(record) => match record.try_into() {
            Ok(record) => record,
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

    RecordBuilderResponse {
        record: Some(record),
        error: Some(Error {
            kind: BridgeError::RecordError.to_string(),
            message: "not implemented".to_string(),
        }),
    }
}
