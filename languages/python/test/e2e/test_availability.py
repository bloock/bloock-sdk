import unittest

from bloock.client.availability import AvailabilityClient
from bloock.entity.availability.hosted_loader import HostedLoader
from bloock.entity.availability.hosted_publisher import HostedPublisher
from bloock.entity.availability.ipfs_loader import IpfsLoader
from bloock.entity.availability.ipfs_publisher import IpfsPublisher
from bloock.entity.availability.ipns_publisher import IpnsPublisher
from bloock.client.key import KeyClient
from bloock.client.record import RecordClient
from bloock.entity.key.key_protection_level import KeyProtectionLevel
from bloock.entity.key.key_type import KeyType
from bloock.entity.key.managed_key_params import ManagedKeyParams
from test.e2e.util import init_sdk


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

    def test_publish_ipns(self):
        key_client = KeyClient()
        protection = KeyProtectionLevel.SOFTWARE
        key_type = KeyType.Rsa2048
        key_name = "ipns_key_name_test_sdk"
        params = ManagedKeyParams(protection, key_type, key_name)
        managed_key = key_client.new_managed_key(params)

        payload = "Hello world"
        record_client = RecordClient()

        record = record_client.from_string(payload).build()

        availability_client = AvailabilityClient()
        result = availability_client.publish(record, IpnsPublisher(managed_key))
        self.assertNotEqual(result, "")
