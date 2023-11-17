# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: identity_entities.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from . import integrity_entities_pb2 as integrity__entities__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x17identity_entities.proto\x12\x06\x62loock\x1a\x18integrity_entities.proto\">\n\x08Identity\x12\x10\n\x08mnemonic\x18\x01 \x01(\t\x12\x0b\n\x03key\x18\x02 \x01(\t\x12\x13\n\x0bprivate_key\x18\x03 \x01(\t\"S\n\x1a\x42ooleanAttributeDefinition\x12\x14\n\x0c\x64isplay_name\x18\x01 \x01(\t\x12\n\n\x02id\x18\x02 \x01(\t\x12\x13\n\x0b\x64\x65scription\x18\x03 \x01(\t\"P\n\x17\x44\x61teAttributeDefinition\x12\x14\n\x0c\x64isplay_name\x18\x01 \x01(\t\x12\n\n\x02id\x18\x02 \x01(\t\x12\x13\n\x0b\x64\x65scription\x18\x03 \x01(\t\"T\n\x1b\x44\x61teTimeAttributeDefinition\x12\x14\n\x0c\x64isplay_name\x18\x01 \x01(\t\x12\n\n\x02id\x18\x02 \x01(\t\x12\x13\n\x0b\x64\x65scription\x18\x03 \x01(\t\"R\n\x19StringAttributeDefinition\x12\x14\n\x0c\x64isplay_name\x18\x01 \x01(\t\x12\n\n\x02id\x18\x02 \x01(\t\x12\x13\n\x0b\x64\x65scription\x18\x03 \x01(\t\"R\n\x19NumberAttributeDefinition\x12\x14\n\x0c\x64isplay_name\x18\x01 \x01(\t\x12\n\n\x02id\x18\x02 \x01(\t\x12\x13\n\x0b\x64\x65scription\x18\x03 \x01(\t\"-\n\x10\x42ooleanAttribute\x12\n\n\x02id\x18\x01 \x01(\t\x12\r\n\x05value\x18\x02 \x01(\x08\"*\n\rDateAttribute\x12\n\n\x02id\x18\x01 \x01(\t\x12\r\n\x05value\x18\x02 \x01(\x03\".\n\x11\x44\x61teTimeAttribute\x12\n\n\x02id\x18\x01 \x01(\t\x12\r\n\x05value\x18\x02 \x01(\x03\",\n\x0fStringAttribute\x12\n\n\x02id\x18\x01 \x01(\t\x12\r\n\x05value\x18\x02 \x01(\t\",\n\x0fNumberAttribute\x12\n\n\x02id\x18\x01 \x01(\t\x12\r\n\x05value\x18\x02 \x01(\x03\"%\n\x06Schema\x12\n\n\x02id\x18\x01 \x01(\t\x12\x0f\n\x07json_ld\x18\x02 \x01(\t\"f\n\x0f\x43redentialOffer\x12\x0c\n\x04thid\x18\x01 \x01(\t\x12)\n\x04\x62ody\x18\x02 \x01(\x0b\x32\x1b.bloock.CredentialOfferBody\x12\r\n\x05_from\x18\x03 \x01(\t\x12\x0b\n\x03_to\x18\x04 \x01(\t\"_\n\x13\x43redentialOfferBody\x12\x0b\n\x03url\x18\x01 \x01(\t\x12;\n\x0b\x63redentials\x18\x02 \x03(\x0b\x32&.bloock.CredentialOfferBodyCredentials\"A\n\x1e\x43redentialOfferBodyCredentials\x12\n\n\x02id\x18\x01 \x01(\t\x12\x13\n\x0b\x64\x65scription\x18\x02 \x01(\t\"2\n\x11\x43redentialReceipt\x12\n\n\x02id\x18\x01 \x01(\t\x12\x11\n\tanchor_id\x18\x02 \x01(\x03\"\x8c\x02\n\nCredential\x12\x0f\n\x07\x63ontext\x18\x01 \x03(\t\x12\n\n\x02id\x18\x02 \x01(\t\x12\x0c\n\x04type\x18\x03 \x03(\t\x12\x15\n\rissuance_date\x18\x04 \x01(\t\x12\x1a\n\x12\x63redential_subject\x18\x05 \x01(\t\x12\x33\n\x11\x63redential_status\x18\x06 \x01(\x0b\x32\x18.bloock.CredentialStatus\x12\x0e\n\x06issuer\x18\x07 \x01(\t\x12\x33\n\x11\x63redential_schema\x18\x08 \x01(\x0b\x32\x18.bloock.CredentialSchema\x12&\n\x05proof\x18\t \x01(\x0b\x32\x17.bloock.CredentialProof\"F\n\x10\x43redentialStatus\x12\n\n\x02id\x18\x01 \x01(\t\x12\x18\n\x10revocation_nonce\x18\x02 \x01(\x03\x12\x0c\n\x04type\x18\x03 \x01(\t\",\n\x10\x43redentialSchema\x12\n\n\x02id\x18\x01 \x01(\t\x12\x0c\n\x04type\x18\x02 \x01(\t\"e\n\x0f\x43redentialProof\x12#\n\x0c\x62loock_proof\x18\x01 \x01(\x0b\x32\r.bloock.Proof\x12-\n\x0fsignature_proof\x18\x02 \x01(\x0b\x32\x14.bloock.SignatureJWS\"O\n\x16\x43redentialVerification\x12\x11\n\ttimestamp\x18\x01 \x01(\x04\x12\x0e\n\x06issuer\x18\x02 \x01(\t\x12\x12\n\nrevocation\x18\x03 \x01(\x04\"\'\n\x14\x43redentialRevocation\x12\x0f\n\x07success\x18\x01 \x01(\x08\"v\n\x0cSignatureJWS\x12\x11\n\tsignature\x18\x01 \x01(\t\x12\x11\n\tprotected\x18\x02 \x01(\t\x12*\n\x06header\x18\x03 \x01(\x0b\x32\x1a.bloock.SignatureHeaderJWS\x12\x14\n\x0cmessage_hash\x18\x04 \x01(\t\".\n\x12SignatureHeaderJWS\x12\x0b\n\x03\x61lg\x18\x01 \x01(\t\x12\x0b\n\x03kid\x18\x02 \x01(\tBW\n\x1b\x63om.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protob\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'identity_entities_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'\n\033com.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto'
  _IDENTITY._serialized_start=61
  _IDENTITY._serialized_end=123
  _BOOLEANATTRIBUTEDEFINITION._serialized_start=125
  _BOOLEANATTRIBUTEDEFINITION._serialized_end=208
  _DATEATTRIBUTEDEFINITION._serialized_start=210
  _DATEATTRIBUTEDEFINITION._serialized_end=290
  _DATETIMEATTRIBUTEDEFINITION._serialized_start=292
  _DATETIMEATTRIBUTEDEFINITION._serialized_end=376
  _STRINGATTRIBUTEDEFINITION._serialized_start=378
  _STRINGATTRIBUTEDEFINITION._serialized_end=460
  _NUMBERATTRIBUTEDEFINITION._serialized_start=462
  _NUMBERATTRIBUTEDEFINITION._serialized_end=544
  _BOOLEANATTRIBUTE._serialized_start=546
  _BOOLEANATTRIBUTE._serialized_end=591
  _DATEATTRIBUTE._serialized_start=593
  _DATEATTRIBUTE._serialized_end=635
  _DATETIMEATTRIBUTE._serialized_start=637
  _DATETIMEATTRIBUTE._serialized_end=683
  _STRINGATTRIBUTE._serialized_start=685
  _STRINGATTRIBUTE._serialized_end=729
  _NUMBERATTRIBUTE._serialized_start=731
  _NUMBERATTRIBUTE._serialized_end=775
  _SCHEMA._serialized_start=777
  _SCHEMA._serialized_end=814
  _CREDENTIALOFFER._serialized_start=816
  _CREDENTIALOFFER._serialized_end=918
  _CREDENTIALOFFERBODY._serialized_start=920
  _CREDENTIALOFFERBODY._serialized_end=1015
  _CREDENTIALOFFERBODYCREDENTIALS._serialized_start=1017
  _CREDENTIALOFFERBODYCREDENTIALS._serialized_end=1082
  _CREDENTIALRECEIPT._serialized_start=1084
  _CREDENTIALRECEIPT._serialized_end=1134
  _CREDENTIAL._serialized_start=1137
  _CREDENTIAL._serialized_end=1405
  _CREDENTIALSTATUS._serialized_start=1407
  _CREDENTIALSTATUS._serialized_end=1477
  _CREDENTIALSCHEMA._serialized_start=1479
  _CREDENTIALSCHEMA._serialized_end=1523
  _CREDENTIALPROOF._serialized_start=1525
  _CREDENTIALPROOF._serialized_end=1626
  _CREDENTIALVERIFICATION._serialized_start=1628
  _CREDENTIALVERIFICATION._serialized_end=1707
  _CREDENTIALREVOCATION._serialized_start=1709
  _CREDENTIALREVOCATION._serialized_end=1748
  _SIGNATUREJWS._serialized_start=1750
  _SIGNATUREJWS._serialized_end=1868
  _SIGNATUREHEADERJWS._serialized_start=1870
  _SIGNATUREHEADERJWS._serialized_end=1916
# @@protoc_insertion_point(module_scope)
