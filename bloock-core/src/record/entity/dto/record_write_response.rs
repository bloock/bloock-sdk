#[derive(serde::Serialize, serde::Deserialize)]
pub struct RecordWriteResponse {
    pub anchor: i32,
    pub client: String,
    pub messages: Vec<String>,
    pub status: String,
}
