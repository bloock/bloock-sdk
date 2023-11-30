use bloock_poseidon_rs::poseidon::Fr;
use bloock_poseidon_rs::PrimeField;
use bloock_poseidon_rs::POSEIDON;
use num_bigint::{BigInt, BigUint};
use tiny_keccak::Hasher as KeccakHasher;
use tiny_keccak::Keccak;

#[derive(Debug, Clone)]
pub struct Hasher {}

impl Hasher {
    pub fn generate_hash_bigints(&self, input: &[BigInt]) -> BigUint {
        let mut to_hash: Vec<Fr> = Vec::new();

        let input_string: Vec<String> = input.iter().map(|big_int| big_int.to_string()).collect();

        for i in input_string.iter() {
            to_hash.push(Fr::from_str(i).unwrap())
        }

        let h = POSEIDON.hash(&to_hash).unwrap();

        h.bigint()
    }

    pub fn generate_hash_bytes(&self, data: &[u8]) -> BigUint {
        let h = POSEIDON.hash_bytes(data).unwrap();

        h.bigint()
    }

    pub fn generate_keccak_256(&self, data: &[u8]) -> [u8; 32] {
        let mut hasher = Keccak::v256();
        hasher.update(data);
        let mut output = [0u8; 32];
        hasher.finalize(&mut output);
        output
    }
}
