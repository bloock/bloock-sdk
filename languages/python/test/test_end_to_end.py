import os
import unittest

from bloock.client.builder import RecordBuilder
from bloock.client.client import Client
from bloock.client.entity.anchor import AnchorNetwork
from bloock.client.entity.encryption_alg import EncryptionAlg
from bloock.client.entity.proof import Proof, ProofAnchor
from bloock.client.entity.decrypter import AesDecrypter, EciesDecrypter, RsaDecrypter
from bloock.client.entity.encrypter import AesEncrypter, EciesEncrypter, RsaEncrypter
from bloock.client.entity.record import Record
from bloock.client.entity.signer import EcdsaSigner
from bloock.client.entity.network import Network
from bloock.client.entity.publisher import HostedPublisher, IpfsPublisher
from bloock.client.entity.loader import HostedLoader, IpfsLoader
from test.util import get_sdk


class TestE2E(unittest.TestCase):
    def setUp(self):
        self.client = get_sdk()

    def test_e2e_with_all_builders(self):
        records = [
            self._testFromString(),
            self._testFromBytes(),
            self._testFromHex(),
            self._testFromJson(),
            self._testFromFile(),
            self._testEcdsaSignature(),
        ]

        self._testFromHostedLoader()
        self._testFromIpfsLoader()

        self._testAesEncryption()
        self._testAesEncryptionHosted()
        self._testAesEncryptionIpfs()

        self._testRsaEncryption()
        self._testRsaEncryptionHosted()
        self._testRsaEncryptionIpfs()

        self._testEciesEncryption()
        self._testEciesEncryptionHosted()
        self._testEciesEncryptionIpfs()

        self._testSetProof()

        send_receipts = self.client.send_records(records)
        self.assertGreater(len(send_receipts), 0)

        anchor = self.client.wait_anchor(send_receipts[0].anchor)
        self.assertEqual(anchor.id, send_receipts[0].anchor)

        proof = self.client.get_proof(records)

        root = self.client.verify_proof(proof)

        timestamp_validate_root = self.client.validate_root(root, Network.BLOOCK_CHAIN)
        self.assertGreater(timestamp_validate_root, 0)

        timestamp_verify_records = self.client.verify_records(
            records, Network.BLOOCK_CHAIN
        )
        self.assertGreater(timestamp_verify_records, 0)

        self.assertEqual(timestamp_verify_records, timestamp_validate_root)

    def _testFromString(self) -> Record:
        record = RecordBuilder.from_string("Hello world").build()
        hash = record.get_hash()
        self.assertEqual(
            hash, "ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd"
        )
        return record

    def _testFromBytes(self) -> Record:
        record = RecordBuilder.from_bytes(bytes([1, 2, 3, 4, 5])).build()
        hash = record.get_hash()
        self.assertEqual(
            hash, "7d87c5ea75f7378bb701e404c50639161af3eff66293e9f375b5f17eb50476f4"
        )
        return record

    def _testFromHex(self) -> Record:
        record = RecordBuilder.from_hex("1234567890abcdef").build()
        hash = record.get_hash()
        self.assertEqual(
            hash, "ed8ab4fde4c4e2749641d9d89de3d920f9845e086abd71e6921319f41f0e784f"
        )
        return record

    def _testFromJson(self) -> Record:
        record = RecordBuilder.from_json('{"hello":"world"}').build()
        hash = record.get_hash()
        self.assertEqual(
            hash, "586e9b1e1681ba3ebad5ff5e6f673d3e3aa129fcdb76f92083dbc386cdde4312"
        )
        return record

    def _testFromFile(self) -> Record:
        record = RecordBuilder.from_file(bytes([2, 3, 4, 5, 6])).build()
        hash = record.get_hash()
        self.assertEqual(
            hash, "507aa5dd7b2e52180b764db13c8289ed204109cafe2ef4e453366da8654dc446"
        )
        return record

    def _testEcdsaSignature(self) -> Record:
        keys = self.client.generate_keys()
        name = "some name"

        record = (
            RecordBuilder.from_string("Hello world 3")
            .with_signer(EcdsaSigner(keys.private_key, common_name=name))
            .build()
        )

        keys = self.client.generate_keys()

        record_with_multiple_signatures = (
            RecordBuilder.from_record(record)
            .with_signer(EcdsaSigner(keys.private_key))
            .build()
        )

        signatures = record_with_multiple_signatures.get_signatures()
        self.assertEqual(len(signatures), 2)

        self.assertEqual(name, signatures[0].get_common_name())

        return record_with_multiple_signatures

    def _testFromHostedLoader(self) -> Record:
        record = RecordBuilder.from_string("Hello world").build()
        hash = record.get_hash()

        result = record.publish(HostedPublisher())
        self.assertEqual(hash, result)

        record = RecordBuilder.from_loader(HostedLoader(hash=result)).build()
        hash = record.get_hash()
        self.assertEqual(hash, result)

        return record

    def _testFromIpfsLoader(self) -> Record:
        record = RecordBuilder.from_string("Hello world").build()
        hash = record.get_hash()

        result = record.publish(IpfsPublisher())
        self.assertEqual(hash, result)

        record = RecordBuilder.from_loader(IpfsLoader(hash=result)).build()
        hash = record.get_hash()
        print(hash)
        self.assertEqual(hash, result)

        return record

    def _testAesEncryption(self):
        payload = "Hello world 2"
        password = "some_password"
        encrypted_record = (
            RecordBuilder.from_string(payload)
            .with_encrypter(AesEncrypter(password))
            .build()
        )

        self.assertNotEqual(payload.encode(), encrypted_record.payload)

        self.assertEqual(encrypted_record.get_encryption_alg(), EncryptionAlg.AES256GCM)

        with self.assertRaises(Exception) as _:
            RecordBuilder.from_record(encrypted_record).with_decrypter(
                AesDecrypter("incorrect_password")
            ).build()

        decrypted_record = (
            RecordBuilder.from_record(encrypted_record)
            .with_decrypter(AesDecrypter(password))
            .build()
        )

        self.assertEqual(payload, decrypted_record.payload.decode())

        hash = decrypted_record.get_hash()
        self.assertEqual(
            "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6", hash
        )

    def _testAesEncryptionHosted(self):
        payload = "Hello world 2"
        password = "some_password"
        encrypted_record = (
            RecordBuilder.from_string(payload)
            .with_encrypter(AesEncrypter(password))
            .build()
        )

        self.assertNotEqual(payload.encode(), encrypted_record.payload)

        result = encrypted_record.publish(HostedPublisher())

        loaded_record = RecordBuilder.from_loader(HostedLoader(hash=result)).build()

        decrypted_record = (
            RecordBuilder.from_record(loaded_record)
            .with_decrypter(AesDecrypter(password))
            .build()
        )

        self.assertEqual(payload, decrypted_record.payload.decode())

        hash = decrypted_record.get_hash()
        self.assertEqual(
            "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6", hash
        )

    def _testAesEncryptionIpfs(self):
        payload = "Hello world 2"
        password = "some_password"
        encrypted_record = (
            RecordBuilder.from_string(payload)
            .with_encrypter(AesEncrypter(password))
            .build()
        )

        self.assertNotEqual(payload.encode(), encrypted_record.payload)

        result = encrypted_record.publish(IpfsPublisher())

        loaded_record = RecordBuilder.from_loader(IpfsLoader(hash=result)).build()

        decrypted_record = (
            RecordBuilder.from_record(loaded_record)
            .with_decrypter(AesDecrypter(password))
            .build()
        )

        self.assertEqual(payload, decrypted_record.payload.decode())

        hash = decrypted_record.get_hash()
        self.assertEqual(
            "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6", hash
        )

    def _testRsaEncryption(self):
        payload = "Hello world 2"
        keys = self.client.generate_rsa_keypair()

        encrypted_record = (
            RecordBuilder.from_string(payload)
            .with_encrypter(RsaEncrypter(keys.public_key))
            .build()
        )

        self.assertNotEqual(payload.encode(), encrypted_record.payload)

        self.assertEqual(encrypted_record.get_encryption_alg(), EncryptionAlg.RSA)

        record = (
            RecordBuilder.from_record(encrypted_record)
            .with_decrypter(RsaDecrypter(keys.private_key))
            .build()
        )

        self.assertEqual(payload, record.payload.decode())

        hash = record.get_hash()
        self.assertEqual(
            "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6", hash
        )

    def _testRsaEncryptionHosted(self):
        payload = "Hello world 2"
        keys = self.client.generate_rsa_keypair()

        encrypted_record = (
            RecordBuilder.from_string(payload)
            .with_encrypter(RsaEncrypter(keys.public_key))
            .build()
        )

        self.assertNotEqual(payload.encode(), encrypted_record.payload)

        result = encrypted_record.publish(HostedPublisher())

        loaded_record = RecordBuilder.from_loader(HostedLoader(hash=result)).build()

        record = (
            RecordBuilder.from_record(loaded_record)
            .with_decrypter(RsaDecrypter(keys.private_key))
            .build()
        )

        self.assertEqual(payload, record.payload.decode())

        hash = record.get_hash()
        self.assertEqual(
            "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6", hash
        )

    def _testRsaEncryptionIpfs(self):
        payload = "Hello world 2"
        keys = self.client.generate_rsa_keypair()

        encrypted_record = (
            RecordBuilder.from_string(payload)
            .with_encrypter(RsaEncrypter(keys.public_key))
            .build()
        )

        self.assertNotEqual(payload.encode(), encrypted_record.payload)

        result = encrypted_record.publish(IpfsPublisher())

        loaded_record = RecordBuilder.from_loader(IpfsLoader(hash=result)).build()

        record = (
            RecordBuilder.from_record(loaded_record)
            .with_decrypter(RsaDecrypter(keys.private_key))
            .build()
        )

        self.assertEqual(payload, record.payload.decode())

        hash = record.get_hash()
        self.assertEqual(
            "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6", hash
        )

    def _testEciesEncryption(self):
        payload = "Hello world 2"
        keys = self.client.generate_ecies_keypair()

        encrypted_record = (
            RecordBuilder.from_string(payload)
            .with_encrypter(EciesEncrypter(keys.public_key))
            .build()
        )

        self.assertNotEqual(payload.encode(), encrypted_record.payload)

        self.assertEqual(encrypted_record.get_encryption_alg(), EncryptionAlg.ECIES)

        record = (
            RecordBuilder.from_record(encrypted_record)
            .with_decrypter(EciesDecrypter(keys.private_key))
            .build()
        )

        self.assertEqual(payload, record.payload.decode())

        hash = record.get_hash()
        self.assertEqual(
            "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6", hash
        )

    def _testEciesEncryptionHosted(self):
        payload = "Hello world 2"
        keys = self.client.generate_ecies_keypair()

        encrypted_record = (
            RecordBuilder.from_string(payload)
            .with_encrypter(EciesEncrypter(keys.public_key))
            .build()
        )

        self.assertNotEqual(payload.encode(), encrypted_record.payload)

        result = encrypted_record.publish(HostedPublisher())

        loaded_record = RecordBuilder.from_loader(HostedLoader(hash=result)).build()

        record = (
            RecordBuilder.from_record(loaded_record)
            .with_decrypter(EciesDecrypter(keys.private_key))
            .build()
        )

        self.assertEqual(payload, record.payload.decode())

        hash = record.get_hash()
        self.assertEqual(
            "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6", hash
        )

    def _testEciesEncryptionIpfs(self):
        payload = "Hello world 2"
        keys = self.client.generate_ecies_keypair()

        encrypted_record = (
            RecordBuilder.from_string(payload)
            .with_encrypter(EciesEncrypter(keys.public_key))
            .build()
        )

        self.assertNotEqual(payload.encode(), encrypted_record.payload)

        result = encrypted_record.publish(IpfsPublisher())

        loaded_record = RecordBuilder.from_loader(IpfsLoader(hash=result)).build()

        record = (
            RecordBuilder.from_record(loaded_record)
            .with_decrypter(EciesDecrypter(keys.private_key))
            .build()
        )

        self.assertEqual(payload, record.payload.decode())

        hash = record.get_hash()
        self.assertEqual(
            "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6", hash
        )

    def _testSetProof(self):
        record = RecordBuilder.from_string("Hello world").build()

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
                    )
                ],
                root="ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd",
                status="success",
            ),
        )

        record.set_proof(original_proof)

        final_proof = self.client.get_proof([record])

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


if __name__ == "__main__":
    unittest.main()
