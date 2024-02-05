from __future__ import annotations

import bloock._bridge.proto.keys_entities_pb2 as proto
from bloock.entity.key.key_protection_level import KeyProtectionLevel
from bloock.entity.key.key_type import KeyType


class ManagedCertificate:
    """
    Represents a managed certificate with its details.
    """
    def __init__(
            self,
            id: str,
            protection: KeyProtectionLevel,
            key_type: KeyType,
            expiration: int,
            key: str,
    ) -> None:
        """
        Constructs a ManagedCertificate object with the specified parameters.
        :type key: object
        :type expiration: object
        :type key_type: object
        :type protection: object
        :type id: object
        :rtype: object
        """
        self.id = id
        """
        Is the identifier of the managed certificate (ex: 2abae00b-f3d9-410c-abdf-1ea391d633aa).
        """
        self.protection = protection
        """
        Is the protection level for the key.
        """
        self.key_type = key_type
        """
        Is the type of the key.
        """
        self.expiration = expiration
        """
        Is the timestamp indicating when the certificate expires.
        """
        self.key = key
        """
        Is the certificate public key.
        """

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
