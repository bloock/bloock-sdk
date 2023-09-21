#[derive(Copy, Clone, PartialEq, Debug)]
pub enum ProtectionLevel {
    SOFTWARE,
    HSM,
}
impl From<ProtectionLevel> for u8 {
    fn from(val: ProtectionLevel) -> Self {
        match val {
            ProtectionLevel::SOFTWARE => 1,
            ProtectionLevel::HSM => 2,
        }
    }
}

impl From<u8> for ProtectionLevel {
    fn from(value: u8) -> Self {
        match value {
            1 => ProtectionLevel::SOFTWARE,
            2 => ProtectionLevel::HSM,
            _ => ProtectionLevel::SOFTWARE,
        }
    }
}
