#[macro_use]
pub mod macros;

use crate::document::base::BaseDocument;
use crate::document::json::JSONDocument;
use crate::document::Document;
use crate::document::DocumentHelper;
use crate::publisher::hosted::{HostedPublisher, HostedPublisherArgs};
use crate::record::Record;
use crate::{encrypter::Encrypter, publisher::Publisher, signer::Signer};
use crate::{BuilderError, Result};

#[derive(Default)]
pub struct RecordBuilder {}

pub trait Builder
where
    Self::Document: Document,
    Self::PayloadType: Clone + Into<Vec<u8>> + Send,
{
    type Document;
    type PayloadType;
    fn get_signer(&self) -> Option<&Box<dyn Signer>>;
    fn get_encrypter(&self) -> Option<&Box<dyn Encrypter>>;
    fn get_publisher(&self) -> Option<&Box<dyn Publisher>>;
    fn with_signer<S: Signer + 'static>(&mut self, signer: S) -> &mut Self;
    fn with_encrypter<E: Encrypter + 'static>(&mut self, encrypter: E) -> &mut Self;
    fn with_publisher<P: Publisher + 'static>(&mut self, publisher: P) -> &mut Self;

    fn get_payload(&mut self) -> Self::PayloadType;

    fn build(&mut self) -> Result<Record<Self::Document>> {
        let payload = self.get_payload();

        let mut json = Self::Document::new(payload, None)?;

        if let Some(signer) = &self.get_signer() {
            if let Some(json_payload) = json.get_payload() {
                let signature = signer.sign(&json_payload).unwrap();
                json.add_signature(signature);
            }
        }

        let encrypted = if let Some(encrypter) = &self.get_encrypter() {
            let encrypt_value = encrypter.encrypt(&json.get_payload())?;
            Some(
                serde_json::to_vec(&encrypt_value)
                    .map_err(|e| BuilderError::EncryptionError(e.to_string()))?,
            )
        } else {
            None
        };

        let publish_url = self
            .get_publisher()
            .as_ref()
            .map(|publisher| publisher.publish(&json.get_payload()).unwrap());

        Ok(Record::new(json, encrypted, publish_url))
    }
}

impl_builder! { from_string, from_publisher_with_string, FromStringBuilder, String, BaseDocument<String> }
impl_builder! { from_json, from_publisher_with_json, FromJsonBuilder, String, JSONDocument }
