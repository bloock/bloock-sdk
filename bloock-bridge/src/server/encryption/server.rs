use crate::{
    error::BridgeError,
    items::{
        DecryptRequest, DecryptResponse, EncryptRequest, EncryptResponse, EncryptionAlg,
        EncryptionAlgRequest, EncryptionAlgResponse, EncryptionServiceHandler,
    },
    server::response_types::RequestConfigData,
};
use async_trait::async_trait;
use bloock_core::{encryption, record::entity::record::Record as RecordCore};
use bloock_keys::certificates::local::LocalCertificate as LocalCertificateCore;
use bloock_keys::certificates::managed::ManagedCertificate as ManagedCertificateCore;
use bloock_keys::entity::key::Key;
use bloock_keys::keys::local::LocalKey as LocalKeyCore;
use bloock_keys::keys::managed::ManagedKey as ManagedKeyCore;

pub struct EncryptionServer {}

#[async_trait(?Send)]
impl EncryptionServiceHandler for EncryptionServer {
    async fn encrypt(&self, req: &EncryptRequest) -> Result<EncryptResponse, String> {
        let config_data = req.get_config_data()?;
        let client = encryption::configure(config_data.clone());

        let req_record = req
            .clone()
            .record
            .ok_or_else(|| "no record provided".to_string())?;

        let record: RecordCore = req_record
            .try_into()
            .map_err(|e: BridgeError| e.to_string())?;

        let encrypter = req
            .clone()
            .encrypter
            .ok_or_else(|| "no signer provided".to_string())?;

        let key: Key = if let Some(managed_key) = encrypter.managed_key {
            let managed_key_core: ManagedKeyCore = managed_key.into();
            managed_key_core.into()
        } else if let Some(local_key) = encrypter.local_key {
            let local_key_core: LocalKeyCore<String> = local_key.into();
            local_key_core.into()
        } else if let Some(managed_certificate) = encrypter.managed_certificate {
            let managed_certificate_core: ManagedCertificateCore = managed_certificate.into();
            managed_certificate_core.into()
        } else if let Some(local_certificate) = encrypter.local_certificate {
            let local_certificate_core: LocalCertificateCore<String> = local_certificate
                .try_into()
                .map_err(|e: BridgeError| e.to_string())?;
            local_certificate_core.into()
        } else {
            return Err("invalid key provided".to_string());
        };

        let result = client
            .encrypt(record, &key)
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

        let req_record = req
            .clone()
            .record
            .ok_or_else(|| "no record provided".to_string())?;

        let record: RecordCore = req_record
            .try_into()
            .map_err(|e: BridgeError| e.to_string())?;

        let decrypter = req
            .clone()
            .decrypter
            .ok_or_else(|| "no signer provided".to_string())?;

        let key: Key = if let Some(managed_key) = decrypter.managed_key {
            let managed_key_core: ManagedKeyCore = managed_key.into();
            managed_key_core.into()
        } else if let Some(local_key) = decrypter.local_key {
            let local_key_core: LocalKeyCore<String> = local_key.into();
            local_key_core.into()
        } else if let Some(managed_certificate) = decrypter.managed_certificate {
            let managed_certificate_core: ManagedCertificateCore = managed_certificate.into();
            managed_certificate_core.into()
        } else if let Some(local_certificate) = decrypter.local_certificate {
            let local_certificate_core: LocalCertificateCore<String> = local_certificate
                .try_into()
                .map_err(|e: BridgeError| e.to_string())?;
            local_certificate_core.into()
        } else {
            return Err("invalid key provided".to_string());
        };

        let result = client
            .decrypt(record, &key)
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
