from __future__ import annotations

import bloock._bridge.proto.identity_entities_pb2 as proto
from bloock.entity.identity.attribute_descriptor import AttributeDescriptor


class NumberAttributeDescriptor(AttributeDescriptor):
    @staticmethod
    def from_proto(a: proto.NumberAttributeDefinition) -> NumberAttributeDescriptor:
        return NumberAttributeDescriptor(
            display_name=a.display_name,
            technical_name=a.id,
            description=a.description,
        )

    def to_proto(self) -> proto.NumberAttributeDefinition:
        return proto.NumberAttributeDefinition(
            display_name=self.display_name,
            id=self.technical_name,
            description=self.description,
        )
