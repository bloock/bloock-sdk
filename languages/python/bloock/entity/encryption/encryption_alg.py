from __future__ import annotations

from enum import Enum

import bloock._bridge.proto.encryption_entities_pb2 as proto


class EncryptionAlg(Enum):
    """
    Represents encryption algorithm types.
    """
    AES256GCM = 0
    """
    Represents the AES-256-GCM encryption algorithm.
    """
    AES256GCM_M = 1
    """
    Represents the AES-256-GCM with managed key encryption algorithm.
    """
    RSA = 2
    """
    Represents the RSA encryption algorithm.
    """
    RSA_M = 3
    """
    Represents the RSA with managed key encryption algorithm.
    """
    UNRECOGNIZED = -1
    """
    Represents an unrecognized encryption algorithm.
    """

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
