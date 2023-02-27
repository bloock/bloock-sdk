from __future__ import annotations

import bloock._bridge.proto.identity_entities_pb2 as proto
from bloock.entity.identity.attribute import Attribute


class DatetimeAttribute(Attribute):
    @staticmethod
    def from_proto(a: proto.DateTimeAttribute) -> DatetimeAttribute:
        return DatetimeAttribute(
            id=a.id,
            value=a.value,
        )

    def to_proto(self) -> proto.DateTimeAttribute:
        return proto.DateTimeAttribute(
            id=self.id,
            value=self.value,
        )
