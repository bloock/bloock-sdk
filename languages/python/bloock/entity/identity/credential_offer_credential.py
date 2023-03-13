from __future__ import annotations

import bloock._bridge.proto.identity_entities_pb2 as proto
from bloock._bridge import BloockBridge
from bloock._bridge.proto.identity_pb2 import CredentialOfferFromJsonRequest, CredentialOfferToJsonRequest
from bloock._bridge.proto.shared_pb2 import Error
from bloock._config.config import Config


class CredentialOfferCredential:
    def __init__(self, id: str, description: str) -> None:
        self.id = id
        self.description = description

    @staticmethod
    def from_proto(c: proto.CredentialOfferBodyCredentials) -> CredentialOfferCredential:
        return CredentialOfferCredential(
            id=c.id,
            description=c.description
        )

    def to_proto(self) -> proto.CredentialOfferBodyCredentials:
        return proto.CredentialOfferBodyCredentials(
            id=self.id,
            description=self.description
        )
