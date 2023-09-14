/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { ConfigData } from "./config";
import {
  CertificateType,
  certificateTypeFromJSON,
  certificateTypeToJSON,
  KeyType,
  keyTypeFromJSON,
  keyTypeToJSON,
  LocalCertificate,
  LocalKey,
  ManagedCertificate,
  ManagedCertificateParams,
  ManagedKey,
  ManagedKeyParams,
} from "./keys_entities";
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

export interface GenerateLocalCertificateRequest {
  configData?: ConfigData;
  keyType: KeyType;
}

export interface GenerateLocalCertificateResponse {
  localCertificate?: LocalCertificate;
  error?: Error | undefined;
}

export interface GenerateManagedCertificateRequest {
  configData?: ConfigData;
  params?: ManagedCertificateParams;
}

export interface GenerateManagedCertificateResponse {
  managedCertificate?: ManagedCertificate;
  error?: Error | undefined;
}

export interface LoadLocalCertificateRequest {
  configData?: ConfigData;
  key: string;
}

export interface LoadLocalCertificateResponse {
  localCertificate?: LocalCertificate;
  error?: Error | undefined;
}

export interface LoadManagedCertificateRequest {
  configData?: ConfigData;
  id: string;
}

export interface LoadManagedCertificateResponse {
  managedCertificate?: ManagedCertificate;
  error?: Error | undefined;
}

export interface ImportManagedCertificateRequest {
  configData?: ConfigData;
  certificate: Uint8Array;
  password?: string | undefined;
  certificateType: CertificateType;
}

export interface ImportManagedCertificateResponse {
  managedCertificate?: ManagedCertificate;
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

function createBaseGenerateLocalCertificateRequest(): GenerateLocalCertificateRequest {
  return { configData: undefined, keyType: 0 };
}

export const GenerateLocalCertificateRequest = {
  encode(message: GenerateLocalCertificateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.keyType !== 0) {
      writer.uint32(16).int32(message.keyType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateLocalCertificateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateLocalCertificateRequest();
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

  fromJSON(object: any): GenerateLocalCertificateRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      keyType: isSet(object.keyType) ? keyTypeFromJSON(object.keyType) : 0,
    };
  },

  toJSON(message: GenerateLocalCertificateRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.keyType !== undefined && (obj.keyType = keyTypeToJSON(message.keyType));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenerateLocalCertificateRequest>, I>>(
    object: I,
  ): GenerateLocalCertificateRequest {
    const message = createBaseGenerateLocalCertificateRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.keyType = object.keyType ?? 0;
    return message;
  },
};

function createBaseGenerateLocalCertificateResponse(): GenerateLocalCertificateResponse {
  return { localCertificate: undefined, error: undefined };
}

export const GenerateLocalCertificateResponse = {
  encode(message: GenerateLocalCertificateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.localCertificate !== undefined) {
      LocalCertificate.encode(message.localCertificate, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateLocalCertificateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateLocalCertificateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.localCertificate = LocalCertificate.decode(reader, reader.uint32());
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

  fromJSON(object: any): GenerateLocalCertificateResponse {
    return {
      localCertificate: isSet(object.localCertificate) ? LocalCertificate.fromJSON(object.localCertificate) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GenerateLocalCertificateResponse): unknown {
    const obj: any = {};
    message.localCertificate !== undefined &&
      (obj.localCertificate = message.localCertificate ? LocalCertificate.toJSON(message.localCertificate) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenerateLocalCertificateResponse>, I>>(
    object: I,
  ): GenerateLocalCertificateResponse {
    const message = createBaseGenerateLocalCertificateResponse();
    message.localCertificate = (object.localCertificate !== undefined && object.localCertificate !== null)
      ? LocalCertificate.fromPartial(object.localCertificate)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseGenerateManagedCertificateRequest(): GenerateManagedCertificateRequest {
  return { configData: undefined, params: undefined };
}

export const GenerateManagedCertificateRequest = {
  encode(message: GenerateManagedCertificateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.params !== undefined) {
      ManagedCertificateParams.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateManagedCertificateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateManagedCertificateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.params = ManagedCertificateParams.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenerateManagedCertificateRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      params: isSet(object.params) ? ManagedCertificateParams.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: GenerateManagedCertificateRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.params !== undefined &&
      (obj.params = message.params ? ManagedCertificateParams.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenerateManagedCertificateRequest>, I>>(
    object: I,
  ): GenerateManagedCertificateRequest {
    const message = createBaseGenerateManagedCertificateRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.params = (object.params !== undefined && object.params !== null)
      ? ManagedCertificateParams.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseGenerateManagedCertificateResponse(): GenerateManagedCertificateResponse {
  return { managedCertificate: undefined, error: undefined };
}

export const GenerateManagedCertificateResponse = {
  encode(message: GenerateManagedCertificateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.managedCertificate !== undefined) {
      ManagedCertificate.encode(message.managedCertificate, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateManagedCertificateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateManagedCertificateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.managedCertificate = ManagedCertificate.decode(reader, reader.uint32());
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

  fromJSON(object: any): GenerateManagedCertificateResponse {
    return {
      managedCertificate: isSet(object.managedCertificate)
        ? ManagedCertificate.fromJSON(object.managedCertificate)
        : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GenerateManagedCertificateResponse): unknown {
    const obj: any = {};
    message.managedCertificate !== undefined && (obj.managedCertificate = message.managedCertificate
      ? ManagedCertificate.toJSON(message.managedCertificate)
      : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenerateManagedCertificateResponse>, I>>(
    object: I,
  ): GenerateManagedCertificateResponse {
    const message = createBaseGenerateManagedCertificateResponse();
    message.managedCertificate = (object.managedCertificate !== undefined && object.managedCertificate !== null)
      ? ManagedCertificate.fromPartial(object.managedCertificate)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseLoadLocalCertificateRequest(): LoadLocalCertificateRequest {
  return { configData: undefined, key: "" };
}

export const LoadLocalCertificateRequest = {
  encode(message: LoadLocalCertificateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.key !== "") {
      writer.uint32(26).string(message.key);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoadLocalCertificateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoadLocalCertificateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 3:
          message.key = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LoadLocalCertificateRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      key: isSet(object.key) ? String(object.key) : "",
    };
  },

  toJSON(message: LoadLocalCertificateRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.key !== undefined && (obj.key = message.key);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LoadLocalCertificateRequest>, I>>(object: I): LoadLocalCertificateRequest {
    const message = createBaseLoadLocalCertificateRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.key = object.key ?? "";
    return message;
  },
};

function createBaseLoadLocalCertificateResponse(): LoadLocalCertificateResponse {
  return { localCertificate: undefined, error: undefined };
}

export const LoadLocalCertificateResponse = {
  encode(message: LoadLocalCertificateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.localCertificate !== undefined) {
      LocalCertificate.encode(message.localCertificate, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoadLocalCertificateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoadLocalCertificateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.localCertificate = LocalCertificate.decode(reader, reader.uint32());
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

  fromJSON(object: any): LoadLocalCertificateResponse {
    return {
      localCertificate: isSet(object.localCertificate) ? LocalCertificate.fromJSON(object.localCertificate) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: LoadLocalCertificateResponse): unknown {
    const obj: any = {};
    message.localCertificate !== undefined &&
      (obj.localCertificate = message.localCertificate ? LocalCertificate.toJSON(message.localCertificate) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LoadLocalCertificateResponse>, I>>(object: I): LoadLocalCertificateResponse {
    const message = createBaseLoadLocalCertificateResponse();
    message.localCertificate = (object.localCertificate !== undefined && object.localCertificate !== null)
      ? LocalCertificate.fromPartial(object.localCertificate)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseLoadManagedCertificateRequest(): LoadManagedCertificateRequest {
  return { configData: undefined, id: "" };
}

export const LoadManagedCertificateRequest = {
  encode(message: LoadManagedCertificateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoadManagedCertificateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoadManagedCertificateRequest();
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

  fromJSON(object: any): LoadManagedCertificateRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: LoadManagedCertificateRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LoadManagedCertificateRequest>, I>>(
    object: I,
  ): LoadManagedCertificateRequest {
    const message = createBaseLoadManagedCertificateRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseLoadManagedCertificateResponse(): LoadManagedCertificateResponse {
  return { managedCertificate: undefined, error: undefined };
}

export const LoadManagedCertificateResponse = {
  encode(message: LoadManagedCertificateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.managedCertificate !== undefined) {
      ManagedCertificate.encode(message.managedCertificate, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoadManagedCertificateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoadManagedCertificateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.managedCertificate = ManagedCertificate.decode(reader, reader.uint32());
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

  fromJSON(object: any): LoadManagedCertificateResponse {
    return {
      managedCertificate: isSet(object.managedCertificate)
        ? ManagedCertificate.fromJSON(object.managedCertificate)
        : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: LoadManagedCertificateResponse): unknown {
    const obj: any = {};
    message.managedCertificate !== undefined && (obj.managedCertificate = message.managedCertificate
      ? ManagedCertificate.toJSON(message.managedCertificate)
      : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LoadManagedCertificateResponse>, I>>(
    object: I,
  ): LoadManagedCertificateResponse {
    const message = createBaseLoadManagedCertificateResponse();
    message.managedCertificate = (object.managedCertificate !== undefined && object.managedCertificate !== null)
      ? ManagedCertificate.fromPartial(object.managedCertificate)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseImportManagedCertificateRequest(): ImportManagedCertificateRequest {
  return { configData: undefined, certificate: new Uint8Array(), password: undefined, certificateType: 0 };
}

export const ImportManagedCertificateRequest = {
  encode(message: ImportManagedCertificateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.certificate.length !== 0) {
      writer.uint32(18).bytes(message.certificate);
    }
    if (message.password !== undefined) {
      writer.uint32(26).string(message.password);
    }
    if (message.certificateType !== 0) {
      writer.uint32(32).int32(message.certificateType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImportManagedCertificateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImportManagedCertificateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.certificate = reader.bytes();
          break;
        case 3:
          message.password = reader.string();
          break;
        case 4:
          message.certificateType = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ImportManagedCertificateRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      certificate: isSet(object.certificate) ? bytesFromBase64(object.certificate) : new Uint8Array(),
      password: isSet(object.password) ? String(object.password) : undefined,
      certificateType: isSet(object.certificateType) ? certificateTypeFromJSON(object.certificateType) : 0,
    };
  },

  toJSON(message: ImportManagedCertificateRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.certificate !== undefined &&
      (obj.certificate = base64FromBytes(message.certificate !== undefined ? message.certificate : new Uint8Array()));
    message.password !== undefined && (obj.password = message.password);
    message.certificateType !== undefined && (obj.certificateType = certificateTypeToJSON(message.certificateType));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ImportManagedCertificateRequest>, I>>(
    object: I,
  ): ImportManagedCertificateRequest {
    const message = createBaseImportManagedCertificateRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.certificate = object.certificate ?? new Uint8Array();
    message.password = object.password ?? undefined;
    message.certificateType = object.certificateType ?? 0;
    return message;
  },
};

function createBaseImportManagedCertificateResponse(): ImportManagedCertificateResponse {
  return { managedCertificate: undefined, error: undefined };
}

export const ImportManagedCertificateResponse = {
  encode(message: ImportManagedCertificateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.managedCertificate !== undefined) {
      ManagedCertificate.encode(message.managedCertificate, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImportManagedCertificateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImportManagedCertificateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.managedCertificate = ManagedCertificate.decode(reader, reader.uint32());
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

  fromJSON(object: any): ImportManagedCertificateResponse {
    return {
      managedCertificate: isSet(object.managedCertificate)
        ? ManagedCertificate.fromJSON(object.managedCertificate)
        : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: ImportManagedCertificateResponse): unknown {
    const obj: any = {};
    message.managedCertificate !== undefined && (obj.managedCertificate = message.managedCertificate
      ? ManagedCertificate.toJSON(message.managedCertificate)
      : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ImportManagedCertificateResponse>, I>>(
    object: I,
  ): ImportManagedCertificateResponse {
    const message = createBaseImportManagedCertificateResponse();
    message.managedCertificate = (object.managedCertificate !== undefined && object.managedCertificate !== null)
      ? ManagedCertificate.fromPartial(object.managedCertificate)
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
  GenerateLocalCertificate(request: GenerateLocalCertificateRequest): Promise<GenerateLocalCertificateResponse>;
  GenerateManagedCertificate(request: GenerateManagedCertificateRequest): Promise<GenerateManagedCertificateResponse>;
  LoadLocalCertificate(request: LoadLocalCertificateRequest): Promise<LoadLocalCertificateResponse>;
  LoadManagedCertificate(request: LoadManagedCertificateRequest): Promise<LoadManagedCertificateResponse>;
  ImportManagedCertificate(request: ImportManagedCertificateRequest): Promise<ImportManagedCertificateResponse>;
}

export class KeyServiceClientImpl implements KeyService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GenerateLocalKey = this.GenerateLocalKey.bind(this);
    this.GenerateManagedKey = this.GenerateManagedKey.bind(this);
    this.LoadLocalKey = this.LoadLocalKey.bind(this);
    this.LoadManagedKey = this.LoadManagedKey.bind(this);
    this.GenerateLocalCertificate = this.GenerateLocalCertificate.bind(this);
    this.GenerateManagedCertificate = this.GenerateManagedCertificate.bind(this);
    this.LoadLocalCertificate = this.LoadLocalCertificate.bind(this);
    this.LoadManagedCertificate = this.LoadManagedCertificate.bind(this);
    this.ImportManagedCertificate = this.ImportManagedCertificate.bind(this);
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

  GenerateLocalCertificate(request: GenerateLocalCertificateRequest): Promise<GenerateLocalCertificateResponse> {
    const data = GenerateLocalCertificateRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.KeyService", "GenerateLocalCertificate", data);
    return promise.then((data) => GenerateLocalCertificateResponse.decode(new _m0.Reader(data)));
  }

  GenerateManagedCertificate(request: GenerateManagedCertificateRequest): Promise<GenerateManagedCertificateResponse> {
    const data = GenerateManagedCertificateRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.KeyService", "GenerateManagedCertificate", data);
    return promise.then((data) => GenerateManagedCertificateResponse.decode(new _m0.Reader(data)));
  }

  LoadLocalCertificate(request: LoadLocalCertificateRequest): Promise<LoadLocalCertificateResponse> {
    const data = LoadLocalCertificateRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.KeyService", "LoadLocalCertificate", data);
    return promise.then((data) => LoadLocalCertificateResponse.decode(new _m0.Reader(data)));
  }

  LoadManagedCertificate(request: LoadManagedCertificateRequest): Promise<LoadManagedCertificateResponse> {
    const data = LoadManagedCertificateRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.KeyService", "LoadManagedCertificate", data);
    return promise.then((data) => LoadManagedCertificateResponse.decode(new _m0.Reader(data)));
  }

  ImportManagedCertificate(request: ImportManagedCertificateRequest): Promise<ImportManagedCertificateResponse> {
    const data = ImportManagedCertificateRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.KeyService", "ImportManagedCertificate", data);
    return promise.then((data) => ImportManagedCertificateResponse.decode(new _m0.Reader(data)));
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
    generateLocalCertificate: {
      name: "GenerateLocalCertificate",
      requestType: GenerateLocalCertificateRequest,
      requestStream: false,
      responseType: GenerateLocalCertificateResponse,
      responseStream: false,
      options: {},
    },
    generateManagedCertificate: {
      name: "GenerateManagedCertificate",
      requestType: GenerateManagedCertificateRequest,
      requestStream: false,
      responseType: GenerateManagedCertificateResponse,
      responseStream: false,
      options: {},
    },
    loadLocalCertificate: {
      name: "LoadLocalCertificate",
      requestType: LoadLocalCertificateRequest,
      requestStream: false,
      responseType: LoadLocalCertificateResponse,
      responseStream: false,
      options: {},
    },
    loadManagedCertificate: {
      name: "LoadManagedCertificate",
      requestType: LoadManagedCertificateRequest,
      requestStream: false,
      responseType: LoadManagedCertificateResponse,
      responseStream: false,
      options: {},
    },
    importManagedCertificate: {
      name: "ImportManagedCertificate",
      requestType: ImportManagedCertificateRequest,
      requestStream: false,
      responseType: ImportManagedCertificateResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
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
