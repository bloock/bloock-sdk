from __future__ import annotations

import bloock._bridge.proto.identity_entities_pb2 as proto
from bloock.entity.authenticity.signature_alg import SignatureAlg
from bloock.entity.authenticity.signature_header import SignatureHeader


class CredentialOffer:
    def __init__(self, json: str) -> None:
        self.json = json

    @staticmethod
    def from_json(json: str) -> CredentialOffer:
        return CredentialOffer(
            json=json,
        )

    def to_json(self) -> str:
        return self.json

    @staticmethod
    def from_proto(c: proto.CredentialOffer) -> CredentialOffer:
        return CredentialOffer(
            json=c.json,
        )

    def to_proto(self) -> proto.CredentialOffer:
        return proto.CredentialOffer(
            json=self.json,
        )

