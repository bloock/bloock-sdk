from __future__ import annotations

from typing import List

import bloock._bridge.proto.identity_entities_pb2 as proto
from bloock.entity.identity.attribute_descriptor import AttributeDescriptor


class StringAttributeDescriptor(AttributeDescriptor):

    def __init__(self, display_name: str, technical_name: str, description: str) -> None:
        super().__init__(display_name, technical_name, description)

    @staticmethod
    def from_proto(a: proto.StringAttributeDefinition) -> StringAttributeDescriptor:
        return StringAttributeDescriptor(
            display_name=a.display_name,
            technical_name=a.id,
            description=a.description,
        )

    def to_proto(self) -> proto.StringAttributeDefinition:
        return proto.StringAttributeDefinition(
            display_name=self.display_name,
            id=self.technical_name,
            description=self.description,
        )
