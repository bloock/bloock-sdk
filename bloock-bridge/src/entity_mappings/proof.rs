use bloock_core::proof::entity::{
    anchor::ProofAnchor as ProofAnchorCore, proof::Proof as ProofCore,
};

use crate::items::{Proof, ProofAnchor};

impl Into<Proof> for ProofCore {
    fn into(self) -> Proof {
        Proof {
            leaves: self.leaves,
            nodes: self.nodes,
            depth: self.depth,
            bitmap: self.bitmap,
            anchor: Some(self.anchor.into()),
        }
    }
}

impl Into<ProofAnchor> for ProofAnchorCore {
    fn into(self) -> ProofAnchor {
        ProofAnchor {
            anchor_id: self.anchor_id,
            networks: self
                .networks
                .iter()
                .map(|network| network.clone().into())
                .collect(),
            root: self.root,
            status: self.status,
        }
    }
}
