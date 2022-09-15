use bloock_core::{
    from_hex,
    proof::entity::{anchor::ProofAnchor as ProofAnchorCore, proof::Proof as ProofCore},
    to_hex, H256,
};

use crate::{
    error::{BridgeError, BridgeResult},
    items::{Proof, ProofAnchor},
};

impl From<ProofCore> for Proof {
    fn from(p: ProofCore) -> Self {
        Self {
            leaves: p.leaves.iter().map(|&l| to_hex(l)).collect(),
            nodes: p.nodes.iter().map(|&n| to_hex(n)).collect(),
            depth: p.depth,
            bitmap: p.bitmap,
            anchor: Some(p.anchor.into()),
        }
    }
}

impl TryFrom<Proof> for ProofCore {
    type Error = BridgeError;
    fn try_from(p: Proof) -> BridgeResult<Self> {
        let anchor = match p.anchor {
            Some(anchor) => anchor,
            None => return Err(BridgeError::MissingAnchor),
        };
        Ok(ProofCore {
            leaves: p
                .leaves
                .iter()
                .map(|l| {
                    from_hex(l).map_err(|_| {
                        BridgeError::RequestDeserialization(
                            "couldn't deserialize leaves".to_string(),
                        )
                    })
                })
                .collect::<BridgeResult<Vec<H256>>>()?,
            nodes: p
                .nodes
                .iter()
                .map(|l| {
                    from_hex(l).map_err(|_| {
                        BridgeError::RequestDeserialization(
                            "couldn't deserialize nodes".to_string(),
                        )
                    })
                })
                .collect::<BridgeResult<Vec<H256>>>()?,
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
