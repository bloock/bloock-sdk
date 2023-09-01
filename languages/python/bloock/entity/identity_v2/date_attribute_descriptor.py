from __future__ import annotations

import bloock._bridge.proto.identity_entities_v2_pb2 as proto
from bloock.entity.identity_v2.attribute_descriptor import AttributeDescriptor


class DateAttributeDescriptor(AttributeDescriptor):
    @staticmethod
    def from_proto(a: proto.DateAttributeDefinitionV2) -> DateAttributeDescriptor:
        return DateAttributeDescriptor(
            display_name=a.display_name,
            technical_name=a.id,
            description=a.description,
            required=a.required,
        )

    def to_proto(self) -> proto.DateAttributeDefinitionV2:
        return proto.DateAttributeDefinitionV2(
            display_name=self.display_name,
            id=self.technical_name,
            description=self.description,
            required=self.required,
        )