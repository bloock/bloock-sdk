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
  LocalCertificateParams,
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
  params?: LocalCertificateParams;
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
  pkcs12: Uint8Array;
  password: string;
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

export interface SetupTotpAccessControlRequest {
  configData?: ConfigData;
  managedKey?: ManagedKey | undefined;
  managedCertificate?: ManagedCertificate | undefined;
}

export interface SetupTotpAccessControlResponse {
  secret: string;
  secretQr: string;
  recoveryCodes: string[];
  error?: Error | undefined;
}

export interface SetupSecretAccessControlRequest {
  configData?: ConfigData;
  secret: string;
  email: string;
  managedKey?: ManagedKey | undefined;
  managedCertificate?: ManagedCertificate | undefined;
}

export interface SetupSecretAccessControlResponse {
  error?: Error | undefined;
}

export interface RecoverTotpAccessControlRequest {
  configData?: ConfigData;
  code: string;
  managedKey?: ManagedKey | undefined;
  managedCertificate?: ManagedCertificate | undefined;
}

export interface RecoverTotpAccessControlResponse {
  secret: string;
  secretQr: string;
  recoveryCodes: string[];
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
  return { configData: undefined, keyType: 0, key: "" };
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
    };
  },

  toJSON(message: LoadLocalKeyRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.keyType !== undefined && (obj.keyType = keyTypeToJSON(message.keyType));
    message.key !== undefined && (obj.key = message.key);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LoadLocalKeyRequest>, I>>(object: I): LoadLocalKeyRequest {
    const message = createBaseLoadLocalKeyRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.keyType = object.keyType ?? 0;
    message.key = object.key ?? "";
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
  return { configData: undefined, params: undefined };
}

export const GenerateLocalCertificateRequest = {
  encode(message: GenerateLocalCertificateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.params !== undefined) {
      LocalCertificateParams.encode(message.params, writer.uint32(18).fork()).ldelim();
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
          message.params = LocalCertificateParams.decode(reader, reader.uint32());
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
      params: isSet(object.params) ? LocalCertificateParams.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: GenerateLocalCertificateRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.params !== undefined &&
      (obj.params = message.params ? LocalCertificateParams.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenerateLocalCertificateRequest>, I>>(
    object: I,
  ): GenerateLocalCertificateRequest {
    const message = createBaseGenerateLocalCertificateRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.params = (object.params !== undefined && object.params !== null)
      ? LocalCertificateParams.fromPartial(object.params)
      : undefined;
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
  return { configData: undefined, pkcs12: new Uint8Array(), password: "" };
}

export const LoadLocalCertificateRequest = {
  encode(message: LoadLocalCertificateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.pkcs12.length !== 0) {
      writer.uint32(18).bytes(message.pkcs12);
    }
    if (message.password !== "") {
      writer.uint32(26).string(message.password);
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
        case 2:
          message.pkcs12 = reader.bytes();
          break;
        case 3:
          message.password = reader.string();
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
      pkcs12: isSet(object.pkcs12) ? bytesFromBase64(object.pkcs12) : new Uint8Array(),
      password: isSet(object.password) ? String(object.password) : "",
    };
  },

  toJSON(message: LoadLocalCertificateRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.pkcs12 !== undefined &&
      (obj.pkcs12 = base64FromBytes(message.pkcs12 !== undefined ? message.pkcs12 : new Uint8Array()));
    message.password !== undefined && (obj.password = message.password);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LoadLocalCertificateRequest>, I>>(object: I): LoadLocalCertificateRequest {
    const message = createBaseLoadLocalCertificateRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.pkcs12 = object.pkcs12 ?? new Uint8Array();
    message.password = object.password ?? "";
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

function createBaseSetupTotpAccessControlRequest(): SetupTotpAccessControlRequest {
  return { configData: undefined, managedKey: undefined, managedCertificate: undefined };
}

export const SetupTotpAccessControlRequest = {
  encode(message: SetupTotpAccessControlRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.managedKey !== undefined) {
      ManagedKey.encode(message.managedKey, writer.uint32(18).fork()).ldelim();
    }
    if (message.managedCertificate !== undefined) {
      ManagedCertificate.encode(message.managedCertificate, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetupTotpAccessControlRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetupTotpAccessControlRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.managedKey = ManagedKey.decode(reader, reader.uint32());
          break;
        case 3:
          message.managedCertificate = ManagedCertificate.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetupTotpAccessControlRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      managedKey: isSet(object.managedKey) ? ManagedKey.fromJSON(object.managedKey) : undefined,
      managedCertificate: isSet(object.managedCertificate)
        ? ManagedCertificate.fromJSON(object.managedCertificate)
        : undefined,
    };
  },

  toJSON(message: SetupTotpAccessControlRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.managedKey !== undefined &&
      (obj.managedKey = message.managedKey ? ManagedKey.toJSON(message.managedKey) : undefined);
    message.managedCertificate !== undefined && (obj.managedCertificate = message.managedCertificate
      ? ManagedCertificate.toJSON(message.managedCertificate)
      : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetupTotpAccessControlRequest>, I>>(
    object: I,
  ): SetupTotpAccessControlRequest {
    const message = createBaseSetupTotpAccessControlRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.managedKey = (object.managedKey !== undefined && object.managedKey !== null)
      ? ManagedKey.fromPartial(object.managedKey)
      : undefined;
    message.managedCertificate = (object.managedCertificate !== undefined && object.managedCertificate !== null)
      ? ManagedCertificate.fromPartial(object.managedCertificate)
      : undefined;
    return message;
  },
};

function createBaseSetupTotpAccessControlResponse(): SetupTotpAccessControlResponse {
  return { secret: "", secretQr: "", recoveryCodes: [], error: undefined };
}

export const SetupTotpAccessControlResponse = {
  encode(message: SetupTotpAccessControlResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.secret !== "") {
      writer.uint32(10).string(message.secret);
    }
    if (message.secretQr !== "") {
      writer.uint32(18).string(message.secretQr);
    }
    for (const v of message.recoveryCodes) {
      writer.uint32(26).string(v!);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetupTotpAccessControlResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetupTotpAccessControlResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.secret = reader.string();
          break;
        case 2:
          message.secretQr = reader.string();
          break;
        case 3:
          message.recoveryCodes.push(reader.string());
          break;
        case 4:
          message.error = Error.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetupTotpAccessControlResponse {
    return {
      secret: isSet(object.secret) ? String(object.secret) : "",
      secretQr: isSet(object.secretQr) ? String(object.secretQr) : "",
      recoveryCodes: Array.isArray(object?.recoveryCodes) ? object.recoveryCodes.map((e: any) => String(e)) : [],
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: SetupTotpAccessControlResponse): unknown {
    const obj: any = {};
    message.secret !== undefined && (obj.secret = message.secret);
    message.secretQr !== undefined && (obj.secretQr = message.secretQr);
    if (message.recoveryCodes) {
      obj.recoveryCodes = message.recoveryCodes.map((e) => e);
    } else {
      obj.recoveryCodes = [];
    }
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetupTotpAccessControlResponse>, I>>(
    object: I,
  ): SetupTotpAccessControlResponse {
    const message = createBaseSetupTotpAccessControlResponse();
    message.secret = object.secret ?? "";
    message.secretQr = object.secretQr ?? "";
    message.recoveryCodes = object.recoveryCodes?.map((e) => e) || [];
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseSetupSecretAccessControlRequest(): SetupSecretAccessControlRequest {
  return { configData: undefined, secret: "", email: "", managedKey: undefined, managedCertificate: undefined };
}

export const SetupSecretAccessControlRequest = {
  encode(message: SetupSecretAccessControlRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.secret !== "") {
      writer.uint32(18).string(message.secret);
    }
    if (message.email !== "") {
      writer.uint32(26).string(message.email);
    }
    if (message.managedKey !== undefined) {
      ManagedKey.encode(message.managedKey, writer.uint32(34).fork()).ldelim();
    }
    if (message.managedCertificate !== undefined) {
      ManagedCertificate.encode(message.managedCertificate, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetupSecretAccessControlRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetupSecretAccessControlRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.secret = reader.string();
          break;
        case 3:
          message.email = reader.string();
          break;
        case 4:
          message.managedKey = ManagedKey.decode(reader, reader.uint32());
          break;
        case 5:
          message.managedCertificate = ManagedCertificate.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetupSecretAccessControlRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      secret: isSet(object.secret) ? String(object.secret) : "",
      email: isSet(object.email) ? String(object.email) : "",
      managedKey: isSet(object.managedKey) ? ManagedKey.fromJSON(object.managedKey) : undefined,
      managedCertificate: isSet(object.managedCertificate)
        ? ManagedCertificate.fromJSON(object.managedCertificate)
        : undefined,
    };
  },

  toJSON(message: SetupSecretAccessControlRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.secret !== undefined && (obj.secret = message.secret);
    message.email !== undefined && (obj.email = message.email);
    message.managedKey !== undefined &&
      (obj.managedKey = message.managedKey ? ManagedKey.toJSON(message.managedKey) : undefined);
    message.managedCertificate !== undefined && (obj.managedCertificate = message.managedCertificate
      ? ManagedCertificate.toJSON(message.managedCertificate)
      : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetupSecretAccessControlRequest>, I>>(
    object: I,
  ): SetupSecretAccessControlRequest {
    const message = createBaseSetupSecretAccessControlRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.secret = object.secret ?? "";
    message.email = object.email ?? "";
    message.managedKey = (object.managedKey !== undefined && object.managedKey !== null)
      ? ManagedKey.fromPartial(object.managedKey)
      : undefined;
    message.managedCertificate = (object.managedCertificate !== undefined && object.managedCertificate !== null)
      ? ManagedCertificate.fromPartial(object.managedCertificate)
      : undefined;
    return message;
  },
};

function createBaseSetupSecretAccessControlResponse(): SetupSecretAccessControlResponse {
  return { error: undefined };
}

export const SetupSecretAccessControlResponse = {
  encode(message: SetupSecretAccessControlResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetupSecretAccessControlResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetupSecretAccessControlResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.error = Error.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetupSecretAccessControlResponse {
    return { error: isSet(object.error) ? Error.fromJSON(object.error) : undefined };
  },

  toJSON(message: SetupSecretAccessControlResponse): unknown {
    const obj: any = {};
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetupSecretAccessControlResponse>, I>>(
    object: I,
  ): SetupSecretAccessControlResponse {
    const message = createBaseSetupSecretAccessControlResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseRecoverTotpAccessControlRequest(): RecoverTotpAccessControlRequest {
  return { configData: undefined, code: "", managedKey: undefined, managedCertificate: undefined };
}

export const RecoverTotpAccessControlRequest = {
  encode(message: RecoverTotpAccessControlRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.code !== "") {
      writer.uint32(18).string(message.code);
    }
    if (message.managedKey !== undefined) {
      ManagedKey.encode(message.managedKey, writer.uint32(26).fork()).ldelim();
    }
    if (message.managedCertificate !== undefined) {
      ManagedCertificate.encode(message.managedCertificate, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecoverTotpAccessControlRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecoverTotpAccessControlRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.code = reader.string();
          break;
        case 3:
          message.managedKey = ManagedKey.decode(reader, reader.uint32());
          break;
        case 4:
          message.managedCertificate = ManagedCertificate.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecoverTotpAccessControlRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      code: isSet(object.code) ? String(object.code) : "",
      managedKey: isSet(object.managedKey) ? ManagedKey.fromJSON(object.managedKey) : undefined,
      managedCertificate: isSet(object.managedCertificate)
        ? ManagedCertificate.fromJSON(object.managedCertificate)
        : undefined,
    };
  },

  toJSON(message: RecoverTotpAccessControlRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.code !== undefined && (obj.code = message.code);
    message.managedKey !== undefined &&
      (obj.managedKey = message.managedKey ? ManagedKey.toJSON(message.managedKey) : undefined);
    message.managedCertificate !== undefined && (obj.managedCertificate = message.managedCertificate
      ? ManagedCertificate.toJSON(message.managedCertificate)
      : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecoverTotpAccessControlRequest>, I>>(
    object: I,
  ): RecoverTotpAccessControlRequest {
    const message = createBaseRecoverTotpAccessControlRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.code = object.code ?? "";
    message.managedKey = (object.managedKey !== undefined && object.managedKey !== null)
      ? ManagedKey.fromPartial(object.managedKey)
      : undefined;
    message.managedCertificate = (object.managedCertificate !== undefined && object.managedCertificate !== null)
      ? ManagedCertificate.fromPartial(object.managedCertificate)
      : undefined;
    return message;
  },
};

function createBaseRecoverTotpAccessControlResponse(): RecoverTotpAccessControlResponse {
  return { secret: "", secretQr: "", recoveryCodes: [], error: undefined };
}

export const RecoverTotpAccessControlResponse = {
  encode(message: RecoverTotpAccessControlResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.secret !== "") {
      writer.uint32(10).string(message.secret);
    }
    if (message.secretQr !== "") {
      writer.uint32(18).string(message.secretQr);
    }
    for (const v of message.recoveryCodes) {
      writer.uint32(26).string(v!);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecoverTotpAccessControlResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecoverTotpAccessControlResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.secret = reader.string();
          break;
        case 2:
          message.secretQr = reader.string();
          break;
        case 3:
          message.recoveryCodes.push(reader.string());
          break;
        case 4:
          message.error = Error.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecoverTotpAccessControlResponse {
    return {
      secret: isSet(object.secret) ? String(object.secret) : "",
      secretQr: isSet(object.secretQr) ? String(object.secretQr) : "",
      recoveryCodes: Array.isArray(object?.recoveryCodes) ? object.recoveryCodes.map((e: any) => String(e)) : [],
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: RecoverTotpAccessControlResponse): unknown {
    const obj: any = {};
    message.secret !== undefined && (obj.secret = message.secret);
    message.secretQr !== undefined && (obj.secretQr = message.secretQr);
    if (message.recoveryCodes) {
      obj.recoveryCodes = message.recoveryCodes.map((e) => e);
    } else {
      obj.recoveryCodes = [];
    }
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecoverTotpAccessControlResponse>, I>>(
    object: I,
  ): RecoverTotpAccessControlResponse {
    const message = createBaseRecoverTotpAccessControlResponse();
    message.secret = object.secret ?? "";
    message.secretQr = object.secretQr ?? "";
    message.recoveryCodes = object.recoveryCodes?.map((e) => e) || [];
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

export interface KeyService {
  GenerateLocalKey(request: GenerateLocalKeyRequest): Promise<GenerateLocalKeyResponse>;
  LoadLocalKey(request: LoadLocalKeyRequest): Promise<LoadLocalKeyResponse>;
  GenerateManagedKey(request: GenerateManagedKeyRequest): Promise<GenerateManagedKeyResponse>;
  LoadManagedKey(request: LoadManagedKeyRequest): Promise<LoadManagedKeyResponse>;
  GenerateLocalCertificate(request: GenerateLocalCertificateRequest): Promise<GenerateLocalCertificateResponse>;
  LoadLocalCertificate(request: LoadLocalCertificateRequest): Promise<LoadLocalCertificateResponse>;
  GenerateManagedCertificate(request: GenerateManagedCertificateRequest): Promise<GenerateManagedCertificateResponse>;
  LoadManagedCertificate(request: LoadManagedCertificateRequest): Promise<LoadManagedCertificateResponse>;
  ImportManagedCertificate(request: ImportManagedCertificateRequest): Promise<ImportManagedCertificateResponse>;
  SetupTotpAccessControl(request: SetupTotpAccessControlRequest): Promise<SetupTotpAccessControlResponse>;
  SetupSecretAccessControl(request: SetupSecretAccessControlRequest): Promise<SetupSecretAccessControlResponse>;
  RecoverTotpAccessControl(request: RecoverTotpAccessControlRequest): Promise<RecoverTotpAccessControlResponse>;
}

export class KeyServiceClientImpl implements KeyService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GenerateLocalKey = this.GenerateLocalKey.bind(this);
    this.LoadLocalKey = this.LoadLocalKey.bind(this);
    this.GenerateManagedKey = this.GenerateManagedKey.bind(this);
    this.LoadManagedKey = this.LoadManagedKey.bind(this);
    this.GenerateLocalCertificate = this.GenerateLocalCertificate.bind(this);
    this.LoadLocalCertificate = this.LoadLocalCertificate.bind(this);
    this.GenerateManagedCertificate = this.GenerateManagedCertificate.bind(this);
    this.LoadManagedCertificate = this.LoadManagedCertificate.bind(this);
    this.ImportManagedCertificate = this.ImportManagedCertificate.bind(this);
    this.SetupTotpAccessControl = this.SetupTotpAccessControl.bind(this);
    this.SetupSecretAccessControl = this.SetupSecretAccessControl.bind(this);
    this.RecoverTotpAccessControl = this.RecoverTotpAccessControl.bind(this);
  }
  GenerateLocalKey(request: GenerateLocalKeyRequest): Promise<GenerateLocalKeyResponse> {
    const data = GenerateLocalKeyRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.KeyService", "GenerateLocalKey", data);
    return promise.then((data) => GenerateLocalKeyResponse.decode(new _m0.Reader(data)));
  }

  LoadLocalKey(request: LoadLocalKeyRequest): Promise<LoadLocalKeyResponse> {
    const data = LoadLocalKeyRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.KeyService", "LoadLocalKey", data);
    return promise.then((data) => LoadLocalKeyResponse.decode(new _m0.Reader(data)));
  }

  GenerateManagedKey(request: GenerateManagedKeyRequest): Promise<GenerateManagedKeyResponse> {
    const data = GenerateManagedKeyRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.KeyService", "GenerateManagedKey", data);
    return promise.then((data) => GenerateManagedKeyResponse.decode(new _m0.Reader(data)));
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

  LoadLocalCertificate(request: LoadLocalCertificateRequest): Promise<LoadLocalCertificateResponse> {
    const data = LoadLocalCertificateRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.KeyService", "LoadLocalCertificate", data);
    return promise.then((data) => LoadLocalCertificateResponse.decode(new _m0.Reader(data)));
  }

  GenerateManagedCertificate(request: GenerateManagedCertificateRequest): Promise<GenerateManagedCertificateResponse> {
    const data = GenerateManagedCertificateRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.KeyService", "GenerateManagedCertificate", data);
    return promise.then((data) => GenerateManagedCertificateResponse.decode(new _m0.Reader(data)));
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

  SetupTotpAccessControl(request: SetupTotpAccessControlRequest): Promise<SetupTotpAccessControlResponse> {
    const data = SetupTotpAccessControlRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.KeyService", "SetupTotpAccessControl", data);
    return promise.then((data) => SetupTotpAccessControlResponse.decode(new _m0.Reader(data)));
  }

  SetupSecretAccessControl(request: SetupSecretAccessControlRequest): Promise<SetupSecretAccessControlResponse> {
    const data = SetupSecretAccessControlRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.KeyService", "SetupSecretAccessControl", data);
    return promise.then((data) => SetupSecretAccessControlResponse.decode(new _m0.Reader(data)));
  }

  RecoverTotpAccessControl(request: RecoverTotpAccessControlRequest): Promise<RecoverTotpAccessControlResponse> {
    const data = RecoverTotpAccessControlRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.KeyService", "RecoverTotpAccessControl", data);
    return promise.then((data) => RecoverTotpAccessControlResponse.decode(new _m0.Reader(data)));
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
    loadLocalKey: {
      name: "LoadLocalKey",
      requestType: LoadLocalKeyRequest,
      requestStream: false,
      responseType: LoadLocalKeyResponse,
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
    loadLocalCertificate: {
      name: "LoadLocalCertificate",
      requestType: LoadLocalCertificateRequest,
      requestStream: false,
      responseType: LoadLocalCertificateResponse,
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
    setupTotpAccessControl: {
      name: "SetupTotpAccessControl",
      requestType: SetupTotpAccessControlRequest,
      requestStream: false,
      responseType: SetupTotpAccessControlResponse,
      responseStream: false,
      options: {},
    },
    setupSecretAccessControl: {
      name: "SetupSecretAccessControl",
      requestType: SetupSecretAccessControlRequest,
      requestStream: false,
      responseType: SetupSecretAccessControlResponse,
      responseStream: false,
      options: {},
    },
    recoverTotpAccessControl: {
      name: "RecoverTotpAccessControl",
      requestType: RecoverTotpAccessControlRequest,
      requestStream: false,
      responseType: RecoverTotpAccessControlResponse,
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
