use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct UpdateDraftStateSignatureRequest {
    pub new_state_hash: String,
    pub bn_128_signature: String,
}
