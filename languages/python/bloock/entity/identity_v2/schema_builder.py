from __future__ import annotations

from typing import List

from bloock._bridge import BloockBridge
from bloock._bridge.proto.config_pb2 import ConfigData
from bloock._bridge.proto.identity_v2_pb2 import BuildSchemaRequestV2
from bloock._bridge.proto.shared_pb2 import Error
from bloock.entity.identity_v2.boolean_attribute_descriptor import BooleanAttributeDescriptor
from bloock.entity.identity_v2.date_attribute_descriptor import DateAttributeDescriptor
from bloock.entity.identity_v2.datetime_attribute_descriptor import DatetimeAttributeDescriptor
from bloock.entity.identity_v2.string_attribute_descriptor import StringAttributeDescriptor
from bloock.entity.identity_v2.integer_attribute_descriptor import IntegerAttributeDescriptor
from bloock.entity.identity_v2.schema import Schema
from bloock.entity.identity_v2.decimal_attribute_descriptor import DecimalAttributeDescriptor
from bloock.entity.identity_v2.string_enum_attribute_descriptor import StringEnumAttributeDescriptor
from bloock.entity.identity_v2.integer_enum_attribute_descriptor import IntegerEnumAttributeDescriptor
from bloock.entity.identity_v2.decimal_enum_attribute_descriptor import DecimalEnumAttributeDescriptor

class SchemaBuilder:
    def __init__(self, display_name: str, schema_type: str, version: str, description: str, issuer_did: str, config_data: ConfigData) -> None:
        self.display_name = display_name
        self.schema_type = schema_type
        self.version = version
        self.description = description
        self.issuer_did = issuer_did
        self.config_data = config_data

        self.string_attributes = []
        self.integer_attributes = []
        self.decimal_attributes = []
        self.boolean_attributes = []
        self.date_attributes = []
        self.datetime_attributes = []
        self.string_enum_attributes = []
        self.integer_enum_attributes = []
        self.decimal_enum_attributes = []
    
    def add_string_attribute(self, name: str, technical_name: str, description: str, required: bool) -> SchemaBuilder:
        self.string_attributes.append(
            StringAttributeDescriptor(name, technical_name, description, required))
        return self

    def add_integer_attribute(self, name: str, technical_name: str, description: str, required: bool) -> SchemaBuilder:
        self.integer_attributes.append(IntegerAttributeDescriptor(name, technical_name, description, required))
        return self
    
    def add_decimal_attribute(self, name: str, technical_name: str, description: str, required: bool) -> SchemaBuilder:
        self.decimal_attributes.append(DecimalAttributeDescriptor(name, technical_name, description, required))
        return self

    def add_boolean_attribute(self, name: str, technical_name: str, description: str, required: bool) -> SchemaBuilder:
        self.boolean_attributes.append(BooleanAttributeDescriptor(name, technical_name, description, required))
        return self

    def add_date_attribute(self, name: str, technical_name: str, description: str, required: bool) -> SchemaBuilder:
        self.date_attributes.append(DateAttributeDescriptor(name, technical_name, description, required))
        return self

    def add_string_enum_attribute(self, name: str, technical_name: str, description: str, required: bool, enumeration: List[str]) -> SchemaBuilder:
        self.string_enum_attributes.append(StringEnumAttributeDescriptor(name, technical_name, description, required, enumeration))
        return self
    
    def add_integer_enum_attribute(self, name: str, technical_name: str, description: str, required: bool, enumeration: List[int]) -> SchemaBuilder:
        self.integer_enum_attributes.append(IntegerEnumAttributeDescriptor(name, technical_name, description, required, enumeration))
        return self
    
    def add_decimal_enum_attribute(self, name: str, technical_name: str, description: str, required: bool, enumeration: List[float]) -> SchemaBuilder:
        self.decimal_enum_attributes.append(DecimalEnumAttributeDescriptor(name, technical_name, description, required, enumeration))
        return self
    
    def add_datetime_attribute(self, name: str, technical_name: str, description: str, required: bool) -> SchemaBuilder:
        self.datetime_attributes.append(DatetimeAttributeDescriptor(name, technical_name, description, required))
        return self

    def build(self) -> Schema:
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

        string_enum_attributes = []
        for a in self.string_enum_attributes:
            string_enum_attributes.append(a.to_proto())

        integer_enum_attributes = []
        for a in self.integer_enum_attributes:
            integer_enum_attributes.append(a.to_proto())

        decimal_enum_attributes = []
        for a in self.decimal_enum_attributes:
            decimal_enum_attributes.append(a.to_proto())

        req = BuildSchemaRequestV2(
            config_data=self.config_data,
            display_name=self.display_name,
            schema_type=self.schema_type,
            version=self.version,
            description=self.description,
            issuer_did=self.issuer_did,
            string_attributes=string_attributes,
            integer_attributes=integer_attributes,
            decimal_attributes=decimal_attributes,
            boolean_attributes=boolean_attributes,
            date_attributes=date_attributes,
            datetime_attributes=datetime_attributes,
            string_enum_attributes=string_enum_attributes,
            integer_enum_attributes=integer_enum_attributes,
            decimal_enum_attributes=decimal_enum_attributes,
        )

        res = bridge.identity_v2().BuildSchema(req)
        if res.error != Error():
            raise Exception(res.error.message)

        return Schema.from_proto(res.schema)
