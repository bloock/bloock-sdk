# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: authenticity.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from . import authenticity_entities_pb2 as authenticity__entities__pb2
from . import record_entities_pb2 as record__entities__pb2
from . import shared_pb2 as shared__pb2
from . import config_pb2 as config__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x12\x61uthenticity.proto\x12\x06\x62loock\x1a\x1b\x61uthenticity_entities.proto\x1a\x15record_entities.proto\x1a\x0cshared.proto\x1a\x0c\x63onfig.proto\"v\n\x0bSignRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x1e\n\x06record\x18\x02 \x01(\x0b\x32\x0e.bloock.Record\x12\x1e\n\x06signer\x18\x03 \x01(\x0b\x32\x0e.bloock.Signer\"a\n\x0cSignResponse\x12$\n\tsignature\x18\x01 \x01(\x0b\x32\x11.bloock.Signature\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"X\n\rVerifyRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x1e\n\x06record\x18\x02 \x01(\x0b\x32\x0e.bloock.Record\"L\n\x0eVerifyResponse\x12\r\n\x05valid\x18\x01 \x01(\x08\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"_\n\x14GetSignaturesRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x1e\n\x06record\x18\x02 \x01(\x0b\x32\x0e.bloock.Record\"k\n\x15GetSignaturesResponse\x12%\n\nsignatures\x18\x01 \x03(\x0b\x32\x11.bloock.Signature\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error2\xcf\x01\n\x13\x41uthenticityService\x12\x31\n\x04Sign\x12\x13.bloock.SignRequest\x1a\x14.bloock.SignResponse\x12\x37\n\x06Verify\x12\x15.bloock.VerifyRequest\x1a\x16.bloock.VerifyResponse\x12L\n\rGetSignatures\x12\x1c.bloock.GetSignaturesRequest\x1a\x1d.bloock.GetSignaturesResponseBW\n\x1b\x63om.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protob\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'authenticity_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'\n\033com.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto'
  _SIGNREQUEST._serialized_start=110
  _SIGNREQUEST._serialized_end=228
  _SIGNRESPONSE._serialized_start=230
  _SIGNRESPONSE._serialized_end=327
  _VERIFYREQUEST._serialized_start=329
  _VERIFYREQUEST._serialized_end=417
  _VERIFYRESPONSE._serialized_start=419
  _VERIFYRESPONSE._serialized_end=495
  _GETSIGNATURESREQUEST._serialized_start=497
  _GETSIGNATURESREQUEST._serialized_end=592
  _GETSIGNATURESRESPONSE._serialized_start=594
  _GETSIGNATURESRESPONSE._serialized_end=701
  _AUTHENTICITYSERVICE._serialized_start=704
  _AUTHENTICITYSERVICE._serialized_end=911
# @@protoc_insertion_point(module_scope)
