use super::entity::record::Record;
use crate::{
    error::{BloockResult, InfrastructureError},
    record::document::Document,
};
use bloock_encrypter::{Decrypter, Encrypter, EncrypterError};
use bloock_keys::entity::key::Key;

pub struct Builder {
    document: Document,
    signer: Option<Key>,
    encrypter: Option<Box<dyn Encrypter>>,
    decrypter: Option<Box<dyn Decrypter>>,
    api_host: String,
    api_key: String,
}

impl Builder {
    pub fn new(payload: Vec<u8>, api_host: String, api_key: String) -> BloockResult<Self> {
        let document = Document::new(&payload)?;
        Ok(Self {
            document,
            signer: None,
            encrypter: None,
            decrypter: None,
            api_host,
            api_key,
        })
    }

    pub fn from_document(document: Document, api_host: String, api_key: String) -> Self {
        Self {
            document,
            signer: None,
            encrypter: None,
            decrypter: None,
            api_host,
            api_key,
        }
    }

    pub fn with_signer(mut self, key: Key) -> Self {
        self.signer = Some(key);
        self
    }

    pub fn with_encrypter(mut self, encrypter: Box<dyn Encrypter>) -> Self {
        self.encrypter = Some(encrypter);
        self
    }

    pub fn with_decrypter(mut self, decrypter: Box<dyn Decrypter>) -> Self {
        self.decrypter = Some(decrypter);
        self
    }

    pub async fn build(mut self) -> BloockResult<Record> {
        if let Some(decrypter) = &self.decrypter {
            if !self.document.is_encrypted() {
                Err(EncrypterError::NotEncrypted()).map_err(InfrastructureError::EncrypterError)?;
            }

            let payload = self.document.get_payload();

            let decrypted_payload = decrypter
                .decrypt(&payload)
                .await
                .map_err(InfrastructureError::EncrypterError)?;

            self.document = self.document.remove_encryption(decrypted_payload)?;
        }

        if let Some(signer) = &self.signer {
            let payload = self.document.get_payload();

            let signature = bloock_signer::sign(self.api_host, self.api_key, &payload, signer)
                .await
                .map_err(InfrastructureError::SignerError)?;

            self.document.add_signature(signature)?;
        }

        let mut record = Record::new(self.document)?;

        if let Some(encrypter) = self.encrypter {
            let payload = record.clone().serialize()?;
            let ciphertext = encrypter
                .encrypt(&payload)
                .await
                .map_err(InfrastructureError::EncrypterError)?;

            record.set_encryption(ciphertext, encrypter.get_alg())?;
        }

        Ok(record)
    }
}
