/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { LocalCertificate, LocalKey, ManagedCertificate, ManagedKey } from "./keys_entities";

export enum EncryptionAlg {
  A256GCM = 0,
  A256GCM_M = 1,
  RSA = 2,
  RSA_M = 3,
  UNRECOGNIZED = -1,
}

export function encryptionAlgFromJSON(object: any): EncryptionAlg {
  switch (object) {
    case 0:
    case "A256GCM":
      return EncryptionAlg.A256GCM;
    case 1:
    case "A256GCM_M":
      return EncryptionAlg.A256GCM_M;
    case 2:
    case "RSA":
      return EncryptionAlg.RSA;
    case 3:
    case "RSA_M":
      return EncryptionAlg.RSA_M;
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
    case EncryptionAlg.A256GCM_M:
      return "A256GCM_M";
    case EncryptionAlg.RSA:
      return "RSA";
    case EncryptionAlg.RSA_M:
      return "RSA_M";
    case EncryptionAlg.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Encrypter {
  localKey?: LocalKey | undefined;
  managedKey?: ManagedKey | undefined;
  localCertificate?: LocalCertificate | undefined;
  managedCertificate?: ManagedCertificate | undefined;
}

function createBaseEncrypter(): Encrypter {
  return { localKey: undefined, managedKey: undefined, localCertificate: undefined, managedCertificate: undefined };
}

export const Encrypter = {
  encode(message: Encrypter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.localKey !== undefined) {
      LocalKey.encode(message.localKey, writer.uint32(10).fork()).ldelim();
    }
    if (message.managedKey !== undefined) {
      ManagedKey.encode(message.managedKey, writer.uint32(18).fork()).ldelim();
    }
    if (message.localCertificate !== undefined) {
      LocalCertificate.encode(message.localCertificate, writer.uint32(26).fork()).ldelim();
    }
    if (message.managedCertificate !== undefined) {
      ManagedCertificate.encode(message.managedCertificate, writer.uint32(34).fork()).ldelim();
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
          message.localKey = LocalKey.decode(reader, reader.uint32());
          break;
        case 2:
          message.managedKey = ManagedKey.decode(reader, reader.uint32());
          break;
        case 3:
          message.localCertificate = LocalCertificate.decode(reader, reader.uint32());
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

  fromJSON(object: any): Encrypter {
    return {
      localKey: isSet(object.localKey) ? LocalKey.fromJSON(object.localKey) : undefined,
      managedKey: isSet(object.managedKey) ? ManagedKey.fromJSON(object.managedKey) : undefined,
      localCertificate: isSet(object.localCertificate) ? LocalCertificate.fromJSON(object.localCertificate) : undefined,
      managedCertificate: isSet(object.managedCertificate)
        ? ManagedCertificate.fromJSON(object.managedCertificate)
        : undefined,
    };
  },

  toJSON(message: Encrypter): unknown {
    const obj: any = {};
    message.localKey !== undefined && (obj.localKey = message.localKey ? LocalKey.toJSON(message.localKey) : undefined);
    message.managedKey !== undefined &&
      (obj.managedKey = message.managedKey ? ManagedKey.toJSON(message.managedKey) : undefined);
    message.localCertificate !== undefined &&
      (obj.localCertificate = message.localCertificate ? LocalCertificate.toJSON(message.localCertificate) : undefined);
    message.managedCertificate !== undefined && (obj.managedCertificate = message.managedCertificate
      ? ManagedCertificate.toJSON(message.managedCertificate)
      : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Encrypter>, I>>(object: I): Encrypter {
    const message = createBaseEncrypter();
    message.localKey = (object.localKey !== undefined && object.localKey !== null)
      ? LocalKey.fromPartial(object.localKey)
      : undefined;
    message.managedKey = (object.managedKey !== undefined && object.managedKey !== null)
      ? ManagedKey.fromPartial(object.managedKey)
      : undefined;
    message.localCertificate = (object.localCertificate !== undefined && object.localCertificate !== null)
      ? LocalCertificate.fromPartial(object.localCertificate)
      : undefined;
    message.managedCertificate = (object.managedCertificate !== undefined && object.managedCertificate !== null)
      ? ManagedCertificate.fromPartial(object.managedCertificate)
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
