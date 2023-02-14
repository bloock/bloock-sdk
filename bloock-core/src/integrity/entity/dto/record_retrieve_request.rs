#[derive(serde::Serialize, serde::Deserialize)]
pub struct RecordRetrieveRequest {
    pub messages: Vec<String>,
}
