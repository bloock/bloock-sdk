from __future__ import annotations

from typing import List

import bloock._bridge.proto.identity_entities_pb2 as proto
from bloock.entity.identity.attribute_descriptor import AttributeDescriptor


class MultichoiceAttributeDescriptor(AttributeDescriptor):

    def __init__(self, display_name: str, technical_name: str, allowed_values: List[str], description: str) -> None:
        super().__init__(display_name, technical_name, description)
        self.allowed_values = allowed_values

    @staticmethod
    def from_proto(a: proto.MultiChoiceAttributeDefinition) -> MultichoiceAttributeDescriptor:
        return MultichoiceAttributeDescriptor(
            display_name=a.display_name,
            technical_name=a.id,
            description=a.description,
            allowed_values=a.allowed_values
        )

    def to_proto(self) -> proto.MultiChoiceAttributeDefinition:
        return proto.MultiChoiceAttributeDefinition(
            display_name=self.display_name,
            id=self.technical_name,
            allowed_values=self.allowed_values,
            description=self.description,
        )
