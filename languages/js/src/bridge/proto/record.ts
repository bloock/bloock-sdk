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
} from "@grpc/grpc-js";
import { ConfigData } from "./config";
import Long from "long";
import { Error } from "./bloock";
import _m0 from "protobufjs/minimal";

export interface Record {
  hash: string;
}

export interface RecordReceipt {
  anchor: number;
  client: string;
  record: string;
  status: string;
}

export interface SendRecordsRequest {
  configData?: ConfigData;
  records: Record[];
}

export interface SendRecordsResponse {
  records: RecordReceipt[];
  error?: Error | undefined;
}

export interface FromHashRequest {
  hash: string;
}

export interface FromHexRequest {
  hex: string;
}

export interface FromStringRequest {
  str: string;
}

export interface FromTypedArrayRequest {
  array: Buffer;
}

export interface FromHexResponse {
  record?: Record | undefined;
  error?: Error | undefined;
}

function createBaseRecord(): Record {
  return { hash: "" };
}

export const Record = {
  encode(
    message: Record,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.hash !== "") {
      writer.uint32(10).string(message.hash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Record {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Record {
    return {
      hash: isSet(object.hash) ? String(object.hash) : "",
    };
  },

  toJSON(message: Record): unknown {
    const obj: any = {};
    message.hash !== undefined && (obj.hash = message.hash);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Record>, I>>(object: I): Record {
    const message = createBaseRecord();
    message.hash = object.hash ?? "";
    return message;
  },
};

function createBaseRecordReceipt(): RecordReceipt {
  return { anchor: 0, client: "", record: "", status: "" };
}

export const RecordReceipt = {
  encode(
    message: RecordReceipt,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.anchor !== 0) {
      writer.uint32(8).int64(message.anchor);
    }
    if (message.client !== "") {
      writer.uint32(18).string(message.client);
    }
    if (message.record !== "") {
      writer.uint32(26).string(message.record);
    }
    if (message.status !== "") {
      writer.uint32(34).string(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordReceipt {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordReceipt();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.anchor = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.client = reader.string();
          break;
        case 3:
          message.record = reader.string();
          break;
        case 4:
          message.status = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordReceipt {
    return {
      anchor: isSet(object.anchor) ? Number(object.anchor) : 0,
      client: isSet(object.client) ? String(object.client) : "",
      record: isSet(object.record) ? String(object.record) : "",
      status: isSet(object.status) ? String(object.status) : "",
    };
  },

  toJSON(message: RecordReceipt): unknown {
    const obj: any = {};
    message.anchor !== undefined && (obj.anchor = Math.round(message.anchor));
    message.client !== undefined && (obj.client = message.client);
    message.record !== undefined && (obj.record = message.record);
    message.status !== undefined && (obj.status = message.status);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordReceipt>, I>>(
    object: I
  ): RecordReceipt {
    const message = createBaseRecordReceipt();
    message.anchor = object.anchor ?? 0;
    message.client = object.client ?? "";
    message.record = object.record ?? "";
    message.status = object.status ?? "";
    return message;
  },
};

function createBaseSendRecordsRequest(): SendRecordsRequest {
  return { configData: undefined, records: [] };
}

export const SendRecordsRequest = {
  encode(
    message: SendRecordsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.records) {
      Record.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendRecordsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendRecordsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.records.push(Record.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SendRecordsRequest {
    return {
      configData: isSet(object.configData)
        ? ConfigData.fromJSON(object.configData)
        : undefined,
      records: Array.isArray(object?.records)
        ? object.records.map((e: any) => Record.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SendRecordsRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData
        ? ConfigData.toJSON(message.configData)
        : undefined);
    if (message.records) {
      obj.records = message.records.map((e) =>
        e ? Record.toJSON(e) : undefined
      );
    } else {
      obj.records = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SendRecordsRequest>, I>>(
    object: I
  ): SendRecordsRequest {
    const message = createBaseSendRecordsRequest();
    message.configData =
      object.configData !== undefined && object.configData !== null
        ? ConfigData.fromPartial(object.configData)
        : undefined;
    message.records = object.records?.map((e) => Record.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSendRecordsResponse(): SendRecordsResponse {
  return { records: [], error: undefined };
}

export const SendRecordsResponse = {
  encode(
    message: SendRecordsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.records) {
      RecordReceipt.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendRecordsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendRecordsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.records.push(RecordReceipt.decode(reader, reader.uint32()));
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

  fromJSON(object: any): SendRecordsResponse {
    return {
      records: Array.isArray(object?.records)
        ? object.records.map((e: any) => RecordReceipt.fromJSON(e))
        : [],
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: SendRecordsResponse): unknown {
    const obj: any = {};
    if (message.records) {
      obj.records = message.records.map((e) =>
        e ? RecordReceipt.toJSON(e) : undefined
      );
    } else {
      obj.records = [];
    }
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SendRecordsResponse>, I>>(
    object: I
  ): SendRecordsResponse {
    const message = createBaseSendRecordsResponse();
    message.records =
      object.records?.map((e) => RecordReceipt.fromPartial(e)) || [];
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    return message;
  },
};

function createBaseFromHashRequest(): FromHashRequest {
  return { hash: "" };
}

export const FromHashRequest = {
  encode(
    message: FromHashRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.hash !== "") {
      writer.uint32(10).string(message.hash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FromHashRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFromHashRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FromHashRequest {
    return {
      hash: isSet(object.hash) ? String(object.hash) : "",
    };
  },

  toJSON(message: FromHashRequest): unknown {
    const obj: any = {};
    message.hash !== undefined && (obj.hash = message.hash);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FromHashRequest>, I>>(
    object: I
  ): FromHashRequest {
    const message = createBaseFromHashRequest();
    message.hash = object.hash ?? "";
    return message;
  },
};

function createBaseFromHexRequest(): FromHexRequest {
  return { hex: "" };
}

export const FromHexRequest = {
  encode(
    message: FromHexRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.hex !== "") {
      writer.uint32(10).string(message.hex);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FromHexRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFromHexRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hex = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FromHexRequest {
    return {
      hex: isSet(object.hex) ? String(object.hex) : "",
    };
  },

  toJSON(message: FromHexRequest): unknown {
    const obj: any = {};
    message.hex !== undefined && (obj.hex = message.hex);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FromHexRequest>, I>>(
    object: I
  ): FromHexRequest {
    const message = createBaseFromHexRequest();
    message.hex = object.hex ?? "";
    return message;
  },
};

function createBaseFromStringRequest(): FromStringRequest {
  return { str: "" };
}

export const FromStringRequest = {
  encode(
    message: FromStringRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.str !== "") {
      writer.uint32(10).string(message.str);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FromStringRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFromStringRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.str = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FromStringRequest {
    return {
      str: isSet(object.str) ? String(object.str) : "",
    };
  },

  toJSON(message: FromStringRequest): unknown {
    const obj: any = {};
    message.str !== undefined && (obj.str = message.str);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FromStringRequest>, I>>(
    object: I
  ): FromStringRequest {
    const message = createBaseFromStringRequest();
    message.str = object.str ?? "";
    return message;
  },
};

function createBaseFromTypedArrayRequest(): FromTypedArrayRequest {
  return { array: Buffer.alloc(0) };
}

export const FromTypedArrayRequest = {
  encode(
    message: FromTypedArrayRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.array.length !== 0) {
      writer.uint32(10).bytes(message.array);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): FromTypedArrayRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFromTypedArrayRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.array = reader.bytes() as Buffer;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FromTypedArrayRequest {
    return {
      array: isSet(object.array)
        ? Buffer.from(bytesFromBase64(object.array))
        : Buffer.alloc(0),
    };
  },

  toJSON(message: FromTypedArrayRequest): unknown {
    const obj: any = {};
    message.array !== undefined &&
      (obj.array = base64FromBytes(
        message.array !== undefined ? message.array : Buffer.alloc(0)
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FromTypedArrayRequest>, I>>(
    object: I
  ): FromTypedArrayRequest {
    const message = createBaseFromTypedArrayRequest();
    message.array = object.array ?? Buffer.alloc(0);
    return message;
  },
};

function createBaseFromHexResponse(): FromHexResponse {
  return { record: undefined, error: undefined };
}

export const FromHexResponse = {
  encode(
    message: FromHexResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.record !== undefined) {
      Record.encode(message.record, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FromHexResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFromHexResponse();
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

  fromJSON(object: any): FromHexResponse {
    return {
      record: isSet(object.record) ? Record.fromJSON(object.record) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: FromHexResponse): unknown {
    const obj: any = {};
    message.record !== undefined &&
      (obj.record = message.record ? Record.toJSON(message.record) : undefined);
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FromHexResponse>, I>>(
    object: I
  ): FromHexResponse {
    const message = createBaseFromHexResponse();
    message.record =
      object.record !== undefined && object.record !== null
        ? Record.fromPartial(object.record)
        : undefined;
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    return message;
  },
};

export type RecordServiceService = typeof RecordServiceService;
export const RecordServiceService = {
  sendRecords: {
    path: "/bloock.RecordService/SendRecords",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SendRecordsRequest) =>
      Buffer.from(SendRecordsRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SendRecordsRequest.decode(value),
    responseSerialize: (value: SendRecordsResponse) =>
      Buffer.from(SendRecordsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SendRecordsResponse.decode(value),
  },
  fromHash: {
    path: "/bloock.RecordService/FromHash",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: FromHashRequest) =>
      Buffer.from(FromHashRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => FromHashRequest.decode(value),
    responseSerialize: (value: Record) =>
      Buffer.from(Record.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Record.decode(value),
  },
  fromHex: {
    path: "/bloock.RecordService/FromHex",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: FromHexRequest) =>
      Buffer.from(FromHexRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => FromHexRequest.decode(value),
    responseSerialize: (value: FromHexResponse) =>
      Buffer.from(FromHexResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => FromHexResponse.decode(value),
  },
  fromString: {
    path: "/bloock.RecordService/FromString",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: FromStringRequest) =>
      Buffer.from(FromStringRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => FromStringRequest.decode(value),
    responseSerialize: (value: Record) =>
      Buffer.from(Record.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Record.decode(value),
  },
  fromTypedArray: {
    path: "/bloock.RecordService/FromTypedArray",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: FromTypedArrayRequest) =>
      Buffer.from(FromTypedArrayRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => FromTypedArrayRequest.decode(value),
    responseSerialize: (value: Record) =>
      Buffer.from(Record.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Record.decode(value),
  },
} as const;

export interface RecordServiceServer extends UntypedServiceImplementation {
  sendRecords: handleUnaryCall<SendRecordsRequest, SendRecordsResponse>;
  fromHash: handleUnaryCall<FromHashRequest, Record>;
  fromHex: handleUnaryCall<FromHexRequest, FromHexResponse>;
  fromString: handleUnaryCall<FromStringRequest, Record>;
  fromTypedArray: handleUnaryCall<FromTypedArrayRequest, Record>;
}

export interface RecordServiceClient extends Client {
  sendRecords(
    request: SendRecordsRequest,
    callback: (
      error: ServiceError | null,
      response: SendRecordsResponse
    ) => void
  ): ClientUnaryCall;
  sendRecords(
    request: SendRecordsRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: SendRecordsResponse
    ) => void
  ): ClientUnaryCall;
  sendRecords(
    request: SendRecordsRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: SendRecordsResponse
    ) => void
  ): ClientUnaryCall;
  fromHash(
    request: FromHashRequest,
    callback: (error: ServiceError | null, response: Record) => void
  ): ClientUnaryCall;
  fromHash(
    request: FromHashRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Record) => void
  ): ClientUnaryCall;
  fromHash(
    request: FromHashRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Record) => void
  ): ClientUnaryCall;
  fromHex(
    request: FromHexRequest,
    callback: (error: ServiceError | null, response: FromHexResponse) => void
  ): ClientUnaryCall;
  fromHex(
    request: FromHexRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: FromHexResponse) => void
  ): ClientUnaryCall;
  fromHex(
    request: FromHexRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: FromHexResponse) => void
  ): ClientUnaryCall;
  fromString(
    request: FromStringRequest,
    callback: (error: ServiceError | null, response: Record) => void
  ): ClientUnaryCall;
  fromString(
    request: FromStringRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Record) => void
  ): ClientUnaryCall;
  fromString(
    request: FromStringRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Record) => void
  ): ClientUnaryCall;
  fromTypedArray(
    request: FromTypedArrayRequest,
    callback: (error: ServiceError | null, response: Record) => void
  ): ClientUnaryCall;
  fromTypedArray(
    request: FromTypedArrayRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Record) => void
  ): ClientUnaryCall;
  fromTypedArray(
    request: FromTypedArrayRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Record) => void
  ): ClientUnaryCall;
}

export const RecordServiceClient = makeGenericClientConstructor(
  RecordServiceService,
  "bloock.RecordService"
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>
  ): RecordServiceClient;
  service: typeof RecordServiceService;
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

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
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
    };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
