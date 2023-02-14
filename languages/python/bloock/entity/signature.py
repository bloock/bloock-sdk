from __future__ import annotations
from enum import Enum
import bloock._bridge.proto.authenticity_entities_pb2 as proto


class SignatureAlg(Enum):
    ECDSA = 0
    ENS = 1
    UNRECOGNIZED = -1

    def __int__(self):
        return self.value

    @staticmethod
    def from_str(alg: str) -> SignatureAlg:
        if alg == "ES256K":
            return SignatureAlg.ECDSA
        elif alg == "ENS":
            return SignatureAlg.ENS
        else:
            return SignatureAlg.UNRECOGNIZED


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


class SignatureHeader:
    def __init__(self, alg: str, kid: str) -> None:
        self.alg = alg
        self.kid = kid

    @staticmethod
    def from_proto(header: proto.SignatureHeader) -> SignatureHeader:
        return SignatureHeader(alg=header.alg, kid=header.kid)

    def to_proto(self) -> proto.SignatureHeader:
        return proto.SignatureHeader(alg=self.alg, kid=self.kid)
