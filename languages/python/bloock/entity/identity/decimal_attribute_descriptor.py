from __future__ import annotations

import bloock._bridge.proto.identity_entities_pb2 as proto
from bloock.entity.identity.attribute_descriptor import AttributeDescriptor


class DecimalAttributeDescriptor(AttributeDescriptor):
    """
    Represents a descriptor for an attribute with a decimal value.
    """
    @staticmethod
    def from_proto(a: proto.DecimalAttributeDefinition) -> DecimalAttributeDescriptor:
        return DecimalAttributeDescriptor(
            display_name=a.display_name,
            technical_name=a.id,
            description=a.description,
            required=a.required,
        )

    def to_proto(self) -> proto.DecimalAttributeDefinition:
        return proto.DecimalAttributeDefinition(
            display_name=self.display_name,
            id=self.technical_name,
            description=self.description,
            required=self.required,
        )