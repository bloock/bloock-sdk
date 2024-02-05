from __future__ import annotations

import bloock._bridge.proto.keys_entities_pb2 as proto
from bloock.entity.key.key_protection_level import KeyProtectionLevel
from bloock.entity.key.key_type import KeyType


class ManagedKeyParams:
    """
    Represents the parameters for creating a managed key.
    """
    def __init__(
            self,
            protection: KeyProtectionLevel,
            key_type: KeyType,
            name: str = "",
            expiration: int = 0,
    ) -> None:
        """
        Constructs a ManagedKeyParams object with the specified parameters.
        :type expiration: object
        :type name: object
        :type key_type: object
        :type protection: object
        :rtype: object
        """
        self.protection = protection
        """
        Is the protection level for the key.
        """
        self.key_type = key_type
        """
        Is the timestamp indicating when the key expires.
        """
        self.name = name
        """
        Is the name of the managed key.
        """
        self.expiration = expiration
        """
        Is the timestamp indicating when the key expires.
        """

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
