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
}

impl Builder {
    pub fn new(
        payload: Vec<u8>,
        api_host: String,
        api_key: String,
        environment: Option<String>,
    ) -> BloockResult<Self> {
        let document = Document::new(
            &payload,
            api_host.clone(),
            api_key.clone(),
            environment.clone(),
        )?;
        Ok(Self {
            document,
            signer: None,
            encrypter: None,
            decrypter: None,
        })
    }

    pub fn from_document(document: Document) -> Self {
        Self {
            document,
            signer: None,
            encrypter: None,
            decrypter: None,
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
        if let Some(decrypter) = self.decrypter {
            if !self.document.is_encrypted() {
                Err(EncrypterError::NotEncrypted()).map_err(InfrastructureError::EncrypterError)?;
            }

            self.document.decrypt(decrypter).await?;
        }

        if let Some(signer) = &self.signer {
            self.document.sign(signer).await?;
        }

        let mut record = Record::new(self.document)?;

        if let Some(encrypter) = self.encrypter {
            record.encrypt(encrypter).await?;
        }

        Ok(record)
    }
}
