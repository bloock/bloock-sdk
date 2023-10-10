import unittest

from bloock.client.authenticity import AuthenticityClient
from bloock.client.key import KeyClient
from bloock.client.record import RecordClient
from bloock.entity.authenticity.signer import Signer
from bloock.entity.authenticity.signer_args import SignerArgs
from bloock.entity.key.key_type import KeyType
from bloock.entity.key.managed_key_params import ManagedKeyParams
from bloock.entity.key.key_protection_level import KeyProtectionLevel
from test.e2e.util import init_sdk


class TestAuthenticity(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        init_sdk()

    def test_generate_ecdsa_keys(self):
        authenticity_client = AuthenticityClient()

        keys = authenticity_client.generate_ecdsa_keys()

        self.assertNotEqual(keys.public_key, "")
        self.assertNotEqual(keys.private_key, "")

    def test_sign_local_ecdsa(self):
        record_client = RecordClient()

        record = record_client.from_string("Hello world").build()

        key_client = KeyClient()
        key = key_client.new_local_key(KeyType.EcP256k)

        authenticity_client = AuthenticityClient()
        signature = authenticity_client.sign(record, Signer(SignerArgs(key)))
        self.assertNotEqual(signature, "")

    def test_sign_managed_bjj(self):
        record_client = RecordClient()

        record = record_client.from_string("Hello world").build()

        key_client = KeyClient()
        key = key_client.new_managed_key(ManagedKeyParams(KeyProtectionLevel.SOFTWARE, KeyType.Bjj))

        authenticity_client = AuthenticityClient()
        signature = authenticity_client.sign(record, Signer(SignerArgs(key)))
        self.assertNotEqual(signature, "")

    def test_verify_local_ecdsa(self):
        authenticity_client = AuthenticityClient()

        key_client = KeyClient()
        key = key_client.new_local_key(KeyType.EcP256k)

        record_client = RecordClient()
        record = (
            record_client.from_string("Hello world")
            .with_signer(Signer(SignerArgs(key)))
            .build()
        )

        valid = authenticity_client.verify(record)
        self.assertTrue(valid)

    def test_verify_managed_bjj(self):
        record_client = RecordClient()
        authenticity_client = AuthenticityClient()

        key_client = KeyClient()
        key = key_client.new_managed_key(ManagedKeyParams(KeyProtectionLevel.SOFTWARE, KeyType.Bjj))

        record_client = RecordClient()
        record = (
            record_client.from_string("Hello world")
            .with_signer(Signer(SignerArgs(key)))
            .build()
        )

        valid = authenticity_client.verify(record)
        self.assertTrue(valid)

    def test_sign_local_ens(self):
        record_client = RecordClient()

        record = record_client.from_string("Hello world").build()

        authenticity_client = AuthenticityClient()
        key_client = KeyClient()
        key = key_client.new_local_key(KeyType.EcP256k)

        signature = authenticity_client.sign(record, Signer(SignerArgs(key)))
        self.assertNotEqual(signature, "")

    def test_verify_local_ens(self):
        authenticity_client = AuthenticityClient()
        key_client = KeyClient()
        key = key_client.new_local_key(KeyType.EcP256k)

        record_client = RecordClient()
        record = (
            record_client.from_string("Hello world")
            .with_signer(Signer(SignerArgs(key)))
            .build()
        )

        valid = authenticity_client.verify(record)
        self.assertTrue(valid)

    def test_get_signatures(self):
        authenticity_client = AuthenticityClient()
        key_client = KeyClient()
        key = key_client.new_local_key(KeyType.EcP256k)

        record_client = RecordClient()
        record = (
            record_client.from_string("Hello world")
            .with_signer(Signer(SignerArgs(key)))
            .build()
        )

        signatures = authenticity_client.get_signatures(record)
        self.assertEqual(len(signatures), 1)
        self.assertEqual(signatures[0].alg, "ES256K")

    '''def test_get_empty_signature_common_name(self):
        authenticity_client = AuthenticityClient()
        key_client = KeyClient()
        key = key_client.new_local_key(KeyType.EcP256k)

        record_client = RecordClient()
        record = (
            record_client.from_string("Hello world")
            .with_signer(Signer(SignerArgs(key)))
            .build()
        )

        signatures = authenticity_client.get_signatures(record)

        self.assertRaises(
            Exception, authenticity_client.get_signature_common_name, signatures[0]
        )

    def test_get_ecdsa_signature_common_name(self):
        authenticity_client = AuthenticityClient()
        key_client = KeyClient()
        key = key_client.new_local_key(KeyType.EcP256k)

        record_client = RecordClient()
        common_name = "common_name"
        record = (
            record_client.from_string("Hello world")
            .with_signer(Signer(SignerArgs(key, common_name)))
            .build()
        )

        signatures = authenticity_client.get_signatures(record)

        name = authenticity_client.get_signature_common_name(signatures[0])
        self.assertEqual(name, common_name)

    def test_get_ens_signature_common_name(self):
        authenticity_client = AuthenticityClient()
        key_client = KeyClient()
        key = key_client.new_local_key(KeyType.EcP256k)

        record_client = RecordClient()
        record = (
            record_client.from_string("Hello world")
            .with_signer(Signer(SignerArgs(key)))
            .build()
        )

        signatures = authenticity_client.get_signatures(record)
        signatures[
            0
        ].signature = "66e0c03ce895173be8afac992c43f49d0bea3768c8146b83df9acbaee7e67d7106fd2a668cb9c90edd984667caf9fbcd54acc460fb22ba5e2824eb9811101fc601"
        signatures[
            0
        ].message_hash = (
            "7e43ddd9df3a0ca242fcf6d1b190811ef4d50e39e228c27fd746f4d1424b4cc6"
        )

        name = authenticity_client.get_signature_common_name(signatures[0])
        self.assertEqual(name, "vitalik.eth")'''
