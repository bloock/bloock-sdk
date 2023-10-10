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




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x13keys_entities.proto\x12\x06\x62loock\"d\n\x08LocalKey\x12\x0b\n\x03key\x18\x01 \x01(\t\x12!\n\x08key_type\x18\x02 \x01(\x0e\x32\x0f.bloock.KeyType\x12\x18\n\x0bprivate_key\x18\x03 \x01(\tH\x00\x88\x01\x01\x42\x0e\n\x0c_private_key\"\xa9\x01\n\x10ManagedKeyParams\x12.\n\nprotection\x18\x01 \x01(\x0e\x32\x1a.bloock.KeyProtectionLevel\x12!\n\x08key_type\x18\x02 \x01(\x0e\x32\x0f.bloock.KeyType\x12\x11\n\x04name\x18\x03 \x01(\tH\x00\x88\x01\x01\x12\x17\n\nexpiration\x18\x04 \x01(\x03H\x01\x88\x01\x01\x42\x07\n\x05_nameB\r\n\x0b_expiration\"\x9a\x01\n\nManagedKey\x12\n\n\x02id\x18\x01 \x01(\t\x12\x0b\n\x03key\x18\x02 \x01(\t\x12.\n\nprotection\x18\x03 \x01(\x0e\x32\x1a.bloock.KeyProtectionLevel\x12!\n\x08key_type\x18\x04 \x01(\x0e\x32\x0f.bloock.KeyType\x12\x0c\n\x04name\x18\x05 \x01(\t\x12\x12\n\nexpiration\x18\x06 \x01(\x03\"\xf3\x01\n\x12\x43\x65rtificateSubject\x12\x13\n\x0b\x63ommon_name\x18\x01 \x01(\t\x12 \n\x13organizational_unit\x18\x02 \x01(\tH\x00\x88\x01\x01\x12\x19\n\x0corganization\x18\x03 \x01(\tH\x01\x88\x01\x01\x12\x15\n\x08location\x18\x04 \x01(\tH\x02\x88\x01\x01\x12\x12\n\x05state\x18\x05 \x01(\tH\x03\x88\x01\x01\x12\x14\n\x07\x63ountry\x18\x06 \x01(\tH\x04\x88\x01\x01\x42\x16\n\x14_organizational_unitB\x0f\n\r_organizationB\x0b\n\t_locationB\x08\n\x06_stateB\n\n\x08_country\"z\n\x16LocalCertificateParams\x12!\n\x08key_type\x18\x01 \x01(\x0e\x32\x0f.bloock.KeyType\x12\x10\n\x08password\x18\x02 \x01(\t\x12+\n\x07subject\x18\x03 \x01(\x0b\x32\x1a.bloock.CertificateSubject\"4\n\x10LocalCertificate\x12\x0e\n\x06pkcs12\x18\x01 \x01(\x0c\x12\x10\n\x08password\x18\x02 \x01(\t\"~\n\x18ManagedCertificateParams\x12!\n\x08key_type\x18\x01 \x01(\x0e\x32\x0f.bloock.KeyType\x12\x12\n\nexpiration\x18\x02 \x01(\x05\x12+\n\x07subject\x18\x03 \x01(\x0b\x32\x1a.bloock.CertificateSubject\"\x94\x01\n\x12ManagedCertificate\x12\n\n\x02id\x18\x01 \x01(\t\x12\x0b\n\x03key\x18\x02 \x01(\t\x12.\n\nprotection\x18\x03 \x01(\x0e\x32\x1a.bloock.KeyProtectionLevel\x12!\n\x08key_type\x18\x04 \x01(\x0e\x32\x0f.bloock.KeyType\x12\x12\n\nexpiration\x18\x06 \x01(\x03*^\n\x07KeyType\x12\x0b\n\x07\x45\x63P256k\x10\x00\x12\x0b\n\x07Rsa2048\x10\x01\x12\x0b\n\x07Rsa3072\x10\x02\x12\x0b\n\x07Rsa4096\x10\x03\x12\n\n\x06\x41\x65s128\x10\x04\x12\n\n\x06\x41\x65s256\x10\x05\x12\x07\n\x03\x42jj\x10\x06*+\n\x12KeyProtectionLevel\x12\x0c\n\x08SOFTWARE\x10\x00\x12\x07\n\x03HSM\x10\x01*#\n\x0f\x43\x65rtificateType\x12\x07\n\x03PEM\x10\x00\x12\x07\n\x03PFX\x10\x01\x42W\n\x1b\x63om.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protob\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'keys_entities_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'\n\033com.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto'
  _KEYTYPE._serialized_start=1165
  _KEYTYPE._serialized_end=1259
  _KEYPROTECTIONLEVEL._serialized_start=1261
  _KEYPROTECTIONLEVEL._serialized_end=1304
  _CERTIFICATETYPE._serialized_start=1306
  _CERTIFICATETYPE._serialized_end=1341
  _LOCALKEY._serialized_start=31
  _LOCALKEY._serialized_end=131
  _MANAGEDKEYPARAMS._serialized_start=134
  _MANAGEDKEYPARAMS._serialized_end=303
  _MANAGEDKEY._serialized_start=306
  _MANAGEDKEY._serialized_end=460
  _CERTIFICATESUBJECT._serialized_start=463
  _CERTIFICATESUBJECT._serialized_end=706
  _LOCALCERTIFICATEPARAMS._serialized_start=708
  _LOCALCERTIFICATEPARAMS._serialized_end=830
  _LOCALCERTIFICATE._serialized_start=832
  _LOCALCERTIFICATE._serialized_end=884
  _MANAGEDCERTIFICATEPARAMS._serialized_start=886
  _MANAGEDCERTIFICATEPARAMS._serialized_end=1012
  _MANAGEDCERTIFICATE._serialized_start=1015
  _MANAGEDCERTIFICATE._serialized_end=1163
# @@protoc_insertion_point(module_scope)
