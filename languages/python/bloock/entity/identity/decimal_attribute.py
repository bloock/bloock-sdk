from __future__ import annotations

import bloock._bridge.proto.identity_entities_pb2 as proto
from bloock.entity.identity.attribute import Attribute


class DecimalAttribute(Attribute):
    """
    Represents an attribute with a decimal value.
    """
    @staticmethod
    def from_proto(a: proto.DecimalAttribute) -> DecimalAttribute:
        return DecimalAttribute(
            id=a.id,
            value=a.value,
        )

    def to_proto(self) -> proto.DecimalAttribute:
        return proto.DecimalAttribute(
            id=self.id,
            value=self.value,
        )