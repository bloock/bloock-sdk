/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { ConfigData } from "./config";
import { Error } from "./shared";

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

export enum DataAvailabilityType {
  HOSTED = 0,
  IPFS = 1,
  UNRECOGNIZED = -1,
}

export function dataAvailabilityTypeFromJSON(object: any): DataAvailabilityType {
  switch (object) {
    case 0:
    case "HOSTED":
      return DataAvailabilityType.HOSTED;
    case 1:
    case "IPFS":
      return DataAvailabilityType.IPFS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DataAvailabilityType.UNRECOGNIZED;
  }
}

export function dataAvailabilityTypeToJSON(object: DataAvailabilityType): string {
  switch (object) {
    case DataAvailabilityType.HOSTED:
      return "HOSTED";
    case DataAvailabilityType.IPFS:
      return "IPFS";
    case DataAvailabilityType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface GenerateKeysRequest {
  configData?: ConfigData;
}

export interface GenerateKeysResponse {
  privateKey: string;
  publicKey: string;
  error?: Error | undefined;
}

export interface GenerateRsaKeyPairRequest {
  configData?: ConfigData;
}

export interface GenerateRsaKeyPairResponse {
  privateKey: string;
  publicKey: string;
  error?: Error | undefined;
}

export interface GenerateEciesKeyPairRequest {
  configData?: ConfigData;
}

export interface GenerateEciesKeyPairResponse {
  privateKey: string;
  publicKey: string;
  error?: Error | undefined;
}

export interface RecordHash {
  hash: string;
  error?: Error | undefined;
}

export interface RecordSignatures {
  signatures: Signature[];
  error?: Error | undefined;
}

export interface RecordHeader {
  ty: string;
}

export interface Record {
  configData?: ConfigData | undefined;
  payload: Uint8Array;
}

export interface Signer {
  alg: SignerAlg;
  args?: SignerArgs;
}

export interface SignerArgs {
  privateKey?: string | undefined;
  commonName?: string | undefined;
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

export interface Signature {
  signature: string;
  protected: string;
  header?: SignatureHeader;
}

export interface SignatureHeader {
  alg: string;
  kid: string;
}

export interface RecordReceipt {
  anchor: number;
  client: string;
  record: string;
  status: string;
}

export interface RecordBuilderFromStringRequest {
  configData?: ConfigData;
  payload: string;
  signer?: Signer | undefined;
  encrypter?: Encrypter | undefined;
  decrypter?: Decrypter | undefined;
}

export interface RecordBuilderFromHexRequest {
  configData?: ConfigData;
  payload: string;
  signer?: Signer | undefined;
  encrypter?: Encrypter | undefined;
  decrypter?: Decrypter | undefined;
}

export interface RecordBuilderFromJSONRequest {
  configData?: ConfigData;
  payload: string;
  signer?: Signer | undefined;
  encrypter?: Encrypter | undefined;
  decrypter?: Decrypter | undefined;
}

export interface RecordBuilderFromBytesRequest {
  configData?: ConfigData;
  payload: Uint8Array;
  signer?: Signer | undefined;
  encrypter?: Encrypter | undefined;
  decrypter?: Decrypter | undefined;
}

export interface RecordBuilderFromFileRequest {
  configData?: ConfigData;
  payload: Uint8Array;
  signer?: Signer | undefined;
  encrypter?: Encrypter | undefined;
  decrypter?: Decrypter | undefined;
}

export interface RecordBuilderFromRecordRequest {
  configData?: ConfigData;
  payload?: Record;
  signer?: Signer | undefined;
  encrypter?: Encrypter | undefined;
  decrypter?: Decrypter | undefined;
}

export interface RecordBuilderResponse {
  record?: Record;
  error?: Error | undefined;
}

export interface SendRecordsRequest {
  configData?: ConfigData;
  records: Record[];
}

export interface SendRecordsResponse {
  records: RecordReceipt[];
  error?: Error | undefined;
}

export interface Loader {
  type: DataAvailabilityType;
  args?: LoaderArgs;
}

export interface LoaderArgs {
  hash: string;
}

export interface RecordBuilderFromLoaderRequest {
  configData?: ConfigData;
  loader?: Loader;
  signer?: Signer | undefined;
  encrypter?: Encrypter | undefined;
  decrypter?: Decrypter | undefined;
}

export interface Publisher {
  type: DataAvailabilityType;
  args?: PublisherArgs;
}

export interface PublisherArgs {
}

export interface PublishRequest {
  configData?: ConfigData;
  publisher?: Publisher;
  record?: Record;
}

export interface PublishResponse {
  hash: string;
  error?: Error | undefined;
}

export interface SignatureCommonNameRequest {
  configData?: ConfigData;
  signature?: Signature;
}

export interface SignatureCommonNameResponse {
  commonName: string;
  error?: Error | undefined;
}

function createBaseGenerateKeysRequest(): GenerateKeysRequest {
  return { configData: undefined };
}

export const GenerateKeysRequest = {
  encode(message: GenerateKeysRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateKeysRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateKeysRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenerateKeysRequest {
    return { configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined };
  },

  toJSON(message: GenerateKeysRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenerateKeysRequest>, I>>(object: I): GenerateKeysRequest {
    const message = createBaseGenerateKeysRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    return message;
  },
};

function createBaseGenerateKeysResponse(): GenerateKeysResponse {
  return { privateKey: "", publicKey: "", error: undefined };
}

export const GenerateKeysResponse = {
  encode(message: GenerateKeysResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.privateKey !== "") {
      writer.uint32(10).string(message.privateKey);
    }
    if (message.publicKey !== "") {
      writer.uint32(18).string(message.publicKey);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateKeysResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateKeysResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.privateKey = reader.string();
          break;
        case 2:
          message.publicKey = reader.string();
          break;
        case 3:
          message.error = Error.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenerateKeysResponse {
    return {
      privateKey: isSet(object.privateKey) ? String(object.privateKey) : "",
      publicKey: isSet(object.publicKey) ? String(object.publicKey) : "",
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GenerateKeysResponse): unknown {
    const obj: any = {};
    message.privateKey !== undefined && (obj.privateKey = message.privateKey);
    message.publicKey !== undefined && (obj.publicKey = message.publicKey);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenerateKeysResponse>, I>>(object: I): GenerateKeysResponse {
    const message = createBaseGenerateKeysResponse();
    message.privateKey = object.privateKey ?? "";
    message.publicKey = object.publicKey ?? "";
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseGenerateRsaKeyPairRequest(): GenerateRsaKeyPairRequest {
  return { configData: undefined };
}

export const GenerateRsaKeyPairRequest = {
  encode(message: GenerateRsaKeyPairRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateRsaKeyPairRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateRsaKeyPairRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenerateRsaKeyPairRequest {
    return { configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined };
  },

  toJSON(message: GenerateRsaKeyPairRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenerateRsaKeyPairRequest>, I>>(object: I): GenerateRsaKeyPairRequest {
    const message = createBaseGenerateRsaKeyPairRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    return message;
  },
};

function createBaseGenerateRsaKeyPairResponse(): GenerateRsaKeyPairResponse {
  return { privateKey: "", publicKey: "", error: undefined };
}

export const GenerateRsaKeyPairResponse = {
  encode(message: GenerateRsaKeyPairResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.privateKey !== "") {
      writer.uint32(10).string(message.privateKey);
    }
    if (message.publicKey !== "") {
      writer.uint32(18).string(message.publicKey);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateRsaKeyPairResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateRsaKeyPairResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.privateKey = reader.string();
          break;
        case 2:
          message.publicKey = reader.string();
          break;
        case 3:
          message.error = Error.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenerateRsaKeyPairResponse {
    return {
      privateKey: isSet(object.privateKey) ? String(object.privateKey) : "",
      publicKey: isSet(object.publicKey) ? String(object.publicKey) : "",
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GenerateRsaKeyPairResponse): unknown {
    const obj: any = {};
    message.privateKey !== undefined && (obj.privateKey = message.privateKey);
    message.publicKey !== undefined && (obj.publicKey = message.publicKey);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenerateRsaKeyPairResponse>, I>>(object: I): GenerateRsaKeyPairResponse {
    const message = createBaseGenerateRsaKeyPairResponse();
    message.privateKey = object.privateKey ?? "";
    message.publicKey = object.publicKey ?? "";
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseGenerateEciesKeyPairRequest(): GenerateEciesKeyPairRequest {
  return { configData: undefined };
}

export const GenerateEciesKeyPairRequest = {
  encode(message: GenerateEciesKeyPairRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateEciesKeyPairRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateEciesKeyPairRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenerateEciesKeyPairRequest {
    return { configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined };
  },

  toJSON(message: GenerateEciesKeyPairRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenerateEciesKeyPairRequest>, I>>(object: I): GenerateEciesKeyPairRequest {
    const message = createBaseGenerateEciesKeyPairRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    return message;
  },
};

function createBaseGenerateEciesKeyPairResponse(): GenerateEciesKeyPairResponse {
  return { privateKey: "", publicKey: "", error: undefined };
}

export const GenerateEciesKeyPairResponse = {
  encode(message: GenerateEciesKeyPairResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.privateKey !== "") {
      writer.uint32(10).string(message.privateKey);
    }
    if (message.publicKey !== "") {
      writer.uint32(18).string(message.publicKey);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateEciesKeyPairResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateEciesKeyPairResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.privateKey = reader.string();
          break;
        case 2:
          message.publicKey = reader.string();
          break;
        case 3:
          message.error = Error.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenerateEciesKeyPairResponse {
    return {
      privateKey: isSet(object.privateKey) ? String(object.privateKey) : "",
      publicKey: isSet(object.publicKey) ? String(object.publicKey) : "",
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GenerateEciesKeyPairResponse): unknown {
    const obj: any = {};
    message.privateKey !== undefined && (obj.privateKey = message.privateKey);
    message.publicKey !== undefined && (obj.publicKey = message.publicKey);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenerateEciesKeyPairResponse>, I>>(object: I): GenerateEciesKeyPairResponse {
    const message = createBaseGenerateEciesKeyPairResponse();
    message.privateKey = object.privateKey ?? "";
    message.publicKey = object.publicKey ?? "";
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseRecordHash(): RecordHash {
  return { hash: "", error: undefined };
}

export const RecordHash = {
  encode(message: RecordHash, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordHash>, I>>(object: I): RecordHash {
    const message = createBaseRecordHash();
    message.hash = object.hash ?? "";
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseRecordSignatures(): RecordSignatures {
  return { signatures: [], error: undefined };
}

export const RecordSignatures = {
  encode(message: RecordSignatures, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.signatures) {
      Signature.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordSignatures {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordSignatures();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.signatures.push(Signature.decode(reader, reader.uint32()));
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

  fromJSON(object: any): RecordSignatures {
    return {
      signatures: Array.isArray(object?.signatures) ? object.signatures.map((e: any) => Signature.fromJSON(e)) : [],
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: RecordSignatures): unknown {
    const obj: any = {};
    if (message.signatures) {
      obj.signatures = message.signatures.map((e) => e ? Signature.toJSON(e) : undefined);
    } else {
      obj.signatures = [];
    }
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordSignatures>, I>>(object: I): RecordSignatures {
    const message = createBaseRecordSignatures();
    message.signatures = object.signatures?.map((e) => Signature.fromPartial(e)) || [];
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

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
  return { configData: undefined, payload: new Uint8Array() };
}

export const Record = {
  encode(message: Record, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.payload.length !== 0) {
      writer.uint32(18).bytes(message.payload);
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
    };
  },

  toJSON(message: Record): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.payload !== undefined &&
      (obj.payload = base64FromBytes(message.payload !== undefined ? message.payload : new Uint8Array()));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Record>, I>>(object: I): Record {
    const message = createBaseRecord();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.payload = object.payload ?? new Uint8Array();
    return message;
  },
};

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

function createBaseSignature(): Signature {
  return { signature: "", protected: "", header: undefined };
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
      header: isSet(object.header) ? SignatureHeader.fromJSON(object.header) : undefined,
    };
  },

  toJSON(message: Signature): unknown {
    const obj: any = {};
    message.signature !== undefined && (obj.signature = message.signature);
    message.protected !== undefined && (obj.protected = message.protected);
    message.header !== undefined && (obj.header = message.header ? SignatureHeader.toJSON(message.header) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Signature>, I>>(object: I): Signature {
    const message = createBaseSignature();
    message.signature = object.signature ?? "";
    message.protected = object.protected ?? "";
    message.header = (object.header !== undefined && object.header !== null)
      ? SignatureHeader.fromPartial(object.header)
      : undefined;
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

function createBaseRecordReceipt(): RecordReceipt {
  return { anchor: 0, client: "", record: "", status: "" };
}

export const RecordReceipt = {
  encode(message: RecordReceipt, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  fromPartial<I extends Exact<DeepPartial<RecordReceipt>, I>>(object: I): RecordReceipt {
    const message = createBaseRecordReceipt();
    message.anchor = object.anchor ?? 0;
    message.client = object.client ?? "";
    message.record = object.record ?? "";
    message.status = object.status ?? "";
    return message;
  },
};

function createBaseRecordBuilderFromStringRequest(): RecordBuilderFromStringRequest {
  return { configData: undefined, payload: "", signer: undefined, encrypter: undefined, decrypter: undefined };
}

export const RecordBuilderFromStringRequest = {
  encode(message: RecordBuilderFromStringRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.payload !== "") {
      writer.uint32(18).string(message.payload);
    }
    if (message.signer !== undefined) {
      Signer.encode(message.signer, writer.uint32(26).fork()).ldelim();
    }
    if (message.encrypter !== undefined) {
      Encrypter.encode(message.encrypter, writer.uint32(34).fork()).ldelim();
    }
    if (message.decrypter !== undefined) {
      Decrypter.encode(message.decrypter, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordBuilderFromStringRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordBuilderFromStringRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.payload = reader.string();
          break;
        case 3:
          message.signer = Signer.decode(reader, reader.uint32());
          break;
        case 4:
          message.encrypter = Encrypter.decode(reader, reader.uint32());
          break;
        case 5:
          message.decrypter = Decrypter.decode(reader, reader.uint32());
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
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      payload: isSet(object.payload) ? String(object.payload) : "",
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
      encrypter: isSet(object.encrypter) ? Encrypter.fromJSON(object.encrypter) : undefined,
      decrypter: isSet(object.decrypter) ? Decrypter.fromJSON(object.decrypter) : undefined,
    };
  },

  toJSON(message: RecordBuilderFromStringRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.payload !== undefined && (obj.payload = message.payload);
    message.signer !== undefined && (obj.signer = message.signer ? Signer.toJSON(message.signer) : undefined);
    message.encrypter !== undefined &&
      (obj.encrypter = message.encrypter ? Encrypter.toJSON(message.encrypter) : undefined);
    message.decrypter !== undefined &&
      (obj.decrypter = message.decrypter ? Decrypter.toJSON(message.decrypter) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordBuilderFromStringRequest>, I>>(
    object: I,
  ): RecordBuilderFromStringRequest {
    const message = createBaseRecordBuilderFromStringRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.payload = object.payload ?? "";
    message.signer = (object.signer !== undefined && object.signer !== null)
      ? Signer.fromPartial(object.signer)
      : undefined;
    message.encrypter = (object.encrypter !== undefined && object.encrypter !== null)
      ? Encrypter.fromPartial(object.encrypter)
      : undefined;
    message.decrypter = (object.decrypter !== undefined && object.decrypter !== null)
      ? Decrypter.fromPartial(object.decrypter)
      : undefined;
    return message;
  },
};

function createBaseRecordBuilderFromHexRequest(): RecordBuilderFromHexRequest {
  return { configData: undefined, payload: "", signer: undefined, encrypter: undefined, decrypter: undefined };
}

export const RecordBuilderFromHexRequest = {
  encode(message: RecordBuilderFromHexRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.payload !== "") {
      writer.uint32(18).string(message.payload);
    }
    if (message.signer !== undefined) {
      Signer.encode(message.signer, writer.uint32(26).fork()).ldelim();
    }
    if (message.encrypter !== undefined) {
      Encrypter.encode(message.encrypter, writer.uint32(34).fork()).ldelim();
    }
    if (message.decrypter !== undefined) {
      Decrypter.encode(message.decrypter, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordBuilderFromHexRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordBuilderFromHexRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.payload = reader.string();
          break;
        case 3:
          message.signer = Signer.decode(reader, reader.uint32());
          break;
        case 4:
          message.encrypter = Encrypter.decode(reader, reader.uint32());
          break;
        case 5:
          message.decrypter = Decrypter.decode(reader, reader.uint32());
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
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      payload: isSet(object.payload) ? String(object.payload) : "",
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
      encrypter: isSet(object.encrypter) ? Encrypter.fromJSON(object.encrypter) : undefined,
      decrypter: isSet(object.decrypter) ? Decrypter.fromJSON(object.decrypter) : undefined,
    };
  },

  toJSON(message: RecordBuilderFromHexRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.payload !== undefined && (obj.payload = message.payload);
    message.signer !== undefined && (obj.signer = message.signer ? Signer.toJSON(message.signer) : undefined);
    message.encrypter !== undefined &&
      (obj.encrypter = message.encrypter ? Encrypter.toJSON(message.encrypter) : undefined);
    message.decrypter !== undefined &&
      (obj.decrypter = message.decrypter ? Decrypter.toJSON(message.decrypter) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordBuilderFromHexRequest>, I>>(object: I): RecordBuilderFromHexRequest {
    const message = createBaseRecordBuilderFromHexRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.payload = object.payload ?? "";
    message.signer = (object.signer !== undefined && object.signer !== null)
      ? Signer.fromPartial(object.signer)
      : undefined;
    message.encrypter = (object.encrypter !== undefined && object.encrypter !== null)
      ? Encrypter.fromPartial(object.encrypter)
      : undefined;
    message.decrypter = (object.decrypter !== undefined && object.decrypter !== null)
      ? Decrypter.fromPartial(object.decrypter)
      : undefined;
    return message;
  },
};

function createBaseRecordBuilderFromJSONRequest(): RecordBuilderFromJSONRequest {
  return { configData: undefined, payload: "", signer: undefined, encrypter: undefined, decrypter: undefined };
}

export const RecordBuilderFromJSONRequest = {
  encode(message: RecordBuilderFromJSONRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.payload !== "") {
      writer.uint32(18).string(message.payload);
    }
    if (message.signer !== undefined) {
      Signer.encode(message.signer, writer.uint32(26).fork()).ldelim();
    }
    if (message.encrypter !== undefined) {
      Encrypter.encode(message.encrypter, writer.uint32(34).fork()).ldelim();
    }
    if (message.decrypter !== undefined) {
      Decrypter.encode(message.decrypter, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordBuilderFromJSONRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordBuilderFromJSONRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.payload = reader.string();
          break;
        case 3:
          message.signer = Signer.decode(reader, reader.uint32());
          break;
        case 4:
          message.encrypter = Encrypter.decode(reader, reader.uint32());
          break;
        case 5:
          message.decrypter = Decrypter.decode(reader, reader.uint32());
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
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      payload: isSet(object.payload) ? String(object.payload) : "",
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
      encrypter: isSet(object.encrypter) ? Encrypter.fromJSON(object.encrypter) : undefined,
      decrypter: isSet(object.decrypter) ? Decrypter.fromJSON(object.decrypter) : undefined,
    };
  },

  toJSON(message: RecordBuilderFromJSONRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.payload !== undefined && (obj.payload = message.payload);
    message.signer !== undefined && (obj.signer = message.signer ? Signer.toJSON(message.signer) : undefined);
    message.encrypter !== undefined &&
      (obj.encrypter = message.encrypter ? Encrypter.toJSON(message.encrypter) : undefined);
    message.decrypter !== undefined &&
      (obj.decrypter = message.decrypter ? Decrypter.toJSON(message.decrypter) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordBuilderFromJSONRequest>, I>>(object: I): RecordBuilderFromJSONRequest {
    const message = createBaseRecordBuilderFromJSONRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.payload = object.payload ?? "";
    message.signer = (object.signer !== undefined && object.signer !== null)
      ? Signer.fromPartial(object.signer)
      : undefined;
    message.encrypter = (object.encrypter !== undefined && object.encrypter !== null)
      ? Encrypter.fromPartial(object.encrypter)
      : undefined;
    message.decrypter = (object.decrypter !== undefined && object.decrypter !== null)
      ? Decrypter.fromPartial(object.decrypter)
      : undefined;
    return message;
  },
};

function createBaseRecordBuilderFromBytesRequest(): RecordBuilderFromBytesRequest {
  return {
    configData: undefined,
    payload: new Uint8Array(),
    signer: undefined,
    encrypter: undefined,
    decrypter: undefined,
  };
}

export const RecordBuilderFromBytesRequest = {
  encode(message: RecordBuilderFromBytesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.payload.length !== 0) {
      writer.uint32(18).bytes(message.payload);
    }
    if (message.signer !== undefined) {
      Signer.encode(message.signer, writer.uint32(26).fork()).ldelim();
    }
    if (message.encrypter !== undefined) {
      Encrypter.encode(message.encrypter, writer.uint32(34).fork()).ldelim();
    }
    if (message.decrypter !== undefined) {
      Decrypter.encode(message.decrypter, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordBuilderFromBytesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordBuilderFromBytesRequest();
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
          message.signer = Signer.decode(reader, reader.uint32());
          break;
        case 4:
          message.encrypter = Encrypter.decode(reader, reader.uint32());
          break;
        case 5:
          message.decrypter = Decrypter.decode(reader, reader.uint32());
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
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      payload: isSet(object.payload) ? bytesFromBase64(object.payload) : new Uint8Array(),
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
      encrypter: isSet(object.encrypter) ? Encrypter.fromJSON(object.encrypter) : undefined,
      decrypter: isSet(object.decrypter) ? Decrypter.fromJSON(object.decrypter) : undefined,
    };
  },

  toJSON(message: RecordBuilderFromBytesRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.payload !== undefined &&
      (obj.payload = base64FromBytes(message.payload !== undefined ? message.payload : new Uint8Array()));
    message.signer !== undefined && (obj.signer = message.signer ? Signer.toJSON(message.signer) : undefined);
    message.encrypter !== undefined &&
      (obj.encrypter = message.encrypter ? Encrypter.toJSON(message.encrypter) : undefined);
    message.decrypter !== undefined &&
      (obj.decrypter = message.decrypter ? Decrypter.toJSON(message.decrypter) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordBuilderFromBytesRequest>, I>>(
    object: I,
  ): RecordBuilderFromBytesRequest {
    const message = createBaseRecordBuilderFromBytesRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.payload = object.payload ?? new Uint8Array();
    message.signer = (object.signer !== undefined && object.signer !== null)
      ? Signer.fromPartial(object.signer)
      : undefined;
    message.encrypter = (object.encrypter !== undefined && object.encrypter !== null)
      ? Encrypter.fromPartial(object.encrypter)
      : undefined;
    message.decrypter = (object.decrypter !== undefined && object.decrypter !== null)
      ? Decrypter.fromPartial(object.decrypter)
      : undefined;
    return message;
  },
};

function createBaseRecordBuilderFromFileRequest(): RecordBuilderFromFileRequest {
  return {
    configData: undefined,
    payload: new Uint8Array(),
    signer: undefined,
    encrypter: undefined,
    decrypter: undefined,
  };
}

export const RecordBuilderFromFileRequest = {
  encode(message: RecordBuilderFromFileRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.payload.length !== 0) {
      writer.uint32(18).bytes(message.payload);
    }
    if (message.signer !== undefined) {
      Signer.encode(message.signer, writer.uint32(26).fork()).ldelim();
    }
    if (message.encrypter !== undefined) {
      Encrypter.encode(message.encrypter, writer.uint32(34).fork()).ldelim();
    }
    if (message.decrypter !== undefined) {
      Decrypter.encode(message.decrypter, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordBuilderFromFileRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordBuilderFromFileRequest();
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
          message.signer = Signer.decode(reader, reader.uint32());
          break;
        case 4:
          message.encrypter = Encrypter.decode(reader, reader.uint32());
          break;
        case 5:
          message.decrypter = Decrypter.decode(reader, reader.uint32());
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
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      payload: isSet(object.payload) ? bytesFromBase64(object.payload) : new Uint8Array(),
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
      encrypter: isSet(object.encrypter) ? Encrypter.fromJSON(object.encrypter) : undefined,
      decrypter: isSet(object.decrypter) ? Decrypter.fromJSON(object.decrypter) : undefined,
    };
  },

  toJSON(message: RecordBuilderFromFileRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.payload !== undefined &&
      (obj.payload = base64FromBytes(message.payload !== undefined ? message.payload : new Uint8Array()));
    message.signer !== undefined && (obj.signer = message.signer ? Signer.toJSON(message.signer) : undefined);
    message.encrypter !== undefined &&
      (obj.encrypter = message.encrypter ? Encrypter.toJSON(message.encrypter) : undefined);
    message.decrypter !== undefined &&
      (obj.decrypter = message.decrypter ? Decrypter.toJSON(message.decrypter) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordBuilderFromFileRequest>, I>>(object: I): RecordBuilderFromFileRequest {
    const message = createBaseRecordBuilderFromFileRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.payload = object.payload ?? new Uint8Array();
    message.signer = (object.signer !== undefined && object.signer !== null)
      ? Signer.fromPartial(object.signer)
      : undefined;
    message.encrypter = (object.encrypter !== undefined && object.encrypter !== null)
      ? Encrypter.fromPartial(object.encrypter)
      : undefined;
    message.decrypter = (object.decrypter !== undefined && object.decrypter !== null)
      ? Decrypter.fromPartial(object.decrypter)
      : undefined;
    return message;
  },
};

function createBaseRecordBuilderFromRecordRequest(): RecordBuilderFromRecordRequest {
  return { configData: undefined, payload: undefined, signer: undefined, encrypter: undefined, decrypter: undefined };
}

export const RecordBuilderFromRecordRequest = {
  encode(message: RecordBuilderFromRecordRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.payload !== undefined) {
      Record.encode(message.payload, writer.uint32(18).fork()).ldelim();
    }
    if (message.signer !== undefined) {
      Signer.encode(message.signer, writer.uint32(26).fork()).ldelim();
    }
    if (message.encrypter !== undefined) {
      Encrypter.encode(message.encrypter, writer.uint32(34).fork()).ldelim();
    }
    if (message.decrypter !== undefined) {
      Decrypter.encode(message.decrypter, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordBuilderFromRecordRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordBuilderFromRecordRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.payload = Record.decode(reader, reader.uint32());
          break;
        case 3:
          message.signer = Signer.decode(reader, reader.uint32());
          break;
        case 4:
          message.encrypter = Encrypter.decode(reader, reader.uint32());
          break;
        case 5:
          message.decrypter = Decrypter.decode(reader, reader.uint32());
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
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      payload: isSet(object.payload) ? Record.fromJSON(object.payload) : undefined,
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
      encrypter: isSet(object.encrypter) ? Encrypter.fromJSON(object.encrypter) : undefined,
      decrypter: isSet(object.decrypter) ? Decrypter.fromJSON(object.decrypter) : undefined,
    };
  },

  toJSON(message: RecordBuilderFromRecordRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.payload !== undefined && (obj.payload = message.payload ? Record.toJSON(message.payload) : undefined);
    message.signer !== undefined && (obj.signer = message.signer ? Signer.toJSON(message.signer) : undefined);
    message.encrypter !== undefined &&
      (obj.encrypter = message.encrypter ? Encrypter.toJSON(message.encrypter) : undefined);
    message.decrypter !== undefined &&
      (obj.decrypter = message.decrypter ? Decrypter.toJSON(message.decrypter) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordBuilderFromRecordRequest>, I>>(
    object: I,
  ): RecordBuilderFromRecordRequest {
    const message = createBaseRecordBuilderFromRecordRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.payload = (object.payload !== undefined && object.payload !== null)
      ? Record.fromPartial(object.payload)
      : undefined;
    message.signer = (object.signer !== undefined && object.signer !== null)
      ? Signer.fromPartial(object.signer)
      : undefined;
    message.encrypter = (object.encrypter !== undefined && object.encrypter !== null)
      ? Encrypter.fromPartial(object.encrypter)
      : undefined;
    message.decrypter = (object.decrypter !== undefined && object.decrypter !== null)
      ? Decrypter.fromPartial(object.decrypter)
      : undefined;
    return message;
  },
};

function createBaseRecordBuilderResponse(): RecordBuilderResponse {
  return { record: undefined, error: undefined };
}

export const RecordBuilderResponse = {
  encode(message: RecordBuilderResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.record !== undefined) {
      Record.encode(message.record, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordBuilderResponse {
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
    message.record !== undefined && (obj.record = message.record ? Record.toJSON(message.record) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordBuilderResponse>, I>>(object: I): RecordBuilderResponse {
    const message = createBaseRecordBuilderResponse();
    message.record = (object.record !== undefined && object.record !== null)
      ? Record.fromPartial(object.record)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseSendRecordsRequest(): SendRecordsRequest {
  return { configData: undefined, records: [] };
}

export const SendRecordsRequest = {
  encode(message: SendRecordsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.records) {
      Record.encode(v!, writer.uint32(18).fork()).ldelim();
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
          message.records.push(Record.decode(reader, reader.uint32()));
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
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      records: Array.isArray(object?.records) ? object.records.map((e: any) => Record.fromJSON(e)) : [],
    };
  },

  toJSON(message: SendRecordsRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    if (message.records) {
      obj.records = message.records.map((e) => e ? Record.toJSON(e) : undefined);
    } else {
      obj.records = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SendRecordsRequest>, I>>(object: I): SendRecordsRequest {
    const message = createBaseSendRecordsRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.records = object.records?.map((e) => Record.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSendRecordsResponse(): SendRecordsResponse {
  return { records: [], error: undefined };
}

export const SendRecordsResponse = {
  encode(message: SendRecordsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
      records: Array.isArray(object?.records) ? object.records.map((e: any) => RecordReceipt.fromJSON(e)) : [],
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: SendRecordsResponse): unknown {
    const obj: any = {};
    if (message.records) {
      obj.records = message.records.map((e) => e ? RecordReceipt.toJSON(e) : undefined);
    } else {
      obj.records = [];
    }
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SendRecordsResponse>, I>>(object: I): SendRecordsResponse {
    const message = createBaseSendRecordsResponse();
    message.records = object.records?.map((e) => RecordReceipt.fromPartial(e)) || [];
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseLoader(): Loader {
  return { type: 0, args: undefined };
}

export const Loader = {
  encode(message: Loader, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.args !== undefined) {
      LoaderArgs.encode(message.args, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Loader {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.args = LoaderArgs.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Loader {
    return {
      type: isSet(object.type) ? dataAvailabilityTypeFromJSON(object.type) : 0,
      args: isSet(object.args) ? LoaderArgs.fromJSON(object.args) : undefined,
    };
  },

  toJSON(message: Loader): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = dataAvailabilityTypeToJSON(message.type));
    message.args !== undefined && (obj.args = message.args ? LoaderArgs.toJSON(message.args) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Loader>, I>>(object: I): Loader {
    const message = createBaseLoader();
    message.type = object.type ?? 0;
    message.args = (object.args !== undefined && object.args !== null)
      ? LoaderArgs.fromPartial(object.args)
      : undefined;
    return message;
  },
};

function createBaseLoaderArgs(): LoaderArgs {
  return { hash: "" };
}

export const LoaderArgs = {
  encode(message: LoaderArgs, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hash !== "") {
      writer.uint32(10).string(message.hash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoaderArgs {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoaderArgs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LoaderArgs {
    return { hash: isSet(object.hash) ? String(object.hash) : "" };
  },

  toJSON(message: LoaderArgs): unknown {
    const obj: any = {};
    message.hash !== undefined && (obj.hash = message.hash);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LoaderArgs>, I>>(object: I): LoaderArgs {
    const message = createBaseLoaderArgs();
    message.hash = object.hash ?? "";
    return message;
  },
};

function createBaseRecordBuilderFromLoaderRequest(): RecordBuilderFromLoaderRequest {
  return { configData: undefined, loader: undefined, signer: undefined, encrypter: undefined, decrypter: undefined };
}

export const RecordBuilderFromLoaderRequest = {
  encode(message: RecordBuilderFromLoaderRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.loader !== undefined) {
      Loader.encode(message.loader, writer.uint32(18).fork()).ldelim();
    }
    if (message.signer !== undefined) {
      Signer.encode(message.signer, writer.uint32(26).fork()).ldelim();
    }
    if (message.encrypter !== undefined) {
      Encrypter.encode(message.encrypter, writer.uint32(34).fork()).ldelim();
    }
    if (message.decrypter !== undefined) {
      Decrypter.encode(message.decrypter, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordBuilderFromLoaderRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordBuilderFromLoaderRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.loader = Loader.decode(reader, reader.uint32());
          break;
        case 3:
          message.signer = Signer.decode(reader, reader.uint32());
          break;
        case 4:
          message.encrypter = Encrypter.decode(reader, reader.uint32());
          break;
        case 5:
          message.decrypter = Decrypter.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordBuilderFromLoaderRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      loader: isSet(object.loader) ? Loader.fromJSON(object.loader) : undefined,
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
      encrypter: isSet(object.encrypter) ? Encrypter.fromJSON(object.encrypter) : undefined,
      decrypter: isSet(object.decrypter) ? Decrypter.fromJSON(object.decrypter) : undefined,
    };
  },

  toJSON(message: RecordBuilderFromLoaderRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.loader !== undefined && (obj.loader = message.loader ? Loader.toJSON(message.loader) : undefined);
    message.signer !== undefined && (obj.signer = message.signer ? Signer.toJSON(message.signer) : undefined);
    message.encrypter !== undefined &&
      (obj.encrypter = message.encrypter ? Encrypter.toJSON(message.encrypter) : undefined);
    message.decrypter !== undefined &&
      (obj.decrypter = message.decrypter ? Decrypter.toJSON(message.decrypter) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordBuilderFromLoaderRequest>, I>>(
    object: I,
  ): RecordBuilderFromLoaderRequest {
    const message = createBaseRecordBuilderFromLoaderRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.loader = (object.loader !== undefined && object.loader !== null)
      ? Loader.fromPartial(object.loader)
      : undefined;
    message.signer = (object.signer !== undefined && object.signer !== null)
      ? Signer.fromPartial(object.signer)
      : undefined;
    message.encrypter = (object.encrypter !== undefined && object.encrypter !== null)
      ? Encrypter.fromPartial(object.encrypter)
      : undefined;
    message.decrypter = (object.decrypter !== undefined && object.decrypter !== null)
      ? Decrypter.fromPartial(object.decrypter)
      : undefined;
    return message;
  },
};

function createBasePublisher(): Publisher {
  return { type: 0, args: undefined };
}

export const Publisher = {
  encode(message: Publisher, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.args !== undefined) {
      PublisherArgs.encode(message.args, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Publisher {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublisher();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.args = PublisherArgs.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Publisher {
    return {
      type: isSet(object.type) ? dataAvailabilityTypeFromJSON(object.type) : 0,
      args: isSet(object.args) ? PublisherArgs.fromJSON(object.args) : undefined,
    };
  },

  toJSON(message: Publisher): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = dataAvailabilityTypeToJSON(message.type));
    message.args !== undefined && (obj.args = message.args ? PublisherArgs.toJSON(message.args) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Publisher>, I>>(object: I): Publisher {
    const message = createBasePublisher();
    message.type = object.type ?? 0;
    message.args = (object.args !== undefined && object.args !== null)
      ? PublisherArgs.fromPartial(object.args)
      : undefined;
    return message;
  },
};

function createBasePublisherArgs(): PublisherArgs {
  return {};
}

export const PublisherArgs = {
  encode(_: PublisherArgs, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PublisherArgs {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublisherArgs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): PublisherArgs {
    return {};
  },

  toJSON(_: PublisherArgs): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PublisherArgs>, I>>(_: I): PublisherArgs {
    const message = createBasePublisherArgs();
    return message;
  },
};

function createBasePublishRequest(): PublishRequest {
  return { configData: undefined, publisher: undefined, record: undefined };
}

export const PublishRequest = {
  encode(message: PublishRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.publisher !== undefined) {
      Publisher.encode(message.publisher, writer.uint32(18).fork()).ldelim();
    }
    if (message.record !== undefined) {
      Record.encode(message.record, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PublishRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublishRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.publisher = Publisher.decode(reader, reader.uint32());
          break;
        case 3:
          message.record = Record.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PublishRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      publisher: isSet(object.publisher) ? Publisher.fromJSON(object.publisher) : undefined,
      record: isSet(object.record) ? Record.fromJSON(object.record) : undefined,
    };
  },

  toJSON(message: PublishRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.publisher !== undefined &&
      (obj.publisher = message.publisher ? Publisher.toJSON(message.publisher) : undefined);
    message.record !== undefined && (obj.record = message.record ? Record.toJSON(message.record) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PublishRequest>, I>>(object: I): PublishRequest {
    const message = createBasePublishRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.publisher = (object.publisher !== undefined && object.publisher !== null)
      ? Publisher.fromPartial(object.publisher)
      : undefined;
    message.record = (object.record !== undefined && object.record !== null)
      ? Record.fromPartial(object.record)
      : undefined;
    return message;
  },
};

function createBasePublishResponse(): PublishResponse {
  return { hash: "", error: undefined };
}

export const PublishResponse = {
  encode(message: PublishResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hash !== "") {
      writer.uint32(10).string(message.hash);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PublishResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublishResponse();
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

  fromJSON(object: any): PublishResponse {
    return {
      hash: isSet(object.hash) ? String(object.hash) : "",
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: PublishResponse): unknown {
    const obj: any = {};
    message.hash !== undefined && (obj.hash = message.hash);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PublishResponse>, I>>(object: I): PublishResponse {
    const message = createBasePublishResponse();
    message.hash = object.hash ?? "";
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseSignatureCommonNameRequest(): SignatureCommonNameRequest {
  return { configData: undefined, signature: undefined };
}

export const SignatureCommonNameRequest = {
  encode(message: SignatureCommonNameRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.signature !== undefined) {
      Signature.encode(message.signature, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignatureCommonNameRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignatureCommonNameRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.signature = Signature.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SignatureCommonNameRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      signature: isSet(object.signature) ? Signature.fromJSON(object.signature) : undefined,
    };
  },

  toJSON(message: SignatureCommonNameRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.signature !== undefined &&
      (obj.signature = message.signature ? Signature.toJSON(message.signature) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SignatureCommonNameRequest>, I>>(object: I): SignatureCommonNameRequest {
    const message = createBaseSignatureCommonNameRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.signature = (object.signature !== undefined && object.signature !== null)
      ? Signature.fromPartial(object.signature)
      : undefined;
    return message;
  },
};

function createBaseSignatureCommonNameResponse(): SignatureCommonNameResponse {
  return { commonName: "", error: undefined };
}

export const SignatureCommonNameResponse = {
  encode(message: SignatureCommonNameResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.commonName !== "") {
      writer.uint32(10).string(message.commonName);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignatureCommonNameResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignatureCommonNameResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.commonName = reader.string();
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

  fromJSON(object: any): SignatureCommonNameResponse {
    return {
      commonName: isSet(object.commonName) ? String(object.commonName) : "",
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: SignatureCommonNameResponse): unknown {
    const obj: any = {};
    message.commonName !== undefined && (obj.commonName = message.commonName);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SignatureCommonNameResponse>, I>>(object: I): SignatureCommonNameResponse {
    const message = createBaseSignatureCommonNameResponse();
    message.commonName = object.commonName ?? "";
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

export interface RecordService {
  SendRecords(request: SendRecordsRequest): Promise<SendRecordsResponse>;
  BuildRecordFromString(request: RecordBuilderFromStringRequest): Promise<RecordBuilderResponse>;
  BuildRecordFromHex(request: RecordBuilderFromHexRequest): Promise<RecordBuilderResponse>;
  BuildRecordFromJson(request: RecordBuilderFromJSONRequest): Promise<RecordBuilderResponse>;
  BuildRecordFromFile(request: RecordBuilderFromFileRequest): Promise<RecordBuilderResponse>;
  BuildRecordFromBytes(request: RecordBuilderFromBytesRequest): Promise<RecordBuilderResponse>;
  BuildRecordFromRecord(request: RecordBuilderFromRecordRequest): Promise<RecordBuilderResponse>;
  BuildRecordFromLoader(request: RecordBuilderFromLoaderRequest): Promise<RecordBuilderResponse>;
  GetHash(request: Record): Promise<RecordHash>;
  GetSignatureCommonName(request: SignatureCommonNameRequest): Promise<SignatureCommonNameResponse>;
  GetSignatures(request: Record): Promise<RecordSignatures>;
  GenerateKeys(request: GenerateKeysRequest): Promise<GenerateKeysResponse>;
  GenerateRsaKeyPair(request: GenerateRsaKeyPairRequest): Promise<GenerateRsaKeyPairResponse>;
  GenerateEciesKeyPair(request: GenerateEciesKeyPairRequest): Promise<GenerateEciesKeyPairResponse>;
  Publish(request: PublishRequest): Promise<PublishResponse>;
}

export class RecordServiceClientImpl implements RecordService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "bloock.RecordService";
    this.rpc = rpc;
    this.SendRecords = this.SendRecords.bind(this);
    this.BuildRecordFromString = this.BuildRecordFromString.bind(this);
    this.BuildRecordFromHex = this.BuildRecordFromHex.bind(this);
    this.BuildRecordFromJson = this.BuildRecordFromJson.bind(this);
    this.BuildRecordFromFile = this.BuildRecordFromFile.bind(this);
    this.BuildRecordFromBytes = this.BuildRecordFromBytes.bind(this);
    this.BuildRecordFromRecord = this.BuildRecordFromRecord.bind(this);
    this.BuildRecordFromLoader = this.BuildRecordFromLoader.bind(this);
    this.GetHash = this.GetHash.bind(this);
    this.GetSignatureCommonName = this.GetSignatureCommonName.bind(this);
    this.GetSignatures = this.GetSignatures.bind(this);
    this.GenerateKeys = this.GenerateKeys.bind(this);
    this.GenerateRsaKeyPair = this.GenerateRsaKeyPair.bind(this);
    this.GenerateEciesKeyPair = this.GenerateEciesKeyPair.bind(this);
    this.Publish = this.Publish.bind(this);
  }
  SendRecords(request: SendRecordsRequest): Promise<SendRecordsResponse> {
    const data = SendRecordsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SendRecords", data);
    return promise.then((data) => SendRecordsResponse.decode(new _m0.Reader(data)));
  }

  BuildRecordFromString(request: RecordBuilderFromStringRequest): Promise<RecordBuilderResponse> {
    const data = RecordBuilderFromStringRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "BuildRecordFromString", data);
    return promise.then((data) => RecordBuilderResponse.decode(new _m0.Reader(data)));
  }

  BuildRecordFromHex(request: RecordBuilderFromHexRequest): Promise<RecordBuilderResponse> {
    const data = RecordBuilderFromHexRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "BuildRecordFromHex", data);
    return promise.then((data) => RecordBuilderResponse.decode(new _m0.Reader(data)));
  }

  BuildRecordFromJson(request: RecordBuilderFromJSONRequest): Promise<RecordBuilderResponse> {
    const data = RecordBuilderFromJSONRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "BuildRecordFromJson", data);
    return promise.then((data) => RecordBuilderResponse.decode(new _m0.Reader(data)));
  }

  BuildRecordFromFile(request: RecordBuilderFromFileRequest): Promise<RecordBuilderResponse> {
    const data = RecordBuilderFromFileRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "BuildRecordFromFile", data);
    return promise.then((data) => RecordBuilderResponse.decode(new _m0.Reader(data)));
  }

  BuildRecordFromBytes(request: RecordBuilderFromBytesRequest): Promise<RecordBuilderResponse> {
    const data = RecordBuilderFromBytesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "BuildRecordFromBytes", data);
    return promise.then((data) => RecordBuilderResponse.decode(new _m0.Reader(data)));
  }

  BuildRecordFromRecord(request: RecordBuilderFromRecordRequest): Promise<RecordBuilderResponse> {
    const data = RecordBuilderFromRecordRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "BuildRecordFromRecord", data);
    return promise.then((data) => RecordBuilderResponse.decode(new _m0.Reader(data)));
  }

  BuildRecordFromLoader(request: RecordBuilderFromLoaderRequest): Promise<RecordBuilderResponse> {
    const data = RecordBuilderFromLoaderRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "BuildRecordFromLoader", data);
    return promise.then((data) => RecordBuilderResponse.decode(new _m0.Reader(data)));
  }

  GetHash(request: Record): Promise<RecordHash> {
    const data = Record.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetHash", data);
    return promise.then((data) => RecordHash.decode(new _m0.Reader(data)));
  }

  GetSignatureCommonName(request: SignatureCommonNameRequest): Promise<SignatureCommonNameResponse> {
    const data = SignatureCommonNameRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetSignatureCommonName", data);
    return promise.then((data) => SignatureCommonNameResponse.decode(new _m0.Reader(data)));
  }

  GetSignatures(request: Record): Promise<RecordSignatures> {
    const data = Record.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetSignatures", data);
    return promise.then((data) => RecordSignatures.decode(new _m0.Reader(data)));
  }

  GenerateKeys(request: GenerateKeysRequest): Promise<GenerateKeysResponse> {
    const data = GenerateKeysRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GenerateKeys", data);
    return promise.then((data) => GenerateKeysResponse.decode(new _m0.Reader(data)));
  }

  GenerateRsaKeyPair(request: GenerateRsaKeyPairRequest): Promise<GenerateRsaKeyPairResponse> {
    const data = GenerateRsaKeyPairRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GenerateRsaKeyPair", data);
    return promise.then((data) => GenerateRsaKeyPairResponse.decode(new _m0.Reader(data)));
  }

  GenerateEciesKeyPair(request: GenerateEciesKeyPairRequest): Promise<GenerateEciesKeyPairResponse> {
    const data = GenerateEciesKeyPairRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GenerateEciesKeyPair", data);
    return promise.then((data) => GenerateEciesKeyPairResponse.decode(new _m0.Reader(data)));
  }

  Publish(request: PublishRequest): Promise<PublishResponse> {
    const data = PublishRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Publish", data);
    return promise.then((data) => PublishResponse.decode(new _m0.Reader(data)));
  }
}

export type RecordServiceDefinition = typeof RecordServiceDefinition;
export const RecordServiceDefinition = {
  name: "RecordService",
  fullName: "bloock.RecordService",
  methods: {
    sendRecords: {
      name: "SendRecords",
      requestType: SendRecordsRequest,
      requestStream: false,
      responseType: SendRecordsResponse,
      responseStream: false,
      options: {},
    },
    buildRecordFromString: {
      name: "BuildRecordFromString",
      requestType: RecordBuilderFromStringRequest,
      requestStream: false,
      responseType: RecordBuilderResponse,
      responseStream: false,
      options: {},
    },
    buildRecordFromHex: {
      name: "BuildRecordFromHex",
      requestType: RecordBuilderFromHexRequest,
      requestStream: false,
      responseType: RecordBuilderResponse,
      responseStream: false,
      options: {},
    },
    buildRecordFromJson: {
      name: "BuildRecordFromJson",
      requestType: RecordBuilderFromJSONRequest,
      requestStream: false,
      responseType: RecordBuilderResponse,
      responseStream: false,
      options: {},
    },
    buildRecordFromFile: {
      name: "BuildRecordFromFile",
      requestType: RecordBuilderFromFileRequest,
      requestStream: false,
      responseType: RecordBuilderResponse,
      responseStream: false,
      options: {},
    },
    buildRecordFromBytes: {
      name: "BuildRecordFromBytes",
      requestType: RecordBuilderFromBytesRequest,
      requestStream: false,
      responseType: RecordBuilderResponse,
      responseStream: false,
      options: {},
    },
    buildRecordFromRecord: {
      name: "BuildRecordFromRecord",
      requestType: RecordBuilderFromRecordRequest,
      requestStream: false,
      responseType: RecordBuilderResponse,
      responseStream: false,
      options: {},
    },
    buildRecordFromLoader: {
      name: "BuildRecordFromLoader",
      requestType: RecordBuilderFromLoaderRequest,
      requestStream: false,
      responseType: RecordBuilderResponse,
      responseStream: false,
      options: {},
    },
    getHash: {
      name: "GetHash",
      requestType: Record,
      requestStream: false,
      responseType: RecordHash,
      responseStream: false,
      options: {},
    },
    getSignatureCommonName: {
      name: "GetSignatureCommonName",
      requestType: SignatureCommonNameRequest,
      requestStream: false,
      responseType: SignatureCommonNameResponse,
      responseStream: false,
      options: {},
    },
    getSignatures: {
      name: "GetSignatures",
      requestType: Record,
      requestStream: false,
      responseType: RecordSignatures,
      responseStream: false,
      options: {},
    },
    generateKeys: {
      name: "GenerateKeys",
      requestType: GenerateKeysRequest,
      requestStream: false,
      responseType: GenerateKeysResponse,
      responseStream: false,
      options: {},
    },
    generateRsaKeyPair: {
      name: "GenerateRsaKeyPair",
      requestType: GenerateRsaKeyPairRequest,
      requestStream: false,
      responseType: GenerateRsaKeyPairResponse,
      responseStream: false,
      options: {},
    },
    generateEciesKeyPair: {
      name: "GenerateEciesKeyPair",
      requestType: GenerateEciesKeyPairRequest,
      requestStream: false,
      responseType: GenerateEciesKeyPairResponse,
      responseStream: false,
      options: {},
    },
    publish: {
      name: "Publish",
      requestType: PublishRequest,
      requestStream: false,
      responseType: PublishResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
