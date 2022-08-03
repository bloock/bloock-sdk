use std::convert::{TryFrom, TryInto};
use tiny_keccak::Hasher;
pub use tiny_keccak::Keccak;

use crate::hashing::{Keccak256, H256};

impl Keccak256 {
    pub fn merge(left: &H256, right: &H256) -> Result<H256, <H256 as TryFrom<Vec<u8>>>::Error> {
        let mut hasher = Keccak::v256();
        hasher.update(left);
        hasher.update(right);
        let mut output = [0u8; 32];
        hasher.finalize(&mut output);
        output.to_vec().try_into()
    }
}

#[cfg(test)]
mod tests {

    use super::*;

    #[test]
    fn test_keccak_h256_hash_fun() {
        //0x8e4b8e18156a1c7271055ce5b7ef53bb370294ebd631a3b95418a92da46e681f
        let a: [u8; 32] = [0u8; 32];
        let b: [u8; 32] = [1u8; 32];
        assert_eq!(
            Keccak256::merge(&a, &b).unwrap(),
            [
                213, 244, 247, 225, 217, 137, 132, 132, 128, 35, 111, 176, 165, 248, 8, 213, 135,
                122, 191, 119, 131, 100, 174, 80, 132, 82, 52, 221, 108, 30, 128, 252
            ],
            "The hash calculated was incorrect."
        );
    }
}
