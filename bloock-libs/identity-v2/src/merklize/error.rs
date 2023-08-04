use thiserror::Error;

#[derive(Error, Debug, PartialEq, Eq)]
pub enum MerklizeError {
    #[error("Invalid reference type")]
    InvalidReferenceType(),
    #[error("Multiple parents found")]
    ErrorMultipleParentsFound(),
    #[error("Unexpected Quad's object type")]
    UnexpectedQuadObject(),
    #[error("BlankNode is not supported yet")]
    ErrBlankNode(),
    #[error("[assertion] key not found in counts")]
    ErrAssertionKeyNotFound(),
    #[error("Multiple parents found")]
    ErrorParentNotFound(),
    #[error("Parent mapping not found")]
    ErrorParentMappingNotFound(),
    #[error("Child not found in parents mapping")]
    ErrorChildMappingNotFound(),
    #[error("Triple not found for the given data index")]
    ErrorTripleNotFound(),
    #[error("incorrect boolean value")]
    InvalidBooleanValue(),
    #[error("Error building the path: {0}")]
    ErrorPath(String),
    #[error("Unexpected type path")]
    InvalidPathType(),
    #[error("Error parsing number: {0}")]
    ErrorParsingNumber(String),
}
