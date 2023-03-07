from __future__ import annotations

import bloock._bridge.proto.identity_entities_pb2 as proto


class CredentialVerification:
    def __init__(self, timestamp: int, issuer: str, revocation: int) -> None:
        self.timestamp = timestamp
        self.issuer = issuer
        self.revocation = revocation

    @staticmethod
    def from_proto(c: proto.CredentialVerification) -> CredentialVerification:
        return CredentialVerification(
            timestamp=c.timestamp,
            issuer=c.issuer,
            revocation=c.revocation
        )

    def to_proto(self) -> proto.CredentialVerification:
        return proto.CredentialVerification(
            timestamp=self.timestamp,
            issuer=self.issuer,
            revocation=self.revocation,
        )
