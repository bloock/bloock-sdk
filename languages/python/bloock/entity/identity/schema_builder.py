from __future__ import annotations

from typing import List

from bloock._bridge import BloockBridge
from bloock._bridge.proto.config_pb2 import ConfigData
from bloock._bridge.proto.identity_pb2 import BuildSchemaRequest
from bloock._bridge.proto.shared_pb2 import Error
from bloock.entity.identity.boolean_attribute_descriptor import BooleanAttributeDescriptor
from bloock.entity.identity.date_attribute_descriptor import DateAttributeDescriptor
from bloock.entity.identity.datetime_attribute_descriptor import DatetimeAttributeDescriptor
from bloock.entity.identity.string_attribute_descriptor import StringAttributeDescriptor
from bloock.entity.identity.integer_attribute_descriptor import IntegerAttributeDescriptor
from bloock.entity.identity.schema import Schema
from bloock.entity.identity.decimal_attribute_descriptor import DecimalAttributeDescriptor
from bloock.entity.identity.string_enum_attribute_descriptor import StringEnumAttributeDescriptor
from bloock.entity.identity.integer_enum_attribute_descriptor import IntegerEnumAttributeDescriptor
from bloock.entity.identity.decimal_enum_attribute_descriptor import DecimalEnumAttributeDescriptor


class SchemaBuilder:
    """
    Is a builder pattern for constructing schema instances.
    """
    def __init__(self, display_name: str, schema_type: str, version: str, description: str, config_data: ConfigData) -> None:
        """
        Creates a new instance of SchemaBuilder with initial values.
        :type config_data: object
        :type description: object
        :type version: object
        :type schema_type: object
        :type display_name: object
        :rtype: object
        """
        self.display_name = display_name
        self.schema_type = schema_type
        self.version = version
        self.description = description
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
        """
        Adds a string attribute descriptor to the schema builder.
        :type required: object
        :type description: object
        :type technical_name: object
        :type name: object
        :rtype: object
        """
        self.string_attributes.append(
            StringAttributeDescriptor(name, technical_name, description, required))
        return self

    def add_integer_attribute(self, name: str, technical_name: str, description: str, required: bool) -> SchemaBuilder:
        """
        Adds an integer attribute descriptor to the schema builder.
        :type required: object
        :type description: object
        :type technical_name: object
        :type name: object
        :rtype: object
        """
        self.integer_attributes.append(IntegerAttributeDescriptor(
            name, technical_name, description, required))
        return self

    def add_decimal_attribute(self, name: str, technical_name: str, description: str, required: bool) -> SchemaBuilder:
        """
        Adds a decimal attribute descriptor to the schema builder.
        :type required: object
        :type description: object
        :type technical_name: object
        :type name: object
        :rtype: object
        """
        self.decimal_attributes.append(DecimalAttributeDescriptor(
            name, technical_name, description, required))
        return self

    def add_boolean_attribute(self, name: str, technical_name: str, description: str, required: bool) -> SchemaBuilder:
        """
        Adds a boolean attribute descriptor to the schema builder.
        :type required: object
        :type description: object
        :type technical_name: object
        :type name: object
        :rtype: object
        """
        self.boolean_attributes.append(BooleanAttributeDescriptor(
            name, technical_name, description, required))
        return self

    def add_date_attribute(self, name: str, technical_name: str, description: str, required: bool) -> SchemaBuilder:
        """
        Adds a date attribute descriptor to the schema builder.
        :type required: object
        :type description: object
        :type technical_name: object
        :type name: object
        :rtype: object
        """
        self.date_attributes.append(DateAttributeDescriptor(
            name, technical_name, description, required))
        return self

    def add_string_enum_attribute(self, name: str, technical_name: str, description: str, required: bool, enumeration: List[str]) -> SchemaBuilder:
        """
        Adds a string enum attribute descriptor to the schema builder.
        :type enumeration: object
        :type required: object
        :type description: object
        :type technical_name: object
        :type name: object
        :rtype: object
        """
        self.string_enum_attributes.append(StringEnumAttributeDescriptor(
            name, technical_name, description, required, enumeration))
        return self

    def add_integer_enum_attribute(self, name: str, technical_name: str, description: str, required: bool, enumeration: List[int]) -> SchemaBuilder:
        """
        Adds an integer enum attribute descriptor to the schema builder.
        :type enumeration: object
        :type required: object
        :type description: object
        :type technical_name: object
        :type name: object
        :rtype: object
        """
        self.integer_enum_attributes.append(IntegerEnumAttributeDescriptor(
            name, technical_name, description, required, enumeration))
        return self

    def add_decimal_enum_attribute(self, name: str, technical_name: str, description: str, required: bool, enumeration: List[float]) -> SchemaBuilder:
        """
        Adds a decimal enum attribute descriptor to the schema builder.
        :type enumeration: object
        :type required: object
        :type description: object
        :type technical_name: object
        :type name: object
        :rtype: object
        """
        self.decimal_enum_attributes.append(DecimalEnumAttributeDescriptor(
            name, technical_name, description, required, enumeration))
        return self

    def add_datetime_attribute(self, name: str, technical_name: str, description: str, required: bool) -> SchemaBuilder:
        """
        Adds a datetime attribute descriptor to the schema builder.
        :type required: object
        :type description: object
        :type technical_name: object
        :type name: object
        :rtype: object
        """
        self.datetime_attributes.append(DatetimeAttributeDescriptor(
            name, technical_name, description, required))
        return self

    def build(self) -> Schema:
        """
        Creates a schema using the configured attributes.
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

        string_enum_attributes = []
        for a in self.string_enum_attributes:
            string_enum_attributes.append(a.to_proto())

        integer_enum_attributes = []
        for a in self.integer_enum_attributes:
            integer_enum_attributes.append(a.to_proto())

        decimal_enum_attributes = []
        for a in self.decimal_enum_attributes:
            decimal_enum_attributes.append(a.to_proto())

        req = BuildSchemaRequest(
            config_data=self.config_data,
            display_name=self.display_name,
            schema_type=self.schema_type,
            version=self.version,
            description=self.description,
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

        res = bridge.identity().BuildSchema(req)
        if res.error != Error():
            raise Exception(res.error.message)

        return Schema.from_proto(res.schema)
