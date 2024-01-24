/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Loader, Publisher } from "./availability_entities";
import { ConfigData } from "./config";
import { Record } from "./record_entities";
import { Error } from "./shared";

export interface PublishRequest {
  configData?: ConfigData;
  record?: Record;
  publisher?: Publisher;
}

export interface PublishResponse {
  id: string;
  error?: Error | undefined;
}

export interface RetrieveRequest {
  configData?: ConfigData;
  loader?: Loader;
}

export interface RetrieveResponse {
  record?: Record;
  error?: Error | undefined;
}

function createBasePublishRequest(): PublishRequest {
  return { configData: undefined, record: undefined, publisher: undefined };
}

export const PublishRequest = {
  encode(message: PublishRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.record !== undefined) {
      Record.encode(message.record, writer.uint32(18).fork()).ldelim();
    }
    if (message.publisher !== undefined) {
      Publisher.encode(message.publisher, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PublishRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublishRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.record = Record.decode(reader, reader.uint32());
          break;
        case 3:
          message.publisher = Publisher.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PublishRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      record: isSet(object.record) ? Record.fromJSON(object.record) : undefined,
      publisher: isSet(object.publisher) ? Publisher.fromJSON(object.publisher) : undefined,
    };
  },

  toJSON(message: PublishRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.record !== undefined && (obj.record = message.record ? Record.toJSON(message.record) : undefined);
    message.publisher !== undefined &&
      (obj.publisher = message.publisher ? Publisher.toJSON(message.publisher) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PublishRequest>, I>>(object: I): PublishRequest {
    const message = createBasePublishRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.record = (object.record !== undefined && object.record !== null)
      ? Record.fromPartial(object.record)
      : undefined;
    message.publisher = (object.publisher !== undefined && object.publisher !== null)
      ? Publisher.fromPartial(object.publisher)
      : undefined;
    return message;
  },
};

function createBasePublishResponse(): PublishResponse {
  return { id: "", error: undefined };
}

export const PublishResponse = {
  encode(message: PublishResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PublishResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublishResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
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

  fromJSON(object: any): PublishResponse {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: PublishResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PublishResponse>, I>>(object: I): PublishResponse {
    const message = createBasePublishResponse();
    message.id = object.id ?? "";
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseRetrieveRequest(): RetrieveRequest {
  return { configData: undefined, loader: undefined };
}

export const RetrieveRequest = {
  encode(message: RetrieveRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.loader !== undefined) {
      Loader.encode(message.loader, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RetrieveRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRetrieveRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 3:
          message.loader = Loader.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RetrieveRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      loader: isSet(object.loader) ? Loader.fromJSON(object.loader) : undefined,
    };
  },

  toJSON(message: RetrieveRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.loader !== undefined && (obj.loader = message.loader ? Loader.toJSON(message.loader) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RetrieveRequest>, I>>(object: I): RetrieveRequest {
    const message = createBaseRetrieveRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.loader = (object.loader !== undefined && object.loader !== null)
      ? Loader.fromPartial(object.loader)
      : undefined;
    return message;
  },
};

function createBaseRetrieveResponse(): RetrieveResponse {
  return { record: undefined, error: undefined };
}

export const RetrieveResponse = {
  encode(message: RetrieveResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.record !== undefined) {
      Record.encode(message.record, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RetrieveResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRetrieveResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.record = Record.decode(reader, reader.uint32());
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

  fromJSON(object: any): RetrieveResponse {
    return {
      record: isSet(object.record) ? Record.fromJSON(object.record) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: RetrieveResponse): unknown {
    const obj: any = {};
    message.record !== undefined && (obj.record = message.record ? Record.toJSON(message.record) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RetrieveResponse>, I>>(object: I): RetrieveResponse {
    const message = createBaseRetrieveResponse();
    message.record = (object.record !== undefined && object.record !== null)
      ? Record.fromPartial(object.record)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

export interface AvailabilityService {
  Publish(request: PublishRequest): Promise<PublishResponse>;
  Retrieve(request: RetrieveRequest): Promise<RetrieveResponse>;
}

export class AvailabilityServiceClientImpl implements AvailabilityService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Publish = this.Publish.bind(this);
    this.Retrieve = this.Retrieve.bind(this);
  }
  Publish(request: PublishRequest): Promise<PublishResponse> {
    const data = PublishRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.AvailabilityService", "Publish", data);
    return promise.then((data) => PublishResponse.decode(new _m0.Reader(data)));
  }

  Retrieve(request: RetrieveRequest): Promise<RetrieveResponse> {
    const data = RetrieveRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.AvailabilityService", "Retrieve", data);
    return promise.then((data) => RetrieveResponse.decode(new _m0.Reader(data)));
  }
}

export type AvailabilityServiceDefinition = typeof AvailabilityServiceDefinition;
export const AvailabilityServiceDefinition = {
  name: "AvailabilityService",
  fullName: "bloock.AvailabilityService",
  methods: {
    publish: {
      name: "Publish",
      requestType: PublishRequest,
      requestStream: false,
      responseType: PublishResponse,
      responseStream: false,
      options: {},
    },
    retrieve: {
      name: "Retrieve",
      requestType: RetrieveRequest,
      requestStream: false,
      responseType: RetrieveResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
