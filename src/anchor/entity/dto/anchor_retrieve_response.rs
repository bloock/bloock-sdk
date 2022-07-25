use crate::anchor::entity::network::Network;

struct AnchorRetrieveResponse {
    pub anchor_id: i32,
    pub block_roots: Vec<String>,
    pub networks: Vec<Network>,
    pub root: String,
    pub status: String,
}
