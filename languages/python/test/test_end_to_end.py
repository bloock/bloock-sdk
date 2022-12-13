import os
import unittest
import bloock

from bloock.client.builder import RecordBuilder
from bloock.client.client import Client
from bloock.client.entity.decrypter import AesDecrypter, EciesDecrypter, RsaDecrypter
from bloock.client.entity.encrypter import AesEncrypter, EciesEncrypter, RsaEncrypter
from bloock.client.entity.signer import EcsdaSigner
from bloock.client.entity.network import Network
from bloock.client.entity.publisher import HostedPublisher
from bloock.client.entity.loader import HostedLoader


class TestE2E(unittest.TestCase):
    def setUp(self):
        bloock.api_key = os.environ["API_KEY"]
        api_host = os.environ.get("API_HOST")
        if api_host != None:
            bloock.api_host = api_host
        bloock.disable_analytics = True
        self.client = Client()

    def test_e2e_with_all_builders(self):
        records = [
            self._testFromString(),
            self._testFromBytes(),
            self._testFromHex(),
            self._testFromJson(),
            self._testFromFile(),
            self._testEcsdaSignature(),
        ]

        self._testFromLoader()

        self._testAesEncryption()
        self._testAesEncryptionDataAvailability()

        self._testRsaEncryption()
        self._testRsaEncryptionDataAvailability()

        self._testEciesEncryption()
        self._testEciesEncryptionDataAvailability()

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

    def _testFromString(self) -> str:
        record = RecordBuilder.from_string("Hello world").build()
        hash = record.get_hash()
        self.assertEqual(
            hash, "ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd"
        )
        return hash

    def _testFromBytes(self) -> str:
        record = RecordBuilder.from_bytes(bytes([1, 2, 3, 4, 5])).build()
        hash = record.get_hash()
        self.assertEqual(
            hash, "7d87c5ea75f7378bb701e404c50639161af3eff66293e9f375b5f17eb50476f4"
        )
        return hash

    def _testFromHex(self) -> str:
        record = RecordBuilder.from_hex("1234567890abcdef").build()
        hash = record.get_hash()
        self.assertEqual(
            hash, "ed8ab4fde4c4e2749641d9d89de3d920f9845e086abd71e6921319f41f0e784f"
        )
        return hash

    def _testFromJson(self) -> str:
        record = RecordBuilder.from_json('{"hello":"world"}').build()
        hash = record.get_hash()
        self.assertEqual(
            hash, "586e9b1e1681ba3ebad5ff5e6f673d3e3aa129fcdb76f92083dbc386cdde4312"
        )
        return hash

    def _testFromFile(self) -> str:
        record = RecordBuilder.from_file(bytes([2, 3, 4, 5, 6])).build()
        hash = record.get_hash()
        self.assertEqual(
            hash, "507aa5dd7b2e52180b764db13c8289ed204109cafe2ef4e453366da8654dc446"
        )
        return hash

    def _testEcsdaSignature(self) -> str:
        keys = self.client.generate_keys()

        record = (
            RecordBuilder.from_string("Hello world 3")
            .with_signer(EcsdaSigner(keys.private_key))
            .build()
        )

        keys = self.client.generate_keys()

        record_with_multiple_signatures = (
            RecordBuilder.from_record(record)
            .with_signer(EcsdaSigner(keys.private_key))
            .build()
        )

        hash = record_with_multiple_signatures.get_hash()
        self.assertEqual(
            hash, "79addac952bf2c80b87161407ac455cf389b17b98e8f3e75ed9638ab06481f4f"
        )

        signatures = record_with_multiple_signatures.get_signatures()
        self.assertEqual(len(signatures), 2)

        return hash

    def _testFromLoader(self) -> str:
        record = RecordBuilder.from_string("Hello world").build()
        hash = record.get_hash()

        result = record.publish(HostedPublisher())
        self.assertEqual(hash, result)

        record = RecordBuilder.from_loader(HostedLoader(hash=result)).build()
        hash = record.get_hash()
        self.assertEqual(hash, result)

        return hash

    def _testAesEncryption(self):
        payload = "Hello world 2"
        password = "some_password"
        encrypted_record = (
            RecordBuilder.from_string(payload)
            .with_encrypter(AesEncrypter(password))
            .build()
        )

        self.assertNotEqual(payload.encode(), encrypted_record.payload)

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

    def _testAesEncryptionDataAvailability(self):
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

    def _testRsaEncryption(self):
        payload = "Hello world 2"
        keys = self.client.generate_rsa_keypair()

        encrypted_record = (
            RecordBuilder.from_string(payload)
            .with_encrypter(RsaEncrypter(keys.public_key))
            .build()
        )

        self.assertNotEqual(payload.encode(), encrypted_record.payload)

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

    def _testRsaEncryptionDataAvailability(self):
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

    def _testEciesEncryption(self):
        payload = "Hello world 2"
        keys = self.client.generate_ecies_keypair()

        encrypted_record = (
            RecordBuilder.from_string(payload)
            .with_encrypter(EciesEncrypter(keys.public_key))
            .build()
        )

        self.assertNotEqual(payload.encode(), encrypted_record.payload)

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

    def _testEciesEncryptionDataAvailability(self):
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


if __name__ == "__main__":
    unittest.main()
