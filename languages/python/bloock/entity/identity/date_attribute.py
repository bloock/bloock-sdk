from __future__ import annotations

import bloock._bridge.proto.identity_entities_pb2 as proto
from bloock.entity.identity.attribute import Attribute


class DateAttribute(Attribute):
    """
    Represents an attribute with a date value, including its key and formatted value.
    """
    @staticmethod
    def from_proto(a: proto.DateAttribute) -> DateAttribute:
        return DateAttribute(
            id=a.id,
            value=a.value,
        )

    def to_proto(self) -> proto.DateAttribute:
        return proto.DateAttribute(
            id=self.id,
            value=self.value,
        )