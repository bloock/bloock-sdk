from __future__ import annotations

from typing import List

import bloock._bridge.proto.bloock_identity_entities_pb2 as proto
from bloock._bridge import BloockBridge
from bloock._bridge.proto.bloock_identity_pb2 import CredentialFromJsonRequest, CredentialToJsonRequest
from bloock._bridge.proto.bloock_shared_pb2 import Error
from bloock._config.config import Config
from bloock.entity.identity.credential_proof import CredentialProof
from bloock.entity.identity.credential_schema import CredentialSchema
from bloock.entity.identity.credential_status import CredentialStatus


class Credential:
    """
    Represents a verifiable credential with its associated information. [Verifiable Credentials Data Model v2.0](https://www.w3.org/TR/vc-data-model-2.0/).
    """
    def __init__(self, context: List[str], id: str, type: List[str], issuance_date: str, expiration: str, credential_subject: str,
                 credential_status: CredentialStatus, issuer: str, credential_schema: CredentialSchema,
                 proof: CredentialProof) -> None:
        """
        Creates a new Credential instance with the provided details.
        :type proof: object
        :type credential_schema: object
        :type issuer: object
        :type credential_status: object
        :type credential_subject: object
        :type expiration: object
        :type issuance_date: object
        :type type: object
        :type id: object
        :type context: object
        :rtype: object
        """
        self.context = context
        self.id = id
        self.type = type
        self.issuance_date = issuance_date
        self.expiration = expiration
        self.credential_subject = credential_subject
        self.credential_status = credential_status
        self.issuer = issuer
        self.credential_schema = credential_schema
        self.proof = proof

    @staticmethod
    def from_proto(c: proto.Credential) -> Credential:
        return Credential(
            context=c.context,
            id=c.id,
            type=c.type,
            issuance_date=c.issuance_date,
            expiration=c.expiration,
            credential_subject=c.credential_subject,
            credential_status=CredentialStatus.from_proto(c.credential_status),
            issuer=c.issuer,
            credential_schema=CredentialSchema.from_proto(c.credential_schema),
            proof=CredentialProof.from_proto(c.proof)
        )

    def to_proto(self) -> proto.Credential:
        return proto.Credential(
            context=self.context,
            id=self.id,
            type=self.type,
            issuance_date=self.issuance_date,
            expiration=self.expiration,
            credential_subject=self.credential_subject,
            credential_status=self.credential_status.to_proto(),
            issuer=self.issuer,
            credential_schema=self.credential_schema.to_proto(),
            proof=self.proof.to_proto()
        )

    @staticmethod
    def from_json(json: str) -> Credential:
        """
        Creates a Credential instance from a JSON string representation.
        :type json: object
        :rtype: object
        """
        bridge = BloockBridge()

        req = CredentialFromJsonRequest(
            config_data=Config.default(),
            json=json
        )

        res = bridge.identity().CredentialFromJson(req)
        if res.error != Error():
            raise Exception(res.error.message)

        return Credential.from_proto(res.credential)

    def to_json(self) -> str:
        """
        Converts the Credential instance to its JSON string representation.
        :rtype: object
        """
        bridge = BloockBridge()

        req = CredentialToJsonRequest(
            config_data=Config.default(),
            credential=self.to_proto()
        )

        res = bridge.identity().CredentialToJson(req)
        if res.error != Error():
            raise Exception(res.error.message)

        return res.json
