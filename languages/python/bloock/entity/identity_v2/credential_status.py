from __future__ import annotations

import bloock._bridge.proto.identity_entities_v2_pb2 as proto


class CredentialStatus:
    def __init__(self, id: str, revocation_nonce: int, type: str) -> None:
        self.id = id
        self.revocation_nonce = revocation_nonce
        self.type = type

    @staticmethod
    def from_proto(c: proto.CredentialStatusV2) -> CredentialStatus:
        return CredentialStatus(
            id=c.id,
            revocation_nonce=c.revocation_nonce,
            type=c.type
        )

    def to_proto(self) -> proto.CredentialStatusV2:
        return proto.CredentialStatusV2(
            id=self.id,
            revocation_nonce=self.revocation_nonce,
            type=self.type
        )
