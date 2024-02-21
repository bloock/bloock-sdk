from bloock._bridge import bridge
from bloock._config.config import Config
from typing import Optional
from bloock._bridge.proto.shared_pb2 import Error
from bloock.entity.identity.did_method import DidMethod
from bloock._bridge.proto.identity_pb2 import CreateHolderRequest, CreateIssuerRequest, GetSchemaRequest, \
    ForcePublishIssuerStateRequest, CreateVerificationRequest, WaitVerificationRequest, GetVerificationStatusRequest, \
    ImportIssuerRequest, GetCredentialRequest, GetCredentialOfferRequest
from bloock._bridge.proto.identity_pb2 import GetCredentialProofRequest
from bloock._bridge.proto.identity_pb2 import RevokeCredentialRequest
from bloock.entity.identity.holder import Holder
from bloock.entity.identity.issuer import Issuer
from bloock.entity.identity.issuer_state_receipt import IssuerStateReceipt
from bloock.entity.identity.publish_interval_params import PublishIntervalParams
from bloock.entity.identity.schema_builder import SchemaBuilder
from bloock.entity.identity.credential_builder import CredentialBuilder
from bloock.entity.identity.credential_proof import CredentialProof
from bloock.entity.identity.credential import Credential
from bloock.entity.identity.schema import Schema
from bloock.entity.identity.verification_receipt import VerificationReceipt
from bloock.entity.key.key import Key


class IdentityClient:
    """
    Represents a client for interacting with the [Bloock Identity service](https://dashboard.bloock.com/login).
    """
    def __init__(self, config_data=None) -> None:
        """
        Creates a new instance of the IdentityClient with the provided configuration.
        :type config_data: object
        :rtype: object
        """
        self.bridge_client = bridge.BloockBridge()
        if config_data is None:
            config_data = Config.default()
        self.config_data = config_data

    def create_holder(self, holder_key: Key, did_method: DidMethod) -> Holder:
        """
        Creates a new holder identity.
        :type did_method: object
        :type holder_key: object
        :rtype: object
        """
        res = self.bridge_client.identity().CreateHolder(
            CreateHolderRequest(
                config_data=self.config_data,
                key=holder_key.to_proto(),
                did_method=did_method.to_proto(),
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return Holder(res.did, did_method, holder_key)

    def create_issuer(self, issuer_key: Key, publish_interval: PublishIntervalParams, did_method: DidMethod, name: str = None, description: str = None, image: str = None) -> Issuer:
        """
        Creates a new issuer on the Bloock Identity service.
        :type image: object
        :type description: object
        :type name: object
        :type did_method: object
        :type publish_interval: object
        :type issuer_key: object
        :rtype: object
        """
        res = self.bridge_client.identity().CreateIssuer(
            CreateIssuerRequest(
                config_data=self.config_data,
                key=issuer_key.to_proto(),
                did_method=did_method.to_proto(),
                name=name if name is not None else None,
                description=description if description is not None else None,
                image=image if image is not None else None,
                publish_interval=PublishIntervalParams.to_proto(publish_interval),
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return Issuer(res.did, did_method, issuer_key)

    def import_issuer(self, issuer_key: Key, did_method: DidMethod) -> Issuer:
        """
        Retrieves the issuer based on the issuer key and DID method.
        :type did_method: object
        :type issuer_key: object
        :rtype: object
        """
        res = self.bridge_client.identity().ImportIssuer(
            ImportIssuerRequest(
                config_data=self.config_data,
                key=issuer_key.to_proto(),
                did_method=did_method.to_proto(),
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return Issuer(res.did, did_method, issuer_key)

    def build_schema(self, display_name: str, schema_type: str, version: str, description: str) -> SchemaBuilder:
        """
        Creates a new schema builder for defining a schema on the Bloock Identity service.
        :type description: object
        :type version: object
        :type schema_type: object
        :type display_name: object
        :rtype: object
        """
        return SchemaBuilder(display_name, schema_type, version, description, self.config_data)

    def get_schema(self, schema_id: str) -> Schema:
        """
        Gets a schema from the Bloock Identity service based on the schema ID (ex: Qma1t4uzbnB93E4rasNdu5UWMDh5qg3wMkPm68cnEyfnoM).
        :type schema_id: object
        :rtype: object
        """
        res = self.bridge_client.identity().GetSchema(
            GetSchemaRequest(
                config_data=self.config_data,
                id=schema_id
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return Schema.from_proto(res.schema)

    def build_credential(self, issuer: Issuer, display_name: str, holder_did: str, expiration: int, version: int) -> CredentialBuilder:
        """
        Creates a new credential builder for defining a credential on the Bloock Identity service.
        :type issuer: object
        :type version: object
        :type expiration: object
        :type holder_did: object
        :type display_name: object
        :rtype: object
        """
        return CredentialBuilder(issuer, display_name, holder_did, expiration, version, self.config_data)

    def get_credential(self, credential_id: str) -> Credential:
        """
        Retrieves the Verifiable Credential entity based on the credential ID (UUID). (ex: 1bf0c79e-55e6-4f14-aa9d-fb55619ba0cf)
        :type credential_id: object
        :rtype: object
        """
        res = self.bridge_client.identity().GetCredential(
            GetCredentialRequest(
                config_data=self.config_data,
                credential_id=credential_id
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return Credential.from_proto(res.credential)

    def get_credential_offer(self, issuer: Issuer, credential_id: str) -> str:
        """
        Retrieves the json raw offer based on the credential ID (UUID). (ex: 1bf0c79e-55e6-4f14-aa9d-fb55619ba0cf)
        :type credential_id: object
        :type issuer: object
        :rtype: object
        """
        res = (self.bridge_client.identity().GetCredentialOffer(
            GetCredentialOfferRequest(
                config_data=self.config_data,
                credential_id=credential_id,
                key=issuer.key.to_proto()
            )
        ))

        if res.error != Error():
            raise Exception(res.error.message)
        return res.credential_offer

    def force_publish_issuer_state(self, issuer: Issuer) -> IssuerStateReceipt:
        """
        Publishes the state of an issuer on the Bloock Identity service.
        :type issuer: object
        :rtype: object
        """
        req = ForcePublishIssuerStateRequest(
            config_data=self.config_data,
            issuer_did=issuer.did,
            key=issuer.key.to_proto(),
        )

        res = self.bridge_client.identity().ForcePublishIssuerState(req)
        if res.error != Error():
            raise Exception(res.error.message)

        return IssuerStateReceipt.from_proto(res.state_receipt)

    def get_credential_proof(self, issuer_did: str, credential_id: str) -> CredentialProof:
        """
        Gets the proof of a credential on the Bloock Identity service.
        :type credential_id: object
        :type issuer_did: object
        :rtype: object
        """
        res = self.bridge_client.identity().GetCredentialProof(
            GetCredentialProofRequest(
                config_data=self.config_data,
                issuer_did=issuer_did,
                credential_id=credential_id,
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return CredentialProof.from_proto(res.proof)

    def revoke_credential(self, credential: Credential, issuer: Issuer) -> bool:
        """
        Revokes a credential on the Bloock Identity service.
        :type issuer: object
        :type credential: object
        :rtype: object
        """
        res = self.bridge_client.identity().RevokeCredential(
            RevokeCredentialRequest(
                config_data=self.config_data,
                credential=credential.to_proto(),
                key=issuer.key.to_proto()
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return res.result.success

    def create_verification(self, proof_request: str) -> VerificationReceipt:
        """
        Creates a new verification session on the identity managed API provided.
        :type proof_request: object
        :rtype: object
        """
        res = self.bridge_client.identity().CreateVerification(
            CreateVerificationRequest(
                config_data=self.config_data,
                proof_request=proof_request,
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return VerificationReceipt.from_proto(res.result)

    def wait_verification(self, session_id: int, timeout=120000) -> bool:
        """
        Waits for the completion of a verification session on the identity managed API provided.
        :type timeout: object
        :type session_id: object
        :rtype: object
        """
        res = self.bridge_client.identity().WaitVerification(
            WaitVerificationRequest(
                config_data=self.config_data,
                session_id=session_id,
                timeout=timeout,
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return res.status

    def get_verification_status(self, session_id: int) -> bool:
        """
        Gets the status of a verification session on the identity managed API provided.
        :type session_id: object
        :rtype: object
        """
        res = self.bridge_client.identity().GetVerificationStatus(
            GetVerificationStatusRequest(
                config_data=self.config_data,
                session_id=session_id,
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return res.status