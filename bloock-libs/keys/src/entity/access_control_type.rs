#[derive(Copy, Clone, PartialEq, Debug)]
pub enum AccessControlType {
    TOTP,
    SECRET,
    NONE,
}
impl From<AccessControlType> for Option<String> {
    fn from(val: AccessControlType) -> Self {
        match val {
            AccessControlType::TOTP => Some("ac_time_based_otp".to_string()),
            AccessControlType::SECRET => Some("ac_secret_based".to_string()),
            AccessControlType::NONE => None,
        }
    }
}

impl From<Option<String>> for AccessControlType {
    fn from(value: Option<String>) -> Self {
        match value.as_deref() {
            Some("ac_time_based_otp") => AccessControlType::TOTP,
            Some("ac_secret_based") => AccessControlType::SECRET,
            None => AccessControlType::NONE,
            _ => AccessControlType::NONE,
        }
    }
}
