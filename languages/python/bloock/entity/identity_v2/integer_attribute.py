from __future__ import annotations

import bloock._bridge.proto.identity_entities_v2_pb2 as proto
from bloock.entity.identity_v2.attribute import Attribute


class IntegerAttribute(Attribute):
    @staticmethod
    def from_proto(a: proto.IntegerAttributeV2) -> IntegerAttribute:
        return IntegerAttribute(
            id=a.id,
            value=a.value,
        )

    def to_proto(self) -> proto.IntegerAttributeV2:
        return proto.IntegerAttributeV2(
            id=self.id,
            value=self.value,
        )
