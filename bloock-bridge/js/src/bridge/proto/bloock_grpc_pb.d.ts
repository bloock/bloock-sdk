// package: bloock
// file: bloock.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as bloock_pb from "./bloock_pb";

interface IGreeterService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    sayHello: IGreeterService_ISayHello;
    sayHelloWithError: IGreeterService_ISayHelloWithError;
}

interface IGreeterService_ISayHello extends grpc.MethodDefinition<bloock_pb.HelloRequest, bloock_pb.HelloResponse> {
    path: "/bloock.Greeter/SayHello";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<bloock_pb.HelloRequest>;
    requestDeserialize: grpc.deserialize<bloock_pb.HelloRequest>;
    responseSerialize: grpc.serialize<bloock_pb.HelloResponse>;
    responseDeserialize: grpc.deserialize<bloock_pb.HelloResponse>;
}
interface IGreeterService_ISayHelloWithError extends grpc.MethodDefinition<bloock_pb.HelloRequest, bloock_pb.HelloResponse> {
    path: "/bloock.Greeter/SayHelloWithError";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<bloock_pb.HelloRequest>;
    requestDeserialize: grpc.deserialize<bloock_pb.HelloRequest>;
    responseSerialize: grpc.serialize<bloock_pb.HelloResponse>;
    responseDeserialize: grpc.deserialize<bloock_pb.HelloResponse>;
}

export const GreeterService: IGreeterService;

export interface IGreeterServer {
    sayHello: grpc.handleUnaryCall<bloock_pb.HelloRequest, bloock_pb.HelloResponse>;
    sayHelloWithError: grpc.handleUnaryCall<bloock_pb.HelloRequest, bloock_pb.HelloResponse>;
}

export interface IGreeterClient {
    sayHello(request: bloock_pb.HelloRequest, callback: (error: grpc.ServiceError | null, response: bloock_pb.HelloResponse) => void): grpc.ClientUnaryCall;
    sayHello(request: bloock_pb.HelloRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: bloock_pb.HelloResponse) => void): grpc.ClientUnaryCall;
    sayHello(request: bloock_pb.HelloRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: bloock_pb.HelloResponse) => void): grpc.ClientUnaryCall;
    sayHelloWithError(request: bloock_pb.HelloRequest, callback: (error: grpc.ServiceError | null, response: bloock_pb.HelloResponse) => void): grpc.ClientUnaryCall;
    sayHelloWithError(request: bloock_pb.HelloRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: bloock_pb.HelloResponse) => void): grpc.ClientUnaryCall;
    sayHelloWithError(request: bloock_pb.HelloRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: bloock_pb.HelloResponse) => void): grpc.ClientUnaryCall;
}

export class GreeterClient extends grpc.Client implements IGreeterClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public sayHello(request: bloock_pb.HelloRequest, callback: (error: grpc.ServiceError | null, response: bloock_pb.HelloResponse) => void): grpc.ClientUnaryCall;
    public sayHello(request: bloock_pb.HelloRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: bloock_pb.HelloResponse) => void): grpc.ClientUnaryCall;
    public sayHello(request: bloock_pb.HelloRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: bloock_pb.HelloResponse) => void): grpc.ClientUnaryCall;
    public sayHelloWithError(request: bloock_pb.HelloRequest, callback: (error: grpc.ServiceError | null, response: bloock_pb.HelloResponse) => void): grpc.ClientUnaryCall;
    public sayHelloWithError(request: bloock_pb.HelloRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: bloock_pb.HelloResponse) => void): grpc.ClientUnaryCall;
    public sayHelloWithError(request: bloock_pb.HelloRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: bloock_pb.HelloResponse) => void): grpc.ClientUnaryCall;
}
