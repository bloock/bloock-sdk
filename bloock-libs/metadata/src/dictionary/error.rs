#[derive(Debug)]
pub enum Error {
    LoPdf(lopdf::Error),
    TryFromInt(std::num::TryFromIntError),
    Other(String),
}

impl From<lopdf::Error> for Error {
    fn from(err: lopdf::Error) -> Self {
        Self::LoPdf(err)
    }
}

impl From<String> for Error {
    fn from(err: String) -> Self {
        Self::Other(err)
    }
}
impl From<&str> for Error {
    fn from(err: &str) -> Self {
        Self::Other(err.to_owned())
    }
}

impl From<std::num::TryFromIntError> for Error {
    fn from(err: std::num::TryFromIntError) -> Self {
        Error::TryFromInt(err)
    }
}

impl From<std::io::Error> for Error {
    fn from(err: std::io::Error) -> Self {
        Error::LoPdf(lopdf::Error::from(err))
    }
}
