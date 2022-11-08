use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct Event {
    pub name: String,
    pub success: bool,
}

impl Event {
    pub fn new(name: String, success: bool) -> Event {
        Event { name, success }
    }
}
