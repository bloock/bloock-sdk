use crate::record::repository::RecordRepository;

#[cfg(test)]
use mockall::automock;

#[cfg_attr(test, automock)]
pub trait RecordService {
    fn get_record() -> ();
}

pub struct RecordServiceImpl<A: RecordRepository> {
    pub record_repository: A,
}

impl<A> RecordService for RecordServiceImpl<A>
where
    A: RecordRepository,
{
    fn get_record() {}
}
