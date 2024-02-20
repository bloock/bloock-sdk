use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct CreateCredentialApiManagedResponse {
    pub id: String,
}