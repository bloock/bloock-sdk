use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct GetOfferResponse {
    pub thid: String,
    pub body: GetOfferBody,
    pub from: String,
    pub to: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct GetOfferBody {
    pub url: String,
    pub credentials: Vec<GetOfferBodyCredential>,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct GetOfferBodyCredential {
    pub id: String,
    pub description: String,
}
