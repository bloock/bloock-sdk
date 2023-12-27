use super::Hasher;
use crate::H256;
use sha2::Digest;

#[derive(Default)]
pub struct Sha256 {}

impl Hasher for Sha256 {
    fn hash(data: &[&[u8]]) -> H256 {
        let mut hasher = sha2::Sha256::new();
        hasher.update(&data.concat());
        let result = hasher.finalize();
        result.into()
    }
}

#[cfg(test)]
mod tests {

    use super::*;

    #[test]
    fn test_sha256_1() {
        let data: &[&[u8]] = &["hello world".as_bytes()];

        assert_eq!(
            Sha256::hash(data),
            hex::decode("b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9")
                .unwrap()
                .as_slice(),
            "The hash calculated was incorrect."
        );
    }
}
