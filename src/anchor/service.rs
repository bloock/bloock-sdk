use crate::anchor::repository::AnchorRepository;

#[cfg(test)]
use mockall::automock;

#[cfg_attr(test, automock)]
pub trait AnchorService {
    fn get_anchor() -> ();
}

pub struct AnchorServiceImpl<A: AnchorRepository> {
    pub anchor_repository: A,
}

impl<A> AnchorService for AnchorServiceImpl<A>
where
    A: AnchorRepository,
{
    fn get_anchor() {}
}
