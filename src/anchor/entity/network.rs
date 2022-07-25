#[derive(serde::Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct Network {
    pub name: String,
    pub state: String,
    pub tx_hash: String,
}
