import os
import unittest

from bloock.client.authenticity import AuthenticityClient
from bloock.client.key import KeyClient
from bloock.client.record import RecordClient
from bloock.entity.authenticity.signer import Signer
from bloock.entity.key.certificate_type import CertificateType
from bloock.entity.key.import_certificate_params import ImportCertificateParams
from bloock.entity.key.key_protection_level import KeyProtectionLevel
from bloock.entity.key.key_type import KeyType
from bloock.entity.key.managed_certificate_params import ManagedCertificateParams
from bloock.entity.key.local_certificate_params import LocalCertificateParams
from bloock.entity.key.managed_key_params import ManagedKeyParams
from bloock.entity.key.subject_certificate_params import SubjectCertificateParams
from bloock.entity.key.managed import Managed
from test.e2e.util import init_sdk, init_dev_sdk, generate_random_string


class TestKey(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        init_dev_sdk()

    def test_generate_local_ecdsa(self):
        key_client = KeyClient()
        local_key = key_client.new_local_key(KeyType.EcP256k)

        self.assertNotEqual(local_key.key, "")
        self.assertNotEqual(local_key.private_key, "")

        loaded_key = key_client.load_local_key(
            KeyType.EcP256k, local_key.private_key)
        self.assertEqual(local_key.key, loaded_key.key)
        self.assertEqual(local_key.private_key, loaded_key.private_key)

    def test_generate_local_bjj(self):
        key_client = KeyClient()
        local_key = key_client.new_local_key(KeyType.Bjj)

        self.assertNotEqual(local_key.key, "")
        self.assertNotEqual(local_key.private_key, "")

        loaded_key = key_client.load_local_key(
            KeyType.Bjj, local_key.private_key)
        self.assertEqual(local_key.key, loaded_key.key)
        self.assertEqual(local_key.private_key, loaded_key.private_key)

    def test_generate_local_rsa(self):
        key_client = KeyClient()
        local_key = key_client.new_local_key(KeyType.Rsa2048)

        self.assertNotEqual(local_key.key, "")
        self.assertNotEqual(local_key.private_key, "")

        loaded_key = key_client.load_local_key(
            KeyType.Rsa2048, local_key.private_key)
        self.assertEqual(local_key.key, loaded_key.key)
        self.assertEqual(local_key.private_key, loaded_key.private_key)

    def test_generate_local_aes(self):
        key_client = KeyClient()
        local_key = key_client.new_local_key(KeyType.Aes256)

        self.assertNotEqual(local_key.key, "")
        self.assertEqual(local_key.private_key, "")

        loaded_key = key_client.load_local_key(
            KeyType.Aes256, local_key.key)
        self.assertEqual(local_key.key, loaded_key.key)
        self.assertEqual(local_key.private_key, loaded_key.private_key)

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

        loaded_key = key_client.load_managed_key(managed_key.id)
        self.assertEqual(managed_key.id, loaded_key.id)
        self.assertEqual(managed_key.name, loaded_key.name)
        self.assertEqual(managed_key.key, loaded_key.key)
        self.assertEqual(managed_key.key_type, loaded_key.key_type)
        self.assertEqual(managed_key.protection, loaded_key.protection)

    def test_generate_managed_bjj(self):
        key_client = KeyClient()
        protection = KeyProtectionLevel.SOFTWARE
        key_type = KeyType.Bjj
        key_name = "key_name"
        params = ManagedKeyParams(protection, key_type, key_name)
        managed_key = key_client.new_managed_key(params)

        self.assertEqual(managed_key.name, key_name)
        self.assertNotEqual(managed_key.key, "")
        self.assertEqual(managed_key.protection, protection)
        self.assertEqual(managed_key.key_type, key_type)

        loaded_key = key_client.load_managed_key(managed_key.id)
        self.assertEqual(managed_key.id, loaded_key.id)
        self.assertEqual(managed_key.name, loaded_key.name)
        self.assertEqual(managed_key.key, loaded_key.key)
        self.assertEqual(managed_key.key_type, loaded_key.key_type)
        self.assertEqual(managed_key.protection, loaded_key.protection)

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

        loaded_key = key_client.load_managed_key(managed_key.id)
        self.assertEqual(managed_key.id, loaded_key.id)
        self.assertEqual(managed_key.name, loaded_key.name)
        self.assertEqual(managed_key.key, loaded_key.key)
        self.assertEqual(managed_key.key_type, loaded_key.key_type)
        self.assertEqual(managed_key.protection, loaded_key.protection)

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

        loaded_key = key_client.load_managed_key(managed_key.id)
        self.assertEqual(managed_key.id, loaded_key.id)
        self.assertEqual(managed_key.name, loaded_key.name)
        self.assertEqual(managed_key.key, loaded_key.key)
        self.assertEqual(managed_key.key_type, loaded_key.key_type)
        self.assertEqual(managed_key.protection, loaded_key.protection)

    def test_generate_local_certificate(self):
        key_client = KeyClient()

        key_type = KeyType.Rsa2048
        subject_params = SubjectCertificateParams(
            "Google internet Authority G2", "IT Department", "IT Department", None, None, "US")
        params = LocalCertificateParams(
            key_type, subject_params, "password", 2)
        local_certificate = key_client.new_local_certificate(params)

        self.assertIsNotNone(local_certificate.pkcs12)

        loaded_certificate = key_client.load_local_certificate(
            local_certificate.pkcs12, local_certificate.password)

        self.assertEqual(local_certificate.pkcs12, loaded_certificate.pkcs12)

        record_client = RecordClient()
        record = record_client.from_string("Hello world").build()

        authenticity_client = AuthenticityClient()
        signature = authenticity_client.sign(
            record, Signer(loaded_certificate))
        self.assertNotEqual(signature, "")

    def test_import_local_certificate_p12(self):
        key_client = KeyClient()

        current_directory = os.getcwd()
        file_path = current_directory + "/test/e2e/test_utils/test.p12"
        with open(file_path, 'rb') as file:
            file_bytes = file.read()

        local_certificate = key_client.load_local_certificate(
            file_bytes, "bloock")

        self.assertEqual(local_certificate.password, "bloock")

    def test_generate_managed_certificate(self):
        key_client = KeyClient()

        key_type = KeyType.EcP256k
        subject_params = SubjectCertificateParams(
            "Google internet Authority G2", "IT Department", "IT Department", None, None, "US")
        params = ManagedCertificateParams(key_type, subject_params, 5)
        managed_certificate = key_client.new_managed_certificate(params)

        self.assertNotEqual(managed_certificate.key, "")
        self.assertEqual(managed_certificate.protection,
                         KeyProtectionLevel.SOFTWARE)
        self.assertEqual(managed_certificate.key_type, key_type)

        loaded_certificate = key_client.load_managed_certificate(
            managed_certificate.id)
        self.assertEqual(managed_certificate.id, loaded_certificate.id)
        self.assertEqual(managed_certificate.key, loaded_certificate.key)
        self.assertEqual(managed_certificate.key_type,
                         loaded_certificate.key_type)
        self.assertEqual(managed_certificate.protection,
                         loaded_certificate.protection)

    def test_import_managed_certificate_pem(self):
        key_client = KeyClient()

        current_directory = os.getcwd()
        file_path = current_directory + "/test/e2e/test_utils/test.pem"
        with open(file_path, 'rb') as file:
            file_bytes = file.read()

        managed_certificate = key_client.import_managed_certificate(
            CertificateType.PEM, file_bytes, ImportCertificateParams())

        self.assertNotEqual(managed_certificate.key, "")
        self.assertEqual(managed_certificate.protection,
                         KeyProtectionLevel.SOFTWARE)
        self.assertEqual(managed_certificate.key_type, KeyType.Rsa2048)

        loaded_certificate = key_client.load_managed_certificate(
            managed_certificate.id)
        self.assertEqual(managed_certificate.id, loaded_certificate.id)
        self.assertEqual(managed_certificate.key, loaded_certificate.key)
        self.assertEqual(managed_certificate.key_type,
                         loaded_certificate.key_type)
        self.assertEqual(managed_certificate.protection,
                         loaded_certificate.protection)

    def test_import_managed_certificate_pfx(self):
        key_client = KeyClient()

        current_directory = os.getcwd()
        file_path = current_directory + "/test/e2e/test_utils/test2.pfx"
        with open(file_path, 'rb') as file:
            file_bytes = file.read()
        password = "bloock"

        managed_certificate = key_client.import_managed_certificate(
            CertificateType.PFX, file_bytes, ImportCertificateParams(password))

        self.assertNotEqual(managed_certificate.key, "")
        self.assertEqual(managed_certificate.protection,
                         KeyProtectionLevel.SOFTWARE)
        self.assertEqual(managed_certificate.key_type, KeyType.EcP256k)

        loaded_certificate = key_client.load_managed_certificate(
            managed_certificate.id)
        self.assertEqual(managed_certificate.id, loaded_certificate.id)
        self.assertEqual(managed_certificate.key, loaded_certificate.key)
        self.assertEqual(managed_certificate.key_type,
                         loaded_certificate.key_type)
        self.assertEqual(managed_certificate.protection,
                         loaded_certificate.protection)

        record_client = RecordClient()
        record = record_client.from_string("Hello world").build()

        authenticity_client = AuthenticityClient()
        signature = authenticity_client.sign(
            record, Signer(loaded_certificate))
        self.assertNotEqual(signature, "")

    def test_setup_and_recover_totp_access_control(self):
        key_client = KeyClient()
        record_client = RecordClient()
        authenticity_client = AuthenticityClient()

        protection = KeyProtectionLevel.SOFTWARE
        key_type = KeyType.Rsa2048
        params = ManagedKeyParams(protection, key_type)
        managed_key = key_client.new_managed_key(params)

        record = record_client.from_string("Hello world").build()

        authenticity_client.sign(record, Signer(managed_key))

        totp = key_client.setup_totp_access_control(Managed(managed_key))
        self.assertNotEqual(totp.secret, "")
        self.assertNotEqual(totp.secret_qr, "")
        self.assertNotEqual(totp.recovery_codes, [""])

        with self.assertRaises(Exception):
            authenticity_client.sign(record, Signer(managed_key))

        totp_recovered = key_client.recover_totp_access_control(
            Managed(managed_key), totp.recovery_codes[0])
        self.assertNotEqual(totp_recovered.secret, "")
        self.assertNotEqual(totp_recovered.secret_qr, "")
        self.assertNotEqual(totp_recovered.recovery_codes, [""])

    def test_setup_secret_access_control(self):
        key_client = KeyClient()
        record_client = RecordClient()
        authenticity_client = AuthenticityClient()

        protection = KeyProtectionLevel.SOFTWARE
        key_type = KeyType.Rsa2048
        params = ManagedKeyParams(protection, key_type)
        managed_key = key_client.new_managed_key(params)

        record = record_client.from_string("Hello world").build()

        authenticity_client.sign(record, Signer(managed_key))

        email = generate_random_string(8) + "@bloock.com"
        key_client.setup_secret_access_control(
            Managed(managed_key), "password", email)

        with self.assertRaises(Exception):
            authenticity_client.sign(record, Signer(managed_key))
