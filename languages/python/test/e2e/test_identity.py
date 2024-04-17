import json
'''import base64
import datetime
import json
import os
import unittest
from bloock.entity.identity.credential import Credential
from bloock.entity.identity.did_method import DidMethod
from bloock.client.identity import IdentityClient
from bloock.client.identity_core import IdentityCoreClient
from bloock.client.key import KeyClient
from bloock.entity.identity.publish_interval_params import PublishIntervalParams
from bloock.entity.key.key_protection_level import KeyProtectionLevel
from bloock.entity.key.key_type import KeyType
from bloock.entity.key.key import Key
from bloock.entity.key.managed_key_params import ManagedKeyParams
from test.e2e.util import init_dev_sdk


class TestIdentity(unittest.TestCase):
    credentialJson = '{\"@context\":[\"https://www.w3.org/2018/credentials/v1\",\"https://schema.iden3.io/core/jsonld/iden3proofs.jsonld\",\"https://api.bloock.dev/hosting/v1/ipfs/QmYMYpSQsFbqXgSRK8KFDGMopD2CUke5yd4m7XFuVAZTat\"],\"id\":\"https://clientHost.com/v1/did:polygonid:polygon:amoy:2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6/claims/2ff36890-2fc1-4bba-b489-bdd7685e9555\",\"type\":[\"VerifiableCredential\",\"DrivingLicense\"],\"issuanceDate\":\"2023-08-21T10:21:42.402140Z\",\"expirationDate\":\"2099-08-08T06:02:22Z\",\"credentialSubject\":{\"birth_date\":921950325,\"country\":\"Spain\",\"first_surname\":\"Tomas\",\"id\":\"did:polygonid:polygon:amoy:2qGg7TzmcoU4Jg3E86wXp4WJcyGUTuafPZxVRxpYQr\",\"license_type\":1,\"name\":\"Eduard\",\"nif\":\"54688188M\",\"second_surname\":\"Escoruela\",\"type\":\"DrivingLicense\"},\"credentialStatus\":{\"id\":\"https://api.bloock.dev/identity/v1/did:polygonid:polygon:amoy:2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6/claims/revocation/status/3553270275\",\"revocationNonce\":3553270275,\"type\":\"SparseMerkleTreeProof\"},\"issuer\":\"did:polygonid:polygon:amoy:2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6\",\"credentialSchema\":{\"id\":\"https://api.bloock.dev/hosting/v1/ipfs/QmWkPu699EF334ixBGEK7rDDurQfu2SYBXU39bSozu1i5h\",\"type\":\"JsonSchema2023\"},\"proof\":[{\"coreClaim\":\"e055485e9b8410b3cd71cb3ba3a0b7652a00000000000000000000000000000002125caf312e33a0b0c82d57fdd240b7261d58901a346261c5ce5621136c0b0056d1a9bf4e9d10b44fdd5b0f6b740b21dcd6675e770bf882249b8083471858190000000000000000000000000000000000000000000000000000000000000000039acad300000000ee30c6f30000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000\",\"issuerData\":{\"authCoreClaim\":\"cca3371a6cb1b715004407e325bd993c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000fbd3b6b8c8e24e08bb982c7d4990e594747e5c24d98ac4ec969e50e437c1eb08407c9e5acc278a1641c82488f7518432a5937973d4ddfe551e32f9f7ba4c4a2e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000\",\"credentialStatus\":{\"id\":\"https://api.bloock.dev/identity/v1/did%3Apolygonid%3Apolygon%3Aamoy%3A2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6/claims/revocation/status/0\",\"revocationNonce\":0,\"type\":\"SparseMerkleTreeProof\"},\"id\":\"did:polygonid:polygon:amoy:2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6\",\"mtp\":{\"existence\":true,\"siblings\":[]},\"state\":{\"claimsTreeRoot\":\"0da5ac49846ae0074b986e5eef7c84011529e9902a0ffc6e9973b5cd0d217709\",\"value\":\"778582fc18b636314cc027a7772c1429028d44cdd17234f06e6d2d59bedee31d\"}},\"signature\":\"7bf882354b7cedd4b7ee74590cd3b091fef7545cb4ae8cd35c72b106ff858a0a3b1272ab7748cf7187d2383acda44bdae4bce1a7f9dccc11921fb0f19a70ee03\",\"type\":\"BJJSignature2021\"}]}'
    drivingLicenseSchemaType = "DrivingLicense"
    holderDid = "did:polygonid:polygon:amoy:2qbhbai9AVMJKC4yk38PgyD5ieBuCSH43QBTrkpYGc"
    expiration = 4089852142

    @classmethod
    def setUpClass(cls):
        init_dev_sdk()

    def test_credential_from_to_json(self):
        credential = Credential.from_json(self.credentialJson)
        credential_json = credential.to_json()

        new_credential = Credential.from_json(credential_json)
        new_credential = new_credential.to_json()
        self.assertEqual(credential_json, new_credential)

    def test_create_holder(self):
        identity_client = IdentityClient()
        key_client = KeyClient()

        protection = KeyProtectionLevel.SOFTWARE
        key_type = KeyType.Bjj
        params = ManagedKeyParams(protection, key_type)
        managed_key = key_client.new_managed_key(params)

        holder_key = Key(managed_key)

        holder = identity_client.create_holder(holder_key, DidMethod.PolygonID)
        self.assertTrue(holder.did.__contains__("main"))

    def test_end_to_end(self):
        identity_client = IdentityClient()
        identity_core_client = IdentityCoreClient()
        key_client = KeyClient()

        protection = KeyProtectionLevel.SOFTWARE
        key_type = KeyType.Bjj
        params = ManagedKeyParams(protection, key_type)
        managed_key = key_client.new_managed_key(params)

        not_found_managed_key = key_client.new_managed_key(params)

        issuer_key = Key(managed_key)
        not_found_issuer_key = Key(not_found_managed_key)

        current_directory = os.getcwd()
        file_path = current_directory + "/test/e2e/test_utils/profile_image.png"
        with open(file_path, 'rb') as file:
            file_bytes = file.read()
        base64_file = base64.urlsafe_b64encode(file_bytes).decode('utf-8')

        issuer = identity_client.create_issuer(
            issuer_key, PublishIntervalParams.Interval15, DidMethod.PolygonIDTest, "Bloock Test", "bloock description test", base64_file)

        with self.assertRaises(Exception):
            identity_client.create_issuer(
                issuer_key, PublishIntervalParams.Interval15, DidMethod.PolygonIDTest)

        imported_issuer = identity_client.import_issuer(
            issuer_key, DidMethod.PolygonIDTest)
        self.assertTrue(imported_issuer.did.__contains__("amoy"))

        get_not_found_issuer_did = identity_client.import_issuer(
            not_found_issuer_key, DidMethod.PolygonIDTest)
        self.assertEqual("", get_not_found_issuer_did.did)

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

        receipt = identity_client.build_credential(issuer, schema.cid, self.holderDid, self.expiration, 0) \
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
        self.assertEqual(issuer.did, receipt.credential.issuer)
        self.assertEqual("JsonSchema2023",
                         receipt.credential.credential_schema.type)
        self.assertEqual(self.drivingLicenseSchemaType,
                         receipt.credential.type[1])

        new_receipt = identity_core_client.build_credential(issuer, schema.cid, self.holderDid, self.expiration, 0) \
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
        self.assertIsNotNone(new_receipt.credential_id)
        self.assertIsNotNone(new_receipt.credential)
        self.assertEqual(self.drivingLicenseSchemaType,
                         new_receipt.credential_type)

        credential = identity_client.get_credential(receipt.credential_id)
        self.assertEqual(issuer.did, credential.issuer)
        self.assertEqual("JsonSchema2023", credential.credential_schema.type)
        self.assertEqual(self.drivingLicenseSchemaType, credential.type[1])

        json_offer = identity_client.get_credential_offer(
            issuer, receipt.credential_id)
        self.assertIsNotNone(json_offer)

        ok = identity_client.revoke_credential(credential, issuer)
        self.assertTrue(ok)

        state_receipt = identity_client.force_publish_issuer_state(
            issuer)
        self.assertIsNotNone(state_receipt)

        with self.assertRaises(Exception):
            identity_client.force_publish_issuer_state(issuer)

        proof_request = prepare_proof_request(schema.cid_json_ld)

        verification = identity_client.create_verification(proof_request)
        self.assertIsNotNone(verification.session_id)
        self.assertIsNotNone(verification.verification_request)

        with self.assertRaises(Exception):
            identity_client.get_verification_status(verification.session_id)

        with self.assertRaises(Exception):
            identity_client.wait_verification(verification.session_id, 5)

'''
def prepare_proof_request(schema_id):
    json_string = '''
    {
        "circuitId": "credentialAtomicQuerySigV2",
        "id": 1704207344,
        "query": {
            "allowedIssuers": ["*"],
            "credentialSubject": {"birth_date": {}},
            "type": "DrivingLicense"
        }
    }
    '''

    # Parse JSON string into a dictionary
    data = json.loads(json_string)

    # Adjust the context field
    data['query']['context'] = f'https://api.bloock.dev/hosting/v1/ipfs/{schema_id}'

    # Convert the data back to JSON with indentation
    updated_proof = json.dumps(data, indent=2)

    return updated_proof
