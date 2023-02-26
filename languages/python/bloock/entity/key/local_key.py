from __future__ import annotations

import bloock._bridge.proto.keys_entities_pb2 as proto


class LocalKey:
    def __init__(
            self,
            key: str,
            private_key: str,
    ) -> None:
        self.key = key
        self.private_key = private_key

    @staticmethod
    def from_proto(local_key: proto.LocalKey) -> LocalKey:
        return LocalKey(
            key=local_key.key,
            private_key=local_key.private_key,
        )

    def to_proto(self) -> proto.LocalKey:
        return proto.LocalKey(
            key=self.key,
            private_key=self.private_key,
        )
