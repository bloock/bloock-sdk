# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: identity_v2.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from . import config_pb2 as config__pb2
from . import authenticity_entities_pb2 as authenticity__entities__pb2
from . import shared_pb2 as shared__pb2
from . import identity_entities_v2_pb2 as identity__entities__v2__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x11identity_v2.proto\x12\x06\x62loock\x1a\x0c\x63onfig.proto\x1a\x1b\x61uthenticity_entities.proto\x1a\x0cshared.proto\x1a\x1aidentity_entities_v2.proto\"I\n\x12GetSchemaRequestV2\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\n\n\x02id\x18\x02 \x01(\t\"d\n\x13GetSchemaResponseV2\x12 \n\x06schema\x18\x01 \x01(\x0b\x32\x10.bloock.SchemaV2\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"?\n\x14GetIssuerListRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\"Q\n\x15GetIssuerListResponse\x12\x0b\n\x03\x64id\x18\x01 \x03(\t\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"R\n\x16GetIssuerByKeyResponse\x12\x0b\n\x03\x64id\x18\x01 \x01(\t\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"o\n\x19GetCredentialProofRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x12\n\nissuer_did\x18\x02 \x01(\t\x12\x15\n\rcredential_id\x18\x03 \x01(\t\"s\n\x1aGetCredentialProofResponse\x12(\n\x05proof\x18\x01 \x01(\x0b\x32\x19.bloock.CredentialProofV2\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"n\n\x19\x43redentialToJsonRequestV2\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12(\n\ncredential\x18\x02 \x01(\x0b\x32\x14.bloock.CredentialV2\"W\n\x1a\x43redentialToJsonResponseV2\x12\x0c\n\x04json\x18\x01 \x01(\t\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"T\n\x1b\x43redentialFromJsonRequestV2\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x0c\n\x04json\x18\x02 \x01(\t\"u\n\x1c\x43redentialFromJsonResponseV2\x12(\n\ncredential\x18\x01 \x01(\x0b\x32\x14.bloock.CredentialV2\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"\xb9\x04\n\x19\x43reateCredentialRequestV2\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x11\n\tschema_id\x18\x02 \x01(\t\x12\x12\n\nissuer_did\x18\x03 \x01(\t\x12\x12\n\nholder_did\x18\x04 \x01(\t\x12\x12\n\nexpiration\x18\x05 \x01(\x03\x12\x14\n\x07version\x18\x06 \x01(\x05H\x00\x88\x01\x01\x12\x1e\n\x06signer\x18\x07 \x01(\x0b\x32\x0e.bloock.Signer\x12\x18\n\x10\x61pi_managed_host\x18\x08 \x01(\t\x12\x34\n\x11string_attributes\x18\t \x03(\x0b\x32\x19.bloock.StringAttributeV2\x12\x36\n\x12integer_attributes\x18\n \x03(\x0b\x32\x1a.bloock.IntegerAttributeV2\x12\x36\n\x12\x64\x65\x63imal_attributes\x18\x0b \x03(\x0b\x32\x1a.bloock.DecimalAttributeV2\x12\x36\n\x12\x62oolean_attributes\x18\x0c \x03(\x0b\x32\x1a.bloock.BooleanAttributeV2\x12\x30\n\x0f\x64\x61te_attributes\x18\r \x03(\x0b\x32\x17.bloock.DateAttributeV2\x12\x38\n\x13\x64\x61tetime_attributes\x18\x0e \x03(\x0b\x32\x1b.bloock.DateTimeAttributeV2B\n\n\x08_version\"\x89\x06\n\x14\x42uildSchemaRequestV2\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x14\n\x0c\x64isplay_name\x18\x02 \x01(\t\x12\x13\n\x0bschema_type\x18\x03 \x01(\t\x12\x0f\n\x07version\x18\x04 \x01(\t\x12\x13\n\x0b\x64\x65scription\x18\x05 \x01(\t\x12\x12\n\nissuer_did\x18\x06 \x01(\t\x12>\n\x11string_attributes\x18\x07 \x03(\x0b\x32#.bloock.StringAttributeDefinitionV2\x12@\n\x12integer_attributes\x18\x08 \x03(\x0b\x32$.bloock.IntegerAttributeDefinitionV2\x12@\n\x12\x64\x65\x63imal_attributes\x18\t \x03(\x0b\x32$.bloock.DecimalAttributeDefinitionV2\x12@\n\x12\x62oolean_attributes\x18\n \x03(\x0b\x32$.bloock.BooleanAttributeDefinitionV2\x12:\n\x0f\x64\x61te_attributes\x18\x0b \x03(\x0b\x32!.bloock.DateAttributeDefinitionV2\x12\x42\n\x13\x64\x61tetime_attributes\x18\x0c \x03(\x0b\x32%.bloock.DateTimeAttributeDefinitionV2\x12G\n\x16string_enum_attributes\x18\r \x03(\x0b\x32\'.bloock.StringEnumAttributeDefinitionV2\x12I\n\x17integer_enum_attributes\x18\x0e \x03(\x0b\x32(.bloock.IntegerEnumAttributeDefinitionV2\x12I\n\x17\x64\x65\x63imal_enum_attributes\x18\x0f \x03(\x0b\x32(.bloock.DecimalEnumAttributeDefinitionV2\"\xa6\x01\n\x17\x43reateIdentityV2Request\x12\'\n\nissuer_key\x18\x01 \x01(\x0b\x32\x13.bloock.IdentityKey\x12\'\n\x0b\x63onfig_data\x18\x02 \x01(\x0b\x32\x12.bloock.ConfigData\x12*\n\ndid_params\x18\x03 \x01(\x0b\x32\x11.bloock.DidParamsH\x00\x88\x01\x01\x42\r\n\x0b_did_params\"\xc0\x02\n\x13\x43reateIssuerRequest\x12\'\n\nissuer_key\x18\x01 \x01(\x0b\x32\x13.bloock.IdentityKey\x12\'\n\x0b\x63onfig_data\x18\x02 \x01(\x0b\x32\x12.bloock.ConfigData\x12-\n\rissuer_params\x18\x03 \x01(\x0b\x32\x11.bloock.DidParamsH\x00\x88\x01\x01\x12\x11\n\x04name\x18\x04 \x01(\tH\x01\x88\x01\x01\x12\x18\n\x0b\x64\x65scription\x18\x05 \x01(\tH\x02\x88\x01\x01\x12\x12\n\x05image\x18\x06 \x01(\tH\x03\x88\x01\x01\x12\x1d\n\x10publish_interval\x18\x07 \x01(\x03H\x04\x88\x01\x01\x42\x10\n\x0e_issuer_paramsB\x07\n\x05_nameB\x0e\n\x0c_descriptionB\x08\n\x06_imageB\x13\n\x11_publish_interval\"\xaa\x01\n\x15GetIssuerByKeyRequest\x12\'\n\nissuer_key\x18\x01 \x01(\x0b\x32\x13.bloock.IdentityKey\x12\'\n\x0b\x63onfig_data\x18\x02 \x01(\x0b\x32\x12.bloock.ConfigData\x12-\n\rissuer_params\x18\x03 \x01(\x0b\x32\x11.bloock.DidParamsH\x00\x88\x01\x01\x42\x10\n\x0e_issuer_params\"x\n\x19PublishIssuerStateRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x12\n\nissuer_did\x18\x02 \x01(\t\x12\x1e\n\x06signer\x18\x03 \x01(\x0b\x32\x0e.bloock.Signer\"\x82\x01\n\x1a\x43reateCredentialResponseV2\x12\x37\n\x12\x63redential_receipt\x18\x01 \x01(\x0b\x32\x1b.bloock.CredentialReceiptV2\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"T\n\x18\x43reateIdentityV2Response\x12\x0b\n\x03\x64id\x18\x01 \x01(\t\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"P\n\x14\x43reateIssuerResponse\x12\x0b\n\x03\x64id\x18\x01 \x01(\t\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"f\n\x15\x42uildSchemaResponseV2\x12 \n\x06schema\x18\x01 \x01(\x0b\x32\x10.bloock.SchemaV2\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"|\n\x1aPublishIssuerStateResponse\x12\x31\n\rstate_receipt\x18\x01 \x01(\x0b\x32\x1a.bloock.IssuerStateReceipt\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"\x8e\x01\n\x19RevokeCredentialRequestV2\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12(\n\ncredential\x18\x02 \x01(\x0b\x32\x14.bloock.CredentialV2\x12\x1e\n\x06signer\x18\x03 \x01(\x0b\x32\x0e.bloock.Signer\"y\n\x1aRevokeCredentialResponseV2\x12.\n\x06result\x18\x01 \x01(\x0b\x32\x1e.bloock.CredentialRevocationV2\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error2\x90\x08\n\x11IdentityServiceV2\x12S\n\x0e\x43reateIdentity\x12\x1f.bloock.CreateIdentityV2Request\x1a .bloock.CreateIdentityV2Response\x12I\n\x0c\x43reateIssuer\x12\x1b.bloock.CreateIssuerRequest\x1a\x1c.bloock.CreateIssuerResponse\x12L\n\rGetIssuerList\x12\x1c.bloock.GetIssuerListRequest\x1a\x1d.bloock.GetIssuerListResponse\x12O\n\x0eGetIssuerByKey\x12\x1d.bloock.GetIssuerByKeyRequest\x1a\x1e.bloock.GetIssuerByKeyResponse\x12J\n\x0b\x42uildSchema\x12\x1c.bloock.BuildSchemaRequestV2\x1a\x1d.bloock.BuildSchemaResponseV2\x12\x44\n\tGetSchema\x12\x1a.bloock.GetSchemaRequestV2\x1a\x1b.bloock.GetSchemaResponseV2\x12Y\n\x10\x43reateCredential\x12!.bloock.CreateCredentialRequestV2\x1a\".bloock.CreateCredentialResponseV2\x12[\n\x12GetCredentialProof\x12!.bloock.GetCredentialProofRequest\x1a\".bloock.GetCredentialProofResponse\x12Y\n\x10RevokeCredential\x12!.bloock.RevokeCredentialRequestV2\x1a\".bloock.RevokeCredentialResponseV2\x12Y\n\x10\x43redentialToJson\x12!.bloock.CredentialToJsonRequestV2\x1a\".bloock.CredentialToJsonResponseV2\x12_\n\x12\x43redentialFromJson\x12#.bloock.CredentialFromJsonRequestV2\x1a$.bloock.CredentialFromJsonResponseV2\x12[\n\x12PublishIssuerState\x12!.bloock.PublishIssuerStateRequest\x1a\".bloock.PublishIssuerStateResponseBW\n\x1b\x63om.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protob\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'identity_v2_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'\n\033com.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto'
  _GETSCHEMAREQUESTV2._serialized_start=114
  _GETSCHEMAREQUESTV2._serialized_end=187
  _GETSCHEMARESPONSEV2._serialized_start=189
  _GETSCHEMARESPONSEV2._serialized_end=289
  _GETISSUERLISTREQUEST._serialized_start=291
  _GETISSUERLISTREQUEST._serialized_end=354
  _GETISSUERLISTRESPONSE._serialized_start=356
  _GETISSUERLISTRESPONSE._serialized_end=437
  _GETISSUERBYKEYRESPONSE._serialized_start=439
  _GETISSUERBYKEYRESPONSE._serialized_end=521
  _GETCREDENTIALPROOFREQUEST._serialized_start=523
  _GETCREDENTIALPROOFREQUEST._serialized_end=634
  _GETCREDENTIALPROOFRESPONSE._serialized_start=636
  _GETCREDENTIALPROOFRESPONSE._serialized_end=751
  _CREDENTIALTOJSONREQUESTV2._serialized_start=753
  _CREDENTIALTOJSONREQUESTV2._serialized_end=863
  _CREDENTIALTOJSONRESPONSEV2._serialized_start=865
  _CREDENTIALTOJSONRESPONSEV2._serialized_end=952
  _CREDENTIALFROMJSONREQUESTV2._serialized_start=954
  _CREDENTIALFROMJSONREQUESTV2._serialized_end=1038
  _CREDENTIALFROMJSONRESPONSEV2._serialized_start=1040
  _CREDENTIALFROMJSONRESPONSEV2._serialized_end=1157
  _CREATECREDENTIALREQUESTV2._serialized_start=1160
  _CREATECREDENTIALREQUESTV2._serialized_end=1729
  _BUILDSCHEMAREQUESTV2._serialized_start=1732
  _BUILDSCHEMAREQUESTV2._serialized_end=2509
  _CREATEIDENTITYV2REQUEST._serialized_start=2512
  _CREATEIDENTITYV2REQUEST._serialized_end=2678
  _CREATEISSUERREQUEST._serialized_start=2681
  _CREATEISSUERREQUEST._serialized_end=3001
  _GETISSUERBYKEYREQUEST._serialized_start=3004
  _GETISSUERBYKEYREQUEST._serialized_end=3174
  _PUBLISHISSUERSTATEREQUEST._serialized_start=3176
  _PUBLISHISSUERSTATEREQUEST._serialized_end=3296
  _CREATECREDENTIALRESPONSEV2._serialized_start=3299
  _CREATECREDENTIALRESPONSEV2._serialized_end=3429
  _CREATEIDENTITYV2RESPONSE._serialized_start=3431
  _CREATEIDENTITYV2RESPONSE._serialized_end=3515
  _CREATEISSUERRESPONSE._serialized_start=3517
  _CREATEISSUERRESPONSE._serialized_end=3597
  _BUILDSCHEMARESPONSEV2._serialized_start=3599
  _BUILDSCHEMARESPONSEV2._serialized_end=3701
  _PUBLISHISSUERSTATERESPONSE._serialized_start=3703
  _PUBLISHISSUERSTATERESPONSE._serialized_end=3827
  _REVOKECREDENTIALREQUESTV2._serialized_start=3830
  _REVOKECREDENTIALREQUESTV2._serialized_end=3972
  _REVOKECREDENTIALRESPONSEV2._serialized_start=3974
  _REVOKECREDENTIALRESPONSEV2._serialized_end=4095
  _IDENTITYSERVICEV2._serialized_start=4098
  _IDENTITYSERVICEV2._serialized_end=5138
# @@protoc_insertion_point(module_scope)
