/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { LocalKey, ManagedKey } from "./keys_entities";

export enum EncryptionAlg {
  A256GCM = 0,
  RSA = 1,
  UNRECOGNIZED = -1,
}

export function encryptionAlgFromJSON(object: any): EncryptionAlg {
  switch (object) {
    case 0:
    case "A256GCM":
      return EncryptionAlg.A256GCM;
    case 1:
    case "RSA":
      return EncryptionAlg.RSA;
    case -1:
    case "UNRECOGNIZED":
    default:
      return EncryptionAlg.UNRECOGNIZED;
  }
}

export function encryptionAlgToJSON(object: EncryptionAlg): string {
  switch (object) {
    case EncryptionAlg.A256GCM:
      return "A256GCM";
    case EncryptionAlg.RSA:
      return "RSA";
    case EncryptionAlg.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Encrypter {
  alg: EncryptionAlg;
  localKey?: LocalKey | undefined;
  managedKey?: ManagedKey | undefined;
}

export interface Decrypter {
  alg: EncryptionAlg;
  localKey?: LocalKey | undefined;
  managedKey?: ManagedKey | undefined;
}

function createBaseEncrypter(): Encrypter {
  return { alg: 0, localKey: undefined, managedKey: undefined };
}

export const Encrypter = {
  encode(message: Encrypter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.alg !== 0) {
      writer.uint32(8).int32(message.alg);
    }
    if (message.localKey !== undefined) {
      LocalKey.encode(message.localKey, writer.uint32(18).fork()).ldelim();
    }
    if (message.managedKey !== undefined) {
      ManagedKey.encode(message.managedKey, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Encrypter {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEncrypter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.alg = reader.int32() as any;
          break;
        case 2:
          message.localKey = LocalKey.decode(reader, reader.uint32());
          break;
        case 3:
          message.managedKey = ManagedKey.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Encrypter {
    return {
      alg: isSet(object.alg) ? encryptionAlgFromJSON(object.alg) : 0,
      localKey: isSet(object.localKey) ? LocalKey.fromJSON(object.localKey) : undefined,
      managedKey: isSet(object.managedKey) ? ManagedKey.fromJSON(object.managedKey) : undefined,
    };
  },

  toJSON(message: Encrypter): unknown {
    const obj: any = {};
    message.alg !== undefined && (obj.alg = encryptionAlgToJSON(message.alg));
    message.localKey !== undefined && (obj.localKey = message.localKey ? LocalKey.toJSON(message.localKey) : undefined);
    message.managedKey !== undefined &&
      (obj.managedKey = message.managedKey ? ManagedKey.toJSON(message.managedKey) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Encrypter>, I>>(object: I): Encrypter {
    const message = createBaseEncrypter();
    message.alg = object.alg ?? 0;
    message.localKey = (object.localKey !== undefined && object.localKey !== null)
      ? LocalKey.fromPartial(object.localKey)
      : undefined;
    message.managedKey = (object.managedKey !== undefined && object.managedKey !== null)
      ? ManagedKey.fromPartial(object.managedKey)
      : undefined;
    return message;
  },
};

function createBaseDecrypter(): Decrypter {
  return { alg: 0, localKey: undefined, managedKey: undefined };
}

export const Decrypter = {
  encode(message: Decrypter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.alg !== 0) {
      writer.uint32(8).int32(message.alg);
    }
    if (message.localKey !== undefined) {
      LocalKey.encode(message.localKey, writer.uint32(18).fork()).ldelim();
    }
    if (message.managedKey !== undefined) {
      ManagedKey.encode(message.managedKey, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Decrypter {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDecrypter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.alg = reader.int32() as any;
          break;
        case 2:
          message.localKey = LocalKey.decode(reader, reader.uint32());
          break;
        case 3:
          message.managedKey = ManagedKey.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Decrypter {
    return {
      alg: isSet(object.alg) ? encryptionAlgFromJSON(object.alg) : 0,
      localKey: isSet(object.localKey) ? LocalKey.fromJSON(object.localKey) : undefined,
      managedKey: isSet(object.managedKey) ? ManagedKey.fromJSON(object.managedKey) : undefined,
    };
  },

  toJSON(message: Decrypter): unknown {
    const obj: any = {};
    message.alg !== undefined && (obj.alg = encryptionAlgToJSON(message.alg));
    message.localKey !== undefined && (obj.localKey = message.localKey ? LocalKey.toJSON(message.localKey) : undefined);
    message.managedKey !== undefined &&
      (obj.managedKey = message.managedKey ? ManagedKey.toJSON(message.managedKey) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Decrypter>, I>>(object: I): Decrypter {
    const message = createBaseDecrypter();
    message.alg = object.alg ?? 0;
    message.localKey = (object.localKey !== undefined && object.localKey !== null)
      ? LocalKey.fromPartial(object.localKey)
      : undefined;
    message.managedKey = (object.managedKey !== undefined && object.managedKey !== null)
      ? ManagedKey.fromPartial(object.managedKey)
      : undefined;
    return message;
  },
};

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
