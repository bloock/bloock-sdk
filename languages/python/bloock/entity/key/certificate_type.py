from __future__ import annotations

from enum import Enum

import bloock._bridge.proto.keys_entities_pb2 as proto


class CertificateType(Enum):
    """
    Represents the type of certificate.
    """
    PEM = 0
    PFX = 1
    UNRECOGNIZED = -1

    def __int__(self):
        return self.value

    @staticmethod
    def from_proto(alg: proto.CertificateType.ValueType | None) -> CertificateType:
        if alg == proto.CertificateType.PEM:
            return CertificateType.PEM
        elif alg == proto.CertificateType.PFX:
            return CertificateType.PFX
        else:
            return CertificateType.UNRECOGNIZED

    def to_proto(self) -> proto.CertificateType.ValueType:
        if self == CertificateType.PEM:
            return proto.CertificateType.PEM
        elif self == CertificateType.PFX:
            return proto.CertificateType.PFX
        else:
            return proto.CertificateType.PEM
