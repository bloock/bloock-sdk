use serde::{Deserialize, Serialize};
use serde_json::Value;

use super::proof::CredentialProof;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct Credential {
    #[serde(rename = "@context")]
    pub context: Vec<String>,
    pub id: String,
    pub r#type: Vec<String>,
    #[serde(rename = "issuanceDate")]
    pub issuance_date: String,
    #[serde(rename = "expirationDate")]
    pub expiration_date: String,
    #[serde(rename = "credentialSubject")]
    pub credential_subject: Value,
    #[serde(rename = "credentialStatus")]
    pub credential_status: CredentialStatus,
    pub issuer: String,
    #[serde(rename = "credentialSchema")]
    pub credential_schema: CredentialSchema,
    pub proof: Option<CredentialProof>,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct CredentialStatus {
    pub id: String,
    #[serde(rename = "revocationNonce")]
    pub revocation_nonce: i64,
    pub r#type: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct CredentialSchema {
    pub id: String,
    pub r#type: String,
}

#[cfg(test)]
mod tests {
    use serde_json::Value;

    use crate::identity::entity::credential::Credential;

    #[tokio::test]
    async fn test_serialization() {
        let json = "{\"id\":\"https://identity-managed-api.bloock.dev/v1/credentials/181bfa3a-b125-4436-9ed4-d8ef056f49ea\",\"@context\":[\"https://www.w3.org/2018/credentials/v1\",\"https://schema.iden3.io/core/jsonld/iden3proofs.jsonld\",\"https://api.bloock.dev/hosting/v1/ipfs/QmTHpnDqZmvswy1UT62EbywdXo7CP6NNKPFMTdCzSuFiEu\"],\"type\":[\"VerifiableCredential\",\"Test1\"],\"expirationDate\":\"2024-02-13T00:00:00Z\",\"issuanceDate\":\"2024-02-13T14:08:33.534601532Z\",\"credentialSubject\":{\"id\":\"did:polygonid:polygon:mumbai:2qFh2MNxniqVnoPhmaKwFF3AUH3dkW9hXX4fSEP6eN\",\"nombre\":\"Nombre\",\"type\":\"Test1\"},\"credentialStatus\":{\"id\":\"https://api.bloock.dev/identityV2/v1/did:polygonid:polygon:mumbai:2qNmTmyJtYeU6hEceRnzpnmHn172G5LwxoHvQVEsMN/claims/revocation/status/2096739002\",\"revocationNonce\":2096739002,\"type\":\"SparseMerkleTreeProof\"},\"issuer\":\"did:polygonid:polygon:mumbai:2qNmTmyJtYeU6hEceRnzpnmHn172G5LwxoHvQVEsMN\",\"credentialSchema\":{\"id\":\"https://api.bloock.dev/hosting/v1/ipfs/QmQXC4StapEWTSqTRyS7U9utWma5KiXKBGYeKukSjLRWT1\",\"type\":\"JsonSchema2023\"},\"proof\":[{\"type\":\"BJJSignature2021\",\"issuerData\":{\"id\":\"did:polygonid:polygon:mumbai:2qNmTmyJtYeU6hEceRnzpnmHn172G5LwxoHvQVEsMN\",\"state\":{\"claimsTreeRoot\":\"cb75409fbe15358963d6f01fd65408fdbb623515c02e6ff82a93941e52b3fb09\",\"value\":\"b33a2e030ee2e232163ff57bfe59284aa0be6b7160314e9e72876ff119baa70e\"},\"authCoreClaim\":\"cca3371a6cb1b715004407e325bd993c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007cd09dbfcc727418e5a139ccf1e7cb28eac581d2900f0e8511f7488f7f9929195bbaa9a34ee1dfbf11b713b2dbe5d3e5062b9a243458e7d3c08c21840360161c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000\",\"mtp\":{\"existence\":true,\"siblings\":[]},\"credentialStatus\":{\"id\":\"https://api.bloock.dev/identityV2/v1/did%3Apolygonid%3Apolygon%3Amumbai%3A2qNmTmyJtYeU6hEceRnzpnmHn172G5LwxoHvQVEsMN/claims/revocation/status/0\",\"revocationNonce\":0,\"type\":\"SparseMerkleTreeProof\"}},\"coreClaim\":\"936d88e4efdc51734fbd6ac870ac35202a00000000000000000000000000000002124700b54ff925219eaa6df59e29274c59b4887d5a7958225be6080d370b00aa3620133335582bc1351f39349ea431002160a7e92500db7169a92b052c720c0000000000000000000000000000000000000000000000000000000000000000bab2f97c0000000000b1ca650000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000\",\"signature\":\"a33a3529cb72af1be86d4e422955bf750693cb5459b7da5e8aeca9564de4c5aec102f7597cd64662c07c8396964572024ddbba71e3708f39d7831f15c60c3f04\"}]}";
        let value: Value = serde_json::from_str(json).unwrap();

        let credential: Credential = serde_json::from_value(value.clone()).unwrap();

        let credential_json = serde_json::to_value(credential).unwrap();

        assert_eq!(credential_json, value);
    }
}
