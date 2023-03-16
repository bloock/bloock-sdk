/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { ConfigData } from "./config";
import { KeyType, keyTypeFromJSON, keyTypeToJSON, LocalKey, ManagedKey, ManagedKeyParams } from "./keys_entities";
import { Error } from "./shared";

export interface GenerateLocalKeyRequest {
  configData?: ConfigData;
  keyType: KeyType;
}

export interface GenerateLocalKeyResponse {
  localKey?: LocalKey;
  error?: Error | undefined;
}

export interface GenerateManagedKeyRequest {
  configData?: ConfigData;
  params?: ManagedKeyParams;
}

export interface GenerateManagedKeyResponse {
  managedKey?: ManagedKey;
  error?: Error | undefined;
}

export interface LoadLocalKeyRequest {
  configData?: ConfigData;
  keyType: KeyType;
  key: string;
  privateKey?: string | undefined;
}

export interface LoadLocalKeyResponse {
  localKey?: LocalKey;
  error?: Error | undefined;
}

export interface LoadManagedKeyRequest {
  configData?: ConfigData;
  id: string;
}

export interface LoadManagedKeyResponse {
  managedKey?: ManagedKey;
  error?: Error | undefined;
}

function createBaseGenerateLocalKeyRequest(): GenerateLocalKeyRequest {
  return { configData: undefined, keyType: 0 };
}

export const GenerateLocalKeyRequest = {
  encode(message: GenerateLocalKeyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.keyType !== 0) {
      writer.uint32(16).int32(message.keyType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateLocalKeyRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateLocalKeyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.keyType = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenerateLocalKeyRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      keyType: isSet(object.keyType) ? keyTypeFromJSON(object.keyType) : 0,
    };
  },

  toJSON(message: GenerateLocalKeyRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.keyType !== undefined && (obj.keyType = keyTypeToJSON(message.keyType));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenerateLocalKeyRequest>, I>>(object: I): GenerateLocalKeyRequest {
    const message = createBaseGenerateLocalKeyRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.keyType = object.keyType ?? 0;
    return message;
  },
};

function createBaseGenerateLocalKeyResponse(): GenerateLocalKeyResponse {
  return { localKey: undefined, error: undefined };
}

export const GenerateLocalKeyResponse = {
  encode(message: GenerateLocalKeyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.localKey !== undefined) {
      LocalKey.encode(message.localKey, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateLocalKeyResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateLocalKeyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.localKey = LocalKey.decode(reader, reader.uint32());
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

  fromJSON(object: any): GenerateLocalKeyResponse {
    return {
      localKey: isSet(object.localKey) ? LocalKey.fromJSON(object.localKey) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GenerateLocalKeyResponse): unknown {
    const obj: any = {};
    message.localKey !== undefined && (obj.localKey = message.localKey ? LocalKey.toJSON(message.localKey) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenerateLocalKeyResponse>, I>>(object: I): GenerateLocalKeyResponse {
    const message = createBaseGenerateLocalKeyResponse();
    message.localKey = (object.localKey !== undefined && object.localKey !== null)
      ? LocalKey.fromPartial(object.localKey)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseGenerateManagedKeyRequest(): GenerateManagedKeyRequest {
  return { configData: undefined, params: undefined };
}

export const GenerateManagedKeyRequest = {
  encode(message: GenerateManagedKeyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.params !== undefined) {
      ManagedKeyParams.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateManagedKeyRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateManagedKeyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.params = ManagedKeyParams.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenerateManagedKeyRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      params: isSet(object.params) ? ManagedKeyParams.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: GenerateManagedKeyRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.params !== undefined && (obj.params = message.params ? ManagedKeyParams.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenerateManagedKeyRequest>, I>>(object: I): GenerateManagedKeyRequest {
    const message = createBaseGenerateManagedKeyRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.params = (object.params !== undefined && object.params !== null)
      ? ManagedKeyParams.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseGenerateManagedKeyResponse(): GenerateManagedKeyResponse {
  return { managedKey: undefined, error: undefined };
}

export const GenerateManagedKeyResponse = {
  encode(message: GenerateManagedKeyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.managedKey !== undefined) {
      ManagedKey.encode(message.managedKey, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateManagedKeyResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateManagedKeyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.managedKey = ManagedKey.decode(reader, reader.uint32());
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

  fromJSON(object: any): GenerateManagedKeyResponse {
    return {
      managedKey: isSet(object.managedKey) ? ManagedKey.fromJSON(object.managedKey) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GenerateManagedKeyResponse): unknown {
    const obj: any = {};
    message.managedKey !== undefined &&
      (obj.managedKey = message.managedKey ? ManagedKey.toJSON(message.managedKey) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenerateManagedKeyResponse>, I>>(object: I): GenerateManagedKeyResponse {
    const message = createBaseGenerateManagedKeyResponse();
    message.managedKey = (object.managedKey !== undefined && object.managedKey !== null)
      ? ManagedKey.fromPartial(object.managedKey)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseLoadLocalKeyRequest(): LoadLocalKeyRequest {
  return { configData: undefined, keyType: 0, key: "", privateKey: undefined };
}

export const LoadLocalKeyRequest = {
  encode(message: LoadLocalKeyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.keyType !== 0) {
      writer.uint32(16).int32(message.keyType);
    }
    if (message.key !== "") {
      writer.uint32(26).string(message.key);
    }
    if (message.privateKey !== undefined) {
      writer.uint32(34).string(message.privateKey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoadLocalKeyRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoadLocalKeyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.keyType = reader.int32() as any;
          break;
        case 3:
          message.key = reader.string();
          break;
        case 4:
          message.privateKey = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LoadLocalKeyRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      keyType: isSet(object.keyType) ? keyTypeFromJSON(object.keyType) : 0,
      key: isSet(object.key) ? String(object.key) : "",
      privateKey: isSet(object.privateKey) ? String(object.privateKey) : undefined,
    };
  },

  toJSON(message: LoadLocalKeyRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.keyType !== undefined && (obj.keyType = keyTypeToJSON(message.keyType));
    message.key !== undefined && (obj.key = message.key);
    message.privateKey !== undefined && (obj.privateKey = message.privateKey);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LoadLocalKeyRequest>, I>>(object: I): LoadLocalKeyRequest {
    const message = createBaseLoadLocalKeyRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.keyType = object.keyType ?? 0;
    message.key = object.key ?? "";
    message.privateKey = object.privateKey ?? undefined;
    return message;
  },
};

function createBaseLoadLocalKeyResponse(): LoadLocalKeyResponse {
  return { localKey: undefined, error: undefined };
}

export const LoadLocalKeyResponse = {
  encode(message: LoadLocalKeyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.localKey !== undefined) {
      LocalKey.encode(message.localKey, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoadLocalKeyResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoadLocalKeyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.localKey = LocalKey.decode(reader, reader.uint32());
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

  fromJSON(object: any): LoadLocalKeyResponse {
    return {
      localKey: isSet(object.localKey) ? LocalKey.fromJSON(object.localKey) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: LoadLocalKeyResponse): unknown {
    const obj: any = {};
    message.localKey !== undefined && (obj.localKey = message.localKey ? LocalKey.toJSON(message.localKey) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LoadLocalKeyResponse>, I>>(object: I): LoadLocalKeyResponse {
    const message = createBaseLoadLocalKeyResponse();
    message.localKey = (object.localKey !== undefined && object.localKey !== null)
      ? LocalKey.fromPartial(object.localKey)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseLoadManagedKeyRequest(): LoadManagedKeyRequest {
  return { configData: undefined, id: "" };
}

export const LoadManagedKeyRequest = {
  encode(message: LoadManagedKeyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoadManagedKeyRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoadManagedKeyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LoadManagedKeyRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: LoadManagedKeyRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LoadManagedKeyRequest>, I>>(object: I): LoadManagedKeyRequest {
    const message = createBaseLoadManagedKeyRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseLoadManagedKeyResponse(): LoadManagedKeyResponse {
  return { managedKey: undefined, error: undefined };
}

export const LoadManagedKeyResponse = {
  encode(message: LoadManagedKeyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.managedKey !== undefined) {
      ManagedKey.encode(message.managedKey, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoadManagedKeyResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoadManagedKeyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.managedKey = ManagedKey.decode(reader, reader.uint32());
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

  fromJSON(object: any): LoadManagedKeyResponse {
    return {
      managedKey: isSet(object.managedKey) ? ManagedKey.fromJSON(object.managedKey) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: LoadManagedKeyResponse): unknown {
    const obj: any = {};
    message.managedKey !== undefined &&
      (obj.managedKey = message.managedKey ? ManagedKey.toJSON(message.managedKey) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LoadManagedKeyResponse>, I>>(object: I): LoadManagedKeyResponse {
    const message = createBaseLoadManagedKeyResponse();
    message.managedKey = (object.managedKey !== undefined && object.managedKey !== null)
      ? ManagedKey.fromPartial(object.managedKey)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

export interface KeyService {
  GenerateLocalKey(request: GenerateLocalKeyRequest): Promise<GenerateLocalKeyResponse>;
  GenerateManagedKey(request: GenerateManagedKeyRequest): Promise<GenerateManagedKeyResponse>;
  LoadLocalKey(request: LoadLocalKeyRequest): Promise<LoadLocalKeyResponse>;
  LoadManagedKey(request: LoadManagedKeyRequest): Promise<LoadManagedKeyResponse>;
}

export class KeyServiceClientImpl implements KeyService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GenerateLocalKey = this.GenerateLocalKey.bind(this);
    this.GenerateManagedKey = this.GenerateManagedKey.bind(this);
    this.LoadLocalKey = this.LoadLocalKey.bind(this);
    this.LoadManagedKey = this.LoadManagedKey.bind(this);
  }
  GenerateLocalKey(request: GenerateLocalKeyRequest): Promise<GenerateLocalKeyResponse> {
    const data = GenerateLocalKeyRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.KeyService", "GenerateLocalKey", data);
    return promise.then((data) => GenerateLocalKeyResponse.decode(new _m0.Reader(data)));
  }

  GenerateManagedKey(request: GenerateManagedKeyRequest): Promise<GenerateManagedKeyResponse> {
    const data = GenerateManagedKeyRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.KeyService", "GenerateManagedKey", data);
    return promise.then((data) => GenerateManagedKeyResponse.decode(new _m0.Reader(data)));
  }

  LoadLocalKey(request: LoadLocalKeyRequest): Promise<LoadLocalKeyResponse> {
    const data = LoadLocalKeyRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.KeyService", "LoadLocalKey", data);
    return promise.then((data) => LoadLocalKeyResponse.decode(new _m0.Reader(data)));
  }

  LoadManagedKey(request: LoadManagedKeyRequest): Promise<LoadManagedKeyResponse> {
    const data = LoadManagedKeyRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.KeyService", "LoadManagedKey", data);
    return promise.then((data) => LoadManagedKeyResponse.decode(new _m0.Reader(data)));
  }
}

export type KeyServiceDefinition = typeof KeyServiceDefinition;
export const KeyServiceDefinition = {
  name: "KeyService",
  fullName: "bloock.KeyService",
  methods: {
    generateLocalKey: {
      name: "GenerateLocalKey",
      requestType: GenerateLocalKeyRequest,
      requestStream: false,
      responseType: GenerateLocalKeyResponse,
      responseStream: false,
      options: {},
    },
    generateManagedKey: {
      name: "GenerateManagedKey",
      requestType: GenerateManagedKeyRequest,
      requestStream: false,
      responseType: GenerateManagedKeyResponse,
      responseStream: false,
      options: {},
    },
    loadLocalKey: {
      name: "LoadLocalKey",
      requestType: LoadLocalKeyRequest,
      requestStream: false,
      responseType: LoadLocalKeyResponse,
      responseStream: false,
      options: {},
    },
    loadManagedKey: {
      name: "LoadManagedKey",
      requestType: LoadManagedKeyRequest,
      requestStream: false,
      responseType: LoadManagedKeyResponse,
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
