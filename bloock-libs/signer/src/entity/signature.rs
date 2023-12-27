use super::alg::SignAlg;
use bloock_hasher::HashAlg;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct Signature {
    pub alg: SignAlg,
    pub signature: String,
    pub message_hash: String,
    pub key: String,
    pub subject: Option<String>,
    pub hash_alg: Option<HashAlg>,
}
