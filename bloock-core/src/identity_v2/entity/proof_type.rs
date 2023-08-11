use crate::identity::IdentityError;

#[derive(Clone, Debug, PartialEq)]
pub enum ProofType {
    BloockProof,
    PolygonMtp,
    None,
}

impl ProofType {
    pub fn new(key_type: &str) -> Result<ProofType, IdentityError> {
        match key_type {
            "bloock_proof" => Ok(ProofType::BloockProof),
            "polygon_mtp" => Ok(ProofType::PolygonMtp),
            _ => Err(IdentityError::InvalidProofTypeProvided()),
        }
    }

    pub fn get_proof_type(&self) -> String {
        match self {
            ProofType::BloockProof => "bloock_proof".to_string(),
            ProofType::PolygonMtp => "polygon_mtp".to_string(),
            ProofType::None => "".to_string(),
        }
    }
}
