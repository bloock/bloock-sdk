use serde::Deserialize;
use serde::Serialize;

#[derive(Deserialize, Serialize, Clone, Debug, Eq, PartialEq)]
pub struct BjjSignature {
    #[serde(rename = "coreClaim")]
    pub core_claim: String,
    pub signature: String,
    #[serde(rename = "issuerData")]
    pub issuer_data: BjjIssuerData,
}

#[derive(Deserialize, Serialize, Clone, Debug, Eq, PartialEq)]
pub struct BjjIssuerData {
    pub id: String,
    pub mtp: Mtp,
    pub state: BjjState,
    #[serde(rename = "authCoreClaim")]
    pub auth_core_claim: String,
    #[serde(rename = "credentialStatus")]
    pub credential_status: CredentialStatus,
}

#[derive(Deserialize, Serialize, Clone, Debug, Eq, PartialEq)]
pub struct Mtp {
    pub siblings: Vec<String>,
    pub existence: bool,
}

#[derive(Deserialize, Serialize, Clone, Debug, Eq, PartialEq)]
pub struct BjjState {
    pub value: String,
    #[serde(rename = "claimsTreeRoot")]
    pub claims_tree_root: String,
}

#[derive(Deserialize, Serialize, Clone, Debug, Eq, PartialEq)]
pub struct CredentialStatus {
    pub id: String,
    pub r#type: String,
    #[serde(rename = "revocationNonce")]
    pub revocation_none: i64,
}

#[derive(Deserialize, Serialize, Clone, Debug, Eq, PartialEq)]
pub struct SparseMtp {
    pub mtp: Mtp,
    #[serde(rename = "coreClaim")]
    pub core_claim: String,
    #[serde(rename = "issuerData")]
    pub issuer_data: SparseIssuerData,
}

#[derive(Deserialize, Serialize, Clone, Debug, Eq, PartialEq)]
pub struct SparseIssuerData {
    pub id: String,
    pub state: SparseState,
    #[serde(rename = "authCoreClaim")]
    pub auth_core_claim: String
}

#[derive(Deserialize, Serialize, Clone, Debug, Eq, PartialEq)]
pub struct SparseState {
    #[serde(rename = "txId")]
    pub tx_id: String,
    pub value: String,
    #[serde(rename = "blockNumber")]
    pub block_number: i64,
    #[serde(rename = "rootOfRoots")]
    pub root_of_roots: String,
    #[serde(rename = "blockTimestamp")]
    pub block_timestamp: i64,
    #[serde(rename = "claimsTreeRoot")]
    pub claims_tree_root: String,
    #[serde(rename = "revocationTreeRoot")]
    pub revocation_tree_root: String,
}
