from __future__ import annotations

import bloock._bridge.proto.identity_entities_v2_pb2 as proto


class Schema:
    def __init__(self, cid: str, cid_json_ld: str, json: str) -> None:
        self.cid = cid
        self.cid_json_ld = cid_json_ld
        self.json = json

    @staticmethod
    def from_proto(c: proto.SchemaV2) -> Schema:
        return Schema(
            cid=c.cid,
            cid_json_ld=c.cid_json_ld,
            json=c.json,
        )

    def to_proto(self) -> proto.SchemaV2:
        return proto.SchemaV2(
            cid=self.cid,
            cid_json_ld=self.cid_json_ld,
            json=self.json,
        )
