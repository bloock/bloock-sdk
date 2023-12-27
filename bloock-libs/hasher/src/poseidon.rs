use super::Hasher;
use crate::H256;
use bloock_poseidon_rs::poseidon::Fr;
use bloock_poseidon_rs::PrimeField;
use bloock_poseidon_rs::POSEIDON;
use num_bigint::BigInt;

const POSEIDON_HASH_OUTPUT_LENGTH: usize = 32;

#[derive(Default)]
pub struct Poseidon {}

impl Hasher for Poseidon {
    fn hash(data: &[&[u8]]) -> H256 {
        let mut to_hash: Vec<Fr> = Vec::new();
        let bigint_slices: Vec<BigInt> = data
            .iter()
            .map(|bytes| BigInt::from_bytes_be(num_bigint::Sign::Plus, bytes))
            .collect();

        let input_string: Vec<String> = bigint_slices
            .iter()
            .map(|big_int| big_int.to_string())
            .collect();

        for i in input_string.iter() {
            to_hash.push(Fr::from_str(i).unwrap())
        }

        let h = POSEIDON.hash(&to_hash).unwrap();

        let mut hash = [0u8; 32];
        hash.copy_from_slice(&h.bytes_be());

        hash
    }
}

pub fn check_poseidon_hash(payload: &[u8]) -> bool {
    /*_ = POSEIDON.hash_bytes(payload).map_err(|_e| false);
    let rev_hash = swap_endianness(payload);*/

    if payload.len() != POSEIDON_HASH_OUTPUT_LENGTH {
        return false;
    }
    return true;
    //check_big_int_in_field(BigInt::from_signed_bytes_be(payload))
}

/*fn check_big_int_in_field(input: BigInt) -> bool {
    match BigInt::from_str_radix(Q_STRING, 10) {
        Ok(q) => {
            if !check_a_ln_b(&input, &q) {
                return false;
            } else {
                return true;
            }
        }
        Err(_) => false,
    }
}

fn check_a_ln_b(a: &BigInt, b: &BigInt) -> bool {
    a < b
}

fn swap_endianness(b: &[u8]) -> Vec<u8> {
    let mut o: Vec<u8> = vec![0; b.len()];

    for (i, byte) in b.iter().enumerate() {
        o[b.len() - 1 - i] = *byte;
    }
    o
}*/

#[cfg(test)]
mod tests {

    use super::*;

    #[test]
    fn test_poseidon_1() {
        let data = "hello world".as_bytes();
        let data1: &[u8] = "end world".as_bytes();

        assert_eq!(
            Poseidon::hash(&[data, data1]),
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
            Poseidon::hash(&[data, data1]),
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
            Poseidon::hash(&[data, data1, data2]),
            hex::decode("0c0078b40cc0788e2bd211834239a70096cc9d0bef6fd6fd5f189f51cc486473")
                .unwrap()
                .as_slice(),
            "The hash calculated was incorrect."
        );
    }

    #[test]
    fn test_check_poseidon_1() {
        let data = hex::decode("1481af941fdc8d1e92b9022c92e68a6a095ea1b8a46d8b1892e0826ac8b9805f")
            .unwrap();

        assert_eq!(check_poseidon_hash(&data), true)
    }

    #[test]
    fn test_check_poseidon_2() {
        let data = "hello world".as_bytes();

        assert_eq!(check_poseidon_hash(data), false)
    }
}
