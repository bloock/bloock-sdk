from __future__ import annotations

import bloock._bridge.proto.identity_entities_v2_pb2 as proto
from bloock.entity.identity_v2.attribute import Attribute


class DecimalAttribute(Attribute):
    @staticmethod
    def from_proto(a: proto.DecimalAttributeV2) -> DecimalAttribute:
        return DecimalAttribute(
            id=a.id,
            value=a.value,
        )

    def to_proto(self) -> proto.DecimalAttributeV2:
        return proto.DecimalAttributeV2(
            id=self.id,
            value=self.value,
        )