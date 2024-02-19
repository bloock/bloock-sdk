use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct PublishIssuerStateResponse {
    pub tx_id: String,
}