pub mod builder;
pub mod document;
pub mod encrypter;
pub mod publisher;
pub mod record;
pub mod signer;

use crate::builder::RecordBuilder;
use builder::Builder;
use encrypter::aes::{AesEncrypter, AesEncrypterArgs};
use publisher::hosted::{HostedPublisher, HostedPublisherArgs};
use signer::ecsda::{EcsdaSigner, EcsdaSignerArgs};
use thiserror::Error as ThisError;

pub type Result<T> = std::result::Result<T, BuilderError>;

fn _main() {
    let (_public_key, private_key) = EcsdaSigner::generate_keys();

    let record = RecordBuilder::default()
        .from_string("Hello world!".to_string())
        .with_signer(EcsdaSigner::new(EcsdaSignerArgs::new(&private_key)))
        .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new("secret")))
        .with_publisher(HostedPublisher::new(HostedPublisherArgs::default()))
        .build()
        .unwrap();

    let loaded_record = RecordBuilder::default()
        .from_publisher_with_string("Hello world!".to_string())
        .unwrap()
        .with_signer(EcsdaSigner::new(EcsdaSignerArgs::new("private_key")))
        .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new("secret")))
        .with_publisher(HostedPublisher::new(HostedPublisherArgs::default()))
        .build()
        .unwrap();

    /*let record = RecordLoader::new()
            .load_string("Hello world!") // StringLoader
            // .load_string_from_publisher("hash")  // StringLoader
            .with_decrypter(AesDecrypter::new(AesDecrypterArgs::new("secret")))
            .load()
            .unwrap(); // Document
    */
    println!("{:?}", record.retrieve());
    println!("{:?}", loaded_record.retrieve());
}

#[derive(ThisError, Debug)]
pub enum BuilderError {
    #[error("Document error: {0}")]
    DocumentError(String),
    #[error("Base type load Error: {0}")]
    BaseLoadError(String),
    #[error("JSON load Error: {0}")]
    JsonLoadError(String),
    #[error("PDF load error: {0}")]
    PDFLoadError(String),
    #[error("Encryption error: {0}")]
    EncryptionError(String),
}
