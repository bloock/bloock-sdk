use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct Anchor {
    pub id: i64,
    pub block_roots: Vec<String>,
    pub networks: Vec<AnchorNetwork>,
    pub root: String,
    pub status: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct AnchorNetwork {
    pub name: String,
    pub state: String,
    pub tx_hash: String,
}
