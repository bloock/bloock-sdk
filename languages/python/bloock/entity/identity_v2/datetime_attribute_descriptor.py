from __future__ import annotations

import bloock._bridge.proto.identity_entities_v2_pb2 as proto
from bloock.entity.identity_v2.attribute_descriptor import AttributeDescriptor


class DatetimeAttributeDescriptor(AttributeDescriptor):
    @staticmethod
    def from_proto(a: proto.DateTimeAttributeDefinitionV2) -> DatetimeAttributeDescriptor:
        return DatetimeAttributeDescriptor(
            display_name=a.display_name,
            technical_name=a.id,
            description=a.description,
            required=a.required,
        )

    def to_proto(self) -> proto.DateTimeAttributeDefinitionV2:
        return proto.DateTimeAttributeDefinitionV2(
            display_name=self.display_name,
            id=self.technical_name,
            description=self.description,
            required=self.required,
        )
