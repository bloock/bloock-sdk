import unittest

from bloock.client.encryption import EncryptionClient
from bloock.client.key import KeyClient
from bloock.client.record import RecordClient
from bloock.entity.encryption.aes_decrypter import AesDecrypter
from bloock.entity.encryption.aes_encrypter import AesEncrypter
from bloock.entity.encryption.decrypter_args import DecrypterArgs
from bloock.entity.encryption.encrypter_args import EncrypterArgs
from bloock.entity.encryption.encryption_alg import EncryptionAlg
from bloock.entity.encryption.rsa_decrypter import RsaDecrypter
from bloock.entity.encryption.rsa_encrypter import RsaEncrypter
from bloock.entity.key.key_type import KeyType
from test.util import init_sdk


class TestEncryption(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        init_sdk()

    def test_encrypt_local_aes(self):
        payload = "Hello world"
        record_client = RecordClient()
        record = record_client.from_string(payload).build()
        record_hash = record.get_hash()

        key_client = KeyClient()
        key = key_client.new_local_key(KeyType.Aes256)

        encryption_client = EncryptionClient()
        encrypted_record = encryption_client.encrypt(record, AesEncrypter(EncrypterArgs(key)))

        decrypted_record = (
            record_client.from_record(encrypted_record)
            .with_decrypter(AesDecrypter(DecrypterArgs(key)))
            .build()
        )
        decrypted_record_hash = decrypted_record.get_hash()

        self.assertEqual(record_hash, decrypted_record_hash)
        self.assertNotEqual(decrypted_record.retrieve(), encrypted_record.retrieve())

    def test_decrypt_local_aes(self):
        payload = "Hello world"
        record_client = RecordClient()

        encryption_client = EncryptionClient()
        key_client = KeyClient()
        key = key_client.new_local_key(KeyType.Aes256)

        encrypted_record = (
            record_client.from_string(payload)
            .with_encrypter(AesEncrypter(EncrypterArgs(key)))
            .build()
        )
        encrypted_record_hash = encrypted_record.get_hash()

        decrypted_record = encryption_client.decrypt(
            encrypted_record, AesDecrypter(DecrypterArgs(key))
        )
        decrypted_record_hash = decrypted_record.get_hash()

        self.assertEqual(encrypted_record_hash, decrypted_record_hash)
        self.assertNotEqual(decrypted_record.retrieve(), encrypted_record.retrieve())

    def test_encrypt_local_rsa(self):
        payload = "Hello world"
        record_client = RecordClient()
        record = record_client.from_string(payload).build()
        record_hash = record.get_hash()

        encryption_client = EncryptionClient()
        key_client = KeyClient()
        key = key_client.new_local_key(KeyType.Rsa2048)
        encrypted_record = encryption_client.encrypt(
            record, RsaEncrypter(EncrypterArgs(key))
        )

        decrypted_record = (
            record_client.from_record(encrypted_record)
            .with_decrypter(RsaDecrypter(DecrypterArgs(key)))
            .build()
        )
        decrypted_record_hash = decrypted_record.get_hash()

        self.assertEqual(record_hash, decrypted_record_hash)
        self.assertNotEqual(decrypted_record.retrieve(), encrypted_record.retrieve())

    def test_decrypt_local_rsa(self):
        payload = "Hello world"
        record_client = RecordClient()

        encryption_client = EncryptionClient()
        key_client = KeyClient()
        key = key_client.new_local_key(KeyType.Rsa2048)

        encrypted_record = (
            record_client.from_string(payload)
            .with_encrypter(RsaEncrypter(EncrypterArgs(key)))
            .build()
        )
        encrypted_record_hash = encrypted_record.get_hash()

        decrypted_record = encryption_client.decrypt(
            encrypted_record, RsaDecrypter(DecrypterArgs(key))
        )
        decrypted_record_hash = decrypted_record.get_hash()

        self.assertEqual(encrypted_record_hash, decrypted_record_hash)
        self.assertNotEqual(decrypted_record.retrieve(), encrypted_record.retrieve())

    def test_get_encryption_alg(self):
        payload = "Hello world"
        record_client = RecordClient()

        encryption_client = EncryptionClient()
        key_client = KeyClient()
        key = key_client.new_local_key(KeyType.Rsa2048)

        encrypted_record = (
            record_client.from_string(payload)
            .with_encrypter(RsaEncrypter(EncrypterArgs(key)))
            .build()
        )

        alg = encryption_client.get_encryption_alg(encrypted_record)

        self.assertEqual(alg, EncryptionAlg.RSA)
