use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct RedeemCredentialRequest {
    pub signature: String,
    pub thread_id: String,
}
