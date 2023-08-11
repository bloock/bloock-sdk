# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: keys_entities.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x13keys_entities.proto\x12\x06\x62loock\"d\n\x08LocalKey\x12\x0b\n\x03key\x18\x01 \x01(\t\x12!\n\x08key_type\x18\x02 \x01(\x0e\x32\x0f.bloock.KeyType\x12\x18\n\x0bprivate_key\x18\x03 \x01(\tH\x00\x88\x01\x01\x42\x0e\n\x0c_private_key\"\xa9\x01\n\x10ManagedKeyParams\x12.\n\nprotection\x18\x01 \x01(\x0e\x32\x1a.bloock.KeyProtectionLevel\x12!\n\x08key_type\x18\x02 \x01(\x0e\x32\x0f.bloock.KeyType\x12\x11\n\x04name\x18\x03 \x01(\tH\x00\x88\x01\x01\x12\x17\n\nexpiration\x18\x04 \x01(\x03H\x01\x88\x01\x01\x42\x07\n\x05_nameB\r\n\x0b_expiration\"\x9a\x01\n\nManagedKey\x12\n\n\x02id\x18\x01 \x01(\t\x12\x0b\n\x03key\x18\x02 \x01(\t\x12.\n\nprotection\x18\x03 \x01(\x0e\x32\x1a.bloock.KeyProtectionLevel\x12!\n\x08key_type\x18\x04 \x01(\x0e\x32\x0f.bloock.KeyType\x12\x0c\n\x04name\x18\x05 \x01(\t\x12\x12\n\nexpiration\x18\x06 \x01(\x03*^\n\x07KeyType\x12\x0b\n\x07\x45\x63P256k\x10\x00\x12\x0b\n\x07Rsa2048\x10\x01\x12\x0b\n\x07Rsa3072\x10\x02\x12\x0b\n\x07Rsa4096\x10\x03\x12\n\n\x06\x41\x65s128\x10\x04\x12\n\n\x06\x41\x65s256\x10\x05\x12\x07\n\x03\x42jj\x10\x06*+\n\x12KeyProtectionLevel\x12\x0c\n\x08SOFTWARE\x10\x00\x12\x07\n\x03HSM\x10\x01\x42W\n\x1b\x63om.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protob\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'keys_entities_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'\n\033com.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto'
  _KEYTYPE._serialized_start=462
  _KEYTYPE._serialized_end=556
  _KEYPROTECTIONLEVEL._serialized_start=558
  _KEYPROTECTIONLEVEL._serialized_end=601
  _LOCALKEY._serialized_start=31
  _LOCALKEY._serialized_end=131
  _MANAGEDKEYPARAMS._serialized_start=134
  _MANAGEDKEYPARAMS._serialized_end=303
  _MANAGEDKEY._serialized_start=306
  _MANAGEDKEY._serialized_end=460
# @@protoc_insertion_point(module_scope)
