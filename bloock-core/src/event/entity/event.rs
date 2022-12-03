use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct Event {
    pub name: String,
    pub properties: Value,
}

impl Event {
    pub fn new(name: &str, success: bool, properties: Option<Value>) -> Event {
        let attrs = match properties {
            Some(p) => match p {
                Value::Object(o) => {
                    let mut m = o.clone();
                    m.insert("success".to_string(), Value::Bool(success));
                    Value::Object(m)
                }
                o => o.clone(),
            },
            None => json! {{
                "success": success
            }},
        };
        Event {
            name: name.to_owned(),
            properties: attrs,
        }
    }
}
