/* eslint-disable */
import _m0 from "protobufjs/minimal";

export enum EncryptionAlg {
  A256GCM = 0,
  RSA = 1,
  ECIES = 2,
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
    case 2:
    case "ECIES":
      return EncryptionAlg.ECIES;
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
    case EncryptionAlg.ECIES:
      return "ECIES";
    case EncryptionAlg.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Encrypter {
  alg: EncryptionAlg;
  args?: EncrypterArgs;
}

export interface EncrypterArgs {
  key: string;
}

export interface Decrypter {
  alg: EncryptionAlg;
  args?: DecrypterArgs;
}

export interface DecrypterArgs {
  key: string;
}

function createBaseEncrypter(): Encrypter {
  return { alg: 0, args: undefined };
}

export const Encrypter = {
  encode(message: Encrypter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.alg !== 0) {
      writer.uint32(8).int32(message.alg);
    }
    if (message.args !== undefined) {
      EncrypterArgs.encode(message.args, writer.uint32(18).fork()).ldelim();
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
          message.args = EncrypterArgs.decode(reader, reader.uint32());
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
      args: isSet(object.args) ? EncrypterArgs.fromJSON(object.args) : undefined,
    };
  },

  toJSON(message: Encrypter): unknown {
    const obj: any = {};
    message.alg !== undefined && (obj.alg = encryptionAlgToJSON(message.alg));
    message.args !== undefined && (obj.args = message.args ? EncrypterArgs.toJSON(message.args) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Encrypter>, I>>(object: I): Encrypter {
    const message = createBaseEncrypter();
    message.alg = object.alg ?? 0;
    message.args = (object.args !== undefined && object.args !== null)
      ? EncrypterArgs.fromPartial(object.args)
      : undefined;
    return message;
  },
};

function createBaseEncrypterArgs(): EncrypterArgs {
  return { key: "" };
}

export const EncrypterArgs = {
  encode(message: EncrypterArgs, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EncrypterArgs {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEncrypterArgs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EncrypterArgs {
    return { key: isSet(object.key) ? String(object.key) : "" };
  },

  toJSON(message: EncrypterArgs): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EncrypterArgs>, I>>(object: I): EncrypterArgs {
    const message = createBaseEncrypterArgs();
    message.key = object.key ?? "";
    return message;
  },
};

function createBaseDecrypter(): Decrypter {
  return { alg: 0, args: undefined };
}

export const Decrypter = {
  encode(message: Decrypter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.alg !== 0) {
      writer.uint32(8).int32(message.alg);
    }
    if (message.args !== undefined) {
      DecrypterArgs.encode(message.args, writer.uint32(18).fork()).ldelim();
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
          message.args = DecrypterArgs.decode(reader, reader.uint32());
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
      args: isSet(object.args) ? DecrypterArgs.fromJSON(object.args) : undefined,
    };
  },

  toJSON(message: Decrypter): unknown {
    const obj: any = {};
    message.alg !== undefined && (obj.alg = encryptionAlgToJSON(message.alg));
    message.args !== undefined && (obj.args = message.args ? DecrypterArgs.toJSON(message.args) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Decrypter>, I>>(object: I): Decrypter {
    const message = createBaseDecrypter();
    message.alg = object.alg ?? 0;
    message.args = (object.args !== undefined && object.args !== null)
      ? DecrypterArgs.fromPartial(object.args)
      : undefined;
    return message;
  },
};

function createBaseDecrypterArgs(): DecrypterArgs {
  return { key: "" };
}

export const DecrypterArgs = {
  encode(message: DecrypterArgs, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DecrypterArgs {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDecrypterArgs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DecrypterArgs {
    return { key: isSet(object.key) ? String(object.key) : "" };
  },

  toJSON(message: DecrypterArgs): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DecrypterArgs>, I>>(object: I): DecrypterArgs {
    const message = createBaseDecrypterArgs();
    message.key = object.key ?? "";
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
