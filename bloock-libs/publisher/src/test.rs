use super::Loader;

pub struct TestLoaderArgs {
    pub document: Vec<u8>,
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
        Ok(self.args.document.clone())
    }
}
