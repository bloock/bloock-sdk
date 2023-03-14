from bloock._bridge import bridge
from bloock._bridge.proto.identity_pb2 import CreateIdentityRequest, LoadIdentityRequest, GetSchemaRequest, \
    CredentialOfferRedeemRequest, VerifyCredentialRequest, RevokeCredentialRequest, GetOfferRequest, WaitOfferRequest
from bloock._bridge.proto.shared_pb2 import Error
from bloock._config.config import Config
from bloock.entity.identity.credential import Credential
from bloock.entity.identity.credential_builder import CredentialBuilder
from bloock.entity.identity.credential_offer import CredentialOffer
from bloock.entity.identity.credential_verification import CredentialVerification
from bloock.entity.identity.identity import Identity
from bloock.entity.identity.schema import Schema
from bloock.entity.identity.schema_builder import SchemaBuilder


class IdentityClient:
    def __init__(self, config_data=None) -> None:
        self.bridge_client = bridge.BloockBridge()
        if config_data is None:
            config_data = Config.default()
        self.config_data = config_data

    def create_identity(self) -> Identity:
        res = self.bridge_client.identity().CreateIdentity(
            CreateIdentityRequest(
                config_data=self.config_data,
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return Identity.from_proto(res.identity)

    def load_identity(self, mnemonic: str) -> Identity:
        res = self.bridge_client.identity().LoadIdentity(
            LoadIdentityRequest(
                config_data=self.config_data,
                mnemonic=mnemonic
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return Identity.from_proto(res.identity)

    def build_schema(self, display_name: str, technical_name: str) -> SchemaBuilder:
        return SchemaBuilder(display_name, technical_name, self.config_data)

    def get_schema(self, schema_id: str) -> Schema:
        res = self.bridge_client.identity().GetSchema(
            GetSchemaRequest(
                config_data=self.config_data,
                id=schema_id
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return Schema.from_proto(res.schema)

    def build_credential(self, schema_id: str, holder_key: str) -> CredentialBuilder:
        return CredentialBuilder(schema_id=schema_id, holder_key=holder_key, config_data=self.config_data)

    def get_offer(self, id: str) -> CredentialOffer:
        res = self.bridge_client.identity().GetOffer(
            GetOfferRequest(
                config_data=self.config_data,
                id=id,
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return CredentialOffer.from_proto(res.offer)

    def wait_offer(self, offer_id: str) -> CredentialOffer:
        res = self.bridge_client.identity().WaitOffer(
            WaitOfferRequest(
                config_data=self.config_data,
                offer_id=offer_id,
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return CredentialOffer.from_proto(res.offer)

    def redeem_offer(self, offer: CredentialOffer, holder_private_key: str) -> Credential:
        res = self.bridge_client.identity().CredentialOfferRedeem(
            CredentialOfferRedeemRequest(
                config_data=self.config_data,
                credential_offer=offer.to_proto(),
                identity_private_key=holder_private_key
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return Credential.from_proto(res.credential)

    def verify_credential(self, credential: Credential) -> CredentialVerification:
        res = self.bridge_client.identity().VerifyCredential(
            VerifyCredentialRequest(
                config_data=self.config_data,
                credential=credential.to_proto()
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return CredentialVerification.from_proto(res.result)

    def revoke_credential(self, credential: Credential) -> bool:
        res = self.bridge_client.identity().RevokeCredential(
            RevokeCredentialRequest(
                config_data=self.config_data,
                credential=credential.to_proto()
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return res.result.success
