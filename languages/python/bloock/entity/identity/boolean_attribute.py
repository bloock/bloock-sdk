from __future__ import annotations

import bloock._bridge.proto.bloock_identity_entities_pb2 as proto
from bloock.entity.identity.attribute import Attribute


class BooleanAttribute(Attribute):
    """
    Represents an attribute with a boolean value.
    """
    @staticmethod
    def from_proto(a: proto.BooleanAttribute) -> BooleanAttribute:
        return BooleanAttribute(
            id=a.id,
            value=a.value,
        )

    def to_proto(self) -> proto.BooleanAttribute:
        return proto.BooleanAttribute(
            id=self.id,
            value=self.value,
        )
