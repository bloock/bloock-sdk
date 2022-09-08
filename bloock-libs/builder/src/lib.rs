pub mod builder;
pub mod document;
pub mod encrypter;
pub mod hasher;
pub mod publisher;
pub mod record;
pub mod signer;

use crate::{
    builder::RecordBuilder,
    publisher::hosted::{HostedLoader, HostedLoaderArgs},
};
use encrypter::aes::{AesEncrypter, AesEncrypterArgs};
use signer::ecsda::{EcsdaSigner, EcsdaSignerArgs};
use thiserror::Error as ThisError;

pub type Result<T> = std::result::Result<T, BuilderError>;

fn _main() {
    let (_public_key, private_key) = EcsdaSigner::generate_keys();

    let record = RecordBuilder::from_string("Hello world!".to_string())
        .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new("secret")))
        .with_signer(EcsdaSigner::new(EcsdaSignerArgs::new(&private_key)))
        .build()
        .unwrap();

    let loaded_record = RecordBuilder::from_loader(HostedLoader::new(HostedLoaderArgs {
        bloock_id: "".to_string(),
    }))
    .unwrap()
    .build()
    .unwrap();

    println!("{:?}", record.serialize());
    println!("{:?}", loaded_record.serialize());
}

#[derive(ThisError, Debug)]
pub enum BuilderError {
    #[error("Document error: {0}")]
    DocumentError(String),
    #[error("Error while decoding payload: {0}")]
    DecodeError(String),
    #[error("Couldn't serialize record: {0}")]
    SerializeError(String),
    #[error("Encryption error: {0}")]
    EncryptionError(String),
    #[error("Invalid JSON provided")]
    InvalidJson,
}
