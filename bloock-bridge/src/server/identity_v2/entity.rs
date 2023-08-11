use bloock_core::identity_v2::entity::{
    credential::{
        Credential as CoreCredential, CredentialSchema as CoreCredentialSchema,
        CredentialStatus as CoreCredentialStatus,
    },
    proof_type::ProofType as CoreProofType,
};

use crate::{
    error::BridgeError,
    items::{CredentialSchemaV2, CredentialStatusV2, CredentialV2, ProofType},
};

impl From<ProofType> for CoreProofType {
    fn from(a: ProofType) -> Self {
        match a {
            ProofType::BloockProof => CoreProofType::BloockProof,
            ProofType::PolygonMtp => CoreProofType::PolygonMtp,
        }
    }
}

impl TryFrom<CoreCredential> for CredentialV2 {
    type Error = BridgeError;

    fn try_from(value: CoreCredential) -> Result<Self, Self::Error> {
        let credential_proof = value.proof.ok_or_else(|| {
            BridgeError::RequestDeserialization("couldn't deserialize proof".to_string())
        })?;

        Ok(CredentialV2 {
            context: value.context,
            id: value.id,
            r#type: value.r#type,
            issuance_date: value.issuance_date,
            expiration: value.expiration_date,
            credential_subject: value.credential_subject.to_string(),
            credential_status: Some(CredentialStatusV2 {
                id: value.credential_status.id,
                revocation_nonce: value.credential_status.revocation_nonce,
                r#type: value.credential_status.r#type,
            }),
            issuer: value.issuer,
            credential_schema: Some(CredentialSchemaV2 {
                id: value.credential_schema.id,
                r#type: value.credential_schema.r#type,
            }),
            proof: credential_proof.to_string(),
        })
    }
}

impl TryFrom<CredentialV2> for CoreCredential {
    type Error = BridgeError;

    fn try_from(value: CredentialV2) -> Result<Self, Self::Error> {
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
            proof: serde_json::from_str(&value.proof).map_err(|_| {
                BridgeError::RequestDeserialization(
                    "couldn't deserialize credential proof".to_string(),
                )
            })?,
        })
    }
}
