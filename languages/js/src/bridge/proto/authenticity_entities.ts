/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { LocalCertificate, LocalKey, ManagedCertificate, ManagedKey } from "./keys_entities";

export enum SignerAlg {
  ES256K = 0,
  ENS = 1,
  BJJ = 2,
  UNRECOGNIZED = -1,
}

export function signerAlgFromJSON(object: any): SignerAlg {
  switch (object) {
    case 0:
    case "ES256K":
      return SignerAlg.ES256K;
    case 1:
    case "ENS":
      return SignerAlg.ENS;
    case 2:
    case "BJJ":
      return SignerAlg.BJJ;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SignerAlg.UNRECOGNIZED;
  }
}

export function signerAlgToJSON(object: SignerAlg): string {
  switch (object) {
    case SignerAlg.ES256K:
      return "ES256K";
    case SignerAlg.ENS:
      return "ENS";
    case SignerAlg.BJJ:
      return "BJJ";
    case SignerAlg.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Signer {
  alg: SignerAlg;
  localKey?: LocalKey | undefined;
  managedKey?: ManagedKey | undefined;
  localCertificate?: LocalCertificate | undefined;
  managedCertificate?: ManagedCertificate | undefined;
  commonName?: string | undefined;
}

export interface Signature {
  signature: string;
  protected: string;
  header?: SignatureHeader;
  messageHash: string;
}

export interface SignatureHeader {
  alg: string;
  kid: string;
}

function createBaseSigner(): Signer {
  return {
    alg: 0,
    localKey: undefined,
    managedKey: undefined,
    localCertificate: undefined,
    managedCertificate: undefined,
    commonName: undefined,
  };
}

export const Signer = {
  encode(message: Signer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.alg !== 0) {
      writer.uint32(8).int32(message.alg);
    }
    if (message.localKey !== undefined) {
      LocalKey.encode(message.localKey, writer.uint32(18).fork()).ldelim();
    }
    if (message.managedKey !== undefined) {
      ManagedKey.encode(message.managedKey, writer.uint32(26).fork()).ldelim();
    }
    if (message.localCertificate !== undefined) {
      LocalCertificate.encode(message.localCertificate, writer.uint32(34).fork()).ldelim();
    }
    if (message.managedCertificate !== undefined) {
      ManagedCertificate.encode(message.managedCertificate, writer.uint32(42).fork()).ldelim();
    }
    if (message.commonName !== undefined) {
      writer.uint32(50).string(message.commonName);
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
          message.alg = reader.int32() as any;
          break;
        case 2:
          message.localKey = LocalKey.decode(reader, reader.uint32());
          break;
        case 3:
          message.managedKey = ManagedKey.decode(reader, reader.uint32());
          break;
        case 4:
          message.localCertificate = LocalCertificate.decode(reader, reader.uint32());
          break;
        case 5:
          message.managedCertificate = ManagedCertificate.decode(reader, reader.uint32());
          break;
        case 6:
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
      alg: isSet(object.alg) ? signerAlgFromJSON(object.alg) : 0,
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
    message.alg !== undefined && (obj.alg = signerAlgToJSON(message.alg));
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
    message.alg = object.alg ?? 0;
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
  return { signature: "", protected: "", header: undefined, messageHash: "" };
}

export const Signature = {
  encode(message: Signature, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signature !== "") {
      writer.uint32(10).string(message.signature);
    }
    if (message.protected !== "") {
      writer.uint32(18).string(message.protected);
    }
    if (message.header !== undefined) {
      SignatureHeader.encode(message.header, writer.uint32(26).fork()).ldelim();
    }
    if (message.messageHash !== "") {
      writer.uint32(34).string(message.messageHash);
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
          message.protected = reader.string();
          break;
        case 3:
          message.header = SignatureHeader.decode(reader, reader.uint32());
          break;
        case 4:
          message.messageHash = reader.string();
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
      protected: isSet(object.protected) ? String(object.protected) : "",
      header: isSet(object.header) ? SignatureHeader.fromJSON(object.header) : undefined,
      messageHash: isSet(object.messageHash) ? String(object.messageHash) : "",
    };
  },

  toJSON(message: Signature): unknown {
    const obj: any = {};
    message.signature !== undefined && (obj.signature = message.signature);
    message.protected !== undefined && (obj.protected = message.protected);
    message.header !== undefined && (obj.header = message.header ? SignatureHeader.toJSON(message.header) : undefined);
    message.messageHash !== undefined && (obj.messageHash = message.messageHash);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Signature>, I>>(object: I): Signature {
    const message = createBaseSignature();
    message.signature = object.signature ?? "";
    message.protected = object.protected ?? "";
    message.header = (object.header !== undefined && object.header !== null)
      ? SignatureHeader.fromPartial(object.header)
      : undefined;
    message.messageHash = object.messageHash ?? "";
    return message;
  },
};

function createBaseSignatureHeader(): SignatureHeader {
  return { alg: "", kid: "" };
}

export const SignatureHeader = {
  encode(message: SignatureHeader, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.alg !== "") {
      writer.uint32(10).string(message.alg);
    }
    if (message.kid !== "") {
      writer.uint32(18).string(message.kid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignatureHeader {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignatureHeader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.alg = reader.string();
          break;
        case 2:
          message.kid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SignatureHeader {
    return { alg: isSet(object.alg) ? String(object.alg) : "", kid: isSet(object.kid) ? String(object.kid) : "" };
  },

  toJSON(message: SignatureHeader): unknown {
    const obj: any = {};
    message.alg !== undefined && (obj.alg = message.alg);
    message.kid !== undefined && (obj.kid = message.kid);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SignatureHeader>, I>>(object: I): SignatureHeader {
    const message = createBaseSignatureHeader();
    message.alg = object.alg ?? "";
    message.kid = object.kid ?? "";
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
