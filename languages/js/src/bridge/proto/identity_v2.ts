/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Signer } from "./authenticity_entities";
import { ConfigData } from "./config";
import {
  BooleanAttributeDefinitionV2,
  BooleanAttributeV2,
  CredentialProofV2,
  CredentialReceiptV2,
  CredentialRevocationV2,
  CredentialV2,
  DateAttributeDefinitionV2,
  DateAttributeV2,
  DateTimeAttributeDefinitionV2,
  DateTimeAttributeV2,
  DecimalAttributeDefinitionV2,
  DecimalAttributeV2,
  DecimalEnumAttributeDefinitionV2,
  IntegerAttributeDefinitionV2,
  IntegerAttributeV2,
  IntegerEnumAttributeDefinitionV2,
  IssuerKey,
  IssuerParams,
  IssuerStateReceipt,
  ProofType,
  proofTypeFromJSON,
  proofTypeToJSON,
  SchemaV2,
  StringAttributeDefinitionV2,
  StringAttributeV2,
  StringEnumAttributeDefinitionV2,
} from "./identity_entities_v2";
import { Error } from "./shared";

export interface GetIssuerListRequest {
  configData?: ConfigData;
}

export interface GetIssuerListResponse {
  did: string[];
  error?: Error | undefined;
}

export interface GetIssuerByKeyResponse {
  did: string;
  error?: Error | undefined;
}

export interface GetCredentialProofRequest {
  configData?: ConfigData;
  issuerDid: string;
  credentialId: string;
}

export interface GetCredentialProofResponse {
  proof?: CredentialProofV2;
  error?: Error | undefined;
}

export interface CredentialToJsonRequestV2 {
  configData?: ConfigData;
  credential?: CredentialV2;
}

export interface CredentialToJsonResponseV2 {
  json: string;
  error?: Error | undefined;
}

export interface CredentialFromJsonRequestV2 {
  configData?: ConfigData;
  json: string;
}

export interface CredentialFromJsonResponseV2 {
  credential?: CredentialV2;
  error?: Error | undefined;
}

export interface CreateCredentialRequestV2 {
  configData?: ConfigData;
  schemaId: string;
  issuerDid: string;
  holderDid: string;
  expiration: number;
  version?: number | undefined;
  signer?: Signer;
  apiManagedHost: string;
  stringAttributes: StringAttributeV2[];
  integerAttributes: IntegerAttributeV2[];
  decimalAttributes: DecimalAttributeV2[];
  booleanAttributes: BooleanAttributeV2[];
  dateAttributes: DateAttributeV2[];
  datetimeAttributes: DateTimeAttributeV2[];
  proofType: ProofType[];
}

export interface BuildSchemaRequestV2 {
  configData?: ConfigData;
  displayName: string;
  schemaType: string;
  version: string;
  description: string;
  issuerDid: string;
  stringAttributes: StringAttributeDefinitionV2[];
  integerAttributes: IntegerAttributeDefinitionV2[];
  decimalAttributes: DecimalAttributeDefinitionV2[];
  booleanAttributes: BooleanAttributeDefinitionV2[];
  dateAttributes: DateAttributeDefinitionV2[];
  datetimeAttributes: DateTimeAttributeDefinitionV2[];
  stringEnumAttributes: StringEnumAttributeDefinitionV2[];
  integerEnumAttributes: IntegerEnumAttributeDefinitionV2[];
  decimalEnumAttributes: DecimalEnumAttributeDefinitionV2[];
}

export interface CreateIssuerRequest {
  issuerKey?: IssuerKey;
  configData?: ConfigData;
  issuerParams?: IssuerParams | undefined;
}

export interface GetIssuerByKeyRequest {
  issuerKey?: IssuerKey;
  configData?: ConfigData;
  issuerParams?: IssuerParams | undefined;
}

export interface PublishIssuerStateRequest {
  configData?: ConfigData;
  issuerDid: string;
  signer?: Signer;
}

export interface CreateCredentialResponseV2 {
  credentialReceipt?: CredentialReceiptV2;
  error?: Error | undefined;
}

export interface CreateIssuerResponse {
  did: string;
  error?: Error | undefined;
}

export interface BuildSchemaResponseV2 {
  schema?: SchemaV2;
  error?: Error | undefined;
}

export interface PublishIssuerStateResponse {
  stateReceipt?: IssuerStateReceipt;
  error?: Error | undefined;
}

export interface RevokeCredentialRequestV2 {
  configData?: ConfigData;
  credential?: CredentialV2;
}

export interface RevokeCredentialResponseV2 {
  result?: CredentialRevocationV2;
  error?: Error | undefined;
}

function createBaseGetIssuerListRequest(): GetIssuerListRequest {
  return { configData: undefined };
}

export const GetIssuerListRequest = {
  encode(message: GetIssuerListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetIssuerListRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetIssuerListRequest();
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

  fromJSON(object: any): GetIssuerListRequest {
    return { configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined };
  },

  toJSON(message: GetIssuerListRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetIssuerListRequest>, I>>(object: I): GetIssuerListRequest {
    const message = createBaseGetIssuerListRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    return message;
  },
};

function createBaseGetIssuerListResponse(): GetIssuerListResponse {
  return { did: [], error: undefined };
}

export const GetIssuerListResponse = {
  encode(message: GetIssuerListResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.did) {
      writer.uint32(10).string(v!);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetIssuerListResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetIssuerListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.did.push(reader.string());
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

  fromJSON(object: any): GetIssuerListResponse {
    return {
      did: Array.isArray(object?.did) ? object.did.map((e: any) => String(e)) : [],
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GetIssuerListResponse): unknown {
    const obj: any = {};
    if (message.did) {
      obj.did = message.did.map((e) => e);
    } else {
      obj.did = [];
    }
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetIssuerListResponse>, I>>(object: I): GetIssuerListResponse {
    const message = createBaseGetIssuerListResponse();
    message.did = object.did?.map((e) => e) || [];
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseGetIssuerByKeyResponse(): GetIssuerByKeyResponse {
  return { did: "", error: undefined };
}

export const GetIssuerByKeyResponse = {
  encode(message: GetIssuerByKeyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.did !== "") {
      writer.uint32(10).string(message.did);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetIssuerByKeyResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetIssuerByKeyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.did = reader.string();
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

  fromJSON(object: any): GetIssuerByKeyResponse {
    return {
      did: isSet(object.did) ? String(object.did) : "",
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GetIssuerByKeyResponse): unknown {
    const obj: any = {};
    message.did !== undefined && (obj.did = message.did);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetIssuerByKeyResponse>, I>>(object: I): GetIssuerByKeyResponse {
    const message = createBaseGetIssuerByKeyResponse();
    message.did = object.did ?? "";
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseGetCredentialProofRequest(): GetCredentialProofRequest {
  return { configData: undefined, issuerDid: "", credentialId: "" };
}

export const GetCredentialProofRequest = {
  encode(message: GetCredentialProofRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.issuerDid !== "") {
      writer.uint32(18).string(message.issuerDid);
    }
    if (message.credentialId !== "") {
      writer.uint32(26).string(message.credentialId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCredentialProofRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCredentialProofRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.issuerDid = reader.string();
          break;
        case 3:
          message.credentialId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetCredentialProofRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      issuerDid: isSet(object.issuerDid) ? String(object.issuerDid) : "",
      credentialId: isSet(object.credentialId) ? String(object.credentialId) : "",
    };
  },

  toJSON(message: GetCredentialProofRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.issuerDid !== undefined && (obj.issuerDid = message.issuerDid);
    message.credentialId !== undefined && (obj.credentialId = message.credentialId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetCredentialProofRequest>, I>>(object: I): GetCredentialProofRequest {
    const message = createBaseGetCredentialProofRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.issuerDid = object.issuerDid ?? "";
    message.credentialId = object.credentialId ?? "";
    return message;
  },
};

function createBaseGetCredentialProofResponse(): GetCredentialProofResponse {
  return { proof: undefined, error: undefined };
}

export const GetCredentialProofResponse = {
  encode(message: GetCredentialProofResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proof !== undefined) {
      CredentialProofV2.encode(message.proof, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCredentialProofResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCredentialProofResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proof = CredentialProofV2.decode(reader, reader.uint32());
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

  fromJSON(object: any): GetCredentialProofResponse {
    return {
      proof: isSet(object.proof) ? CredentialProofV2.fromJSON(object.proof) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GetCredentialProofResponse): unknown {
    const obj: any = {};
    message.proof !== undefined && (obj.proof = message.proof ? CredentialProofV2.toJSON(message.proof) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetCredentialProofResponse>, I>>(object: I): GetCredentialProofResponse {
    const message = createBaseGetCredentialProofResponse();
    message.proof = (object.proof !== undefined && object.proof !== null)
      ? CredentialProofV2.fromPartial(object.proof)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseCredentialToJsonRequestV2(): CredentialToJsonRequestV2 {
  return { configData: undefined, credential: undefined };
}

export const CredentialToJsonRequestV2 = {
  encode(message: CredentialToJsonRequestV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.credential !== undefined) {
      CredentialV2.encode(message.credential, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialToJsonRequestV2 {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialToJsonRequestV2();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.credential = CredentialV2.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CredentialToJsonRequestV2 {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      credential: isSet(object.credential) ? CredentialV2.fromJSON(object.credential) : undefined,
    };
  },

  toJSON(message: CredentialToJsonRequestV2): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.credential !== undefined &&
      (obj.credential = message.credential ? CredentialV2.toJSON(message.credential) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CredentialToJsonRequestV2>, I>>(object: I): CredentialToJsonRequestV2 {
    const message = createBaseCredentialToJsonRequestV2();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.credential = (object.credential !== undefined && object.credential !== null)
      ? CredentialV2.fromPartial(object.credential)
      : undefined;
    return message;
  },
};

function createBaseCredentialToJsonResponseV2(): CredentialToJsonResponseV2 {
  return { json: "", error: undefined };
}

export const CredentialToJsonResponseV2 = {
  encode(message: CredentialToJsonResponseV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.json !== "") {
      writer.uint32(10).string(message.json);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialToJsonResponseV2 {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialToJsonResponseV2();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.json = reader.string();
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

  fromJSON(object: any): CredentialToJsonResponseV2 {
    return {
      json: isSet(object.json) ? String(object.json) : "",
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: CredentialToJsonResponseV2): unknown {
    const obj: any = {};
    message.json !== undefined && (obj.json = message.json);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CredentialToJsonResponseV2>, I>>(object: I): CredentialToJsonResponseV2 {
    const message = createBaseCredentialToJsonResponseV2();
    message.json = object.json ?? "";
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseCredentialFromJsonRequestV2(): CredentialFromJsonRequestV2 {
  return { configData: undefined, json: "" };
}

export const CredentialFromJsonRequestV2 = {
  encode(message: CredentialFromJsonRequestV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.json !== "") {
      writer.uint32(18).string(message.json);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialFromJsonRequestV2 {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialFromJsonRequestV2();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.json = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CredentialFromJsonRequestV2 {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      json: isSet(object.json) ? String(object.json) : "",
    };
  },

  toJSON(message: CredentialFromJsonRequestV2): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.json !== undefined && (obj.json = message.json);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CredentialFromJsonRequestV2>, I>>(object: I): CredentialFromJsonRequestV2 {
    const message = createBaseCredentialFromJsonRequestV2();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.json = object.json ?? "";
    return message;
  },
};

function createBaseCredentialFromJsonResponseV2(): CredentialFromJsonResponseV2 {
  return { credential: undefined, error: undefined };
}

export const CredentialFromJsonResponseV2 = {
  encode(message: CredentialFromJsonResponseV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.credential !== undefined) {
      CredentialV2.encode(message.credential, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialFromJsonResponseV2 {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialFromJsonResponseV2();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.credential = CredentialV2.decode(reader, reader.uint32());
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

  fromJSON(object: any): CredentialFromJsonResponseV2 {
    return {
      credential: isSet(object.credential) ? CredentialV2.fromJSON(object.credential) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: CredentialFromJsonResponseV2): unknown {
    const obj: any = {};
    message.credential !== undefined &&
      (obj.credential = message.credential ? CredentialV2.toJSON(message.credential) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CredentialFromJsonResponseV2>, I>>(object: I): CredentialFromJsonResponseV2 {
    const message = createBaseCredentialFromJsonResponseV2();
    message.credential = (object.credential !== undefined && object.credential !== null)
      ? CredentialV2.fromPartial(object.credential)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseCreateCredentialRequestV2(): CreateCredentialRequestV2 {
  return {
    configData: undefined,
    schemaId: "",
    issuerDid: "",
    holderDid: "",
    expiration: 0,
    version: undefined,
    signer: undefined,
    apiManagedHost: "",
    stringAttributes: [],
    integerAttributes: [],
    decimalAttributes: [],
    booleanAttributes: [],
    dateAttributes: [],
    datetimeAttributes: [],
    proofType: [],
  };
}

export const CreateCredentialRequestV2 = {
  encode(message: CreateCredentialRequestV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.schemaId !== "") {
      writer.uint32(18).string(message.schemaId);
    }
    if (message.issuerDid !== "") {
      writer.uint32(26).string(message.issuerDid);
    }
    if (message.holderDid !== "") {
      writer.uint32(34).string(message.holderDid);
    }
    if (message.expiration !== 0) {
      writer.uint32(40).int64(message.expiration);
    }
    if (message.version !== undefined) {
      writer.uint32(48).int32(message.version);
    }
    if (message.signer !== undefined) {
      Signer.encode(message.signer, writer.uint32(58).fork()).ldelim();
    }
    if (message.apiManagedHost !== "") {
      writer.uint32(66).string(message.apiManagedHost);
    }
    for (const v of message.stringAttributes) {
      StringAttributeV2.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.integerAttributes) {
      IntegerAttributeV2.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    for (const v of message.decimalAttributes) {
      DecimalAttributeV2.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    for (const v of message.booleanAttributes) {
      BooleanAttributeV2.encode(v!, writer.uint32(98).fork()).ldelim();
    }
    for (const v of message.dateAttributes) {
      DateAttributeV2.encode(v!, writer.uint32(106).fork()).ldelim();
    }
    for (const v of message.datetimeAttributes) {
      DateTimeAttributeV2.encode(v!, writer.uint32(114).fork()).ldelim();
    }
    writer.uint32(122).fork();
    for (const v of message.proofType) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateCredentialRequestV2 {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateCredentialRequestV2();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.schemaId = reader.string();
          break;
        case 3:
          message.issuerDid = reader.string();
          break;
        case 4:
          message.holderDid = reader.string();
          break;
        case 5:
          message.expiration = longToNumber(reader.int64() as Long);
          break;
        case 6:
          message.version = reader.int32();
          break;
        case 7:
          message.signer = Signer.decode(reader, reader.uint32());
          break;
        case 8:
          message.apiManagedHost = reader.string();
          break;
        case 9:
          message.stringAttributes.push(StringAttributeV2.decode(reader, reader.uint32()));
          break;
        case 10:
          message.integerAttributes.push(IntegerAttributeV2.decode(reader, reader.uint32()));
          break;
        case 11:
          message.decimalAttributes.push(DecimalAttributeV2.decode(reader, reader.uint32()));
          break;
        case 12:
          message.booleanAttributes.push(BooleanAttributeV2.decode(reader, reader.uint32()));
          break;
        case 13:
          message.dateAttributes.push(DateAttributeV2.decode(reader, reader.uint32()));
          break;
        case 14:
          message.datetimeAttributes.push(DateTimeAttributeV2.decode(reader, reader.uint32()));
          break;
        case 15:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.proofType.push(reader.int32() as any);
            }
          } else {
            message.proofType.push(reader.int32() as any);
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateCredentialRequestV2 {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      schemaId: isSet(object.schemaId) ? String(object.schemaId) : "",
      issuerDid: isSet(object.issuerDid) ? String(object.issuerDid) : "",
      holderDid: isSet(object.holderDid) ? String(object.holderDid) : "",
      expiration: isSet(object.expiration) ? Number(object.expiration) : 0,
      version: isSet(object.version) ? Number(object.version) : undefined,
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
      apiManagedHost: isSet(object.apiManagedHost) ? String(object.apiManagedHost) : "",
      stringAttributes: Array.isArray(object?.stringAttributes)
        ? object.stringAttributes.map((e: any) => StringAttributeV2.fromJSON(e))
        : [],
      integerAttributes: Array.isArray(object?.integerAttributes)
        ? object.integerAttributes.map((e: any) => IntegerAttributeV2.fromJSON(e))
        : [],
      decimalAttributes: Array.isArray(object?.decimalAttributes)
        ? object.decimalAttributes.map((e: any) => DecimalAttributeV2.fromJSON(e))
        : [],
      booleanAttributes: Array.isArray(object?.booleanAttributes)
        ? object.booleanAttributes.map((e: any) => BooleanAttributeV2.fromJSON(e))
        : [],
      dateAttributes: Array.isArray(object?.dateAttributes)
        ? object.dateAttributes.map((e: any) => DateAttributeV2.fromJSON(e))
        : [],
      datetimeAttributes: Array.isArray(object?.datetimeAttributes)
        ? object.datetimeAttributes.map((e: any) => DateTimeAttributeV2.fromJSON(e))
        : [],
      proofType: Array.isArray(object?.proofType)
        ? object.proofType.map((e: any) => proofTypeFromJSON(e))
        : [],
    };
  },

  toJSON(message: CreateCredentialRequestV2): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.schemaId !== undefined && (obj.schemaId = message.schemaId);
    message.issuerDid !== undefined && (obj.issuerDid = message.issuerDid);
    message.holderDid !== undefined && (obj.holderDid = message.holderDid);
    message.expiration !== undefined && (obj.expiration = Math.round(message.expiration));
    message.version !== undefined && (obj.version = Math.round(message.version));
    message.signer !== undefined && (obj.signer = message.signer ? Signer.toJSON(message.signer) : undefined);
    message.apiManagedHost !== undefined && (obj.apiManagedHost = message.apiManagedHost);
    if (message.stringAttributes) {
      obj.stringAttributes = message.stringAttributes.map((e) => e ? StringAttributeV2.toJSON(e) : undefined);
    } else {
      obj.stringAttributes = [];
    }
    if (message.integerAttributes) {
      obj.integerAttributes = message.integerAttributes.map((e) => e ? IntegerAttributeV2.toJSON(e) : undefined);
    } else {
      obj.integerAttributes = [];
    }
    if (message.decimalAttributes) {
      obj.decimalAttributes = message.decimalAttributes.map((e) => e ? DecimalAttributeV2.toJSON(e) : undefined);
    } else {
      obj.decimalAttributes = [];
    }
    if (message.booleanAttributes) {
      obj.booleanAttributes = message.booleanAttributes.map((e) => e ? BooleanAttributeV2.toJSON(e) : undefined);
    } else {
      obj.booleanAttributes = [];
    }
    if (message.dateAttributes) {
      obj.dateAttributes = message.dateAttributes.map((e) => e ? DateAttributeV2.toJSON(e) : undefined);
    } else {
      obj.dateAttributes = [];
    }
    if (message.datetimeAttributes) {
      obj.datetimeAttributes = message.datetimeAttributes.map((e) => e ? DateTimeAttributeV2.toJSON(e) : undefined);
    } else {
      obj.datetimeAttributes = [];
    }
    if (message.proofType) {
      obj.proofType = message.proofType.map((e) => proofTypeToJSON(e));
    } else {
      obj.proofType = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateCredentialRequestV2>, I>>(object: I): CreateCredentialRequestV2 {
    const message = createBaseCreateCredentialRequestV2();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.schemaId = object.schemaId ?? "";
    message.issuerDid = object.issuerDid ?? "";
    message.holderDid = object.holderDid ?? "";
    message.expiration = object.expiration ?? 0;
    message.version = object.version ?? undefined;
    message.signer = (object.signer !== undefined && object.signer !== null)
      ? Signer.fromPartial(object.signer)
      : undefined;
    message.apiManagedHost = object.apiManagedHost ?? "";
    message.stringAttributes = object.stringAttributes?.map((e) => StringAttributeV2.fromPartial(e)) || [];
    message.integerAttributes = object.integerAttributes?.map((e) => IntegerAttributeV2.fromPartial(e)) || [];
    message.decimalAttributes = object.decimalAttributes?.map((e) => DecimalAttributeV2.fromPartial(e)) || [];
    message.booleanAttributes = object.booleanAttributes?.map((e) => BooleanAttributeV2.fromPartial(e)) || [];
    message.dateAttributes = object.dateAttributes?.map((e) => DateAttributeV2.fromPartial(e)) || [];
    message.datetimeAttributes = object.datetimeAttributes?.map((e) => DateTimeAttributeV2.fromPartial(e)) || [];
    message.proofType = object.proofType?.map((e) => e) || [];
    return message;
  },
};

function createBaseBuildSchemaRequestV2(): BuildSchemaRequestV2 {
  return {
    configData: undefined,
    displayName: "",
    schemaType: "",
    version: "",
    description: "",
    issuerDid: "",
    stringAttributes: [],
    integerAttributes: [],
    decimalAttributes: [],
    booleanAttributes: [],
    dateAttributes: [],
    datetimeAttributes: [],
    stringEnumAttributes: [],
    integerEnumAttributes: [],
    decimalEnumAttributes: [],
  };
}

export const BuildSchemaRequestV2 = {
  encode(message: BuildSchemaRequestV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.displayName !== "") {
      writer.uint32(18).string(message.displayName);
    }
    if (message.schemaType !== "") {
      writer.uint32(26).string(message.schemaType);
    }
    if (message.version !== "") {
      writer.uint32(34).string(message.version);
    }
    if (message.description !== "") {
      writer.uint32(42).string(message.description);
    }
    if (message.issuerDid !== "") {
      writer.uint32(50).string(message.issuerDid);
    }
    for (const v of message.stringAttributes) {
      StringAttributeDefinitionV2.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.integerAttributes) {
      IntegerAttributeDefinitionV2.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.decimalAttributes) {
      DecimalAttributeDefinitionV2.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.booleanAttributes) {
      BooleanAttributeDefinitionV2.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    for (const v of message.dateAttributes) {
      DateAttributeDefinitionV2.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    for (const v of message.datetimeAttributes) {
      DateTimeAttributeDefinitionV2.encode(v!, writer.uint32(98).fork()).ldelim();
    }
    for (const v of message.stringEnumAttributes) {
      StringEnumAttributeDefinitionV2.encode(v!, writer.uint32(106).fork()).ldelim();
    }
    for (const v of message.integerEnumAttributes) {
      IntegerEnumAttributeDefinitionV2.encode(v!, writer.uint32(114).fork()).ldelim();
    }
    for (const v of message.decimalEnumAttributes) {
      DecimalEnumAttributeDefinitionV2.encode(v!, writer.uint32(122).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BuildSchemaRequestV2 {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBuildSchemaRequestV2();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.displayName = reader.string();
          break;
        case 3:
          message.schemaType = reader.string();
          break;
        case 4:
          message.version = reader.string();
          break;
        case 5:
          message.description = reader.string();
          break;
        case 6:
          message.issuerDid = reader.string();
          break;
        case 7:
          message.stringAttributes.push(StringAttributeDefinitionV2.decode(reader, reader.uint32()));
          break;
        case 8:
          message.integerAttributes.push(IntegerAttributeDefinitionV2.decode(reader, reader.uint32()));
          break;
        case 9:
          message.decimalAttributes.push(DecimalAttributeDefinitionV2.decode(reader, reader.uint32()));
          break;
        case 10:
          message.booleanAttributes.push(BooleanAttributeDefinitionV2.decode(reader, reader.uint32()));
          break;
        case 11:
          message.dateAttributes.push(DateAttributeDefinitionV2.decode(reader, reader.uint32()));
          break;
        case 12:
          message.datetimeAttributes.push(DateTimeAttributeDefinitionV2.decode(reader, reader.uint32()));
          break;
        case 13:
          message.stringEnumAttributes.push(StringEnumAttributeDefinitionV2.decode(reader, reader.uint32()));
          break;
        case 14:
          message.integerEnumAttributes.push(IntegerEnumAttributeDefinitionV2.decode(reader, reader.uint32()));
          break;
        case 15:
          message.decimalEnumAttributes.push(DecimalEnumAttributeDefinitionV2.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BuildSchemaRequestV2 {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      displayName: isSet(object.displayName) ? String(object.displayName) : "",
      schemaType: isSet(object.schemaType) ? String(object.schemaType) : "",
      version: isSet(object.version) ? String(object.version) : "",
      description: isSet(object.description) ? String(object.description) : "",
      issuerDid: isSet(object.issuerDid) ? String(object.issuerDid) : "",
      stringAttributes: Array.isArray(object?.stringAttributes)
        ? object.stringAttributes.map((e: any) => StringAttributeDefinitionV2.fromJSON(e))
        : [],
      integerAttributes: Array.isArray(object?.integerAttributes)
        ? object.integerAttributes.map((e: any) => IntegerAttributeDefinitionV2.fromJSON(e))
        : [],
      decimalAttributes: Array.isArray(object?.decimalAttributes)
        ? object.decimalAttributes.map((e: any) => DecimalAttributeDefinitionV2.fromJSON(e))
        : [],
      booleanAttributes: Array.isArray(object?.booleanAttributes)
        ? object.booleanAttributes.map((e: any) => BooleanAttributeDefinitionV2.fromJSON(e))
        : [],
      dateAttributes: Array.isArray(object?.dateAttributes)
        ? object.dateAttributes.map((e: any) => DateAttributeDefinitionV2.fromJSON(e))
        : [],
      datetimeAttributes: Array.isArray(object?.datetimeAttributes)
        ? object.datetimeAttributes.map((e: any) => DateTimeAttributeDefinitionV2.fromJSON(e))
        : [],
      stringEnumAttributes: Array.isArray(object?.stringEnumAttributes)
        ? object.stringEnumAttributes.map((e: any) => StringEnumAttributeDefinitionV2.fromJSON(e))
        : [],
      integerEnumAttributes: Array.isArray(object?.integerEnumAttributes)
        ? object.integerEnumAttributes.map((e: any) => IntegerEnumAttributeDefinitionV2.fromJSON(e))
        : [],
      decimalEnumAttributes: Array.isArray(object?.decimalEnumAttributes)
        ? object.decimalEnumAttributes.map((e: any) => DecimalEnumAttributeDefinitionV2.fromJSON(e))
        : [],
    };
  },

  toJSON(message: BuildSchemaRequestV2): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.displayName !== undefined && (obj.displayName = message.displayName);
    message.schemaType !== undefined && (obj.schemaType = message.schemaType);
    message.version !== undefined && (obj.version = message.version);
    message.description !== undefined && (obj.description = message.description);
    message.issuerDid !== undefined && (obj.issuerDid = message.issuerDid);
    if (message.stringAttributes) {
      obj.stringAttributes = message.stringAttributes.map((e) => e ? StringAttributeDefinitionV2.toJSON(e) : undefined);
    } else {
      obj.stringAttributes = [];
    }
    if (message.integerAttributes) {
      obj.integerAttributes = message.integerAttributes.map((e) =>
        e ? IntegerAttributeDefinitionV2.toJSON(e) : undefined
      );
    } else {
      obj.integerAttributes = [];
    }
    if (message.decimalAttributes) {
      obj.decimalAttributes = message.decimalAttributes.map((e) =>
        e ? DecimalAttributeDefinitionV2.toJSON(e) : undefined
      );
    } else {
      obj.decimalAttributes = [];
    }
    if (message.booleanAttributes) {
      obj.booleanAttributes = message.booleanAttributes.map((e) =>
        e ? BooleanAttributeDefinitionV2.toJSON(e) : undefined
      );
    } else {
      obj.booleanAttributes = [];
    }
    if (message.dateAttributes) {
      obj.dateAttributes = message.dateAttributes.map((e) => e ? DateAttributeDefinitionV2.toJSON(e) : undefined);
    } else {
      obj.dateAttributes = [];
    }
    if (message.datetimeAttributes) {
      obj.datetimeAttributes = message.datetimeAttributes.map((e) =>
        e ? DateTimeAttributeDefinitionV2.toJSON(e) : undefined
      );
    } else {
      obj.datetimeAttributes = [];
    }
    if (message.stringEnumAttributes) {
      obj.stringEnumAttributes = message.stringEnumAttributes.map((e) =>
        e ? StringEnumAttributeDefinitionV2.toJSON(e) : undefined
      );
    } else {
      obj.stringEnumAttributes = [];
    }
    if (message.integerEnumAttributes) {
      obj.integerEnumAttributes = message.integerEnumAttributes.map((e) =>
        e ? IntegerEnumAttributeDefinitionV2.toJSON(e) : undefined
      );
    } else {
      obj.integerEnumAttributes = [];
    }
    if (message.decimalEnumAttributes) {
      obj.decimalEnumAttributes = message.decimalEnumAttributes.map((e) =>
        e ? DecimalEnumAttributeDefinitionV2.toJSON(e) : undefined
      );
    } else {
      obj.decimalEnumAttributes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BuildSchemaRequestV2>, I>>(object: I): BuildSchemaRequestV2 {
    const message = createBaseBuildSchemaRequestV2();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.displayName = object.displayName ?? "";
    message.schemaType = object.schemaType ?? "";
    message.version = object.version ?? "";
    message.description = object.description ?? "";
    message.issuerDid = object.issuerDid ?? "";
    message.stringAttributes = object.stringAttributes?.map((e) => StringAttributeDefinitionV2.fromPartial(e)) || [];
    message.integerAttributes = object.integerAttributes?.map((e) => IntegerAttributeDefinitionV2.fromPartial(e)) || [];
    message.decimalAttributes = object.decimalAttributes?.map((e) => DecimalAttributeDefinitionV2.fromPartial(e)) || [];
    message.booleanAttributes = object.booleanAttributes?.map((e) => BooleanAttributeDefinitionV2.fromPartial(e)) || [];
    message.dateAttributes = object.dateAttributes?.map((e) => DateAttributeDefinitionV2.fromPartial(e)) || [];
    message.datetimeAttributes = object.datetimeAttributes?.map((e) => DateTimeAttributeDefinitionV2.fromPartial(e)) ||
      [];
    message.stringEnumAttributes =
      object.stringEnumAttributes?.map((e) => StringEnumAttributeDefinitionV2.fromPartial(e)) || [];
    message.integerEnumAttributes =
      object.integerEnumAttributes?.map((e) => IntegerEnumAttributeDefinitionV2.fromPartial(e)) || [];
    message.decimalEnumAttributes =
      object.decimalEnumAttributes?.map((e) => DecimalEnumAttributeDefinitionV2.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCreateIssuerRequest(): CreateIssuerRequest {
  return { issuerKey: undefined, configData: undefined, issuerParams: undefined };
}

export const CreateIssuerRequest = {
  encode(message: CreateIssuerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.issuerKey !== undefined) {
      IssuerKey.encode(message.issuerKey, writer.uint32(10).fork()).ldelim();
    }
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(18).fork()).ldelim();
    }
    if (message.issuerParams !== undefined) {
      IssuerParams.encode(message.issuerParams, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateIssuerRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateIssuerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.issuerKey = IssuerKey.decode(reader, reader.uint32());
          break;
        case 2:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 3:
          message.issuerParams = IssuerParams.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateIssuerRequest {
    return {
      issuerKey: isSet(object.issuerKey) ? IssuerKey.fromJSON(object.issuerKey) : undefined,
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      issuerParams: isSet(object.issuerParams) ? IssuerParams.fromJSON(object.issuerParams) : undefined,
    };
  },

  toJSON(message: CreateIssuerRequest): unknown {
    const obj: any = {};
    message.issuerKey !== undefined &&
      (obj.issuerKey = message.issuerKey ? IssuerKey.toJSON(message.issuerKey) : undefined);
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.issuerParams !== undefined &&
      (obj.issuerParams = message.issuerParams ? IssuerParams.toJSON(message.issuerParams) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateIssuerRequest>, I>>(object: I): CreateIssuerRequest {
    const message = createBaseCreateIssuerRequest();
    message.issuerKey = (object.issuerKey !== undefined && object.issuerKey !== null)
      ? IssuerKey.fromPartial(object.issuerKey)
      : undefined;
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.issuerParams = (object.issuerParams !== undefined && object.issuerParams !== null)
      ? IssuerParams.fromPartial(object.issuerParams)
      : undefined;
    return message;
  },
};

function createBaseGetIssuerByKeyRequest(): GetIssuerByKeyRequest {
  return { issuerKey: undefined, configData: undefined, issuerParams: undefined };
}

export const GetIssuerByKeyRequest = {
  encode(message: GetIssuerByKeyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.issuerKey !== undefined) {
      IssuerKey.encode(message.issuerKey, writer.uint32(10).fork()).ldelim();
    }
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(18).fork()).ldelim();
    }
    if (message.issuerParams !== undefined) {
      IssuerParams.encode(message.issuerParams, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetIssuerByKeyRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetIssuerByKeyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.issuerKey = IssuerKey.decode(reader, reader.uint32());
          break;
        case 2:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 3:
          message.issuerParams = IssuerParams.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetIssuerByKeyRequest {
    return {
      issuerKey: isSet(object.issuerKey) ? IssuerKey.fromJSON(object.issuerKey) : undefined,
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      issuerParams: isSet(object.issuerParams) ? IssuerParams.fromJSON(object.issuerParams) : undefined,
    };
  },

  toJSON(message: GetIssuerByKeyRequest): unknown {
    const obj: any = {};
    message.issuerKey !== undefined &&
      (obj.issuerKey = message.issuerKey ? IssuerKey.toJSON(message.issuerKey) : undefined);
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.issuerParams !== undefined &&
      (obj.issuerParams = message.issuerParams ? IssuerParams.toJSON(message.issuerParams) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetIssuerByKeyRequest>, I>>(object: I): GetIssuerByKeyRequest {
    const message = createBaseGetIssuerByKeyRequest();
    message.issuerKey = (object.issuerKey !== undefined && object.issuerKey !== null)
      ? IssuerKey.fromPartial(object.issuerKey)
      : undefined;
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.issuerParams = (object.issuerParams !== undefined && object.issuerParams !== null)
      ? IssuerParams.fromPartial(object.issuerParams)
      : undefined;
    return message;
  },
};

function createBasePublishIssuerStateRequest(): PublishIssuerStateRequest {
  return { configData: undefined, issuerDid: "", signer: undefined };
}

export const PublishIssuerStateRequest = {
  encode(message: PublishIssuerStateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.issuerDid !== "") {
      writer.uint32(18).string(message.issuerDid);
    }
    if (message.signer !== undefined) {
      Signer.encode(message.signer, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PublishIssuerStateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublishIssuerStateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.issuerDid = reader.string();
          break;
        case 3:
          message.signer = Signer.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PublishIssuerStateRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      issuerDid: isSet(object.issuerDid) ? String(object.issuerDid) : "",
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
    };
  },

  toJSON(message: PublishIssuerStateRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.issuerDid !== undefined && (obj.issuerDid = message.issuerDid);
    message.signer !== undefined && (obj.signer = message.signer ? Signer.toJSON(message.signer) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PublishIssuerStateRequest>, I>>(object: I): PublishIssuerStateRequest {
    const message = createBasePublishIssuerStateRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.issuerDid = object.issuerDid ?? "";
    message.signer = (object.signer !== undefined && object.signer !== null)
      ? Signer.fromPartial(object.signer)
      : undefined;
    return message;
  },
};

function createBaseCreateCredentialResponseV2(): CreateCredentialResponseV2 {
  return { credentialReceipt: undefined, error: undefined };
}

export const CreateCredentialResponseV2 = {
  encode(message: CreateCredentialResponseV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.credentialReceipt !== undefined) {
      CredentialReceiptV2.encode(message.credentialReceipt, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateCredentialResponseV2 {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateCredentialResponseV2();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.credentialReceipt = CredentialReceiptV2.decode(reader, reader.uint32());
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

  fromJSON(object: any): CreateCredentialResponseV2 {
    return {
      credentialReceipt: isSet(object.credentialReceipt)
        ? CredentialReceiptV2.fromJSON(object.credentialReceipt)
        : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: CreateCredentialResponseV2): unknown {
    const obj: any = {};
    message.credentialReceipt !== undefined && (obj.credentialReceipt = message.credentialReceipt
      ? CredentialReceiptV2.toJSON(message.credentialReceipt)
      : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateCredentialResponseV2>, I>>(object: I): CreateCredentialResponseV2 {
    const message = createBaseCreateCredentialResponseV2();
    message.credentialReceipt = (object.credentialReceipt !== undefined && object.credentialReceipt !== null)
      ? CredentialReceiptV2.fromPartial(object.credentialReceipt)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseCreateIssuerResponse(): CreateIssuerResponse {
  return { did: "", error: undefined };
}

export const CreateIssuerResponse = {
  encode(message: CreateIssuerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.did !== "") {
      writer.uint32(10).string(message.did);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateIssuerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateIssuerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.did = reader.string();
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

  fromJSON(object: any): CreateIssuerResponse {
    return {
      did: isSet(object.did) ? String(object.did) : "",
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: CreateIssuerResponse): unknown {
    const obj: any = {};
    message.did !== undefined && (obj.did = message.did);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateIssuerResponse>, I>>(object: I): CreateIssuerResponse {
    const message = createBaseCreateIssuerResponse();
    message.did = object.did ?? "";
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseBuildSchemaResponseV2(): BuildSchemaResponseV2 {
  return { schema: undefined, error: undefined };
}

export const BuildSchemaResponseV2 = {
  encode(message: BuildSchemaResponseV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.schema !== undefined) {
      SchemaV2.encode(message.schema, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BuildSchemaResponseV2 {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBuildSchemaResponseV2();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.schema = SchemaV2.decode(reader, reader.uint32());
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

  fromJSON(object: any): BuildSchemaResponseV2 {
    return {
      schema: isSet(object.schema) ? SchemaV2.fromJSON(object.schema) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: BuildSchemaResponseV2): unknown {
    const obj: any = {};
    message.schema !== undefined && (obj.schema = message.schema ? SchemaV2.toJSON(message.schema) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BuildSchemaResponseV2>, I>>(object: I): BuildSchemaResponseV2 {
    const message = createBaseBuildSchemaResponseV2();
    message.schema = (object.schema !== undefined && object.schema !== null)
      ? SchemaV2.fromPartial(object.schema)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBasePublishIssuerStateResponse(): PublishIssuerStateResponse {
  return { stateReceipt: undefined, error: undefined };
}

export const PublishIssuerStateResponse = {
  encode(message: PublishIssuerStateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.stateReceipt !== undefined) {
      IssuerStateReceipt.encode(message.stateReceipt, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PublishIssuerStateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublishIssuerStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stateReceipt = IssuerStateReceipt.decode(reader, reader.uint32());
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

  fromJSON(object: any): PublishIssuerStateResponse {
    return {
      stateReceipt: isSet(object.stateReceipt) ? IssuerStateReceipt.fromJSON(object.stateReceipt) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: PublishIssuerStateResponse): unknown {
    const obj: any = {};
    message.stateReceipt !== undefined &&
      (obj.stateReceipt = message.stateReceipt ? IssuerStateReceipt.toJSON(message.stateReceipt) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PublishIssuerStateResponse>, I>>(object: I): PublishIssuerStateResponse {
    const message = createBasePublishIssuerStateResponse();
    message.stateReceipt = (object.stateReceipt !== undefined && object.stateReceipt !== null)
      ? IssuerStateReceipt.fromPartial(object.stateReceipt)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseRevokeCredentialRequestV2(): RevokeCredentialRequestV2 {
  return { configData: undefined, credential: undefined };
}

export const RevokeCredentialRequestV2 = {
  encode(message: RevokeCredentialRequestV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.credential !== undefined) {
      CredentialV2.encode(message.credential, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RevokeCredentialRequestV2 {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRevokeCredentialRequestV2();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.credential = CredentialV2.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RevokeCredentialRequestV2 {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      credential: isSet(object.credential) ? CredentialV2.fromJSON(object.credential) : undefined,
    };
  },

  toJSON(message: RevokeCredentialRequestV2): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.credential !== undefined &&
      (obj.credential = message.credential ? CredentialV2.toJSON(message.credential) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RevokeCredentialRequestV2>, I>>(object: I): RevokeCredentialRequestV2 {
    const message = createBaseRevokeCredentialRequestV2();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.credential = (object.credential !== undefined && object.credential !== null)
      ? CredentialV2.fromPartial(object.credential)
      : undefined;
    return message;
  },
};

function createBaseRevokeCredentialResponseV2(): RevokeCredentialResponseV2 {
  return { result: undefined, error: undefined };
}

export const RevokeCredentialResponseV2 = {
  encode(message: RevokeCredentialResponseV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result !== undefined) {
      CredentialRevocationV2.encode(message.result, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RevokeCredentialResponseV2 {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRevokeCredentialResponseV2();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = CredentialRevocationV2.decode(reader, reader.uint32());
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

  fromJSON(object: any): RevokeCredentialResponseV2 {
    return {
      result: isSet(object.result) ? CredentialRevocationV2.fromJSON(object.result) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: RevokeCredentialResponseV2): unknown {
    const obj: any = {};
    message.result !== undefined &&
      (obj.result = message.result ? CredentialRevocationV2.toJSON(message.result) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RevokeCredentialResponseV2>, I>>(object: I): RevokeCredentialResponseV2 {
    const message = createBaseRevokeCredentialResponseV2();
    message.result = (object.result !== undefined && object.result !== null)
      ? CredentialRevocationV2.fromPartial(object.result)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

export interface IdentityServiceV2 {
  CreateIssuer(request: CreateIssuerRequest): Promise<CreateIssuerResponse>;
  GetIssuerList(request: GetIssuerListRequest): Promise<GetIssuerListResponse>;
  GetIssuerByKey(request: GetIssuerByKeyRequest): Promise<GetIssuerByKeyResponse>;
  BuildSchema(request: BuildSchemaRequestV2): Promise<BuildSchemaResponseV2>;
  CreateCredential(request: CreateCredentialRequestV2): Promise<CreateCredentialResponseV2>;
  GetCredentialProof(request: GetCredentialProofRequest): Promise<GetCredentialProofResponse>;
  RevokeCredential(request: RevokeCredentialRequestV2): Promise<RevokeCredentialResponseV2>;
  CredentialToJson(request: CredentialToJsonRequestV2): Promise<CredentialToJsonResponseV2>;
  CredentialFromJson(request: CredentialFromJsonRequestV2): Promise<CredentialFromJsonResponseV2>;
  PublishIssuerState(request: PublishIssuerStateRequest): Promise<PublishIssuerStateResponse>;
}

export class IdentityServiceV2ClientImpl implements IdentityServiceV2 {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateIssuer = this.CreateIssuer.bind(this);
    this.GetIssuerList = this.GetIssuerList.bind(this);
    this.GetIssuerByKey = this.GetIssuerByKey.bind(this);
    this.BuildSchema = this.BuildSchema.bind(this);
    this.CreateCredential = this.CreateCredential.bind(this);
    this.GetCredentialProof = this.GetCredentialProof.bind(this);
    this.RevokeCredential = this.RevokeCredential.bind(this);
    this.CredentialToJson = this.CredentialToJson.bind(this);
    this.CredentialFromJson = this.CredentialFromJson.bind(this);
    this.PublishIssuerState = this.PublishIssuerState.bind(this);
  }
  CreateIssuer(request: CreateIssuerRequest): Promise<CreateIssuerResponse> {
    const data = CreateIssuerRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.IdentityServiceV2", "CreateIssuer", data);
    return promise.then((data) => CreateIssuerResponse.decode(new _m0.Reader(data)));
  }

  GetIssuerList(request: GetIssuerListRequest): Promise<GetIssuerListResponse> {
    const data = GetIssuerListRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.IdentityServiceV2", "GetIssuerList", data);
    return promise.then((data) => GetIssuerListResponse.decode(new _m0.Reader(data)));
  }

  GetIssuerByKey(request: GetIssuerByKeyRequest): Promise<GetIssuerByKeyResponse> {
    const data = GetIssuerByKeyRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.IdentityServiceV2", "GetIssuerByKey", data);
    return promise.then((data) => GetIssuerByKeyResponse.decode(new _m0.Reader(data)));
  }

  BuildSchema(request: BuildSchemaRequestV2): Promise<BuildSchemaResponseV2> {
    const data = BuildSchemaRequestV2.encode(request).finish();
    const promise = this.rpc.request("bloock.IdentityServiceV2", "BuildSchema", data);
    return promise.then((data) => BuildSchemaResponseV2.decode(new _m0.Reader(data)));
  }

  CreateCredential(request: CreateCredentialRequestV2): Promise<CreateCredentialResponseV2> {
    const data = CreateCredentialRequestV2.encode(request).finish();
    const promise = this.rpc.request("bloock.IdentityServiceV2", "CreateCredential", data);
    return promise.then((data) => CreateCredentialResponseV2.decode(new _m0.Reader(data)));
  }

  GetCredentialProof(request: GetCredentialProofRequest): Promise<GetCredentialProofResponse> {
    const data = GetCredentialProofRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.IdentityServiceV2", "GetCredentialProof", data);
    return promise.then((data) => GetCredentialProofResponse.decode(new _m0.Reader(data)));
  }

  RevokeCredential(request: RevokeCredentialRequestV2): Promise<RevokeCredentialResponseV2> {
    const data = RevokeCredentialRequestV2.encode(request).finish();
    const promise = this.rpc.request("bloock.IdentityServiceV2", "RevokeCredential", data);
    return promise.then((data) => RevokeCredentialResponseV2.decode(new _m0.Reader(data)));
  }

  CredentialToJson(request: CredentialToJsonRequestV2): Promise<CredentialToJsonResponseV2> {
    const data = CredentialToJsonRequestV2.encode(request).finish();
    const promise = this.rpc.request("bloock.IdentityServiceV2", "CredentialToJson", data);
    return promise.then((data) => CredentialToJsonResponseV2.decode(new _m0.Reader(data)));
  }

  CredentialFromJson(request: CredentialFromJsonRequestV2): Promise<CredentialFromJsonResponseV2> {
    const data = CredentialFromJsonRequestV2.encode(request).finish();
    const promise = this.rpc.request("bloock.IdentityServiceV2", "CredentialFromJson", data);
    return promise.then((data) => CredentialFromJsonResponseV2.decode(new _m0.Reader(data)));
  }

  PublishIssuerState(request: PublishIssuerStateRequest): Promise<PublishIssuerStateResponse> {
    const data = PublishIssuerStateRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.IdentityServiceV2", "PublishIssuerState", data);
    return promise.then((data) => PublishIssuerStateResponse.decode(new _m0.Reader(data)));
  }
}

export type IdentityServiceV2Definition = typeof IdentityServiceV2Definition;
export const IdentityServiceV2Definition = {
  name: "IdentityServiceV2",
  fullName: "bloock.IdentityServiceV2",
  methods: {
    createIssuer: {
      name: "CreateIssuer",
      requestType: CreateIssuerRequest,
      requestStream: false,
      responseType: CreateIssuerResponse,
      responseStream: false,
      options: {},
    },
    getIssuerList: {
      name: "GetIssuerList",
      requestType: GetIssuerListRequest,
      requestStream: false,
      responseType: GetIssuerListResponse,
      responseStream: false,
      options: {},
    },
    getIssuerByKey: {
      name: "GetIssuerByKey",
      requestType: GetIssuerByKeyRequest,
      requestStream: false,
      responseType: GetIssuerByKeyResponse,
      responseStream: false,
      options: {},
    },
    buildSchema: {
      name: "BuildSchema",
      requestType: BuildSchemaRequestV2,
      requestStream: false,
      responseType: BuildSchemaResponseV2,
      responseStream: false,
      options: {},
    },
    createCredential: {
      name: "CreateCredential",
      requestType: CreateCredentialRequestV2,
      requestStream: false,
      responseType: CreateCredentialResponseV2,
      responseStream: false,
      options: {},
    },
    getCredentialProof: {
      name: "GetCredentialProof",
      requestType: GetCredentialProofRequest,
      requestStream: false,
      responseType: GetCredentialProofResponse,
      responseStream: false,
      options: {},
    },
    revokeCredential: {
      name: "RevokeCredential",
      requestType: RevokeCredentialRequestV2,
      requestStream: false,
      responseType: RevokeCredentialResponseV2,
      responseStream: false,
      options: {},
    },
    credentialToJson: {
      name: "CredentialToJson",
      requestType: CredentialToJsonRequestV2,
      requestStream: false,
      responseType: CredentialToJsonResponseV2,
      responseStream: false,
      options: {},
    },
    credentialFromJson: {
      name: "CredentialFromJson",
      requestType: CredentialFromJsonRequestV2,
      requestStream: false,
      responseType: CredentialFromJsonResponseV2,
      responseStream: false,
      options: {},
    },
    publishIssuerState: {
      name: "PublishIssuerState",
      requestType: PublishIssuerStateRequest,
      requestStream: false,
      responseType: PublishIssuerStateResponse,
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
