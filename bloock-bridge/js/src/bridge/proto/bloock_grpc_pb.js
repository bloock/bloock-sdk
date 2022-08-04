// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var bloock_pb = require('./bloock_pb.js');

function serialize_bloock_HelloRequest(arg) {
  if (!(arg instanceof bloock_pb.HelloRequest)) {
    throw new Error('Expected argument of type bloock.HelloRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bloock_HelloRequest(buffer_arg) {
  return bloock_pb.HelloRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_bloock_HelloResponse(arg) {
  if (!(arg instanceof bloock_pb.HelloResponse)) {
    throw new Error('Expected argument of type bloock.HelloResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bloock_HelloResponse(buffer_arg) {
  return bloock_pb.HelloResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// The greeting service definition.
var GreeterService = exports.GreeterService = {
  // Sends a greeting
sayHello: {
    path: '/bloock.Greeter/SayHello',
    requestStream: false,
    responseStream: false,
    requestType: bloock_pb.HelloRequest,
    responseType: bloock_pb.HelloResponse,
    requestSerialize: serialize_bloock_HelloRequest,
    requestDeserialize: deserialize_bloock_HelloRequest,
    responseSerialize: serialize_bloock_HelloResponse,
    responseDeserialize: deserialize_bloock_HelloResponse,
  },
  // Sends another greeting
sayHelloWithError: {
    path: '/bloock.Greeter/SayHelloWithError',
    requestStream: false,
    responseStream: false,
    requestType: bloock_pb.HelloRequest,
    responseType: bloock_pb.HelloResponse,
    requestSerialize: serialize_bloock_HelloRequest,
    requestDeserialize: deserialize_bloock_HelloRequest,
    responseSerialize: serialize_bloock_HelloResponse,
    responseDeserialize: deserialize_bloock_HelloResponse,
  },
};

exports.GreeterClient = grpc.makeGenericClientConstructor(GreeterService);
