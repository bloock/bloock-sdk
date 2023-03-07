from __future__ import annotations

from typing import List

from bloock._bridge import BloockBridge
from bloock._bridge.proto.config_pb2 import ConfigData
from bloock._bridge.proto.identity_pb2 import BuildSchemaRequest
from bloock._bridge.proto.shared_pb2 import Error
from bloock.entity.identity.boolean_attribute_descriptor import BooleanAttributeDescriptor
from bloock.entity.identity.date_attribute_descriptor import DateAttributeDescriptor
from bloock.entity.identity.datetime_attribute_descriptor import DatetimeAttributeDescriptor
from bloock.entity.identity.multichoice_attribute_descriptor import MultichoiceAttributeDescriptor
from bloock.entity.identity.number_attribute_descriptor import NumberAttributeDescriptor
from bloock.entity.identity.schema import Schema


class SchemaBuilder:
    def __init__(self, display_name: str, technical_name: str, config_data: ConfigData) -> None:
        self.display_name = display_name
        self.technical_name = technical_name
        self.config_data = config_data

        self.boolean_attributes = []
        self.date_attributes = []
        self.datetime_attributes = []
        self.multichoice_attributes = []
        self.number_attributes = []

    def add_boolean_attribute(self, name: str, technical_name: str, description: str) -> SchemaBuilder:
        self.boolean_attributes.append(BooleanAttributeDescriptor(name, technical_name, description))
        return self

    def add_date_attribute(self, name: str, technical_name: str, description: str) -> SchemaBuilder:
        self.date_attributes.append(DateAttributeDescriptor(name, technical_name, description))
        return self

    def add_datetime_attribute(self, name: str, technical_name: str, description: str) -> SchemaBuilder:
        self.datetime_attributes.append(DatetimeAttributeDescriptor(name, technical_name, description))
        return self

    def add_multichoice_attribute(self, name: str, technical_name: str, allowed_values: List[str],
                                  description: str) -> SchemaBuilder:
        self.multichoice_attributes.append(
            MultichoiceAttributeDescriptor(name, technical_name, allowed_values, description))
        return self

    def add_number_attribute(self, name: str, technical_name: str, description: str) -> SchemaBuilder:
        self.number_attributes.append(NumberAttributeDescriptor(name, technical_name, description))
        return self

    def build(self) -> Schema:
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

        req = BuildSchemaRequest(
            config_data=self.config_data,
            display_name=self.display_name,
            technical_name=self.technical_name,
            boolean_attributes=boolean_attributes,
            date_attributes=date_attributes,
            datetime_attributes=datetime_attributes,
            multichoice_attributes=multichoice_attributes,
            number_attributes=number_attributes
        )

        res = bridge.identity().BuildSchema(req)
        if res.error != Error():
            raise Exception(res.error.message)

        return Schema.from_proto(res.schema)
