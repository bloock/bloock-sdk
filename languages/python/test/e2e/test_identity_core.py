import datetime
import unittest
from bloock.entity.identity.blockchain import Blockchain
from bloock.entity.identity.did_type import DidType
from bloock.entity.identity.method import Method
from bloock.entity.identity.network import Network
from bloock.client.identity import IdentityClient
from bloock.client.identity_core import IdentityCoreClient
from bloock.client.key import KeyClient
from bloock.entity.identity.publish_interval_params import PublishIntervalParams
from bloock.entity.key.key_protection_level import KeyProtectionLevel
from bloock.entity.key.key_type import KeyType
from bloock.entity.key.key import Key
from bloock.entity.key.managed_key_params import ManagedKeyParams
from test.e2e.util import init_dev_sdk


class TestIdentityCore(unittest.TestCase):
    drivingLicenseSchemaType = "DrivingLicense"
    holderDid = "did:polygonid:polygon:mumbai:2qGg7TzmcoU4Jg3E86wXp4WJcyGUTuafPZxVRxpYQr"
    expiration = 4089852142

    @classmethod
    def setUpClass(cls):
        init_dev_sdk()

    def test_end_to_end(self):
        identity_client = IdentityClient()
        key_client = KeyClient()
        identity_core_client = IdentityCoreClient()

        protection = KeyProtectionLevel.SOFTWARE
        key_type = KeyType.Bjj
        params = ManagedKeyParams(protection, key_type)
        managed_key = key_client.new_managed_key(params)

        issuer_key = Key(managed_key)

        did_type = DidType(Method.POLYGON_ID,
                         Blockchain.POLYGON, Network.MUMBAI)
        issuer = identity_client.create_issuer(
            issuer_key, PublishIntervalParams.Interval15, did_type, "SDK Issuer Test Core Client", "sdk issuer test core client")

        with self.assertRaises(Exception):
            identity_client.create_issuer(
                issuer_key, PublishIntervalParams.Interval15, did_type)

        schema = identity_client.build_schema("Driving License", self.drivingLicenseSchemaType, "1.0", "driving license schema") \
            .add_integer_attribute("License Type", "license_type", "license type", False) \
            .add_decimal_attribute("Quantity Oil", "quantity_oil", "quantity oil", True) \
            .add_string_attribute("Nif", "nif", "nif", True) \
            .add_boolean_attribute("Is Spanish", "is_spanish", "is spanish", True) \
            .add_date_attribute("Birth Date", "birth_date", "birth date", True) \
            .add_datetime_attribute("Local Hour", "local_hour", "local hour", True) \
            .add_string_enum_attribute("Car Type", "car_type", "car type", True, ["big", "medium", "small"]) \
            .add_integer_enum_attribute("Car Points", "car_points", "car points", True, [1, 5, 10]) \
            .add_decimal_enum_attribute("Precision Wheels", "precision_wheels", "precision wheels", True, [1.10, 1.20, 1.30]) \
            .build()
        self.assertIsNotNone(schema.cid)

        get_schema = identity_client.get_schema(schema.cid)
        self.assertIsNotNone(get_schema.cid_json_ld)
        self.assertIsNotNone(get_schema.json)
        self.assertIsNotNone(get_schema.schema_type)

        receipt = identity_core_client.build_credential(issuer, schema.cid, self.holderDid, self.expiration, 0) \
            .with_integer_attribute("license_type", 1) \
            .with_decimal_attribute("quantity_oil", 2.25555) \
            .with_string_attribute("nif", "54688188M") \
            .with_boolean_attribute("is_spanish", True) \
            .with_date_attribute("birth_date", datetime.date(1999, 3, 20)) \
            .with_datetime_attribute("local_hour", datetime.datetime.now()) \
            .with_string_attribute("car_type", "big") \
            .with_integer_attribute("car_points", 5) \
            .with_decimal_attribute("precision_wheels", 1.10) \
            .build()
        self.assertIsNotNone(receipt.credential_id)
        self.assertIsNotNone(receipt.credential)
        self.assertEqual(self.drivingLicenseSchemaType,
                         receipt.credential_type)

        credential = receipt.credential
        self.assertEqual(issuer, credential.issuer)
        self.assertEqual("JsonSchema2023", credential.credential_schema.type)
        self.assertEqual(self.drivingLicenseSchemaType, credential.type[1])