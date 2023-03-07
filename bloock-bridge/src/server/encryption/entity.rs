use crate::items::EncryptionAlg;

impl From<bloock_encrypter::entity::alg::EncryptionAlg> for EncryptionAlg {
    fn from(alg: bloock_encrypter::entity::alg::EncryptionAlg) -> Self {
        match alg {
            bloock_encrypter::entity::alg::EncryptionAlg::A256gcm => EncryptionAlg::A256gcm,
            bloock_encrypter::entity::alg::EncryptionAlg::Rsa => EncryptionAlg::Rsa,
        }
    }
}
