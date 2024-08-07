from __future__ import annotations

import bloock._bridge.proto.bloock_identity_entities_pb2 as proto


class CredentialStatus:
    """
    Represents the status information for a credential, including its ID, revocation nonce, and type.
    """
    def __init__(self, id: str, revocation_nonce: int, type: str) -> None:
        """
        Constructs an CredentialStatus object with the specified parameters.
        :type type: object
        :type revocation_nonce: object
        :type id: object
        :rtype: object
        """
        self.id = id
        self.revocation_nonce = revocation_nonce
        self.type = type

    @staticmethod
    def from_proto(c: proto.CredentialStatus) -> CredentialStatus:
        return CredentialStatus(
            id=c.id,
            revocation_nonce=c.revocation_nonce,
            type=c.type
        )

    def to_proto(self) -> proto.CredentialStatus:
        return proto.CredentialStatus(
            id=self.id,
            revocation_nonce=self.revocation_nonce,
            type=self.type
        )
