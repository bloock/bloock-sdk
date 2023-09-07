from __future__ import annotations

import bloock._bridge.proto.identity_entities_v2_pb2 as proto
from bloock.entity.identity_v2.attribute import Attribute


class DateAttribute(Attribute):
    @staticmethod
    def from_proto(a: proto.DateAttributeV2) -> DateAttribute:
        return DateAttribute(
            id=a.id,
            value=a.value,
        )

    def to_proto(self) -> proto.DateAttributeV2:
        return proto.DateAttributeV2(
            id=self.id,
            value=self.value,
        )