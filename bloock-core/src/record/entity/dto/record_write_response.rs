#[derive(serde::Serialize, serde::Deserialize, Clone)]
pub struct RecordWriteResponse {
    pub anchor: i32,
    pub client: String,
    pub messages: Vec<String>,
    pub status: String,
}
