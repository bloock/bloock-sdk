from __future__ import annotations

import bloock._bridge.proto.identity_entities_pb2 as proto
from bloock._bridge import BloockBridge
from bloock._bridge.proto.identity_pb2 import CredentialOfferFromJsonRequest, CredentialOfferToJsonRequest
from bloock._bridge.proto.shared_pb2 import Error
from bloock._config.config import Config
from bloock.entity.identity.credential_offer_body import CredentialOfferBody


class CredentialOffer:
    def __init__(self, thid: str, body: CredentialOfferBody, _from: str, _to: str) -> None:
        self.thid = thid
        self.body = body
        self._from = _from
        self._to = _to

    @staticmethod
    def from_json(json: str) -> CredentialOffer:
        bridge = BloockBridge()

        req = CredentialOfferFromJsonRequest(
            config_data=Config.default(),
            json=json
        )

        res = bridge.identity().CredentialOfferFromJson(req)
        if res.error != Error():
            raise Exception(res.error.message)

        return CredentialOffer.from_proto(res.credential_offer)

    def to_json(self) -> str:
        bridge = BloockBridge()

        req = CredentialOfferToJsonRequest(
            config_data=Config.default(),
            credential_offer=self.to_proto()
        )

        res = bridge.identity().CredentialOfferToJson(req)
        if res.error != Error():
            raise Exception(res.error.message)

        return res.json

    @staticmethod
    def from_proto(c: proto.CredentialOffer) -> CredentialOffer:
        return CredentialOffer(
            thid=c.thid,
            body=CredentialOfferBody.from_proto(c.body),
            _to=c._to,
            _from=c._from
        )

    def to_proto(self) -> proto.CredentialOffer:
        return proto.CredentialOffer(
            thid=self.thid,
            body=self.body.to_proto(),
            _to=self._to,
            _from=self._from
        )
