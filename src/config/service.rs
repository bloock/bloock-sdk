use crate::config::repository::ConfigRepository;

#[cfg(test)]
use mockall::automock;

#[cfg_attr(test, automock)]
pub trait ConfigService {
    fn get_config() -> ();
}

pub struct ConfigServiceImpl<A: ConfigRepository> {
    pub config_repository: A,
}

impl<A> ConfigService for ConfigServiceImpl<A>
where
    A: ConfigRepository,
{
    fn get_config() {}
}
