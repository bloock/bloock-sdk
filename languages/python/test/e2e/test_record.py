import unittest

from bloock.client.availability import AvailabilityClient
from bloock.client.encryption import EncryptionClient
from bloock.client.integrity import IntegrityClient
from bloock.client.key import KeyClient
from bloock.client.record import RecordClient
from bloock.entity.authenticity.signer import Signer
from bloock.entity.availability.hosted_loader import HostedLoader
from bloock.entity.availability.hosted_publisher import HostedPublisher
from bloock.entity.availability.ipfs_loader import IpfsLoader
from bloock.entity.availability.ipfs_publisher import IpfsPublisher
from bloock.entity.encryption.encryption_alg import EncryptionAlg
from bloock.entity.integrity.anchor import AnchorNetwork
from bloock.entity.integrity.proof import Proof, ProofAnchor
from bloock.entity.key.key_type import KeyType
from bloock.entity.encryption.encrypter import Encrypter
from bloock.entity.key.local_certificate_params import LocalCertificateParams
from bloock.entity.key.subject_certificate_params import SubjectCertificateParams
from test.e2e.util import init_sdk


class TestRecord(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        init_sdk()

    def test_from_string(self):
        record_client = RecordClient()
        record = record_client.from_string("Hello world").build()
        hash = record.get_hash()
        self.assertEqual(
            hash, "ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd"
        )

    def test_from_bytes(self):
        record_client = RecordClient()
        record = record_client.from_bytes(bytes([1, 2, 3, 4, 5])).build()
        hash = record.get_hash()
        self.assertEqual(
            hash, "7d87c5ea75f7378bb701e404c50639161af3eff66293e9f375b5f17eb50476f4"
        )

    def test_from_hex(self):
        record_client = RecordClient()
        record = record_client.from_hex("1234567890abcdef").build()
        hash = record.get_hash()
        self.assertEqual(
            hash, "ed8ab4fde4c4e2749641d9d89de3d920f9845e086abd71e6921319f41f0e784f"
        )

    def test_from_json(self):
        record_client = RecordClient()
        record = record_client.from_json('{"hello":"world"}').build()
        hash = record.get_hash()
        self.assertEqual(
            hash, "586e9b1e1681ba3ebad5ff5e6f673d3e3aa129fcdb76f92083dbc386cdde4312"
        )

    def test_from_file(self):
        record_client = RecordClient()
        record = record_client.from_file(bytes([2, 3, 4, 5, 6])).build()
        hash = record.get_hash()
        self.assertEqual(
            hash, "507aa5dd7b2e52180b764db13c8289ed204109cafe2ef4e453366da8654dc446"
        )

    '''def test_ecdsa_signature(self):
        authenticity_client = AuthenticityClient()
        key_client = KeyClient()
        key = key_client.new_local_key(KeyType.EcP256k)
        name = "some name"

        record_client = RecordClient()
        record = (
            record_client.from_string("Hello world 3")
            .with_signer(Signer(SignerArgs(key, name)))
            .build()
        )

        record_with_multiple_signatures = (
            record_client.from_record(record)
            .with_signer(Signer(SignerArgs(key)))
            .build()
        )

        signatures = authenticity_client.get_signatures(record_with_multiple_signatures)
        self.assertEqual(len(signatures), 2)

        self.assertEqual(
            name, authenticity_client.get_signature_common_name(signatures[0])
        )
        self.assertEqual(SignatureAlg.ECDSA, signatures[0].get_alg())

    def test_ens_signature(self):
        authenticity_client = AuthenticityClient()
        key_client = KeyClient()
        key = key_client.new_local_key(KeyType.EcP256k)

        record_client = RecordClient()
        record = (
            record_client.from_string("Hello world 4")
            .with_signer(Signer(SignerArgs(key)))
            .build()
        )

        signatures = authenticity_client.get_signatures(record)
        self.assertEqual(len(signatures), 1)

        signatures[
            0
        ].signature = "66e0c03ce895173be8afac992c43f49d0bea3768c8146b83df9acbaee7e67d7106fd2a668cb9c90edd984667caf9fbcd54acc460fb22ba5e2824eb9811101fc601"
        signatures[
            0
        ].message_hash = (
            "7e43ddd9df3a0ca242fcf6d1b190811ef4d50e39e228c27fd746f4d1424b4cc6"
        )

        self.assertEqual(
            "vitalik.eth", authenticity_client.get_signature_common_name(signatures[0])
        )
        self.assertEqual(SignatureAlg.ENS, signatures[0].get_alg())'''

    def test_from_hosted_loader(self):
        record_client = RecordClient()
        payload = "Hello world"
        record = record_client.from_string(payload).build()

        availability_client = AvailabilityClient()
        result = availability_client.publish(record, HostedPublisher())

        record_client = RecordClient()
        record = record_client.from_loader(HostedLoader(hash=result)).build()
        self.assertEqual(bytes(payload, "utf-8"), record.retrieve())

    def test_from_ipfs_loader(self):
        record_client = RecordClient()
        payload = "Hello world"
        record = record_client.from_string(payload).build()

        availability_client = AvailabilityClient()
        result = availability_client.publish(record, IpfsPublisher())

        record_client = RecordClient()
        record = record_client.from_loader(IpfsLoader(hash=result)).build()
        self.assertEqual(bytes(payload, "utf-8"), record.retrieve())

    def test_aes_encryption(self):
        payload = "Hello world 2"
        key_client = KeyClient()
        key = key_client.new_local_key(KeyType.Aes256)
        record_client = RecordClient()
        encrypted_record = (
            record_client.from_string(payload)
            .with_encrypter(Encrypter(key))
            .build()
        )

        self.assertNotEqual(payload.encode(), encrypted_record.payload)

        encryption_client = EncryptionClient()
        self.assertEqual(
            encryption_client.get_encryption_alg(encrypted_record),
            EncryptionAlg.AES256GCM,
        )

        invalid_key = key_client.new_local_key(KeyType.Aes256)

        with self.assertRaises(Exception) as _:
            record_client.from_record(encrypted_record).with_decrypter(
                Encrypter(invalid_key)
            ).build()

        decrypted_record = (
            record_client.from_record(encrypted_record)
            .with_decrypter(Encrypter(key))
            .build()
        )

        self.assertEqual(payload, decrypted_record.payload.decode())

        hash = decrypted_record.get_hash()
        self.assertEqual(
            "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6", hash
        )

    def test_rsa_encryption(self):
        payload = "Hello world 2"
        encryption_client = EncryptionClient()
        key_client = KeyClient()
        key = key_client.new_local_key(KeyType.Rsa2048)

        record_client = RecordClient()
        encrypted_record = (
            record_client.from_string(payload)
            .with_encrypter(Encrypter(key))
            .build()
        )

        self.assertNotEqual(payload.encode(), encrypted_record.payload)

        self.assertEqual(
            encryption_client.get_encryption_alg(encrypted_record), EncryptionAlg.RSA
        )

        record = (
            record_client.from_record(encrypted_record)
            .with_decrypter(Encrypter(key))
            .build()
        )

        self.assertEqual(payload, record.payload.decode())

        hash = record.get_hash()
        self.assertEqual(
            "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6", hash
        )

    def test_record_details_signed(self):
        payload = "Hello world 2"
        key_client = KeyClient()
        local_cert = key_client.new_local_certificate(LocalCertificateParams(KeyType.Rsa2048, SubjectCertificateParams("Bloock"), "password"))

        record_client = RecordClient()
        record = (
            record_client.from_string(payload)
            .with_signer(Signer(local_cert))
            .build()
        )

        record_payload = record.retrieve()

        details = record_client.from_file(record_payload).get_details()

        self.assertIsNotNone(details.integrity.hash)
        self.assertIsNone(details.integrity.proof)

        self.assertIsNotNone(details.authenticity.signatures)

        self.assertIsNone(details.encryption)

        self.assertIsNone(details.availability.type)
        self.assertEqual(details.availability.size, len(record_payload))

    def test_record_details_encrypted(self):
        payload = "Hello world 2"
        key_client = KeyClient()
        key = key_client.new_local_key(KeyType.Rsa2048)

        record_client = RecordClient()
        record = (
            record_client.from_string(payload)
            .with_encrypter(Encrypter(key))
            .build()
        )

        record_payload = record.retrieve()

        details = record_client.from_file(record_payload).get_details()

        self.assertIsNone(details.integrity)

        self.assertIsNone(details.authenticity)

        self.assertEqual(details.encryption.alg, "RSA")
        self.assertIsNotNone(details.encryption.key)
        self.assertIsNotNone(details.encryption.subject)

        self.assertIsNone(details.availability.type)
        self.assertEqual(details.availability.size, len(record_payload))

    def test_set_proof(self):
        record_client = RecordClient()
        record = record_client.from_string("Hello world").build()

        original_proof = Proof(
            leaves=["ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd"],
            nodes=["ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd"],
            depth="1010101",
            bitmap="0101010",
            anchor=ProofAnchor(
                anchor_id=42,
                networks=[
                    AnchorNetwork(
                        name="Ethereum",
                        state="state",
                        tx_hash="ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd",
                        root=""
                    )
                ],
                root="ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd",
                status="success",
            ),
        )

        record.set_proof(original_proof)

        integrity_client = IntegrityClient()
        final_proof = integrity_client.get_proof([record])

        self.assertEqual(original_proof.leaves, final_proof.leaves)
        self.assertEqual(original_proof.nodes, final_proof.nodes)
        self.assertEqual(original_proof.depth, final_proof.depth)
        self.assertEqual(original_proof.bitmap, final_proof.bitmap)

        self.assertEqual(original_proof.anchor.anchor_id, final_proof.anchor.anchor_id)
        self.assertEqual(original_proof.anchor.root, final_proof.anchor.root)
        self.assertEqual(original_proof.anchor.status, final_proof.anchor.status)
        self.assertEqual(original_proof.anchor.anchor_id, final_proof.anchor.anchor_id)
        self.assertEqual(
            [network.__dict__ for network in original_proof.anchor.networks],
            [network.__dict__ for network in final_proof.anchor.networks],
        )
