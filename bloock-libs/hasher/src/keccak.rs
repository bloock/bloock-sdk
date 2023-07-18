use super::Hasher;
use crate::H256;
use tiny_keccak::Hasher as TinyKeccakHasher;
use tiny_keccak::Keccak;

#[derive(Default)]
pub struct Keccak256 {}

impl Hasher for Keccak256 {
    fn generate_hash(data: &[&[u8]]) -> H256 {
        let mut hasher = Keccak::v256();
        hasher.update(&data.concat());
        let mut output = [0u8; 32];
        hasher.finalize(&mut output);
        output
    }
}

#[cfg(test)]
mod tests {

    use super::*;

    #[test]
    fn test_keccak_1() {
        let data: &[&[u8]] = &["Test Data".as_bytes()];

        assert_eq!(
            Keccak256::generate_hash(data),
            hex::decode("e287462a142cd6237de5a89891ad82065f6aca6644c161b1a61c933c5d26117a")
                .unwrap()
                .as_slice(),
            "The hash calculated was incorrect."
        );
    }

    #[test]
    fn test_keccak_2() {
        let data: &[&[u8]] = &["Bloock".as_bytes()];

        assert_eq!(
            Keccak256::generate_hash(data),
            hex::decode("3a7ae5d1ca472a7459e484babf13adf1aa7fe78326755969e3e2f5fc7766f6ee")
                .unwrap()
                .as_slice(),
            "The hash calculated was incorrect."
        );
    }

    #[test]
    fn test_keccak_3() {
        let data: &[&[u8]] = &["testing keccak".as_bytes()];

        assert_eq!(
            Keccak256::generate_hash(data),
            hex::decode("7e5e383e8e70e55cdccfccf40dfc5d4bed935613dffc806b16b4675b555be139")
                .unwrap()
                .as_slice(),
            "The hash calculated was incorrect."
        );
    }

    #[test]
    fn test_keccak_4() {
        let data: [u8; 64] = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1,
        ];

        assert_eq!(
            Keccak256::generate_hash(&[&data]),
            hex::decode("d5f4f7e1d989848480236fb0a5f808d5877abf778364ae50845234dd6c1e80fc")
                .unwrap()
                .as_slice(),
            "The hash calculated was incorrect."
        );
    }
}
