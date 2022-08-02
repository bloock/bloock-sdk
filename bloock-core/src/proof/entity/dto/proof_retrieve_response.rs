use crate::anchor::entity::anchor::Anchor;

#[derive(serde::Serialize, serde::Deserialize)]
pub struct ProofRetrieveResponse {
    pub leaves: Vec<String>,
    pub nodes: Vec<String>,
    pub depth: String,
    pub bitmap: String,
    pub anchor: Anchor,
}
