import time
import unittest

from bloock.client.encryption import EncryptionClient
from bloock.client.key import KeyClient
from bloock.client.record import RecordClient
from bloock.entity.encryption.encryption_alg import EncryptionAlg
from bloock.entity.key.access_control import AccessControl
from bloock.entity.key.access_control_totp import AccessControlTotp
from bloock.entity.key.key_protection_level import KeyProtectionLevel
from bloock.entity.key.key_type import KeyType
from bloock.entity.encryption.encrypter import Encrypter
from bloock.entity.key.managed import Managed
from bloock.entity.key.managed_key_params import ManagedKeyParams
from test.e2e.util import init_sdk, generate_totp_client


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
        encrypted_record = encryption_client.encrypt(record, Encrypter(key))

        decrypted_record = (
            record_client.from_record(encrypted_record)
            .with_decrypter(Encrypter(key))
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
            .with_encrypter(Encrypter(key))
            .build()
        )
        encrypted_record_hash = encrypted_record.get_hash()

        decrypted_record = encryption_client.decrypt(
            encrypted_record, Encrypter(key)
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
            record, Encrypter(key)
        )

        decrypted_record = (
            record_client.from_record(encrypted_record)
            .with_decrypter(Encrypter(key))
            .build()
        )
        decrypted_record_hash = decrypted_record.get_hash()

        self.assertEqual(record_hash, decrypted_record_hash)
        self.assertNotEqual(decrypted_record.retrieve(), encrypted_record.retrieve())

    def test_encrypt_managed_rsa_with_totp_access_control(self):
        payload = "Hello world"
        record_client = RecordClient()
        record = record_client.from_string(payload).build()
        record_hash = record.get_hash()

        encryption_client = EncryptionClient()
        key_client = KeyClient()
        key = key_client.new_managed_key(ManagedKeyParams(KeyProtectionLevel.SOFTWARE, KeyType.Rsa2048))

        totp = key_client.setup_totp_access_control(Managed(key))

        code = generate_totp_client(totp.secret, int(time.time()))

        totp_access_control = AccessControlTotp(code)
        encrypted_record = encryption_client.encrypt(
            record, Encrypter(key, AccessControl(totp_access_control))
        )

        decrypted_record = (
            record_client.from_record(encrypted_record)
            .with_decrypter(Encrypter(key, AccessControl(totp_access_control)))
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
            .with_encrypter(Encrypter(key))
            .build()
        )
        encrypted_record_hash = encrypted_record.get_hash()

        decrypted_record = encryption_client.decrypt(
            encrypted_record, Encrypter(key)
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
            .with_encrypter(Encrypter(key))
            .build()
        )

        alg = encryption_client.get_encryption_alg(encrypted_record)

        self.assertEqual(alg, EncryptionAlg.RSA)
