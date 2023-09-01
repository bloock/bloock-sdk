from __future__ import annotations
from typing import List

import bloock._bridge.proto.identity_entities_v2_pb2 as proto
from bloock.entity.identity_v2.attribute_descriptor import AttributeDescriptor


class IntegerEnumAttributeDescriptor(AttributeDescriptor):

    def __init__(self, display_name: str, technical_name: str, description: str, required: bool, enumeration: List[int]) -> None:
        super().__init__(display_name, technical_name, description, required)
        self.enumeration = enumeration

    @staticmethod
    def from_proto(a: proto.IntegerEnumAttributeDefinitionV2) -> IntegerEnumAttributeDescriptor:
        return IntegerEnumAttributeDescriptor(
            display_name=a.display_name,
            technical_name=a.id,
            description=a.description,
            required=a.required,
            enumeration=list(a.enum),
        )

    def to_proto(self) -> proto.IntegerEnumAttributeDefinitionV2:
        return proto.IntegerEnumAttributeDefinitionV2(
            display_name=self.display_name,
            id=self.technical_name,
            description=self.description,
            required=self.required,
            enum=list(self.enumeration),
        )
