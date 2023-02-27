from __future__ import annotations

import bloock._bridge.proto.keys_entities_pb2 as proto
from bloock.entity.key.key_protection_level import KeyProtectionLevel
from bloock.entity.key.key_type import KeyType


class ManagedKeyParams:
    def __init__(
            self,
            protection: KeyProtectionLevel,
            key_type: KeyType,
            name: str = "",
            expiration: int = 0,
    ) -> None:
        self.protection = protection
        self.key_type = key_type
        self.name = name
        self.expiration = expiration

    @staticmethod
    def from_proto(key: proto.ManagedKeyParams) -> ManagedKeyParams:
        return ManagedKeyParams(
            protection=KeyProtectionLevel.from_proto(key.protection),
            key_type=KeyType.from_proto(key.key_type),
            name=key.name,
            expiration=key.expiration
        )

    def to_proto(self) -> proto.ManagedKeyParams:
        return proto.ManagedKeyParams(
            protection=self.protection.to_proto(),
            key_type=self.key_type.to_proto(),
            name=self.name,
            expiration=self.expiration
        )
