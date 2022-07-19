use crate::anchor::repository::AnchorRepository;

#[cfg(test)]
use mockall::automock;

use super::entity::anchor::Anchor;

#[cfg_attr(test, automock)]
pub trait AnchorService {
    fn get_anchor(&self, anchor_id: i32) -> Option<Anchor>;
}

pub struct AnchorServiceImpl<A: AnchorRepository> {
    pub anchor_repository: A,
}

impl<A> AnchorService for AnchorServiceImpl<A>
where
    A: AnchorRepository,
{
    fn get_anchor(&self, anchor_id: i32) -> Option<Anchor> {
        self.anchor_repository.get_anchor(anchor_id)
    }
}
