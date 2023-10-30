from __future__ import annotations

import bloock._bridge.proto.authenticity_entities_pb2 as proto
from bloock.entity.authenticity.signature_alg import SignatureAlg


class Signature:
    def __init__(
            self, signature: str, alg: str, kid: str, message_hash: str
    ) -> None:
        self.signature = signature
        self.alg = alg
        self.kid = kid
        self.message_hash = message_hash

    @staticmethod
    def from_proto(signature: proto.Signature) -> Signature:
        return Signature(
            signature=signature.signature,
            alg=signature.alg,
            kid=signature.kid,
            message_hash=signature.message_hash,
        )

    def to_proto(self) -> proto.Signature:
        return proto.Signature(
            signature=self.signature,
            alg=self.alg,
            kid=self.kid,
            message_hash=self.message_hash,
        )

    def get_alg(self) -> SignatureAlg:
        return SignatureAlg.from_str(self.alg)
