# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: integrity.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from . import integrity_entities_pb2 as integrity__entities__pb2
from . import record_entities_pb2 as record__entities__pb2
from . import shared_pb2 as shared__pb2
from . import config_pb2 as config__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x0fintegrity.proto\x12\x06\x62loock\x1a\x18integrity_entities.proto\x1a\x15record_entities.proto\x1a\x0cshared.proto\x1a\x0c\x63onfig.proto\"^\n\x12SendRecordsRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x1f\n\x07records\x18\x02 \x03(\x0b\x32\x0e.bloock.Record\"j\n\x13SendRecordsResponse\x12&\n\x07records\x18\x01 \x03(\x0b\x32\x15.bloock.RecordReceipt\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"N\n\x10GetAnchorRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x11\n\tanchor_id\x18\x02 \x01(\x03\"p\n\x11GetAnchorResponse\x12#\n\x06\x61nchor\x18\x01 \x01(\x0b\x32\x0e.bloock.AnchorH\x00\x88\x01\x01\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x01\x88\x01\x01\x42\t\n\x07_anchorB\x08\n\x06_error\"`\n\x11WaitAnchorRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x11\n\tanchor_id\x18\x02 \x01(\x03\x12\x0f\n\x07timeout\x18\x03 \x01(\x03\"q\n\x12WaitAnchorResponse\x12#\n\x06\x61nchor\x18\x01 \x01(\x0b\x32\x0e.bloock.AnchorH\x00\x88\x01\x01\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x01\x88\x01\x01\x42\t\n\x07_anchorB\x08\n\x06_error\"[\n\x0fGetProofRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x1f\n\x07records\x18\x02 \x03(\x0b\x32\x0e.bloock.Record\"]\n\x10GetProofResponse\x12\x1c\n\x05proof\x18\x01 \x01(\x0b\x32\r.bloock.Proof\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"n\n\x13ValidateRootRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x0c\n\x04root\x18\x02 \x01(\t\x12 \n\x07network\x18\x03 \x01(\x0e\x32\x0f.bloock.Network\"V\n\x14ValidateRootResponse\x12\x11\n\ttimestamp\x18\x01 \x01(\x04\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"[\n\x12VerifyProofRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x1c\n\x05proof\x18\x02 \x01(\x0b\x32\r.bloock.Proof\"b\n\x13VerifyProofResponse\x12\x13\n\x06record\x18\x01 \x01(\tH\x00\x88\x01\x01\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x01\x88\x01\x01\x42\t\n\x07_recordB\x08\n\x06_error\"\x93\x01\n\x14VerifyRecordsRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x1f\n\x07records\x18\x02 \x03(\x0b\x32\x0e.bloock.Record\x12%\n\x07network\x18\x03 \x01(\x0e\x32\x0f.bloock.NetworkH\x00\x88\x01\x01\x42\n\n\x08_network\"W\n\x15VerifyRecordsResponse\x12\x11\n\ttimestamp\x18\x01 \x01(\x04\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error2\x81\x04\n\x10IntegrityService\x12\x46\n\x0bSendRecords\x12\x1a.bloock.SendRecordsRequest\x1a\x1b.bloock.SendRecordsResponse\x12@\n\tGetAnchor\x12\x18.bloock.GetAnchorRequest\x1a\x19.bloock.GetAnchorResponse\x12\x43\n\nWaitAnchor\x12\x19.bloock.WaitAnchorRequest\x1a\x1a.bloock.WaitAnchorResponse\x12=\n\x08GetProof\x12\x17.bloock.GetProofRequest\x1a\x18.bloock.GetProofResponse\x12I\n\x0cValidateRoot\x12\x1b.bloock.ValidateRootRequest\x1a\x1c.bloock.ValidateRootResponse\x12\x46\n\x0bVerifyProof\x12\x1a.bloock.VerifyProofRequest\x1a\x1b.bloock.VerifyProofResponse\x12L\n\rVerifyRecords\x12\x1c.bloock.VerifyRecordsRequest\x1a\x1d.bloock.VerifyRecordsResponseBW\n\x1b\x63om.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protob\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'integrity_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'\n\033com.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto'
  _SENDRECORDSREQUEST._serialized_start=104
  _SENDRECORDSREQUEST._serialized_end=198
  _SENDRECORDSRESPONSE._serialized_start=200
  _SENDRECORDSRESPONSE._serialized_end=306
  _GETANCHORREQUEST._serialized_start=308
  _GETANCHORREQUEST._serialized_end=386
  _GETANCHORRESPONSE._serialized_start=388
  _GETANCHORRESPONSE._serialized_end=500
  _WAITANCHORREQUEST._serialized_start=502
  _WAITANCHORREQUEST._serialized_end=598
  _WAITANCHORRESPONSE._serialized_start=600
  _WAITANCHORRESPONSE._serialized_end=713
  _GETPROOFREQUEST._serialized_start=715
  _GETPROOFREQUEST._serialized_end=806
  _GETPROOFRESPONSE._serialized_start=808
  _GETPROOFRESPONSE._serialized_end=901
  _VALIDATEROOTREQUEST._serialized_start=903
  _VALIDATEROOTREQUEST._serialized_end=1013
  _VALIDATEROOTRESPONSE._serialized_start=1015
  _VALIDATEROOTRESPONSE._serialized_end=1101
  _VERIFYPROOFREQUEST._serialized_start=1103
  _VERIFYPROOFREQUEST._serialized_end=1194
  _VERIFYPROOFRESPONSE._serialized_start=1196
  _VERIFYPROOFRESPONSE._serialized_end=1294
  _VERIFYRECORDSREQUEST._serialized_start=1297
  _VERIFYRECORDSREQUEST._serialized_end=1444
  _VERIFYRECORDSRESPONSE._serialized_start=1446
  _VERIFYRECORDSRESPONSE._serialized_end=1533
  _INTEGRITYSERVICE._serialized_start=1536
  _INTEGRITYSERVICE._serialized_end=2049
# @@protoc_insertion_point(module_scope)
