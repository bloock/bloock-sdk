from __future__ import annotations

import bloock._bridge.proto.identity_entities_v2_pb2 as proto
from bloock.entity.identity_v2.attribute import Attribute


class StringAttribute(Attribute):
    @staticmethod
    def from_proto(a: proto.StringAttributeV2) -> StringAttribute:
        return StringAttribute(
            id=a.id,
            value=a.value,
        )

    def to_proto(self) -> proto.StringAttributeV2:
        return proto.StringAttributeV2(
            id=self.id,
            value=self.value,
        )
