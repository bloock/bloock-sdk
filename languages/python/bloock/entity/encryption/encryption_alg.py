from __future__ import annotations

from enum import Enum

import bloock._bridge.proto.encryption_entities_pb2 as proto


class EncryptionAlg(Enum):
    AES256GCM = 0
    AES256GCM_M = 1
    RSA = 2
    RSA_M = 3
    UNRECOGNIZED = -1

    def __int__(self):
        return self.value

    @staticmethod
    def from_proto(alg: proto.EncryptionAlg.ValueType | None) -> EncryptionAlg:
        if alg == proto.EncryptionAlg.A256GCM:
            return EncryptionAlg.AES256GCM
        elif alg == proto.EncryptionAlg.A256GCM_M:
            return EncryptionAlg.AES256GCM_M
        elif alg == proto.EncryptionAlg.RSA:
            return EncryptionAlg.RSA
        elif alg == proto.EncryptionAlg.RSA_M:
            return EncryptionAlg.RSA_M
        else:
            return EncryptionAlg.UNRECOGNIZED
