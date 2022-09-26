/* eslint-disable */
import {
  makeGenericClientConstructor,
  ChannelCredentials,
  ChannelOptions,
  UntypedServiceImplementation,
  handleUnaryCall,
  Client,
  ClientUnaryCall,
  Metadata,
  CallOptions,
  ServiceError,
} from '@grpc/grpc-js';
import {ConfigData} from './config';
import _m0 from 'protobufjs/minimal';

export interface HelloRequest {
  config?: ConfigData;
  name: string;
}

export interface HelloResponse {
  message: string;
  error?: Error | undefined;
}

export interface Error {
  kind: string;
  message: string;
}

function createBaseHelloRequest(): HelloRequest {
  return {config: undefined, name: ''};
}

export const HelloRequest = {
  encode(
    message: HelloRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.config !== undefined) {
      ConfigData.encode(message.config, writer.uint32(10).fork()).ldelim();
    }
    if (message.name !== '') {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HelloRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHelloRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.config = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HelloRequest {
    return {
      config: isSet(object.config)
        ? ConfigData.fromJSON(object.config)
        : undefined,
      name: isSet(object.name) ? String(object.name) : '',
    };
  },

  toJSON(message: HelloRequest): unknown {
    const obj: any = {};
    message.config !== undefined &&
      (obj.config = message.config
        ? ConfigData.toJSON(message.config)
        : undefined);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<HelloRequest>, I>>(
    object: I
  ): HelloRequest {
    const message = createBaseHelloRequest();
    message.config =
      object.config !== undefined && object.config !== null
        ? ConfigData.fromPartial(object.config)
        : undefined;
    message.name = object.name ?? '';
    return message;
  },
};

function createBaseHelloResponse(): HelloResponse {
  return {message: '', error: undefined};
}

export const HelloResponse = {
  encode(
    message: HelloResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.message !== '') {
      writer.uint32(10).string(message.message);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HelloResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHelloResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message = reader.string();
          break;
        case 2:
          message.error = Error.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HelloResponse {
    return {
      message: isSet(object.message) ? String(object.message) : '',
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: HelloResponse): unknown {
    const obj: any = {};
    message.message !== undefined && (obj.message = message.message);
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<HelloResponse>, I>>(
    object: I
  ): HelloResponse {
    const message = createBaseHelloResponse();
    message.message = object.message ?? '';
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    return message;
  },
};

function createBaseError(): Error {
  return {kind: '', message: ''};
}

export const Error = {
  encode(message: Error, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.kind !== '') {
      writer.uint32(10).string(message.kind);
    }
    if (message.message !== '') {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Error {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseError();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.kind = reader.string();
          break;
        case 2:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Error {
    return {
      kind: isSet(object.kind) ? String(object.kind) : '',
      message: isSet(object.message) ? String(object.message) : '',
    };
  },

  toJSON(message: Error): unknown {
    const obj: any = {};
    message.kind !== undefined && (obj.kind = message.kind);
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Error>, I>>(object: I): Error {
    const message = createBaseError();
    message.kind = object.kind ?? '';
    message.message = object.message ?? '';
    return message;
  },
};

/** The greeting service definition. */
export type GreeterService = typeof GreeterService;
export const GreeterService = {
  /** Sends a greeting */
  sayHello: {
    path: '/bloock.Greeter/SayHello',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: HelloRequest) =>
      Buffer.from(HelloRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => HelloRequest.decode(value),
    responseSerialize: (value: HelloResponse) =>
      Buffer.from(HelloResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => HelloResponse.decode(value),
  },
  /** Sends another greeting */
  sayHelloWithError: {
    path: '/bloock.Greeter/SayHelloWithError',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: HelloRequest) =>
      Buffer.from(HelloRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => HelloRequest.decode(value),
    responseSerialize: (value: HelloResponse) =>
      Buffer.from(HelloResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => HelloResponse.decode(value),
  },
} as const;

export interface GreeterServer extends UntypedServiceImplementation {
  /** Sends a greeting */
  sayHello: handleUnaryCall<HelloRequest, HelloResponse>;
  /** Sends another greeting */
  sayHelloWithError: handleUnaryCall<HelloRequest, HelloResponse>;
}

export interface GreeterClient extends Client {
  /** Sends a greeting */
  sayHello(
    request: HelloRequest,
    callback: (error: ServiceError | null, response: HelloResponse) => void
  ): ClientUnaryCall;
  sayHello(
    request: HelloRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: HelloResponse) => void
  ): ClientUnaryCall;
  sayHello(
    request: HelloRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: HelloResponse) => void
  ): ClientUnaryCall;
  /** Sends another greeting */
  sayHelloWithError(
    request: HelloRequest,
    callback: (error: ServiceError | null, response: HelloResponse) => void
  ): ClientUnaryCall;
  sayHelloWithError(
    request: HelloRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: HelloResponse) => void
  ): ClientUnaryCall;
  sayHelloWithError(
    request: HelloRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: HelloResponse) => void
  ): ClientUnaryCall;
}

export const GreeterClient = makeGenericClientConstructor(
  GreeterService,
  'bloock.Greeter'
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>
  ): GreeterClient;
  service: typeof GreeterService;
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? {[K in keyof T]?: DeepPartial<T[K]>}
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & {[K in keyof P]: Exact<P[K], I[K]>} & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
    };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
