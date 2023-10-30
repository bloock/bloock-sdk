from __future__ import annotations

import bloock._bridge.proto.identity_entities_pb2 as proto


class SignatureHeaderJws:
    def __init__(self, alg: str, kid: str) -> None:
        self.alg = alg
        self.kid = kid

    @staticmethod
    def from_proto(header: proto.SignatureHeaderJWS) -> SignatureHeaderJws:
        return SignatureHeaderJws(alg=header.alg, kid=header.kid)

    def to_proto(self) -> proto.SignatureHeaderJWS:
        return proto.SignatureHeaderJWS(alg=self.alg, kid=self.kid)
