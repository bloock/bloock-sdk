use bloock_core::identity::entity::{
    credential::Credential as CoreCredential, credential::CredentialProof as CoreCredentialProof,
    credential::CredentialSchema as CoreCredentialSchema,
    credential::CredentialStatus as CoreCredentialStatus,
    credential_offer::CredentialOffer as CoreCredentialOffer,
    credential_offer::CredentialOfferBody as CoreCredentialOfferBody,
    credential_offer::CredentialOfferBodyCredential as CoreCredentialOfferBodyCredential,
};
use bloock_hasher::HashAlg;
use bloock_signer::format::jws::{JwsSignature, JwsSignatureHeader};

use crate::{
    error::BridgeError,
    items::{
        Credential, CredentialOffer, CredentialOfferBody, CredentialOfferBodyCredentials,
        CredentialProof, CredentialSchema, CredentialStatus, SignatureHeaderJws, SignatureJws,
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
        let body = value.body.ok_or_else(|| {
            BridgeError::RequestDeserialization(
                "couldn't deserialize credential offer body".to_string(),
            )
        })?;

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
            context: value.context,
            id: value.id,
            r#type: value.r#type,
            issuance_date: value.issuance_date,
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
                bloock_proof: value.proof.clone().map(|p| p.1.into()),
                signature_proof: value.proof.map(|p| p.0.into()),
            }),
        }
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
            BridgeError::RequestDeserialization("couldn't deserialize proof".to_string())
        })?;

        let bloock_proof = credential_proof.bloock_proof.ok_or_else(|| {
            BridgeError::RequestDeserialization("couldn't deserialize bloock proof".to_string())
        })?;

        let signature_proof = credential_proof.signature_proof.ok_or_else(|| {
            BridgeError::RequestDeserialization("couldn't deserialize signature proof".to_string())
        })?;

        Ok(CoreCredential {
            context: value.context,
            id: value.id,
            r#type: value.r#type,
            issuance_date: value.issuance_date,
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
            proof: Some(CoreCredentialProof(
                signature_proof.try_into()?,
                bloock_proof.try_into()?,
            )),
        })
    }
}

impl TryFrom<SignatureJws> for JwsSignature {
    type Error = BridgeError;

    fn try_from(s: SignatureJws) -> Result<Self, Self::Error> {
        let jws_header = s.header.ok_or_else(|| {
            BridgeError::RequestDeserialization(
                "couldn't deserialize signature jws header".to_string(),
            )
        })?;

        Ok(Self {
            protected: s.protected,
            signature: s.signature,
            header: jws_header.into(),
            message_hash: s.message_hash,
        })
    }
}

impl From<SignatureHeaderJws> for JwsSignatureHeader {
    fn from(h: SignatureHeaderJws) -> Self {
        Self {
            alg: h.alg,
            kid: h.kid,
            subject: h.subject,
            hash_alg: h.hash_alg.and_then(|h| HashAlg::try_from(h.as_str()).ok()),
        }
    }
}

impl From<JwsSignature> for SignatureJws {
    fn from(h: JwsSignature) -> Self {
        Self {
            signature: h.signature,
            protected: h.protected,
            header: Some(h.header.into()),
            message_hash: h.message_hash,
        }
    }
}

impl From<JwsSignatureHeader> for SignatureHeaderJws {
    fn from(h: JwsSignatureHeader) -> Self {
        Self {
            alg: h.alg,
            kid: h.kid,
            subject: h.subject,
            hash_alg: h.hash_alg.and_then(|h| Some(h.to_string())),
        }
    }
}
