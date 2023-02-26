import unittest

from bloock.client.encryption import EncryptionClient
from bloock.client.key import KeyClient
from bloock.client.record import RecordClient
from bloock.entity.encryption.aes_decrypter import AesDecrypter
from bloock.entity.encryption.aes_encrypter import AesEncrypter
from bloock.entity.encryption.encryption_alg import EncryptionAlg
from bloock.entity.encryption.rsa_decrypter import RsaDecrypter
from bloock.entity.encryption.rsa_encrypter import RsaEncrypter
from bloock.entity.key.key_protection_level import KeyProtectionLevel
from bloock.entity.key.key_type import KeyType
from bloock.entity.key.managed_key_params import ManagedKeyParams
from test.util import init_sdk


class TestKey(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        init_sdk()

    def test_generate_local_ecdsa(self):
        key_client = KeyClient()
        local_key = key_client.new_local_key(KeyType.EcP256k)

        self.assertNotEqual(local_key.key, "")
        self.assertNotEqual(local_key.private_key, "")

    def test_generate_local_rsa(self):
        key_client = KeyClient()
        local_key = key_client.new_local_key(KeyType.Rsa2048)

        self.assertNotEqual(local_key.key, "")
        self.assertNotEqual(local_key.private_key, "")

    def test_generate_managed_ecdsa(self):
        key_client = KeyClient()
        protection = KeyProtectionLevel.SOFTWARE
        key_type = KeyType.EcP256k
        key_name = "key_name"
        params = ManagedKeyParams(protection, key_type, key_name)
        managed_key = key_client.new_managed_key(params)

        self.assertEqual(managed_key.name, key_name)
        self.assertNotEqual(managed_key.key, "")
        self.assertEqual(managed_key.protection, protection)
        self.assertEqual(managed_key.key_type, key_type)

    def test_generate_managed_rsa(self):
        key_client = KeyClient()
        protection = KeyProtectionLevel.SOFTWARE
        key_type = KeyType.Rsa2048
        key_name = "key_name"
        params = ManagedKeyParams(protection, key_type, key_name)
        managed_key = key_client.new_managed_key(params)

        self.assertEqual(managed_key.name, key_name)
        self.assertNotEqual(managed_key.key, "")
        self.assertEqual(managed_key.protection, protection)
        self.assertEqual(managed_key.key_type, key_type)

    def test_generate_managed_without_name(self):
        key_client = KeyClient()
        protection = KeyProtectionLevel.SOFTWARE
        key_type = KeyType.Rsa2048
        params = ManagedKeyParams(protection, key_type)
        managed_key = key_client.new_managed_key(params)

        self.assertEqual(managed_key.name, "")
        self.assertNotEqual(managed_key.key, "")
        self.assertEqual(managed_key.protection, protection)
        self.assertEqual(managed_key.key_type, key_type)
