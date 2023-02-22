/* eslint-disable */
import _m0 from "protobufjs/minimal";

export enum SignerAlg {
  ES256K = 0,
  ENS = 1,
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
    case SignerAlg.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Signer {
  alg: SignerAlg;
  args?: SignerArgs;
}

export interface SignerArgs {
  privateKey?: string | undefined;
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
  return { alg: 0, args: undefined };
}

export const Signer = {
  encode(message: Signer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.alg !== 0) {
      writer.uint32(8).int32(message.alg);
    }
    if (message.args !== undefined) {
      SignerArgs.encode(message.args, writer.uint32(18).fork()).ldelim();
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
          message.args = SignerArgs.decode(reader, reader.uint32());
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
      args: isSet(object.args) ? SignerArgs.fromJSON(object.args) : undefined,
    };
  },

  toJSON(message: Signer): unknown {
    const obj: any = {};
    message.alg !== undefined && (obj.alg = signerAlgToJSON(message.alg));
    message.args !== undefined && (obj.args = message.args ? SignerArgs.toJSON(message.args) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Signer>, I>>(object: I): Signer {
    const message = createBaseSigner();
    message.alg = object.alg ?? 0;
    message.args = (object.args !== undefined && object.args !== null)
      ? SignerArgs.fromPartial(object.args)
      : undefined;
    return message;
  },
};

function createBaseSignerArgs(): SignerArgs {
  return { privateKey: undefined, commonName: undefined };
}

export const SignerArgs = {
  encode(message: SignerArgs, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.privateKey !== undefined) {
      writer.uint32(10).string(message.privateKey);
    }
    if (message.commonName !== undefined) {
      writer.uint32(18).string(message.commonName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignerArgs {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignerArgs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.privateKey = reader.string();
          break;
        case 2:
          message.commonName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SignerArgs {
    return {
      privateKey: isSet(object.privateKey) ? String(object.privateKey) : undefined,
      commonName: isSet(object.commonName) ? String(object.commonName) : undefined,
    };
  },

  toJSON(message: SignerArgs): unknown {
    const obj: any = {};
    message.privateKey !== undefined && (obj.privateKey = message.privateKey);
    message.commonName !== undefined && (obj.commonName = message.commonName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SignerArgs>, I>>(object: I): SignerArgs {
    const message = createBaseSignerArgs();
    message.privateKey = object.privateKey ?? undefined;
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