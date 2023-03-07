import unittest

from bloock.client.identity import IdentityClient
from bloock.entity.identity.credential import Credential
from bloock.entity.identity.credential_offer import CredentialOffer
from test.util import init_sdk


class TestIdentity(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        init_sdk()

    def test_create_identity(self):
        identity_client = IdentityClient()

        c = identity_client.create_identity()

    def test_load_identity(self):
        identity_client = IdentityClient()

        c = identity_client.load_identity("mnemonic")

    def test_build_schema(self):
        identity_client = IdentityClient()

        c = identity_client.build_schema("", "") \
            .add_boolean_attribute("", "", "") \
            .add_date_attribute("", "", "") \
            .add_datetime_attribute("", "", "") \
            .add_multichoice_attribute("", "", ["a", "b", "c"], "") \
            .add_number_attribute("", "", "") \
            .build()

    def test_get_schema(self):
        identity_client = IdentityClient()

        c = identity_client.get_schema("")

    def test_credential_offer_builder(self):
        identity_client = IdentityClient()

        c = identity_client.build_offer("", "") \
            .with_boolean_attribute("", True) \
            .with_date_attribute("", 1234) \
            .with_datetime_attribute("", 1234) \
            .with_multichoice_attribute("", "") \
            .with_number_attribute("", 1) \
            .build()

    def test_credential_offer_to_json(self):
        offer = CredentialOffer.from_json("{}").to_json()
        self.assertEqual(offer, "{}")

    def test_credential_offer_from_json(self):
        offer = CredentialOffer.from_json("{}")
        self.assertEqual(offer.to_json(), "{}")

    def test_credential_offer_redeem(self):
        identity_client = IdentityClient()

        offer = CredentialOffer.from_json("{}")
        c = identity_client.redeem_offer(offer, "")

    def test_credential_to_json(self):
        credential = CredentialOffer.from_json("{}").to_json()
        self.assertEqual(credential, "{}")

    def test_credential_from_json(self):
        credential = CredentialOffer.from_json("{}")
        self.assertEqual(credential.to_json(), "{}")

    def test_verify_credential(self):
        identity_client = IdentityClient()

        credential = Credential.from_json("{}")
        c = identity_client.verify_credential(credential)

    def test_revoke_credential(self):
        identity_client = IdentityClient()

        credential = Credential.from_json("{}")
        c = identity_client.revoke_credential(credential)
