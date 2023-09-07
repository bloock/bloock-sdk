from __future__ import annotations
from typing import List

import bloock._bridge.proto.identity_entities_v2_pb2 as proto
from bloock.entity.identity_v2.attribute_descriptor import AttributeDescriptor


class DecimalEnumAttributeDescriptor(AttributeDescriptor):

    def __init__(self, display_name: str, technical_name: str, description: str, required: bool, enumeration: List[float]) -> None:
        super().__init__(display_name, technical_name, description, required)
        self.enumeration = enumeration

    @staticmethod
    def from_proto(a: proto.DecimalEnumAttributeDefinitionV2) -> DecimalEnumAttributeDescriptor:
        return DecimalEnumAttributeDescriptor(
            display_name=a.display_name,
            technical_name=a.id,
            description=a.description,
            required=a.required,
            enumeration=list(a.enum),
        )

    def to_proto(self) -> proto.DecimalEnumAttributeDefinitionV2:
        return proto.DecimalEnumAttributeDefinitionV2(
            display_name=self.display_name,
            id=self.technical_name,
            description=self.description,
            required=self.required,
            enum=list(self.enumeration),
        )