use crate::items::{
    GenerateLocalKeyRequest, GenerateLocalKeyResponse, GenerateManagedKeyRequest,
    GenerateManagedKeyResponse, KeyServiceHandler,
};
use async_trait::async_trait;

pub struct KeyServer {}

#[async_trait(?Send)]
impl KeyServiceHandler for KeyServer {
    async fn generate_local_key(
        &self,
        req: &GenerateLocalKeyRequest,
    ) -> Result<GenerateLocalKeyResponse, String> {
        Err("".to_string())
    }

    async fn generate_managed_key(
        &self,
        req: &GenerateManagedKeyRequest,
    ) -> Result<GenerateManagedKeyResponse, String> {
        Err("".to_string())
    }
}
