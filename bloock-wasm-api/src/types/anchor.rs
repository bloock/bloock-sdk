use bloock_core::anchor::entity::anchor::Anchor as BloockAnchor;
use bloock_core::anchor::entity::anchor::AnchorNetwork as BloockAnchorNetwork;
use serde::Serialize;
use wasm_bindgen::prelude::wasm_bindgen;
use wasm_bindgen::JsValue;

#[wasm_bindgen(getter_with_clone)]
pub struct Anchor {
    pub id: i64,
    block_roots: Vec<String>,
    networks: Vec<AnchorNetwork>,
    pub root: String,
    pub status: String,
}

#[wasm_bindgen]
impl Anchor {
    #[wasm_bindgen(getter)]
    pub fn block_roots(&self) -> JsValue {
        return serde_wasm_bindgen::to_value(&self.block_roots).unwrap();
    }

    #[wasm_bindgen(getter)]
    pub fn networks(&self) -> JsValue {
        return serde_wasm_bindgen::to_value(&self.networks).unwrap();
    }
}

#[derive(Serialize, Clone)]
#[wasm_bindgen(getter_with_clone)]
pub struct AnchorNetwork {
    pub name: String,
    pub state: String,
    pub tx_hash: String,
}

impl From<BloockAnchor> for Anchor {
    fn from(a: BloockAnchor) -> Self {
        Self {
            id: a.id,
            block_roots: a.block_roots,
            networks: a.networks.iter().map(|n| n.clone().into()).collect(),
            root: a.root,
            status: a.status,
        }
    }
}

impl Into<BloockAnchor> for Anchor {
    fn into(self) -> BloockAnchor {
        BloockAnchor {
            id: self.id,
            block_roots: self.block_roots,
            networks: self.networks.iter().map(|n| n.clone().into()).collect(),
            root: self.root,
            status: self.status,
        }
    }
}

impl From<BloockAnchorNetwork> for AnchorNetwork {
    fn from(a: BloockAnchorNetwork) -> Self {
        Self {
            name: a.name,
            state: a.state,
            tx_hash: a.tx_hash,
        }
    }
}

impl Into<BloockAnchorNetwork> for AnchorNetwork {
    fn into(self) -> BloockAnchorNetwork {
        BloockAnchorNetwork {
            name: self.name,
            state: self.state,
            tx_hash: self.tx_hash,
        }
    }
}
