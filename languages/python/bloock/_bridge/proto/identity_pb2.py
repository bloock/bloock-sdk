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


from . import identity_entities_pb2 as identity__entities__pb2
from . import shared_pb2 as shared__pb2
from . import config_pb2 as config__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x0eidentity.proto\x12\x06\x62loock\x1a\x17identity_entities.proto\x1a\x0cshared.proto\x1a\x0c\x63onfig.proto\"@\n\x15\x43reateIdentityRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\"i\n\x16\x43reateIdentityResponse\x12\"\n\x08identity\x18\x01 \x01(\x0b\x32\x10.bloock.Identity\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"P\n\x13LoadIdentityRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x10\n\x08mnemonic\x18\x02 \x01(\t\"g\n\x14LoadIdentityResponse\x12\"\n\x08identity\x18\x01 \x01(\x0b\x32\x10.bloock.Identity\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"\xad\x03\n\x12\x42uildSchemaRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x14\n\x0c\x64isplay_name\x18\x02 \x01(\t\x12\x16\n\x0etechnical_name\x18\x03 \x01(\t\x12>\n\x12\x62oolean_attributes\x18\x04 \x03(\x0b\x32\".bloock.BooleanAttributeDefinition\x12\x38\n\x0f\x64\x61te_attributes\x18\x05 \x03(\x0b\x32\x1f.bloock.DateAttributeDefinition\x12@\n\x13\x64\x61tetime_attributes\x18\x06 \x03(\x0b\x32#.bloock.DateTimeAttributeDefinition\x12\x46\n\x16multichoice_attributes\x18\x07 \x03(\x0b\x32&.bloock.MultiChoiceAttributeDefinition\x12<\n\x11number_attributes\x18\x08 \x03(\x0b\x32!.bloock.NumberAttributeDefinition\"b\n\x13\x42uildSchemaResponse\x12\x1e\n\x06schema\x18\x01 \x01(\x0b\x32\x0e.bloock.Schema\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"G\n\x10GetSchemaRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\n\n\x02id\x18\x02 \x01(\t\"`\n\x11GetSchemaResponse\x12\x1e\n\x06schema\x18\x01 \x01(\x0b\x32\x0e.bloock.Schema\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"\xf9\x02\n\x17\x43reateCredentialRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x11\n\tschema_id\x18\x02 \x01(\t\x12\x12\n\nholder_key\x18\x03 \x01(\t\x12\x34\n\x12\x62oolean_attributes\x18\x04 \x03(\x0b\x32\x18.bloock.BooleanAttribute\x12.\n\x0f\x64\x61te_attributes\x18\x05 \x03(\x0b\x32\x15.bloock.DateAttribute\x12\x36\n\x13\x64\x61tetime_attributes\x18\x06 \x03(\x0b\x32\x19.bloock.DateTimeAttribute\x12<\n\x16multichoice_attributes\x18\x07 \x03(\x0b\x32\x1c.bloock.MultiChoiceAttribute\x12\x32\n\x11number_attributes\x18\x08 \x03(\x0b\x32\x17.bloock.NumberAttribute\"~\n\x18\x43reateCredentialResponse\x12\x35\n\x12\x63redential_receipt\x18\x01 \x01(\x0b\x32\x19.bloock.CredentialReceipt\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"F\n\x0fGetOfferRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\n\n\x02id\x18\x02 \x01(\t\"g\n\x10GetOfferResponse\x12&\n\x05offer\x18\x01 \x01(\x0b\x32\x17.bloock.CredentialOffer\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"z\n\x1c\x43redentialOfferToJsonRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x31\n\x10\x63redential_offer\x18\x02 \x01(\x0b\x32\x17.bloock.CredentialOffer\"Z\n\x1d\x43redentialOfferToJsonResponse\x12\x0c\n\x04json\x18\x01 \x01(\t\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"W\n\x1e\x43redentialOfferFromJsonRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x0c\n\x04json\x18\x02 \x01(\t\"\x81\x01\n\x1f\x43redentialOfferFromJsonResponse\x12\x31\n\x10\x63redential_offer\x18\x01 \x01(\x0b\x32\x17.bloock.CredentialOffer\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"\x98\x01\n\x1c\x43redentialOfferRedeemRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x31\n\x10\x63redential_offer\x18\x02 \x01(\x0b\x32\x17.bloock.CredentialOffer\x12\x1c\n\x14identity_private_key\x18\x03 \x01(\t\"t\n\x1d\x43redentialOfferRedeemResponse\x12&\n\ncredential\x18\x01 \x01(\x0b\x32\x12.bloock.Credential\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"j\n\x17\x43redentialToJsonRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12&\n\ncredential\x18\x02 \x01(\x0b\x32\x12.bloock.Credential\"U\n\x18\x43redentialToJsonResponse\x12\x0c\n\x04json\x18\x01 \x01(\t\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"R\n\x19\x43redentialFromJsonRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x0c\n\x04json\x18\x02 \x01(\t\"q\n\x1a\x43redentialFromJsonResponse\x12&\n\ncredential\x18\x01 \x01(\x0b\x32\x12.bloock.Credential\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"j\n\x17VerifyCredentialRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12&\n\ncredential\x18\x02 \x01(\x0b\x32\x12.bloock.Credential\"w\n\x18VerifyCredentialResponse\x12.\n\x06result\x18\x01 \x01(\x0b\x32\x1e.bloock.CredentialVerification\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"j\n\x17RevokeCredentialRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12&\n\ncredential\x18\x02 \x01(\x0b\x32\x12.bloock.Credential\"u\n\x18RevokeCredentialResponse\x12,\n\x06result\x18\x01 \x01(\x0b\x32\x1c.bloock.CredentialRevocation\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error2\xe7\x08\n\x0fIdentityService\x12O\n\x0e\x43reateIdentity\x12\x1d.bloock.CreateIdentityRequest\x1a\x1e.bloock.CreateIdentityResponse\x12I\n\x0cLoadIdentity\x12\x1b.bloock.LoadIdentityRequest\x1a\x1c.bloock.LoadIdentityResponse\x12\x46\n\x0b\x42uildSchema\x12\x1a.bloock.BuildSchemaRequest\x1a\x1b.bloock.BuildSchemaResponse\x12@\n\tGetSchema\x12\x18.bloock.GetSchemaRequest\x1a\x19.bloock.GetSchemaResponse\x12U\n\x10\x43reateCredential\x12\x1f.bloock.CreateCredentialRequest\x1a .bloock.CreateCredentialResponse\x12=\n\x08GetOffer\x12\x17.bloock.GetOfferRequest\x1a\x18.bloock.GetOfferResponse\x12\x64\n\x15\x43redentialOfferToJson\x12$.bloock.CredentialOfferToJsonRequest\x1a%.bloock.CredentialOfferToJsonResponse\x12j\n\x17\x43redentialOfferFromJson\x12&.bloock.CredentialOfferFromJsonRequest\x1a\'.bloock.CredentialOfferFromJsonResponse\x12\x64\n\x15\x43redentialOfferRedeem\x12$.bloock.CredentialOfferRedeemRequest\x1a%.bloock.CredentialOfferRedeemResponse\x12U\n\x10\x43redentialToJson\x12\x1f.bloock.CredentialToJsonRequest\x1a .bloock.CredentialToJsonResponse\x12[\n\x12\x43redentialFromJson\x12!.bloock.CredentialFromJsonRequest\x1a\".bloock.CredentialFromJsonResponse\x12U\n\x10VerifyCredential\x12\x1f.bloock.VerifyCredentialRequest\x1a .bloock.VerifyCredentialResponse\x12U\n\x10RevokeCredential\x12\x1f.bloock.RevokeCredentialRequest\x1a .bloock.RevokeCredentialResponseBW\n\x1b\x63om.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protob\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'identity_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'\n\033com.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto'
  _CREATEIDENTITYREQUEST._serialized_start=79
  _CREATEIDENTITYREQUEST._serialized_end=143
  _CREATEIDENTITYRESPONSE._serialized_start=145
  _CREATEIDENTITYRESPONSE._serialized_end=250
  _LOADIDENTITYREQUEST._serialized_start=252
  _LOADIDENTITYREQUEST._serialized_end=332
  _LOADIDENTITYRESPONSE._serialized_start=334
  _LOADIDENTITYRESPONSE._serialized_end=437
  _BUILDSCHEMAREQUEST._serialized_start=440
  _BUILDSCHEMAREQUEST._serialized_end=869
  _BUILDSCHEMARESPONSE._serialized_start=871
  _BUILDSCHEMARESPONSE._serialized_end=969
  _GETSCHEMAREQUEST._serialized_start=971
  _GETSCHEMAREQUEST._serialized_end=1042
  _GETSCHEMARESPONSE._serialized_start=1044
  _GETSCHEMARESPONSE._serialized_end=1140
  _CREATECREDENTIALREQUEST._serialized_start=1143
  _CREATECREDENTIALREQUEST._serialized_end=1520
  _CREATECREDENTIALRESPONSE._serialized_start=1522
  _CREATECREDENTIALRESPONSE._serialized_end=1648
  _GETOFFERREQUEST._serialized_start=1650
  _GETOFFERREQUEST._serialized_end=1720
  _GETOFFERRESPONSE._serialized_start=1722
  _GETOFFERRESPONSE._serialized_end=1825
  _CREDENTIALOFFERTOJSONREQUEST._serialized_start=1827
  _CREDENTIALOFFERTOJSONREQUEST._serialized_end=1949
  _CREDENTIALOFFERTOJSONRESPONSE._serialized_start=1951
  _CREDENTIALOFFERTOJSONRESPONSE._serialized_end=2041
  _CREDENTIALOFFERFROMJSONREQUEST._serialized_start=2043
  _CREDENTIALOFFERFROMJSONREQUEST._serialized_end=2130
  _CREDENTIALOFFERFROMJSONRESPONSE._serialized_start=2133
  _CREDENTIALOFFERFROMJSONRESPONSE._serialized_end=2262
  _CREDENTIALOFFERREDEEMREQUEST._serialized_start=2265
  _CREDENTIALOFFERREDEEMREQUEST._serialized_end=2417
  _CREDENTIALOFFERREDEEMRESPONSE._serialized_start=2419
  _CREDENTIALOFFERREDEEMRESPONSE._serialized_end=2535
  _CREDENTIALTOJSONREQUEST._serialized_start=2537
  _CREDENTIALTOJSONREQUEST._serialized_end=2643
  _CREDENTIALTOJSONRESPONSE._serialized_start=2645
  _CREDENTIALTOJSONRESPONSE._serialized_end=2730
  _CREDENTIALFROMJSONREQUEST._serialized_start=2732
  _CREDENTIALFROMJSONREQUEST._serialized_end=2814
  _CREDENTIALFROMJSONRESPONSE._serialized_start=2816
  _CREDENTIALFROMJSONRESPONSE._serialized_end=2929
  _VERIFYCREDENTIALREQUEST._serialized_start=2931
  _VERIFYCREDENTIALREQUEST._serialized_end=3037
  _VERIFYCREDENTIALRESPONSE._serialized_start=3039
  _VERIFYCREDENTIALRESPONSE._serialized_end=3158
  _REVOKECREDENTIALREQUEST._serialized_start=3160
  _REVOKECREDENTIALREQUEST._serialized_end=3266
  _REVOKECREDENTIALRESPONSE._serialized_start=3268
  _REVOKECREDENTIALRESPONSE._serialized_end=3385
  _IDENTITYSERVICE._serialized_start=3388
  _IDENTITYSERVICE._serialized_end=4515
# @@protoc_insertion_point(module_scope)
