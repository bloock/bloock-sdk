from __future__ import annotations

import bloock._bridge.proto.keys_entities_pb2 as proto
from bloock.entity.key.key_protection_level import KeyProtectionLevel
from bloock.entity.key.key_type import KeyType


class ManagedCertificate:
    def __init__(
            self,
            id: str,
            protection: KeyProtectionLevel,
            key_type: KeyType,
            expiration: int,
            key: str,
    ) -> None:
        self.id = id
        self.protection = protection
        self.key_type = key_type
        self.expiration = expiration
        self.key = key

    @staticmethod
    def from_proto(key: proto.ManagedCertificate) -> ManagedCertificate:
        return ManagedCertificate(
            id=key.id,
            protection=KeyProtectionLevel.from_proto(key.protection),
            key_type=KeyType.from_proto(key.key_type),
            expiration=key.expiration,
            key=key.key
        )

    def to_proto(self) -> proto.ManagedCertificate:
        return proto.ManagedCertificate(
            id=self.id,
            protection=self.protection.to_proto(),
            key_type=self.key_type.to_proto(),
            expiration=self.expiration,
            key=self.key,
        )
