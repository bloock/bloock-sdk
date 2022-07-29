#[derive(serde::Serialize, serde::Deserialize)]
pub struct ProofRetrieveRequest {
   messages: Vec<String>,
}
