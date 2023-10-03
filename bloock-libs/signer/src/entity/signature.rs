use super::alg::SignAlg;

#[derive(Clone, Debug)]
pub struct Signature {
    pub alg: SignAlg,
    pub kid: String,
    pub signature: String,
    pub message_hash: String,
}
