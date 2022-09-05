use crate::document::Document;
use bloock_hashing::hashing::{Hashing, Keccak256};

pub struct Record<D: Document> {
    document: D,
    hash: String,
    encrypted: Option<Vec<u8>>,
    publish_url: Option<String>,
}

impl<D: Document> Record<D> {
    pub fn new(document: D, encrypted: Option<Vec<u8>>, publish_url: Option<String>) -> Self {
        let hashing_algorithm = Keccak256::default();
        let hash = match document.get_payload() {
            Some(p) => hashing_algorithm.generate_hash(&p),
            None => hashing_algorithm.generate_hash(&[]),
        };
        Self {
            document,
            hash,
            encrypted,
            publish_url,
        }
    }

    pub fn get_hash(self) -> String {
        hex::encode(self.hash)
    }

    pub fn get_hash_bytes(self) -> Vec<u8> {
        self.hash.into_bytes()
    }

    pub fn retrieve(mut self) -> Vec<u8> {
        match self.encrypted {
            Some(e) => e,
            None => self.document.build(),
        }
    }

    pub fn get_publish_url(self) -> Option<String> {
        self.publish_url
    }
}
