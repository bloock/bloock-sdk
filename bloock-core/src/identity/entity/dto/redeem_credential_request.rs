use bloock_signer::entity::signature::Signature;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct RedeemCredentialRequest {
    pub signature: Signature,
    pub thread_id: String,
}
