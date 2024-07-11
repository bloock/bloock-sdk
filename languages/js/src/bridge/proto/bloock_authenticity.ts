/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Signature, Signer } from "./bloock_authenticity_entities";
import { ConfigData } from "./bloock_config";
import { Record } from "./bloock_record_entities";
import { Error } from "./bloock_shared";

export interface SignRequest {
  configData?: ConfigData | undefined;
  record?: Record | undefined;
  signer?: Signer | undefined;
}

export interface SignResponse {
  signature?: Signature | undefined;
  error?: Error | undefined;
}

export interface VerifyRequest {
  configData?: ConfigData | undefined;
  record?: Record | undefined;
}

export interface VerifyResponse {
  valid: boolean;
  error?: Error | undefined;
}

export interface GetSignaturesRequest {
  configData?: ConfigData | undefined;
  record?: Record | undefined;
}

export interface GetSignaturesResponse {
  signatures: Signature[];
  error?: Error | undefined;
}

function createBaseSignRequest(): SignRequest {
  return { configData: undefined, record: undefined, signer: undefined };
}

export const SignRequest = {
  encode(message: SignRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.record !== undefined) {
      Record.encode(message.record, writer.uint32(18).fork()).ldelim();
    }
    if (message.signer !== undefined) {
      Signer.encode(message.signer, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignRequest();
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

          message.signer = Signer.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SignRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      record: isSet(object.record) ? Record.fromJSON(object.record) : undefined,
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
    };
  },

  toJSON(message: SignRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.record !== undefined) {
      obj.record = Record.toJSON(message.record);
    }
    if (message.signer !== undefined) {
      obj.signer = Signer.toJSON(message.signer);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SignRequest>, I>>(base?: I): SignRequest {
    return SignRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SignRequest>, I>>(object: I): SignRequest {
    const message = createBaseSignRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.record = (object.record !== undefined && object.record !== null)
      ? Record.fromPartial(object.record)
      : undefined;
    message.signer = (object.signer !== undefined && object.signer !== null)
      ? Signer.fromPartial(object.signer)
      : undefined;
    return message;
  },
};

function createBaseSignResponse(): SignResponse {
  return { signature: undefined, error: undefined };
}

export const SignResponse = {
  encode(message: SignResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signature !== undefined) {
      Signature.encode(message.signature, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signature = Signature.decode(reader, reader.uint32());
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

  fromJSON(object: any): SignResponse {
    return {
      signature: isSet(object.signature) ? Signature.fromJSON(object.signature) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: SignResponse): unknown {
    const obj: any = {};
    if (message.signature !== undefined) {
      obj.signature = Signature.toJSON(message.signature);
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SignResponse>, I>>(base?: I): SignResponse {
    return SignResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SignResponse>, I>>(object: I): SignResponse {
    const message = createBaseSignResponse();
    message.signature = (object.signature !== undefined && object.signature !== null)
      ? Signature.fromPartial(object.signature)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseVerifyRequest(): VerifyRequest {
  return { configData: undefined, record: undefined };
}

export const VerifyRequest = {
  encode(message: VerifyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.record !== undefined) {
      Record.encode(message.record, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyRequest();
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

  fromJSON(object: any): VerifyRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      record: isSet(object.record) ? Record.fromJSON(object.record) : undefined,
    };
  },

  toJSON(message: VerifyRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.record !== undefined) {
      obj.record = Record.toJSON(message.record);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerifyRequest>, I>>(base?: I): VerifyRequest {
    return VerifyRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerifyRequest>, I>>(object: I): VerifyRequest {
    const message = createBaseVerifyRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.record = (object.record !== undefined && object.record !== null)
      ? Record.fromPartial(object.record)
      : undefined;
    return message;
  },
};

function createBaseVerifyResponse(): VerifyResponse {
  return { valid: false, error: undefined };
}

export const VerifyResponse = {
  encode(message: VerifyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.valid === true) {
      writer.uint32(8).bool(message.valid);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.valid = reader.bool();
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

  fromJSON(object: any): VerifyResponse {
    return {
      valid: isSet(object.valid) ? globalThis.Boolean(object.valid) : false,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: VerifyResponse): unknown {
    const obj: any = {};
    if (message.valid === true) {
      obj.valid = message.valid;
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerifyResponse>, I>>(base?: I): VerifyResponse {
    return VerifyResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerifyResponse>, I>>(object: I): VerifyResponse {
    const message = createBaseVerifyResponse();
    message.valid = object.valid ?? false;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseGetSignaturesRequest(): GetSignaturesRequest {
  return { configData: undefined, record: undefined };
}

export const GetSignaturesRequest = {
  encode(message: GetSignaturesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.record !== undefined) {
      Record.encode(message.record, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSignaturesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSignaturesRequest();
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

  fromJSON(object: any): GetSignaturesRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      record: isSet(object.record) ? Record.fromJSON(object.record) : undefined,
    };
  },

  toJSON(message: GetSignaturesRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.record !== undefined) {
      obj.record = Record.toJSON(message.record);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetSignaturesRequest>, I>>(base?: I): GetSignaturesRequest {
    return GetSignaturesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetSignaturesRequest>, I>>(object: I): GetSignaturesRequest {
    const message = createBaseGetSignaturesRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.record = (object.record !== undefined && object.record !== null)
      ? Record.fromPartial(object.record)
      : undefined;
    return message;
  },
};

function createBaseGetSignaturesResponse(): GetSignaturesResponse {
  return { signatures: [], error: undefined };
}

export const GetSignaturesResponse = {
  encode(message: GetSignaturesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.signatures) {
      Signature.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSignaturesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSignaturesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signatures.push(Signature.decode(reader, reader.uint32()));
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

  fromJSON(object: any): GetSignaturesResponse {
    return {
      signatures: globalThis.Array.isArray(object?.signatures)
        ? object.signatures.map((e: any) => Signature.fromJSON(e))
        : [],
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GetSignaturesResponse): unknown {
    const obj: any = {};
    if (message.signatures?.length) {
      obj.signatures = message.signatures.map((e) => Signature.toJSON(e));
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetSignaturesResponse>, I>>(base?: I): GetSignaturesResponse {
    return GetSignaturesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetSignaturesResponse>, I>>(object: I): GetSignaturesResponse {
    const message = createBaseGetSignaturesResponse();
    message.signatures = object.signatures?.map((e) => Signature.fromPartial(e)) || [];
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

export interface AuthenticityService {
  Sign(request: SignRequest): Promise<SignResponse>;
  Verify(request: VerifyRequest): Promise<VerifyResponse>;
  GetSignatures(request: GetSignaturesRequest): Promise<GetSignaturesResponse>;
}

export const AuthenticityServiceServiceName = "bloock.AuthenticityService";
export class AuthenticityServiceClientImpl implements AuthenticityService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || AuthenticityServiceServiceName;
    this.rpc = rpc;
    this.Sign = this.Sign.bind(this);
    this.Verify = this.Verify.bind(this);
    this.GetSignatures = this.GetSignatures.bind(this);
  }
  Sign(request: SignRequest): Promise<SignResponse> {
    const data = SignRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Sign", data);
    return promise.then((data) => SignResponse.decode(_m0.Reader.create(data)));
  }

  Verify(request: VerifyRequest): Promise<VerifyResponse> {
    const data = VerifyRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Verify", data);
    return promise.then((data) => VerifyResponse.decode(_m0.Reader.create(data)));
  }

  GetSignatures(request: GetSignaturesRequest): Promise<GetSignaturesResponse> {
    const data = GetSignaturesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetSignatures", data);
    return promise.then((data) => GetSignaturesResponse.decode(_m0.Reader.create(data)));
  }
}

export type AuthenticityServiceDefinition = typeof AuthenticityServiceDefinition;
export const AuthenticityServiceDefinition = {
  name: "AuthenticityService",
  fullName: "bloock.AuthenticityService",
  methods: {
    sign: {
      name: "Sign",
      requestType: SignRequest,
      requestStream: false,
      responseType: SignResponse,
      responseStream: false,
      options: {},
    },
    verify: {
      name: "Verify",
      requestType: VerifyRequest,
      requestStream: false,
      responseType: VerifyResponse,
      responseStream: false,
      options: {},
    },
    getSignatures: {
      name: "GetSignatures",
      requestType: GetSignaturesRequest,
      requestStream: false,
      responseType: GetSignaturesResponse,
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
