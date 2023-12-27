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
  DidParams,
  IdentityKey,
  IntegerAttributeDefinitionV2,
  IntegerAttributeV2,
  IntegerEnumAttributeDefinitionV2,
  IssuerStateReceipt,
  SchemaV2,
  StringAttributeDefinitionV2,
  StringAttributeV2,
  StringEnumAttributeDefinitionV2,
} from "./identity_entities_v2";
import { Error } from "./shared";

export interface GetSchemaRequestV2 {
  configData?: ConfigData | undefined;
  id: string;
}

export interface GetSchemaResponseV2 {
  schema?: SchemaV2 | undefined;
  error?: Error | undefined;
}

export interface GetIssuerListRequest {
  configData?: ConfigData | undefined;
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
  configData?: ConfigData | undefined;
  issuerDid: string;
  credentialId: string;
}

export interface GetCredentialProofResponse {
  proof?: CredentialProofV2 | undefined;
  error?: Error | undefined;
}

export interface CredentialToJsonRequestV2 {
  configData?: ConfigData | undefined;
  credential?: CredentialV2 | undefined;
}

export interface CredentialToJsonResponseV2 {
  json: string;
  error?: Error | undefined;
}

export interface CredentialFromJsonRequestV2 {
  configData?: ConfigData | undefined;
  json: string;
}

export interface CredentialFromJsonResponseV2 {
  credential?: CredentialV2 | undefined;
  error?: Error | undefined;
}

export interface CreateCredentialRequestV2 {
  configData?: ConfigData | undefined;
  schemaId: string;
  issuerDid: string;
  holderDid: string;
  expiration: number;
  version?: number | undefined;
  signer?: Signer | undefined;
  apiManagedHost: string;
  stringAttributes: StringAttributeV2[];
  integerAttributes: IntegerAttributeV2[];
  decimalAttributes: DecimalAttributeV2[];
  booleanAttributes: BooleanAttributeV2[];
  dateAttributes: DateAttributeV2[];
  datetimeAttributes: DateTimeAttributeV2[];
}

export interface BuildSchemaRequestV2 {
  configData?: ConfigData | undefined;
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

export interface CreateIdentityV2Request {
  issuerKey?: IdentityKey | undefined;
  configData?: ConfigData | undefined;
  didParams?: DidParams | undefined;
}

export interface CreateIssuerRequest {
  issuerKey?: IdentityKey | undefined;
  configData?: ConfigData | undefined;
  issuerParams?: DidParams | undefined;
  name?: string | undefined;
  description?: string | undefined;
  image?: string | undefined;
  publishInterval?: number | undefined;
}

export interface GetIssuerByKeyRequest {
  issuerKey?: IdentityKey | undefined;
  configData?: ConfigData | undefined;
  issuerParams?: DidParams | undefined;
}

export interface PublishIssuerStateRequest {
  configData?: ConfigData | undefined;
  issuerDid: string;
  signer?: Signer | undefined;
}

export interface CreateCredentialResponseV2 {
  credentialReceipt?: CredentialReceiptV2 | undefined;
  error?: Error | undefined;
}

export interface CreateIdentityV2Response {
  did: string;
  error?: Error | undefined;
}

export interface CreateIssuerResponse {
  did: string;
  error?: Error | undefined;
}

export interface BuildSchemaResponseV2 {
  schema?: SchemaV2 | undefined;
  error?: Error | undefined;
}

export interface PublishIssuerStateResponse {
  stateReceipt?: IssuerStateReceipt | undefined;
  error?: Error | undefined;
}

export interface RevokeCredentialRequestV2 {
  configData?: ConfigData | undefined;
  credential?: CredentialV2 | undefined;
  signer?: Signer | undefined;
}

export interface RevokeCredentialResponseV2 {
  result?: CredentialRevocationV2 | undefined;
  error?: Error | undefined;
}

function createBaseGetSchemaRequestV2(): GetSchemaRequestV2 {
  return { configData: undefined, id: "" };
}

export const GetSchemaRequestV2 = {
  encode(message: GetSchemaRequestV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSchemaRequestV2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSchemaRequestV2();
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

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetSchemaRequestV2 {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
    };
  },

  toJSON(message: GetSchemaRequestV2): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetSchemaRequestV2>, I>>(base?: I): GetSchemaRequestV2 {
    return GetSchemaRequestV2.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetSchemaRequestV2>, I>>(object: I): GetSchemaRequestV2 {
    const message = createBaseGetSchemaRequestV2();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseGetSchemaResponseV2(): GetSchemaResponseV2 {
  return { schema: undefined, error: undefined };
}

export const GetSchemaResponseV2 = {
  encode(message: GetSchemaResponseV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.schema !== undefined) {
      SchemaV2.encode(message.schema, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSchemaResponseV2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSchemaResponseV2();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.schema = SchemaV2.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetSchemaResponseV2 {
    return {
      schema: isSet(object.schema) ? SchemaV2.fromJSON(object.schema) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GetSchemaResponseV2): unknown {
    const obj: any = {};
    if (message.schema !== undefined) {
      obj.schema = SchemaV2.toJSON(message.schema);
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetSchemaResponseV2>, I>>(base?: I): GetSchemaResponseV2 {
    return GetSchemaResponseV2.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetSchemaResponseV2>, I>>(object: I): GetSchemaResponseV2 {
    const message = createBaseGetSchemaResponseV2();
    message.schema = (object.schema !== undefined && object.schema !== null)
      ? SchemaV2.fromPartial(object.schema)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetIssuerListRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.configData = ConfigData.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetIssuerListRequest {
    return { configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined };
  },

  toJSON(message: GetIssuerListRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetIssuerListRequest>, I>>(base?: I): GetIssuerListRequest {
    return GetIssuerListRequest.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetIssuerListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.did.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetIssuerListResponse {
    return {
      did: globalThis.Array.isArray(object?.did) ? object.did.map((e: any) => globalThis.String(e)) : [],
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GetIssuerListResponse): unknown {
    const obj: any = {};
    if (message.did?.length) {
      obj.did = message.did;
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetIssuerListResponse>, I>>(base?: I): GetIssuerListResponse {
    return GetIssuerListResponse.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetIssuerByKeyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.did = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetIssuerByKeyResponse {
    return {
      did: isSet(object.did) ? globalThis.String(object.did) : "",
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GetIssuerByKeyResponse): unknown {
    const obj: any = {};
    if (message.did !== "") {
      obj.did = message.did;
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetIssuerByKeyResponse>, I>>(base?: I): GetIssuerByKeyResponse {
    return GetIssuerByKeyResponse.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCredentialProofRequest();
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

          message.issuerDid = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.credentialId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetCredentialProofRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      issuerDid: isSet(object.issuerDid) ? globalThis.String(object.issuerDid) : "",
      credentialId: isSet(object.credentialId) ? globalThis.String(object.credentialId) : "",
    };
  },

  toJSON(message: GetCredentialProofRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.issuerDid !== "") {
      obj.issuerDid = message.issuerDid;
    }
    if (message.credentialId !== "") {
      obj.credentialId = message.credentialId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetCredentialProofRequest>, I>>(base?: I): GetCredentialProofRequest {
    return GetCredentialProofRequest.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCredentialProofResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.proof = CredentialProofV2.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
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
    if (message.proof !== undefined) {
      obj.proof = CredentialProofV2.toJSON(message.proof);
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetCredentialProofResponse>, I>>(base?: I): GetCredentialProofResponse {
    return GetCredentialProofResponse.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialToJsonRequestV2();
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

          message.credential = CredentialV2.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
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
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.credential !== undefined) {
      obj.credential = CredentialV2.toJSON(message.credential);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CredentialToJsonRequestV2>, I>>(base?: I): CredentialToJsonRequestV2 {
    return CredentialToJsonRequestV2.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialToJsonResponseV2();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.json = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CredentialToJsonResponseV2 {
    return {
      json: isSet(object.json) ? globalThis.String(object.json) : "",
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: CredentialToJsonResponseV2): unknown {
    const obj: any = {};
    if (message.json !== "") {
      obj.json = message.json;
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CredentialToJsonResponseV2>, I>>(base?: I): CredentialToJsonResponseV2 {
    return CredentialToJsonResponseV2.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialFromJsonRequestV2();
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

          message.json = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CredentialFromJsonRequestV2 {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      json: isSet(object.json) ? globalThis.String(object.json) : "",
    };
  },

  toJSON(message: CredentialFromJsonRequestV2): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.json !== "") {
      obj.json = message.json;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CredentialFromJsonRequestV2>, I>>(base?: I): CredentialFromJsonRequestV2 {
    return CredentialFromJsonRequestV2.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialFromJsonResponseV2();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.credential = CredentialV2.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
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
    if (message.credential !== undefined) {
      obj.credential = CredentialV2.toJSON(message.credential);
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CredentialFromJsonResponseV2>, I>>(base?: I): CredentialFromJsonResponseV2 {
    return CredentialFromJsonResponseV2.fromPartial(base ?? ({} as any));
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
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateCredentialRequestV2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateCredentialRequestV2();
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

          message.schemaId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.issuerDid = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.holderDid = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.expiration = longToNumber(reader.int64() as Long);
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.version = reader.int32();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.signer = Signer.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.apiManagedHost = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.stringAttributes.push(StringAttributeV2.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.integerAttributes.push(IntegerAttributeV2.decode(reader, reader.uint32()));
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.decimalAttributes.push(DecimalAttributeV2.decode(reader, reader.uint32()));
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.booleanAttributes.push(BooleanAttributeV2.decode(reader, reader.uint32()));
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.dateAttributes.push(DateAttributeV2.decode(reader, reader.uint32()));
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.datetimeAttributes.push(DateTimeAttributeV2.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateCredentialRequestV2 {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      schemaId: isSet(object.schemaId) ? globalThis.String(object.schemaId) : "",
      issuerDid: isSet(object.issuerDid) ? globalThis.String(object.issuerDid) : "",
      holderDid: isSet(object.holderDid) ? globalThis.String(object.holderDid) : "",
      expiration: isSet(object.expiration) ? globalThis.Number(object.expiration) : 0,
      version: isSet(object.version) ? globalThis.Number(object.version) : undefined,
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
      apiManagedHost: isSet(object.apiManagedHost) ? globalThis.String(object.apiManagedHost) : "",
      stringAttributes: globalThis.Array.isArray(object?.stringAttributes)
        ? object.stringAttributes.map((e: any) => StringAttributeV2.fromJSON(e))
        : [],
      integerAttributes: globalThis.Array.isArray(object?.integerAttributes)
        ? object.integerAttributes.map((e: any) => IntegerAttributeV2.fromJSON(e))
        : [],
      decimalAttributes: globalThis.Array.isArray(object?.decimalAttributes)
        ? object.decimalAttributes.map((e: any) => DecimalAttributeV2.fromJSON(e))
        : [],
      booleanAttributes: globalThis.Array.isArray(object?.booleanAttributes)
        ? object.booleanAttributes.map((e: any) => BooleanAttributeV2.fromJSON(e))
        : [],
      dateAttributes: globalThis.Array.isArray(object?.dateAttributes)
        ? object.dateAttributes.map((e: any) => DateAttributeV2.fromJSON(e))
        : [],
      datetimeAttributes: globalThis.Array.isArray(object?.datetimeAttributes)
        ? object.datetimeAttributes.map((e: any) => DateTimeAttributeV2.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CreateCredentialRequestV2): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.schemaId !== "") {
      obj.schemaId = message.schemaId;
    }
    if (message.issuerDid !== "") {
      obj.issuerDid = message.issuerDid;
    }
    if (message.holderDid !== "") {
      obj.holderDid = message.holderDid;
    }
    if (message.expiration !== 0) {
      obj.expiration = Math.round(message.expiration);
    }
    if (message.version !== undefined) {
      obj.version = Math.round(message.version);
    }
    if (message.signer !== undefined) {
      obj.signer = Signer.toJSON(message.signer);
    }
    if (message.apiManagedHost !== "") {
      obj.apiManagedHost = message.apiManagedHost;
    }
    if (message.stringAttributes?.length) {
      obj.stringAttributes = message.stringAttributes.map((e) => StringAttributeV2.toJSON(e));
    }
    if (message.integerAttributes?.length) {
      obj.integerAttributes = message.integerAttributes.map((e) => IntegerAttributeV2.toJSON(e));
    }
    if (message.decimalAttributes?.length) {
      obj.decimalAttributes = message.decimalAttributes.map((e) => DecimalAttributeV2.toJSON(e));
    }
    if (message.booleanAttributes?.length) {
      obj.booleanAttributes = message.booleanAttributes.map((e) => BooleanAttributeV2.toJSON(e));
    }
    if (message.dateAttributes?.length) {
      obj.dateAttributes = message.dateAttributes.map((e) => DateAttributeV2.toJSON(e));
    }
    if (message.datetimeAttributes?.length) {
      obj.datetimeAttributes = message.datetimeAttributes.map((e) => DateTimeAttributeV2.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateCredentialRequestV2>, I>>(base?: I): CreateCredentialRequestV2 {
    return CreateCredentialRequestV2.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBuildSchemaRequestV2();
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

          message.displayName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.schemaType = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.version = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.description = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.issuerDid = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.stringAttributes.push(StringAttributeDefinitionV2.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.integerAttributes.push(IntegerAttributeDefinitionV2.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.decimalAttributes.push(DecimalAttributeDefinitionV2.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.booleanAttributes.push(BooleanAttributeDefinitionV2.decode(reader, reader.uint32()));
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.dateAttributes.push(DateAttributeDefinitionV2.decode(reader, reader.uint32()));
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.datetimeAttributes.push(DateTimeAttributeDefinitionV2.decode(reader, reader.uint32()));
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.stringEnumAttributes.push(StringEnumAttributeDefinitionV2.decode(reader, reader.uint32()));
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.integerEnumAttributes.push(IntegerEnumAttributeDefinitionV2.decode(reader, reader.uint32()));
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.decimalEnumAttributes.push(DecimalEnumAttributeDefinitionV2.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BuildSchemaRequestV2 {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      schemaType: isSet(object.schemaType) ? globalThis.String(object.schemaType) : "",
      version: isSet(object.version) ? globalThis.String(object.version) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      issuerDid: isSet(object.issuerDid) ? globalThis.String(object.issuerDid) : "",
      stringAttributes: globalThis.Array.isArray(object?.stringAttributes)
        ? object.stringAttributes.map((e: any) => StringAttributeDefinitionV2.fromJSON(e))
        : [],
      integerAttributes: globalThis.Array.isArray(object?.integerAttributes)
        ? object.integerAttributes.map((e: any) => IntegerAttributeDefinitionV2.fromJSON(e))
        : [],
      decimalAttributes: globalThis.Array.isArray(object?.decimalAttributes)
        ? object.decimalAttributes.map((e: any) => DecimalAttributeDefinitionV2.fromJSON(e))
        : [],
      booleanAttributes: globalThis.Array.isArray(object?.booleanAttributes)
        ? object.booleanAttributes.map((e: any) => BooleanAttributeDefinitionV2.fromJSON(e))
        : [],
      dateAttributes: globalThis.Array.isArray(object?.dateAttributes)
        ? object.dateAttributes.map((e: any) => DateAttributeDefinitionV2.fromJSON(e))
        : [],
      datetimeAttributes: globalThis.Array.isArray(object?.datetimeAttributes)
        ? object.datetimeAttributes.map((e: any) => DateTimeAttributeDefinitionV2.fromJSON(e))
        : [],
      stringEnumAttributes: globalThis.Array.isArray(object?.stringEnumAttributes)
        ? object.stringEnumAttributes.map((e: any) => StringEnumAttributeDefinitionV2.fromJSON(e))
        : [],
      integerEnumAttributes: globalThis.Array.isArray(object?.integerEnumAttributes)
        ? object.integerEnumAttributes.map((e: any) => IntegerEnumAttributeDefinitionV2.fromJSON(e))
        : [],
      decimalEnumAttributes: globalThis.Array.isArray(object?.decimalEnumAttributes)
        ? object.decimalEnumAttributes.map((e: any) => DecimalEnumAttributeDefinitionV2.fromJSON(e))
        : [],
    };
  },

  toJSON(message: BuildSchemaRequestV2): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.schemaType !== "") {
      obj.schemaType = message.schemaType;
    }
    if (message.version !== "") {
      obj.version = message.version;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.issuerDid !== "") {
      obj.issuerDid = message.issuerDid;
    }
    if (message.stringAttributes?.length) {
      obj.stringAttributes = message.stringAttributes.map((e) => StringAttributeDefinitionV2.toJSON(e));
    }
    if (message.integerAttributes?.length) {
      obj.integerAttributes = message.integerAttributes.map((e) => IntegerAttributeDefinitionV2.toJSON(e));
    }
    if (message.decimalAttributes?.length) {
      obj.decimalAttributes = message.decimalAttributes.map((e) => DecimalAttributeDefinitionV2.toJSON(e));
    }
    if (message.booleanAttributes?.length) {
      obj.booleanAttributes = message.booleanAttributes.map((e) => BooleanAttributeDefinitionV2.toJSON(e));
    }
    if (message.dateAttributes?.length) {
      obj.dateAttributes = message.dateAttributes.map((e) => DateAttributeDefinitionV2.toJSON(e));
    }
    if (message.datetimeAttributes?.length) {
      obj.datetimeAttributes = message.datetimeAttributes.map((e) => DateTimeAttributeDefinitionV2.toJSON(e));
    }
    if (message.stringEnumAttributes?.length) {
      obj.stringEnumAttributes = message.stringEnumAttributes.map((e) => StringEnumAttributeDefinitionV2.toJSON(e));
    }
    if (message.integerEnumAttributes?.length) {
      obj.integerEnumAttributes = message.integerEnumAttributes.map((e) => IntegerEnumAttributeDefinitionV2.toJSON(e));
    }
    if (message.decimalEnumAttributes?.length) {
      obj.decimalEnumAttributes = message.decimalEnumAttributes.map((e) => DecimalEnumAttributeDefinitionV2.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BuildSchemaRequestV2>, I>>(base?: I): BuildSchemaRequestV2 {
    return BuildSchemaRequestV2.fromPartial(base ?? ({} as any));
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

function createBaseCreateIdentityV2Request(): CreateIdentityV2Request {
  return { issuerKey: undefined, configData: undefined, didParams: undefined };
}

export const CreateIdentityV2Request = {
  encode(message: CreateIdentityV2Request, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.issuerKey !== undefined) {
      IdentityKey.encode(message.issuerKey, writer.uint32(10).fork()).ldelim();
    }
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(18).fork()).ldelim();
    }
    if (message.didParams !== undefined) {
      DidParams.encode(message.didParams, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateIdentityV2Request {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateIdentityV2Request();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.issuerKey = IdentityKey.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.configData = ConfigData.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.didParams = DidParams.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateIdentityV2Request {
    return {
      issuerKey: isSet(object.issuerKey) ? IdentityKey.fromJSON(object.issuerKey) : undefined,
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      didParams: isSet(object.didParams) ? DidParams.fromJSON(object.didParams) : undefined,
    };
  },

  toJSON(message: CreateIdentityV2Request): unknown {
    const obj: any = {};
    if (message.issuerKey !== undefined) {
      obj.issuerKey = IdentityKey.toJSON(message.issuerKey);
    }
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.didParams !== undefined) {
      obj.didParams = DidParams.toJSON(message.didParams);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateIdentityV2Request>, I>>(base?: I): CreateIdentityV2Request {
    return CreateIdentityV2Request.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateIdentityV2Request>, I>>(object: I): CreateIdentityV2Request {
    const message = createBaseCreateIdentityV2Request();
    message.issuerKey = (object.issuerKey !== undefined && object.issuerKey !== null)
      ? IdentityKey.fromPartial(object.issuerKey)
      : undefined;
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.didParams = (object.didParams !== undefined && object.didParams !== null)
      ? DidParams.fromPartial(object.didParams)
      : undefined;
    return message;
  },
};

function createBaseCreateIssuerRequest(): CreateIssuerRequest {
  return {
    issuerKey: undefined,
    configData: undefined,
    issuerParams: undefined,
    name: undefined,
    description: undefined,
    image: undefined,
    publishInterval: undefined,
  };
}

export const CreateIssuerRequest = {
  encode(message: CreateIssuerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.issuerKey !== undefined) {
      IdentityKey.encode(message.issuerKey, writer.uint32(10).fork()).ldelim();
    }
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(18).fork()).ldelim();
    }
    if (message.issuerParams !== undefined) {
      DidParams.encode(message.issuerParams, writer.uint32(26).fork()).ldelim();
    }
    if (message.name !== undefined) {
      writer.uint32(34).string(message.name);
    }
    if (message.description !== undefined) {
      writer.uint32(42).string(message.description);
    }
    if (message.image !== undefined) {
      writer.uint32(50).string(message.image);
    }
    if (message.publishInterval !== undefined) {
      writer.uint32(56).int64(message.publishInterval);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateIssuerRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateIssuerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.issuerKey = IdentityKey.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.configData = ConfigData.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.issuerParams = DidParams.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.name = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.description = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.image = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.publishInterval = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateIssuerRequest {
    return {
      issuerKey: isSet(object.issuerKey) ? IdentityKey.fromJSON(object.issuerKey) : undefined,
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      issuerParams: isSet(object.issuerParams) ? DidParams.fromJSON(object.issuerParams) : undefined,
      name: isSet(object.name) ? globalThis.String(object.name) : undefined,
      description: isSet(object.description) ? globalThis.String(object.description) : undefined,
      image: isSet(object.image) ? globalThis.String(object.image) : undefined,
      publishInterval: isSet(object.publishInterval) ? globalThis.Number(object.publishInterval) : undefined,
    };
  },

  toJSON(message: CreateIssuerRequest): unknown {
    const obj: any = {};
    if (message.issuerKey !== undefined) {
      obj.issuerKey = IdentityKey.toJSON(message.issuerKey);
    }
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.issuerParams !== undefined) {
      obj.issuerParams = DidParams.toJSON(message.issuerParams);
    }
    if (message.name !== undefined) {
      obj.name = message.name;
    }
    if (message.description !== undefined) {
      obj.description = message.description;
    }
    if (message.image !== undefined) {
      obj.image = message.image;
    }
    if (message.publishInterval !== undefined) {
      obj.publishInterval = Math.round(message.publishInterval);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateIssuerRequest>, I>>(base?: I): CreateIssuerRequest {
    return CreateIssuerRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateIssuerRequest>, I>>(object: I): CreateIssuerRequest {
    const message = createBaseCreateIssuerRequest();
    message.issuerKey = (object.issuerKey !== undefined && object.issuerKey !== null)
      ? IdentityKey.fromPartial(object.issuerKey)
      : undefined;
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.issuerParams = (object.issuerParams !== undefined && object.issuerParams !== null)
      ? DidParams.fromPartial(object.issuerParams)
      : undefined;
    message.name = object.name ?? undefined;
    message.description = object.description ?? undefined;
    message.image = object.image ?? undefined;
    message.publishInterval = object.publishInterval ?? undefined;
    return message;
  },
};

function createBaseGetIssuerByKeyRequest(): GetIssuerByKeyRequest {
  return { issuerKey: undefined, configData: undefined, issuerParams: undefined };
}

export const GetIssuerByKeyRequest = {
  encode(message: GetIssuerByKeyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.issuerKey !== undefined) {
      IdentityKey.encode(message.issuerKey, writer.uint32(10).fork()).ldelim();
    }
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(18).fork()).ldelim();
    }
    if (message.issuerParams !== undefined) {
      DidParams.encode(message.issuerParams, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetIssuerByKeyRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetIssuerByKeyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.issuerKey = IdentityKey.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.configData = ConfigData.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.issuerParams = DidParams.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetIssuerByKeyRequest {
    return {
      issuerKey: isSet(object.issuerKey) ? IdentityKey.fromJSON(object.issuerKey) : undefined,
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      issuerParams: isSet(object.issuerParams) ? DidParams.fromJSON(object.issuerParams) : undefined,
    };
  },

  toJSON(message: GetIssuerByKeyRequest): unknown {
    const obj: any = {};
    if (message.issuerKey !== undefined) {
      obj.issuerKey = IdentityKey.toJSON(message.issuerKey);
    }
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.issuerParams !== undefined) {
      obj.issuerParams = DidParams.toJSON(message.issuerParams);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetIssuerByKeyRequest>, I>>(base?: I): GetIssuerByKeyRequest {
    return GetIssuerByKeyRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetIssuerByKeyRequest>, I>>(object: I): GetIssuerByKeyRequest {
    const message = createBaseGetIssuerByKeyRequest();
    message.issuerKey = (object.issuerKey !== undefined && object.issuerKey !== null)
      ? IdentityKey.fromPartial(object.issuerKey)
      : undefined;
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.issuerParams = (object.issuerParams !== undefined && object.issuerParams !== null)
      ? DidParams.fromPartial(object.issuerParams)
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublishIssuerStateRequest();
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

          message.issuerDid = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.signer = Signer.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PublishIssuerStateRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      issuerDid: isSet(object.issuerDid) ? globalThis.String(object.issuerDid) : "",
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
    };
  },

  toJSON(message: PublishIssuerStateRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.issuerDid !== "") {
      obj.issuerDid = message.issuerDid;
    }
    if (message.signer !== undefined) {
      obj.signer = Signer.toJSON(message.signer);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PublishIssuerStateRequest>, I>>(base?: I): PublishIssuerStateRequest {
    return PublishIssuerStateRequest.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateCredentialResponseV2();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.credentialReceipt = CredentialReceiptV2.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
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
    if (message.credentialReceipt !== undefined) {
      obj.credentialReceipt = CredentialReceiptV2.toJSON(message.credentialReceipt);
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateCredentialResponseV2>, I>>(base?: I): CreateCredentialResponseV2 {
    return CreateCredentialResponseV2.fromPartial(base ?? ({} as any));
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

function createBaseCreateIdentityV2Response(): CreateIdentityV2Response {
  return { did: "", error: undefined };
}

export const CreateIdentityV2Response = {
  encode(message: CreateIdentityV2Response, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.did !== "") {
      writer.uint32(10).string(message.did);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateIdentityV2Response {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateIdentityV2Response();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.did = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateIdentityV2Response {
    return {
      did: isSet(object.did) ? globalThis.String(object.did) : "",
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: CreateIdentityV2Response): unknown {
    const obj: any = {};
    if (message.did !== "") {
      obj.did = message.did;
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateIdentityV2Response>, I>>(base?: I): CreateIdentityV2Response {
    return CreateIdentityV2Response.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateIdentityV2Response>, I>>(object: I): CreateIdentityV2Response {
    const message = createBaseCreateIdentityV2Response();
    message.did = object.did ?? "";
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateIssuerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.did = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateIssuerResponse {
    return {
      did: isSet(object.did) ? globalThis.String(object.did) : "",
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: CreateIssuerResponse): unknown {
    const obj: any = {};
    if (message.did !== "") {
      obj.did = message.did;
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateIssuerResponse>, I>>(base?: I): CreateIssuerResponse {
    return CreateIssuerResponse.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBuildSchemaResponseV2();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.schema = SchemaV2.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
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
    if (message.schema !== undefined) {
      obj.schema = SchemaV2.toJSON(message.schema);
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BuildSchemaResponseV2>, I>>(base?: I): BuildSchemaResponseV2 {
    return BuildSchemaResponseV2.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublishIssuerStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.stateReceipt = IssuerStateReceipt.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
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
    if (message.stateReceipt !== undefined) {
      obj.stateReceipt = IssuerStateReceipt.toJSON(message.stateReceipt);
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PublishIssuerStateResponse>, I>>(base?: I): PublishIssuerStateResponse {
    return PublishIssuerStateResponse.fromPartial(base ?? ({} as any));
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
  return { configData: undefined, credential: undefined, signer: undefined };
}

export const RevokeCredentialRequestV2 = {
  encode(message: RevokeCredentialRequestV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.credential !== undefined) {
      CredentialV2.encode(message.credential, writer.uint32(18).fork()).ldelim();
    }
    if (message.signer !== undefined) {
      Signer.encode(message.signer, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RevokeCredentialRequestV2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRevokeCredentialRequestV2();
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

          message.credential = CredentialV2.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.signer = Signer.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RevokeCredentialRequestV2 {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      credential: isSet(object.credential) ? CredentialV2.fromJSON(object.credential) : undefined,
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
    };
  },

  toJSON(message: RevokeCredentialRequestV2): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.credential !== undefined) {
      obj.credential = CredentialV2.toJSON(message.credential);
    }
    if (message.signer !== undefined) {
      obj.signer = Signer.toJSON(message.signer);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RevokeCredentialRequestV2>, I>>(base?: I): RevokeCredentialRequestV2 {
    return RevokeCredentialRequestV2.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RevokeCredentialRequestV2>, I>>(object: I): RevokeCredentialRequestV2 {
    const message = createBaseRevokeCredentialRequestV2();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.credential = (object.credential !== undefined && object.credential !== null)
      ? CredentialV2.fromPartial(object.credential)
      : undefined;
    message.signer = (object.signer !== undefined && object.signer !== null)
      ? Signer.fromPartial(object.signer)
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRevokeCredentialResponseV2();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.result = CredentialRevocationV2.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
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
    if (message.result !== undefined) {
      obj.result = CredentialRevocationV2.toJSON(message.result);
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RevokeCredentialResponseV2>, I>>(base?: I): RevokeCredentialResponseV2 {
    return RevokeCredentialResponseV2.fromPartial(base ?? ({} as any));
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
  CreateIdentity(request: CreateIdentityV2Request): Promise<CreateIdentityV2Response>;
  CreateIssuer(request: CreateIssuerRequest): Promise<CreateIssuerResponse>;
  GetIssuerList(request: GetIssuerListRequest): Promise<GetIssuerListResponse>;
  GetIssuerByKey(request: GetIssuerByKeyRequest): Promise<GetIssuerByKeyResponse>;
  BuildSchema(request: BuildSchemaRequestV2): Promise<BuildSchemaResponseV2>;
  GetSchema(request: GetSchemaRequestV2): Promise<GetSchemaResponseV2>;
  CreateCredential(request: CreateCredentialRequestV2): Promise<CreateCredentialResponseV2>;
  GetCredentialProof(request: GetCredentialProofRequest): Promise<GetCredentialProofResponse>;
  RevokeCredential(request: RevokeCredentialRequestV2): Promise<RevokeCredentialResponseV2>;
  CredentialToJson(request: CredentialToJsonRequestV2): Promise<CredentialToJsonResponseV2>;
  CredentialFromJson(request: CredentialFromJsonRequestV2): Promise<CredentialFromJsonResponseV2>;
  PublishIssuerState(request: PublishIssuerStateRequest): Promise<PublishIssuerStateResponse>;
}

export const IdentityServiceV2ServiceName = "bloock.IdentityServiceV2";
export class IdentityServiceV2ClientImpl implements IdentityServiceV2 {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || IdentityServiceV2ServiceName;
    this.rpc = rpc;
    this.CreateIdentity = this.CreateIdentity.bind(this);
    this.CreateIssuer = this.CreateIssuer.bind(this);
    this.GetIssuerList = this.GetIssuerList.bind(this);
    this.GetIssuerByKey = this.GetIssuerByKey.bind(this);
    this.BuildSchema = this.BuildSchema.bind(this);
    this.GetSchema = this.GetSchema.bind(this);
    this.CreateCredential = this.CreateCredential.bind(this);
    this.GetCredentialProof = this.GetCredentialProof.bind(this);
    this.RevokeCredential = this.RevokeCredential.bind(this);
    this.CredentialToJson = this.CredentialToJson.bind(this);
    this.CredentialFromJson = this.CredentialFromJson.bind(this);
    this.PublishIssuerState = this.PublishIssuerState.bind(this);
  }
  CreateIdentity(request: CreateIdentityV2Request): Promise<CreateIdentityV2Response> {
    const data = CreateIdentityV2Request.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateIdentity", data);
    return promise.then((data) => CreateIdentityV2Response.decode(_m0.Reader.create(data)));
  }

  CreateIssuer(request: CreateIssuerRequest): Promise<CreateIssuerResponse> {
    const data = CreateIssuerRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateIssuer", data);
    return promise.then((data) => CreateIssuerResponse.decode(_m0.Reader.create(data)));
  }

  GetIssuerList(request: GetIssuerListRequest): Promise<GetIssuerListResponse> {
    const data = GetIssuerListRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetIssuerList", data);
    return promise.then((data) => GetIssuerListResponse.decode(_m0.Reader.create(data)));
  }

  GetIssuerByKey(request: GetIssuerByKeyRequest): Promise<GetIssuerByKeyResponse> {
    const data = GetIssuerByKeyRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetIssuerByKey", data);
    return promise.then((data) => GetIssuerByKeyResponse.decode(_m0.Reader.create(data)));
  }

  BuildSchema(request: BuildSchemaRequestV2): Promise<BuildSchemaResponseV2> {
    const data = BuildSchemaRequestV2.encode(request).finish();
    const promise = this.rpc.request(this.service, "BuildSchema", data);
    return promise.then((data) => BuildSchemaResponseV2.decode(_m0.Reader.create(data)));
  }

  GetSchema(request: GetSchemaRequestV2): Promise<GetSchemaResponseV2> {
    const data = GetSchemaRequestV2.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetSchema", data);
    return promise.then((data) => GetSchemaResponseV2.decode(_m0.Reader.create(data)));
  }

  CreateCredential(request: CreateCredentialRequestV2): Promise<CreateCredentialResponseV2> {
    const data = CreateCredentialRequestV2.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateCredential", data);
    return promise.then((data) => CreateCredentialResponseV2.decode(_m0.Reader.create(data)));
  }

  GetCredentialProof(request: GetCredentialProofRequest): Promise<GetCredentialProofResponse> {
    const data = GetCredentialProofRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetCredentialProof", data);
    return promise.then((data) => GetCredentialProofResponse.decode(_m0.Reader.create(data)));
  }

  RevokeCredential(request: RevokeCredentialRequestV2): Promise<RevokeCredentialResponseV2> {
    const data = RevokeCredentialRequestV2.encode(request).finish();
    const promise = this.rpc.request(this.service, "RevokeCredential", data);
    return promise.then((data) => RevokeCredentialResponseV2.decode(_m0.Reader.create(data)));
  }

  CredentialToJson(request: CredentialToJsonRequestV2): Promise<CredentialToJsonResponseV2> {
    const data = CredentialToJsonRequestV2.encode(request).finish();
    const promise = this.rpc.request(this.service, "CredentialToJson", data);
    return promise.then((data) => CredentialToJsonResponseV2.decode(_m0.Reader.create(data)));
  }

  CredentialFromJson(request: CredentialFromJsonRequestV2): Promise<CredentialFromJsonResponseV2> {
    const data = CredentialFromJsonRequestV2.encode(request).finish();
    const promise = this.rpc.request(this.service, "CredentialFromJson", data);
    return promise.then((data) => CredentialFromJsonResponseV2.decode(_m0.Reader.create(data)));
  }

  PublishIssuerState(request: PublishIssuerStateRequest): Promise<PublishIssuerStateResponse> {
    const data = PublishIssuerStateRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "PublishIssuerState", data);
    return promise.then((data) => PublishIssuerStateResponse.decode(_m0.Reader.create(data)));
  }
}

export type IdentityServiceV2Definition = typeof IdentityServiceV2Definition;
export const IdentityServiceV2Definition = {
  name: "IdentityServiceV2",
  fullName: "bloock.IdentityServiceV2",
  methods: {
    createIdentity: {
      name: "CreateIdentity",
      requestType: CreateIdentityV2Request,
      requestStream: false,
      responseType: CreateIdentityV2Response,
      responseStream: false,
      options: {},
    },
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
    getSchema: {
      name: "GetSchema",
      requestType: GetSchemaRequestV2,
      requestStream: false,
      responseType: GetSchemaResponseV2,
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
