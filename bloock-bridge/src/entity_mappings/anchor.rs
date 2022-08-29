use bloock_core::anchor::entity::anchor::{
    Anchor as AnchorCore, AnchorNetwork as AnchorNetworkCore,
};

use crate::items::{Anchor, AnchorNetwork};

pub fn map_anchor_core(anchor: AnchorCore) -> Anchor {
    Anchor {
        id: anchor.id,
        block_roots: anchor.block_roots,
        networks: map_anchor_networks(anchor.networks),
        root: anchor.root,
        status: anchor.status,
    }
}

fn map_anchor_networks(anchor_networks: Vec<AnchorNetworkCore>) -> Vec<AnchorNetwork> {
    anchor_networks.iter().map(map_anchor_network).collect()
}

fn map_anchor_network(network: &AnchorNetworkCore) -> AnchorNetwork {
    AnchorNetwork {
        name: network.name.clone(),
        state: network.state.clone(),
        tx_hash: network.tx_hash.clone(),
    }
}
