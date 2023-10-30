use super::alg::SignAlg;
use serde::{
    Deserialize, Serialize,
};

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct Signature {
    pub alg: SignAlg,
    pub kid: String,
    pub signature: String,
    pub message_hash: String,
}
