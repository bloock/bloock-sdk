from __future__ import annotations

import bloock._bridge.proto.identity_entities_pb2 as proto


class Schema:
    def __init__(self, id: str, json: str) -> None:
        self.id = id
        self.json = json

    @staticmethod
    def from_proto(c: proto.Schema) -> Schema:
        return Schema(
            id=c.id,
            json=c.json_ld,
        )

    def to_proto(self) -> proto.Schema:
        return proto.Schema(
            id=self.id,
            json_ld=self.json,
        )
