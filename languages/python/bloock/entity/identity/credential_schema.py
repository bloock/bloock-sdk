from __future__ import annotations

import bloock._bridge.proto.identity_entities_pb2 as proto
from bloock._bridge import BloockBridge
from bloock._bridge.proto.identity_pb2 import CredentialFromJsonRequest, CredentialToJsonRequest
from bloock._bridge.proto.shared_pb2 import Error
from bloock._config.config import Config


class CredentialSchema:
    def __init__(self, id: str, type: str) -> None:
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
