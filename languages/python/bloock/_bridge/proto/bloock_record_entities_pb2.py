# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: bloock_record_entities.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from . import bloock_config_pb2 as bloock__config__pb2
from . import bloock_integrity_entities_pb2 as bloock__integrity__entities__pb2
from . import bloock_authenticity_entities_pb2 as bloock__authenticity__entities__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x1c\x62loock_record_entities.proto\x12\x06\x62loock\x1a\x13\x62loock_config.proto\x1a\x1f\x62loock_integrity_entities.proto\x1a\"bloock_authenticity_entities.proto\"\x1a\n\x0cRecordHeader\x12\n\n\x02ty\x18\x01 \x01(\t\"e\n\x06Record\x12,\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigDataH\x00\x88\x01\x01\x12\x0f\n\x07payload\x18\x02 \x01(\x0c\x12\x0c\n\x04hash\x18\x03 \x01(\tB\x0e\n\x0c_config_data\"M\n\x10IntegrityDetails\x12\x0c\n\x04hash\x18\x01 \x01(\t\x12!\n\x05proof\x18\x02 \x01(\x0b\x32\r.bloock.ProofH\x00\x88\x01\x01\x42\x08\n\x06_proof\"<\n\x13\x41uthenticityDetails\x12%\n\nsignatures\x18\x01 \x03(\x0b\x32\x11.bloock.Signature\"i\n\x11\x45ncryptionDetails\x12\x10\n\x03\x61lg\x18\x01 \x01(\tH\x00\x88\x01\x01\x12\x10\n\x03key\x18\x02 \x01(\tH\x01\x88\x01\x01\x12\x14\n\x07subject\x18\x03 \x01(\tH\x02\x88\x01\x01\x42\x06\n\x04_algB\x06\n\x04_keyB\n\n\x08_subject\"?\n\x13\x41vailabilityDetails\x12\x0c\n\x04size\x18\x01 \x01(\x03\x12\x11\n\x04type\x18\x02 \x01(\tH\x00\x88\x01\x01\x42\x07\n\x05_type\"\xa4\x02\n\rRecordDetails\x12\x30\n\tintegrity\x18\x01 \x01(\x0b\x32\x18.bloock.IntegrityDetailsH\x00\x88\x01\x01\x12\x36\n\x0c\x61uthenticity\x18\x02 \x01(\x0b\x32\x1b.bloock.AuthenticityDetailsH\x01\x88\x01\x01\x12\x32\n\nencryption\x18\x03 \x01(\x0b\x32\x19.bloock.EncryptionDetailsH\x02\x88\x01\x01\x12\x36\n\x0c\x61vailability\x18\x04 \x01(\x0b\x32\x1b.bloock.AvailabilityDetailsH\x03\x88\x01\x01\x42\x0c\n\n_integrityB\x0f\n\r_authenticityB\r\n\x0b_encryptionB\x0f\n\r_availability*Y\n\x0bRecordTypes\x12\n\n\x06STRING\x10\x00\x12\x07\n\x03HEX\x10\x01\x12\x08\n\x04JSON\x10\x02\x12\t\n\x05\x42YTES\x10\x03\x12\x08\n\x04\x46ILE\x10\x04\x12\n\n\x06RECORD\x10\x05\x12\n\n\x06LOADER\x10\x06\x42W\n\x1b\x63om.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protob\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'bloock_record_entities_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'\n\033com.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto'
  _RECORDTYPES._serialized_start=869
  _RECORDTYPES._serialized_end=958
  _RECORDHEADER._serialized_start=130
  _RECORDHEADER._serialized_end=156
  _RECORD._serialized_start=158
  _RECORD._serialized_end=259
  _INTEGRITYDETAILS._serialized_start=261
  _INTEGRITYDETAILS._serialized_end=338
  _AUTHENTICITYDETAILS._serialized_start=340
  _AUTHENTICITYDETAILS._serialized_end=400
  _ENCRYPTIONDETAILS._serialized_start=402
  _ENCRYPTIONDETAILS._serialized_end=507
  _AVAILABILITYDETAILS._serialized_start=509
  _AVAILABILITYDETAILS._serialized_end=572
  _RECORDDETAILS._serialized_start=575
  _RECORDDETAILS._serialized_end=867
# @@protoc_insertion_point(module_scope)
