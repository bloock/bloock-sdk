# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: authenticity_entities.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from . import keys_entities_pb2 as keys__entities__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x1b\x61uthenticity_entities.proto\x12\x06\x62loock\x1a\x13keys_entities.proto\"\xce\x02\n\x06Signer\x12(\n\tlocal_key\x18\x01 \x01(\x0b\x32\x10.bloock.LocalKeyH\x00\x88\x01\x01\x12,\n\x0bmanaged_key\x18\x02 \x01(\x0b\x32\x12.bloock.ManagedKeyH\x01\x88\x01\x01\x12\x38\n\x11local_certificate\x18\x03 \x01(\x0b\x32\x18.bloock.LocalCertificateH\x02\x88\x01\x01\x12<\n\x13managed_certificate\x18\x04 \x01(\x0b\x32\x1a.bloock.ManagedCertificateH\x03\x88\x01\x01\x12\x18\n\x0b\x63ommon_name\x18\x05 \x01(\tH\x04\x88\x01\x01\x42\x0c\n\n_local_keyB\x0e\n\x0c_managed_keyB\x14\n\x12_local_certificateB\x16\n\x14_managed_certificateB\x0e\n\x0c_common_name\"p\n\tSignature\x12\x11\n\tsignature\x18\x01 \x01(\t\x12\x0b\n\x03\x61lg\x18\x02 \x01(\t\x12\x0b\n\x03kid\x18\x03 \x01(\t\x12\x14\n\x0cmessage_hash\x18\x04 \x01(\t\x12\x14\n\x07subject\x18\x05 \x01(\tH\x00\x88\x01\x01\x42\n\n\x08_subjectBW\n\x1b\x63om.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protob\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'authenticity_entities_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'\n\033com.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto'
  _SIGNER._serialized_start=61
  _SIGNER._serialized_end=395
  _SIGNATURE._serialized_start=397
  _SIGNATURE._serialized_end=509
# @@protoc_insertion_point(module_scope)
