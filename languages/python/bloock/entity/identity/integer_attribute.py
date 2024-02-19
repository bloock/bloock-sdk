from __future__ import annotations

import bloock._bridge.proto.identity_entities_pb2 as proto
from bloock.entity.identity.attribute import Attribute


class IntegerAttribute(Attribute):
    """
    Represents an attribute with an integer value.
    """
    @staticmethod
    def from_proto(a: proto.IntegerAttribute) -> IntegerAttribute:
        return IntegerAttribute(
            id=a.id,
            value=a.value,
        )

    def to_proto(self) -> proto.IntegerAttribute:
        return proto.IntegerAttribute(
            id=self.id,
            value=self.value,
        )
