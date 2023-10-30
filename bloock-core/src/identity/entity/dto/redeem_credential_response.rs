use bloock_signer::format::jws::JwsSignature;
use serde::{Deserialize, Serialize};
use serde_json::Value;

use crate::integrity::entity::proof::Proof;

#[derive(Serialize, Deserialize, Debug)]
pub struct RedeemCredentialResponse {
    #[serde(rename(deserialize = "threadID"))]
    pub thread_id: String,
    pub body: RedeemCredentialBody,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RedeemCredentialBody {
    #[serde(rename(deserialize = "@context"))]
    pub context: Vec<String>,
    pub id: String,
    pub r#type: Vec<String>,
    #[serde(rename(deserialize = "issuanceDate"))]
    pub issuance_date: String,
    #[serde(rename(deserialize = "credentialSubject"))]
    pub credential_subject: Value,
    #[serde(rename(deserialize = "credentialStatus"))]
    pub credential_status: RedeemCredentialStatus,
    pub issuer: String,
    #[serde(rename(deserialize = "credentialSchema"))]
    pub credential_schema: RedeemCredentialSchema,
    pub proof: RedeemCredentialProof,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct RedeemCredentialStatus {
    pub id: String,
    #[serde(rename(deserialize = "revocationNonce"))]
    pub revocation_nonce: i64,
    pub r#type: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct RedeemCredentialSchema {
    pub id: String,
    pub r#type: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct RedeemCredentialProof(pub JwsSignature, pub Proof);
