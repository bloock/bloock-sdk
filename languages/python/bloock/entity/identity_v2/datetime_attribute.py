from __future__ import annotations

import bloock._bridge.proto.identity_entities_v2_pb2 as proto
from bloock.entity.identity_v2.attribute import Attribute


class DatetimeAttribute(Attribute):
    """
    Represents an attribute with a datetime value.
    """
    @staticmethod
    def from_proto(a: proto.DateTimeAttributeV2) -> DatetimeAttribute:
        return DatetimeAttribute(
            id=a.id,
            value=a.value,
        )

    def to_proto(self) -> proto.DateTimeAttributeV2:
        return proto.DateTimeAttributeV2(
            id=self.id,
            value=self.value,
        )