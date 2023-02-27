from __future__ import annotations

import bloock._bridge.proto.identity_entities_pb2 as proto
from bloock.entity.identity.attribute_descriptor import AttributeDescriptor


class BooleanAttributeDescriptor(AttributeDescriptor):
    @staticmethod
    def from_proto(a: proto.BooleanAttributeDefinition) -> BooleanAttributeDescriptor:
        return BooleanAttributeDescriptor(
            display_name=a.display_name,
            technical_name=a.id,
            description=a.description,
        )

    def to_proto(self) -> proto.BooleanAttributeDefinition:
        return proto.BooleanAttributeDefinition(
            display_name=self.display_name,
            id=self.technical_name,
            description=self.description,
        )
