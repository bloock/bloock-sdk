from __future__ import annotations

import bloock._bridge.proto.authenticity_entities_pb2 as proto
from bloock.entity.authenticity.signature_alg import SignatureAlg
from bloock.entity.authenticity.signature_header import SignatureHeader


class Signature:
    def __init__(
            self, message_hash: str, signature: str, protected: str, header: SignatureHeader
    ) -> None:
        self.signature = signature
        self.protected = protected
        self.header = header
        self.message_hash = message_hash

    @staticmethod
    def from_proto(signature: proto.Signature) -> Signature:
        return Signature(
            signature=signature.signature,
            protected=signature.protected,
            header=SignatureHeader.from_proto(signature.header),
            message_hash=signature.message_hash,
        )

    def to_proto(self) -> proto.Signature:
        return proto.Signature(
            signature=self.signature,
            protected=self.protected,
            header=self.header.to_proto(),
            message_hash=self.message_hash,
        )

    def get_alg(self) -> SignatureAlg:
        return SignatureAlg.from_str(self.header.alg)
