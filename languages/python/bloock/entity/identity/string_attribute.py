from __future__ import annotations

import bloock._bridge.proto.identity_entities_pb2 as proto
from bloock.entity.identity.attribute import Attribute


class StringAttribute(Attribute):
    """
    Represents an attribute with a string value.
    """
    @staticmethod
    def from_proto(a: proto.StringAttribute) -> StringAttribute:
        return StringAttribute(
            id=a.id,
            value=a.value,
        )

    def to_proto(self) -> proto.StringAttribute:
        return proto.StringAttribute(
            id=self.id,
            value=self.value,
        )
