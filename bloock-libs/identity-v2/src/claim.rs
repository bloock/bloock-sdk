use chrono::NaiveDateTime;
use num_bigint::BigInt;
use num_traits::Num;
use std::io::{Cursor, Write};

use crate::{
    did::Id,
    hash::Hasher,
    schema::{SchemaHash, SCHEMA_HASH_LEN},
};
const Q_STRING: &str =
    "21888242871839275222246405745257275088548364400416034343698204186575808495617";

const FLAGS_BYTE_IDX: usize = 16;
const FLAG_EXPIRATION_BIT_IDX: u8 = 3;
const SUBJECT_FLAG_BITMASK: u8 = 0b11111000;

#[derive(Debug, PartialEq, Eq)]
enum MerklizedRootPosition {
    None,
    Index,
    Value,
}

type MerklizedFlag = u8;

const MERKLIZED_FLAG_NONE: MerklizedFlag = 0b00000000; // 000 00000
const MERKLIZED_FLAG_INDEX: MerklizedFlag = 0b00100000; // 001 00000
const MERKLIZED_FLAG_VALUE: MerklizedFlag = 0b01000000; // 010 00000

type SlotName = &'static str;

const SLOT_NAME_INDEX_A: SlotName = "IndexA";
const SLOT_NAME_INDEX_B: SlotName = "IndexB";
const SLOT_NAME_VALUE_A: SlotName = "ValueA";
const SLOT_NAME_VALUE_B: SlotName = "ValueB";

#[derive(Debug, PartialEq, Eq)]
enum SubjectFlag {
    SubjectFlagSelf = 000,
    SubjectFlagOtherIdenIndex = 010,
    SubjectFlagOtherIdenValue = 011,
}

type ElemBytes = [u8; 32];

#[derive(Debug)]
pub struct Claim {
    index: [ElemBytes; 4],
    value: [ElemBytes; 4],
    hash: Hasher,
}

impl Claim {
    pub fn default(sh: SchemaHash, hash: Hasher) -> Self {
        let mut c = Claim {
            index: Default::default(),
            value: Default::default(),
            hash,
        };
        c.set_schema_hash(sh);
        c
    }

    pub fn hex(&self) -> Result<String, String> {
        let res = self.marshal_binary()?;

        Ok(hex::encode(res))
    }

    pub fn hi_hv_hash(&self) -> String {
        let mut common_hash: Vec<BigInt> = vec![];

        let index = elem_bytes_to_ints(self.index.to_vec());
        let h_index = self.hash.generate_hash_bigints(&index);

        let value = elem_bytes_to_ints(self.value.to_vec());
        let h_value = self.hash.generate_hash_bigints(&value);

        common_hash.push(h_index.into());
        common_hash.push(h_value.into());

        let result = self.hash.generate_hash_bigints(&common_hash);

        hex::encode(result.to_bytes_be())
    }

    fn marshal_binary(&self) -> Result<Vec<u8>, String> {
        let mut buf = Vec::new();
        {
            let mut cursor = Cursor::new(&mut buf);
            for i in &self.index {
                cursor.write_all(i).map_err(|e| e.to_string())?;
            }
            for v in &self.value {
                cursor.write_all(v).map_err(|e| e.to_string())?;
            }
        }

        Ok(buf)
    }

    pub fn set_schema_hash(&mut self, sh: [u8; SCHEMA_HASH_LEN]) {
        self.index[0][..SCHEMA_HASH_LEN].copy_from_slice(&sh);
    }

    pub fn set_revocation_nonce(&mut self, nonce: u64) {
        let bytes = nonce.to_le_bytes();
        self.value[0][..8].copy_from_slice(&bytes);
    }

    pub fn set_version(&mut self, ver: i32) {
        let bytes = ver.to_le_bytes();
        self.index[0][20..24].copy_from_slice(&bytes);
    }

    pub fn set_expiration_date(&mut self, dt: NaiveDateTime) {
        self.set_flag_expiration(true);
        let unix_time = dt.timestamp();
        self.value[0][8..16].copy_from_slice(&unix_time.to_le_bytes());
    }

    fn set_flag_expiration(&mut self, val: bool) {
        if val {
            self.index[0][FLAGS_BYTE_IDX] |= 1 << FLAG_EXPIRATION_BIT_IDX;
        } else {
            self.index[0][FLAGS_BYTE_IDX] &= !(1 << FLAG_EXPIRATION_BIT_IDX);
        }
    }

    pub fn set_index_id(&mut self, id: Id) {
        self.reset_value_id();
        self.set_subject(SubjectFlag::SubjectFlagOtherIdenIndex);
        self.index[1][0..id.len()].copy_from_slice(&id);
    }

    fn reset_value_id(&mut self) {
        let zero_id: Id = [0u8; 31];
        self.value[1][0..zero_id.len()].copy_from_slice(&zero_id);
    }

    fn set_subject(&mut self, s: SubjectFlag) {
        // Clean first 3 bits
        self.index[0][FLAGS_BYTE_IDX] &= !SUBJECT_FLAG_BITMASK;
        self.index[0][FLAGS_BYTE_IDX] |= s as u8;
    }

    pub fn set_index_data_ints(&mut self, slotA: &BigInt, slotB: &BigInt) -> Result<(), String> {
        set_slot_int(&mut self.index[2], slotA, SLOT_NAME_INDEX_A)?;
        set_slot_int(&mut self.index[3], slotB, SLOT_NAME_INDEX_B)
    }

    pub fn set_index_merklized_root(&mut self, r: &BigInt) -> Result<(), String> {
        self.reset_value_merklized_root();
        self.set_flag_merklized(MerklizedRootPosition::Index);
        set_slot_int(&mut self.index[2], r, SLOT_NAME_INDEX_A)
    }

    fn reset_value_merklized_root(&mut self) {
        let zero_bytes: ElemBytes = [0u8; 32];
        self.value[2][..].copy_from_slice(&zero_bytes[..]);
    }

    fn set_flag_merklized(&mut self, s: MerklizedRootPosition) {
        let f: u8 = match s {
            MerklizedRootPosition::Index => MERKLIZED_FLAG_INDEX,
            MerklizedRootPosition::Value => MERKLIZED_FLAG_VALUE,
            _ => MERKLIZED_FLAG_NONE,
        };
        // clean last 3 bits
        self.index[0][FLAGS_BYTE_IDX] &= 0b00011111;
        self.index[0][FLAGS_BYTE_IDX] |= f;
    }
}

fn set_slot_int(slot: &mut ElemBytes, value: &BigInt, slot_name: SlotName) -> Result<(), String> {
    let val = set_int(&value)?;
    slot[..val.len()].copy_from_slice(&val);
    //memset(&mut slot[val.len()..], 0);
    Ok(())
}

fn set_int(in_val: &BigInt) -> Result<Vec<u8>, String> {
    let q = BigInt::from_str_radix(Q_STRING, 10).map_err(|e| e.to_string())?;
    if !check_big_int_in_field(in_val, &q) {
        return Err("Data does not fits SNARK size".to_string());
    }

    Ok(int_to_bytes(in_val))
}

/*fn memset(arr: &mut [u8], v: u8) {
    if arr.is_empty() {
        return;
    }

    arr[0] = v;
    let mut ptr = 1;
    while ptr < arr.len() {
        let copy_len = std::cmp::min(ptr, arr.len() - ptr);
        arr[ptr..(ptr + copy_len)].copy_from_slice(&arr[..copy_len]);
        ptr *= 2;
    }
}*/

fn int_to_bytes(in_val: &BigInt) -> Vec<u8> {
    swap_endianness(&in_val.to_signed_bytes_be())
}

fn bytes_to_int(input: &[u8]) -> BigInt {
    let mut bytes = input.to_owned();
    bytes.reverse();

    BigInt::from_signed_bytes_be(&bytes)
}

fn check_big_int_in_field(a: &BigInt, q: &BigInt) -> bool {
    a < q
}

fn swap_endianness(b: &[u8]) -> Vec<u8> {
    let mut o: Vec<u8> = vec![0; b.len()];

    for (i, byte) in b.iter().enumerate() {
        o[b.len() - 1 - i] = *byte;
    }
    o
}

fn elem_bytes_to_ints(elements: Vec<ElemBytes>) -> Vec<BigInt> {
    let mut result: Vec<BigInt> = vec![];

    for element in elements.iter() {
        let new_element = bytes_to_int(&element[..]);
        result.push(new_element)
    }

    result
}
