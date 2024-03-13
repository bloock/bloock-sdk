use crate::{
    error::{BridgeError, BridgeResult},
    items::{
        AuthenticityDetails, AvailabilityDetails, EncryptionDetails, IntegrityDetails, Record,
        RecordDetails,
    },
    server::config::entity::map_config,
};
use bloock_core::record::{
    document::Document, entity::record::Record as RecordCore,
    entity::record_details::AuthenticityDetails as AuthenticityDetailsCore,
    entity::record_details::AvailabilityDetails as AvailabilityDetailsCore,
    entity::record_details::EncryptionDetails as EncryptionDetailsCore,
    entity::record_details::IntegrityDetails as IntegrityDetailsCore,
    entity::record_details::RecordDetails as RecordDetailsCore,
};
use std::convert::TryFrom;

impl TryFrom<Record> for RecordCore {
    type Error = BridgeError;
    fn try_from(r: Record) -> BridgeResult<RecordCore> {
        let config_data = map_config(r.config_data.clone())?;

        let document = Document::new(
            &r.payload,
            config_data.get_config().host,
            config_data.get_config().api_key,
        )?;
        if document.is_encrypted() {
            // when a record is encrypted, we cannot generate the hash,
            // so we grab the one we generated before encryption
            RecordCore::new_with_hash(document, &r.hash).map_err(BridgeError::BloockError)
        } else {
            RecordCore::new(document).map_err(BridgeError::BloockError)
        }
    }
}

impl TryFrom<RecordCore> for Record {
    type Error = BridgeError;
    fn try_from(r: RecordCore) -> BridgeResult<Record> {
        let hash = r.get_hash();
        let payload = r.serialize()?;

        Ok(Record {
            config_data: None,
            payload,
            hash,
        })
    }
}

impl From<IntegrityDetailsCore> for IntegrityDetails {
    fn from(r: IntegrityDetailsCore) -> Self {
        Self {
            hash: r.hash,
            proof: r.proof.map(|p| p.into()),
        }
    }
}

impl From<AuthenticityDetailsCore> for AuthenticityDetails {
    fn from(r: AuthenticityDetailsCore) -> Self {
        Self {
            signatures: r.signatures.iter().map(|s| s.clone().into()).collect(),
        }
    }
}

impl From<EncryptionDetailsCore> for EncryptionDetails {
    fn from(r: EncryptionDetailsCore) -> Self {
        Self {
            alg: r.encrypt_alg,
            key: r.key.clone().map(|k| k.key),
            subject: r.key.and_then(|k| k.subject),
        }
    }
}

impl From<AvailabilityDetailsCore> for AvailabilityDetails {
    fn from(r: AvailabilityDetailsCore) -> Self {
        Self {
            size: r.size as i64,
            r#type: r.content_type,
        }
    }
}

impl From<RecordDetailsCore> for RecordDetails {
    fn from(r: RecordDetailsCore) -> Self {
        Self {
            integrity: r.integrity.map(|i| i.into()),
            authenticity: r.authenticity.map(|i| i.into()),
            encryption: r.encryption.map(|i| i.into()),
            availability: r.availability.map(|i| i.into()),
        }
    }
}
