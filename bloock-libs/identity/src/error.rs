use thiserror::Error;

#[derive(Error, Debug)]
pub enum IdentityError {
    #[error("Error creating credential: {0}")]
    ErrorCreatingCredential(String),
    #[error("Error serializing credential: {0}")]
    ErrorCredentialSerialize(String),
    #[error("Invalid did: {0}")]
    InvalidDid(String),
    #[error("Error schema: {0}")]
    ErrorSchemaValidation(String),
    #[error("Error parsing schema: {0}")]
    ErrorParsingSchema(String),
    #[error("Error dataset: {0}")]
    ErrorDataset(String),
    #[error("Error rdf entry: {0}")]
    ErrorRdfEntry(String),
    #[error("Error merkle tree: {0}")]
    ErrorMerkleTree(String),
    #[error("Credential id not found")]
    ErrorCredentialIdNotFound,
    #[error("Credential expiration date not found")]
    ErrorCredentialExpirtionDateNotFound,
    #[error("Error parse type: {0}")]
    ErrorParseType(String),





}
