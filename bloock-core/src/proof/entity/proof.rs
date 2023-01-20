use std::convert::TryInto;

use crate::error::BloockResult;
use crate::proof::ProofError;

use super::anchor::ProofAnchor;
use bloock_hasher::H256;
use serde::ser::{Serialize, SerializeStruct, Serializer};
use serde::{de::Error, Deserialize, Deserializer};

#[derive(Deserialize, Clone, Debug, Eq, PartialEq)]
pub struct Proof {
    pub anchor: ProofAnchor,
    pub bitmap: String,
    pub depth: String,
    #[serde(deserialize_with = "from_hex")]
    pub leaves: Vec<H256>,
    #[serde(deserialize_with = "from_hex")]
    pub nodes: Vec<H256>,
}

impl Proof {
    #[allow(dead_code)]
    fn is_valid(&self) -> bool {
        if self.depth.len() != (self.leaves.len() + self.nodes.len()) * 4
            && hex::decode(&self.depth).is_ok()
        {
            return false;
        }

        let n_elements = self.leaves.len() + self.nodes.len();
        if self.depth.len() != n_elements * 4 {
            return false;
        }

        if (self.bitmap.len() / 2) < (n_elements + 8 - (n_elements % 8)) / 8 {
            return false;
        }

        true
    }

    #[allow(dead_code)]
    fn to_string(&self) -> serde_json::Result<String> {
        serde_json::to_string(self)
    }

    pub fn get_hash(&self) -> BloockResult<H256> {
        if self.leaves.len() != 1 {
            Err(ProofError::CannotRetrieveHash().into())
        } else {
            Ok(self.leaves[0])
        }
    }
}

impl Serialize for Proof {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let mut state = serializer.serialize_struct("Proof", 5)?;

        let leaves: Vec<String> = self.leaves.iter().map(hex::encode).collect();
        let nodes: Vec<String> = self.nodes.iter().map(hex::encode).collect();
        state.serialize_field("anchor", &self.anchor)?;
        state.serialize_field("bitmap", &self.bitmap)?;
        state.serialize_field("depth", &self.depth)?;
        state.serialize_field("leaves", &leaves)?;
        state.serialize_field("nodes", &nodes)?;
        state.end()
    }
}

fn from_hex<'de, D>(deserializer: D) -> Result<Vec<H256>, D::Error>
where
    D: Deserializer<'de>,
{
    let s: Vec<String> = Deserialize::deserialize(deserializer)?;
    let e = s
        .iter()
        .map(|i| hex::decode(i).map_err(D::Error::custom))
        .collect::<Result<Vec<Vec<u8>>, D::Error>>()?;
    e.iter()
        .map(|i| {
            i.clone()
                .try_into()
                .map_err(|_| D::Error::custom("couldn't deserialize from hex"))
        })
        .collect::<Result<Vec<H256>, D::Error>>()
}

#[cfg(test)]
mod tests {
    use bloock_hasher::from_hex;

    use crate::{anchor::entity::anchor::AnchorNetwork, proof::entity::anchor::ProofAnchor};

    use super::Proof;

    #[test]
    fn test_is_valid_ok() {
        let network = AnchorNetwork {
            name: "bloock_chain".to_string(),
            state: "Confirmed".to_string(),
            tx_hash: "0x82a2226903e043750cd57e2f64281f8a800e4fe524661861a1fab7b00692b4a5"
                .to_string(),
        };
        let anchor = ProofAnchor {
            anchor_id: 35554,
            networks: vec![network],
            root: "9a09a4e4f831092c64e48ba23faf2f809f12f27e99440ca1e4991dd945391695".to_string(),
            status: "Success".to_string(),
        };

        let proof = Proof {
            leaves: vec![from_hex(
                "02aae7e86eb50f61a62083a320475d9d60cbd52749dbf08fa942b1b97f50aee5",
            )
            .unwrap()],
            nodes: vec![
                from_hex("bb6986853646d083929d1d92638f3d4741a3b7149bd2b63c6bfedd32e3c684d3")
                    .unwrap(),
                from_hex("0616067c793ac533815ae2d48d785d339e0330ce5bb5345b5e6217dd9d1dbeab")
                    .unwrap(),
                from_hex("68b8f6b25cc700e64ed3e3d33f2f246e24801f93d29786589fbbab3b11f5bcee")
                    .unwrap(),
            ],
            depth: "0004000600060005".to_string(),
            bitmap: "bfdf7000".to_string(),
            anchor,
        };

        assert!(proof.is_valid())
    }

    #[test]
    fn test_is_valid_minimalist() {
        let network = AnchorNetwork {
            name: "bloock_chain".to_string(),
            state: "Confirmed".to_string(),
            tx_hash: "0x82a2226903e043750cd57e2f64281f8a800e4fe524661861a1fab7b00692b4a5"
                .to_string(),
        };
        let anchor = ProofAnchor {
            anchor_id: 35554,
            networks: vec![network],
            root: "9a09a4e4f831092c64e48ba23faf2f809f12f27e99440ca1e4991dd945391695".to_string(),
            status: "Success".to_string(),
        };

        let proof = Proof {
            leaves: vec![from_hex(
                "02aae7e86eb50f61a62083a320475d9d60cbd52749dbf08fa942b1b97f50aee5",
            )
            .unwrap()],
            nodes: vec![],
            depth: "0004".to_string(),
            bitmap: "bf".to_string(),
            anchor,
        };

        assert!(proof.is_valid())
    }

    #[test]
    fn test_is_valid_bitmap_too_short() {
        let network = AnchorNetwork {
            name: "bloock_chain".to_string(),
            state: "Confirmed".to_string(),
            tx_hash: "0x82a2226903e043750cd57e2f64281f8a800e4fe524661861a1fab7b00692b4a5"
                .to_string(),
        };
        let anchor = ProofAnchor {
            anchor_id: 35554,
            networks: vec![network],
            root: "9a09a4e4f831092c64e48ba23faf2f809f12f27e99440ca1e4991dd945391695".to_string(),
            status: "Success".to_string(),
        };

        let proof = Proof {
            leaves: vec![from_hex(
                "02aae7e86eb50f61a62083a320475d9d60cbd52749dbf08fa942b1b97f50aee5",
            )
            .unwrap()],
            nodes: vec![
                from_hex("bb6986853646d083929d1d92638f3d4741a3b7149bd2b63c6bfedd32e3c684d3")
                    .unwrap(),
                from_hex("0616067c793ac533815ae2d48d785d339e0330ce5bb5345b5e6217dd9d1dbeab")
                    .unwrap(),
                from_hex("68b8f6b25cc700e64ed3e3d33f2f246e24801f93d29786589fbbab3b11f5bcee")
                    .unwrap(),
            ],
            depth: "0004000600060005000600060005000600060005".to_string(),
            bitmap: "bf".to_string(),
            anchor,
        };

        assert!(!proof.is_valid())
    }

    #[test]
    fn test_is_valid_depth_too_short() {
        let network = AnchorNetwork {
            name: "bloock_chain".to_string(),
            state: "Confirmed".to_string(),
            tx_hash: "0x82a2226903e043750cd57e2f64281f8a800e4fe524661861a1fab7b00692b4a5"
                .to_string(),
        };
        let anchor = ProofAnchor {
            anchor_id: 35554,
            networks: vec![network],
            root: "9a09a4e4f831092c64e48ba23faf2f809f12f27e99440ca1e4991dd945391695".to_string(),
            status: "Success".to_string(),
        };

        let proof = Proof {
            leaves: vec![from_hex(
                "02aae7e86eb50f61a62083a320475d9d60cbd52749dbf08fa942b1b97f50aee5",
            )
            .unwrap()],
            nodes: vec![
                from_hex("bb6986853646d083929d1d92638f3d4741a3b7149bd2b63c6bfedd32e3c684d3")
                    .unwrap(),
                from_hex("0616067c793ac533815ae2d48d785d339e0330ce5bb5345b5e6217dd9d1dbeab")
                    .unwrap(),
                from_hex("68b8f6b25cc700e64ed3e3d33f2f246e24801f93d29786589fbbab3b11f5bcee")
                    .unwrap(),
            ],
            depth: "000400060006000".to_string(),
            bitmap: "bfdf7000".to_string(),
            anchor,
        };

        assert!(!proof.is_valid())
    }

    #[test]
    fn test_is_valid_depth_too_long() {
        let network = AnchorNetwork {
            name: "bloock_chain".to_string(),
            state: "Confirmed".to_string(),
            tx_hash: "0x82a2226903e043750cd57e2f64281f8a800e4fe524661861a1fab7b00692b4a5"
                .to_string(),
        };
        let anchor = ProofAnchor {
            anchor_id: 35554,
            networks: vec![network],
            root: "9a09a4e4f831092c64e48ba23faf2f809f12f27e99440ca1e4991dd945391695".to_string(),
            status: "Success".to_string(),
        };

        let proof = Proof {
            leaves: vec![from_hex(
                "02aae7e86eb50f61a62083a320475d9d60cbd52749dbf08fa942b1b97f50aee5",
            )
            .unwrap()],
            nodes: vec![
                from_hex("bb6986853646d083929d1d92638f3d4741a3b7149bd2b63c6bfedd32e3c684d3")
                    .unwrap(),
                from_hex("0616067c793ac533815ae2d48d785d339e0330ce5bb5345b5e6217dd9d1dbeab")
                    .unwrap(),
                from_hex("68b8f6b25cc700e64ed3e3d33f2f246e24801f93d29786589fbbab3b11f5bcee")
                    .unwrap(),
            ],
            depth: "0004000600060".to_string(),
            bitmap: "bfdf7000".to_string(),
            anchor,
        };

        assert!(!proof.is_valid())
    }
}
