from __future__ import annotations

from enum import Enum

import bloock._bridge.proto.keys_entities_pb2 as proto


class KeyProtectionLevel(Enum):
    SOFTWARE = 0
    HSM = 1
    UNRECOGNIZED = -1

    def __int__(self):
        return self.value

    @staticmethod
    def from_proto(alg: proto.KeyProtectionLevel.ValueType | None) -> KeyProtectionLevel:
        if alg == proto.KeyProtectionLevel.SOFTWARE:
            return KeyProtectionLevel.SOFTWARE
        elif alg == proto.KeyProtectionLevel.HSM:
            return KeyProtectionLevel.HSM
        else:
            return KeyProtectionLevel.UNRECOGNIZED

    def to_proto(self) -> proto.LocalKey:
        if self == KeyProtectionLevel.SOFTWARE:
            return proto.KeyProtectionLevel.SOFTWARE
        elif self == KeyProtectionLevel.HSM:
            return proto.KeyProtectionLevel.HSM
        else:
            return proto.KeyProtectionLevel.SOFTWARE
