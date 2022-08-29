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

export interface Anchor {
  id: number;
  blockRoots: string[];
  networks: AnchorNetwork[];
  root: string;
  status: string;
}

export interface AnchorNetwork {
  name: string;
  state: string;
  txHash: string;
}

export interface GetAnchorRequest {
  configData?: ConfigData;
  anchorId: number;
}

export interface GetAnchorResponse {
  anchor?: Anchor | undefined;
  error?: Error | undefined;
}

export interface WaitAnchorRequest {
  configData?: ConfigData;
  anchorId: number;
  timeout: number;
}

export interface WaitAnchorResponse {
  anchor?: Anchor | undefined;
  error?: Error | undefined;
}

function createBaseAnchor(): Anchor {
  return { id: 0, blockRoots: [], networks: [], root: "", status: "" };
}

export const Anchor = {
  encode(
    message: Anchor,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int64(message.id);
    }
    for (const v of message.blockRoots) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.networks) {
      AnchorNetwork.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.root !== "") {
      writer.uint32(34).string(message.root);
    }
    if (message.status !== "") {
      writer.uint32(42).string(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Anchor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAnchor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.blockRoots.push(reader.string());
          break;
        case 3:
          message.networks.push(AnchorNetwork.decode(reader, reader.uint32()));
          break;
        case 4:
          message.root = reader.string();
          break;
        case 5:
          message.status = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Anchor {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      blockRoots: Array.isArray(object?.blockRoots)
        ? object.blockRoots.map((e: any) => String(e))
        : [],
      networks: Array.isArray(object?.networks)
        ? object.networks.map((e: any) => AnchorNetwork.fromJSON(e))
        : [],
      root: isSet(object.root) ? String(object.root) : "",
      status: isSet(object.status) ? String(object.status) : "",
    };
  },

  toJSON(message: Anchor): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    if (message.blockRoots) {
      obj.blockRoots = message.blockRoots.map((e) => e);
    } else {
      obj.blockRoots = [];
    }
    if (message.networks) {
      obj.networks = message.networks.map((e) =>
        e ? AnchorNetwork.toJSON(e) : undefined
      );
    } else {
      obj.networks = [];
    }
    message.root !== undefined && (obj.root = message.root);
    message.status !== undefined && (obj.status = message.status);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Anchor>, I>>(object: I): Anchor {
    const message = createBaseAnchor();
    message.id = object.id ?? 0;
    message.blockRoots = object.blockRoots?.map((e) => e) || [];
    message.networks =
      object.networks?.map((e) => AnchorNetwork.fromPartial(e)) || [];
    message.root = object.root ?? "";
    message.status = object.status ?? "";
    return message;
  },
};

function createBaseAnchorNetwork(): AnchorNetwork {
  return { name: "", state: "", txHash: "" };
}

export const AnchorNetwork = {
  encode(
    message: AnchorNetwork,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.state !== "") {
      writer.uint32(18).string(message.state);
    }
    if (message.txHash !== "") {
      writer.uint32(26).string(message.txHash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AnchorNetwork {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAnchorNetwork();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.state = reader.string();
          break;
        case 3:
          message.txHash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AnchorNetwork {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      state: isSet(object.state) ? String(object.state) : "",
      txHash: isSet(object.txHash) ? String(object.txHash) : "",
    };
  },

  toJSON(message: AnchorNetwork): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.state !== undefined && (obj.state = message.state);
    message.txHash !== undefined && (obj.txHash = message.txHash);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AnchorNetwork>, I>>(
    object: I
  ): AnchorNetwork {
    const message = createBaseAnchorNetwork();
    message.name = object.name ?? "";
    message.state = object.state ?? "";
    message.txHash = object.txHash ?? "";
    return message;
  },
};

function createBaseGetAnchorRequest(): GetAnchorRequest {
  return { configData: undefined, anchorId: 0 };
}

export const GetAnchorRequest = {
  encode(
    message: GetAnchorRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.anchorId !== 0) {
      writer.uint32(16).int64(message.anchorId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAnchorRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAnchorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.anchorId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetAnchorRequest {
    return {
      configData: isSet(object.configData)
        ? ConfigData.fromJSON(object.configData)
        : undefined,
      anchorId: isSet(object.anchorId) ? Number(object.anchorId) : 0,
    };
  },

  toJSON(message: GetAnchorRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData
        ? ConfigData.toJSON(message.configData)
        : undefined);
    message.anchorId !== undefined &&
      (obj.anchorId = Math.round(message.anchorId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetAnchorRequest>, I>>(
    object: I
  ): GetAnchorRequest {
    const message = createBaseGetAnchorRequest();
    message.configData =
      object.configData !== undefined && object.configData !== null
        ? ConfigData.fromPartial(object.configData)
        : undefined;
    message.anchorId = object.anchorId ?? 0;
    return message;
  },
};

function createBaseGetAnchorResponse(): GetAnchorResponse {
  return { anchor: undefined, error: undefined };
}

export const GetAnchorResponse = {
  encode(
    message: GetAnchorResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.anchor !== undefined) {
      Anchor.encode(message.anchor, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAnchorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAnchorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.anchor = Anchor.decode(reader, reader.uint32());
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

  fromJSON(object: any): GetAnchorResponse {
    return {
      anchor: isSet(object.anchor) ? Anchor.fromJSON(object.anchor) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GetAnchorResponse): unknown {
    const obj: any = {};
    message.anchor !== undefined &&
      (obj.anchor = message.anchor ? Anchor.toJSON(message.anchor) : undefined);
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetAnchorResponse>, I>>(
    object: I
  ): GetAnchorResponse {
    const message = createBaseGetAnchorResponse();
    message.anchor =
      object.anchor !== undefined && object.anchor !== null
        ? Anchor.fromPartial(object.anchor)
        : undefined;
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    return message;
  },
};

function createBaseWaitAnchorRequest(): WaitAnchorRequest {
  return { configData: undefined, anchorId: 0, timeout: 0 };
}

export const WaitAnchorRequest = {
  encode(
    message: WaitAnchorRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.anchorId !== 0) {
      writer.uint32(16).int64(message.anchorId);
    }
    if (message.timeout !== 0) {
      writer.uint32(24).int64(message.timeout);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WaitAnchorRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWaitAnchorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.anchorId = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.timeout = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WaitAnchorRequest {
    return {
      configData: isSet(object.configData)
        ? ConfigData.fromJSON(object.configData)
        : undefined,
      anchorId: isSet(object.anchorId) ? Number(object.anchorId) : 0,
      timeout: isSet(object.timeout) ? Number(object.timeout) : 0,
    };
  },

  toJSON(message: WaitAnchorRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData
        ? ConfigData.toJSON(message.configData)
        : undefined);
    message.anchorId !== undefined &&
      (obj.anchorId = Math.round(message.anchorId));
    message.timeout !== undefined &&
      (obj.timeout = Math.round(message.timeout));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WaitAnchorRequest>, I>>(
    object: I
  ): WaitAnchorRequest {
    const message = createBaseWaitAnchorRequest();
    message.configData =
      object.configData !== undefined && object.configData !== null
        ? ConfigData.fromPartial(object.configData)
        : undefined;
    message.anchorId = object.anchorId ?? 0;
    message.timeout = object.timeout ?? 0;
    return message;
  },
};

function createBaseWaitAnchorResponse(): WaitAnchorResponse {
  return { anchor: undefined, error: undefined };
}

export const WaitAnchorResponse = {
  encode(
    message: WaitAnchorResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.anchor !== undefined) {
      Anchor.encode(message.anchor, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WaitAnchorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWaitAnchorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.anchor = Anchor.decode(reader, reader.uint32());
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

  fromJSON(object: any): WaitAnchorResponse {
    return {
      anchor: isSet(object.anchor) ? Anchor.fromJSON(object.anchor) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: WaitAnchorResponse): unknown {
    const obj: any = {};
    message.anchor !== undefined &&
      (obj.anchor = message.anchor ? Anchor.toJSON(message.anchor) : undefined);
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WaitAnchorResponse>, I>>(
    object: I
  ): WaitAnchorResponse {
    const message = createBaseWaitAnchorResponse();
    message.anchor =
      object.anchor !== undefined && object.anchor !== null
        ? Anchor.fromPartial(object.anchor)
        : undefined;
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    return message;
  },
};

export type AnchorServiceService = typeof AnchorServiceService;
export const AnchorServiceService = {
  getAnchor: {
    path: "/bloock.AnchorService/GetAnchor",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetAnchorRequest) =>
      Buffer.from(GetAnchorRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetAnchorRequest.decode(value),
    responseSerialize: (value: GetAnchorResponse) =>
      Buffer.from(GetAnchorResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetAnchorResponse.decode(value),
  },
  waitAnchor: {
    path: "/bloock.AnchorService/WaitAnchor",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: WaitAnchorRequest) =>
      Buffer.from(WaitAnchorRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => WaitAnchorRequest.decode(value),
    responseSerialize: (value: WaitAnchorResponse) =>
      Buffer.from(WaitAnchorResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => WaitAnchorResponse.decode(value),
  },
} as const;

export interface AnchorServiceServer extends UntypedServiceImplementation {
  getAnchor: handleUnaryCall<GetAnchorRequest, GetAnchorResponse>;
  waitAnchor: handleUnaryCall<WaitAnchorRequest, WaitAnchorResponse>;
}

export interface AnchorServiceClient extends Client {
  getAnchor(
    request: GetAnchorRequest,
    callback: (error: ServiceError | null, response: GetAnchorResponse) => void
  ): ClientUnaryCall;
  getAnchor(
    request: GetAnchorRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetAnchorResponse) => void
  ): ClientUnaryCall;
  getAnchor(
    request: GetAnchorRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetAnchorResponse) => void
  ): ClientUnaryCall;
  waitAnchor(
    request: WaitAnchorRequest,
    callback: (error: ServiceError | null, response: WaitAnchorResponse) => void
  ): ClientUnaryCall;
  waitAnchor(
    request: WaitAnchorRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: WaitAnchorResponse) => void
  ): ClientUnaryCall;
  waitAnchor(
    request: WaitAnchorRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: WaitAnchorResponse) => void
  ): ClientUnaryCall;
}

export const AnchorServiceClient = makeGenericClientConstructor(
  AnchorServiceService,
  "bloock.AnchorService"
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>
  ): AnchorServiceClient;
  service: typeof AnchorServiceService;
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
