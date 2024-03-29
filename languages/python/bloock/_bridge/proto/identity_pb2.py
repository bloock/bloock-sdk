# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: identity.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from . import config_pb2 as config__pb2
from . import shared_pb2 as shared__pb2
from . import identity_entities_pb2 as identity__entities__pb2
from . import keys_entities_pb2 as keys__entities__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x0eidentity.proto\x12\x06\x62loock\x1a\x0c\x63onfig.proto\x1a\x0cshared.proto\x1a\x17identity_entities.proto\x1a\x13keys_entities.proto\"G\n\x10GetSchemaRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\n\n\x02id\x18\x02 \x01(\t\"`\n\x11GetSchemaResponse\x12\x1e\n\x06schema\x18\x01 \x01(\x0b\x32\x0e.bloock.Schema\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"P\n\x14ImportIssuerResponse\x12\x0b\n\x03\x64id\x18\x01 \x01(\t\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"o\n\x19GetCredentialProofRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x12\n\nissuer_did\x18\x02 \x01(\t\x12\x15\n\rcredential_id\x18\x03 \x01(\t\"q\n\x1aGetCredentialProofResponse\x12&\n\x05proof\x18\x01 \x01(\x0b\x32\x17.bloock.CredentialProof\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"j\n\x17\x43redentialToJsonRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12&\n\ncredential\x18\x02 \x01(\x0b\x32\x12.bloock.Credential\"U\n\x18\x43redentialToJsonResponse\x12\x0c\n\x04json\x18\x01 \x01(\t\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"R\n\x19\x43redentialFromJsonRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x0c\n\x04json\x18\x02 \x01(\t\"q\n\x1a\x43redentialFromJsonResponse\x12&\n\ncredential\x18\x01 \x01(\x0b\x32\x12.bloock.Credential\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"\xf7\x03\n\x17\x43reateCredentialRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x11\n\tschema_id\x18\x02 \x01(\t\x12\x12\n\nholder_did\x18\x03 \x01(\t\x12\x12\n\nexpiration\x18\x04 \x01(\x03\x12\x14\n\x07version\x18\x05 \x01(\x05H\x00\x88\x01\x01\x12\x18\n\x03key\x18\x06 \x01(\x0b\x32\x0b.bloock.Key\x12\x32\n\x11string_attributes\x18\x07 \x03(\x0b\x32\x17.bloock.StringAttribute\x12\x34\n\x12integer_attributes\x18\x08 \x03(\x0b\x32\x18.bloock.IntegerAttribute\x12\x34\n\x12\x64\x65\x63imal_attributes\x18\t \x03(\x0b\x32\x18.bloock.DecimalAttribute\x12\x34\n\x12\x62oolean_attributes\x18\n \x03(\x0b\x32\x18.bloock.BooleanAttribute\x12.\n\x0f\x64\x61te_attributes\x18\x0b \x03(\x0b\x32\x15.bloock.DateAttribute\x12\x36\n\x13\x64\x61tetime_attributes\x18\x0c \x03(\x0b\x32\x19.bloock.DateTimeAttributeB\n\n\x08_version\"\xe1\x05\n\x12\x42uildSchemaRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x14\n\x0c\x64isplay_name\x18\x02 \x01(\t\x12\x13\n\x0bschema_type\x18\x03 \x01(\t\x12\x0f\n\x07version\x18\x04 \x01(\t\x12\x13\n\x0b\x64\x65scription\x18\x05 \x01(\t\x12<\n\x11string_attributes\x18\x06 \x03(\x0b\x32!.bloock.StringAttributeDefinition\x12>\n\x12integer_attributes\x18\x07 \x03(\x0b\x32\".bloock.IntegerAttributeDefinition\x12>\n\x12\x64\x65\x63imal_attributes\x18\x08 \x03(\x0b\x32\".bloock.DecimalAttributeDefinition\x12>\n\x12\x62oolean_attributes\x18\t \x03(\x0b\x32\".bloock.BooleanAttributeDefinition\x12\x38\n\x0f\x64\x61te_attributes\x18\n \x03(\x0b\x32\x1f.bloock.DateAttributeDefinition\x12@\n\x13\x64\x61tetime_attributes\x18\x0b \x03(\x0b\x32#.bloock.DateTimeAttributeDefinition\x12\x45\n\x16string_enum_attributes\x18\x0c \x03(\x0b\x32%.bloock.StringEnumAttributeDefinition\x12G\n\x17integer_enum_attributes\x18\r \x03(\x0b\x32&.bloock.IntegerEnumAttributeDefinition\x12G\n\x17\x64\x65\x63imal_enum_attributes\x18\x0e \x03(\x0b\x32&.bloock.DecimalEnumAttributeDefinition\"\x7f\n\x13\x43reateHolderRequest\x12\x18\n\x03key\x18\x01 \x01(\x0b\x32\x0b.bloock.Key\x12\'\n\x0b\x63onfig_data\x18\x02 \x01(\x0b\x32\x12.bloock.ConfigData\x12%\n\ndid_method\x18\x03 \x01(\x0e\x32\x11.bloock.DidMethod\"\x96\x02\n\x13\x43reateIssuerRequest\x12\x18\n\x03key\x18\x01 \x01(\x0b\x32\x0b.bloock.Key\x12\'\n\x0b\x63onfig_data\x18\x02 \x01(\x0b\x32\x12.bloock.ConfigData\x12%\n\ndid_method\x18\x03 \x01(\x0e\x32\x11.bloock.DidMethod\x12\x11\n\x04name\x18\x04 \x01(\tH\x00\x88\x01\x01\x12\x18\n\x0b\x64\x65scription\x18\x05 \x01(\tH\x01\x88\x01\x01\x12\x12\n\x05image\x18\x06 \x01(\tH\x02\x88\x01\x01\x12\x31\n\x10publish_interval\x18\x07 \x01(\x0e\x32\x17.bloock.PublishIntervalB\x07\n\x05_nameB\x0e\n\x0c_descriptionB\x08\n\x06_image\"\x7f\n\x13ImportIssuerRequest\x12\x18\n\x03key\x18\x01 \x01(\x0b\x32\x0b.bloock.Key\x12\'\n\x0b\x63onfig_data\x18\x02 \x01(\x0b\x32\x12.bloock.ConfigData\x12%\n\ndid_method\x18\x03 \x01(\x0e\x32\x11.bloock.DidMethod\"w\n\x1e\x46orcePublishIssuerStateRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x12\n\nissuer_did\x18\x02 \x01(\t\x12\x18\n\x03key\x18\x03 \x01(\x0b\x32\x0b.bloock.Key\"~\n\x18\x43reateCredentialResponse\x12\x35\n\x12\x63redential_receipt\x18\x01 \x01(\x0b\x32\x19.bloock.CredentialReceipt\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"P\n\x14\x43reateHolderResponse\x12\x0b\n\x03\x64id\x18\x01 \x01(\t\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"P\n\x14\x43reateIssuerResponse\x12\x0b\n\x03\x64id\x18\x01 \x01(\t\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"b\n\x13\x42uildSchemaResponse\x12\x1e\n\x06schema\x18\x01 \x01(\x0b\x32\x0e.bloock.Schema\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"\x81\x01\n\x1f\x46orcePublishIssuerStateResponse\x12\x31\n\rstate_receipt\x18\x01 \x01(\x0b\x32\x1a.bloock.IssuerStateReceipt\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"\x84\x01\n\x17RevokeCredentialRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12&\n\ncredential\x18\x02 \x01(\x0b\x32\x12.bloock.Credential\x12\x18\n\x03key\x18\x03 \x01(\x0b\x32\x0b.bloock.Key\"u\n\x18RevokeCredentialResponse\x12,\n\x06result\x18\x01 \x01(\x0b\x32\x1c.bloock.CredentialRevocation\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"[\n\x19\x43reateVerificationRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x15\n\rproof_request\x18\x02 \x01(\t\"v\n\x1a\x43reateVerificationResponse\x12+\n\x06result\x18\x01 \x01(\x0b\x32\x1b.bloock.VerificationReceipt\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"g\n\x17WaitVerificationRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x12\n\nsession_id\x18\x02 \x01(\x03\x12\x0f\n\x07timeout\x18\x03 \x01(\x03\"W\n\x18WaitVerificationResponse\x12\x0e\n\x06status\x18\x01 \x01(\x08\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"[\n\x1cGetVerificationStatusRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x12\n\nsession_id\x18\x02 \x01(\x03\"\\\n\x1dGetVerificationStatusResponse\x12\x0e\n\x06status\x18\x01 \x01(\x08\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"V\n\x14GetCredentialRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x15\n\rcredential_id\x18\x02 \x01(\t\"l\n\x15GetCredentialResponse\x12&\n\ncredential\x18\x01 \x01(\x0b\x32\x12.bloock.Credential\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"u\n\x19GetCredentialOfferRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x15\n\rcredential_id\x18\x02 \x01(\t\x12\x18\n\x03key\x18\x03 \x01(\x0b\x32\x0b.bloock.Key\"c\n\x1aGetCredentialOfferResponse\x12\x18\n\x10\x63redential_offer\x18\x01 \x01(\t\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error2\xec\n\n\x0fIdentityService\x12I\n\x0c\x43reateHolder\x12\x1b.bloock.CreateHolderRequest\x1a\x1c.bloock.CreateHolderResponse\x12I\n\x0c\x43reateIssuer\x12\x1b.bloock.CreateIssuerRequest\x1a\x1c.bloock.CreateIssuerResponse\x12I\n\x0cImportIssuer\x12\x1b.bloock.ImportIssuerRequest\x1a\x1c.bloock.ImportIssuerResponse\x12\x46\n\x0b\x42uildSchema\x12\x1a.bloock.BuildSchemaRequest\x1a\x1b.bloock.BuildSchemaResponse\x12@\n\tGetSchema\x12\x18.bloock.GetSchemaRequest\x1a\x19.bloock.GetSchemaResponse\x12U\n\x10\x43reateCredential\x12\x1f.bloock.CreateCredentialRequest\x1a .bloock.CreateCredentialResponse\x12L\n\rGetCredential\x12\x1c.bloock.GetCredentialRequest\x1a\x1d.bloock.GetCredentialResponse\x12[\n\x12GetCredentialProof\x12!.bloock.GetCredentialProofRequest\x1a\".bloock.GetCredentialProofResponse\x12U\n\x10RevokeCredential\x12\x1f.bloock.RevokeCredentialRequest\x1a .bloock.RevokeCredentialResponse\x12U\n\x10\x43redentialToJson\x12\x1f.bloock.CredentialToJsonRequest\x1a .bloock.CredentialToJsonResponse\x12[\n\x12\x43redentialFromJson\x12!.bloock.CredentialFromJsonRequest\x1a\".bloock.CredentialFromJsonResponse\x12[\n\x12GetCredentialOffer\x12!.bloock.GetCredentialOfferRequest\x1a\".bloock.GetCredentialOfferResponse\x12j\n\x17\x46orcePublishIssuerState\x12&.bloock.ForcePublishIssuerStateRequest\x1a\'.bloock.ForcePublishIssuerStateResponse\x12[\n\x12\x43reateVerification\x12!.bloock.CreateVerificationRequest\x1a\".bloock.CreateVerificationResponse\x12U\n\x10WaitVerification\x12\x1f.bloock.WaitVerificationRequest\x1a .bloock.WaitVerificationResponse\x12\x64\n\x15GetVerificationStatus\x12$.bloock.GetVerificationStatusRequest\x1a%.bloock.GetVerificationStatusResponseBW\n\x1b\x63om.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protob\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'identity_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'\n\033com.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto'
  _GETSCHEMAREQUEST._serialized_start=100
  _GETSCHEMAREQUEST._serialized_end=171
  _GETSCHEMARESPONSE._serialized_start=173
  _GETSCHEMARESPONSE._serialized_end=269
  _IMPORTISSUERRESPONSE._serialized_start=271
  _IMPORTISSUERRESPONSE._serialized_end=351
  _GETCREDENTIALPROOFREQUEST._serialized_start=353
  _GETCREDENTIALPROOFREQUEST._serialized_end=464
  _GETCREDENTIALPROOFRESPONSE._serialized_start=466
  _GETCREDENTIALPROOFRESPONSE._serialized_end=579
  _CREDENTIALTOJSONREQUEST._serialized_start=581
  _CREDENTIALTOJSONREQUEST._serialized_end=687
  _CREDENTIALTOJSONRESPONSE._serialized_start=689
  _CREDENTIALTOJSONRESPONSE._serialized_end=774
  _CREDENTIALFROMJSONREQUEST._serialized_start=776
  _CREDENTIALFROMJSONREQUEST._serialized_end=858
  _CREDENTIALFROMJSONRESPONSE._serialized_start=860
  _CREDENTIALFROMJSONRESPONSE._serialized_end=973
  _CREATECREDENTIALREQUEST._serialized_start=976
  _CREATECREDENTIALREQUEST._serialized_end=1479
  _BUILDSCHEMAREQUEST._serialized_start=1482
  _BUILDSCHEMAREQUEST._serialized_end=2219
  _CREATEHOLDERREQUEST._serialized_start=2221
  _CREATEHOLDERREQUEST._serialized_end=2348
  _CREATEISSUERREQUEST._serialized_start=2351
  _CREATEISSUERREQUEST._serialized_end=2629
  _IMPORTISSUERREQUEST._serialized_start=2631
  _IMPORTISSUERREQUEST._serialized_end=2758
  _FORCEPUBLISHISSUERSTATEREQUEST._serialized_start=2760
  _FORCEPUBLISHISSUERSTATEREQUEST._serialized_end=2879
  _CREATECREDENTIALRESPONSE._serialized_start=2881
  _CREATECREDENTIALRESPONSE._serialized_end=3007
  _CREATEHOLDERRESPONSE._serialized_start=3009
  _CREATEHOLDERRESPONSE._serialized_end=3089
  _CREATEISSUERRESPONSE._serialized_start=3091
  _CREATEISSUERRESPONSE._serialized_end=3171
  _BUILDSCHEMARESPONSE._serialized_start=3173
  _BUILDSCHEMARESPONSE._serialized_end=3271
  _FORCEPUBLISHISSUERSTATERESPONSE._serialized_start=3274
  _FORCEPUBLISHISSUERSTATERESPONSE._serialized_end=3403
  _REVOKECREDENTIALREQUEST._serialized_start=3406
  _REVOKECREDENTIALREQUEST._serialized_end=3538
  _REVOKECREDENTIALRESPONSE._serialized_start=3540
  _REVOKECREDENTIALRESPONSE._serialized_end=3657
  _CREATEVERIFICATIONREQUEST._serialized_start=3659
  _CREATEVERIFICATIONREQUEST._serialized_end=3750
  _CREATEVERIFICATIONRESPONSE._serialized_start=3752
  _CREATEVERIFICATIONRESPONSE._serialized_end=3870
  _WAITVERIFICATIONREQUEST._serialized_start=3872
  _WAITVERIFICATIONREQUEST._serialized_end=3975
  _WAITVERIFICATIONRESPONSE._serialized_start=3977
  _WAITVERIFICATIONRESPONSE._serialized_end=4064
  _GETVERIFICATIONSTATUSREQUEST._serialized_start=4066
  _GETVERIFICATIONSTATUSREQUEST._serialized_end=4157
  _GETVERIFICATIONSTATUSRESPONSE._serialized_start=4159
  _GETVERIFICATIONSTATUSRESPONSE._serialized_end=4251
  _GETCREDENTIALREQUEST._serialized_start=4253
  _GETCREDENTIALREQUEST._serialized_end=4339
  _GETCREDENTIALRESPONSE._serialized_start=4341
  _GETCREDENTIALRESPONSE._serialized_end=4449
  _GETCREDENTIALOFFERREQUEST._serialized_start=4451
  _GETCREDENTIALOFFERREQUEST._serialized_end=4568
  _GETCREDENTIALOFFERRESPONSE._serialized_start=4570
  _GETCREDENTIALOFFERRESPONSE._serialized_end=4669
  _IDENTITYSERVICE._serialized_start=4672
  _IDENTITYSERVICE._serialized_end=6060
# @@protoc_insertion_point(module_scope)
