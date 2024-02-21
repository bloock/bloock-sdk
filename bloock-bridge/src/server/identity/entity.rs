use bloock_core::identity::entity::{
    credential::{
        Credential as CoreCredential, CredentialSchema as CoreCredentialSchema,
        CredentialStatus as CoreCredentialStatus,
    },
    did_method::DidMethod as DidMethodCore,
    proof::CredentialProof as CoreCredentialProof,
    publish_interval::PublishInterval as CorePublishInterval,
};

use crate::{
    error::BridgeError,
    items::{
        Credential, CredentialProof, CredentialSchema, CredentialStatus, DidMethod, PublishInterval,
    },
};

impl From<DidMethod> for DidMethodCore {
    fn from(n: DidMethod) -> Self {
        match n {
            DidMethod::PolygonId => DidMethodCore::PolygonID,
            DidMethod::PolygonIdTest => DidMethodCore::PolygonIDTest,
        }
    }
}

impl From<PublishInterval> for CorePublishInterval {
    fn from(p: PublishInterval) -> Self {
        match p {
            PublishInterval::Interval5 => CorePublishInterval::Interval5,
            PublishInterval::Interval15 => CorePublishInterval::Interval15,
            PublishInterval::Interval60 => CorePublishInterval::Interval60,
        }
    }
}

impl TryFrom<CoreCredential> for Credential {
    type Error = BridgeError;

    fn try_from(value: CoreCredential) -> Result<Self, Self::Error> {
        let credential_proof = value.proof.ok_or_else(|| {
            BridgeError::RequestDeserialization("couldn't deserialize credential proof".to_string())
        })?;

        Ok(Credential {
            context: value.context,
            id: value.id,
            r#type: value.r#type,
            issuance_date: value.issuance_date,
            expiration: value.expiration_date,
            credential_subject: value.credential_subject.to_string(),
            credential_status: Some(CredentialStatus {
                id: value.credential_status.id,
                revocation_nonce: value.credential_status.revocation_nonce,
                r#type: value.credential_status.r#type,
            }),
            issuer: value.issuer,
            credential_schema: Some(CredentialSchema {
                id: value.credential_schema.id,
                r#type: value.credential_schema.r#type,
            }),
            proof: Some(CredentialProof {
                signature_proof: credential_proof.signature_proof,
                sparse_mt_proof: credential_proof.sparse_mt_proof,
            }),
        })
    }
}

impl TryFrom<Credential> for CoreCredential {
    type Error = BridgeError;

    fn try_from(value: Credential) -> Result<Self, Self::Error> {
        let credential_status = value.credential_status.ok_or_else(|| {
            BridgeError::RequestDeserialization(
                "couldn't deserialize credential status".to_string(),
            )
        })?;

        let credential_schema = value.credential_schema.ok_or_else(|| {
            BridgeError::RequestDeserialization(
                "couldn't deserialize credential schema".to_string(),
            )
        })?;

        let credential_proof = value.proof.ok_or_else(|| {
            BridgeError::RequestDeserialization("couldn't deserialize credential proof".to_string())
        })?;

        Ok(CoreCredential {
            context: value.context,
            id: value.id,
            r#type: value.r#type,
            issuance_date: value.issuance_date,
            expiration_date: value.expiration,
            credential_subject: serde_json::from_str(&value.credential_subject).map_err(|_| {
                BridgeError::RequestDeserialization(
                    "couldn't deserialize credential subject".to_string(),
                )
            })?,
            credential_status: CoreCredentialStatus {
                id: credential_status.id,
                revocation_nonce: credential_status.revocation_nonce,
                r#type: credential_status.r#type,
            },
            issuer: value.issuer,
            credential_schema: CoreCredentialSchema {
                id: credential_schema.id,
                r#type: credential_schema.r#type,
            },

            proof: Some(CoreCredentialProof {
                signature_proof: credential_proof.signature_proof,
                sparse_mt_proof: credential_proof.sparse_mt_proof,
            }),
        })
    }
}
