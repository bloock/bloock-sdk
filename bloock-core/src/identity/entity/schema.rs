pub struct Schema {
    pub cid: String,
    pub cid_json_ld: String,
    pub schema_type: String,
    pub json: String,
}

pub struct Attribute {
    pub title: String,
    pub name: String,
    pub r#type: String,
    pub description: String,
    pub required: bool,
    pub r#enum: Option<Vec<String>>
}
