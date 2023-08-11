use bloock_merkletree_rs::{
    db::{self, memory::MemoryStorage},
    merkletree::{self, MerkleTree},
};

pub struct Merkle {
    pub merkle_tree: MerkleTree<MemoryStorage>,
}

impl Merkle {
    pub async fn default() -> Result<Self, String> {
        let db = db::memory::MemoryStorage::default();
        let merkle_tree = merkletree::MerkleTree::new(db, 40)
            .await
            .map_err(|e| e.to_string())?;

        Ok(Self { merkle_tree })
    }
}
