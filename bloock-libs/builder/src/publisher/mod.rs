use crate::Result;

pub mod hosted;

pub trait Publisher {
    fn retrieve(&self, uri: String) -> Result<Vec<u8>>;
    fn publish(&self, payload: &Option<Vec<u8>>) -> Result<String>;
}
