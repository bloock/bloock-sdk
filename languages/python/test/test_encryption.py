import unittest

from bloock.client.encryption import EncryptionClient
from bloock.client.record import RecordClient
from bloock.entity.decrypter import AesDecrypter, RsaDecrypter, EciesDecrypter
from bloock.entity.encrypter import AesEncrypter, RsaEncrypter, EciesEncrypter
from bloock.entity.encryption_alg import EncryptionAlg
from test.util import init_sdk


class TestEncryption(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        init_sdk()

    def test_encrypt_aes(self):
        payload = "Hello world"
        record_client = RecordClient()
        record = record_client.from_string(payload).build()
        record_hash = record.get_hash()

        password = "some_password"
        encryption_client = EncryptionClient()
        encrypted_record = encryption_client.encrypt(record, AesEncrypter(password))

        decrypted_record = (
            record_client.from_record(encrypted_record)
            .with_decrypter(AesDecrypter(password))
            .build()
        )
        decrypted_record_hash = decrypted_record.get_hash()

        self.assertEqual(record_hash, decrypted_record_hash)
        self.assertNotEqual(decrypted_record.retrieve(), encrypted_record.retrieve())

    def test_decrypt_aes(self):
        payload = "Hello world"
        record_client = RecordClient()

        encryption_client = EncryptionClient()
        password = "some_password"

        encrypted_record = (
            record_client.from_string(payload)
            .with_encrypter(AesEncrypter(password))
            .build()
        )
        encrypted_record_hash = encrypted_record.get_hash()

        decrypted_record = encryption_client.decrypt(
            encrypted_record, AesDecrypter(password)
        )
        decrypted_record_hash = decrypted_record.get_hash()

        self.assertEqual(encrypted_record_hash, decrypted_record_hash)
        self.assertNotEqual(decrypted_record.retrieve(), encrypted_record.retrieve())

    def test_encrypt_rsa(self):
        payload = "Hello world"
        record_client = RecordClient()
        record = record_client.from_string(payload).build()
        record_hash = record.get_hash()

        encryption_client = EncryptionClient()
        keys = encryption_client.generate_rsa_keypair()
        encrypted_record = encryption_client.encrypt(
            record, RsaEncrypter(keys.public_key)
        )

        decrypted_record = (
            record_client.from_record(encrypted_record)
            .with_decrypter(RsaDecrypter(keys.private_key))
            .build()
        )
        decrypted_record_hash = decrypted_record.get_hash()

        self.assertEqual(record_hash, decrypted_record_hash)
        self.assertNotEqual(decrypted_record.retrieve(), encrypted_record.retrieve())

    def test_decrypt_rsa(self):
        payload = "Hello world"
        record_client = RecordClient()

        encryption_client = EncryptionClient()
        keys = encryption_client.generate_rsa_keypair()

        encrypted_record = (
            record_client.from_string(payload)
            .with_encrypter(RsaEncrypter(keys.public_key))
            .build()
        )
        encrypted_record_hash = encrypted_record.get_hash()

        decrypted_record = encryption_client.decrypt(
            encrypted_record, RsaDecrypter(keys.private_key)
        )
        decrypted_record_hash = decrypted_record.get_hash()

        self.assertEqual(encrypted_record_hash, decrypted_record_hash)
        self.assertNotEqual(decrypted_record.retrieve(), encrypted_record.retrieve())

    def test_encrypt_ecies(self):
        payload = "Hello world"
        record_client = RecordClient()
        record = record_client.from_string(payload).build()
        record_hash = record.get_hash()

        encryption_client = EncryptionClient()
        keys = encryption_client.generate_ecies_keypair()
        encrypted_record = encryption_client.encrypt(
            record, EciesEncrypter(keys.public_key)
        )

        decrypted_record = (
            record_client.from_record(encrypted_record)
            .with_decrypter(EciesDecrypter(keys.private_key))
            .build()
        )
        decrypted_record_hash = decrypted_record.get_hash()

        self.assertEqual(record_hash, decrypted_record_hash)
        self.assertNotEqual(decrypted_record.retrieve(), encrypted_record.retrieve())

    def test_decrypt_ecies(self):
        payload = "Hello world"
        record_client = RecordClient()

        encryption_client = EncryptionClient()
        keys = encryption_client.generate_ecies_keypair()

        encrypted_record = (
            record_client.from_string(payload)
            .with_encrypter(EciesEncrypter(keys.public_key))
            .build()
        )
        encrypted_record_hash = encrypted_record.get_hash()

        decrypted_record = encryption_client.decrypt(
            encrypted_record, EciesDecrypter(keys.private_key)
        )
        decrypted_record_hash = decrypted_record.get_hash()

        self.assertEqual(encrypted_record_hash, decrypted_record_hash)
        self.assertNotEqual(decrypted_record.retrieve(), encrypted_record.retrieve())

    def test_get_encryption_alg(self):
        payload = "Hello world"
        record_client = RecordClient()

        encryption_client = EncryptionClient()
        keys = encryption_client.generate_ecies_keypair()

        encrypted_record = (
            record_client.from_string(payload)
            .with_encrypter(EciesEncrypter(keys.public_key))
            .build()
        )

        alg = encryption_client.get_encryption_alg(encrypted_record)

        self.assertEqual(alg, EncryptionAlg.ECIES)
