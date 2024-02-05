from __future__ import annotations

import bloock._bridge.proto.keys_entities_pb2 as proto


class AccessControlTotp:
    """
    Represents a Time-based One-Time Password ([TOTP](https://datatracker.ietf.org/doc/html/rfc6238)) code used for access control.
    """
    code = None

    def __init__(self, code) -> None:
        """
        Constructs an AccessControlTotp object with the specified parameters.
        :type code: object
        :rtype: object
        """
        self.code = code

    def to_proto(self) -> proto.AccessControlTotp:
        return proto.AccessControlTotp(
            code=self.code
        )