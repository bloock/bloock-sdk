use super::Hasher;
use crate::H256;
use ark_bn254::Fr;
use light_poseidon::{Poseidon as PoseidonLibrary, PoseidonBytesHasher};

#[derive(Default)]
pub struct Poseidon {}

impl Hasher for Poseidon {
    fn generate_hash(data: &[&[u8]]) -> H256 {
        let mut poseidon = PoseidonLibrary::<Fr>::new_circom(data.len()).unwrap();

        let hash = poseidon.hash_bytes_be(data).unwrap();
        hash
    }
}

#[cfg(test)]
mod tests {

    use super::*;

    #[test]
    fn test_poseidon_1() {
        let data = "hello world".as_bytes();
        let data1: &[u8] = "end world".as_bytes();

        assert_eq!(
            Poseidon::generate_hash(&[data, data1]),
            hex::decode("007d88c5465933fcb9d4cdd70cb3fc8be3df4af9e4736694caa655c5e119910a")
                .unwrap()
                .as_slice(),
            "The hash calculated was incorrect."
        );
    }

    #[test]
    fn test_poseidon_2() {
        let data = &[
            204, 163, 55, 26, 108, 177, 183, 21, 0, 68, 7, 227, 37, 189, 153, 60,
        ];
        let data1 = &[
            204, 163, 55, 26, 108, 177, 183, 21, 0, 68, 7, 227, 37, 189, 153, 60,
        ];

        assert_eq!(
            Poseidon::generate_hash(&[data, data1]),
            hex::decode("1aa6c8df7a5e618fa61b751b499e9cac491149d882b9c7532dfd2df8c4e03682")
                .unwrap()
                .as_slice(),
            "The hash calculated was incorrect."
        );
    }

    #[test]
    fn test_poseidon_3() {
        let data = "hello world".as_bytes();
        let data1: &[u8] = "end world".as_bytes();
        let data2: &[u8] = "middle world".as_bytes();

        assert_eq!(
            Poseidon::generate_hash(&[data, data1, data2]),
            hex::decode("0c0078b40cc0788e2bd211834239a70096cc9d0bef6fd6fd5f189f51cc486473")
                .unwrap()
                .as_slice(),
            "The hash calculated was incorrect."
        );
    }
}
