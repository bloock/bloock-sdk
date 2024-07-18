# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: bloock_encryption_entities.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from . import bloock_keys_entities_pb2 as bloock__keys__entities__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n bloock_encryption_entities.proto\x12\x06\x62loock\x1a\x1a\x62loock_keys_entities.proto\"\xee\x02\n\tEncrypter\x12(\n\tlocal_key\x18\x01 \x01(\x0b\x32\x10.bloock.LocalKeyH\x00\x88\x01\x01\x12,\n\x0bmanaged_key\x18\x02 \x01(\x0b\x32\x12.bloock.ManagedKeyH\x01\x88\x01\x01\x12\x38\n\x11local_certificate\x18\x03 \x01(\x0b\x32\x18.bloock.LocalCertificateH\x02\x88\x01\x01\x12<\n\x13managed_certificate\x18\x04 \x01(\x0b\x32\x1a.bloock.ManagedCertificateH\x03\x88\x01\x01\x12\x32\n\x0e\x61\x63\x63\x65ss_control\x18\x06 \x01(\x0b\x32\x15.bloock.AccessControlH\x04\x88\x01\x01\x42\x0c\n\n_local_keyB\x0e\n\x0c_managed_keyB\x14\n\x12_local_certificateB\x16\n\x14_managed_certificateB\x11\n\x0f_access_control*?\n\rEncryptionAlg\x12\x0b\n\x07\x41\x32\x35\x36GCM\x10\x00\x12\r\n\tA256GCM_M\x10\x01\x12\x07\n\x03RSA\x10\x02\x12\t\n\x05RSA_M\x10\x03\x42W\n\x1b\x63om.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protob\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'bloock_encryption_entities_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'\n\033com.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto'
  _ENCRYPTIONALG._serialized_start=441
  _ENCRYPTIONALG._serialized_end=504
  _ENCRYPTER._serialized_start=73
  _ENCRYPTER._serialized_end=439
# @@protoc_insertion_point(module_scope)