use bloock_signer::format::jws::JwsSignature;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct RedeemCredentialRequest {
    pub signature: JwsSignature,
    pub thread_id: String,
}
