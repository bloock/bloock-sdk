from __future__ import annotations
import datetime
from typing import List

from bloock._bridge import BloockBridge
from bloock._bridge.proto.config_pb2 import ConfigData
from bloock._bridge.proto.identity_v2_pb2 import CreateCredentialRequestV2
from bloock._bridge.proto.shared_pb2 import Error
from bloock.entity.identity_v2.boolean_attribute import BooleanAttribute
from bloock.entity.identity_v2.date_attribute import DateAttribute
from bloock.entity.identity_v2.datetime_attribute import DatetimeAttribute
from bloock.entity.identity_v2.string_attribute import StringAttribute
from bloock.entity.identity_v2.integer_attribute import IntegerAttribute
from bloock.entity.identity_v2.decimal_attribute import DecimalAttribute
from bloock.entity.authenticity.signer import Signer
from bloock.entity.identity_v2.credential_receipt import CredentialReceipt


class CredentialBuilder:
    def __init__(self, schema_id: str, issuer_did: str, holder_did: str, expiration: int, version: int, config_data: ConfigData) -> None:
        self.schema_id = schema_id
        self.issuer_did = issuer_did
        self.holder_did = holder_did
        self.expiration = expiration
        self.version = version
        self.signer = None
        self.config_data = config_data

        self.string_attributes = []
        self.integer_attributes = []
        self.decimal_attributes = []
        self.boolean_attributes = []
        self.date_attributes = []
        self.datetime_attributes = []

    def with_string_attribute(self, key: str, value: str) -> CredentialBuilder:
        self.string_attributes.append(StringAttribute(key, value))
        return self

    def with_integer_attribute(self, key: str, value: int) -> CredentialBuilder:
        self.integer_attributes.append(IntegerAttribute(key, value))
        return self

    def with_decimal_attribute(self, key: str, value: float) -> CredentialBuilder:
        self.decimal_attributes.append(DecimalAttribute(key, value))
        return self

    def with_boolean_attribute(self, key: str, value: bool) -> CredentialBuilder:
        self.boolean_attributes.append(BooleanAttribute(key, value))
        return self

    def with_date_attribute(self, key: str, value: datetime.date) -> CredentialBuilder:
        formatted_date = value.strftime("%Y-%m-%d")
        self.date_attributes.append(DateAttribute(key, formatted_date))
        return self

    def with_datetime_attribute(self, key: str, value: datetime.datetime) -> CredentialBuilder:
        rfc3339_string = value.strftime("%Y-%m-%dT%H:%M:%SZ")
        self.datetime_attributes.append(DatetimeAttribute(key, rfc3339_string))
        return self

    def with_signer(self, signer: Signer) -> CredentialBuilder:
        self.signer = signer.to_proto()
        return self

    def build(self) -> CredentialReceipt:
        bridge = BloockBridge()

        string_attributes = []
        for a in self.string_attributes:
            string_attributes.append(a.to_proto())

        integer_attributes = []
        for a in self.integer_attributes:
            integer_attributes.append(a.to_proto())

        decimal_attributes = []
        for a in self.decimal_attributes:
            decimal_attributes.append(a.to_proto())

        boolean_attributes = []
        for a in self.boolean_attributes:
            boolean_attributes.append(a.to_proto())

        date_attributes = []
        for a in self.date_attributes:
            date_attributes.append(a.to_proto())

        datetime_attributes = []
        for a in self.datetime_attributes:
            datetime_attributes.append(a.to_proto())

        req = CreateCredentialRequestV2(
            config_data=self.config_data,
            schema_id=self.schema_id,
            issuer_did=self.issuer_did,
            holder_did=self.holder_did,
            version=self.version,
            expiration=self.expiration,
            string_attributes=string_attributes,
            integer_attributes=integer_attributes,
            decimal_attributes=decimal_attributes,
            boolean_attributes=boolean_attributes,
            date_attributes=date_attributes,
            datetime_attributes=datetime_attributes,
            signer=self.signer,
        )

        res = bridge.identity_v2().CreateCredential(req)
        if res.error != Error():
            raise Exception(res.error.message)

        return CredentialReceipt.from_proto(res.credential_receipt)
