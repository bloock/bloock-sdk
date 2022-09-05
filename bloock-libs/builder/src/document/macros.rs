#[macro_export]
macro_rules! impl_document_type_trait {
    ( $($t:ty),* ) => {
    $( impl DocumentType for $t
    {
        fn from_vec(v: Vec<u8>) -> Result<Self> {
            Ok(v.into())
        }

        fn to_vec(&self) -> Result<Vec<u8>> {
            Ok(self.clone().into())
        }
    }) *
    }
}
