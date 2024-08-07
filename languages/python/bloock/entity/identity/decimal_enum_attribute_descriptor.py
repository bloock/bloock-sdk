from __future__ import annotations
from typing import List

import bloock._bridge.proto.bloock_identity_entities_pb2 as proto
from bloock.entity.identity.attribute_descriptor import AttributeDescriptor


class DecimalEnumAttributeDescriptor(AttributeDescriptor):
    """
    Represents a descriptor for an attribute with a decimal enum value.
    """

    def __init__(self, display_name: str, technical_name: str, description: str, required: bool, enumeration: List[float]) -> None:
        """
        Constructs an DecimalEnumAttributeDescriptor object with the specified parameters.
        :type enumeration: object
        :type required: object
        :type description: object
        :type technical_name: object
        :type display_name: object
        :rtype: object
        """
        super().__init__(display_name, technical_name, description, required)
        self.enumeration = enumeration

    @staticmethod
    def from_proto(a: proto.DecimalEnumAttributeDefinition) -> DecimalEnumAttributeDescriptor:
        return DecimalEnumAttributeDescriptor(
            display_name=a.display_name,
            technical_name=a.id,
            description=a.description,
            required=a.required,
            enumeration=list(a.enum),
        )

    def to_proto(self) -> proto.DecimalEnumAttributeDefinition:
        return proto.DecimalEnumAttributeDefinition(
            display_name=self.display_name,
            id=self.technical_name,
            description=self.description,
            required=self.required,
            enum=list(self.enumeration),
        )