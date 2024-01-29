from __future__ import annotations

import bloock._bridge.proto.keys_entities_pb2 as proto


class AccessControlSecret:
    secret = None

    def __init__(self, secret) -> None:
        self.secret = secret

    def to_proto(self) -> proto.AccessControlSecret:
        return proto.AccessControlSecret(
            secret=self.secret
        )