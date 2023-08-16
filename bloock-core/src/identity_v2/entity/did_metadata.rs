use bloock_identity_rs::did::{Blockchain, DIDMethod, Network};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct DidMetadata {
    pub method: DIDMethod,
    pub blockchain: Blockchain,
    pub network: Network,
}

impl DidMetadata {
    pub fn default() -> Self {
        Self {
            method: DIDMethod::PolygonID,
            blockchain: Blockchain::Polygon,
            network: Network::Mumbai,
        }
    }
}
