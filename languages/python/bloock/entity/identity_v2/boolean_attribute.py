from __future__ import annotations

import bloock._bridge.proto.identity_entities_v2_pb2 as proto
from bloock.entity.identity_v2.attribute import Attribute


class BooleanAttribute(Attribute):
    @staticmethod
    def from_proto(a: proto.BooleanAttributeV2) -> BooleanAttribute:
        return BooleanAttribute(
            id=a.id,
            value=a.value,
        )

    def to_proto(self) -> proto.BooleanAttributeV2:
        return proto.BooleanAttributeV2(
            id=self.id,
            value=self.value,
        )
