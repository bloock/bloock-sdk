# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: bloock_keys.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from . import bloock_keys_entities_pb2 as bloock__keys__entities__pb2
from . import bloock_shared_pb2 as bloock__shared__pb2
from . import bloock_config_pb2 as bloock__config__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x11\x62loock_keys.proto\x12\x06\x62loock\x1a\x1a\x62loock_keys_entities.proto\x1a\x13\x62loock_shared.proto\x1a\x13\x62loock_config.proto\"e\n\x17GenerateLocalKeyRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12!\n\x08key_type\x18\x02 \x01(\x0e\x32\x0f.bloock.KeyType\"l\n\x18GenerateLocalKeyResponse\x12#\n\tlocal_key\x18\x01 \x01(\x0b\x32\x10.bloock.LocalKey\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"n\n\x19GenerateManagedKeyRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12(\n\x06params\x18\x02 \x01(\x0b\x32\x18.bloock.ManagedKeyParams\"r\n\x1aGenerateManagedKeyResponse\x12\'\n\x0bmanaged_key\x18\x01 \x01(\x0b\x32\x12.bloock.ManagedKey\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"n\n\x13LoadLocalKeyRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12!\n\x08key_type\x18\x02 \x01(\x0e\x32\x0f.bloock.KeyType\x12\x0b\n\x03key\x18\x03 \x01(\t\"h\n\x14LoadLocalKeyResponse\x12#\n\tlocal_key\x18\x01 \x01(\x0b\x32\x10.bloock.LocalKey\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"L\n\x15LoadManagedKeyRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\n\n\x02id\x18\x02 \x01(\t\"n\n\x16LoadManagedKeyResponse\x12\'\n\x0bmanaged_key\x18\x01 \x01(\x0b\x32\x12.bloock.ManagedKey\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"z\n\x1fGenerateLocalCertificateRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12.\n\x06params\x18\x02 \x01(\x0b\x32\x1e.bloock.LocalCertificateParams\"\x84\x01\n GenerateLocalCertificateResponse\x12\x33\n\x11local_certificate\x18\x01 \x01(\x0b\x32\x18.bloock.LocalCertificate\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"~\n!GenerateManagedCertificateRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x30\n\x06params\x18\x02 \x01(\x0b\x32 .bloock.ManagedCertificateParams\"\x8a\x01\n\"GenerateManagedCertificateResponse\x12\x37\n\x13managed_certificate\x18\x01 \x01(\x0b\x32\x1a.bloock.ManagedCertificate\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"h\n\x1bLoadLocalCertificateRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x0e\n\x06pkcs12\x18\x02 \x01(\x0c\x12\x10\n\x08password\x18\x03 \x01(\t\"\x80\x01\n\x1cLoadLocalCertificateResponse\x12\x33\n\x11local_certificate\x18\x01 \x01(\x0b\x32\x18.bloock.LocalCertificate\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"T\n\x1dLoadManagedCertificateRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\n\n\x02id\x18\x02 \x01(\t\"\x86\x01\n\x1eLoadManagedCertificateResponse\x12\x37\n\x13managed_certificate\x18\x01 \x01(\x0b\x32\x1a.bloock.ManagedCertificate\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"\xb6\x01\n\x1fImportManagedCertificateRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x13\n\x0b\x63\x65rtificate\x18\x02 \x01(\x0c\x12\x15\n\x08password\x18\x03 \x01(\tH\x00\x88\x01\x01\x12\x31\n\x10\x63\x65rtificate_type\x18\x04 \x01(\x0e\x32\x17.bloock.CertificateTypeB\x0b\n\t_password\"\x88\x01\n ImportManagedCertificateResponse\x12\x37\n\x13managed_certificate\x18\x01 \x01(\x0b\x32\x1a.bloock.ManagedCertificate\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"\xdc\x01\n\x1dSetupTotpAccessControlRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12,\n\x0bmanaged_key\x18\x02 \x01(\x0b\x32\x12.bloock.ManagedKeyH\x00\x88\x01\x01\x12<\n\x13managed_certificate\x18\x03 \x01(\x0b\x32\x1a.bloock.ManagedCertificateH\x01\x88\x01\x01\x42\x0e\n\x0c_managed_keyB\x16\n\x14_managed_certificate\"\x88\x01\n\x1eSetupTotpAccessControlResponse\x12\x0e\n\x06secret\x18\x01 \x01(\t\x12\x11\n\tsecret_qr\x18\x02 \x01(\t\x12\x16\n\x0erecovery_codes\x18\x03 \x03(\t\x12!\n\x05\x65rror\x18\x04 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"\xfd\x01\n\x1fSetupSecretAccessControlRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x0e\n\x06secret\x18\x02 \x01(\t\x12\r\n\x05\x65mail\x18\x03 \x01(\t\x12,\n\x0bmanaged_key\x18\x04 \x01(\x0b\x32\x12.bloock.ManagedKeyH\x00\x88\x01\x01\x12<\n\x13managed_certificate\x18\x05 \x01(\x0b\x32\x1a.bloock.ManagedCertificateH\x01\x88\x01\x01\x42\x0e\n\x0c_managed_keyB\x16\n\x14_managed_certificate\"O\n SetupSecretAccessControlResponse\x12!\n\x05\x65rror\x18\x01 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"\xec\x01\n\x1fRecoverTotpAccessControlRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x0c\n\x04\x63ode\x18\x02 \x01(\t\x12,\n\x0bmanaged_key\x18\x03 \x01(\x0b\x32\x12.bloock.ManagedKeyH\x00\x88\x01\x01\x12<\n\x13managed_certificate\x18\x04 \x01(\x0b\x32\x1a.bloock.ManagedCertificateH\x01\x88\x01\x01\x42\x0e\n\x0c_managed_keyB\x16\n\x14_managed_certificate\"\x8a\x01\n RecoverTotpAccessControlResponse\x12\x0e\n\x06secret\x18\x01 \x01(\t\x12\x11\n\tsecret_qr\x18\x02 \x01(\t\x12\x16\n\x0erecovery_codes\x18\x03 \x03(\t\x12!\n\x05\x65rror\x18\x04 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error2\xc2\t\n\nKeyService\x12U\n\x10GenerateLocalKey\x12\x1f.bloock.GenerateLocalKeyRequest\x1a .bloock.GenerateLocalKeyResponse\x12I\n\x0cLoadLocalKey\x12\x1b.bloock.LoadLocalKeyRequest\x1a\x1c.bloock.LoadLocalKeyResponse\x12[\n\x12GenerateManagedKey\x12!.bloock.GenerateManagedKeyRequest\x1a\".bloock.GenerateManagedKeyResponse\x12O\n\x0eLoadManagedKey\x12\x1d.bloock.LoadManagedKeyRequest\x1a\x1e.bloock.LoadManagedKeyResponse\x12m\n\x18GenerateLocalCertificate\x12\'.bloock.GenerateLocalCertificateRequest\x1a(.bloock.GenerateLocalCertificateResponse\x12\x61\n\x14LoadLocalCertificate\x12#.bloock.LoadLocalCertificateRequest\x1a$.bloock.LoadLocalCertificateResponse\x12s\n\x1aGenerateManagedCertificate\x12).bloock.GenerateManagedCertificateRequest\x1a*.bloock.GenerateManagedCertificateResponse\x12g\n\x16LoadManagedCertificate\x12%.bloock.LoadManagedCertificateRequest\x1a&.bloock.LoadManagedCertificateResponse\x12m\n\x18ImportManagedCertificate\x12\'.bloock.ImportManagedCertificateRequest\x1a(.bloock.ImportManagedCertificateResponse\x12g\n\x16SetupTotpAccessControl\x12%.bloock.SetupTotpAccessControlRequest\x1a&.bloock.SetupTotpAccessControlResponse\x12m\n\x18SetupSecretAccessControl\x12\'.bloock.SetupSecretAccessControlRequest\x1a(.bloock.SetupSecretAccessControlResponse\x12m\n\x18RecoverTotpAccessControl\x12\'.bloock.RecoverTotpAccessControlRequest\x1a(.bloock.RecoverTotpAccessControlResponseBW\n\x1b\x63om.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protob\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'bloock_keys_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'\n\033com.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto'
  _GENERATELOCALKEYREQUEST._serialized_start=99
  _GENERATELOCALKEYREQUEST._serialized_end=200
  _GENERATELOCALKEYRESPONSE._serialized_start=202
  _GENERATELOCALKEYRESPONSE._serialized_end=310
  _GENERATEMANAGEDKEYREQUEST._serialized_start=312
  _GENERATEMANAGEDKEYREQUEST._serialized_end=422
  _GENERATEMANAGEDKEYRESPONSE._serialized_start=424
  _GENERATEMANAGEDKEYRESPONSE._serialized_end=538
  _LOADLOCALKEYREQUEST._serialized_start=540
  _LOADLOCALKEYREQUEST._serialized_end=650
  _LOADLOCALKEYRESPONSE._serialized_start=652
  _LOADLOCALKEYRESPONSE._serialized_end=756
  _LOADMANAGEDKEYREQUEST._serialized_start=758
  _LOADMANAGEDKEYREQUEST._serialized_end=834
  _LOADMANAGEDKEYRESPONSE._serialized_start=836
  _LOADMANAGEDKEYRESPONSE._serialized_end=946
  _GENERATELOCALCERTIFICATEREQUEST._serialized_start=948
  _GENERATELOCALCERTIFICATEREQUEST._serialized_end=1070
  _GENERATELOCALCERTIFICATERESPONSE._serialized_start=1073
  _GENERATELOCALCERTIFICATERESPONSE._serialized_end=1205
  _GENERATEMANAGEDCERTIFICATEREQUEST._serialized_start=1207
  _GENERATEMANAGEDCERTIFICATEREQUEST._serialized_end=1333
  _GENERATEMANAGEDCERTIFICATERESPONSE._serialized_start=1336
  _GENERATEMANAGEDCERTIFICATERESPONSE._serialized_end=1474
  _LOADLOCALCERTIFICATEREQUEST._serialized_start=1476
  _LOADLOCALCERTIFICATEREQUEST._serialized_end=1580
  _LOADLOCALCERTIFICATERESPONSE._serialized_start=1583
  _LOADLOCALCERTIFICATERESPONSE._serialized_end=1711
  _LOADMANAGEDCERTIFICATEREQUEST._serialized_start=1713
  _LOADMANAGEDCERTIFICATEREQUEST._serialized_end=1797
  _LOADMANAGEDCERTIFICATERESPONSE._serialized_start=1800
  _LOADMANAGEDCERTIFICATERESPONSE._serialized_end=1934
  _IMPORTMANAGEDCERTIFICATEREQUEST._serialized_start=1937
  _IMPORTMANAGEDCERTIFICATEREQUEST._serialized_end=2119
  _IMPORTMANAGEDCERTIFICATERESPONSE._serialized_start=2122
  _IMPORTMANAGEDCERTIFICATERESPONSE._serialized_end=2258
  _SETUPTOTPACCESSCONTROLREQUEST._serialized_start=2261
  _SETUPTOTPACCESSCONTROLREQUEST._serialized_end=2481
  _SETUPTOTPACCESSCONTROLRESPONSE._serialized_start=2484
  _SETUPTOTPACCESSCONTROLRESPONSE._serialized_end=2620
  _SETUPSECRETACCESSCONTROLREQUEST._serialized_start=2623
  _SETUPSECRETACCESSCONTROLREQUEST._serialized_end=2876
  _SETUPSECRETACCESSCONTROLRESPONSE._serialized_start=2878
  _SETUPSECRETACCESSCONTROLRESPONSE._serialized_end=2957
  _RECOVERTOTPACCESSCONTROLREQUEST._serialized_start=2960
  _RECOVERTOTPACCESSCONTROLREQUEST._serialized_end=3196
  _RECOVERTOTPACCESSCONTROLRESPONSE._serialized_start=3199
  _RECOVERTOTPACCESSCONTROLRESPONSE._serialized_end=3337
  _KEYSERVICE._serialized_start=3340
  _KEYSERVICE._serialized_end=4558
# @@protoc_insertion_point(module_scope)