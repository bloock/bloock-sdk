import unittest

from bloock.client.record import RecordClient


class TestCompat(unittest.TestCase):

    def test_generate_ecdsa_keys(self):
        record_client = RecordClient()
        record = record_client.from_string("Hello world").build()
        hash = record.get_hash()

        self.assertEqual(hash, "ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd")
