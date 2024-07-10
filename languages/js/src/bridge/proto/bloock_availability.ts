/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Loader, Publisher } from "./bloock_availability_entities";
import { ConfigData } from "./bloock_config";
import { Record } from "./bloock_record_entities";
import { Error } from "./bloock_shared";

export interface PublishRequest {
  configData?: ConfigData | undefined;
  record?: Record | undefined;
  publisher?: Publisher | undefined;
}

export interface PublishResponse {
  id: string;
  error?: Error | undefined;
}

export interface RetrieveRequest {
  configData?: ConfigData | undefined;
  loader?: Loader | undefined;
}

export interface RetrieveResponse {
  record?: Record | undefined;
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublishRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.configData = ConfigData.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.record = Record.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.publisher = Publisher.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
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
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.record !== undefined) {
      obj.record = Record.toJSON(message.record);
    }
    if (message.publisher !== undefined) {
      obj.publisher = Publisher.toJSON(message.publisher);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PublishRequest>, I>>(base?: I): PublishRequest {
    return PublishRequest.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublishResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PublishResponse {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: PublishResponse): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PublishResponse>, I>>(base?: I): PublishResponse {
    return PublishResponse.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRetrieveRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.configData = ConfigData.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.loader = Loader.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
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
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.loader !== undefined) {
      obj.loader = Loader.toJSON(message.loader);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RetrieveRequest>, I>>(base?: I): RetrieveRequest {
    return RetrieveRequest.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRetrieveResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.record = Record.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
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
    if (message.record !== undefined) {
      obj.record = Record.toJSON(message.record);
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RetrieveResponse>, I>>(base?: I): RetrieveResponse {
    return RetrieveResponse.fromPartial(base ?? ({} as any));
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

export const AvailabilityServiceServiceName = "bloock.AvailabilityService";
export class AvailabilityServiceClientImpl implements AvailabilityService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || AvailabilityServiceServiceName;
    this.rpc = rpc;
    this.Publish = this.Publish.bind(this);
    this.Retrieve = this.Retrieve.bind(this);
  }
  Publish(request: PublishRequest): Promise<PublishResponse> {
    const data = PublishRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Publish", data);
    return promise.then((data) => PublishResponse.decode(_m0.Reader.create(data)));
  }

  Retrieve(request: RetrieveRequest): Promise<RetrieveResponse> {
    const data = RetrieveRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Retrieve", data);
    return promise.then((data) => RetrieveResponse.decode(_m0.Reader.create(data)));
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
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
