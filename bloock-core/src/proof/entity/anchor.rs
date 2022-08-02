use crate::anchor::entity::anchor::AnchorNetwork;

#[derive(serde::Serialize, serde::Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct ProofAnchor {
    pub anchor_id: i64,
    pub networks: Vec<AnchorNetwork>,
    pub root: String,
    pub status: String,
}
