#[derive(serde::Serialize, serde::Deserialize)]
pub struct ProofRetrieveRequest {
   pub messages: Vec<String>,
}
