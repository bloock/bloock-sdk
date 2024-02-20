from __future__ import annotations
import datetime

from bloock._bridge import BloockBridge
from bloock._bridge.proto.config_pb2 import ConfigData
from bloock._bridge.proto.identity_pb2 import CreateCredentialRequest
from bloock._bridge.proto.shared_pb2 import Error
from bloock.entity.identity.boolean_attribute import BooleanAttribute
from bloock.entity.identity.date_attribute import DateAttribute
from bloock.entity.identity.datetime_attribute import DatetimeAttribute
from bloock.entity.identity.issuer import Issuer
from bloock.entity.identity.string_attribute import StringAttribute
from bloock.entity.identity.integer_attribute import IntegerAttribute
from bloock.entity.identity.decimal_attribute import DecimalAttribute
from bloock.entity.identity.credential_receipt import CredentialReceipt


class CredentialBuilder:
    """
    Helps construct credentials by specifying various attributes.
    """
    def __init__(self, issuer: Issuer, schema_id: str, holder_did: str, expiration: int, version: int, config_data: ConfigData) -> None:
        """
        Creates a new CredentialBuilder instance with the specified parameters.
        :type config_data: object
        :type version: object
        :type expiration: object
        :type holder_did: object
        :type schema_id: object
        :type issuer: object
        :rtype: object
        """
        self.schema_id = schema_id
        self.holder_did = holder_did
        self.expiration = expiration
        self.version = version
        self.key = issuer.key.to_proto()
        self.config_data = config_data

        self.string_attributes = []
        self.integer_attributes = []
        self.decimal_attributes = []
        self.boolean_attributes = []
        self.date_attributes = []
        self.datetime_attributes = []

    def with_string_attribute(self, key: str, value: str) -> CredentialBuilder:
        """
        Adds a string attribute to the CredentialBuilder.
        :type value: object
        :type key: object
        :rtype: object
        """
        self.string_attributes.append(StringAttribute(key, value))
        return self

    def with_integer_attribute(self, key: str, value: int) -> CredentialBuilder:
        """
        Adds an integer attribute to the CredentialBuilder.
        :type value: object
        :type key: object
        :rtype: object
        """
        self.integer_attributes.append(IntegerAttribute(key, value))
        return self

    def with_decimal_attribute(self, key: str, value: float) -> CredentialBuilder:
        """
        Adds a decimal attribute to the CredentialBuilder.
        :type value: object
        :type key: object
        :rtype: object
        """
        self.decimal_attributes.append(DecimalAttribute(key, value))
        return self

    def with_boolean_attribute(self, key: str, value: bool) -> CredentialBuilder:
        """
        Adds a boolean attribute to the CredentialBuilder.
        :type value: object
        :type key: object
        :rtype: object
        """
        self.boolean_attributes.append(BooleanAttribute(key, value))
        return self

    def with_date_attribute(self, key: str, value: datetime.date) -> CredentialBuilder:
        """
        Adds a date attribute to the CredentialBuilder.
        :type value: object
        :type key: object
        :rtype: object
        """
        formatted_date = value.strftime("%Y-%m-%d")
        self.date_attributes.append(DateAttribute(key, formatted_date))
        return self

    def with_datetime_attribute(self, key: str, value: datetime.datetime) -> CredentialBuilder:
        """
        Adds a datetime attribute to the CredentialBuilder.
        :type value: object
        :type key: object
        :rtype: object
        """
        rfc3339_string = value.strftime("%Y-%m-%dT%H:%M:%SZ")
        self.datetime_attributes.append(DatetimeAttribute(key, rfc3339_string))
        return self

    def build(self) -> CredentialReceipt:
        """
        Creates and returns a Credential using the specified attributes.
        :rtype: object
        """
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

        req = CreateCredentialRequest(
            config_data=self.config_data,
            schema_id=self.schema_id,
            holder_did=self.holder_did,
            version=self.version,
            expiration=self.expiration,
            string_attributes=string_attributes,
            integer_attributes=integer_attributes,
            decimal_attributes=decimal_attributes,
            boolean_attributes=boolean_attributes,
            date_attributes=date_attributes,
            datetime_attributes=datetime_attributes,
            key=self.key,
        )

        res = bridge.identity().CreateCredential(req)
        if res.error != Error():
            raise Exception(res.error.message)

        return CredentialReceipt.from_proto(res.credential_receipt)
