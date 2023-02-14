/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { ConfigData } from "./config";
import { Decrypter, Encrypter, EncryptionAlg, encryptionAlgFromJSON, encryptionAlgToJSON } from "./encryption_entities";
import { Record } from "./record_entities";
import { Error } from "./shared";

export interface GenerateRsaKeyPairRequest {
  configData?: ConfigData;
}

export interface GenerateRsaKeyPairResponse {
  privateKey: string;
  publicKey: string;
  error?: Error | undefined;
}

export interface GenerateEciesKeyPairRequest {
  configData?: ConfigData;
}

export interface GenerateEciesKeyPairResponse {
  privateKey: string;
  publicKey: string;
  error?: Error | undefined;
}

export interface EncryptRequest {
  configData?: ConfigData;
  record?: Record;
  encrypter?: Encrypter;
}

export interface EncryptResponse {
  record?: Record;
  error?: Error | undefined;
}

export interface DecryptRequest {
  configData?: ConfigData;
  record?: Record;
  decrypter?: Decrypter;
}

export interface DecryptResponse {
  record?: Record;
  error?: Error | undefined;
}

export interface EncryptionAlgRequest {
  configData?: ConfigData;
  record?: Record;
}

export interface EncryptionAlgResponse {
  alg: EncryptionAlg;
  error?: Error | undefined;
}

function createBaseGenerateRsaKeyPairRequest(): GenerateRsaKeyPairRequest {
  return { configData: undefined };
}

export const GenerateRsaKeyPairRequest = {
  encode(message: GenerateRsaKeyPairRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateRsaKeyPairRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateRsaKeyPairRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenerateRsaKeyPairRequest {
    return { configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined };
  },

  toJSON(message: GenerateRsaKeyPairRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenerateRsaKeyPairRequest>, I>>(object: I): GenerateRsaKeyPairRequest {
    const message = createBaseGenerateRsaKeyPairRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    return message;
  },
};

function createBaseGenerateRsaKeyPairResponse(): GenerateRsaKeyPairResponse {
  return { privateKey: "", publicKey: "", error: undefined };
}

export const GenerateRsaKeyPairResponse = {
  encode(message: GenerateRsaKeyPairResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.privateKey !== "") {
      writer.uint32(10).string(message.privateKey);
    }
    if (message.publicKey !== "") {
      writer.uint32(18).string(message.publicKey);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateRsaKeyPairResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateRsaKeyPairResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.privateKey = reader.string();
          break;
        case 2:
          message.publicKey = reader.string();
          break;
        case 3:
          message.error = Error.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenerateRsaKeyPairResponse {
    return {
      privateKey: isSet(object.privateKey) ? String(object.privateKey) : "",
      publicKey: isSet(object.publicKey) ? String(object.publicKey) : "",
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GenerateRsaKeyPairResponse): unknown {
    const obj: any = {};
    message.privateKey !== undefined && (obj.privateKey = message.privateKey);
    message.publicKey !== undefined && (obj.publicKey = message.publicKey);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenerateRsaKeyPairResponse>, I>>(object: I): GenerateRsaKeyPairResponse {
    const message = createBaseGenerateRsaKeyPairResponse();
    message.privateKey = object.privateKey ?? "";
    message.publicKey = object.publicKey ?? "";
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseGenerateEciesKeyPairRequest(): GenerateEciesKeyPairRequest {
  return { configData: undefined };
}

export const GenerateEciesKeyPairRequest = {
  encode(message: GenerateEciesKeyPairRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateEciesKeyPairRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateEciesKeyPairRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenerateEciesKeyPairRequest {
    return { configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined };
  },

  toJSON(message: GenerateEciesKeyPairRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenerateEciesKeyPairRequest>, I>>(object: I): GenerateEciesKeyPairRequest {
    const message = createBaseGenerateEciesKeyPairRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    return message;
  },
};

function createBaseGenerateEciesKeyPairResponse(): GenerateEciesKeyPairResponse {
  return { privateKey: "", publicKey: "", error: undefined };
}

export const GenerateEciesKeyPairResponse = {
  encode(message: GenerateEciesKeyPairResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.privateKey !== "") {
      writer.uint32(10).string(message.privateKey);
    }
    if (message.publicKey !== "") {
      writer.uint32(18).string(message.publicKey);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateEciesKeyPairResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateEciesKeyPairResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.privateKey = reader.string();
          break;
        case 2:
          message.publicKey = reader.string();
          break;
        case 3:
          message.error = Error.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenerateEciesKeyPairResponse {
    return {
      privateKey: isSet(object.privateKey) ? String(object.privateKey) : "",
      publicKey: isSet(object.publicKey) ? String(object.publicKey) : "",
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GenerateEciesKeyPairResponse): unknown {
    const obj: any = {};
    message.privateKey !== undefined && (obj.privateKey = message.privateKey);
    message.publicKey !== undefined && (obj.publicKey = message.publicKey);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenerateEciesKeyPairResponse>, I>>(object: I): GenerateEciesKeyPairResponse {
    const message = createBaseGenerateEciesKeyPairResponse();
    message.privateKey = object.privateKey ?? "";
    message.publicKey = object.publicKey ?? "";
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseEncryptRequest(): EncryptRequest {
  return { configData: undefined, record: undefined, encrypter: undefined };
}

export const EncryptRequest = {
  encode(message: EncryptRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.record !== undefined) {
      Record.encode(message.record, writer.uint32(18).fork()).ldelim();
    }
    if (message.encrypter !== undefined) {
      Encrypter.encode(message.encrypter, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EncryptRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEncryptRequest();
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
          message.encrypter = Encrypter.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EncryptRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      record: isSet(object.record) ? Record.fromJSON(object.record) : undefined,
      encrypter: isSet(object.encrypter) ? Encrypter.fromJSON(object.encrypter) : undefined,
    };
  },

  toJSON(message: EncryptRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.record !== undefined && (obj.record = message.record ? Record.toJSON(message.record) : undefined);
    message.encrypter !== undefined &&
      (obj.encrypter = message.encrypter ? Encrypter.toJSON(message.encrypter) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EncryptRequest>, I>>(object: I): EncryptRequest {
    const message = createBaseEncryptRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.record = (object.record !== undefined && object.record !== null)
      ? Record.fromPartial(object.record)
      : undefined;
    message.encrypter = (object.encrypter !== undefined && object.encrypter !== null)
      ? Encrypter.fromPartial(object.encrypter)
      : undefined;
    return message;
  },
};

function createBaseEncryptResponse(): EncryptResponse {
  return { record: undefined, error: undefined };
}

export const EncryptResponse = {
  encode(message: EncryptResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.record !== undefined) {
      Record.encode(message.record, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EncryptResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEncryptResponse();
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

  fromJSON(object: any): EncryptResponse {
    return {
      record: isSet(object.record) ? Record.fromJSON(object.record) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: EncryptResponse): unknown {
    const obj: any = {};
    message.record !== undefined && (obj.record = message.record ? Record.toJSON(message.record) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EncryptResponse>, I>>(object: I): EncryptResponse {
    const message = createBaseEncryptResponse();
    message.record = (object.record !== undefined && object.record !== null)
      ? Record.fromPartial(object.record)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseDecryptRequest(): DecryptRequest {
  return { configData: undefined, record: undefined, decrypter: undefined };
}

export const DecryptRequest = {
  encode(message: DecryptRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.record !== undefined) {
      Record.encode(message.record, writer.uint32(18).fork()).ldelim();
    }
    if (message.decrypter !== undefined) {
      Decrypter.encode(message.decrypter, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DecryptRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDecryptRequest();
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
          message.decrypter = Decrypter.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DecryptRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      record: isSet(object.record) ? Record.fromJSON(object.record) : undefined,
      decrypter: isSet(object.decrypter) ? Decrypter.fromJSON(object.decrypter) : undefined,
    };
  },

  toJSON(message: DecryptRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.record !== undefined && (obj.record = message.record ? Record.toJSON(message.record) : undefined);
    message.decrypter !== undefined &&
      (obj.decrypter = message.decrypter ? Decrypter.toJSON(message.decrypter) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DecryptRequest>, I>>(object: I): DecryptRequest {
    const message = createBaseDecryptRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.record = (object.record !== undefined && object.record !== null)
      ? Record.fromPartial(object.record)
      : undefined;
    message.decrypter = (object.decrypter !== undefined && object.decrypter !== null)
      ? Decrypter.fromPartial(object.decrypter)
      : undefined;
    return message;
  },
};

function createBaseDecryptResponse(): DecryptResponse {
  return { record: undefined, error: undefined };
}

export const DecryptResponse = {
  encode(message: DecryptResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.record !== undefined) {
      Record.encode(message.record, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DecryptResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDecryptResponse();
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

  fromJSON(object: any): DecryptResponse {
    return {
      record: isSet(object.record) ? Record.fromJSON(object.record) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: DecryptResponse): unknown {
    const obj: any = {};
    message.record !== undefined && (obj.record = message.record ? Record.toJSON(message.record) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DecryptResponse>, I>>(object: I): DecryptResponse {
    const message = createBaseDecryptResponse();
    message.record = (object.record !== undefined && object.record !== null)
      ? Record.fromPartial(object.record)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseEncryptionAlgRequest(): EncryptionAlgRequest {
  return { configData: undefined, record: undefined };
}

export const EncryptionAlgRequest = {
  encode(message: EncryptionAlgRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.record !== undefined) {
      Record.encode(message.record, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EncryptionAlgRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEncryptionAlgRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.record = Record.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EncryptionAlgRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      record: isSet(object.record) ? Record.fromJSON(object.record) : undefined,
    };
  },

  toJSON(message: EncryptionAlgRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.record !== undefined && (obj.record = message.record ? Record.toJSON(message.record) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EncryptionAlgRequest>, I>>(object: I): EncryptionAlgRequest {
    const message = createBaseEncryptionAlgRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.record = (object.record !== undefined && object.record !== null)
      ? Record.fromPartial(object.record)
      : undefined;
    return message;
  },
};

function createBaseEncryptionAlgResponse(): EncryptionAlgResponse {
  return { alg: 0, error: undefined };
}

export const EncryptionAlgResponse = {
  encode(message: EncryptionAlgResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.alg !== 0) {
      writer.uint32(8).int32(message.alg);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EncryptionAlgResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEncryptionAlgResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.alg = reader.int32() as any;
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

  fromJSON(object: any): EncryptionAlgResponse {
    return {
      alg: isSet(object.alg) ? encryptionAlgFromJSON(object.alg) : 0,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: EncryptionAlgResponse): unknown {
    const obj: any = {};
    message.alg !== undefined && (obj.alg = encryptionAlgToJSON(message.alg));
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EncryptionAlgResponse>, I>>(object: I): EncryptionAlgResponse {
    const message = createBaseEncryptionAlgResponse();
    message.alg = object.alg ?? 0;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

export interface EncryptionService {
  GenerateRsaKeyPair(request: GenerateRsaKeyPairRequest): Promise<GenerateRsaKeyPairResponse>;
  GenerateEciesKeyPair(request: GenerateEciesKeyPairRequest): Promise<GenerateEciesKeyPairResponse>;
  Encrypt(request: EncryptRequest): Promise<EncryptResponse>;
  Decrypt(request: DecryptRequest): Promise<DecryptResponse>;
  GetEncryptionAlg(request: EncryptionAlgRequest): Promise<EncryptionAlgResponse>;
}

export class EncryptionServiceClientImpl implements EncryptionService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GenerateRsaKeyPair = this.GenerateRsaKeyPair.bind(this);
    this.GenerateEciesKeyPair = this.GenerateEciesKeyPair.bind(this);
    this.Encrypt = this.Encrypt.bind(this);
    this.Decrypt = this.Decrypt.bind(this);
    this.GetEncryptionAlg = this.GetEncryptionAlg.bind(this);
  }
  GenerateRsaKeyPair(request: GenerateRsaKeyPairRequest): Promise<GenerateRsaKeyPairResponse> {
    const data = GenerateRsaKeyPairRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.EncryptionService", "GenerateRsaKeyPair", data);
    return promise.then((data) => GenerateRsaKeyPairResponse.decode(new _m0.Reader(data)));
  }

  GenerateEciesKeyPair(request: GenerateEciesKeyPairRequest): Promise<GenerateEciesKeyPairResponse> {
    const data = GenerateEciesKeyPairRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.EncryptionService", "GenerateEciesKeyPair", data);
    return promise.then((data) => GenerateEciesKeyPairResponse.decode(new _m0.Reader(data)));
  }

  Encrypt(request: EncryptRequest): Promise<EncryptResponse> {
    const data = EncryptRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.EncryptionService", "Encrypt", data);
    return promise.then((data) => EncryptResponse.decode(new _m0.Reader(data)));
  }

  Decrypt(request: DecryptRequest): Promise<DecryptResponse> {
    const data = DecryptRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.EncryptionService", "Decrypt", data);
    return promise.then((data) => DecryptResponse.decode(new _m0.Reader(data)));
  }

  GetEncryptionAlg(request: EncryptionAlgRequest): Promise<EncryptionAlgResponse> {
    const data = EncryptionAlgRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.EncryptionService", "GetEncryptionAlg", data);
    return promise.then((data) => EncryptionAlgResponse.decode(new _m0.Reader(data)));
  }
}

export type EncryptionServiceDefinition = typeof EncryptionServiceDefinition;
export const EncryptionServiceDefinition = {
  name: "EncryptionService",
  fullName: "bloock.EncryptionService",
  methods: {
    generateRsaKeyPair: {
      name: "GenerateRsaKeyPair",
      requestType: GenerateRsaKeyPairRequest,
      requestStream: false,
      responseType: GenerateRsaKeyPairResponse,
      responseStream: false,
      options: {},
    },
    generateEciesKeyPair: {
      name: "GenerateEciesKeyPair",
      requestType: GenerateEciesKeyPairRequest,
      requestStream: false,
      responseType: GenerateEciesKeyPairResponse,
      responseStream: false,
      options: {},
    },
    encrypt: {
      name: "Encrypt",
      requestType: EncryptRequest,
      requestStream: false,
      responseType: EncryptResponse,
      responseStream: false,
      options: {},
    },
    decrypt: {
      name: "Decrypt",
      requestType: DecryptRequest,
      requestStream: false,
      responseType: DecryptResponse,
      responseStream: false,
      options: {},
    },
    getEncryptionAlg: {
      name: "GetEncryptionAlg",
      requestType: EncryptionAlgRequest,
      requestStream: false,
      responseType: EncryptionAlgResponse,
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
