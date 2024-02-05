from __future__ import annotations

from enum import Enum
import bloock._bridge.proto.authenticity_entities_pb2 as proto

class HashAlg(Enum):
    """
    Represents different hash algorithms.
    """
    SHA_256 = 0
    """
    Represents the SHA-256 hash algorithm.
    """
    KECCAK_256 = 1
    """
    Represents the Keccak-256 hash algorithm.
    """
    POSEIDON = 2
    """
    Represents the Poseidon hash algorithm.
    """
    NONE = 3
    """
    Represents no hash algorithm.
    """
    UNRECOGNIZED = -1
    """
    Represents an unrecognized hash algorithm.
    """

    def __int__(self):
        return self.value

    @staticmethod
    def from_proto(alg: proto.HashAlg.ValueType | None) -> HashAlg:
        if alg == proto.HashAlg.SHA_256:
            return HashAlg.SHA_256
        elif alg == proto.HashAlg.KECCAK_256:
            return HashAlg.KECCAK_256
        elif alg == proto.HashAlg.POSEIDON:
            return HashAlg.POSEIDON
        elif alg == proto.HashAlg.NONE:
            return HashAlg.NONE
        else:
            return HashAlg.UNRECOGNIZED

    def to_proto(self) -> proto.HashAlg:
        if self == HashAlg.SHA_256:
            return proto.HashAlg.SHA_256
        elif self == HashAlg.KECCAK_256:
            return proto.HashAlg.KECCAK_256
        elif self == HashAlg.POSEIDON:
            return proto.HashAlg.POSEIDON
        elif self == HashAlg.NONE:
            return proto.HashAlg.NONE
        else:
            return proto.HashAlg.SHA_256
