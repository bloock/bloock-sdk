/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { ConfigData } from "./config";

export enum RecordTypes {
  STRING = 0,
  HEX = 1,
  JSON = 2,
  BYTES = 3,
  FILE = 4,
  RECORD = 5,
  LOADER = 6,
  UNRECOGNIZED = -1,
}

export function recordTypesFromJSON(object: any): RecordTypes {
  switch (object) {
    case 0:
    case "STRING":
      return RecordTypes.STRING;
    case 1:
    case "HEX":
      return RecordTypes.HEX;
    case 2:
    case "JSON":
      return RecordTypes.JSON;
    case 3:
    case "BYTES":
      return RecordTypes.BYTES;
    case 4:
    case "FILE":
      return RecordTypes.FILE;
    case 5:
    case "RECORD":
      return RecordTypes.RECORD;
    case 6:
    case "LOADER":
      return RecordTypes.LOADER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RecordTypes.UNRECOGNIZED;
  }
}

export function recordTypesToJSON(object: RecordTypes): string {
  switch (object) {
    case RecordTypes.STRING:
      return "STRING";
    case RecordTypes.HEX:
      return "HEX";
    case RecordTypes.JSON:
      return "JSON";
    case RecordTypes.BYTES:
      return "BYTES";
    case RecordTypes.FILE:
      return "FILE";
    case RecordTypes.RECORD:
      return "RECORD";
    case RecordTypes.LOADER:
      return "LOADER";
    case RecordTypes.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface RecordHeader {
  ty: string;
}

export interface Record {
  configData?: ConfigData | undefined;
  payload: Uint8Array;
  hash: string;
}

function createBaseRecordHeader(): RecordHeader {
  return { ty: "" };
}

export const RecordHeader = {
  encode(message: RecordHeader, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ty !== "") {
      writer.uint32(10).string(message.ty);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordHeader {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordHeader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ty = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordHeader {
    return { ty: isSet(object.ty) ? String(object.ty) : "" };
  },

  toJSON(message: RecordHeader): unknown {
    const obj: any = {};
    message.ty !== undefined && (obj.ty = message.ty);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordHeader>, I>>(object: I): RecordHeader {
    const message = createBaseRecordHeader();
    message.ty = object.ty ?? "";
    return message;
  },
};

function createBaseRecord(): Record {
  return { configData: undefined, payload: new Uint8Array(), hash: "" };
}

export const Record = {
  encode(message: Record, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.payload.length !== 0) {
      writer.uint32(18).bytes(message.payload);
    }
    if (message.hash !== "") {
      writer.uint32(26).string(message.hash);
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
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.payload = reader.bytes();
          break;
        case 3:
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
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      payload: isSet(object.payload) ? bytesFromBase64(object.payload) : new Uint8Array(),
      hash: isSet(object.hash) ? String(object.hash) : "",
    };
  },

  toJSON(message: Record): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.payload !== undefined &&
      (obj.payload = base64FromBytes(message.payload !== undefined ? message.payload : new Uint8Array()));
    message.hash !== undefined && (obj.hash = message.hash);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Record>, I>>(object: I): Record {
    const message = createBaseRecord();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.payload = object.payload ?? new Uint8Array();
    message.hash = object.hash ?? "";
    return message;
  },
};

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
