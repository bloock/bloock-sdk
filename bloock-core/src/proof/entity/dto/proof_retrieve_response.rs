#[derive(serde::Serialize, serde::Deserialize)]
pub struct ProofRetrieveResponse {
    leaves: Vec<String>,
    nodes: Vec<String>,
    depth: String,
    bitmap: String,
    root: String,
}
