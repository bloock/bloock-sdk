#[derive(serde::Serialize, serde::Deserialize)]
pub struct RecordWriteRequest {
    pub messages: Vec<String>,
}
