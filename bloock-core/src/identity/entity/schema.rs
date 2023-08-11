use serde::{Serialize, Deserialize};

pub struct Schema {
    pub cid: String,
    pub json: String,
}

pub struct Attribute {
    pub name: String,
    pub r#type: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct SchemaFields {
    #[serde(rename(deserialize = "$metadata"))]
    pub metadata: SchemaMetadata,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct SchemaMetadata {
    pub uris: SchemaUris,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct SchemaUris {
    #[serde(rename(deserialize = "jsonLdContext"))]
    pub json_ld_context: String,
}
