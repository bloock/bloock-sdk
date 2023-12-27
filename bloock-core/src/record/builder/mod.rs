use super::entity::{record::Record, record_details::RecordDetails};
use crate::{
    error::{BloockResult, InfrastructureError},
    record::document::Document,
};
use bloock_encrypter::EncrypterError;
use bloock_hasher::HashAlg;
use bloock_keys::entity::key::Key;

pub struct Builder {
    document: Document,
    signer: Option<(Key, Option<HashAlg>)>,
    encrypter: Option<Key>,
    decrypter: Option<Key>,
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

    pub fn with_signer(mut self, key: &Key, hash_alg: Option<HashAlg>) -> Self {
        self.signer = Some((key.clone(), hash_alg));
        self
    }

    pub fn with_encrypter(mut self, key: &Key) -> Self {
        self.encrypter = Some(key.clone());
        self
    }

    pub fn with_decrypter(mut self, key: &Key) -> Self {
        self.decrypter = Some(key.clone());
        self
    }

    pub async fn build(mut self) -> BloockResult<Record> {
        if let Some(decrypter) = self.decrypter {
            if !self.document.is_encrypted() {
                Err(EncrypterError::NotEncrypted()).map_err(InfrastructureError::EncrypterError)?;
            }

            self.document.decrypt(&decrypter).await?;
        }

        if let Some(signer) = &self.signer {
            self.document.sign(&signer.0, signer.1.clone()).await?;
        }

        let mut record = Record::new(self.document)?;

        if let Some(encrypter) = self.encrypter {
            record.encrypt(&encrypter).await?;
        }

        Ok(record)
    }

    pub async fn get_details(&self) -> BloockResult<RecordDetails> {
        RecordDetails::new(&self.document)
    }
}
