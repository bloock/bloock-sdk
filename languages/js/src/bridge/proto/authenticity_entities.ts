/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { LocalCertificate, LocalKey, ManagedCertificate, ManagedKey } from "./keys_entities";

export interface Signer {
  localKey?: LocalKey | undefined;
  managedKey?: ManagedKey | undefined;
  localCertificate?: LocalCertificate | undefined;
  managedCertificate?: ManagedCertificate | undefined;
  commonName?: string | undefined;
}

export interface Signature {
  signature: string;
  alg: string;
  kid: string;
  messageHash: string;
  subject?: string | undefined;
}

function createBaseSigner(): Signer {
  return {
    localKey: undefined,
    managedKey: undefined,
    localCertificate: undefined,
    managedCertificate: undefined,
    commonName: undefined,
  };
}

export const Signer = {
  encode(message: Signer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
    if (message.commonName !== undefined) {
      writer.uint32(42).string(message.commonName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Signer {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSigner();
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
        case 5:
          message.commonName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Signer {
    return {
      localKey: isSet(object.localKey) ? LocalKey.fromJSON(object.localKey) : undefined,
      managedKey: isSet(object.managedKey) ? ManagedKey.fromJSON(object.managedKey) : undefined,
      localCertificate: isSet(object.localCertificate) ? LocalCertificate.fromJSON(object.localCertificate) : undefined,
      managedCertificate: isSet(object.managedCertificate)
        ? ManagedCertificate.fromJSON(object.managedCertificate)
        : undefined,
      commonName: isSet(object.commonName) ? String(object.commonName) : undefined,
    };
  },

  toJSON(message: Signer): unknown {
    const obj: any = {};
    message.localKey !== undefined && (obj.localKey = message.localKey ? LocalKey.toJSON(message.localKey) : undefined);
    message.managedKey !== undefined &&
      (obj.managedKey = message.managedKey ? ManagedKey.toJSON(message.managedKey) : undefined);
    message.localCertificate !== undefined &&
      (obj.localCertificate = message.localCertificate ? LocalCertificate.toJSON(message.localCertificate) : undefined);
    message.managedCertificate !== undefined && (obj.managedCertificate = message.managedCertificate
      ? ManagedCertificate.toJSON(message.managedCertificate)
      : undefined);
    message.commonName !== undefined && (obj.commonName = message.commonName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Signer>, I>>(object: I): Signer {
    const message = createBaseSigner();
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
    message.commonName = object.commonName ?? undefined;
    return message;
  },
};

function createBaseSignature(): Signature {
  return { signature: "", alg: "", kid: "", messageHash: "", subject: undefined };
}

export const Signature = {
  encode(message: Signature, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signature !== "") {
      writer.uint32(10).string(message.signature);
    }
    if (message.alg !== "") {
      writer.uint32(18).string(message.alg);
    }
    if (message.kid !== "") {
      writer.uint32(26).string(message.kid);
    }
    if (message.messageHash !== "") {
      writer.uint32(34).string(message.messageHash);
    }
    if (message.subject !== undefined) {
      writer.uint32(42).string(message.subject);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Signature {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignature();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.signature = reader.string();
          break;
        case 2:
          message.alg = reader.string();
          break;
        case 3:
          message.kid = reader.string();
          break;
        case 4:
          message.messageHash = reader.string();
          break;
        case 5:
          message.subject = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Signature {
    return {
      signature: isSet(object.signature) ? String(object.signature) : "",
      alg: isSet(object.alg) ? String(object.alg) : "",
      kid: isSet(object.kid) ? String(object.kid) : "",
      messageHash: isSet(object.messageHash) ? String(object.messageHash) : "",
      subject: isSet(object.subject) ? String(object.subject) : undefined,
    };
  },

  toJSON(message: Signature): unknown {
    const obj: any = {};
    message.signature !== undefined && (obj.signature = message.signature);
    message.alg !== undefined && (obj.alg = message.alg);
    message.kid !== undefined && (obj.kid = message.kid);
    message.messageHash !== undefined && (obj.messageHash = message.messageHash);
    message.subject !== undefined && (obj.subject = message.subject);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Signature>, I>>(object: I): Signature {
    const message = createBaseSignature();
    message.signature = object.signature ?? "";
    message.alg = object.alg ?? "";
    message.kid = object.kid ?? "";
    message.messageHash = object.messageHash ?? "";
    message.subject = object.subject ?? undefined;
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
