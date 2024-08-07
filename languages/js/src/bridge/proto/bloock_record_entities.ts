/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Signature } from "./bloock_authenticity_entities";
import { ConfigData } from "./bloock_config";
import { Proof } from "./bloock_integrity_entities";

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

export interface IntegrityDetails {
  hash: string;
  proof?: Proof | undefined;
}

export interface AuthenticityDetails {
  signatures: Signature[];
}

export interface EncryptionDetails {
  alg?: string | undefined;
  key?: string | undefined;
  subject?: string | undefined;
}

export interface AvailabilityDetails {
  size: number;
  type?: string | undefined;
}

export interface RecordDetails {
  integrity?: IntegrityDetails | undefined;
  authenticity?: AuthenticityDetails | undefined;
  encryption?: EncryptionDetails | undefined;
  availability?: AvailabilityDetails | undefined;
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordHeader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ty = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RecordHeader {
    return { ty: isSet(object.ty) ? globalThis.String(object.ty) : "" };
  },

  toJSON(message: RecordHeader): unknown {
    const obj: any = {};
    if (message.ty !== "") {
      obj.ty = message.ty;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RecordHeader>, I>>(base?: I): RecordHeader {
    return RecordHeader.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RecordHeader>, I>>(object: I): RecordHeader {
    const message = createBaseRecordHeader();
    message.ty = object.ty ?? "";
    return message;
  },
};

function createBaseRecord(): Record {
  return { configData: undefined, payload: new Uint8Array(0), hash: "" };
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecord();
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

          message.hash = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Record {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      payload: isSet(object.payload) ? bytesFromBase64(object.payload) : new Uint8Array(0),
      hash: isSet(object.hash) ? globalThis.String(object.hash) : "",
    };
  },

  toJSON(message: Record): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.payload.length !== 0) {
      obj.payload = base64FromBytes(message.payload);
    }
    if (message.hash !== "") {
      obj.hash = message.hash;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Record>, I>>(base?: I): Record {
    return Record.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Record>, I>>(object: I): Record {
    const message = createBaseRecord();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.payload = object.payload ?? new Uint8Array(0);
    message.hash = object.hash ?? "";
    return message;
  },
};

function createBaseIntegrityDetails(): IntegrityDetails {
  return { hash: "", proof: undefined };
}

export const IntegrityDetails = {
  encode(message: IntegrityDetails, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hash !== "") {
      writer.uint32(10).string(message.hash);
    }
    if (message.proof !== undefined) {
      Proof.encode(message.proof, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IntegrityDetails {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIntegrityDetails();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hash = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.proof = Proof.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IntegrityDetails {
    return {
      hash: isSet(object.hash) ? globalThis.String(object.hash) : "",
      proof: isSet(object.proof) ? Proof.fromJSON(object.proof) : undefined,
    };
  },

  toJSON(message: IntegrityDetails): unknown {
    const obj: any = {};
    if (message.hash !== "") {
      obj.hash = message.hash;
    }
    if (message.proof !== undefined) {
      obj.proof = Proof.toJSON(message.proof);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IntegrityDetails>, I>>(base?: I): IntegrityDetails {
    return IntegrityDetails.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IntegrityDetails>, I>>(object: I): IntegrityDetails {
    const message = createBaseIntegrityDetails();
    message.hash = object.hash ?? "";
    message.proof = (object.proof !== undefined && object.proof !== null) ? Proof.fromPartial(object.proof) : undefined;
    return message;
  },
};

function createBaseAuthenticityDetails(): AuthenticityDetails {
  return { signatures: [] };
}

export const AuthenticityDetails = {
  encode(message: AuthenticityDetails, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.signatures) {
      Signature.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticityDetails {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticityDetails();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signatures.push(Signature.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthenticityDetails {
    return {
      signatures: globalThis.Array.isArray(object?.signatures)
        ? object.signatures.map((e: any) => Signature.fromJSON(e))
        : [],
    };
  },

  toJSON(message: AuthenticityDetails): unknown {
    const obj: any = {};
    if (message.signatures?.length) {
      obj.signatures = message.signatures.map((e) => Signature.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticityDetails>, I>>(base?: I): AuthenticityDetails {
    return AuthenticityDetails.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthenticityDetails>, I>>(object: I): AuthenticityDetails {
    const message = createBaseAuthenticityDetails();
    message.signatures = object.signatures?.map((e) => Signature.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEncryptionDetails(): EncryptionDetails {
  return { alg: undefined, key: undefined, subject: undefined };
}

export const EncryptionDetails = {
  encode(message: EncryptionDetails, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.alg !== undefined) {
      writer.uint32(10).string(message.alg);
    }
    if (message.key !== undefined) {
      writer.uint32(18).string(message.key);
    }
    if (message.subject !== undefined) {
      writer.uint32(26).string(message.subject);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EncryptionDetails {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEncryptionDetails();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.alg = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.key = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.subject = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EncryptionDetails {
    return {
      alg: isSet(object.alg) ? globalThis.String(object.alg) : undefined,
      key: isSet(object.key) ? globalThis.String(object.key) : undefined,
      subject: isSet(object.subject) ? globalThis.String(object.subject) : undefined,
    };
  },

  toJSON(message: EncryptionDetails): unknown {
    const obj: any = {};
    if (message.alg !== undefined) {
      obj.alg = message.alg;
    }
    if (message.key !== undefined) {
      obj.key = message.key;
    }
    if (message.subject !== undefined) {
      obj.subject = message.subject;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EncryptionDetails>, I>>(base?: I): EncryptionDetails {
    return EncryptionDetails.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EncryptionDetails>, I>>(object: I): EncryptionDetails {
    const message = createBaseEncryptionDetails();
    message.alg = object.alg ?? undefined;
    message.key = object.key ?? undefined;
    message.subject = object.subject ?? undefined;
    return message;
  },
};

function createBaseAvailabilityDetails(): AvailabilityDetails {
  return { size: 0, type: undefined };
}

export const AvailabilityDetails = {
  encode(message: AvailabilityDetails, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.size !== 0) {
      writer.uint32(8).int64(message.size);
    }
    if (message.type !== undefined) {
      writer.uint32(18).string(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AvailabilityDetails {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAvailabilityDetails();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.size = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.type = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AvailabilityDetails {
    return {
      size: isSet(object.size) ? globalThis.Number(object.size) : 0,
      type: isSet(object.type) ? globalThis.String(object.type) : undefined,
    };
  },

  toJSON(message: AvailabilityDetails): unknown {
    const obj: any = {};
    if (message.size !== 0) {
      obj.size = Math.round(message.size);
    }
    if (message.type !== undefined) {
      obj.type = message.type;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AvailabilityDetails>, I>>(base?: I): AvailabilityDetails {
    return AvailabilityDetails.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AvailabilityDetails>, I>>(object: I): AvailabilityDetails {
    const message = createBaseAvailabilityDetails();
    message.size = object.size ?? 0;
    message.type = object.type ?? undefined;
    return message;
  },
};

function createBaseRecordDetails(): RecordDetails {
  return { integrity: undefined, authenticity: undefined, encryption: undefined, availability: undefined };
}

export const RecordDetails = {
  encode(message: RecordDetails, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.integrity !== undefined) {
      IntegrityDetails.encode(message.integrity, writer.uint32(10).fork()).ldelim();
    }
    if (message.authenticity !== undefined) {
      AuthenticityDetails.encode(message.authenticity, writer.uint32(18).fork()).ldelim();
    }
    if (message.encryption !== undefined) {
      EncryptionDetails.encode(message.encryption, writer.uint32(26).fork()).ldelim();
    }
    if (message.availability !== undefined) {
      AvailabilityDetails.encode(message.availability, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordDetails {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordDetails();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.integrity = IntegrityDetails.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.authenticity = AuthenticityDetails.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.encryption = EncryptionDetails.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.availability = AvailabilityDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RecordDetails {
    return {
      integrity: isSet(object.integrity) ? IntegrityDetails.fromJSON(object.integrity) : undefined,
      authenticity: isSet(object.authenticity) ? AuthenticityDetails.fromJSON(object.authenticity) : undefined,
      encryption: isSet(object.encryption) ? EncryptionDetails.fromJSON(object.encryption) : undefined,
      availability: isSet(object.availability) ? AvailabilityDetails.fromJSON(object.availability) : undefined,
    };
  },

  toJSON(message: RecordDetails): unknown {
    const obj: any = {};
    if (message.integrity !== undefined) {
      obj.integrity = IntegrityDetails.toJSON(message.integrity);
    }
    if (message.authenticity !== undefined) {
      obj.authenticity = AuthenticityDetails.toJSON(message.authenticity);
    }
    if (message.encryption !== undefined) {
      obj.encryption = EncryptionDetails.toJSON(message.encryption);
    }
    if (message.availability !== undefined) {
      obj.availability = AvailabilityDetails.toJSON(message.availability);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RecordDetails>, I>>(base?: I): RecordDetails {
    return RecordDetails.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RecordDetails>, I>>(object: I): RecordDetails {
    const message = createBaseRecordDetails();
    message.integrity = (object.integrity !== undefined && object.integrity !== null)
      ? IntegrityDetails.fromPartial(object.integrity)
      : undefined;
    message.authenticity = (object.authenticity !== undefined && object.authenticity !== null)
      ? AuthenticityDetails.fromPartial(object.authenticity)
      : undefined;
    message.encryption = (object.encryption !== undefined && object.encryption !== null)
      ? EncryptionDetails.fromPartial(object.encryption)
      : undefined;
    message.availability = (object.availability !== undefined && object.availability !== null)
      ? AvailabilityDetails.fromPartial(object.availability)
      : undefined;
    return message;
  },
};

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

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
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
