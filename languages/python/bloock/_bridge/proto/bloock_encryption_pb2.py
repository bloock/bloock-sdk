# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: bloock_encryption.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from . import bloock_record_entities_pb2 as bloock__record__entities__pb2
from . import bloock_encryption_entities_pb2 as bloock__encryption__entities__pb2
from . import bloock_shared_pb2 as bloock__shared__pb2
from . import bloock_config_pb2 as bloock__config__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x17\x62loock_encryption.proto\x12\x06\x62loock\x1a\x1c\x62loock_record_entities.proto\x1a bloock_encryption_entities.proto\x1a\x13\x62loock_shared.proto\x1a\x13\x62loock_config.proto\"\x7f\n\x0e\x45ncryptRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x1e\n\x06record\x18\x02 \x01(\x0b\x32\x0e.bloock.Record\x12$\n\tencrypter\x18\x03 \x01(\x0b\x32\x11.bloock.Encrypter\"^\n\x0f\x45ncryptResponse\x12\x1e\n\x06record\x18\x01 \x01(\x0b\x32\x0e.bloock.Record\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"\x7f\n\x0e\x44\x65\x63ryptRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x1e\n\x06record\x18\x02 \x01(\x0b\x32\x0e.bloock.Record\x12$\n\tdecrypter\x18\x03 \x01(\x0b\x32\x11.bloock.Encrypter\"^\n\x0f\x44\x65\x63ryptResponse\x12\x1e\n\x06record\x18\x01 \x01(\x0b\x32\x0e.bloock.Record\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"_\n\x14\x45ncryptionAlgRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x1e\n\x06record\x18\x02 \x01(\x0b\x32\x0e.bloock.Record\"h\n\x15\x45ncryptionAlgResponse\x12\"\n\x03\x61lg\x18\x01 \x01(\x0e\x32\x15.bloock.EncryptionAlg\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error2\xdc\x01\n\x11\x45ncryptionService\x12:\n\x07\x45ncrypt\x12\x16.bloock.EncryptRequest\x1a\x17.bloock.EncryptResponse\x12:\n\x07\x44\x65\x63rypt\x12\x16.bloock.DecryptRequest\x1a\x17.bloock.DecryptResponse\x12O\n\x10GetEncryptionAlg\x12\x1c.bloock.EncryptionAlgRequest\x1a\x1d.bloock.EncryptionAlgResponseBW\n\x1b\x63om.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protob\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'bloock_encryption_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'\n\033com.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto'
  _ENCRYPTREQUEST._serialized_start=141
  _ENCRYPTREQUEST._serialized_end=268
  _ENCRYPTRESPONSE._serialized_start=270
  _ENCRYPTRESPONSE._serialized_end=364
  _DECRYPTREQUEST._serialized_start=366
  _DECRYPTREQUEST._serialized_end=493
  _DECRYPTRESPONSE._serialized_start=495
  _DECRYPTRESPONSE._serialized_end=589
  _ENCRYPTIONALGREQUEST._serialized_start=591
  _ENCRYPTIONALGREQUEST._serialized_end=686
  _ENCRYPTIONALGRESPONSE._serialized_start=688
  _ENCRYPTIONALGRESPONSE._serialized_end=792
  _ENCRYPTIONSERVICE._serialized_start=795
  _ENCRYPTIONSERVICE._serialized_end=1015
# @@protoc_insertion_point(module_scope)
