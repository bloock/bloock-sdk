import unittest

from bloock.client.availability import AvailabilityClient
from bloock.client.record import RecordClient
from bloock.entity.availability.hosted_loader import HostedLoader
from bloock.entity.availability.hosted_publisher import HostedPublisher
from bloock.entity.availability.ipfs_loader import IpfsLoader
from bloock.entity.availability.ipfs_publisher import IpfsPublisher
from test.util import init_sdk


class TestAvailability(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        init_sdk()

    def test_publish_hosted(self):
        payload = "Hello world"
        record_client = RecordClient()

        record = record_client.from_string(payload).build()

        availability_client = AvailabilityClient()
        result = availability_client.publish(record, HostedPublisher())

        self.assertNotEqual(result, "")

    def test_retrieve_hosted(self):
        payload = "Hello world"
        record_client = RecordClient()
        record = record_client.from_string(payload).build()
        hash = record.get_hash()

        availability_client = AvailabilityClient()
        id = availability_client.publish(record, HostedPublisher())

        result = availability_client.retrieve(HostedLoader(id))
        result_hash = result.get_hash()

        self.assertEqual(hash, result_hash)

    def test_publish_ipfs(self):
        payload = "Hello world"
        record_client = RecordClient()

        record = record_client.from_string(payload).build()

        availability_client = AvailabilityClient()
        result = availability_client.publish(record, IpfsPublisher())

        self.assertNotEqual(result, "")

    def test_retrieve_ipfs(self):
        payload = "Hello world"
        record_client = RecordClient()
        record = record_client.from_string(payload).build()
        hash = record.get_hash()

        availability_client = AvailabilityClient()
        id = availability_client.publish(record, IpfsPublisher())

        result = availability_client.retrieve(IpfsLoader(id))
        result_hash = result.get_hash()

        self.assertEqual(hash, result_hash)
