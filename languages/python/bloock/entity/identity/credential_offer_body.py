from __future__ import annotations

from typing import List

import bloock._bridge.proto.identity_entities_pb2 as proto
from bloock.entity.identity.credential_offer_credential import CredentialOfferCredential


class CredentialOfferBody:
    def __init__(self, url: str, credentials: List[CredentialOfferCredential]) -> None:
        self.url = url
        self.credentials = credentials

    @staticmethod
    def from_proto(c: proto.CredentialOfferBody) -> CredentialOfferBody:
        return CredentialOfferBody(
            url=c.url,
            credentials=list(map(lambda x: CredentialOfferCredential.from_proto(x), c.credentials)),
        )

    def to_proto(self) -> proto.CredentialOfferBody:
        return proto.CredentialOfferBody(
            url=self.url,
            credentials=list(map(lambda x: x.to_proto(), self.credentials)),
        )
