from __future__ import annotations
from enum import Enum
from bloock._bridge import bridge
import bloock._bridge.proto.record_pb2 as proto
from bloock._bridge.proto.shared_pb2 import Error
from bloock._config.config import Config


class SignatureAlg(Enum):
    ECDSA = 0
    UNRECOGNIZED = -1

    def __int__(self):
        return self.value

    @staticmethod
    def from_str(alg: str) -> SignatureAlg:
        if alg == "ES256K":
            return SignatureAlg.ECDSA
        else:
            return SignatureAlg.UNRECOGNIZED


class Signature:
    def __init__(self, signature: str, protected: str, header: SignatureHeader) -> None:
        self.signature = signature
        self.protected = protected
        self.header = header

    @staticmethod
    def from_proto(signature: proto.Signature) -> Signature:
        return Signature(
            signature=signature.signature,
            protected=signature.protected,
            header=SignatureHeader.from_proto(signature.header),
        )

    def to_proto(self) -> proto.Signature:
        return proto.Signature(
            signature=self.signature,
            protected=self.protected,
            header=self.header.to_proto(),
        )

    def get_common_name(self) -> str:
        client = bridge.BloockBridge()
        res = client.record().GetSignatureCommonName(
            proto.SignatureCommonNameRequest(
                config_data=Config.new(), signature=self.to_proto()
            )
        )
        if res.error != Error():
            raise Exception(res.error.message)
        return res.common_name

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
