from __future__ import annotations

import bloock._bridge.proto.identity_entities_pb2 as proto


class CredentialSchema:
    """
    Represents the schema information for a credential, including its ID and type.
    """
    def __init__(self, id: str, type: str) -> None:
        """
        Constructs an CredentialSchema object with the specified parameters.
        :type type: object
        :type id: object
        :rtype: object
        """
        self.id = id
        self.type = type

    @staticmethod
    def from_proto(c: proto.CredentialSchema) -> CredentialSchema:
        return CredentialSchema(
            id=c.id,
            type=c.type
        )

    def to_proto(self) -> proto.CredentialSchema:
        return proto.CredentialSchema(
            id=self.id,
            type=self.type
        )
