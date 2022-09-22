/* eslint-disable */
import {
  makeGenericClientConstructor,
  ChannelCredentials,
  ChannelOptions,
  UntypedServiceImplementation,
  handleUnaryCall,
  Client,
  ClientUnaryCall,
  Metadata,
  CallOptions,
  ServiceError,
} from "@grpc/grpc-js";
import { ConfigData } from "./config";
import Long from "long";
import { Error } from "./bloock";
import { Proof } from "./proof";
import _m0 from "protobufjs/minimal";

export enum RecordTypes {
  STRING = 0,
  HEX = 1,
  JSON = 2,
  BYTES = 3,
  FILE = 4,
  RECORD = 5,
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
    case RecordTypes.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum SignerAlg {
  ES256K = 0,
  UNRECOGNIZED = -1,
}

export function signerAlgFromJSON(object: any): SignerAlg {
  switch (object) {
    case 0:
    case "ES256K":
      return SignerAlg.ES256K;
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
    case SignerAlg.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum EncrypterAlg {
  A256GCM = 0,
  UNRECOGNIZED = -1,
}

export function encrypterAlgFromJSON(object: any): EncrypterAlg {
  switch (object) {
    case 0:
    case "A256GCM":
      return EncrypterAlg.A256GCM;
    case -1:
    case "UNRECOGNIZED":
    default:
      return EncrypterAlg.UNRECOGNIZED;
  }
}

export function encrypterAlgToJSON(object: EncrypterAlg): string {
  switch (object) {
    case EncrypterAlg.A256GCM:
      return "A256GCM";
    case EncrypterAlg.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface RecordHash {
  hash: string;
  error?: Error | undefined;
}

export interface RecordHeader {
  ty: string;
}

export interface Record {
  headers?: RecordHeader;
  payload: Buffer;
  signatures: Signature[];
  encryption?: Encryption | undefined;
  proof?: Proof | undefined;
}

export interface Signer {
  alg: SignerAlg;
  args?: SignerArgs;
}

export interface SignerArgs {
  privateKey: string;
}

export interface Encrypter {
  alg: EncrypterAlg;
  args?: EncrypterArgs;
}

export interface EncrypterArgs {
  secret: string;
}

export interface Signature {
  signature: string;
  protected: string;
  header?: SignatureHeader;
}

export interface SignatureHeader {
  alg: string;
  kid: string;
}

export interface Encryption {
  header?: EncryptionHeader;
  protected: string;
}

export interface EncryptionHeader {
  alg: string;
}

export interface RecordReceipt {
  anchor: number;
  client: string;
  record: string;
  status: string;
}

export interface RecordBuilderFromStringRequest {
  payload: string;
  signer?: Signer | undefined;
  encrypter?: Encrypter | undefined;
}

export interface RecordBuilderFromHexRequest {
  payload: string;
  signer?: Signer | undefined;
  encrypter?: Encrypter | undefined;
}

export interface RecordBuilderFromJSONRequest {
  payload: string;
  signer?: Signer | undefined;
  encrypter?: Encrypter | undefined;
}

export interface RecordBuilderFromBytesRequest {
  payload: Buffer;
  signer?: Signer | undefined;
  encrypter?: Encrypter | undefined;
}

export interface RecordBuilderFromFileRequest {
  payload: Buffer;
  signer?: Signer | undefined;
  encrypter?: Encrypter | undefined;
}

export interface RecordBuilderFromRecordRequest {
  payload?: Record;
  signer?: Signer | undefined;
  encrypter?: Encrypter | undefined;
}

export interface RecordBuilderResponse {
  record?: Record;
  error?: Error | undefined;
}

export interface SendRecordsRequest {
  configData?: ConfigData;
  records: string[];
}

export interface SendRecordsResponse {
  records: RecordReceipt[];
  error?: Error | undefined;
}

function createBaseRecordHash(): RecordHash {
  return { hash: "", error: undefined };
}

export const RecordHash = {
  encode(
    message: RecordHash,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.hash !== "") {
      writer.uint32(10).string(message.hash);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordHash {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordHash();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.string();
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

  fromJSON(object: any): RecordHash {
    return {
      hash: isSet(object.hash) ? String(object.hash) : "",
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: RecordHash): unknown {
    const obj: any = {};
    message.hash !== undefined && (obj.hash = message.hash);
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordHash>, I>>(
    object: I
  ): RecordHash {
    const message = createBaseRecordHash();
    message.hash = object.hash ?? "";
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    return message;
  },
};

function createBaseRecordHeader(): RecordHeader {
  return { ty: "" };
}

export const RecordHeader = {
  encode(
    message: RecordHeader,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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
    return {
      ty: isSet(object.ty) ? String(object.ty) : "",
    };
  },

  toJSON(message: RecordHeader): unknown {
    const obj: any = {};
    message.ty !== undefined && (obj.ty = message.ty);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordHeader>, I>>(
    object: I
  ): RecordHeader {
    const message = createBaseRecordHeader();
    message.ty = object.ty ?? "";
    return message;
  },
};

function createBaseRecord(): Record {
  return {
    headers: undefined,
    payload: Buffer.alloc(0),
    signatures: [],
    encryption: undefined,
    proof: undefined,
  };
}

export const Record = {
  encode(
    message: Record,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.headers !== undefined) {
      RecordHeader.encode(message.headers, writer.uint32(10).fork()).ldelim();
    }
    if (message.payload.length !== 0) {
      writer.uint32(18).bytes(message.payload);
    }
    for (const v of message.signatures) {
      Signature.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.encryption !== undefined) {
      Encryption.encode(message.encryption, writer.uint32(34).fork()).ldelim();
    }
    if (message.proof !== undefined) {
      Proof.encode(message.proof, writer.uint32(42).fork()).ldelim();
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
          message.headers = RecordHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.payload = reader.bytes() as Buffer;
          break;
        case 3:
          message.signatures.push(Signature.decode(reader, reader.uint32()));
          break;
        case 4:
          message.encryption = Encryption.decode(reader, reader.uint32());
          break;
        case 5:
          message.proof = Proof.decode(reader, reader.uint32());
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
      headers: isSet(object.headers)
        ? RecordHeader.fromJSON(object.headers)
        : undefined,
      payload: isSet(object.payload)
        ? Buffer.from(bytesFromBase64(object.payload))
        : Buffer.alloc(0),
      signatures: Array.isArray(object?.signatures)
        ? object.signatures.map((e: any) => Signature.fromJSON(e))
        : [],
      encryption: isSet(object.encryption)
        ? Encryption.fromJSON(object.encryption)
        : undefined,
      proof: isSet(object.proof) ? Proof.fromJSON(object.proof) : undefined,
    };
  },

  toJSON(message: Record): unknown {
    const obj: any = {};
    message.headers !== undefined &&
      (obj.headers = message.headers
        ? RecordHeader.toJSON(message.headers)
        : undefined);
    message.payload !== undefined &&
      (obj.payload = base64FromBytes(
        message.payload !== undefined ? message.payload : Buffer.alloc(0)
      ));
    if (message.signatures) {
      obj.signatures = message.signatures.map((e) =>
        e ? Signature.toJSON(e) : undefined
      );
    } else {
      obj.signatures = [];
    }
    message.encryption !== undefined &&
      (obj.encryption = message.encryption
        ? Encryption.toJSON(message.encryption)
        : undefined);
    message.proof !== undefined &&
      (obj.proof = message.proof ? Proof.toJSON(message.proof) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Record>, I>>(object: I): Record {
    const message = createBaseRecord();
    message.headers =
      object.headers !== undefined && object.headers !== null
        ? RecordHeader.fromPartial(object.headers)
        : undefined;
    message.payload = object.payload ?? Buffer.alloc(0);
    message.signatures =
      object.signatures?.map((e) => Signature.fromPartial(e)) || [];
    message.encryption =
      object.encryption !== undefined && object.encryption !== null
        ? Encryption.fromPartial(object.encryption)
        : undefined;
    message.proof =
      object.proof !== undefined && object.proof !== null
        ? Proof.fromPartial(object.proof)
        : undefined;
    return message;
  },
};

function createBaseSigner(): Signer {
  return { alg: 0, args: undefined };
}

export const Signer = {
  encode(
    message: Signer,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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
    message.args !== undefined &&
      (obj.args = message.args ? SignerArgs.toJSON(message.args) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Signer>, I>>(object: I): Signer {
    const message = createBaseSigner();
    message.alg = object.alg ?? 0;
    message.args =
      object.args !== undefined && object.args !== null
        ? SignerArgs.fromPartial(object.args)
        : undefined;
    return message;
  },
};

function createBaseSignerArgs(): SignerArgs {
  return { privateKey: "" };
}

export const SignerArgs = {
  encode(
    message: SignerArgs,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.privateKey !== "") {
      writer.uint32(10).string(message.privateKey);
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SignerArgs {
    return {
      privateKey: isSet(object.privateKey) ? String(object.privateKey) : "",
    };
  },

  toJSON(message: SignerArgs): unknown {
    const obj: any = {};
    message.privateKey !== undefined && (obj.privateKey = message.privateKey);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SignerArgs>, I>>(
    object: I
  ): SignerArgs {
    const message = createBaseSignerArgs();
    message.privateKey = object.privateKey ?? "";
    return message;
  },
};

function createBaseEncrypter(): Encrypter {
  return { alg: 0, args: undefined };
}

export const Encrypter = {
  encode(
    message: Encrypter,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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
      alg: isSet(object.alg) ? encrypterAlgFromJSON(object.alg) : 0,
      args: isSet(object.args)
        ? EncrypterArgs.fromJSON(object.args)
        : undefined,
    };
  },

  toJSON(message: Encrypter): unknown {
    const obj: any = {};
    message.alg !== undefined && (obj.alg = encrypterAlgToJSON(message.alg));
    message.args !== undefined &&
      (obj.args = message.args
        ? EncrypterArgs.toJSON(message.args)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Encrypter>, I>>(
    object: I
  ): Encrypter {
    const message = createBaseEncrypter();
    message.alg = object.alg ?? 0;
    message.args =
      object.args !== undefined && object.args !== null
        ? EncrypterArgs.fromPartial(object.args)
        : undefined;
    return message;
  },
};

function createBaseEncrypterArgs(): EncrypterArgs {
  return { secret: "" };
}

export const EncrypterArgs = {
  encode(
    message: EncrypterArgs,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.secret !== "") {
      writer.uint32(10).string(message.secret);
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
          message.secret = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EncrypterArgs {
    return {
      secret: isSet(object.secret) ? String(object.secret) : "",
    };
  },

  toJSON(message: EncrypterArgs): unknown {
    const obj: any = {};
    message.secret !== undefined && (obj.secret = message.secret);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EncrypterArgs>, I>>(
    object: I
  ): EncrypterArgs {
    const message = createBaseEncrypterArgs();
    message.secret = object.secret ?? "";
    return message;
  },
};

function createBaseSignature(): Signature {
  return { signature: "", protected: "", header: undefined };
}

export const Signature = {
  encode(
    message: Signature,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.signature !== "") {
      writer.uint32(10).string(message.signature);
    }
    if (message.protected !== "") {
      writer.uint32(18).string(message.protected);
    }
    if (message.header !== undefined) {
      SignatureHeader.encode(message.header, writer.uint32(26).fork()).ldelim();
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
      header: isSet(object.header)
        ? SignatureHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: Signature): unknown {
    const obj: any = {};
    message.signature !== undefined && (obj.signature = message.signature);
    message.protected !== undefined && (obj.protected = message.protected);
    message.header !== undefined &&
      (obj.header = message.header
        ? SignatureHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Signature>, I>>(
    object: I
  ): Signature {
    const message = createBaseSignature();
    message.signature = object.signature ?? "";
    message.protected = object.protected ?? "";
    message.header =
      object.header !== undefined && object.header !== null
        ? SignatureHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseSignatureHeader(): SignatureHeader {
  return { alg: "", kid: "" };
}

export const SignatureHeader = {
  encode(
    message: SignatureHeader,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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
    return {
      alg: isSet(object.alg) ? String(object.alg) : "",
      kid: isSet(object.kid) ? String(object.kid) : "",
    };
  },

  toJSON(message: SignatureHeader): unknown {
    const obj: any = {};
    message.alg !== undefined && (obj.alg = message.alg);
    message.kid !== undefined && (obj.kid = message.kid);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SignatureHeader>, I>>(
    object: I
  ): SignatureHeader {
    const message = createBaseSignatureHeader();
    message.alg = object.alg ?? "";
    message.kid = object.kid ?? "";
    return message;
  },
};

function createBaseEncryption(): Encryption {
  return { header: undefined, protected: "" };
}

export const Encryption = {
  encode(
    message: Encryption,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      EncryptionHeader.encode(
        message.header,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.protected !== "") {
      writer.uint32(18).string(message.protected);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Encryption {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEncryption();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = EncryptionHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.protected = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Encryption {
    return {
      header: isSet(object.header)
        ? EncryptionHeader.fromJSON(object.header)
        : undefined,
      protected: isSet(object.protected) ? String(object.protected) : "",
    };
  },

  toJSON(message: Encryption): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? EncryptionHeader.toJSON(message.header)
        : undefined);
    message.protected !== undefined && (obj.protected = message.protected);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Encryption>, I>>(
    object: I
  ): Encryption {
    const message = createBaseEncryption();
    message.header =
      object.header !== undefined && object.header !== null
        ? EncryptionHeader.fromPartial(object.header)
        : undefined;
    message.protected = object.protected ?? "";
    return message;
  },
};

function createBaseEncryptionHeader(): EncryptionHeader {
  return { alg: "" };
}

export const EncryptionHeader = {
  encode(
    message: EncryptionHeader,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.alg !== "") {
      writer.uint32(10).string(message.alg);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EncryptionHeader {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEncryptionHeader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.alg = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EncryptionHeader {
    return {
      alg: isSet(object.alg) ? String(object.alg) : "",
    };
  },

  toJSON(message: EncryptionHeader): unknown {
    const obj: any = {};
    message.alg !== undefined && (obj.alg = message.alg);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EncryptionHeader>, I>>(
    object: I
  ): EncryptionHeader {
    const message = createBaseEncryptionHeader();
    message.alg = object.alg ?? "";
    return message;
  },
};

function createBaseRecordReceipt(): RecordReceipt {
  return { anchor: 0, client: "", record: "", status: "" };
}

export const RecordReceipt = {
  encode(
    message: RecordReceipt,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.anchor !== 0) {
      writer.uint32(8).int64(message.anchor);
    }
    if (message.client !== "") {
      writer.uint32(18).string(message.client);
    }
    if (message.record !== "") {
      writer.uint32(26).string(message.record);
    }
    if (message.status !== "") {
      writer.uint32(34).string(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordReceipt {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordReceipt();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.anchor = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.client = reader.string();
          break;
        case 3:
          message.record = reader.string();
          break;
        case 4:
          message.status = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordReceipt {
    return {
      anchor: isSet(object.anchor) ? Number(object.anchor) : 0,
      client: isSet(object.client) ? String(object.client) : "",
      record: isSet(object.record) ? String(object.record) : "",
      status: isSet(object.status) ? String(object.status) : "",
    };
  },

  toJSON(message: RecordReceipt): unknown {
    const obj: any = {};
    message.anchor !== undefined && (obj.anchor = Math.round(message.anchor));
    message.client !== undefined && (obj.client = message.client);
    message.record !== undefined && (obj.record = message.record);
    message.status !== undefined && (obj.status = message.status);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordReceipt>, I>>(
    object: I
  ): RecordReceipt {
    const message = createBaseRecordReceipt();
    message.anchor = object.anchor ?? 0;
    message.client = object.client ?? "";
    message.record = object.record ?? "";
    message.status = object.status ?? "";
    return message;
  },
};

function createBaseRecordBuilderFromStringRequest(): RecordBuilderFromStringRequest {
  return { payload: "", signer: undefined, encrypter: undefined };
}

export const RecordBuilderFromStringRequest = {
  encode(
    message: RecordBuilderFromStringRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.payload !== "") {
      writer.uint32(10).string(message.payload);
    }
    if (message.signer !== undefined) {
      Signer.encode(message.signer, writer.uint32(18).fork()).ldelim();
    }
    if (message.encrypter !== undefined) {
      Encrypter.encode(message.encrypter, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RecordBuilderFromStringRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordBuilderFromStringRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.payload = reader.string();
          break;
        case 2:
          message.signer = Signer.decode(reader, reader.uint32());
          break;
        case 3:
          message.encrypter = Encrypter.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordBuilderFromStringRequest {
    return {
      payload: isSet(object.payload) ? String(object.payload) : "",
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
      encrypter: isSet(object.encrypter)
        ? Encrypter.fromJSON(object.encrypter)
        : undefined,
    };
  },

  toJSON(message: RecordBuilderFromStringRequest): unknown {
    const obj: any = {};
    message.payload !== undefined && (obj.payload = message.payload);
    message.signer !== undefined &&
      (obj.signer = message.signer ? Signer.toJSON(message.signer) : undefined);
    message.encrypter !== undefined &&
      (obj.encrypter = message.encrypter
        ? Encrypter.toJSON(message.encrypter)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordBuilderFromStringRequest>, I>>(
    object: I
  ): RecordBuilderFromStringRequest {
    const message = createBaseRecordBuilderFromStringRequest();
    message.payload = object.payload ?? "";
    message.signer =
      object.signer !== undefined && object.signer !== null
        ? Signer.fromPartial(object.signer)
        : undefined;
    message.encrypter =
      object.encrypter !== undefined && object.encrypter !== null
        ? Encrypter.fromPartial(object.encrypter)
        : undefined;
    return message;
  },
};

function createBaseRecordBuilderFromHexRequest(): RecordBuilderFromHexRequest {
  return { payload: "", signer: undefined, encrypter: undefined };
}

export const RecordBuilderFromHexRequest = {
  encode(
    message: RecordBuilderFromHexRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.payload !== "") {
      writer.uint32(10).string(message.payload);
    }
    if (message.signer !== undefined) {
      Signer.encode(message.signer, writer.uint32(18).fork()).ldelim();
    }
    if (message.encrypter !== undefined) {
      Encrypter.encode(message.encrypter, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RecordBuilderFromHexRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordBuilderFromHexRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.payload = reader.string();
          break;
        case 2:
          message.signer = Signer.decode(reader, reader.uint32());
          break;
        case 3:
          message.encrypter = Encrypter.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordBuilderFromHexRequest {
    return {
      payload: isSet(object.payload) ? String(object.payload) : "",
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
      encrypter: isSet(object.encrypter)
        ? Encrypter.fromJSON(object.encrypter)
        : undefined,
    };
  },

  toJSON(message: RecordBuilderFromHexRequest): unknown {
    const obj: any = {};
    message.payload !== undefined && (obj.payload = message.payload);
    message.signer !== undefined &&
      (obj.signer = message.signer ? Signer.toJSON(message.signer) : undefined);
    message.encrypter !== undefined &&
      (obj.encrypter = message.encrypter
        ? Encrypter.toJSON(message.encrypter)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordBuilderFromHexRequest>, I>>(
    object: I
  ): RecordBuilderFromHexRequest {
    const message = createBaseRecordBuilderFromHexRequest();
    message.payload = object.payload ?? "";
    message.signer =
      object.signer !== undefined && object.signer !== null
        ? Signer.fromPartial(object.signer)
        : undefined;
    message.encrypter =
      object.encrypter !== undefined && object.encrypter !== null
        ? Encrypter.fromPartial(object.encrypter)
        : undefined;
    return message;
  },
};

function createBaseRecordBuilderFromJSONRequest(): RecordBuilderFromJSONRequest {
  return { payload: "", signer: undefined, encrypter: undefined };
}

export const RecordBuilderFromJSONRequest = {
  encode(
    message: RecordBuilderFromJSONRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.payload !== "") {
      writer.uint32(10).string(message.payload);
    }
    if (message.signer !== undefined) {
      Signer.encode(message.signer, writer.uint32(18).fork()).ldelim();
    }
    if (message.encrypter !== undefined) {
      Encrypter.encode(message.encrypter, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RecordBuilderFromJSONRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordBuilderFromJSONRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.payload = reader.string();
          break;
        case 2:
          message.signer = Signer.decode(reader, reader.uint32());
          break;
        case 3:
          message.encrypter = Encrypter.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordBuilderFromJSONRequest {
    return {
      payload: isSet(object.payload) ? String(object.payload) : "",
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
      encrypter: isSet(object.encrypter)
        ? Encrypter.fromJSON(object.encrypter)
        : undefined,
    };
  },

  toJSON(message: RecordBuilderFromJSONRequest): unknown {
    const obj: any = {};
    message.payload !== undefined && (obj.payload = message.payload);
    message.signer !== undefined &&
      (obj.signer = message.signer ? Signer.toJSON(message.signer) : undefined);
    message.encrypter !== undefined &&
      (obj.encrypter = message.encrypter
        ? Encrypter.toJSON(message.encrypter)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordBuilderFromJSONRequest>, I>>(
    object: I
  ): RecordBuilderFromJSONRequest {
    const message = createBaseRecordBuilderFromJSONRequest();
    message.payload = object.payload ?? "";
    message.signer =
      object.signer !== undefined && object.signer !== null
        ? Signer.fromPartial(object.signer)
        : undefined;
    message.encrypter =
      object.encrypter !== undefined && object.encrypter !== null
        ? Encrypter.fromPartial(object.encrypter)
        : undefined;
    return message;
  },
};

function createBaseRecordBuilderFromBytesRequest(): RecordBuilderFromBytesRequest {
  return { payload: Buffer.alloc(0), signer: undefined, encrypter: undefined };
}

export const RecordBuilderFromBytesRequest = {
  encode(
    message: RecordBuilderFromBytesRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.payload.length !== 0) {
      writer.uint32(10).bytes(message.payload);
    }
    if (message.signer !== undefined) {
      Signer.encode(message.signer, writer.uint32(18).fork()).ldelim();
    }
    if (message.encrypter !== undefined) {
      Encrypter.encode(message.encrypter, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RecordBuilderFromBytesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordBuilderFromBytesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.payload = reader.bytes() as Buffer;
          break;
        case 2:
          message.signer = Signer.decode(reader, reader.uint32());
          break;
        case 3:
          message.encrypter = Encrypter.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordBuilderFromBytesRequest {
    return {
      payload: isSet(object.payload)
        ? Buffer.from(bytesFromBase64(object.payload))
        : Buffer.alloc(0),
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
      encrypter: isSet(object.encrypter)
        ? Encrypter.fromJSON(object.encrypter)
        : undefined,
    };
  },

  toJSON(message: RecordBuilderFromBytesRequest): unknown {
    const obj: any = {};
    message.payload !== undefined &&
      (obj.payload = base64FromBytes(
        message.payload !== undefined ? message.payload : Buffer.alloc(0)
      ));
    message.signer !== undefined &&
      (obj.signer = message.signer ? Signer.toJSON(message.signer) : undefined);
    message.encrypter !== undefined &&
      (obj.encrypter = message.encrypter
        ? Encrypter.toJSON(message.encrypter)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordBuilderFromBytesRequest>, I>>(
    object: I
  ): RecordBuilderFromBytesRequest {
    const message = createBaseRecordBuilderFromBytesRequest();
    message.payload = object.payload ?? Buffer.alloc(0);
    message.signer =
      object.signer !== undefined && object.signer !== null
        ? Signer.fromPartial(object.signer)
        : undefined;
    message.encrypter =
      object.encrypter !== undefined && object.encrypter !== null
        ? Encrypter.fromPartial(object.encrypter)
        : undefined;
    return message;
  },
};

function createBaseRecordBuilderFromFileRequest(): RecordBuilderFromFileRequest {
  return { payload: Buffer.alloc(0), signer: undefined, encrypter: undefined };
}

export const RecordBuilderFromFileRequest = {
  encode(
    message: RecordBuilderFromFileRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.payload.length !== 0) {
      writer.uint32(10).bytes(message.payload);
    }
    if (message.signer !== undefined) {
      Signer.encode(message.signer, writer.uint32(18).fork()).ldelim();
    }
    if (message.encrypter !== undefined) {
      Encrypter.encode(message.encrypter, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RecordBuilderFromFileRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordBuilderFromFileRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.payload = reader.bytes() as Buffer;
          break;
        case 2:
          message.signer = Signer.decode(reader, reader.uint32());
          break;
        case 3:
          message.encrypter = Encrypter.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordBuilderFromFileRequest {
    return {
      payload: isSet(object.payload)
        ? Buffer.from(bytesFromBase64(object.payload))
        : Buffer.alloc(0),
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
      encrypter: isSet(object.encrypter)
        ? Encrypter.fromJSON(object.encrypter)
        : undefined,
    };
  },

  toJSON(message: RecordBuilderFromFileRequest): unknown {
    const obj: any = {};
    message.payload !== undefined &&
      (obj.payload = base64FromBytes(
        message.payload !== undefined ? message.payload : Buffer.alloc(0)
      ));
    message.signer !== undefined &&
      (obj.signer = message.signer ? Signer.toJSON(message.signer) : undefined);
    message.encrypter !== undefined &&
      (obj.encrypter = message.encrypter
        ? Encrypter.toJSON(message.encrypter)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordBuilderFromFileRequest>, I>>(
    object: I
  ): RecordBuilderFromFileRequest {
    const message = createBaseRecordBuilderFromFileRequest();
    message.payload = object.payload ?? Buffer.alloc(0);
    message.signer =
      object.signer !== undefined && object.signer !== null
        ? Signer.fromPartial(object.signer)
        : undefined;
    message.encrypter =
      object.encrypter !== undefined && object.encrypter !== null
        ? Encrypter.fromPartial(object.encrypter)
        : undefined;
    return message;
  },
};

function createBaseRecordBuilderFromRecordRequest(): RecordBuilderFromRecordRequest {
  return { payload: undefined, signer: undefined, encrypter: undefined };
}

export const RecordBuilderFromRecordRequest = {
  encode(
    message: RecordBuilderFromRecordRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.payload !== undefined) {
      Record.encode(message.payload, writer.uint32(10).fork()).ldelim();
    }
    if (message.signer !== undefined) {
      Signer.encode(message.signer, writer.uint32(18).fork()).ldelim();
    }
    if (message.encrypter !== undefined) {
      Encrypter.encode(message.encrypter, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RecordBuilderFromRecordRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordBuilderFromRecordRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.payload = Record.decode(reader, reader.uint32());
          break;
        case 2:
          message.signer = Signer.decode(reader, reader.uint32());
          break;
        case 3:
          message.encrypter = Encrypter.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordBuilderFromRecordRequest {
    return {
      payload: isSet(object.payload)
        ? Record.fromJSON(object.payload)
        : undefined,
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
      encrypter: isSet(object.encrypter)
        ? Encrypter.fromJSON(object.encrypter)
        : undefined,
    };
  },

  toJSON(message: RecordBuilderFromRecordRequest): unknown {
    const obj: any = {};
    message.payload !== undefined &&
      (obj.payload = message.payload
        ? Record.toJSON(message.payload)
        : undefined);
    message.signer !== undefined &&
      (obj.signer = message.signer ? Signer.toJSON(message.signer) : undefined);
    message.encrypter !== undefined &&
      (obj.encrypter = message.encrypter
        ? Encrypter.toJSON(message.encrypter)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordBuilderFromRecordRequest>, I>>(
    object: I
  ): RecordBuilderFromRecordRequest {
    const message = createBaseRecordBuilderFromRecordRequest();
    message.payload =
      object.payload !== undefined && object.payload !== null
        ? Record.fromPartial(object.payload)
        : undefined;
    message.signer =
      object.signer !== undefined && object.signer !== null
        ? Signer.fromPartial(object.signer)
        : undefined;
    message.encrypter =
      object.encrypter !== undefined && object.encrypter !== null
        ? Encrypter.fromPartial(object.encrypter)
        : undefined;
    return message;
  },
};

function createBaseRecordBuilderResponse(): RecordBuilderResponse {
  return { record: undefined, error: undefined };
}

export const RecordBuilderResponse = {
  encode(
    message: RecordBuilderResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.record !== undefined) {
      Record.encode(message.record, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RecordBuilderResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordBuilderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.record = Record.decode(reader, reader.uint32());
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

  fromJSON(object: any): RecordBuilderResponse {
    return {
      record: isSet(object.record) ? Record.fromJSON(object.record) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: RecordBuilderResponse): unknown {
    const obj: any = {};
    message.record !== undefined &&
      (obj.record = message.record ? Record.toJSON(message.record) : undefined);
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordBuilderResponse>, I>>(
    object: I
  ): RecordBuilderResponse {
    const message = createBaseRecordBuilderResponse();
    message.record =
      object.record !== undefined && object.record !== null
        ? Record.fromPartial(object.record)
        : undefined;
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    return message;
  },
};

function createBaseSendRecordsRequest(): SendRecordsRequest {
  return { configData: undefined, records: [] };
}

export const SendRecordsRequest = {
  encode(
    message: SendRecordsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.records) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendRecordsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendRecordsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.records.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SendRecordsRequest {
    return {
      configData: isSet(object.configData)
        ? ConfigData.fromJSON(object.configData)
        : undefined,
      records: Array.isArray(object?.records)
        ? object.records.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: SendRecordsRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData
        ? ConfigData.toJSON(message.configData)
        : undefined);
    if (message.records) {
      obj.records = message.records.map((e) => e);
    } else {
      obj.records = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SendRecordsRequest>, I>>(
    object: I
  ): SendRecordsRequest {
    const message = createBaseSendRecordsRequest();
    message.configData =
      object.configData !== undefined && object.configData !== null
        ? ConfigData.fromPartial(object.configData)
        : undefined;
    message.records = object.records?.map((e) => e) || [];
    return message;
  },
};

function createBaseSendRecordsResponse(): SendRecordsResponse {
  return { records: [], error: undefined };
}

export const SendRecordsResponse = {
  encode(
    message: SendRecordsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.records) {
      RecordReceipt.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendRecordsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendRecordsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.records.push(RecordReceipt.decode(reader, reader.uint32()));
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

  fromJSON(object: any): SendRecordsResponse {
    return {
      records: Array.isArray(object?.records)
        ? object.records.map((e: any) => RecordReceipt.fromJSON(e))
        : [],
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: SendRecordsResponse): unknown {
    const obj: any = {};
    if (message.records) {
      obj.records = message.records.map((e) =>
        e ? RecordReceipt.toJSON(e) : undefined
      );
    } else {
      obj.records = [];
    }
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SendRecordsResponse>, I>>(
    object: I
  ): SendRecordsResponse {
    const message = createBaseSendRecordsResponse();
    message.records =
      object.records?.map((e) => RecordReceipt.fromPartial(e)) || [];
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    return message;
  },
};

export type RecordServiceService = typeof RecordServiceService;
export const RecordServiceService = {
  sendRecords: {
    path: "/bloock.RecordService/SendRecords",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SendRecordsRequest) =>
      Buffer.from(SendRecordsRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SendRecordsRequest.decode(value),
    responseSerialize: (value: SendRecordsResponse) =>
      Buffer.from(SendRecordsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SendRecordsResponse.decode(value),
  },
  buildRecordFromString: {
    path: "/bloock.RecordService/BuildRecordFromString",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: RecordBuilderFromStringRequest) =>
      Buffer.from(RecordBuilderFromStringRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) =>
      RecordBuilderFromStringRequest.decode(value),
    responseSerialize: (value: RecordBuilderResponse) =>
      Buffer.from(RecordBuilderResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => RecordBuilderResponse.decode(value),
  },
  buildRecordFromHex: {
    path: "/bloock.RecordService/BuildRecordFromHex",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: RecordBuilderFromHexRequest) =>
      Buffer.from(RecordBuilderFromHexRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) =>
      RecordBuilderFromHexRequest.decode(value),
    responseSerialize: (value: RecordBuilderResponse) =>
      Buffer.from(RecordBuilderResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => RecordBuilderResponse.decode(value),
  },
  buildRecordFromJSON: {
    path: "/bloock.RecordService/BuildRecordFromJSON",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: RecordBuilderFromJSONRequest) =>
      Buffer.from(RecordBuilderFromJSONRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) =>
      RecordBuilderFromJSONRequest.decode(value),
    responseSerialize: (value: RecordBuilderResponse) =>
      Buffer.from(RecordBuilderResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => RecordBuilderResponse.decode(value),
  },
  buildRecordFromFile: {
    path: "/bloock.RecordService/BuildRecordFromFile",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: RecordBuilderFromFileRequest) =>
      Buffer.from(RecordBuilderFromFileRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) =>
      RecordBuilderFromFileRequest.decode(value),
    responseSerialize: (value: RecordBuilderResponse) =>
      Buffer.from(RecordBuilderResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => RecordBuilderResponse.decode(value),
  },
  buildRecordFromBytes: {
    path: "/bloock.RecordService/BuildRecordFromBytes",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: RecordBuilderFromBytesRequest) =>
      Buffer.from(RecordBuilderFromBytesRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) =>
      RecordBuilderFromBytesRequest.decode(value),
    responseSerialize: (value: RecordBuilderResponse) =>
      Buffer.from(RecordBuilderResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => RecordBuilderResponse.decode(value),
  },
  buildRecordFromRecord: {
    path: "/bloock.RecordService/BuildRecordFromRecord",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: RecordBuilderFromRecordRequest) =>
      Buffer.from(RecordBuilderFromRecordRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) =>
      RecordBuilderFromRecordRequest.decode(value),
    responseSerialize: (value: RecordBuilderResponse) =>
      Buffer.from(RecordBuilderResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => RecordBuilderResponse.decode(value),
  },
  getHash: {
    path: "/bloock.RecordService/GetHash",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Record) =>
      Buffer.from(Record.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Record.decode(value),
    responseSerialize: (value: RecordHash) =>
      Buffer.from(RecordHash.encode(value).finish()),
    responseDeserialize: (value: Buffer) => RecordHash.decode(value),
  },
} as const;

export interface RecordServiceServer extends UntypedServiceImplementation {
  sendRecords: handleUnaryCall<SendRecordsRequest, SendRecordsResponse>;
  buildRecordFromString: handleUnaryCall<
    RecordBuilderFromStringRequest,
    RecordBuilderResponse
  >;
  buildRecordFromHex: handleUnaryCall<
    RecordBuilderFromHexRequest,
    RecordBuilderResponse
  >;
  buildRecordFromJSON: handleUnaryCall<
    RecordBuilderFromJSONRequest,
    RecordBuilderResponse
  >;
  buildRecordFromFile: handleUnaryCall<
    RecordBuilderFromFileRequest,
    RecordBuilderResponse
  >;
  buildRecordFromBytes: handleUnaryCall<
    RecordBuilderFromBytesRequest,
    RecordBuilderResponse
  >;
  buildRecordFromRecord: handleUnaryCall<
    RecordBuilderFromRecordRequest,
    RecordBuilderResponse
  >;
  getHash: handleUnaryCall<Record, RecordHash>;
}

export interface RecordServiceClient extends Client {
  sendRecords(
    request: SendRecordsRequest,
    callback: (
      error: ServiceError | null,
      response: SendRecordsResponse
    ) => void
  ): ClientUnaryCall;
  sendRecords(
    request: SendRecordsRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: SendRecordsResponse
    ) => void
  ): ClientUnaryCall;
  sendRecords(
    request: SendRecordsRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: SendRecordsResponse
    ) => void
  ): ClientUnaryCall;
  buildRecordFromString(
    request: RecordBuilderFromStringRequest,
    callback: (
      error: ServiceError | null,
      response: RecordBuilderResponse
    ) => void
  ): ClientUnaryCall;
  buildRecordFromString(
    request: RecordBuilderFromStringRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: RecordBuilderResponse
    ) => void
  ): ClientUnaryCall;
  buildRecordFromString(
    request: RecordBuilderFromStringRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: RecordBuilderResponse
    ) => void
  ): ClientUnaryCall;
  buildRecordFromHex(
    request: RecordBuilderFromHexRequest,
    callback: (
      error: ServiceError | null,
      response: RecordBuilderResponse
    ) => void
  ): ClientUnaryCall;
  buildRecordFromHex(
    request: RecordBuilderFromHexRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: RecordBuilderResponse
    ) => void
  ): ClientUnaryCall;
  buildRecordFromHex(
    request: RecordBuilderFromHexRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: RecordBuilderResponse
    ) => void
  ): ClientUnaryCall;
  buildRecordFromJSON(
    request: RecordBuilderFromJSONRequest,
    callback: (
      error: ServiceError | null,
      response: RecordBuilderResponse
    ) => void
  ): ClientUnaryCall;
  buildRecordFromJSON(
    request: RecordBuilderFromJSONRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: RecordBuilderResponse
    ) => void
  ): ClientUnaryCall;
  buildRecordFromJSON(
    request: RecordBuilderFromJSONRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: RecordBuilderResponse
    ) => void
  ): ClientUnaryCall;
  buildRecordFromFile(
    request: RecordBuilderFromFileRequest,
    callback: (
      error: ServiceError | null,
      response: RecordBuilderResponse
    ) => void
  ): ClientUnaryCall;
  buildRecordFromFile(
    request: RecordBuilderFromFileRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: RecordBuilderResponse
    ) => void
  ): ClientUnaryCall;
  buildRecordFromFile(
    request: RecordBuilderFromFileRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: RecordBuilderResponse
    ) => void
  ): ClientUnaryCall;
  buildRecordFromBytes(
    request: RecordBuilderFromBytesRequest,
    callback: (
      error: ServiceError | null,
      response: RecordBuilderResponse
    ) => void
  ): ClientUnaryCall;
  buildRecordFromBytes(
    request: RecordBuilderFromBytesRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: RecordBuilderResponse
    ) => void
  ): ClientUnaryCall;
  buildRecordFromBytes(
    request: RecordBuilderFromBytesRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: RecordBuilderResponse
    ) => void
  ): ClientUnaryCall;
  buildRecordFromRecord(
    request: RecordBuilderFromRecordRequest,
    callback: (
      error: ServiceError | null,
      response: RecordBuilderResponse
    ) => void
  ): ClientUnaryCall;
  buildRecordFromRecord(
    request: RecordBuilderFromRecordRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: RecordBuilderResponse
    ) => void
  ): ClientUnaryCall;
  buildRecordFromRecord(
    request: RecordBuilderFromRecordRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: RecordBuilderResponse
    ) => void
  ): ClientUnaryCall;
  getHash(
    request: Record,
    callback: (error: ServiceError | null, response: RecordHash) => void
  ): ClientUnaryCall;
  getHash(
    request: Record,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: RecordHash) => void
  ): ClientUnaryCall;
  getHash(
    request: Record,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: RecordHash) => void
  ): ClientUnaryCall;
}

export const RecordServiceClient = makeGenericClientConstructor(
  RecordServiceService,
  "bloock.RecordService"
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>
  ): RecordServiceClient;
  service: typeof RecordServiceService;
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
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
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
    };

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
