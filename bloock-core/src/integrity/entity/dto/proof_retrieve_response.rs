use crate::integrity::entity::proof::ProofAnchor;

#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct ProofRetrieveResponse {
    pub leaves: Vec<String>,
    pub nodes: Vec<String>,
    pub depth: String,
    pub bitmap: String,
    pub anchor: ProofAnchor,
    pub root: String,
}
