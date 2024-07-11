/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { ConfigData } from "./bloock_config";
import { Error } from "./bloock_shared";

export interface VerifyWebhookSignatureRequest {
  configData?: ConfigData | undefined;
  payload: Uint8Array;
  header: string;
  secretKey: string;
  enforceTolerance: boolean;
}

export interface VerifyWebhookSignatureResponse {
  isValid: boolean;
  error?: Error | undefined;
}

function createBaseVerifyWebhookSignatureRequest(): VerifyWebhookSignatureRequest {
  return { configData: undefined, payload: new Uint8Array(0), header: "", secretKey: "", enforceTolerance: false };
}

export const VerifyWebhookSignatureRequest = {
  encode(message: VerifyWebhookSignatureRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.payload.length !== 0) {
      writer.uint32(18).bytes(message.payload);
    }
    if (message.header !== "") {
      writer.uint32(26).string(message.header);
    }
    if (message.secretKey !== "") {
      writer.uint32(34).string(message.secretKey);
    }
    if (message.enforceTolerance === true) {
      writer.uint32(40).bool(message.enforceTolerance);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyWebhookSignatureRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyWebhookSignatureRequest();
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

          message.payload = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.header = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.secretKey = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.enforceTolerance = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VerifyWebhookSignatureRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      payload: isSet(object.payload) ? bytesFromBase64(object.payload) : new Uint8Array(0),
      header: isSet(object.header) ? globalThis.String(object.header) : "",
      secretKey: isSet(object.secretKey) ? globalThis.String(object.secretKey) : "",
      enforceTolerance: isSet(object.enforceTolerance) ? globalThis.Boolean(object.enforceTolerance) : false,
    };
  },

  toJSON(message: VerifyWebhookSignatureRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.payload.length !== 0) {
      obj.payload = base64FromBytes(message.payload);
    }
    if (message.header !== "") {
      obj.header = message.header;
    }
    if (message.secretKey !== "") {
      obj.secretKey = message.secretKey;
    }
    if (message.enforceTolerance === true) {
      obj.enforceTolerance = message.enforceTolerance;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerifyWebhookSignatureRequest>, I>>(base?: I): VerifyWebhookSignatureRequest {
    return VerifyWebhookSignatureRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerifyWebhookSignatureRequest>, I>>(
    object: I,
  ): VerifyWebhookSignatureRequest {
    const message = createBaseVerifyWebhookSignatureRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.payload = object.payload ?? new Uint8Array(0);
    message.header = object.header ?? "";
    message.secretKey = object.secretKey ?? "";
    message.enforceTolerance = object.enforceTolerance ?? false;
    return message;
  },
};

function createBaseVerifyWebhookSignatureResponse(): VerifyWebhookSignatureResponse {
  return { isValid: false, error: undefined };
}

export const VerifyWebhookSignatureResponse = {
  encode(message: VerifyWebhookSignatureResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.isValid === true) {
      writer.uint32(8).bool(message.isValid);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyWebhookSignatureResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyWebhookSignatureResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.isValid = reader.bool();
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

  fromJSON(object: any): VerifyWebhookSignatureResponse {
    return {
      isValid: isSet(object.isValid) ? globalThis.Boolean(object.isValid) : false,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: VerifyWebhookSignatureResponse): unknown {
    const obj: any = {};
    if (message.isValid === true) {
      obj.isValid = message.isValid;
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerifyWebhookSignatureResponse>, I>>(base?: I): VerifyWebhookSignatureResponse {
    return VerifyWebhookSignatureResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerifyWebhookSignatureResponse>, I>>(
    object: I,
  ): VerifyWebhookSignatureResponse {
    const message = createBaseVerifyWebhookSignatureResponse();
    message.isValid = object.isValid ?? false;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

export interface WebhookService {
  VerifyWebhookSignature(request: VerifyWebhookSignatureRequest): Promise<VerifyWebhookSignatureResponse>;
}

export const WebhookServiceServiceName = "bloock.WebhookService";
export class WebhookServiceClientImpl implements WebhookService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || WebhookServiceServiceName;
    this.rpc = rpc;
    this.VerifyWebhookSignature = this.VerifyWebhookSignature.bind(this);
  }
  VerifyWebhookSignature(request: VerifyWebhookSignatureRequest): Promise<VerifyWebhookSignatureResponse> {
    const data = VerifyWebhookSignatureRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "VerifyWebhookSignature", data);
    return promise.then((data) => VerifyWebhookSignatureResponse.decode(_m0.Reader.create(data)));
  }
}

export type WebhookServiceDefinition = typeof WebhookServiceDefinition;
export const WebhookServiceDefinition = {
  name: "WebhookService",
  fullName: "bloock.WebhookService",
  methods: {
    verifyWebhookSignature: {
      name: "VerifyWebhookSignature",
      requestType: VerifyWebhookSignatureRequest,
      requestStream: false,
      responseType: VerifyWebhookSignatureResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
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
