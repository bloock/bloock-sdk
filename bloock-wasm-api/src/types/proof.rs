use bloock_core::proof::entity::proof::Proof as BloockProof;
use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen(getter_with_clone)]
pub struct Proof {
    pub hash: String,
}

#[wasm_bindgen]
impl Proof {
    #[wasm_bindgen(constructor)]
    pub fn new(hash: String) -> Self {
        Self { hash: hash }
    }
}

impl From<BloockProof> for Proof {
    fn from(a: BloockProof) -> Self {
        Self { hash: a.hash }
    }
}

impl Into<BloockProof> for Proof {
    fn into(self) -> BloockProof {
        BloockProof { hash: self.hash }
    }
}
