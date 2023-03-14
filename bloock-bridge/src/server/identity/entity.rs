use bloock_core::identity::entity::{
    credential::Credential as CoreCredential, credential::CredentialBody as CoreCredentialBody,
    credential::CredentialProof as CoreCredentialProof,
    credential::CredentialSchema as CoreCredentialSchema,
    credential::CredentialStatus as CoreCredentialStatus,
    credential_offer::CredentialOffer as CoreCredentialOffer,
    credential_offer::CredentialOfferBody as CoreCredentialOfferBody,
    credential_offer::CredentialOfferBodyCredential as CoreCredentialOfferBodyCredential,
};

use crate::{
    error::BridgeError,
    items::{
        Credential, CredentialBody, CredentialOffer, CredentialOfferBody,
        CredentialOfferBodyCredentials, CredentialProof, CredentialSchema, CredentialStatus,
    },
};

impl From<CoreCredentialOffer> for CredentialOffer {
    fn from(value: CoreCredentialOffer) -> Self {
        CredentialOffer {
            thid: value.thid,
            body: Some(CredentialOfferBody {
                url: value.body.url,
                credentials: value
                    .body
                    .credentials
                    .into_iter()
                    .map(|c| CredentialOfferBodyCredentials {
                        id: c.id,
                        description: c.description,
                    })
                    .collect(),
            }),
            from: value.from,
            to: value.to,
        }
    }
}

impl TryFrom<CredentialOffer> for CoreCredentialOffer {
    type Error = BridgeError;

    fn try_from(value: CredentialOffer) -> Result<Self, Self::Error> {
        let body = value.body.ok_or(BridgeError::RequestDeserialization(
            "couldn't deserialize credential offer body".to_string(),
        ))?;

        Ok(CoreCredentialOffer {
            thid: value.thid,
            body: CoreCredentialOfferBody {
                url: body.url,
                credentials: body
                    .credentials
                    .into_iter()
                    .map(|c| CoreCredentialOfferBodyCredential {
                        id: c.id,
                        description: c.description,
                    })
                    .collect(),
            },
            from: value.from,
            to: value.to,
        })
    }
}

impl From<CoreCredential> for Credential {
    fn from(value: CoreCredential) -> Self {
        Credential {
            thread_id: value.thread_id,
            body: Some(CredentialBody {
                context: value.body.context,
                id: value.body.id,
                r#type: value.body.r#type,
                issuance_date: value.body.issuance_date,
                credential_subject: value.body.credential_subject.to_string(),
                credential_status: Some(CredentialStatus {
                    id: value.body.credential_status.id,
                    revocation_nonce: value.body.credential_status.revocation_nonce,
                    r#type: value.body.credential_status.r#type,
                }),
                issuer: value.body.issuer,
                credential_schema: Some(CredentialSchema {
                    id: value.body.credential_schema.id,
                    r#type: value.body.credential_schema.r#type,
                }),
                proof: Some(CredentialProof {
                    bloock_proof: Some(value.body.proof.1.into()),
                    signature_proof: Some(value.body.proof.0.into()),
                }),
            }),
        }
    }
}

impl TryFrom<Credential> for CoreCredential {
    type Error = BridgeError;

    fn try_from(value: Credential) -> Result<Self, Self::Error> {
        let body = value.body.ok_or(BridgeError::RequestDeserialization(
            "couldn't deserialize credential offer body".to_string(),
        ))?;

        let credential_status =
            body.credential_status
                .ok_or(BridgeError::RequestDeserialization(
                    "couldn't deserialize credential status".to_string(),
                ))?;

        let credential_schema =
            body.credential_schema
                .ok_or(BridgeError::RequestDeserialization(
                    "couldn't deserialize credential schema".to_string(),
                ))?;

        let credential_proof = body.proof.ok_or(BridgeError::RequestDeserialization(
            "couldn't deserialize proof".to_string(),
        ))?;

        let bloock_proof =
            credential_proof
                .bloock_proof
                .ok_or(BridgeError::RequestDeserialization(
                    "couldn't deserialize bloock proof".to_string(),
                ))?;

        let signature_proof =
            credential_proof
                .signature_proof
                .ok_or(BridgeError::RequestDeserialization(
                    "couldn't deserialize signature proof".to_string(),
                ))?;

        Ok(CoreCredential {
            thread_id: value.thread_id,
            body: CoreCredentialBody {
                context: body.context,
                id: body.id,
                r#type: body.r#type,
                issuance_date: body.issuance_date,
                credential_subject: serde_json::from_str(&body.credential_subject).map_err(
                    |_| {
                        BridgeError::RequestDeserialization(
                            "couldn't deserialize credential subject".to_string(),
                        )
                    },
                )?,
                credential_status: CoreCredentialStatus {
                    id: credential_status.id,
                    revocation_nonce: credential_status.revocation_nonce,
                    r#type: credential_status.r#type,
                },
                issuer: body.issuer,
                credential_schema: CoreCredentialSchema {
                    id: credential_schema.id,
                    r#type: credential_schema.r#type,
                },
                proof: CoreCredentialProof(signature_proof.try_into()?, bloock_proof.try_into()?),
            },
        })
    }
}
