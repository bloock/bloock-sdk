use crate::anchor::entity::network::Network;

#[derive(serde::Deserialize)]
pub struct Anchor {
    pub id: i32,
    pub block_roots: Vec<String>,
    pub networks: Vec<Network>,
    pub root: String,
    pub status: String,
}
