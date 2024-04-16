# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: record_entities.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


import config_pb2 as config__pb2
import integrity_entities_pb2 as integrity__entities__pb2
import authenticity_entities_pb2 as authenticity__entities__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x15record_entities.proto\x12\x06\x62loock\x1a\x0c\x63onfig.proto\x1a\x18integrity_entities.proto\x1a\x1b\x61uthenticity_entities.proto\"\x1a\n\x0cRecordHeader\x12\n\n\x02ty\x18\x01 \x01(\t\"e\n\x06Record\x12,\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigDataH\x00\x88\x01\x01\x12\x0f\n\x07payload\x18\x02 \x01(\x0c\x12\x0c\n\x04hash\x18\x03 \x01(\tB\x0e\n\x0c_config_data\"M\n\x10IntegrityDetails\x12\x0c\n\x04hash\x18\x01 \x01(\t\x12!\n\x05proof\x18\x02 \x01(\x0b\x32\r.bloock.ProofH\x00\x88\x01\x01\x42\x08\n\x06_proof\"<\n\x13\x41uthenticityDetails\x12%\n\nsignatures\x18\x01 \x03(\x0b\x32\x11.bloock.Signature\"i\n\x11\x45ncryptionDetails\x12\x10\n\x03\x61lg\x18\x01 \x01(\tH\x00\x88\x01\x01\x12\x10\n\x03key\x18\x02 \x01(\tH\x01\x88\x01\x01\x12\x14\n\x07subject\x18\x03 \x01(\tH\x02\x88\x01\x01\x42\x06\n\x04_algB\x06\n\x04_keyB\n\n\x08_subject\"?\n\x13\x41vailabilityDetails\x12\x0c\n\x04size\x18\x01 \x01(\x03\x12\x11\n\x04type\x18\x02 \x01(\tH\x00\x88\x01\x01\x42\x07\n\x05_type\"\xa4\x02\n\rRecordDetails\x12\x30\n\tintegrity\x18\x01 \x01(\x0b\x32\x18.bloock.IntegrityDetailsH\x00\x88\x01\x01\x12\x36\n\x0c\x61uthenticity\x18\x02 \x01(\x0b\x32\x1b.bloock.AuthenticityDetailsH\x01\x88\x01\x01\x12\x32\n\nencryption\x18\x03 \x01(\x0b\x32\x19.bloock.EncryptionDetailsH\x02\x88\x01\x01\x12\x36\n\x0c\x61vailability\x18\x04 \x01(\x0b\x32\x1b.bloock.AvailabilityDetailsH\x03\x88\x01\x01\x42\x0c\n\n_integrityB\x0f\n\r_authenticityB\r\n\x0b_encryptionB\x0f\n\r_availability*Y\n\x0bRecordTypes\x12\n\n\x06STRING\x10\x00\x12\x07\n\x03HEX\x10\x01\x12\x08\n\x04JSON\x10\x02\x12\t\n\x05\x42YTES\x10\x03\x12\x08\n\x04\x46ILE\x10\x04\x12\n\n\x06RECORD\x10\x05\x12\n\n\x06LOADER\x10\x06\x42W\n\x1b\x63om.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protob\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'record_entities_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'\n\033com.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto'
  _RECORDTYPES._serialized_start=841
  _RECORDTYPES._serialized_end=930
  _RECORDHEADER._serialized_start=102
  _RECORDHEADER._serialized_end=128
  _RECORD._serialized_start=130
  _RECORD._serialized_end=231
  _INTEGRITYDETAILS._serialized_start=233
  _INTEGRITYDETAILS._serialized_end=310
  _AUTHENTICITYDETAILS._serialized_start=312
  _AUTHENTICITYDETAILS._serialized_end=372
  _ENCRYPTIONDETAILS._serialized_start=374
  _ENCRYPTIONDETAILS._serialized_end=479
  _AVAILABILITYDETAILS._serialized_start=481
  _AVAILABILITYDETAILS._serialized_end=544
  _RECORDDETAILS._serialized_start=547
  _RECORDDETAILS._serialized_end=839
# @@protoc_insertion_point(module_scope)
