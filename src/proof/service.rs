use crate::proof::repository::ProofRepository;

#[cfg(test)]
use mockall::automock;

#[cfg_attr(test, automock)]
pub trait ProofService {
    fn get_proof() -> ();
}

pub struct ProofServiceImpl<A: ProofRepository> {
    pub proof_repository: A,
}

impl<A> ProofService for ProofServiceImpl<A>
where
    A: ProofRepository,
{
    fn get_proof() {}
}
