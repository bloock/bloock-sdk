use tiny_keccak::Hasher;
use tiny_keccak::Keccak;

pub trait Hashing {
    fn generate_hash(&self, data: &[u8]) -> String;
}

pub struct Keccak256 {}

impl Hashing for Keccak256 {
    fn generate_hash(&self, data: &[u8]) -> String {
        let mut hasher = Keccak::v256();
        hasher.update(data);
        let mut output = [0u8; 32];
        hasher.finalize(&mut output);
        hex::encode(output)
    }
}

#[cfg(test)]
mod tests {

    use super::*;

    #[test]
    fn test_keccak_1() {
        let data = "Test Data".as_bytes();

        let hashing_algorithm = Keccak256 {};

        assert_eq!(
            hashing_algorithm.generate_hash(data),
            String::from("e287462a142cd6237de5a89891ad82065f6aca6644c161b1a61c933c5d26117a"),
            "The hash calculated was incorrect."
        );
    }

    #[test]
    fn test_keccak_2() {
        let data = "Bloock".as_bytes();

        let hashing_algorithm = Keccak256 {};

        assert_eq!(
            hashing_algorithm.generate_hash(data),
            String::from("3a7ae5d1ca472a7459e484babf13adf1aa7fe78326755969e3e2f5fc7766f6ee"),
            "The hash calculated was incorrect."
        );
    }

    #[test]
    fn test_keccak_3() {
        let data = "testing keccak".as_bytes();

        let hashing_algorithm = Keccak256 {};

        assert_eq!(
            hashing_algorithm.generate_hash(data),
            String::from("7e5e383e8e70e55cdccfccf40dfc5d4bed935613dffc806b16b4675b555be139"),
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

        let hashing_algorithm = Keccak256 {};

        assert_eq!(
            hashing_algorithm.generate_hash(&data),
            String::from("d5f4f7e1d989848480236fb0a5f808d5877abf778364ae50845234dd6c1e80fc"),
            "The hash calculated was incorrect."
        );
    }
}
