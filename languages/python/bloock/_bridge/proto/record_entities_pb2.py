# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: record_entities.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder

# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()

DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(
    b'\n\x15record_entities.proto\x12\x06\x62loock\x1a\x0c\x63onfig.proto\"\x1a\n\x0cRecordHeader\x12\n\n\x02ty\x18\x01 \x01(\t\"e\n\x06Record\x12,\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigDataH\x00\x88\x01\x01\x12\x0f\n\x07payload\x18\x02 \x01(\x0c\x12\x0c\n\x04hash\x18\x03 \x01(\tB\x0e\n\x0c_config_data*Y\n\x0bRecordTypes\x12\n\n\x06STRING\x10\x00\x12\x07\n\x03HEX\x10\x01\x12\x08\n\x04JSON\x10\x02\x12\t\n\x05\x42YTES\x10\x03\x12\x08\n\x04\x46ILE\x10\x04\x12\n\n\x06RECORD\x10\x05\x12\n\n\x06LOADER\x10\x06\x42W\n\x1b\x63om.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protob\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'record_entities_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:
    DESCRIPTOR._options = None
    DESCRIPTOR._serialized_options = b'\n\033com.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto'
    _RECORDTYPES._serialized_start = 178
    _RECORDTYPES._serialized_end = 267
    _RECORDHEADER._serialized_start = 47
    _RECORDHEADER._serialized_end = 73
    _RECORD._serialized_start = 75
    _RECORD._serialized_end = 176
# @@protoc_insertion_point(module_scope)
