# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: authenticity_entities.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database

# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(
    b'\n\x1b\x61uthenticity_entities.proto\x12\x06\x62loock"J\n\x06Signer\x12\x1e\n\x03\x61lg\x18\x01 \x01(\x0e\x32\x11.bloock.SignerAlg\x12 \n\x04\x61rgs\x18\x02 \x01(\x0b\x32\x12.bloock.SignerArgs"`\n\nSignerArgs\x12\x18\n\x0bprivate_key\x18\x01 \x01(\tH\x00\x88\x01\x01\x12\x18\n\x0b\x63ommon_name\x18\x02 \x01(\tH\x01\x88\x01\x01\x42\x0e\n\x0c_private_keyB\x0e\n\x0c_common_name"p\n\tSignature\x12\x11\n\tsignature\x18\x01 \x01(\t\x12\x11\n\tprotected\x18\x02 \x01(\t\x12\'\n\x06header\x18\x03 \x01(\x0b\x32\x17.bloock.SignatureHeader\x12\x14\n\x0cmessage_hash\x18\x04 \x01(\t"+\n\x0fSignatureHeader\x12\x0b\n\x03\x61lg\x18\x01 \x01(\t\x12\x0b\n\x03kid\x18\x02 \x01(\t* \n\tSignerAlg\x12\n\n\x06\x45S256K\x10\x00\x12\x07\n\x03\x45NS\x10\x01\x42W\n\x1b\x63om.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protob\x06proto3'
)

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(
    DESCRIPTOR, "authenticity_entities_pb2", globals()
)
if _descriptor._USE_C_DESCRIPTORS == False:

    DESCRIPTOR._options = None
    DESCRIPTOR._serialized_options = b"\n\033com.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
    _SIGNERALG._serialized_start = 372
    _SIGNERALG._serialized_end = 404
    _SIGNER._serialized_start = 39
    _SIGNER._serialized_end = 113
    _SIGNERARGS._serialized_start = 115
    _SIGNERARGS._serialized_end = 211
    _SIGNATURE._serialized_start = 213
    _SIGNATURE._serialized_end = 325
    _SIGNATUREHEADER._serialized_start = 327
    _SIGNATUREHEADER._serialized_end = 370
# @@protoc_insertion_point(module_scope)
