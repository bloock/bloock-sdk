#[derive(serde::Serialize, serde::Deserialize)]
pub struct RecordRetrieveResponse {
    pub anchor: i32,
    pub client: String,
    pub message: String,
    pub status: String,
}
