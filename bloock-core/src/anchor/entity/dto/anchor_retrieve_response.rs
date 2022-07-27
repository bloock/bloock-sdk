use crate::anchor::entity::anchor::AnchorNetwork;

struct AnchorRetrieveResponse {
    pub anchor_id: i32,
    pub block_roots: Vec<String>,
    pub networks: Vec<AnchorNetwork>,
    pub root: String,
    pub status: String,
}
