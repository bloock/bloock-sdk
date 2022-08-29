use super::anchor::ProofAnchor;

#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct Proof {
    pub leaves: Vec<String>,
    pub nodes: Vec<String>,
    pub depth: String,
    pub bitmap: String,
    pub anchor: ProofAnchor,
}

impl Proof {
    #[allow(dead_code)]
    fn is_valid(&self) -> bool {
        if self
            .leaves
            .iter()
            .any(|l| hex::decode(&l).is_err() || l.len() != 64)
        {
            return false;
        }

        if self
            .nodes
            .iter()
            .any(|n| hex::decode(&n).is_err() || n.len() != 64)
        {
            return false;
        }

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
}

#[cfg(test)]
mod tests {
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
            leaves: vec![
                "02aae7e86eb50f61a62083a320475d9d60cbd52749dbf08fa942b1b97f50aee5".to_string(),
            ],
            nodes: vec![
                "bb6986853646d083929d1d92638f3d4741a3b7149bd2b63c6bfedd32e3c684d3".to_string(),
                "0616067c793ac533815ae2d48d785d339e0330ce5bb5345b5e6217dd9d1dbeab".to_string(),
                "68b8f6b25cc700e64ed3e3d33f2f246e24801f93d29786589fbbab3b11f5bcee".to_string(),
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
            leaves: vec![
                "02aae7e86eb50f61a62083a320475d9d60cbd52749dbf08fa942b1b97f50aee5".to_string(),
            ],
            nodes: vec![],
            depth: "0004".to_string(),
            bitmap: "bf".to_string(),
            anchor,
        };

        assert!(proof.is_valid())
    }

    #[test]
    fn test_is_valid_leaves_not_hex() {
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
            leaves: vec![
                "02aae7e86eb50f61a62083a320475d9d60cbd52749dbf08fa942b1b97f50aeeg".to_string(),
            ],
            nodes: vec![
                "bb6986853646d083929d1d92638f3d4741a3b7149bd2b63c6bfedd32e3c684d3".to_string(),
                "0616067c793ac533815ae2d48d785d339e0330ce5bb5345b5e6217dd9d1dbeab".to_string(),
                "68b8f6b25cc700e64ed3e3d33f2f246e24801f93d29786589fbbab3b11f5bcee".to_string(),
            ],
            depth: "000400060006000500030002000400060007000800090009".to_string(),
            bitmap: "bfdf7000".to_string(),
            anchor,
        };

        assert!(!proof.is_valid());
    }

    #[test]
    fn test_is_valid_nodes_not_hex() {
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
            leaves: vec![
                "02aae7e86eb50f61a62083a320475d9d60cbd52749dbf08fa942b1b97f50aee5".to_string(),
            ],
            nodes: vec![
                "bb6986853646d083929d1d92638f3d4741a3b7149bd2b63c6bfedd32e3c684d3".to_string(),
                "0616067c793ac533815ae2d48d785d339e0330ce5bb5345b5e6217dd9d1dbeag".to_string(),
                "68b8f6b25cc700e64ed3e3d33f2f246e24801f93d29786589fbbab3b11f5bcee".to_string(),
            ],
            depth: "000400060006000500030002000400060007000800090009".to_string(),
            bitmap: "bfdf7000".to_string(),
            anchor,
        };

        assert!(!proof.is_valid())
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
            leaves: vec![
                "02aae7e86eb50f61a62083a320475d9d60cbd52749dbf08fa942b1b97f50aee5".to_string(),
            ],
            nodes: vec![
                "bb6986853646d083929d1d92638f3d4741a3b7149bd2b63c6bfedd32e3c684d3".to_string(),
                "0616067c793ac533815ae2d48d785d339e0330ce5bb5345b5e6217dd9d1dbeab".to_string(),
                "68b8f6b25cc700e64ed3e3d33f2f246e24801f93d29786589fbbab3b11f5bcee".to_string(),
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
            leaves: vec![
                "02aae7e86eb50f61a62083a320475d9d60cbd52749dbf08fa942b1b97f50aee5".to_string(),
            ],
            nodes: vec![
                "bb6986853646d083929d1d92638f3d4741a3b7149bd2b63c6bfedd32e3c684d3".to_string(),
                "0616067c793ac533815ae2d48d785d339e0330ce5bb5345b5e6217dd9d1dbeab".to_string(),
                "68b8f6b25cc700e64ed3e3d33f2f246e24801f93d29786589fbbab3b11f5bcee".to_string(),
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
            leaves: vec![
                "02aae7e86eb50f61a62083a320475d9d60cbd52749dbf08fa942b1b97f50aee5".to_string(),
            ],
            nodes: vec![
                "bb6986853646d083929d1d92638f3d4741a3b7149bd2b63c6bfedd32e3c684d3".to_string(),
                "0616067c793ac533815ae2d48d785d339e0330ce5bb5345b5e6217dd9d1dbeab".to_string(),
                "68b8f6b25cc700e64ed3e3d33f2f246e24801f93d29786589fbbab3b11f5bcee".to_string(),
            ],
            depth: "0004000600060".to_string(),
            bitmap: "bfdf7000".to_string(),
            anchor,
        };

        assert!(!proof.is_valid())
    }
}
