from __future__ import annotations

import bloock._bridge.proto.identity_entities_pb2 as proto
from bloock.entity.identity.attribute import Attribute


class NumberAttribute(Attribute):
    @staticmethod
    def from_proto(a: proto.NumberAttribute) -> NumberAttribute:
        return NumberAttribute(
            id=a.id,
            value=a.value,
        )

    def to_proto(self) -> proto.NumberAttribute:
        return proto.NumberAttribute(
            id=self.id,
            value=self.value,
        )
