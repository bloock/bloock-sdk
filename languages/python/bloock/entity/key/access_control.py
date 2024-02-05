from __future__ import annotations

import bloock._bridge.proto.keys_entities_pb2 as proto
from bloock.entity.key.access_control_totp import AccessControlTotp
from bloock.entity.key.access_control_secret import AccessControlSecret


class AccessControl:
    """
    Represents access control information, including Time-based One-Time Password (TOTP) and secret-based access.
    """
    access_control_totp = None
    access_control_secret = None

    def __init__(self, access_control) -> None:
        """
        Constructs AccessControl object from an AccessControlTotp or AccessControlSecret object.
        :type access_control: object
        :rtype: object
        """
        if isinstance(access_control, AccessControlTotp):
            self.access_control_totp = access_control
        elif isinstance(access_control, AccessControlSecret):
            self.access_control_secret = access_control
        else:
            raise Exception(
                "Invalid access control provided")

    def to_proto(self) -> proto.AccessControl:
        access_control_totp = None
        if self.access_control_totp is not None:
            access_control_totp = self.access_control_totp.to_proto()

        access_control_secret = None
        if self.access_control_secret is not None:
            access_control_secret = self.access_control_secret.to_proto()

        return proto.AccessControl(
            access_control_totp=access_control_totp,
            access_control_secret=access_control_secret,
        )