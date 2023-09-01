# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: identity_entities_v2.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from . import keys_entities_pb2 as keys__entities__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x1aidentity_entities_v2.proto\x12\x06\x62loock\x1a\x13keys_entities.proto\"\x81\x01\n\tIssuerKey\x12(\n\tlocal_key\x18\x01 \x01(\x0b\x32\x10.bloock.LocalKeyH\x00\x88\x01\x01\x12,\n\x0bmanaged_key\x18\x02 \x01(\x0b\x32\x12.bloock.ManagedKeyH\x01\x88\x01\x01\x42\x0c\n\n_local_keyB\x0e\n\x0c_managed_key\"\xa8\x02\n\x0c\x43redentialV2\x12\x0f\n\x07\x63ontext\x18\x01 \x03(\t\x12\n\n\x02id\x18\x02 \x01(\t\x12\x0c\n\x04type\x18\x03 \x03(\t\x12\x15\n\rissuance_date\x18\x04 \x01(\t\x12\x12\n\nexpiration\x18\x05 \x01(\t\x12\x1a\n\x12\x63redential_subject\x18\x06 \x01(\t\x12\x35\n\x11\x63redential_status\x18\x07 \x01(\x0b\x32\x1a.bloock.CredentialStatusV2\x12\x0e\n\x06issuer\x18\x08 \x01(\t\x12\x35\n\x11\x63redential_schema\x18\t \x01(\x0b\x32\x1a.bloock.CredentialSchemaV2\x12(\n\x05proof\x18\n \x01(\x0b\x32\x19.bloock.CredentialProofV2\"\x90\x01\n\x11\x43redentialProofV2\x12\x17\n\x0fsignature_proof\x18\x01 \x01(\t\x12\x1c\n\x0fintegrity_proof\x18\x02 \x01(\tH\x00\x88\x01\x01\x12\x1c\n\x0fsparse_mt_proof\x18\x03 \x01(\tH\x01\x88\x01\x01\x42\x12\n\x10_integrity_proofB\x12\n\x10_sparse_mt_proof\"H\n\x12\x43redentialStatusV2\x12\n\n\x02id\x18\x01 \x01(\t\x12\x18\n\x10revocation_nonce\x18\x02 \x01(\x03\x12\x0c\n\x04type\x18\x03 \x01(\t\".\n\x12\x43redentialSchemaV2\x12\n\n\x02id\x18\x01 \x01(\t\x12\x0c\n\x04type\x18\x02 \x01(\t\".\n\x11StringAttributeV2\x12\n\n\x02id\x18\x01 \x01(\t\x12\r\n\x05value\x18\x02 \x01(\t\"/\n\x12IntegerAttributeV2\x12\n\n\x02id\x18\x01 \x01(\t\x12\r\n\x05value\x18\x02 \x01(\x03\"/\n\x12\x44\x65\x63imalAttributeV2\x12\n\n\x02id\x18\x01 \x01(\t\x12\r\n\x05value\x18\x02 \x01(\x01\"/\n\x12\x42ooleanAttributeV2\x12\n\n\x02id\x18\x01 \x01(\t\x12\r\n\x05value\x18\x02 \x01(\x08\",\n\x0f\x44\x61teAttributeV2\x12\n\n\x02id\x18\x01 \x01(\t\x12\r\n\x05value\x18\x02 \x01(\t\"0\n\x13\x44\x61teTimeAttributeV2\x12\n\n\x02id\x18\x01 \x01(\t\x12\r\n\x05value\x18\x02 \x01(\t\"f\n\x1bStringAttributeDefinitionV2\x12\x14\n\x0c\x64isplay_name\x18\x01 \x01(\t\x12\n\n\x02id\x18\x02 \x01(\t\x12\x13\n\x0b\x64\x65scription\x18\x03 \x01(\t\x12\x10\n\x08required\x18\x04 \x01(\x08\"g\n\x1cIntegerAttributeDefinitionV2\x12\x14\n\x0c\x64isplay_name\x18\x01 \x01(\t\x12\n\n\x02id\x18\x02 \x01(\t\x12\x13\n\x0b\x64\x65scription\x18\x03 \x01(\t\x12\x10\n\x08required\x18\x04 \x01(\x08\"g\n\x1c\x44\x65\x63imalAttributeDefinitionV2\x12\x14\n\x0c\x64isplay_name\x18\x01 \x01(\t\x12\n\n\x02id\x18\x02 \x01(\t\x12\x13\n\x0b\x64\x65scription\x18\x03 \x01(\t\x12\x10\n\x08required\x18\x04 \x01(\x08\"g\n\x1c\x42ooleanAttributeDefinitionV2\x12\x14\n\x0c\x64isplay_name\x18\x01 \x01(\t\x12\n\n\x02id\x18\x02 \x01(\t\x12\x13\n\x0b\x64\x65scription\x18\x03 \x01(\t\x12\x10\n\x08required\x18\x04 \x01(\x08\"d\n\x19\x44\x61teAttributeDefinitionV2\x12\x14\n\x0c\x64isplay_name\x18\x01 \x01(\t\x12\n\n\x02id\x18\x02 \x01(\t\x12\x13\n\x0b\x64\x65scription\x18\x03 \x01(\t\x12\x10\n\x08required\x18\x04 \x01(\x08\"h\n\x1d\x44\x61teTimeAttributeDefinitionV2\x12\x14\n\x0c\x64isplay_name\x18\x01 \x01(\t\x12\n\n\x02id\x18\x02 \x01(\t\x12\x13\n\x0b\x64\x65scription\x18\x03 \x01(\t\x12\x10\n\x08required\x18\x04 \x01(\x08\"x\n\x1fStringEnumAttributeDefinitionV2\x12\x14\n\x0c\x64isplay_name\x18\x01 \x01(\t\x12\n\n\x02id\x18\x02 \x01(\t\x12\x13\n\x0b\x64\x65scription\x18\x03 \x01(\t\x12\x10\n\x08required\x18\x04 \x01(\x08\x12\x0c\n\x04\x65num\x18\x05 \x03(\t\"y\n IntegerEnumAttributeDefinitionV2\x12\x14\n\x0c\x64isplay_name\x18\x01 \x01(\t\x12\n\n\x02id\x18\x02 \x01(\t\x12\x13\n\x0b\x64\x65scription\x18\x03 \x01(\t\x12\x10\n\x08required\x18\x04 \x01(\x08\x12\x0c\n\x04\x65num\x18\x05 \x03(\x03\"y\n DecimalEnumAttributeDefinitionV2\x12\x14\n\x0c\x64isplay_name\x18\x01 \x01(\t\x12\n\n\x02id\x18\x02 \x01(\t\x12\x13\n\x0b\x64\x65scription\x18\x03 \x01(\t\x12\x10\n\x08required\x18\x04 \x01(\x08\x12\x0c\n\x04\x65num\x18\x05 \x03(\x01\"\x95\x01\n\x13\x43redentialReceiptV2\x12(\n\ncredential\x18\x01 \x01(\x0b\x32\x14.bloock.CredentialV2\x12\x15\n\rcredential_id\x18\x02 \x01(\t\x12\x17\n\x0f\x63redential_type\x18\x03 \x01(\t\x12\x16\n\tanchor_id\x18\x04 \x01(\x03H\x00\x88\x01\x01\x42\x0c\n\n_anchor_id\"%\n\x12IssuerStateReceipt\x12\x0f\n\x07tx_hash\x18\x01 \x01(\t\"\'\n\x08SchemaV2\x12\n\n\x02id\x18\x01 \x01(\t\x12\x0f\n\x07json_ld\x18\x02 \x01(\t\")\n\x16\x43redentialRevocationV2\x12\x0f\n\x07success\x18\x01 \x01(\x08\"}\n\x0cIssuerParams\x12\x1e\n\x06method\x18\x01 \x01(\x0e\x32\x0e.bloock.Method\x12&\n\nblockchain\x18\x02 \x01(\x0e\x32\x12.bloock.Blockchain\x12%\n\nnetwork_id\x18\x03 \x01(\x0e\x32\x11.bloock.NetworkId*:\n\tProofType\x12\x16\n\x12IntegrityProofType\x10\x00\x12\x15\n\x11SparseMtProofType\x10\x01*#\n\x06Method\x12\t\n\x05IDEN3\x10\x00\x12\x0e\n\nPOLYGON_ID\x10\x01*H\n\nBlockchain\x12\x0c\n\x08\x45THEREUM\x10\x00\x12\x0b\n\x07POLYGON\x10\x01\x12\x11\n\rUNKNOWN_CHAIN\x10\x02\x12\x0c\n\x08NO_CHAIN\x10\x03*R\n\tNetworkId\x12\x08\n\x04MAIN\x10\x00\x12\n\n\x06MUMBAI\x10\x01\x12\n\n\x06GOERLI\x10\x02\x12\x13\n\x0fUNKNOWN_NETWORK\x10\x03\x12\x0e\n\nNO_NETWORK\x10\x04\x42W\n\x1b\x63om.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protob\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'identity_entities_v2_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'\n\033com.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto'
  _PROOFTYPE._serialized_start=2447
  _PROOFTYPE._serialized_end=2505
  _METHOD._serialized_start=2507
  _METHOD._serialized_end=2542
  _BLOCKCHAIN._serialized_start=2544
  _BLOCKCHAIN._serialized_end=2616
  _NETWORKID._serialized_start=2618
  _NETWORKID._serialized_end=2700
  _ISSUERKEY._serialized_start=60
  _ISSUERKEY._serialized_end=189
  _CREDENTIALV2._serialized_start=192
  _CREDENTIALV2._serialized_end=488
  _CREDENTIALPROOFV2._serialized_start=491
  _CREDENTIALPROOFV2._serialized_end=635
  _CREDENTIALSTATUSV2._serialized_start=637
  _CREDENTIALSTATUSV2._serialized_end=709
  _CREDENTIALSCHEMAV2._serialized_start=711
  _CREDENTIALSCHEMAV2._serialized_end=757
  _STRINGATTRIBUTEV2._serialized_start=759
  _STRINGATTRIBUTEV2._serialized_end=805
  _INTEGERATTRIBUTEV2._serialized_start=807
  _INTEGERATTRIBUTEV2._serialized_end=854
  _DECIMALATTRIBUTEV2._serialized_start=856
  _DECIMALATTRIBUTEV2._serialized_end=903
  _BOOLEANATTRIBUTEV2._serialized_start=905
  _BOOLEANATTRIBUTEV2._serialized_end=952
  _DATEATTRIBUTEV2._serialized_start=954
  _DATEATTRIBUTEV2._serialized_end=998
  _DATETIMEATTRIBUTEV2._serialized_start=1000
  _DATETIMEATTRIBUTEV2._serialized_end=1048
  _STRINGATTRIBUTEDEFINITIONV2._serialized_start=1050
  _STRINGATTRIBUTEDEFINITIONV2._serialized_end=1152
  _INTEGERATTRIBUTEDEFINITIONV2._serialized_start=1154
  _INTEGERATTRIBUTEDEFINITIONV2._serialized_end=1257
  _DECIMALATTRIBUTEDEFINITIONV2._serialized_start=1259
  _DECIMALATTRIBUTEDEFINITIONV2._serialized_end=1362
  _BOOLEANATTRIBUTEDEFINITIONV2._serialized_start=1364
  _BOOLEANATTRIBUTEDEFINITIONV2._serialized_end=1467
  _DATEATTRIBUTEDEFINITIONV2._serialized_start=1469
  _DATEATTRIBUTEDEFINITIONV2._serialized_end=1569
  _DATETIMEATTRIBUTEDEFINITIONV2._serialized_start=1571
  _DATETIMEATTRIBUTEDEFINITIONV2._serialized_end=1675
  _STRINGENUMATTRIBUTEDEFINITIONV2._serialized_start=1677
  _STRINGENUMATTRIBUTEDEFINITIONV2._serialized_end=1797
  _INTEGERENUMATTRIBUTEDEFINITIONV2._serialized_start=1799
  _INTEGERENUMATTRIBUTEDEFINITIONV2._serialized_end=1920
  _DECIMALENUMATTRIBUTEDEFINITIONV2._serialized_start=1922
  _DECIMALENUMATTRIBUTEDEFINITIONV2._serialized_end=2043
  _CREDENTIALRECEIPTV2._serialized_start=2046
  _CREDENTIALRECEIPTV2._serialized_end=2195
  _ISSUERSTATERECEIPT._serialized_start=2197
  _ISSUERSTATERECEIPT._serialized_end=2234
  _SCHEMAV2._serialized_start=2236
  _SCHEMAV2._serialized_end=2275
  _CREDENTIALREVOCATIONV2._serialized_start=2277
  _CREDENTIALREVOCATIONV2._serialized_end=2318
  _ISSUERPARAMS._serialized_start=2320
  _ISSUERPARAMS._serialized_end=2445
# @@protoc_insertion_point(module_scope)
