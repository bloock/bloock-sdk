from __future__ import annotations

import bloock._bridge.proto.keys_entities_pb2 as proto
from bloock.entity.key.key_type import KeyType


class LocalKey:
    def __init__(
            self,
            key: str,
            private_key: str,
            key_type: KeyType
    ) -> None:
        self.key = key
        self.private_key = private_key
        self.key_type = key_type

    @staticmethod
    def from_proto(local_key: proto.LocalKey) -> LocalKey:
        return LocalKey(
            key=local_key.key,
            private_key=local_key.private_key,
            key_type=KeyType.from_proto(local_key.key_type),
        )

    def to_proto(self) -> proto.LocalKey:
        return proto.LocalKey(
            key=self.key,
            private_key=self.private_key,
            key_type=self.key_type.to_proto(),
        )
