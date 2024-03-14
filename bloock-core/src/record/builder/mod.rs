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
    signer: Option<(Key, Option<HashAlg>, Option<String>)>,
    encrypter: Option<(Key, Option<String>)>,
    decrypter: Option<(Key, Option<String>)>,
}

impl Builder {
    pub fn new(
        payload: Vec<u8>,
        api_host: String,
        api_key: String,
    ) -> BloockResult<Self> {
        let document = Document::new(
            &payload,
            api_host.clone(),
            api_key.clone(),
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

    pub fn with_signer(
        mut self,
        key: &Key,
        hash_alg: Option<HashAlg>,
        access_control: Option<String>,
    ) -> Self {
        self.signer = Some((key.clone(), hash_alg, access_control));
        self
    }

    pub fn with_encrypter(mut self, key: &Key, access_control: Option<String>) -> Self {
        self.encrypter = Some((key.clone(), access_control));
        self
    }

    pub fn with_decrypter(mut self, key: &Key, access_control: Option<String>) -> Self {
        self.decrypter = Some((key.clone(), access_control));
        self
    }

    pub async fn build(mut self) -> BloockResult<Record> {
        if let Some(decrypter) = self.decrypter {
            if !self.document.is_encrypted() {
                Err(EncrypterError::NotEncrypted()).map_err(InfrastructureError::EncrypterError)?;
            }

            self.document.decrypt(&decrypter.0, decrypter.1).await?;
        }

        if let Some(signer) = &self.signer {
            self.document
                .sign(&signer.0, signer.1.clone(), signer.2.clone())
                .await?;
        }

        let mut record = Record::new(self.document)?;

        if let Some(encrypter) = self.encrypter {
            record.encrypt(&encrypter.0, encrypter.1).await?;
        }

        Ok(record)
    }

    pub async fn get_details(&self) -> BloockResult<RecordDetails> {
        RecordDetails::new(&self.document)
    }
}
