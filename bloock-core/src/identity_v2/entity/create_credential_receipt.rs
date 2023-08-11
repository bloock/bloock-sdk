use super::credential::Credential;

pub struct CreateCredentialReceipt {
    pub credential: Credential,
    pub credential_id: String,
    pub anchor_id: i64
}
