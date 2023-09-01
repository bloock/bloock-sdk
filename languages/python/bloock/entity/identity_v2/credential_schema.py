from __future__ import annotations

import bloock._bridge.proto.identity_entities_v2_pb2 as proto


class CredentialSchema:
    def __init__(self, id: str, type: str) -> None:
        self.id = id
        self.type = type

    @staticmethod
    def from_proto(c: proto.CredentialSchemaV2) -> CredentialSchema:
        return CredentialSchema(
            id=c.id,
            type=c.type
        )

    def to_proto(self) -> proto.CredentialSchemaV2:
        return proto.CredentialSchemaV2(
            id=self.id,
            type=self.type
        )
