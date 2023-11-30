use super::alg::SignAlg;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct Signature {
    pub alg: SignAlg,
    pub signature: String,
    pub message_hash: String,
    pub key: String,
    pub subject: Option<String>,
}
