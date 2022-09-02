use bloock_core::proof::entity::{
    anchor::ProofAnchor as ProofAnchorCore, proof::Proof as ProofCore,
};

use crate::{
    error::BridgeError,
    items::{Proof, ProofAnchor},
};

impl From<ProofCore> for Proof {
    fn from(p: ProofCore) -> Self {
        Self {
            leaves: p.leaves,
            nodes: p.nodes,
            depth: p.depth,
            bitmap: p.bitmap,
            anchor: Some(p.anchor.into()),
        }
    }
}

impl From<Proof> for Result<ProofCore, BridgeError> {
    fn from(p: Proof) -> Self {
        let anchor = match p.anchor {
            Some(anchor) => anchor,
            None => return Err(BridgeError::MissingAnchor),
        };
        Ok(ProofCore {
            leaves: p.leaves,
            nodes: p.nodes,
            depth: p.depth,
            bitmap: p.bitmap,
            anchor: anchor.into(),
        })
    }
}

impl From<ProofAnchorCore> for ProofAnchor {
    fn from(p: ProofAnchorCore) -> Self {
        Self {
            anchor_id: p.anchor_id,
            networks: p
                .networks
                .iter()
                .map(|network| network.clone().into())
                .collect(),
            root: p.root,
            status: p.status,
        }
    }
}

impl From<ProofAnchor> for ProofAnchorCore {
    fn from(p: ProofAnchor) -> Self {
        Self {
            anchor_id: p.anchor_id,
            networks: p
                .networks
                .iter()
                .map(|network| network.clone().into())
                .collect(),
            root: p.root,
            status: p.status,
        }
    }
}
