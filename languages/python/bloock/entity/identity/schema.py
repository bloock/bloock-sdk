from __future__ import annotations

import bloock._bridge.proto.identity_entities_pb2 as proto


class Schema:
    """
    Represents a schema with its attributes.
    """
    def __init__(self, cid: str, cid_json_ld: str, schema_type: str, json: str) -> None:
        """
        Constructs a Schema object with the specified parameters.
        :type json: object
        :type schema_type: object
        :type cid_json_ld: object
        :type cid: object
        :rtype: object
        """
        self.cid = cid
        self.cid_json_ld = cid_json_ld
        self.schema_type = schema_type
        self.json = json

    @staticmethod
    def from_proto(c: proto.Schema) -> Schema:
        return Schema(
            cid=c.cid,
            cid_json_ld=c.cid_json_ld,
            schema_type=c.schema_type,
            json=c.json,
        )

    def to_proto(self) -> proto.Schema:
        return proto.Schema(
            cid=self.cid,
            cid_json_ld=self.cid_json_ld,
            schema_type=self.schema_type,
            json=self.json,
        )
