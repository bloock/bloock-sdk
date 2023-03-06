from __future__ import annotations

import bloock._bridge.proto.identity_entities_pb2 as proto


class Credential:
    def __init__(self, json: str) -> None:
        self.json = json

    @staticmethod
    def from_json(json: str) -> Credential:
        return Credential(
            json=json,
        )

    def to_json(self) -> str:
        return self.json

    @staticmethod
    def from_proto(c: proto.Credential) -> Credential:
        return Credential(
            json=c.json,
        )

    def to_proto(self) -> proto.Credential:
        return proto.Credential(
            json=self.json,
        )
