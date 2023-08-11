use std::{collections::HashMap, ops::Rem};

use chrono::NaiveDateTime;
use num_bigint::{BigInt, BigUint};
use num_traits::{FromPrimitive, Num};
use rdf_types::{Object, Quad, Subject};
use regex::Regex;

use crate::{hash::Hasher, merkle::Merkle};

use super::error::MerklizeError;

const DEFAULT_GRAPH_NODE_NAME: &str = "@default";
const Q_STRING: &str =
    "21888242871839275222246405745257275088548364400416034343698204186575808495617"; // Replace this with your actual prime number.

struct Relationship {
    parents: HashMap<DatasetIdx, DatasetIdx>,
    children: HashMap<QArrKey, HashMap<RefTp, u64>>,
}

impl Relationship {
    fn path(
        &self,
        ds_idx: DatasetIdx,
        quads: &Vec<Quad>,
        idx: Option<i32>,
    ) -> Result<Path, MerklizeError> {
        let mut k = Path::new();

        if let Some(idx) = idx {
            k.append(&[RdfEntryValue::IntValue(idx as u64)])?;
        }

        let n = get_quad(&quads.clone(), &ds_idx)?;
        let predicate = String::from(n.predicate().as_str());

        k.append(&[RdfEntryValue::StringValue(predicate)])?;

        let mut next_key = ds_idx;
        loop {
            let parent_idx = match self.parents.get(&next_key) {
                Some(idx) => idx.clone(),
                None => break,
            };
            let parent = get_quad(&quads, &parent_idx.clone())?;

            let parent_key = mk_q_arr_key(&parent)?;
            let children_map = match self.children.get(&parent_key) {
                Some(map) => map,
                None => return Err(MerklizeError::ErrorParentMappingNotFound()),
            };
            let child_quad = get_quad(&quads, &next_key)?;
            let child_ref = get_ref_subject(child_quad.subject())?;
            let child_idx = match children_map.get(&child_ref) {
                Some(&idx) => idx,
                None => return Err(MerklizeError::ErrorChildMappingNotFound()),
            };
            let parent_predicate = String::from(parent.predicate().as_str());

            if children_map.len() == 1 {
                k.append(&[RdfEntryValue::StringValue(parent_predicate)])?;
            } else {
                k.append(&[
                    RdfEntryValue::IntValue(child_idx),
                    RdfEntryValue::StringValue(parent_predicate),
                ])?;
            }

            next_key = parent_idx;
        }

        k.reverse();
        Ok(k)
    }
}

struct Path {
    parts: Vec<RdfEntryValue>,
}

impl Path {
    fn new() -> Self {
        Path { parts: Vec::new() }
    }

    fn reverse(&mut self) {
        let len = self.parts.len();
        for i in 0..len / 2 {
            self.parts.swap(i, len - 1 - i);
        }
    }

    fn append(&mut self, parts: &[RdfEntryValue]) -> Result<(), MerklizeError> {
        for part in parts {
            match part {
                RdfEntryValue::StringValue(_) | RdfEntryValue::IntValue(_) => {}
                _ => {
                    return Err(MerklizeError::ErrorPath(
                        format!("Incorrect part type: {:?}", part).to_string(),
                    ))
                }
            }
        }

        self.parts.extend(parts.iter().cloned());
        Ok(())
    }

    fn mt_entry(&self, hash: &Hasher) -> Result<Vec<u8>, MerklizeError> {
        let mut int_key_parts: Vec<BigInt> = Vec::with_capacity(self.parts.len());

        for part in &self.parts {
            match part {
                RdfEntryValue::StringValue(s) => {
                    let bytes = s.as_bytes();
                    int_key_parts.push(hash.generate_hash_bytes(bytes).into());
                }
                RdfEntryValue::IntValue(num) => {
                    let bytes = num.to_be_bytes();
                    int_key_parts.push(BigInt::from_signed_bytes_be(&bytes));
                }
                _ => return Err(MerklizeError::InvalidPathType()),
            }
        }

        let hash = hash.generate_hash_bigints(&int_key_parts);
        Ok(hash.to_bytes_be())
    }
}

#[derive(Debug, Clone)]
enum RdfEntryValue {
    StringValue(String),
    IntValue(u64),
    BoolValue(bool),
    DateTime(NaiveDateTime),
}

#[derive(PartialEq, Eq, Hash, Clone)]
#[repr(u8)]
pub enum NodeTypes {
    NodeTypeUndefined = 0,
    NodeTypeBlank = 1,
    NodeTypeIri = 2,
    NodeTypeLiteral = 3,
}

pub struct RdfEntry {
    key: Path,
    value: RdfEntryValue,
    datatype: String,
}

impl RdfEntry {
    fn default() -> Self {
        Self {
            key: Path { parts: vec![] },
            value: RdfEntryValue::StringValue("".to_string()),
            datatype: String::new(),
        }
    }

    fn key_mt_entry(&self, hash: &Hasher) -> Result<Vec<u8>, MerklizeError> {
        Ok(self.key.mt_entry(hash)?)
    }

    fn value_mt_entry(&self, hash: &Hasher) -> Result<Vec<u8>, MerklizeError> {
        Ok(mk_value_mt_entry(self.value.clone(), hash)?)
    }
}

#[derive(Eq, Hash, PartialEq, Clone)]
struct DatasetIdx {
    graph: String,
    idx: u64,
}

#[derive(Eq, Hash, PartialEq, Clone)]
struct QArrKey {
    subject: RefTp,
    predicate: String,
    graph: String,
}

#[derive(Eq, Hash, Clone)]
struct RefTp {
    tp: NodeTypes,
    val: String,
}

impl PartialEq for RefTp {
    fn eq(&self, other: &Self) -> bool {
        self.tp == other.tp && self.val == other.val
    }
}

pub async fn add_entries_to_merkle_tree(
    hash: &Hasher,
    mut merkle: Merkle,
    entries: Vec<RdfEntry>,
) -> Result<BigInt, MerklizeError> {
    for entry in entries.iter() {
        let key = entry.key_mt_entry(hash).unwrap();

        let value = entry.value_mt_entry(hash).unwrap();

        merkle
            .merkle_tree
            .add(
                &BigUint::from_bytes_be(&key),
                &BigUint::from_bytes_be(&value),
            )
            .await
            .unwrap();
    }

    Ok(merkle.merkle_tree.root().bigint().into())
}

pub fn swap_endianness(b: &[u8]) -> Vec<u8> {
    let mut o: Vec<u8> = vec![0; b.len()];

    for (i, byte) in b.iter().enumerate() {
        o[b.len() - 1 - i] = *byte;
    }
    o
}

pub fn entries_from_rdf(quads: Vec<Quad>) -> Result<Vec<RdfEntry>, MerklizeError> {
    let rs = new_relationship(&quads.clone())?;
    let mut entries = Vec::with_capacity(quads.len());
    let counts = count_entries(quads.clone())?;
    let mut seen_count: HashMap<QArrKey, i32> = HashMap::new();

    for (quad_idx, q) in quads.iter().enumerate() {
        let quad_graph_idx = DatasetIdx {
            graph: DEFAULT_GRAPH_NODE_NAME.to_string(),
            idx: quad_idx as u64,
        };
        let q_key = mk_q_arr_key(q)?;
        let mut e = RdfEntry::default();

        let object = q.object();
        let mut datatype = "";
        let value: RdfEntryValue;

        if object.is_literal() {
            let literal = object.as_literal();
            value = match literal {
                Some(rdf_types::Literal::TypedString(string, iri)) => {
                    let typ = iri.as_iri_ref().into_str();
                    let value: RdfEntryValue = convert_string_to_xsd_value(typ, string.as_str())?;
                    datatype = typ;
                    value
                }
                _ => continue,
            };
        } else if object.is_iri() {
            let ii = object.as_iri().unwrap();
            value = RdfEntryValue::StringValue(ii.as_iri_ref().as_str().to_owned());
        } else if object.is_blank() {
            if rs.children.contains_key(&q_key) {
                continue;
            }
            return Err(MerklizeError::ErrBlankNode());
        } else {
            return Err(MerklizeError::UnexpectedQuadObject());
        }

        let idx: Option<i32> = match counts.get(&q_key) {
            Some(&count) => match count {
                0 => return Err(MerklizeError::ErrAssertionKeyNotFound()),
                1 => None,
                _ => {
                    let idx = seen_count.get(&q_key).cloned().unwrap_or(0);
                    seen_count.insert(q_key.clone(), idx + 1);
                    Some(idx)
                }
            },
            None => return Err(MerklizeError::ErrAssertionKeyNotFound()),
        };

        e.datatype = datatype.to_owned();
        e.value = value;
        e.key = rs.path(quad_graph_idx, &quads, idx)?;

        entries.push(e);
    }

    Ok(entries)
}

fn new_relationship(quads: &Vec<Quad>) -> Result<Relationship, MerklizeError> {
    let mut r = Relationship {
        parents: HashMap::new(),
        children: HashMap::new(),
    };

    for (idx, q) in quads.iter().enumerate() {
        let parent_idx = match find_parent(&quads.clone(), q) {
            Ok(p_idx) => p_idx,
            Err(err) => {
                if err == MerklizeError::ErrorMultipleParentsFound() {
                    continue;
                } else {
                    return Err(err);
                }
            }
        };
        let q_idx = DatasetIdx {
            graph: DEFAULT_GRAPH_NODE_NAME.to_string(),
            idx: idx as u64,
        };

        let parent_quad = get_quad(&quads.clone(), &parent_idx)?;
        r.parents.insert(q_idx, parent_idx);

        let q_key = mk_q_arr_key(&parent_quad)?;

        let children_m = r.children.entry(q_key).or_insert_with(HashMap::new);
        let child_ref = get_ref_subject(q.subject())?;

        if !children_m.contains_key(&child_ref) {
            let next_idx = children_m.len() as u64;
            children_m.insert(child_ref, next_idx);
        }
    }

    Ok(r)
}

fn find_parent(quads: &Vec<Quad>, quad: &Quad) -> Result<DatasetIdx, MerklizeError> {
    find_parent_inside_graph(quads, quad)
}

fn find_parent_inside_graph(quads: &Vec<Quad>, quad: &Quad) -> Result<DatasetIdx, MerklizeError> {
    let q_key = match get_ref_subject(&quad.subject()) {
        Ok(key) => key,
        Err(err) => return Err(err),
    };
    let mut found = false;
    let mut result = DatasetIdx {
        graph: "".to_string(),
        idx: 0,
    };
    for (idx, q) in quads.iter().enumerate() {
        if q.eq(quad) {
            continue;
        }

        let obj_key = match get_ref_object(q.object().clone()) {
            Ok(key) => key,
            Err(MerklizeError::InvalidReferenceType()) => continue,
            Err(err) => return Err(err),
        };

        if q_key == obj_key {
            if found {
                return Err(MerklizeError::ErrorMultipleParentsFound());
            }
            found = true;
            result = DatasetIdx {
                graph: DEFAULT_GRAPH_NODE_NAME.to_string(),
                idx: idx.try_into().unwrap(),
            }
        }
    }

    if found {
        Ok(result)
    } else {
        Err(MerklizeError::ErrorMultipleParentsFound())
    }
}

fn count_entries(quads: Vec<Quad>) -> Result<HashMap<QArrKey, i32>, MerklizeError> {
    let mut res: HashMap<QArrKey, i32> = HashMap::with_capacity(quads.len());
    for q in quads.iter() {
        let key = mk_q_arr_key(q)?;
        *res.entry(key).or_insert(0) += 1;
    }
    Ok(res)
}

fn get_quad(quads: &Vec<Quad>, idx: &DatasetIdx) -> Result<Quad, MerklizeError> {
    match quads.get(idx.idx as usize) {
        Some(quad) => Ok(quad.clone()),
        None => Err(MerklizeError::ErrorTripleNotFound()),
    }
}

fn get_ref_subject(subject: &Subject) -> Result<RefTp, MerklizeError> {
    match subject {
        Subject::Iri(_) => Ok(RefTp {
            tp: NodeTypes::NodeTypeIri,
            val: String::from(subject.as_str()),
        }),
        Subject::Blank(_) => Ok(RefTp {
            tp: NodeTypes::NodeTypeBlank,
            val: String::from(subject.as_str()),
        }),
    }
}

fn mk_q_arr_key<'a>(q: &Quad) -> Result<QArrKey, MerklizeError> {
    let graph = DEFAULT_GRAPH_NODE_NAME.to_string();

    let (subject_tp, subject_val) = match q.subject() {
        Subject::Iri(_) => (NodeTypes::NodeTypeIri, String::from(q.subject().as_str())),
        Subject::Blank(_) => (NodeTypes::NodeTypeBlank, String::from(q.subject().as_str())),
    };

    let qarr: QArrKey = QArrKey {
        subject: RefTp {
            tp: subject_tp,
            val: subject_val,
        },
        predicate: String::from(q.predicate().as_str()),
        graph,
    };
    Ok(qarr)
}

fn get_ref_object(object: Object) -> Result<RefTp, MerklizeError> {
    match object {
        Object::Iri(_) => Ok(RefTp {
            tp: NodeTypes::NodeTypeIri,
            val: String::from(object.into_iri().unwrap().as_str()),
        }),
        Object::Blank(_) => Ok(RefTp {
            tp: NodeTypes::NodeTypeBlank,
            val: String::from(object.into_blank().unwrap().as_str()),
        }),
        _ => Err(MerklizeError::InvalidReferenceType()),
    }
}

fn mk_value_mt_entry(v: RdfEntryValue, hash: &Hasher) -> Result<Vec<u8>, MerklizeError> {
    let res = match v {
        RdfEntryValue::StringValue(s) => {
            let bytes = s.as_bytes();
            hash.generate_hash_bytes(bytes).to_bytes_be()
        }
        RdfEntryValue::IntValue(num) => {
            let bytes = num.to_be_bytes();
            let first_non_zero_index = bytes.iter().position(|&b| b != 0).unwrap_or(8);
            (&bytes[first_non_zero_index..]).to_vec()
        }
        RdfEntryValue::BoolValue(b) => {
            if b {
                let input = BigInt::from_i32(1).unwrap();
                hash.generate_hash_bigints(&vec![input]).to_bytes_be()
            } else {
                let input = BigInt::from_i32(0).unwrap();
                hash.generate_hash_bigints(&vec![input]).to_bytes_be()
            }
        }
        RdfEntryValue::DateTime(date) => {
            let prime = BigInt::from_str_radix(Q_STRING, 10).unwrap();

            let unix_bigint: BigInt = BigInt::from(date.timestamp());
            let nanoseconds_bigint = BigInt::from(date.timestamp_subsec_nanos());

            let x = (&unix_bigint * BigInt::from(1_000_000_000)) + nanoseconds_bigint;

            let result = x.rem(prime);

            bigint_to_bytes(&result)
        }
    };

    Ok(res)
}

fn bigint_to_bytes(bigint: &BigInt) -> Vec<u8> {
    let bytes = bigint.to_bytes_be();
    let mut result_bytes = bytes.1;

    // Check if the number is non-negative, if it's negative, append a zero byte to the bytes.
    if bigint.sign() == num_bigint::Sign::Minus {
        result_bytes.push(0);
    }

    result_bytes
}

fn convert_string_to_xsd_value(
    data_type: &str,
    value: &str,
) -> Result<RdfEntryValue, MerklizeError> {
    let result_value: RdfEntryValue;

    match get_data_type(data_type) {
        LDDataType::XSDBoolean => match value {
            "false" | "0" | "0.0E0" => result_value = RdfEntryValue::BoolValue(false),
            "true" | "1" | "1.0E0" => result_value = RdfEntryValue::BoolValue(true),
            _ => return Err(MerklizeError::InvalidBooleanValue()),
        },
        LDDataType::XSDInteger
        | LDDataType::XSDNSNonNegativeInteger
        | LDDataType::XSDNSNonPositiveInteger
        | LDDataType::XSDNSNegativeInteger
        | LDDataType::XSDNSPositiveInteger => {
            let r: u64 = value
                .parse()
                .map_err(|_e| MerklizeError::ErrorParsingNumber(value.to_string()))?;
            result_value = RdfEntryValue::IntValue(r);
        }
        LDDataType::XSDNSDateTime => {
            let date_re = regex::Regex::new(r"^\d{4}-\d{2}-\d{2}$").unwrap();
            if date_re.is_match(value) {
                result_value = RdfEntryValue::DateTime(
                    chrono::DateTime::parse_from_str(value, "%Y-%m-%d")
                        .unwrap()
                        .naive_utc(),
                );
            } else {
                result_value = RdfEntryValue::DateTime(
                    chrono::DateTime::parse_from_rfc3339(value)
                        .unwrap()
                        .naive_utc(),
                );
            }
        }
        LDDataType::XSDDouble => {
            let f = value.parse::<f64>().unwrap();
            result_value = RdfEntryValue::StringValue(get_canonical_double(f));
        }
        LDDataType::Other => {
            result_value = RdfEntryValue::StringValue(value.to_string());
        }
    }

    Ok(result_value)
}

fn get_canonical_double(v: f64) -> String {
    let canonical_double_regex = Regex::new(r"([0-9])\.?0*E([+-]?[0-9]+)").unwrap();
    let formatted_str = format!("{:1.15E}", v);
    let result_str = canonical_double_regex.replace_all(&formatted_str, "${1}E${2}");
    result_str.to_string()
}

enum LDDataType {
    XSDBoolean,
    XSDInteger,
    XSDNSNonNegativeInteger,
    XSDNSNonPositiveInteger,
    XSDNSNegativeInteger,
    XSDNSPositiveInteger,
    XSDNSDateTime,
    XSDDouble,
    Other,
}

fn get_data_type(datatype: &str) -> LDDataType {
    match datatype {
        "http://www.w3.org/2001/XMLSchema#boolean" => LDDataType::XSDBoolean,
        "http://www.w3.org/2001/XMLSchema#integer" => LDDataType::XSDInteger,
        "http://www.w3.org/2001/XMLSchema#nonNegativeInteger" => {
            LDDataType::XSDNSNonNegativeInteger
        }
        "http://www.w3.org/2001/XMLSchema#nonPositiveInteger" => {
            LDDataType::XSDNSNonPositiveInteger
        }
        "http://www.w3.org/2001/XMLSchema#negativeInteger" => LDDataType::XSDNSNegativeInteger,
        "http://www.w3.org/2001/XMLSchema#positiveInteger" => LDDataType::XSDNSPositiveInteger,
        "http://www.w3.org/2001/XMLSchema#dateTime" => LDDataType::XSDNSDateTime,
        "http://www.w3.org/2001/XMLSchema#double" => LDDataType::XSDDouble,
        _ => LDDataType::Other,
    }
}
