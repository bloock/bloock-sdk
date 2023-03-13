from __future__ import annotations

import bloock._bridge.proto.identity_entities_pb2 as proto
from bloock._bridge import BloockBridge
from bloock._bridge.proto.identity_pb2 import CredentialFromJsonRequest, CredentialToJsonRequest
from bloock._bridge.proto.shared_pb2 import Error
from bloock._config.config import Config
from bloock.entity.identity.credential_body import CredentialBody


class Credential:
    def __init__(self, thread_id: str, body: CredentialBody) -> None:
        self.thread_id = thread_id
        self.body = body

    @staticmethod
    def from_json(json: str) -> Credential:
        bridge = BloockBridge()

        req = CredentialFromJsonRequest(
            config_data=Config.default(),
            json=json
        )

        res = bridge.identity().CredentialFromJson(req)
        if res.error != Error():
            raise Exception(res.error.message)

        return Credential.from_proto(res.credential)

    def to_json(self) -> str:
        bridge = BloockBridge()

        req = CredentialToJsonRequest(
            config_data=Config.default(),
            credential=self.to_proto()
        )

        res = bridge.identity().CredentialToJson(req)
        if res.error != Error():
            raise Exception(res.error.message)

        return res.json

    @staticmethod
    def from_proto(c: proto.Credential) -> Credential:
        return Credential(
            thread_id=c.thread_id,
            body=CredentialBody.from_proto(c.body)
        )

    def to_proto(self) -> proto.Credential:
        return proto.Credential(
            thread_id=self.thread_id,
            body=self.body.to_proto()
        )
