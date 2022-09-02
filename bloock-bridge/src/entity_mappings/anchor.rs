use bloock_core::anchor::entity::anchor::{
    Anchor as AnchorCore, AnchorNetwork as AnchorNetworkCore,
};

use crate::items::{Anchor, AnchorNetwork};

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
        }
    }
}

impl From<AnchorNetwork> for AnchorNetworkCore {
    fn from(n: AnchorNetwork) -> Self {
        Self {
            name: n.name.clone(),
            state: n.state.clone(),
            tx_hash: n.tx_hash,
        }
    }
}
