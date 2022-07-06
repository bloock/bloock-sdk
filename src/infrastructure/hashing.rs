use tiny_keccak::Hasher;
use tiny_keccak::Keccak;

pub trait Hashing {
    fn generate_hash(data: &[u8]) -> String;
}

pub struct Keccak256 {}

impl Hashing for Keccak256 {
    fn generate_hash(data: &[u8]) -> String {
        let mut hasher = Keccak::v256();
        hasher.update(data);
        let mut output = [0u8; 32];
        hasher.finalize(&mut output);
        hex::encode(output)
    }
}
