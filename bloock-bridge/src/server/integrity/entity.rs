use crate::items::Network;
use crate::items::{Anchor, AnchorNetwork};
use crate::items::{Proof, ProofAnchor};
use crate::{
    error::{BridgeError, BridgeResult},
    items::RecordReceipt,
};
use bloock_core::config::entity::network::Network as CoreNetwork;
use bloock_core::integrity::entity::anchor::{
    Anchor as AnchorCore, AnchorNetwork as AnchorNetworkCore,
};
use bloock_core::integrity::entity::record_receipt::RecordReceipt as RecordReceiptCore;
use bloock_core::{
    from_hex,
    integrity::entity::{proof::Proof as ProofCore, proof::ProofAnchor as ProofAnchorCore},
    to_hex, H256,
};
use std::convert::TryFrom;

impl From<AnchorCore> for Anchor {
    fn from(a: AnchorCore) -> Self {
        Self {
            id: a.id,
            block_roots: a.block_roots,
            networks: a
                .networks
                .iter()
                .map(|network| network.clone().into())
                .collect(),
            root: a.root,
            status: a.status,
        }
    }
}

impl From<AnchorNetworkCore> for AnchorNetwork {
    fn from(n: AnchorNetworkCore) -> Self {
        Self {
            name: n.name.clone(),
            state: n.state.clone(),
            tx_hash: n.tx_hash,
            root: n.root,
        }
    }
}

impl From<AnchorNetwork> for AnchorNetworkCore {
    fn from(n: AnchorNetwork) -> Self {
        Self {
            name: n.name.clone(),
            state: n.state.clone(),
            tx_hash: n.tx_hash,
            root: n.root,
        }
    }
}

impl From<Network> for CoreNetwork {
    fn from(n: Network) -> Self {
        match n {
            Network::EthereumMainnet => CoreNetwork::EthereumMainnet,
            Network::EthereumSepolia => CoreNetwork::EthereumSepolia,
            Network::GnosisChain => CoreNetwork::GnosisChain,
            Network::PolygonChain => CoreNetwork::PolygonChain,
        }
    }
}

pub fn map_network_from_i32(network: i32) -> Option<CoreNetwork> {
    Network::from_i32(network).map(|network| network.into())
}

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

impl From<RecordReceiptCore> for RecordReceipt {
    fn from(r: RecordReceiptCore) -> Self {
        Self {
            anchor: r.anchor,
            client: r.client,
            record: r.record,
            status: r.status,
        }
    }
}
