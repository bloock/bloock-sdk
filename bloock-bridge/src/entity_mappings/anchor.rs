use bloock_core::anchor::entity::anchor::{
    Anchor as AnchorCore, AnchorNetwork as AnchorNetworkCore,
};

use crate::items::{Anchor, AnchorNetwork};

impl Into<Anchor> for AnchorCore {
    fn into(self) -> Anchor {
        Anchor {
            id: self.id,
            block_roots: self.block_roots,
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

impl Into<AnchorNetwork> for AnchorNetworkCore {
    fn into(self) -> AnchorNetwork {
        AnchorNetwork {
            name: self.name.clone(),
            state: self.state.clone(),
            tx_hash: self.tx_hash.clone(),
        }
    }
}

impl Into<AnchorNetworkCore> for AnchorNetwork {
    fn into(self) -> AnchorNetworkCore {
        AnchorNetworkCore {
            name: self.name.clone(),
            state: self.state.clone(),
            tx_hash: self.tx_hash.clone(),
        }
    }
}
