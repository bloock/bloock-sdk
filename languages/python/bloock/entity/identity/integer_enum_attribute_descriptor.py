from __future__ import annotations
from typing import List

import bloock._bridge.proto.identity_entities_pb2 as proto
from bloock.entity.identity.attribute_descriptor import AttributeDescriptor


class IntegerEnumAttributeDescriptor(AttributeDescriptor):
    """
    Represents a descriptor for an attribute with an integer enum value.
    """
    def __init__(self, display_name: str, technical_name: str, description: str, required: bool, enumeration: List[int]) -> None:
        """
        Constructs an IntegerEnumAttributeDescriptor object with the specified parameters.
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
    def from_proto(a: proto.IntegerEnumAttributeDefinition) -> IntegerEnumAttributeDescriptor:
        return IntegerEnumAttributeDescriptor(
            display_name=a.display_name,
            technical_name=a.id,
            description=a.description,
            required=a.required,
            enumeration=list(a.enum),
        )

    def to_proto(self) -> proto.IntegerEnumAttributeDefinition:
        return proto.IntegerEnumAttributeDefinition(
            display_name=self.display_name,
            id=self.technical_name,
            description=self.description,
            required=self.required,
            enum=list(self.enumeration),
        )
