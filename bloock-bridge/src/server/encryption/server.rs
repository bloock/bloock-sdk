use crate::{
    error::BridgeError,
    items::{
        DecryptRequest, DecryptResponse, EncryptRequest, EncryptResponse, EncryptionAlg,
        EncryptionAlgRequest, EncryptionAlgResponse, EncryptionServiceHandler,
    },
    server::response_types::RequestConfigData,
};
use async_trait::async_trait;
use bloock_core::{
    encryption, record::entity::record::Record as RecordCore, Decrypter, Encrypter,
    LocalAesDecrypter, LocalAesEncrypter, LocalRsaDecrypter, LocalRsaEncrypter,
    ManagedRsaDecrypter, ManagedRsaEncrypter,
};

pub struct EncryptionServer {}

#[async_trait(?Send)]
impl EncryptionServiceHandler for EncryptionServer {
    async fn encrypt(&self, req: &EncryptRequest) -> Result<EncryptResponse, String> {
        let config_data = req.get_config_data()?;
        let client = encryption::configure(config_data.clone());

        let encrypter = req
            .clone()
            .encrypter
            .ok_or_else(|| "invalid encrypter provided".to_string())?;

        let req_record = req
            .clone()
            .record
            .ok_or_else(|| "no record provided".to_string())?;

        let record: RecordCore = req_record
            .try_into()
            .map_err(|e: BridgeError| e.to_string())?;

        let encrypter_alg = EncryptionAlg::from_i32(encrypter.alg);

        let local_key = encrypter.local_key;
        let managed_key = encrypter.managed_key;

        let encrypter: Box<dyn Encrypter> = if let Some(key) = managed_key {
            match encrypter_alg {
                Some(EncryptionAlg::A256gcm) => {
                    return Err("AES encryption is not yet supported for managed keys".to_string())
                }
                Some(EncryptionAlg::Rsa) => ManagedRsaEncrypter::new(
                    key.into(),
                    config_data.config.host.clone(),
                    config_data.config.api_key.clone(),
                    config_data.config.environment.clone(),
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

        let result = client
            .encrypt(record, encrypter)
            .await
            .map_err(|e| e.to_string())?;

        let final_record = result.try_into().map_err(|e: BridgeError| e.to_string())?;

        Ok(EncryptResponse {
            record: Some(final_record),
            error: None,
        })
    }

    async fn decrypt(&self, req: &DecryptRequest) -> Result<DecryptResponse, String> {
        let config_data = req.get_config_data()?;
        let client = encryption::configure(config_data.clone());

        let decrypter = req
            .clone()
            .decrypter
            .ok_or_else(|| "invalid decrypter provided".to_string())?;

        let req_record = req
            .clone()
            .record
            .ok_or_else(|| "no record provided".to_string())?;

        let record: RecordCore = req_record
            .try_into()
            .map_err(|e: BridgeError| e.to_string())?;

        let decrypter_alg = EncryptionAlg::from_i32(decrypter.alg);

        let local_key = decrypter.local_key;
        let managed_key = decrypter.managed_key;

        let decrypter: Box<dyn Decrypter> = if let Some(key) = managed_key {
            match decrypter_alg {
                Some(EncryptionAlg::A256gcm) => {
                    return Err("AES decryption is not yet supported for managed keys".to_string())
                }
                Some(EncryptionAlg::Rsa) => ManagedRsaDecrypter::new(
                    key.into(),
                    config_data.config.host.clone(),
                    config_data.config.api_key.clone(),
                    config_data.config.environment.clone(),
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

        let result = client
            .decrypt(record, decrypter)
            .await
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
