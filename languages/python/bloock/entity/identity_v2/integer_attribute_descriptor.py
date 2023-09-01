from __future__ import annotations

import bloock._bridge.proto.identity_entities_v2_pb2 as proto
from bloock.entity.identity_v2.attribute_descriptor import AttributeDescriptor


class IntegerAttributeDescriptor(AttributeDescriptor):
    @staticmethod
    def from_proto(a: proto.IntegerAttributeDefinitionV2) -> IntegerAttributeDescriptor:
        return IntegerAttributeDescriptor(
            display_name=a.display_name,
            technical_name=a.id,
            description=a.description,
            required=a.required,
        )

    def to_proto(self) -> proto.IntegerAttributeDefinitionV2:
        return proto.IntegerAttributeDefinitionV2(
            display_name=self.display_name,
            id=self.technical_name,
            description=self.description,
            required=self.required,
        )