use crate::items::EncryptionAlg;

impl From<bloock_encrypter::EncryptionAlg> for EncryptionAlg {
    fn from(alg: bloock_encrypter::EncryptionAlg) -> Self {
        match alg {
            bloock_encrypter::EncryptionAlg::A256gcm => EncryptionAlg::A256gcm,
            bloock_encrypter::EncryptionAlg::Rsa => EncryptionAlg::Rsa,
            bloock_encrypter::EncryptionAlg::Ecies => EncryptionAlg::Ecies,
        }
    }
}
