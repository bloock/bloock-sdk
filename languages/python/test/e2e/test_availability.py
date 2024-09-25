import unittest

from bloock.client.availability import AvailabilityClient
from bloock.entity.availability.hosted_loader import HostedLoader
from bloock.entity.availability.hosted_publisher import HostedPublisher
from bloock.entity.availability.ipfs_loader import IpfsLoader
from bloock.entity.availability.ipfs_publisher import IpfsPublisher
from bloock.entity.availability.ipns_publisher import IpnsPublisher
from bloock.entity.availability.ipns_loader import IpnsLoader
from bloock.client.record import RecordClient
from test.e2e.util import init_dev_sdk


class TestAvailability(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        init_dev_sdk()

    def test_publish_hosted(self):
        payload = "Hello world"
        record_client = RecordClient()

        record = record_client.from_string(payload).build()

        availability_client = AvailabilityClient()
        result = availability_client.publish(record, HostedPublisher())

        self.assertNotEqual(result.id, "")

    def test_retrieve_hosted(self):
        payload = "Hello world"
        record_client = RecordClient()
        record = record_client.from_string(payload).build()
        hash = record.get_hash()

        availability_client = AvailabilityClient()
        response = availability_client.publish(record, HostedPublisher())

        result = availability_client.retrieve(HostedLoader(response.id))
        result_hash = result.get_hash()

        self.assertEqual(hash, result_hash)

    def test_publish_ipfs(self):
        payload = "Hello world"
        record_client = RecordClient()

        record = record_client.from_string(payload).build()

        availability_client = AvailabilityClient()
        result = availability_client.publish(record, IpfsPublisher())

        self.assertNotEqual(result.id, "")

    def test_retrieve_ipfs(self):
        payload = "Hello world"
        record_client = RecordClient()
        record = record_client.from_string(payload).build()
        hash = record.get_hash()

        availability_client = AvailabilityClient()
        response = availability_client.publish(record, IpfsPublisher())

        result = availability_client.retrieve(IpfsLoader(response.id))
        result_hash = result.get_hash()

        self.assertEqual(hash, result_hash)

    def test_publish_ipns(self):
        payload = "Hello world"
        record_client = RecordClient()

        record = record_client.from_string(payload).build()

        availability_client = AvailabilityClient()
        result = availability_client.publish(record, IpnsPublisher())
        self.assertNotEqual(result.id, "")
        self.assertNotEqual(result.ipns_key.key_id, "")

        retrieve = availability_client.retrieve(IpnsLoader())

        self.assertEqual(record.get_hash(), retrieve.get_hash())

        recordUpdated = record_client.from_string("Bye Bye").build()
        resultUpdated = availability_client.publish(recordUpdated, IpnsPublisher(result.ipns_key))

        self.assertNotEqual(resultUpdated.id, "")
        self.assertNotEqual(resultUpdated.ipns_key.key_id, "")

