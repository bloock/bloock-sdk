from __future__ import annotations

import bloock._bridge.proto.identity_entities_pb2 as proto
from bloock.entity.identity.attribute_descriptor import AttributeDescriptor


class IntegerAttributeDescriptor(AttributeDescriptor):
    """
    Represents a descriptor for an attribute with an integer value.
    """
    @staticmethod
    def from_proto(a: proto.IntegerAttributeDefinition) -> IntegerAttributeDescriptor:
        return IntegerAttributeDescriptor(
            display_name=a.display_name,
            technical_name=a.id,
            description=a.description,
            required=a.required,
        )

    def to_proto(self) -> proto.IntegerAttributeDefinition:
        return proto.IntegerAttributeDefinition(
            display_name=self.display_name,
            id=self.technical_name,
            description=self.description,
            required=self.required,
        )