/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { ConfigData } from "./config";
import { Error } from "./shared";

export interface VerifyWebhookSignatureRequest {
  configData?: ConfigData;
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
  return { configData: undefined, payload: new Uint8Array(), header: "", secretKey: "", enforceTolerance: false };
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyWebhookSignatureRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.payload = reader.bytes();
          break;
        case 3:
          message.header = reader.string();
          break;
        case 4:
          message.secretKey = reader.string();
          break;
        case 5:
          message.enforceTolerance = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VerifyWebhookSignatureRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      payload: isSet(object.payload) ? bytesFromBase64(object.payload) : new Uint8Array(),
      header: isSet(object.header) ? String(object.header) : "",
      secretKey: isSet(object.secretKey) ? String(object.secretKey) : "",
      enforceTolerance: isSet(object.enforceTolerance) ? Boolean(object.enforceTolerance) : false,
    };
  },

  toJSON(message: VerifyWebhookSignatureRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.payload !== undefined &&
      (obj.payload = base64FromBytes(message.payload !== undefined ? message.payload : new Uint8Array()));
    message.header !== undefined && (obj.header = message.header);
    message.secretKey !== undefined && (obj.secretKey = message.secretKey);
    message.enforceTolerance !== undefined && (obj.enforceTolerance = message.enforceTolerance);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<VerifyWebhookSignatureRequest>, I>>(
    object: I,
  ): VerifyWebhookSignatureRequest {
    const message = createBaseVerifyWebhookSignatureRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.payload = object.payload ?? new Uint8Array();
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyWebhookSignatureResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.isValid = reader.bool();
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

  fromJSON(object: any): VerifyWebhookSignatureResponse {
    return {
      isValid: isSet(object.isValid) ? Boolean(object.isValid) : false,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: VerifyWebhookSignatureResponse): unknown {
    const obj: any = {};
    message.isValid !== undefined && (obj.isValid = message.isValid);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
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

export class WebhookServiceClientImpl implements WebhookService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.VerifyWebhookSignature = this.VerifyWebhookSignature.bind(this);
  }
  VerifyWebhookSignature(request: VerifyWebhookSignatureRequest): Promise<VerifyWebhookSignatureResponse> {
    const data = VerifyWebhookSignatureRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.WebhookService", "VerifyWebhookSignature", data);
    return promise.then((data) => VerifyWebhookSignatureResponse.decode(new _m0.Reader(data)));
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
