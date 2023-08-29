use super::credential::Credential;

pub struct CreateCredentialReceipt {
    pub credential: Credential,
    pub credential_id: String,
    pub schema_type: String,
    pub anchor_id: Option<i64>
}
