from __future__ import annotations

import bloock._bridge.proto.bloock_identity_entities_pb2 as proto
from bloock.entity.identity.attribute_descriptor import AttributeDescriptor


class DatetimeAttributeDescriptor(AttributeDescriptor):
    """
    Represents a descriptor for an attribute with a datetime value.
    """
    @staticmethod
    def from_proto(a: proto.DateTimeAttributeDefinition) -> DatetimeAttributeDescriptor:
        return DatetimeAttributeDescriptor(
            display_name=a.display_name,
            technical_name=a.id,
            description=a.description,
            required=a.required,
        )

    def to_proto(self) -> proto.DateTimeAttributeDefinition:
        return proto.DateTimeAttributeDefinition(
            display_name=self.display_name,
            id=self.technical_name,
            description=self.description,
            required=self.required,
        )
