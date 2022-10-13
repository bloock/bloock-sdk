import os
import unittest
from bloock._bridge.proto.config_pb2 import Network
from bloock.client.builder import RecordBuilder
from bloock.client.client import Client
from bloock.client.entity.signer import EcsdaSigner


class TestE2E(unittest.TestCase):
    def setUp(self):
        self.client = Client(api_key=os.environ["API_KEY"])

    def test_e2e_with_all_builders(self):
        records = []
        record = RecordBuilder.from_string("Hello world").build()
        hash = record.get_hash()
        self.assertEqual(
            hash, "ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd"
        )
        records.append(hash)

        record = RecordBuilder.from_bytes(bytes([1, 2, 3, 4, 5])).build()
        hash = record.get_hash()
        self.assertEqual(
            hash, "7d87c5ea75f7378bb701e404c50639161af3eff66293e9f375b5f17eb50476f4"
        )
        records.append(hash)

        record = RecordBuilder.from_hex("1234567890abcdef").build()
        hash = record.get_hash()
        self.assertEqual(
            hash, "ed8ab4fde4c4e2749641d9d89de3d920f9845e086abd71e6921319f41f0e784f"
        )
        records.append(hash)

        record = RecordBuilder.from_json('{"hello":"world"}').build()
        hash = record.get_hash()
        self.assertEqual(
            hash, "586e9b1e1681ba3ebad5ff5e6f673d3e3aa129fcdb76f92083dbc386cdde4312"
        )
        records.append(hash)

        record = RecordBuilder.from_string("Hello world 2").build()
        record = RecordBuilder.from_record(record).build()
        hash = record.get_hash()
        self.assertEqual(
            hash, "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6"
        )
        records.append(hash)

        record = RecordBuilder.from_file(bytes([2, 3, 4, 5, 6])).build()
        hash = record.get_hash()
        self.assertEqual(
            hash, "507aa5dd7b2e52180b764db13c8289ed204109cafe2ef4e453366da8654dc446"
        )
        records.append(hash)

        record = RecordBuilder.from_raw("eyJ0eSI6InN0cmluZyJ9.U29tZSBzdHJpbmc.W3siaGVhZGVyIjp7ImFsZyI6IkVDU0RBIiwia2lkIjoiMTIzNDU2Nzg5MGFiY2RlZiJ9LCJwcm90ZWN0ZWQiOiJlMCIsInNpZ25hdHVyZSI6IjEyMzQ1Njc4OTBhYmNkZWYxMjM0NTY3ODkwYWJjZGVmIn1d.eyJoZWFkZXIiOnsiYWxnIjoiRUNTREEifSwicHJvdGVjdGVkIjoiZTAifQ.eyJhbmNob3IiOnsiYW5jaG9yX2lkIjoxLCJuZXR3b3JrcyI6W10sInJvb3QiOiIiLCJzdGF0dXMiOiJwZW5kaW5nIn0sImJpdG1hcCI6IjZkODAiLCJkZXB0aCI6IjAwMDUwMDA1MDAwNDAwMDQwMDA0MDAwNDAwMDQwMDAzMDAwMSIsImxlYXZlcyI6WyIxY2EwZTlkOWEyMDZmMDhkMzhhNGUyY2Y0ODUzNTE2NzRmZmM5YjBmMzE3NWUwY2I2ZGJkOGUwZTE5ODI5Yjk3Il0sIm5vZGVzIjpbIjFjYTBlOWQ5YTIwNmYwOGQzOGE0ZTJjZjQ4NTM1MTY3NGZmYzliMGYzMTc1ZTBjYjZkYmQ4ZTBlMTk4MjliOTciXX0")\
                .build()
        hash = record.get_hash()
        self.assertEqual(
            hash, "fc7eed1db0c14d70f875460a53c315d0df86a087ba9e921e9fe2923577c327f9"
        )
        records.append(hash)

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

        self.assertEqual(len(record_with_multiple_signatures.signatures), 2)

        hash = record_with_multiple_signatures.get_hash()
        self.assertEqual(
            hash, "79addac952bf2c80b87161407ac455cf389b17b98e8f3e75ed9638ab06481f4f"
        )
        records.append(hash)

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


if __name__ == "__main__":
    unittest.main()
