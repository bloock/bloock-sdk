from __future__ import annotations

from bloock._bridge import BloockBridge
from bloock._bridge.proto.config_pb2 import ConfigData
from bloock._bridge.proto.identity_v2_pb2 import PublishIssuerStateRequest
from bloock._bridge.proto.shared_pb2 import Error
from bloock.entity.authenticity.signer import Signer
from bloock.entity.identity_v2.issuer_state_receipt import IssuerStateReceipt


class IssuerStatePublisher:
    def __init__(self, issuer_did: str, config_data: ConfigData) -> None:
        self.issuer_did = issuer_did
        self.signer = None
        self.config_data = config_data

    def with_signer(self, signer: Signer) -> IssuerStatePublisher:
        self.signer = signer.to_proto()
        return self

    def build(self) -> IssuerStateReceipt:
        bridge = BloockBridge()

        req = PublishIssuerStateRequest(
            config_data=self.config_data,
            issuer_did=self.issuer_did,
            signer=self.signer,
        )

        res = bridge.identity_v2().PublishIssuerState(req)
        if res.error != Error():
            raise Exception(res.error.message)

        return IssuerStateReceipt.from_proto(res.state_receipt)
