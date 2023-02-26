from __future__ import annotations

import bloock._bridge.proto.identity_entities_pb2 as proto
from bloock.entity.identity.attribute import Attribute


class MultichoiceAttribute(Attribute):
    @staticmethod
    def from_proto(a: proto.MultiChoiceAttribute) -> MultichoiceAttribute:
        return MultichoiceAttribute(
            id=a.id,
            value=a.value,
        )

    def to_proto(self) -> proto.MultiChoiceAttribute:
        return proto.MultiChoiceAttribute(
            id=self.id,
            value=self.value,
        )
