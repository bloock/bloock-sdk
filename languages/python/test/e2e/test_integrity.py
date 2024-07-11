import unittest

from bloock import Network
from bloock.client.integrity import IntegrityClient
from bloock.client.record import RecordClient
from test.e2e.util import init_sdk


class TestIntegrity(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        init_sdk()

    def test_integrity_end_to_end(self):
        record_client = RecordClient()
        record = record_client.from_string("Hello world").build()
        records = [record]

        integrity_client = IntegrityClient()
        send_receipts = integrity_client.send_records(records)
        self.assertGreater(len(send_receipts), 0)

        anchor = integrity_client.wait_anchor(send_receipts[0].anchor)
        self.assertEqual(anchor.id, send_receipts[0].anchor)

        proof = integrity_client.get_proof(records)

        root = integrity_client.verify_proof(proof)

        timestamp_validate_root = integrity_client.validate_root(
            root, Network.GNOSIS_CHAIN
        )
        self.assertGreater(timestamp_validate_root, 0)

        timestamp_verify_records = integrity_client.verify_records(
            records, Network.GNOSIS_CHAIN
        )
        self.assertGreater(timestamp_verify_records, 0)

        self.assertEqual(timestamp_verify_records, timestamp_validate_root)
