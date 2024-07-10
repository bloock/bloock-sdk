/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { ConfigData } from "./bloock_config";
import { Encrypter, EncryptionAlg, encryptionAlgFromJSON, encryptionAlgToJSON } from "./bloock_encryption_entities";
import { Record } from "./bloock_record_entities";
import { Error } from "./bloock_shared";

export interface EncryptRequest {
  configData?: ConfigData | undefined;
  record?: Record | undefined;
  encrypter?: Encrypter | undefined;
}

export interface EncryptResponse {
  record?: Record | undefined;
  error?: Error | undefined;
}

export interface DecryptRequest {
  configData?: ConfigData | undefined;
  record?: Record | undefined;
  decrypter?: Encrypter | undefined;
}

export interface DecryptResponse {
  record?: Record | undefined;
  error?: Error | undefined;
}

export interface EncryptionAlgRequest {
  configData?: ConfigData | undefined;
  record?: Record | undefined;
}

export interface EncryptionAlgResponse {
  alg: EncryptionAlg;
  error?: Error | undefined;
}

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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEncryptRequest();
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

          message.encrypter = Encrypter.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
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
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.record !== undefined) {
      obj.record = Record.toJSON(message.record);
    }
    if (message.encrypter !== undefined) {
      obj.encrypter = Encrypter.toJSON(message.encrypter);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EncryptRequest>, I>>(base?: I): EncryptRequest {
    return EncryptRequest.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEncryptResponse();
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

  fromJSON(object: any): EncryptResponse {
    return {
      record: isSet(object.record) ? Record.fromJSON(object.record) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: EncryptResponse): unknown {
    const obj: any = {};
    if (message.record !== undefined) {
      obj.record = Record.toJSON(message.record);
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EncryptResponse>, I>>(base?: I): EncryptResponse {
    return EncryptResponse.fromPartial(base ?? ({} as any));
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
      Encrypter.encode(message.decrypter, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DecryptRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDecryptRequest();
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

          message.decrypter = Encrypter.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DecryptRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      record: isSet(object.record) ? Record.fromJSON(object.record) : undefined,
      decrypter: isSet(object.decrypter) ? Encrypter.fromJSON(object.decrypter) : undefined,
    };
  },

  toJSON(message: DecryptRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.record !== undefined) {
      obj.record = Record.toJSON(message.record);
    }
    if (message.decrypter !== undefined) {
      obj.decrypter = Encrypter.toJSON(message.decrypter);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DecryptRequest>, I>>(base?: I): DecryptRequest {
    return DecryptRequest.fromPartial(base ?? ({} as any));
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
      ? Encrypter.fromPartial(object.decrypter)
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDecryptResponse();
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

  fromJSON(object: any): DecryptResponse {
    return {
      record: isSet(object.record) ? Record.fromJSON(object.record) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: DecryptResponse): unknown {
    const obj: any = {};
    if (message.record !== undefined) {
      obj.record = Record.toJSON(message.record);
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DecryptResponse>, I>>(base?: I): DecryptResponse {
    return DecryptResponse.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEncryptionAlgRequest();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
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
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.record !== undefined) {
      obj.record = Record.toJSON(message.record);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EncryptionAlgRequest>, I>>(base?: I): EncryptionAlgRequest {
    return EncryptionAlgRequest.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEncryptionAlgResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.alg = reader.int32() as any;
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

  fromJSON(object: any): EncryptionAlgResponse {
    return {
      alg: isSet(object.alg) ? encryptionAlgFromJSON(object.alg) : 0,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: EncryptionAlgResponse): unknown {
    const obj: any = {};
    if (message.alg !== 0) {
      obj.alg = encryptionAlgToJSON(message.alg);
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EncryptionAlgResponse>, I>>(base?: I): EncryptionAlgResponse {
    return EncryptionAlgResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EncryptionAlgResponse>, I>>(object: I): EncryptionAlgResponse {
    const message = createBaseEncryptionAlgResponse();
    message.alg = object.alg ?? 0;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

export interface EncryptionService {
  Encrypt(request: EncryptRequest): Promise<EncryptResponse>;
  Decrypt(request: DecryptRequest): Promise<DecryptResponse>;
  GetEncryptionAlg(request: EncryptionAlgRequest): Promise<EncryptionAlgResponse>;
}

export const EncryptionServiceServiceName = "bloock.EncryptionService";
export class EncryptionServiceClientImpl implements EncryptionService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || EncryptionServiceServiceName;
    this.rpc = rpc;
    this.Encrypt = this.Encrypt.bind(this);
    this.Decrypt = this.Decrypt.bind(this);
    this.GetEncryptionAlg = this.GetEncryptionAlg.bind(this);
  }
  Encrypt(request: EncryptRequest): Promise<EncryptResponse> {
    const data = EncryptRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Encrypt", data);
    return promise.then((data) => EncryptResponse.decode(_m0.Reader.create(data)));
  }

  Decrypt(request: DecryptRequest): Promise<DecryptResponse> {
    const data = DecryptRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Decrypt", data);
    return promise.then((data) => DecryptResponse.decode(_m0.Reader.create(data)));
  }

  GetEncryptionAlg(request: EncryptionAlgRequest): Promise<EncryptionAlgResponse> {
    const data = EncryptionAlgRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetEncryptionAlg", data);
    return promise.then((data) => EncryptionAlgResponse.decode(_m0.Reader.create(data)));
  }
}

export type EncryptionServiceDefinition = typeof EncryptionServiceDefinition;
export const EncryptionServiceDefinition = {
  name: "EncryptionService",
  fullName: "bloock.EncryptionService",
  methods: {
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
