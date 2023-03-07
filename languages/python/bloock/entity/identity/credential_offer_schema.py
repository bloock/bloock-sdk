from __future__ import annotations

from bloock._bridge import BloockBridge
from bloock._bridge.proto.config_pb2 import ConfigData
from bloock._bridge.proto.identity_pb2 import CreateCredentialOfferRequest
from bloock._bridge.proto.shared_pb2 import Error
from bloock.entity.identity.boolean_attribute import BooleanAttribute
from bloock.entity.identity.credential_offer import CredentialOffer
from bloock.entity.identity.date_attribute import DateAttribute
from bloock.entity.identity.datetime_attribute import DatetimeAttribute
from bloock.entity.identity.multichoice_attribute import MultichoiceAttribute
from bloock.entity.identity.number_attribute import NumberAttribute


class CredentialOfferBuilder:
    def __init__(self, schema_id: str, holder_key: str, config_data: ConfigData) -> None:
        self.schema_id = schema_id
        self.holder_key = holder_key
        self.config_data = config_data

        self.boolean_attributes = []
        self.date_attributes = []
        self.datetime_attributes = []
        self.multichoice_attributes = []
        self.number_attributes = []

    def with_boolean_attribute(self, key: str, value: bool) -> CredentialOfferBuilder:
        self.boolean_attributes.append(BooleanAttribute(key, value))
        return self

    def with_date_attribute(self, key: str, value: int) -> CredentialOfferBuilder:
        self.date_attributes.append(DateAttribute(key, value))
        return self

    def with_datetime_attribute(self, key: str, value: int) -> CredentialOfferBuilder:
        self.datetime_attributes.append(DatetimeAttribute(key, value))
        return self

    def with_multichoice_attribute(self, key: str, value: str) -> CredentialOfferBuilder:
        self.multichoice_attributes.append(MultichoiceAttribute(key, value))
        return self

    def with_number_attribute(self, key: str, value: int) -> CredentialOfferBuilder:
        self.number_attributes.append(NumberAttribute(key, value))
        return self

    def build(self) -> CredentialOffer:
        bridge = BloockBridge()

        boolean_attributes = []
        for a in self.boolean_attributes:
            boolean_attributes.append(a.to_proto())

        date_attributes = []
        for a in self.date_attributes:
            date_attributes.append(a.to_proto())

        datetime_attributes = []
        for a in self.datetime_attributes:
            datetime_attributes.append(a.to_proto())

        multichoice_attributes = []
        for a in self.multichoice_attributes:
            multichoice_attributes.append(a.to_proto())

        number_attributes = []
        for a in self.number_attributes:
            number_attributes.append(a.to_proto())

        req = CreateCredentialOfferRequest(
            config_data=self.config_data,
            schema_id=self.schema_id,
            holder_key=self.holder_key,
            boolean_attributes=boolean_attributes,
            date_attributes=date_attributes,
            datetime_attributes=datetime_attributes,
            multichoice_attributes=multichoice_attributes,
            number_attributes=number_attributes
        )

        res = bridge.identity().CreateCredentialOffer(req)
        if res.error != Error():
            raise Exception(res.error.message)

        return CredentialOffer.from_proto(res.credential_offer)
