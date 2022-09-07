use crate::Result;

pub mod hosted;

pub trait Publisher {
    fn publish(&self, payload: &Option<Vec<u8>>) -> Result<String>;
}

pub trait Loader {
    fn retrieve(&self) -> Result<Vec<u8>>;
}
