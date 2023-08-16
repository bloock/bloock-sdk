use std::str::FromStr;

use crate::hash::Hasher;
use cid::Cid;
use serde_json::Value;
use url::Url;
pub const DEFAULT_SCHEMA_TYPE: &str = "JsonSchema2023";
pub const SCHEMA_HASH_LEN: usize = 16;

pub type SchemaHash = [u8; SCHEMA_HASH_LEN];

pub fn create_schema_hash(schema_id: &[u8]) -> SchemaHash {
    let hash = Hasher {};
    let mut s_hash = SchemaHash::default();
    let h = hash.generate_keccak_256(schema_id);
    s_hash.copy_from_slice(&h.as_slice()[h.len() - 16..]);
    s_hash
}

pub fn parse_to_schema_cid(ipfs_url: String) -> Result<String, String> {
    let url_result = Url::parse(&ipfs_url);

    if url_result.is_err() {
        let cid = Cid::from_str(&ipfs_url).map_err(|e| e.to_string())?;
        return Ok(cid.to_string());
    }

    let path_segments: Vec<&str> = ipfs_url.trim_start_matches("ipfs://").split('/').collect();
    let last_segment = path_segments.last().ok_or("URL has no path segments")?;

    let cid = Cid::from_str(last_segment).map_err(|e| e.to_string())?;

    Ok(cid.to_string())
}

pub fn get_type_id_from_context(schema: String, _type: String) -> Result<String, String> {
    let value: Value = serde_json::from_str(&schema).map_err(|e| e.to_string())?;

    if let Some(context_array) = value["@context"].as_array() {
        for context_obj in context_array {
            if let Some(type_value) = context_obj[_type.clone()].as_object() {
                if let Some(id) = type_value.get("@id") {
                    if let Some(res) = id.as_str() {
                        return Ok(res.to_string());
                    }
                }
            }
        }
    }
    Err("@id not found for the given schema and type".to_string())
}

pub fn get_json_ld_context_from_json(schema: String) -> Result<String, String> {
    let value: Value = serde_json::from_str(&schema).map_err(|e| e.to_string())?;

    if let Some(metadata) = value["$metadata"].as_object() {
        if let Some(uris) = metadata.get("uris") {
            if let Some(id) = uris["jsonLdContext"].as_str() {
                return Ok(id.to_string());
            }
        }
    }
    Err("@id not found for the given schema and type".to_string())
}

#[cfg(test)]
mod tests {

    use super::*;

    #[test]
    fn test_create_schema_hash() {
        let data: &[u8] = "urn:uuid:23f799df-3186-4370-b6e2-0a077bae590f".as_bytes();

        assert_eq!(
            create_schema_hash(data),
            hex::decode("763e6d7daae422aaccea5c833a6dd0a0".as_bytes())
                .unwrap()
                .as_slice()
        );
    }
}
