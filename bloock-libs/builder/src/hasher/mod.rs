pub mod keccak;

pub trait Hasher {
    fn generate_hash(data: &[u8]) -> String;
}
