use crate::error::{BloockResult, OperationalError};

pub fn hex_to_u16(src: String) -> BloockResult<Vec<u16>> {
    match hex::decode(src) {
        Ok(bytes) => {
            let mut result = vec![0; bytes.len() / 2];
            for i in 0..result.len() {
                result[i] = bytes[i * 2 + 1] as u16 + ((bytes[i * 2] as u16) << 8);
            }
            Ok(result)
        }
        Err(_) => return Err(OperationalError::InvalidHash().into()),
    }
}

#[cfg(test)]
mod tests {
    use crate::error::OperationalError;

    use super::hex_to_u16;

    #[test]
    fn test_hex_to_u16_success() {
        let hex = "0100".to_string();
        let res = hex_to_u16(hex).unwrap();
        assert_eq!(Vec::<u16>::from([256]), res);
    }

    #[test]
    fn test_hex_to_u16_invalid_hex() {
        let hex = "z0100".to_string();
        let res = hex_to_u16(hex);
        assert_eq!(Err(OperationalError::InvalidHash().into()), res);
    }
}
