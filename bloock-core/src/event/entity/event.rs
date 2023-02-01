use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct LibraryInfo {
    pub name: String,
    pub version: String,
}
impl LibraryInfo {
    pub fn new(library_name: String) -> Self {
        LibraryInfo {
            name: library_name,
            version: env!("CARGO_PKG_VERSION").to_string(),
        }
    }
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct OsInfo {
    pub name: String,
}
impl Default for OsInfo {
    fn default() -> Self {
        OsInfo {
            name: format!("{}.{}", std::env::consts::OS, std::env::consts::ARCH),
        }
    }
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct Event {
    pub name: String,
    pub user_id: String,
    pub properties: Value,
    pub library: LibraryInfo,
    pub os: OsInfo,
}

impl Event {
    pub fn new(
        library_info: LibraryInfo,
        api_key: &str,
        name: &str,
        success: bool,
        properties: Option<Value>,
    ) -> Event {
        let attrs = match properties {
            Some(p) => match p {
                Value::Object(o) => {
                    let mut m = o;
                    m.insert("success".to_string(), Value::Bool(success));
                    Value::Object(m)
                }
                o => o,
            },
            None => json! {{
                "success": success
            }},
        };

        let mut name = name.replace(['/', '.'], "_");

        if name.starts_with('_') {
            name = name[1..name.len()].to_owned();
        }

        let user_id = api_key.to_string();

        Event {
            name,
            user_id,
            properties: attrs,
            library: library_info,
            os: OsInfo::default(),
        }
    }
}
