from __future__ import annotations

from enum import Enum
import bloock._bridge.proto.authenticity_entities_pb2 as proto

class HashAlg(Enum):
    SHA_256 = 0
    KECCAK_256 = 1
    POSEIDON = 2
    NONE = 3
    UNRECOGNIZED = -1

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
