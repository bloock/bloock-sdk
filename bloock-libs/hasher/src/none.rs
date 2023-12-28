use super::Hasher;
use crate::H256;

#[derive(Default)]
pub struct None;

impl Hasher for None {
    fn hash(data: &[&[u8]]) -> H256 {
        let mut result: [u8; 32] = [0; 32];
        let mut offset = 0;

        for slice in data {
            let slice_len = slice.len();

            let copy_len = slice_len.min(32 - offset);

            result[offset..offset + copy_len].copy_from_slice(&slice[0..copy_len]);

            offset += copy_len;

            if offset >= 32 {
                break;
            }
        }

        result
    }
}

#[cfg(test)]
mod tests {

    use super::*;

    #[test]
    fn test_none_1() {
        let hash = hex::decode("b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9")
            .unwrap();
        let data: &[&[u8]] = &[hash.as_slice()];

        assert_eq!(
            None::hash(data),
            hex::decode("b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9")
                .unwrap()
                .as_slice(),
            "The hash calculated was incorrect."
        );
    }

    #[test]
    fn test_none_2() {
        let hash =
            hex::decode("b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcd").unwrap();
        let data: &[&[u8]] = &[hash.as_slice()];

        assert_eq!(
            None::hash(data),
            hex::decode("b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcd00")
                .unwrap()
                .as_slice(),
            "The hash calculated was incorrect."
        );
    }

    #[test]
    fn test_none_3() {
        let hash =
            hex::decode("b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde900")
                .unwrap();
        let data: &[&[u8]] = &[hash.as_slice()];

        assert_eq!(
            None::hash(data),
            hex::decode("b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9")
                .unwrap()
                .as_slice(),
            "The hash calculated was incorrect."
        );
    }
}
