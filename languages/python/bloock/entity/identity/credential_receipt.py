from __future__ import annotations

import bloock._bridge.proto.identity_entities_pb2 as proto
from bloock.entity.identity.credential import Credential


class CredentialReceipt:
    """
    Represents a receipt for a credential, including the credential itself, its ID, and type.
    """
    def __init__(self, credential: Credential, credential_id: str, credential_type: str) -> None:
        """
        Constructs an CredentialReceipt object with the specified parameters.
        :type credential_type: object
        :type credential_id: object
        :type credential: object
        :rtype: object
        """
        self.credential = credential
        self.credential_id = credential_id
        self.credential_type = credential_type

    @staticmethod
    def from_proto(c: proto.CredentialReceipt) -> CredentialReceipt:
        return CredentialReceipt(
            credential=Credential.from_proto(c.credential),
            credential_id=c.credential_id,
            credential_type=c.credential_type,
        )

    def to_proto(self) -> proto.CredentialReceipt:
        return proto.CredentialReceipt(
            credential=self.credential.to_proto(),
            credential_id=self.credential_id,
            credential_type=self.credential_type,
        )
