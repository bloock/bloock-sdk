# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: bloock_integrity_entities.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x1f\x62loock_integrity_entities.proto\x12\x06\x62loock\"p\n\x06\x41nchor\x12\n\n\x02id\x18\x01 \x01(\x03\x12\x13\n\x0b\x62lock_roots\x18\x02 \x03(\t\x12\'\n\x08networks\x18\x03 \x03(\x0b\x32\x15.bloock.AnchorNetwork\x12\x0c\n\x04root\x18\x04 \x01(\t\x12\x0e\n\x06status\x18\x05 \x01(\t\"Y\n\rAnchorNetwork\x12\x0c\n\x04name\x18\x01 \x01(\t\x12\r\n\x05state\x18\x02 \x01(\t\x12\x0f\n\x07tx_hash\x18\x03 \x01(\t\x12\x11\n\x04root\x18\x04 \x01(\tH\x00\x88\x01\x01\x42\x07\n\x05_root\"j\n\x05Proof\x12\x0e\n\x06leaves\x18\x01 \x03(\t\x12\r\n\x05nodes\x18\x02 \x03(\t\x12\r\n\x05\x64\x65pth\x18\x03 \x01(\t\x12\x0e\n\x06\x62itmap\x18\x04 \x01(\t\x12#\n\x06\x61nchor\x18\x05 \x01(\x0b\x32\x13.bloock.ProofAnchor\"g\n\x0bProofAnchor\x12\x11\n\tanchor_id\x18\x01 \x01(\x03\x12\'\n\x08networks\x18\x02 \x03(\x0b\x32\x15.bloock.AnchorNetwork\x12\x0c\n\x04root\x18\x03 \x01(\t\x12\x0e\n\x06status\x18\x04 \x01(\t\"O\n\rRecordReceipt\x12\x0e\n\x06\x61nchor\x18\x01 \x01(\x03\x12\x0e\n\x06\x63lient\x18\x02 \x01(\t\x12\x0e\n\x06record\x18\x03 \x01(\t\x12\x0e\n\x06status\x18\x04 \x01(\tBW\n\x1b\x63om.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protob\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'bloock_integrity_entities_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'\n\033com.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto'
  _ANCHOR._serialized_start=43
  _ANCHOR._serialized_end=155
  _ANCHORNETWORK._serialized_start=157
  _ANCHORNETWORK._serialized_end=246
  _PROOF._serialized_start=248
  _PROOF._serialized_end=354
  _PROOFANCHOR._serialized_start=356
  _PROOFANCHOR._serialized_end=459
  _RECORDRECEIPT._serialized_start=461
  _RECORDRECEIPT._serialized_end=540
# @@protoc_insertion_point(module_scope)
