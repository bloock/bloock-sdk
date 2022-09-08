use crate::document::Document;

use super::Loader;

pub struct TestLoaderArgs {
    pub document: Document,
}

pub struct TestLoader {
    args: TestLoaderArgs,
}

impl TestLoader {
    pub fn new(args: TestLoaderArgs) -> Self {
        Self { args }
    }
}

impl Loader for TestLoader {
    fn retrieve(&self) -> crate::Result<Vec<u8>> {
        Ok(self.args.document.serialize()?.as_bytes().to_vec())
    }
}
