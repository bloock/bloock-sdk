from __future__ import annotations

from enum import Enum

import bloock._bridge.proto.keys_entities_pb2 as proto


class AccessControlType(Enum):
    """
    Indicates that the key is not protected by access control.
    """
    NONE = 0
    """
    Indicates that the key is protected by a TOTP-based access control.
    """
    TOTP = 1
    """
    Indicates that the key is protected by a Secret-based access control.
    """
    SECRET = 2
    """
    Indicates that the key is protected by a Hardware Security Module (HSM).
    """
    UNRECOGNIZED = -1

    def __int__(self):
        return self.value

    @staticmethod
    def from_proto(alg: proto.AccessControlType.ValueType | None) -> AccessControlType:
        if alg == proto.AccessControlType.NO_ACCESS_CONTROL:
            return AccessControlType.NONE
        elif alg == proto.AccessControlType.TOTP:
            return AccessControlType.TOTP
        elif alg == proto.AccessControlType.SECRET:
            return AccessControlType.SECRET
        else:
            return AccessControlType.UNRECOGNIZED

    def to_proto(self) -> proto.AccessControlType:
        if self == AccessControlType.NONE:
            return proto.AccessControlType.NO_ACCESS_CONTROL
        elif self == AccessControlType.TOTP:
            return proto.AccessControlType.TOTP
        elif self == AccessControlType.SECRET:
            return proto.AccessControlType.SECRET
        else:
            return proto.AccessControlType.SOFTWARE
