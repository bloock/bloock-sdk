# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: bloock.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from . import config_pb2 as config__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x0c\x62loock.proto\x12\x06\x62loock\x1a\x0c\x63onfig.proto\"@\n\x0cHelloRequest\x12\"\n\x06\x63onfig\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x0c\n\x04name\x18\x02 \x01(\t\"M\n\rHelloResponse\x12\x0f\n\x07message\x18\x01 \x01(\t\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error\"&\n\x05\x45rror\x12\x0c\n\x04kind\x18\x01 \x01(\t\x12\x0f\n\x07message\x18\x02 \x01(\t2\x84\x01\n\x07Greeter\x12\x37\n\x08SayHello\x12\x14.bloock.HelloRequest\x1a\x15.bloock.HelloResponse\x12@\n\x11SayHelloWithError\x12\x14.bloock.HelloRequest\x1a\x15.bloock.HelloResponseBQ\n\x1c\x62loock.sdk.java.bridge.protoZ1github.com/bloock/go-bridge/internal/bridge/protob\x06proto3')



_HELLOREQUEST = DESCRIPTOR.message_types_by_name['HelloRequest']
_HELLORESPONSE = DESCRIPTOR.message_types_by_name['HelloResponse']
_ERROR = DESCRIPTOR.message_types_by_name['Error']
HelloRequest = _reflection.GeneratedProtocolMessageType('HelloRequest', (_message.Message,), {
  'DESCRIPTOR' : _HELLOREQUEST,
  '__module__' : 'bloock_pb2'
  # @@protoc_insertion_point(class_scope:bloock.HelloRequest)
  })
_sym_db.RegisterMessage(HelloRequest)

HelloResponse = _reflection.GeneratedProtocolMessageType('HelloResponse', (_message.Message,), {
  'DESCRIPTOR' : _HELLORESPONSE,
  '__module__' : 'bloock_pb2'
  # @@protoc_insertion_point(class_scope:bloock.HelloResponse)
  })
_sym_db.RegisterMessage(HelloResponse)

Error = _reflection.GeneratedProtocolMessageType('Error', (_message.Message,), {
  'DESCRIPTOR' : _ERROR,
  '__module__' : 'bloock_pb2'
  # @@protoc_insertion_point(class_scope:bloock.Error)
  })
_sym_db.RegisterMessage(Error)

_GREETER = DESCRIPTOR.services_by_name['Greeter']
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'\n\034bloock.sdk.java.bridge.protoZ1github.com/bloock/go-bridge/internal/bridge/proto'
  _HELLOREQUEST._serialized_start=38
  _HELLOREQUEST._serialized_end=102
  _HELLORESPONSE._serialized_start=104
  _HELLORESPONSE._serialized_end=181
  _ERROR._serialized_start=183
  _ERROR._serialized_end=221
  _GREETER._serialized_start=224
  _GREETER._serialized_end=356
# @@protoc_insertion_point(module_scope)