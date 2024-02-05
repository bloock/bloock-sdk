from __future__ import annotations

import bloock._bridge.proto.keys_entities_pb2 as proto


class AccessControlSecret:
    """
    Represents a secret used for secret-based access control.
    """
    secret = None

    def __init__(self, secret) -> None:
        """
        Creates a new AccessControlSecret instance with the provided secret.
        :type secret: object
        :rtype: object
        """
        self.secret = secret

    def to_proto(self) -> proto.AccessControlSecret:
        return proto.AccessControlSecret(
            secret=self.secret
        )