use crate::identity::IdentityError;

#[derive(Clone, Debug, PartialEq)]
pub enum ProofType {
    IntegrityProofType,
    SparseMtProofType,
    None,
}

impl ProofType {
    pub fn new(key_type: &str) -> Result<ProofType, IdentityError> {
        match key_type {
            "integrity_proof" => Ok(ProofType::IntegrityProofType),
            "sparse_mt_proof" => Ok(ProofType::SparseMtProofType),
            _ => Err(IdentityError::InvalidProofTypeProvided()),
        }
    }

    pub fn get_proof_type(&self) -> String {
        match self {
            ProofType::IntegrityProofType => "integrity_proof".to_string(),
            ProofType::SparseMtProofType => "sparse_mt_proof".to_string(),
            ProofType::None => "".to_string(),
        }
    }
}
