from __future__ import annotations

from enum import Enum

import bloock._bridge.proto.encryption_entities_pb2 as proto


class EncryptionAlg(Enum):
    AES256GCM = 0
    RSA = 1
    ECIES = 2
    UNRECOGNIZED = -1

    def __int__(self):
        return self.value

    @staticmethod
    def from_proto(alg: proto.EncryptionAlg.ValueType | None) -> EncryptionAlg:
        if alg == proto.EncryptionAlg.A256GCM:
            return EncryptionAlg.AES256GCM
        elif alg == proto.EncryptionAlg.RSA:
            return EncryptionAlg.RSA
        elif alg == proto.EncryptionAlg.ECIES:
            return EncryptionAlg.ECIES
        else:
            return EncryptionAlg.UNRECOGNIZED
