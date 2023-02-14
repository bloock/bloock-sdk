use crate::{
    error::BridgeError,
    items::{
        DecryptRequest, DecryptResponse, EncryptRequest, EncryptResponse, EncryptionAlg,
        EncryptionAlgRequest, EncryptionAlgResponse, EncryptionServiceHandler,
        GenerateEciesKeyPairRequest, GenerateEciesKeyPairResponse, GenerateRsaKeyPairRequest,
        GenerateRsaKeyPairResponse,
    },
    server::response_types::RequestConfigData,
};
use async_trait::async_trait;
use bloock_core::{
    encryption, record::entity::record::Record as RecordCore, AesDecrypter, AesDecrypterArgs,
    AesEncrypter, AesEncrypterArgs, EciesDecrypter, EciesDecrypterArgs, EciesEncrypter,
    EciesEncrypterArgs, RsaDecrypter, RsaDecrypterArgs, RsaEncrypter, RsaEncrypterArgs,
};

pub struct EncryptionServer {}

#[async_trait(?Send)]
impl EncryptionServiceHandler for EncryptionServer {
    async fn generate_rsa_key_pair(
        &self,
        _req: &GenerateRsaKeyPairRequest,
    ) -> Result<GenerateRsaKeyPairResponse, String> {
        let keypair = bloock_core::generate_rsa_key_pair().map_err(|e| e.to_string())?;

        Ok(GenerateRsaKeyPairResponse {
            public_key: keypair.public_key,
            private_key: keypair.private_key,
            error: None,
        })
    }

    async fn generate_ecies_key_pair(
        &self,
        _req: &GenerateEciesKeyPairRequest,
    ) -> Result<GenerateEciesKeyPairResponse, String> {
        let keypair = bloock_core::generate_ecies_key_pair();

        Ok(GenerateEciesKeyPairResponse {
            public_key: keypair.public_key,
            private_key: keypair.private_key,
            error: None,
        })
    }

    async fn encrypt(&self, req: &EncryptRequest) -> Result<EncryptResponse, String> {
        let config_data = req.get_config_data()?;

        let encrypter = req
            .clone()
            .encrypter
            .ok_or_else(|| "invalid encrypter provided".to_string())?;

        let args = encrypter
            .args
            .ok_or_else(|| "no arguments provided".to_string())?;

        let req_record = req
            .clone()
            .record
            .ok_or_else(|| "no record provided".to_string())?;

        let record: RecordCore = req_record
            .try_into()
            .map_err(|e: BridgeError| e.to_string())?;

        let client = encryption::configure(config_data);
        let result: RecordCore = match EncryptionAlg::from_i32(encrypter.alg) {
            Some(alg) => match alg {
                EncryptionAlg::A256gcm => client.encrypt_aes(
                    record,
                    AesEncrypter::new(AesEncrypterArgs::new(&args.key, &[])),
                ),
                EncryptionAlg::Rsa => {
                    client.encrypt_rsa(record, RsaEncrypter::new(RsaEncrypterArgs::new(&args.key)))
                }
                EncryptionAlg::Ecies => client.encrypt_ecies(
                    record,
                    EciesEncrypter::new(EciesEncrypterArgs::new(args.key)),
                ),
            },
            None => return Err("invalid encrypter provided".to_string()),
        }
        .map_err(|e| e.to_string())?;

        let final_record = result.try_into().map_err(|e: BridgeError| e.to_string())?;

        Ok(EncryptResponse {
            record: Some(final_record),
            error: None,
        })
    }

    async fn decrypt(&self, req: &DecryptRequest) -> Result<DecryptResponse, String> {
        let config_data = req.get_config_data()?;

        let decrypter = req
            .clone()
            .decrypter
            .ok_or_else(|| "invalid decrypter provided".to_string())?;

        let args = decrypter
            .args
            .ok_or_else(|| "no arguments provided".to_string())?;

        let req_record = req
            .clone()
            .record
            .ok_or_else(|| "no record provided".to_string())?;

        let record: RecordCore = req_record
            .try_into()
            .map_err(|e: BridgeError| e.to_string())?;

        let client = encryption::configure(config_data);
        let result: RecordCore = match EncryptionAlg::from_i32(decrypter.alg) {
            Some(alg) => match alg {
                EncryptionAlg::A256gcm => client.decrypt_aes(
                    record,
                    AesDecrypter::new(AesDecrypterArgs::new(&args.key, &[])),
                ),
                EncryptionAlg::Rsa => {
                    client.decrypt_rsa(record, RsaDecrypter::new(RsaDecrypterArgs::new(&args.key)))
                }
                EncryptionAlg::Ecies => client.decrypt_ecies(
                    record,
                    EciesDecrypter::new(EciesDecrypterArgs::new(args.key)),
                ),
            },
            None => return Err("invalid encrypter provided".to_string()),
        }
        .map_err(|e| e.to_string())?;

        let final_record = result.try_into().map_err(|e: BridgeError| e.to_string())?;

        Ok(DecryptResponse {
            record: Some(final_record),
            error: None,
        })
    }

    async fn get_encryption_alg(
        &self,
        req: &EncryptionAlgRequest,
    ) -> Result<EncryptionAlgResponse, String> {
        let record: RecordCore = req
            .clone()
            .record
            .ok_or_else(|| "no record provided".to_string())?
            .try_into()
            .map_err(|e: BridgeError| e.to_string())?;

        match record.is_encrypted() {
            true => match record.get_encryption_alg() {
                Ok(alg) => Ok(EncryptionAlgResponse {
                    alg: EncryptionAlg::from(alg).into(),
                    error: None,
                }),
                Err(e) => Err(e.to_string()),
            },
            false => Err("Record is not encrypted".to_string()),
        }
    }
}
