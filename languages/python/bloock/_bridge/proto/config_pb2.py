# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: config.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database

# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(
    b'\n\x0c\x63onfig.proto\x12\x06\x62loock"\xc2\x01\n\nConfigData\x12%\n\x06\x63onfig\x18\x01 \x01(\x0b\x32\x15.bloock.Configuration\x12?\n\x0fnetworks_config\x18\x02 \x03(\x0b\x32&.bloock.ConfigData.NetworksConfigEntry\x1aL\n\x13NetworksConfigEntry\x12\x0b\n\x03key\x18\x01 \x01(\x05\x12$\n\x05value\x18\x02 \x01(\x0b\x32\x15.bloock.NetworkConfig:\x02\x38\x01"\xd0\x01\n\rConfiguration\x12\x0c\n\x04host\x18\x01 \x01(\t\x12\x0f\n\x07\x61pi_key\x18\x02 \x01(\t\x12$\n\x1cwait_message_interval_factor\x18\x03 \x01(\x05\x12%\n\x1dwait_message_interval_default\x18\x04 \x01(\x05\x12\x1a\n\x12key_type_algorithm\x18\x05 \x01(\t\x12\x1a\n\x12\x65lliptic_curve_key\x18\x06 \x01(\t\x12\x1b\n\x13signature_algorithm\x18\x07 \x01(\t"S\n\rNetworkConfig\x12\x17\n\x0f\x43ontractAddress\x18\x01 \x01(\t\x12\x13\n\x0b\x43ontractAbi\x18\x02 \x01(\t\x12\x14\n\x0cHttpProvider\x18\x03 \x01(\t*n\n\x07Network\x12\x14\n\x10\x45THEREUM_MAINNET\x10\x00\x12\x14\n\x10\x45THEREUM_RINKEBY\x10\x01\x12\x13\n\x0f\x45THEREUM_GOERLI\x10\x02\x12\x10\n\x0cGNOSIS_CHAIN\x10\x03\x12\x10\n\x0c\x42LOOCK_CHAIN\x10\x04\x42X\n\x1c\x62loock.sdk.java.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protob\x06proto3'
)

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, "config_pb2", globals())
if _descriptor._USE_C_DESCRIPTORS == False:

    DESCRIPTOR._options = None
    DESCRIPTOR._serialized_options = b"\n\034bloock.sdk.java.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
    _CONFIGDATA_NETWORKSCONFIGENTRY._options = None
    _CONFIGDATA_NETWORKSCONFIGENTRY._serialized_options = b"8\001"
    _NETWORK._serialized_start = 517
    _NETWORK._serialized_end = 627
    _CONFIGDATA._serialized_start = 25
    _CONFIGDATA._serialized_end = 219
    _CONFIGDATA_NETWORKSCONFIGENTRY._serialized_start = 143
    _CONFIGDATA_NETWORKSCONFIGENTRY._serialized_end = 219
    _CONFIGURATION._serialized_start = 222
    _CONFIGURATION._serialized_end = 430
    _NETWORKCONFIG._serialized_start = 432
    _NETWORKCONFIG._serialized_end = 515
# @@protoc_insertion_point(module_scope)
