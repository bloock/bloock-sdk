from __future__ import annotations
from typing import List

import bloock._bridge.proto.identity_entities_v2_pb2 as proto
from bloock.entity.identity_v2.attribute_descriptor import AttributeDescriptor


class StringEnumAttributeDescriptor(AttributeDescriptor):

    def __init__(self, display_name: str, technical_name: str, description: str, required: bool, enumeration: List[str]) -> None:
        super().__init__(display_name, technical_name, description, required)
        self.enumeration = enumeration

    @staticmethod
    def from_proto(a: proto.StringEnumAttributeDefinitionV2) -> StringEnumAttributeDescriptor:

        return StringEnumAttributeDescriptor(
            display_name=a.display_name,
            technical_name=a.id,
            description=a.description,
            required=a.required,
            enumeration=list(a.enum),
        )

    def to_proto(self) -> proto.StringEnumAttributeDefinitionV2:
        return proto.StringEnumAttributeDefinitionV2(
            display_name=self.display_name,
            id=self.technical_name,
            description=self.description,
            required=self.required,
            enum=list(self.enumeration),
        )