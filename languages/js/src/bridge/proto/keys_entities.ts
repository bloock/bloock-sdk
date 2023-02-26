/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export enum KeyType {
  EcP256k = 0,
  Rsa2048 = 1,
  Rsa3072 = 2,
  Rsa4096 = 3,
  UNRECOGNIZED = -1
}

export function keyTypeFromJSON(object: any): KeyType {
  switch (object) {
    case 0:
    case "EcP256k":
      return KeyType.EcP256k;
    case 1:
    case "Rsa2048":
      return KeyType.Rsa2048;
    case 2:
    case "Rsa3072":
      return KeyType.Rsa3072;
    case 3:
    case "Rsa4096":
      return KeyType.Rsa4096;
    case -1:
    case "UNRECOGNIZED":
    default:
      return KeyType.UNRECOGNIZED;
  }
}

export function keyTypeToJSON(object: KeyType): string {
  switch (object) {
    case KeyType.EcP256k:
      return "EcP256k";
    case KeyType.Rsa2048:
      return "Rsa2048";
    case KeyType.Rsa3072:
      return "Rsa3072";
    case KeyType.Rsa4096:
      return "Rsa4096";
    case KeyType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum KeyProtectionLevel {
  SOFTWARE = 0,
  HSM = 1,
  UNRECOGNIZED = -1
}

export function keyProtectionLevelFromJSON(object: any): KeyProtectionLevel {
  switch (object) {
    case 0:
    case "SOFTWARE":
      return KeyProtectionLevel.SOFTWARE;
    case 1:
    case "HSM":
      return KeyProtectionLevel.HSM;
    case -1:
    case "UNRECOGNIZED":
    default:
      return KeyProtectionLevel.UNRECOGNIZED;
  }
}

export function keyProtectionLevelToJSON(object: KeyProtectionLevel): string {
  switch (object) {
    case KeyProtectionLevel.SOFTWARE:
      return "SOFTWARE";
    case KeyProtectionLevel.HSM:
      return "HSM";
    case KeyProtectionLevel.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface LocalKey {
  key: string;
  keyType: KeyType;
  privateKey?: string | undefined;
}

export interface ManagedKeyParams {
  protection: KeyProtectionLevel;
  keyType: KeyType;
  name?: string | undefined;
  expiration?: number | undefined;
}

export interface ManagedKey {
  key: string;
  protection: KeyProtectionLevel;
  keyType: KeyType;
  name?: string | undefined;
  expiration?: number | undefined;
}

function createBaseLocalKey(): LocalKey {
  return { key: "", keyType: 0, privateKey: undefined };
}

export const LocalKey = {
  encode(
    message: LocalKey,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.keyType !== 0) {
      writer.uint32(16).int32(message.keyType);
    }
    if (message.privateKey !== undefined) {
      writer.uint32(26).string(message.privateKey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LocalKey {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLocalKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.keyType = reader.int32() as any;
          break;
        case 3:
          message.privateKey = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LocalKey {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      keyType: isSet(object.keyType) ? keyTypeFromJSON(object.keyType) : 0,
      privateKey: isSet(object.privateKey)
        ? String(object.privateKey)
        : undefined
    };
  },

  toJSON(message: LocalKey): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.keyType !== undefined &&
      (obj.keyType = keyTypeToJSON(message.keyType));
    message.privateKey !== undefined && (obj.privateKey = message.privateKey);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LocalKey>, I>>(object: I): LocalKey {
    const message = createBaseLocalKey();
    message.key = object.key ?? "";
    message.keyType = object.keyType ?? 0;
    message.privateKey = object.privateKey ?? undefined;
    return message;
  }
};

function createBaseManagedKeyParams(): ManagedKeyParams {
  return { protection: 0, keyType: 0, name: undefined, expiration: undefined };
}

export const ManagedKeyParams = {
  encode(
    message: ManagedKeyParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.protection !== 0) {
      writer.uint32(8).int32(message.protection);
    }
    if (message.keyType !== 0) {
      writer.uint32(16).int32(message.keyType);
    }
    if (message.name !== undefined) {
      writer.uint32(26).string(message.name);
    }
    if (message.expiration !== undefined) {
      writer.uint32(32).int64(message.expiration);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ManagedKeyParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseManagedKeyParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.protection = reader.int32() as any;
          break;
        case 2:
          message.keyType = reader.int32() as any;
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.expiration = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ManagedKeyParams {
    return {
      protection: isSet(object.protection)
        ? keyProtectionLevelFromJSON(object.protection)
        : 0,
      keyType: isSet(object.keyType) ? keyTypeFromJSON(object.keyType) : 0,
      name: isSet(object.name) ? String(object.name) : undefined,
      expiration: isSet(object.expiration)
        ? Number(object.expiration)
        : undefined
    };
  },

  toJSON(message: ManagedKeyParams): unknown {
    const obj: any = {};
    message.protection !== undefined &&
      (obj.protection = keyProtectionLevelToJSON(message.protection));
    message.keyType !== undefined &&
      (obj.keyType = keyTypeToJSON(message.keyType));
    message.name !== undefined && (obj.name = message.name);
    message.expiration !== undefined &&
      (obj.expiration = Math.round(message.expiration));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ManagedKeyParams>, I>>(
    object: I
  ): ManagedKeyParams {
    const message = createBaseManagedKeyParams();
    message.protection = object.protection ?? 0;
    message.keyType = object.keyType ?? 0;
    message.name = object.name ?? undefined;
    message.expiration = object.expiration ?? undefined;
    return message;
  }
};

function createBaseManagedKey(): ManagedKey {
  return {
    key: "",
    protection: 0,
    keyType: 0,
    name: undefined,
    expiration: undefined
  };
}

export const ManagedKey = {
  encode(
    message: ManagedKey,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.protection !== 0) {
      writer.uint32(16).int32(message.protection);
    }
    if (message.keyType !== 0) {
      writer.uint32(24).int32(message.keyType);
    }
    if (message.name !== undefined) {
      writer.uint32(34).string(message.name);
    }
    if (message.expiration !== undefined) {
      writer.uint32(40).int64(message.expiration);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ManagedKey {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseManagedKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      console.log(tag >>> 3, reader.pos, reader.len);
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.protection = reader.int32() as any;
          break;
        case 3:
          message.keyType = reader.int32() as any;
          break;
        case 4:
          message.name = reader.string();
          break;
        case 5:
          message.expiration = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ManagedKey {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      protection: isSet(object.protection)
        ? keyProtectionLevelFromJSON(object.protection)
        : 0,
      keyType: isSet(object.keyType) ? keyTypeFromJSON(object.keyType) : 0,
      name: isSet(object.name) ? String(object.name) : undefined,
      expiration: isSet(object.expiration)
        ? Number(object.expiration)
        : undefined
    };
  },

  toJSON(message: ManagedKey): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.protection !== undefined &&
      (obj.protection = keyProtectionLevelToJSON(message.protection));
    message.keyType !== undefined &&
      (obj.keyType = keyTypeToJSON(message.keyType));
    message.name !== undefined && (obj.name = message.name);
    message.expiration !== undefined &&
      (obj.expiration = Math.round(message.expiration));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ManagedKey>, I>>(
    object: I
  ): ManagedKey {
    const message = createBaseManagedKey();
    message.key = object.key ?? "";
    message.protection = object.protection ?? 0;
    message.keyType = object.keyType ?? 0;
    message.name = object.name ?? undefined;
    message.expiration = object.expiration ?? undefined;
    return message;
  }
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
  : P &
      { [K in keyof P]: Exact<P[K], I[K]> } &
      { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

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
