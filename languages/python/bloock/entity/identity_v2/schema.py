from __future__ import annotations

import bloock._bridge.proto.identity_entities_v2_pb2 as proto


class Schema:
    def __init__(self, id: str, json: str) -> None:
        self.id = id
        self.json = json

    @staticmethod
    def from_proto(c: proto.SchemaV2) -> Schema:
        return Schema(
            id=c.id,
            json=c.json_ld,
        )

    def to_proto(self) -> proto.SchemaV2:
        return proto.SchemaV2(
            id=self.id,
            json_ld=self.json,
        )
