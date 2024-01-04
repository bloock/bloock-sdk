use bloock_core::identity_v2::entity::{
    credential::{
        Credential as CoreCredential, CredentialSchema as CoreCredentialSchema,
        CredentialStatus as CoreCredentialStatus,
    },
    did_metadata::DidMetadata,
    proof::CredentialProof as CoreCredentialProof, publish_interval::PublishInterval as CorePublishInterval,
};
use bloock_identity_rs::did::{Blockchain as CoreBlockchain, DIDMethod, Network as CoreNetworkId};

use crate::{
    error::BridgeError,
    items::{
        Blockchain, CredentialProofV2, CredentialSchemaV2, CredentialStatusV2, CredentialV2,
        DidParams, Method, NetworkId, PublishInterval,
    },
};

impl From<DidParams> for DidMetadata {
    fn from(n: DidParams) -> Self {
        let method = match n.method() {
            Method::Iden3 => DIDMethod::Iden3,
            Method::PolygonId => DIDMethod::PolygonID,
        };

        let blockchain = match n.blockchain() {
            Blockchain::Ethereum => CoreBlockchain::Ethereum,
            Blockchain::Polygon => CoreBlockchain::Polygon,
            Blockchain::UnknownChain => CoreBlockchain::Polygon,
            Blockchain::NoChain => CoreBlockchain::Polygon,
        };

        let network_id = match n.network_id() {
            NetworkId::Main => CoreNetworkId::Main,
            NetworkId::Mumbai => CoreNetworkId::Mumbai,
            NetworkId::Goerli => CoreNetworkId::Goerli,
            NetworkId::UnknownNetwork => CoreNetworkId::Mumbai,
            NetworkId::NoNetwork => CoreNetworkId::Mumbai,
        };

        Self {
            method,
            blockchain,
            network: network_id,
        }
    }
}

impl From<Blockchain> for CoreBlockchain {
    fn from(n: Blockchain) -> Self {
        match n {
            Blockchain::Ethereum => CoreBlockchain::Ethereum,
            Blockchain::Polygon => CoreBlockchain::Polygon,
            Blockchain::UnknownChain => CoreBlockchain::Polygon,
            Blockchain::NoChain => CoreBlockchain::Polygon,
        }
    }
}

impl From<NetworkId> for CoreNetworkId {
    fn from(n: NetworkId) -> Self {
        match n {
            NetworkId::Main => CoreNetworkId::Main,
            NetworkId::Mumbai => CoreNetworkId::Mumbai,
            NetworkId::Goerli => CoreNetworkId::Goerli,
            NetworkId::UnknownNetwork => CoreNetworkId::Mumbai,
            NetworkId::NoNetwork => CoreNetworkId::Mumbai,
        }
    }
}

impl From<PublishInterval> for CorePublishInterval {
    fn from(p: PublishInterval) -> Self {
        match p {
            PublishInterval::Interval1 => CorePublishInterval::Interval1,
            PublishInterval::Interval5 => CorePublishInterval::Interval5,
            PublishInterval::Interval15 => CorePublishInterval::Interval15,
            PublishInterval::Interval60 => CorePublishInterval::Interval60,
        }
    }
}

impl TryFrom<CoreCredential> for CredentialV2 {
    type Error = BridgeError;

    fn try_from(value: CoreCredential) -> Result<Self, Self::Error> {
        let credential_proof = value.proof.ok_or_else(|| {
            BridgeError::RequestDeserialization("couldn't deserialize credential proof".to_string())
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
            proof: Some(CredentialProofV2 {
                signature_proof: credential_proof.signature_proof,
                sparse_mt_proof: credential_proof.sparse_mt_proof,
            }),
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
