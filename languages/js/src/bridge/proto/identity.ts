/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { ConfigData } from "./config";
import {
  BooleanAttribute,
  BooleanAttributeDefinition,
  Credential,
  CredentialProof,
  CredentialReceipt,
  CredentialRevocation,
  DateAttribute,
  DateAttributeDefinition,
  DateTimeAttribute,
  DateTimeAttributeDefinition,
  DecimalAttribute,
  DecimalAttributeDefinition,
  DecimalEnumAttributeDefinition,
  DidType,
  IntegerAttribute,
  IntegerAttributeDefinition,
  IntegerEnumAttributeDefinition,
  IssuerStateReceipt,
  PublishInterval,
  publishIntervalFromJSON,
  publishIntervalToJSON,
  Schema,
  StringAttribute,
  StringAttributeDefinition,
  StringEnumAttributeDefinition,
  VerificationReceipt,
} from "./identity_entities";
import { Key } from "./keys_entities";
import { Error } from "./shared";

export interface GetSchemaRequest {
  configData?: ConfigData | undefined;
  id: string;
}

export interface GetSchemaResponse {
  schema?: Schema | undefined;
  error?: Error | undefined;
}

export interface ImportIssuerResponse {
  did: string;
  error?: Error | undefined;
}

export interface GetCredentialProofRequest {
  configData?: ConfigData | undefined;
  issuerDid: string;
  credentialId: string;
}

export interface GetCredentialProofResponse {
  proof?: CredentialProof | undefined;
  error?: Error | undefined;
}

export interface CredentialToJsonRequest {
  configData?: ConfigData | undefined;
  credential?: Credential | undefined;
}

export interface CredentialToJsonResponse {
  json: string;
  error?: Error | undefined;
}

export interface CredentialFromJsonRequest {
  configData?: ConfigData | undefined;
  json: string;
}

export interface CredentialFromJsonResponse {
  credential?: Credential | undefined;
  error?: Error | undefined;
}

export interface CreateCredentialRequest {
  configData?: ConfigData | undefined;
  schemaId: string;
  holderDid: string;
  expiration: number;
  version?: number | undefined;
  key?: Key | undefined;
  stringAttributes: StringAttribute[];
  integerAttributes: IntegerAttribute[];
  decimalAttributes: DecimalAttribute[];
  booleanAttributes: BooleanAttribute[];
  dateAttributes: DateAttribute[];
  datetimeAttributes: DateTimeAttribute[];
}

export interface BuildSchemaRequest {
  configData?: ConfigData | undefined;
  displayName: string;
  schemaType: string;
  version: string;
  description: string;
  stringAttributes: StringAttributeDefinition[];
  integerAttributes: IntegerAttributeDefinition[];
  decimalAttributes: DecimalAttributeDefinition[];
  booleanAttributes: BooleanAttributeDefinition[];
  dateAttributes: DateAttributeDefinition[];
  datetimeAttributes: DateTimeAttributeDefinition[];
  stringEnumAttributes: StringEnumAttributeDefinition[];
  integerEnumAttributes: IntegerEnumAttributeDefinition[];
  decimalEnumAttributes: DecimalEnumAttributeDefinition[];
}

export interface CreateHolderRequest {
  key?: Key | undefined;
  configData?: ConfigData | undefined;
  didType?: DidType | undefined;
}

export interface CreateIssuerRequest {
  key?: Key | undefined;
  configData?: ConfigData | undefined;
  didType?: DidType | undefined;
  name?: string | undefined;
  description?: string | undefined;
  image?: string | undefined;
  publishInterval: PublishInterval;
}

export interface ImportIssuerRequest {
  key?: Key | undefined;
  configData?: ConfigData | undefined;
  didType?: DidType | undefined;
}

export interface ForcePublishIssuerStateRequest {
  configData?: ConfigData | undefined;
  issuerDid: string;
  key?: Key | undefined;
}

export interface CreateCredentialResponse {
  credentialReceipt?: CredentialReceipt | undefined;
  error?: Error | undefined;
}

export interface CreateHolderResponse {
  did: string;
  error?: Error | undefined;
}

export interface CreateIssuerResponse {
  did: string;
  error?: Error | undefined;
}

export interface BuildSchemaResponse {
  schema?: Schema | undefined;
  error?: Error | undefined;
}

export interface ForcePublishIssuerStateResponse {
  stateReceipt?: IssuerStateReceipt | undefined;
  error?: Error | undefined;
}

export interface RevokeCredentialRequest {
  configData?: ConfigData | undefined;
  credential?: Credential | undefined;
  key?: Key | undefined;
}

export interface RevokeCredentialResponse {
  result?: CredentialRevocation | undefined;
  error?: Error | undefined;
}

export interface CreateVerificationRequest {
  configData?: ConfigData | undefined;
  proofRequest: string;
}

export interface CreateVerificationResponse {
  result?: VerificationReceipt | undefined;
  error?: Error | undefined;
}

export interface WaitVerificationRequest {
  configData?: ConfigData | undefined;
  sessionId: number;
  timeout: number;
}

export interface WaitVerificationResponse {
  status: boolean;
  error?: Error | undefined;
}

export interface GetVerificationStatusRequest {
  configData?: ConfigData | undefined;
  sessionId: number;
}

export interface GetVerificationStatusResponse {
  status: boolean;
  error?: Error | undefined;
}

export interface GetCredentialRequest {
  configData?: ConfigData | undefined;
  credentialId: string;
}

export interface GetCredentialResponse {
  credential?: Credential | undefined;
  error?: Error | undefined;
}

export interface GetCredentialOfferRequest {
  configData?: ConfigData | undefined;
  credentialId: string;
  key?: Key | undefined;
}

export interface GetCredentialOfferResponse {
  credentialOffer: string;
  error?: Error | undefined;
}

function createBaseGetSchemaRequest(): GetSchemaRequest {
  return { configData: undefined, id: "" };
}

export const GetSchemaRequest = {
  encode(message: GetSchemaRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSchemaRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSchemaRequest();
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

  fromJSON(object: any): GetSchemaRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
    };
  },

  toJSON(message: GetSchemaRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetSchemaRequest>, I>>(base?: I): GetSchemaRequest {
    return GetSchemaRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetSchemaRequest>, I>>(object: I): GetSchemaRequest {
    const message = createBaseGetSchemaRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseGetSchemaResponse(): GetSchemaResponse {
  return { schema: undefined, error: undefined };
}

export const GetSchemaResponse = {
  encode(message: GetSchemaResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.schema !== undefined) {
      Schema.encode(message.schema, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSchemaResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSchemaResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.schema = Schema.decode(reader, reader.uint32());
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

  fromJSON(object: any): GetSchemaResponse {
    return {
      schema: isSet(object.schema) ? Schema.fromJSON(object.schema) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GetSchemaResponse): unknown {
    const obj: any = {};
    if (message.schema !== undefined) {
      obj.schema = Schema.toJSON(message.schema);
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetSchemaResponse>, I>>(base?: I): GetSchemaResponse {
    return GetSchemaResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetSchemaResponse>, I>>(object: I): GetSchemaResponse {
    const message = createBaseGetSchemaResponse();
    message.schema = (object.schema !== undefined && object.schema !== null)
      ? Schema.fromPartial(object.schema)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseImportIssuerResponse(): ImportIssuerResponse {
  return { did: "", error: undefined };
}

export const ImportIssuerResponse = {
  encode(message: ImportIssuerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.did !== "") {
      writer.uint32(10).string(message.did);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImportIssuerResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImportIssuerResponse();
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

  fromJSON(object: any): ImportIssuerResponse {
    return {
      did: isSet(object.did) ? globalThis.String(object.did) : "",
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: ImportIssuerResponse): unknown {
    const obj: any = {};
    if (message.did !== "") {
      obj.did = message.did;
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ImportIssuerResponse>, I>>(base?: I): ImportIssuerResponse {
    return ImportIssuerResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ImportIssuerResponse>, I>>(object: I): ImportIssuerResponse {
    const message = createBaseImportIssuerResponse();
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
      CredentialProof.encode(message.proof, writer.uint32(10).fork()).ldelim();
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

          message.proof = CredentialProof.decode(reader, reader.uint32());
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
      proof: isSet(object.proof) ? CredentialProof.fromJSON(object.proof) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GetCredentialProofResponse): unknown {
    const obj: any = {};
    if (message.proof !== undefined) {
      obj.proof = CredentialProof.toJSON(message.proof);
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
      ? CredentialProof.fromPartial(object.proof)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseCredentialToJsonRequest(): CredentialToJsonRequest {
  return { configData: undefined, credential: undefined };
}

export const CredentialToJsonRequest = {
  encode(message: CredentialToJsonRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.credential !== undefined) {
      Credential.encode(message.credential, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialToJsonRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialToJsonRequest();
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

          message.credential = Credential.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CredentialToJsonRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      credential: isSet(object.credential) ? Credential.fromJSON(object.credential) : undefined,
    };
  },

  toJSON(message: CredentialToJsonRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.credential !== undefined) {
      obj.credential = Credential.toJSON(message.credential);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CredentialToJsonRequest>, I>>(base?: I): CredentialToJsonRequest {
    return CredentialToJsonRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CredentialToJsonRequest>, I>>(object: I): CredentialToJsonRequest {
    const message = createBaseCredentialToJsonRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.credential = (object.credential !== undefined && object.credential !== null)
      ? Credential.fromPartial(object.credential)
      : undefined;
    return message;
  },
};

function createBaseCredentialToJsonResponse(): CredentialToJsonResponse {
  return { json: "", error: undefined };
}

export const CredentialToJsonResponse = {
  encode(message: CredentialToJsonResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.json !== "") {
      writer.uint32(10).string(message.json);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialToJsonResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialToJsonResponse();
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

  fromJSON(object: any): CredentialToJsonResponse {
    return {
      json: isSet(object.json) ? globalThis.String(object.json) : "",
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: CredentialToJsonResponse): unknown {
    const obj: any = {};
    if (message.json !== "") {
      obj.json = message.json;
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CredentialToJsonResponse>, I>>(base?: I): CredentialToJsonResponse {
    return CredentialToJsonResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CredentialToJsonResponse>, I>>(object: I): CredentialToJsonResponse {
    const message = createBaseCredentialToJsonResponse();
    message.json = object.json ?? "";
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseCredentialFromJsonRequest(): CredentialFromJsonRequest {
  return { configData: undefined, json: "" };
}

export const CredentialFromJsonRequest = {
  encode(message: CredentialFromJsonRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.json !== "") {
      writer.uint32(18).string(message.json);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialFromJsonRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialFromJsonRequest();
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

  fromJSON(object: any): CredentialFromJsonRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      json: isSet(object.json) ? globalThis.String(object.json) : "",
    };
  },

  toJSON(message: CredentialFromJsonRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.json !== "") {
      obj.json = message.json;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CredentialFromJsonRequest>, I>>(base?: I): CredentialFromJsonRequest {
    return CredentialFromJsonRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CredentialFromJsonRequest>, I>>(object: I): CredentialFromJsonRequest {
    const message = createBaseCredentialFromJsonRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.json = object.json ?? "";
    return message;
  },
};

function createBaseCredentialFromJsonResponse(): CredentialFromJsonResponse {
  return { credential: undefined, error: undefined };
}

export const CredentialFromJsonResponse = {
  encode(message: CredentialFromJsonResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.credential !== undefined) {
      Credential.encode(message.credential, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialFromJsonResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialFromJsonResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.credential = Credential.decode(reader, reader.uint32());
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

  fromJSON(object: any): CredentialFromJsonResponse {
    return {
      credential: isSet(object.credential) ? Credential.fromJSON(object.credential) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: CredentialFromJsonResponse): unknown {
    const obj: any = {};
    if (message.credential !== undefined) {
      obj.credential = Credential.toJSON(message.credential);
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CredentialFromJsonResponse>, I>>(base?: I): CredentialFromJsonResponse {
    return CredentialFromJsonResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CredentialFromJsonResponse>, I>>(object: I): CredentialFromJsonResponse {
    const message = createBaseCredentialFromJsonResponse();
    message.credential = (object.credential !== undefined && object.credential !== null)
      ? Credential.fromPartial(object.credential)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseCreateCredentialRequest(): CreateCredentialRequest {
  return {
    configData: undefined,
    schemaId: "",
    holderDid: "",
    expiration: 0,
    version: undefined,
    key: undefined,
    stringAttributes: [],
    integerAttributes: [],
    decimalAttributes: [],
    booleanAttributes: [],
    dateAttributes: [],
    datetimeAttributes: [],
  };
}

export const CreateCredentialRequest = {
  encode(message: CreateCredentialRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.schemaId !== "") {
      writer.uint32(18).string(message.schemaId);
    }
    if (message.holderDid !== "") {
      writer.uint32(26).string(message.holderDid);
    }
    if (message.expiration !== 0) {
      writer.uint32(32).int64(message.expiration);
    }
    if (message.version !== undefined) {
      writer.uint32(40).int32(message.version);
    }
    if (message.key !== undefined) {
      Key.encode(message.key, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.stringAttributes) {
      StringAttribute.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.integerAttributes) {
      IntegerAttribute.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.decimalAttributes) {
      DecimalAttribute.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.booleanAttributes) {
      BooleanAttribute.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    for (const v of message.dateAttributes) {
      DateAttribute.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    for (const v of message.datetimeAttributes) {
      DateTimeAttribute.encode(v!, writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateCredentialRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateCredentialRequest();
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

          message.holderDid = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.expiration = longToNumber(reader.int64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.version = reader.int32();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.key = Key.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.stringAttributes.push(StringAttribute.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.integerAttributes.push(IntegerAttribute.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.decimalAttributes.push(DecimalAttribute.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.booleanAttributes.push(BooleanAttribute.decode(reader, reader.uint32()));
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.dateAttributes.push(DateAttribute.decode(reader, reader.uint32()));
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.datetimeAttributes.push(DateTimeAttribute.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateCredentialRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      schemaId: isSet(object.schemaId) ? globalThis.String(object.schemaId) : "",
      holderDid: isSet(object.holderDid) ? globalThis.String(object.holderDid) : "",
      expiration: isSet(object.expiration) ? globalThis.Number(object.expiration) : 0,
      version: isSet(object.version) ? globalThis.Number(object.version) : undefined,
      key: isSet(object.key) ? Key.fromJSON(object.key) : undefined,
      stringAttributes: globalThis.Array.isArray(object?.stringAttributes)
        ? object.stringAttributes.map((e: any) => StringAttribute.fromJSON(e))
        : [],
      integerAttributes: globalThis.Array.isArray(object?.integerAttributes)
        ? object.integerAttributes.map((e: any) => IntegerAttribute.fromJSON(e))
        : [],
      decimalAttributes: globalThis.Array.isArray(object?.decimalAttributes)
        ? object.decimalAttributes.map((e: any) => DecimalAttribute.fromJSON(e))
        : [],
      booleanAttributes: globalThis.Array.isArray(object?.booleanAttributes)
        ? object.booleanAttributes.map((e: any) => BooleanAttribute.fromJSON(e))
        : [],
      dateAttributes: globalThis.Array.isArray(object?.dateAttributes)
        ? object.dateAttributes.map((e: any) => DateAttribute.fromJSON(e))
        : [],
      datetimeAttributes: globalThis.Array.isArray(object?.datetimeAttributes)
        ? object.datetimeAttributes.map((e: any) => DateTimeAttribute.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CreateCredentialRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.schemaId !== "") {
      obj.schemaId = message.schemaId;
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
    if (message.key !== undefined) {
      obj.key = Key.toJSON(message.key);
    }
    if (message.stringAttributes?.length) {
      obj.stringAttributes = message.stringAttributes.map((e) => StringAttribute.toJSON(e));
    }
    if (message.integerAttributes?.length) {
      obj.integerAttributes = message.integerAttributes.map((e) => IntegerAttribute.toJSON(e));
    }
    if (message.decimalAttributes?.length) {
      obj.decimalAttributes = message.decimalAttributes.map((e) => DecimalAttribute.toJSON(e));
    }
    if (message.booleanAttributes?.length) {
      obj.booleanAttributes = message.booleanAttributes.map((e) => BooleanAttribute.toJSON(e));
    }
    if (message.dateAttributes?.length) {
      obj.dateAttributes = message.dateAttributes.map((e) => DateAttribute.toJSON(e));
    }
    if (message.datetimeAttributes?.length) {
      obj.datetimeAttributes = message.datetimeAttributes.map((e) => DateTimeAttribute.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateCredentialRequest>, I>>(base?: I): CreateCredentialRequest {
    return CreateCredentialRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateCredentialRequest>, I>>(object: I): CreateCredentialRequest {
    const message = createBaseCreateCredentialRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.schemaId = object.schemaId ?? "";
    message.holderDid = object.holderDid ?? "";
    message.expiration = object.expiration ?? 0;
    message.version = object.version ?? undefined;
    message.key = (object.key !== undefined && object.key !== null) ? Key.fromPartial(object.key) : undefined;
    message.stringAttributes = object.stringAttributes?.map((e) => StringAttribute.fromPartial(e)) || [];
    message.integerAttributes = object.integerAttributes?.map((e) => IntegerAttribute.fromPartial(e)) || [];
    message.decimalAttributes = object.decimalAttributes?.map((e) => DecimalAttribute.fromPartial(e)) || [];
    message.booleanAttributes = object.booleanAttributes?.map((e) => BooleanAttribute.fromPartial(e)) || [];
    message.dateAttributes = object.dateAttributes?.map((e) => DateAttribute.fromPartial(e)) || [];
    message.datetimeAttributes = object.datetimeAttributes?.map((e) => DateTimeAttribute.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBuildSchemaRequest(): BuildSchemaRequest {
  return {
    configData: undefined,
    displayName: "",
    schemaType: "",
    version: "",
    description: "",
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

export const BuildSchemaRequest = {
  encode(message: BuildSchemaRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
    for (const v of message.stringAttributes) {
      StringAttributeDefinition.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.integerAttributes) {
      IntegerAttributeDefinition.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.decimalAttributes) {
      DecimalAttributeDefinition.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.booleanAttributes) {
      BooleanAttributeDefinition.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.dateAttributes) {
      DateAttributeDefinition.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    for (const v of message.datetimeAttributes) {
      DateTimeAttributeDefinition.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    for (const v of message.stringEnumAttributes) {
      StringEnumAttributeDefinition.encode(v!, writer.uint32(98).fork()).ldelim();
    }
    for (const v of message.integerEnumAttributes) {
      IntegerEnumAttributeDefinition.encode(v!, writer.uint32(106).fork()).ldelim();
    }
    for (const v of message.decimalEnumAttributes) {
      DecimalEnumAttributeDefinition.encode(v!, writer.uint32(114).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BuildSchemaRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBuildSchemaRequest();
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

          message.stringAttributes.push(StringAttributeDefinition.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.integerAttributes.push(IntegerAttributeDefinition.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.decimalAttributes.push(DecimalAttributeDefinition.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.booleanAttributes.push(BooleanAttributeDefinition.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.dateAttributes.push(DateAttributeDefinition.decode(reader, reader.uint32()));
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.datetimeAttributes.push(DateTimeAttributeDefinition.decode(reader, reader.uint32()));
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.stringEnumAttributes.push(StringEnumAttributeDefinition.decode(reader, reader.uint32()));
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.integerEnumAttributes.push(IntegerEnumAttributeDefinition.decode(reader, reader.uint32()));
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.decimalEnumAttributes.push(DecimalEnumAttributeDefinition.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BuildSchemaRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      schemaType: isSet(object.schemaType) ? globalThis.String(object.schemaType) : "",
      version: isSet(object.version) ? globalThis.String(object.version) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      stringAttributes: globalThis.Array.isArray(object?.stringAttributes)
        ? object.stringAttributes.map((e: any) => StringAttributeDefinition.fromJSON(e))
        : [],
      integerAttributes: globalThis.Array.isArray(object?.integerAttributes)
        ? object.integerAttributes.map((e: any) => IntegerAttributeDefinition.fromJSON(e))
        : [],
      decimalAttributes: globalThis.Array.isArray(object?.decimalAttributes)
        ? object.decimalAttributes.map((e: any) => DecimalAttributeDefinition.fromJSON(e))
        : [],
      booleanAttributes: globalThis.Array.isArray(object?.booleanAttributes)
        ? object.booleanAttributes.map((e: any) => BooleanAttributeDefinition.fromJSON(e))
        : [],
      dateAttributes: globalThis.Array.isArray(object?.dateAttributes)
        ? object.dateAttributes.map((e: any) => DateAttributeDefinition.fromJSON(e))
        : [],
      datetimeAttributes: globalThis.Array.isArray(object?.datetimeAttributes)
        ? object.datetimeAttributes.map((e: any) => DateTimeAttributeDefinition.fromJSON(e))
        : [],
      stringEnumAttributes: globalThis.Array.isArray(object?.stringEnumAttributes)
        ? object.stringEnumAttributes.map((e: any) => StringEnumAttributeDefinition.fromJSON(e))
        : [],
      integerEnumAttributes: globalThis.Array.isArray(object?.integerEnumAttributes)
        ? object.integerEnumAttributes.map((e: any) => IntegerEnumAttributeDefinition.fromJSON(e))
        : [],
      decimalEnumAttributes: globalThis.Array.isArray(object?.decimalEnumAttributes)
        ? object.decimalEnumAttributes.map((e: any) => DecimalEnumAttributeDefinition.fromJSON(e))
        : [],
    };
  },

  toJSON(message: BuildSchemaRequest): unknown {
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
    if (message.stringAttributes?.length) {
      obj.stringAttributes = message.stringAttributes.map((e) => StringAttributeDefinition.toJSON(e));
    }
    if (message.integerAttributes?.length) {
      obj.integerAttributes = message.integerAttributes.map((e) => IntegerAttributeDefinition.toJSON(e));
    }
    if (message.decimalAttributes?.length) {
      obj.decimalAttributes = message.decimalAttributes.map((e) => DecimalAttributeDefinition.toJSON(e));
    }
    if (message.booleanAttributes?.length) {
      obj.booleanAttributes = message.booleanAttributes.map((e) => BooleanAttributeDefinition.toJSON(e));
    }
    if (message.dateAttributes?.length) {
      obj.dateAttributes = message.dateAttributes.map((e) => DateAttributeDefinition.toJSON(e));
    }
    if (message.datetimeAttributes?.length) {
      obj.datetimeAttributes = message.datetimeAttributes.map((e) => DateTimeAttributeDefinition.toJSON(e));
    }
    if (message.stringEnumAttributes?.length) {
      obj.stringEnumAttributes = message.stringEnumAttributes.map((e) => StringEnumAttributeDefinition.toJSON(e));
    }
    if (message.integerEnumAttributes?.length) {
      obj.integerEnumAttributes = message.integerEnumAttributes.map((e) => IntegerEnumAttributeDefinition.toJSON(e));
    }
    if (message.decimalEnumAttributes?.length) {
      obj.decimalEnumAttributes = message.decimalEnumAttributes.map((e) => DecimalEnumAttributeDefinition.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BuildSchemaRequest>, I>>(base?: I): BuildSchemaRequest {
    return BuildSchemaRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BuildSchemaRequest>, I>>(object: I): BuildSchemaRequest {
    const message = createBaseBuildSchemaRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.displayName = object.displayName ?? "";
    message.schemaType = object.schemaType ?? "";
    message.version = object.version ?? "";
    message.description = object.description ?? "";
    message.stringAttributes = object.stringAttributes?.map((e) => StringAttributeDefinition.fromPartial(e)) || [];
    message.integerAttributes = object.integerAttributes?.map((e) => IntegerAttributeDefinition.fromPartial(e)) || [];
    message.decimalAttributes = object.decimalAttributes?.map((e) => DecimalAttributeDefinition.fromPartial(e)) || [];
    message.booleanAttributes = object.booleanAttributes?.map((e) => BooleanAttributeDefinition.fromPartial(e)) || [];
    message.dateAttributes = object.dateAttributes?.map((e) => DateAttributeDefinition.fromPartial(e)) || [];
    message.datetimeAttributes = object.datetimeAttributes?.map((e) => DateTimeAttributeDefinition.fromPartial(e)) ||
      [];
    message.stringEnumAttributes =
      object.stringEnumAttributes?.map((e) => StringEnumAttributeDefinition.fromPartial(e)) || [];
    message.integerEnumAttributes =
      object.integerEnumAttributes?.map((e) => IntegerEnumAttributeDefinition.fromPartial(e)) || [];
    message.decimalEnumAttributes =
      object.decimalEnumAttributes?.map((e) => DecimalEnumAttributeDefinition.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCreateHolderRequest(): CreateHolderRequest {
  return { key: undefined, configData: undefined, didType: undefined };
}

export const CreateHolderRequest = {
  encode(message: CreateHolderRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== undefined) {
      Key.encode(message.key, writer.uint32(10).fork()).ldelim();
    }
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(18).fork()).ldelim();
    }
    if (message.didType !== undefined) {
      DidType.encode(message.didType, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateHolderRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateHolderRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = Key.decode(reader, reader.uint32());
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

          message.didType = DidType.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateHolderRequest {
    return {
      key: isSet(object.key) ? Key.fromJSON(object.key) : undefined,
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      didType: isSet(object.didType) ? DidType.fromJSON(object.didType) : undefined,
    };
  },

  toJSON(message: CreateHolderRequest): unknown {
    const obj: any = {};
    if (message.key !== undefined) {
      obj.key = Key.toJSON(message.key);
    }
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.didType !== undefined) {
      obj.didType = DidType.toJSON(message.didType);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateHolderRequest>, I>>(base?: I): CreateHolderRequest {
    return CreateHolderRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateHolderRequest>, I>>(object: I): CreateHolderRequest {
    const message = createBaseCreateHolderRequest();
    message.key = (object.key !== undefined && object.key !== null) ? Key.fromPartial(object.key) : undefined;
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.didType = (object.didType !== undefined && object.didType !== null)
      ? DidType.fromPartial(object.didType)
      : undefined;
    return message;
  },
};

function createBaseCreateIssuerRequest(): CreateIssuerRequest {
  return {
    key: undefined,
    configData: undefined,
    didType: undefined,
    name: undefined,
    description: undefined,
    image: undefined,
    publishInterval: 0,
  };
}

export const CreateIssuerRequest = {
  encode(message: CreateIssuerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== undefined) {
      Key.encode(message.key, writer.uint32(10).fork()).ldelim();
    }
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(18).fork()).ldelim();
    }
    if (message.didType !== undefined) {
      DidType.encode(message.didType, writer.uint32(26).fork()).ldelim();
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
    if (message.publishInterval !== 0) {
      writer.uint32(56).int32(message.publishInterval);
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

          message.key = Key.decode(reader, reader.uint32());
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

          message.didType = DidType.decode(reader, reader.uint32());
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

          message.publishInterval = reader.int32() as any;
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
      key: isSet(object.key) ? Key.fromJSON(object.key) : undefined,
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      didType: isSet(object.didType) ? DidType.fromJSON(object.didType) : undefined,
      name: isSet(object.name) ? globalThis.String(object.name) : undefined,
      description: isSet(object.description) ? globalThis.String(object.description) : undefined,
      image: isSet(object.image) ? globalThis.String(object.image) : undefined,
      publishInterval: isSet(object.publishInterval) ? publishIntervalFromJSON(object.publishInterval) : 0,
    };
  },

  toJSON(message: CreateIssuerRequest): unknown {
    const obj: any = {};
    if (message.key !== undefined) {
      obj.key = Key.toJSON(message.key);
    }
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.didType !== undefined) {
      obj.didType = DidType.toJSON(message.didType);
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
    if (message.publishInterval !== 0) {
      obj.publishInterval = publishIntervalToJSON(message.publishInterval);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateIssuerRequest>, I>>(base?: I): CreateIssuerRequest {
    return CreateIssuerRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateIssuerRequest>, I>>(object: I): CreateIssuerRequest {
    const message = createBaseCreateIssuerRequest();
    message.key = (object.key !== undefined && object.key !== null) ? Key.fromPartial(object.key) : undefined;
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.didType = (object.didType !== undefined && object.didType !== null)
      ? DidType.fromPartial(object.didType)
      : undefined;
    message.name = object.name ?? undefined;
    message.description = object.description ?? undefined;
    message.image = object.image ?? undefined;
    message.publishInterval = object.publishInterval ?? 0;
    return message;
  },
};

function createBaseImportIssuerRequest(): ImportIssuerRequest {
  return { key: undefined, configData: undefined, didType: undefined };
}

export const ImportIssuerRequest = {
  encode(message: ImportIssuerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== undefined) {
      Key.encode(message.key, writer.uint32(10).fork()).ldelim();
    }
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(18).fork()).ldelim();
    }
    if (message.didType !== undefined) {
      DidType.encode(message.didType, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImportIssuerRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImportIssuerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = Key.decode(reader, reader.uint32());
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

          message.didType = DidType.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ImportIssuerRequest {
    return {
      key: isSet(object.key) ? Key.fromJSON(object.key) : undefined,
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      didType: isSet(object.didType) ? DidType.fromJSON(object.didType) : undefined,
    };
  },

  toJSON(message: ImportIssuerRequest): unknown {
    const obj: any = {};
    if (message.key !== undefined) {
      obj.key = Key.toJSON(message.key);
    }
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.didType !== undefined) {
      obj.didType = DidType.toJSON(message.didType);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ImportIssuerRequest>, I>>(base?: I): ImportIssuerRequest {
    return ImportIssuerRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ImportIssuerRequest>, I>>(object: I): ImportIssuerRequest {
    const message = createBaseImportIssuerRequest();
    message.key = (object.key !== undefined && object.key !== null) ? Key.fromPartial(object.key) : undefined;
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.didType = (object.didType !== undefined && object.didType !== null)
      ? DidType.fromPartial(object.didType)
      : undefined;
    return message;
  },
};

function createBaseForcePublishIssuerStateRequest(): ForcePublishIssuerStateRequest {
  return { configData: undefined, issuerDid: "", key: undefined };
}

export const ForcePublishIssuerStateRequest = {
  encode(message: ForcePublishIssuerStateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.issuerDid !== "") {
      writer.uint32(18).string(message.issuerDid);
    }
    if (message.key !== undefined) {
      Key.encode(message.key, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ForcePublishIssuerStateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseForcePublishIssuerStateRequest();
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

          message.key = Key.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ForcePublishIssuerStateRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      issuerDid: isSet(object.issuerDid) ? globalThis.String(object.issuerDid) : "",
      key: isSet(object.key) ? Key.fromJSON(object.key) : undefined,
    };
  },

  toJSON(message: ForcePublishIssuerStateRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.issuerDid !== "") {
      obj.issuerDid = message.issuerDid;
    }
    if (message.key !== undefined) {
      obj.key = Key.toJSON(message.key);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ForcePublishIssuerStateRequest>, I>>(base?: I): ForcePublishIssuerStateRequest {
    return ForcePublishIssuerStateRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ForcePublishIssuerStateRequest>, I>>(
    object: I,
  ): ForcePublishIssuerStateRequest {
    const message = createBaseForcePublishIssuerStateRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.issuerDid = object.issuerDid ?? "";
    message.key = (object.key !== undefined && object.key !== null) ? Key.fromPartial(object.key) : undefined;
    return message;
  },
};

function createBaseCreateCredentialResponse(): CreateCredentialResponse {
  return { credentialReceipt: undefined, error: undefined };
}

export const CreateCredentialResponse = {
  encode(message: CreateCredentialResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.credentialReceipt !== undefined) {
      CredentialReceipt.encode(message.credentialReceipt, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateCredentialResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateCredentialResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.credentialReceipt = CredentialReceipt.decode(reader, reader.uint32());
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

  fromJSON(object: any): CreateCredentialResponse {
    return {
      credentialReceipt: isSet(object.credentialReceipt)
        ? CredentialReceipt.fromJSON(object.credentialReceipt)
        : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: CreateCredentialResponse): unknown {
    const obj: any = {};
    if (message.credentialReceipt !== undefined) {
      obj.credentialReceipt = CredentialReceipt.toJSON(message.credentialReceipt);
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateCredentialResponse>, I>>(base?: I): CreateCredentialResponse {
    return CreateCredentialResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateCredentialResponse>, I>>(object: I): CreateCredentialResponse {
    const message = createBaseCreateCredentialResponse();
    message.credentialReceipt = (object.credentialReceipt !== undefined && object.credentialReceipt !== null)
      ? CredentialReceipt.fromPartial(object.credentialReceipt)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseCreateHolderResponse(): CreateHolderResponse {
  return { did: "", error: undefined };
}

export const CreateHolderResponse = {
  encode(message: CreateHolderResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.did !== "") {
      writer.uint32(10).string(message.did);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateHolderResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateHolderResponse();
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

  fromJSON(object: any): CreateHolderResponse {
    return {
      did: isSet(object.did) ? globalThis.String(object.did) : "",
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: CreateHolderResponse): unknown {
    const obj: any = {};
    if (message.did !== "") {
      obj.did = message.did;
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateHolderResponse>, I>>(base?: I): CreateHolderResponse {
    return CreateHolderResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateHolderResponse>, I>>(object: I): CreateHolderResponse {
    const message = createBaseCreateHolderResponse();
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

function createBaseBuildSchemaResponse(): BuildSchemaResponse {
  return { schema: undefined, error: undefined };
}

export const BuildSchemaResponse = {
  encode(message: BuildSchemaResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.schema !== undefined) {
      Schema.encode(message.schema, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BuildSchemaResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBuildSchemaResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.schema = Schema.decode(reader, reader.uint32());
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

  fromJSON(object: any): BuildSchemaResponse {
    return {
      schema: isSet(object.schema) ? Schema.fromJSON(object.schema) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: BuildSchemaResponse): unknown {
    const obj: any = {};
    if (message.schema !== undefined) {
      obj.schema = Schema.toJSON(message.schema);
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BuildSchemaResponse>, I>>(base?: I): BuildSchemaResponse {
    return BuildSchemaResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BuildSchemaResponse>, I>>(object: I): BuildSchemaResponse {
    const message = createBaseBuildSchemaResponse();
    message.schema = (object.schema !== undefined && object.schema !== null)
      ? Schema.fromPartial(object.schema)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseForcePublishIssuerStateResponse(): ForcePublishIssuerStateResponse {
  return { stateReceipt: undefined, error: undefined };
}

export const ForcePublishIssuerStateResponse = {
  encode(message: ForcePublishIssuerStateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.stateReceipt !== undefined) {
      IssuerStateReceipt.encode(message.stateReceipt, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ForcePublishIssuerStateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseForcePublishIssuerStateResponse();
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

  fromJSON(object: any): ForcePublishIssuerStateResponse {
    return {
      stateReceipt: isSet(object.stateReceipt) ? IssuerStateReceipt.fromJSON(object.stateReceipt) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: ForcePublishIssuerStateResponse): unknown {
    const obj: any = {};
    if (message.stateReceipt !== undefined) {
      obj.stateReceipt = IssuerStateReceipt.toJSON(message.stateReceipt);
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ForcePublishIssuerStateResponse>, I>>(base?: I): ForcePublishIssuerStateResponse {
    return ForcePublishIssuerStateResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ForcePublishIssuerStateResponse>, I>>(
    object: I,
  ): ForcePublishIssuerStateResponse {
    const message = createBaseForcePublishIssuerStateResponse();
    message.stateReceipt = (object.stateReceipt !== undefined && object.stateReceipt !== null)
      ? IssuerStateReceipt.fromPartial(object.stateReceipt)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseRevokeCredentialRequest(): RevokeCredentialRequest {
  return { configData: undefined, credential: undefined, key: undefined };
}

export const RevokeCredentialRequest = {
  encode(message: RevokeCredentialRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.credential !== undefined) {
      Credential.encode(message.credential, writer.uint32(18).fork()).ldelim();
    }
    if (message.key !== undefined) {
      Key.encode(message.key, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RevokeCredentialRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRevokeCredentialRequest();
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

          message.credential = Credential.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.key = Key.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RevokeCredentialRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      credential: isSet(object.credential) ? Credential.fromJSON(object.credential) : undefined,
      key: isSet(object.key) ? Key.fromJSON(object.key) : undefined,
    };
  },

  toJSON(message: RevokeCredentialRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.credential !== undefined) {
      obj.credential = Credential.toJSON(message.credential);
    }
    if (message.key !== undefined) {
      obj.key = Key.toJSON(message.key);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RevokeCredentialRequest>, I>>(base?: I): RevokeCredentialRequest {
    return RevokeCredentialRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RevokeCredentialRequest>, I>>(object: I): RevokeCredentialRequest {
    const message = createBaseRevokeCredentialRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.credential = (object.credential !== undefined && object.credential !== null)
      ? Credential.fromPartial(object.credential)
      : undefined;
    message.key = (object.key !== undefined && object.key !== null) ? Key.fromPartial(object.key) : undefined;
    return message;
  },
};

function createBaseRevokeCredentialResponse(): RevokeCredentialResponse {
  return { result: undefined, error: undefined };
}

export const RevokeCredentialResponse = {
  encode(message: RevokeCredentialResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result !== undefined) {
      CredentialRevocation.encode(message.result, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RevokeCredentialResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRevokeCredentialResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.result = CredentialRevocation.decode(reader, reader.uint32());
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

  fromJSON(object: any): RevokeCredentialResponse {
    return {
      result: isSet(object.result) ? CredentialRevocation.fromJSON(object.result) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: RevokeCredentialResponse): unknown {
    const obj: any = {};
    if (message.result !== undefined) {
      obj.result = CredentialRevocation.toJSON(message.result);
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RevokeCredentialResponse>, I>>(base?: I): RevokeCredentialResponse {
    return RevokeCredentialResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RevokeCredentialResponse>, I>>(object: I): RevokeCredentialResponse {
    const message = createBaseRevokeCredentialResponse();
    message.result = (object.result !== undefined && object.result !== null)
      ? CredentialRevocation.fromPartial(object.result)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseCreateVerificationRequest(): CreateVerificationRequest {
  return { configData: undefined, proofRequest: "" };
}

export const CreateVerificationRequest = {
  encode(message: CreateVerificationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.proofRequest !== "") {
      writer.uint32(18).string(message.proofRequest);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateVerificationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateVerificationRequest();
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

          message.proofRequest = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateVerificationRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      proofRequest: isSet(object.proofRequest) ? globalThis.String(object.proofRequest) : "",
    };
  },

  toJSON(message: CreateVerificationRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.proofRequest !== "") {
      obj.proofRequest = message.proofRequest;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateVerificationRequest>, I>>(base?: I): CreateVerificationRequest {
    return CreateVerificationRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateVerificationRequest>, I>>(object: I): CreateVerificationRequest {
    const message = createBaseCreateVerificationRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.proofRequest = object.proofRequest ?? "";
    return message;
  },
};

function createBaseCreateVerificationResponse(): CreateVerificationResponse {
  return { result: undefined, error: undefined };
}

export const CreateVerificationResponse = {
  encode(message: CreateVerificationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result !== undefined) {
      VerificationReceipt.encode(message.result, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateVerificationResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateVerificationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.result = VerificationReceipt.decode(reader, reader.uint32());
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

  fromJSON(object: any): CreateVerificationResponse {
    return {
      result: isSet(object.result) ? VerificationReceipt.fromJSON(object.result) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: CreateVerificationResponse): unknown {
    const obj: any = {};
    if (message.result !== undefined) {
      obj.result = VerificationReceipt.toJSON(message.result);
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateVerificationResponse>, I>>(base?: I): CreateVerificationResponse {
    return CreateVerificationResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateVerificationResponse>, I>>(object: I): CreateVerificationResponse {
    const message = createBaseCreateVerificationResponse();
    message.result = (object.result !== undefined && object.result !== null)
      ? VerificationReceipt.fromPartial(object.result)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseWaitVerificationRequest(): WaitVerificationRequest {
  return { configData: undefined, sessionId: 0, timeout: 0 };
}

export const WaitVerificationRequest = {
  encode(message: WaitVerificationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.sessionId !== 0) {
      writer.uint32(16).int64(message.sessionId);
    }
    if (message.timeout !== 0) {
      writer.uint32(24).int64(message.timeout);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WaitVerificationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWaitVerificationRequest();
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
          if (tag !== 16) {
            break;
          }

          message.sessionId = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.timeout = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WaitVerificationRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      sessionId: isSet(object.sessionId) ? globalThis.Number(object.sessionId) : 0,
      timeout: isSet(object.timeout) ? globalThis.Number(object.timeout) : 0,
    };
  },

  toJSON(message: WaitVerificationRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.sessionId !== 0) {
      obj.sessionId = Math.round(message.sessionId);
    }
    if (message.timeout !== 0) {
      obj.timeout = Math.round(message.timeout);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WaitVerificationRequest>, I>>(base?: I): WaitVerificationRequest {
    return WaitVerificationRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WaitVerificationRequest>, I>>(object: I): WaitVerificationRequest {
    const message = createBaseWaitVerificationRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.sessionId = object.sessionId ?? 0;
    message.timeout = object.timeout ?? 0;
    return message;
  },
};

function createBaseWaitVerificationResponse(): WaitVerificationResponse {
  return { status: false, error: undefined };
}

export const WaitVerificationResponse = {
  encode(message: WaitVerificationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status === true) {
      writer.uint32(8).bool(message.status);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WaitVerificationResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWaitVerificationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.status = reader.bool();
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

  fromJSON(object: any): WaitVerificationResponse {
    return {
      status: isSet(object.status) ? globalThis.Boolean(object.status) : false,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: WaitVerificationResponse): unknown {
    const obj: any = {};
    if (message.status === true) {
      obj.status = message.status;
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WaitVerificationResponse>, I>>(base?: I): WaitVerificationResponse {
    return WaitVerificationResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WaitVerificationResponse>, I>>(object: I): WaitVerificationResponse {
    const message = createBaseWaitVerificationResponse();
    message.status = object.status ?? false;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseGetVerificationStatusRequest(): GetVerificationStatusRequest {
  return { configData: undefined, sessionId: 0 };
}

export const GetVerificationStatusRequest = {
  encode(message: GetVerificationStatusRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.sessionId !== 0) {
      writer.uint32(16).int64(message.sessionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetVerificationStatusRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetVerificationStatusRequest();
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
          if (tag !== 16) {
            break;
          }

          message.sessionId = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetVerificationStatusRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      sessionId: isSet(object.sessionId) ? globalThis.Number(object.sessionId) : 0,
    };
  },

  toJSON(message: GetVerificationStatusRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.sessionId !== 0) {
      obj.sessionId = Math.round(message.sessionId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetVerificationStatusRequest>, I>>(base?: I): GetVerificationStatusRequest {
    return GetVerificationStatusRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetVerificationStatusRequest>, I>>(object: I): GetVerificationStatusRequest {
    const message = createBaseGetVerificationStatusRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.sessionId = object.sessionId ?? 0;
    return message;
  },
};

function createBaseGetVerificationStatusResponse(): GetVerificationStatusResponse {
  return { status: false, error: undefined };
}

export const GetVerificationStatusResponse = {
  encode(message: GetVerificationStatusResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status === true) {
      writer.uint32(8).bool(message.status);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetVerificationStatusResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetVerificationStatusResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.status = reader.bool();
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

  fromJSON(object: any): GetVerificationStatusResponse {
    return {
      status: isSet(object.status) ? globalThis.Boolean(object.status) : false,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GetVerificationStatusResponse): unknown {
    const obj: any = {};
    if (message.status === true) {
      obj.status = message.status;
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetVerificationStatusResponse>, I>>(base?: I): GetVerificationStatusResponse {
    return GetVerificationStatusResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetVerificationStatusResponse>, I>>(
    object: I,
  ): GetVerificationStatusResponse {
    const message = createBaseGetVerificationStatusResponse();
    message.status = object.status ?? false;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseGetCredentialRequest(): GetCredentialRequest {
  return { configData: undefined, credentialId: "" };
}

export const GetCredentialRequest = {
  encode(message: GetCredentialRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.credentialId !== "") {
      writer.uint32(18).string(message.credentialId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCredentialRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCredentialRequest();
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

  fromJSON(object: any): GetCredentialRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      credentialId: isSet(object.credentialId) ? globalThis.String(object.credentialId) : "",
    };
  },

  toJSON(message: GetCredentialRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.credentialId !== "") {
      obj.credentialId = message.credentialId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetCredentialRequest>, I>>(base?: I): GetCredentialRequest {
    return GetCredentialRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetCredentialRequest>, I>>(object: I): GetCredentialRequest {
    const message = createBaseGetCredentialRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.credentialId = object.credentialId ?? "";
    return message;
  },
};

function createBaseGetCredentialResponse(): GetCredentialResponse {
  return { credential: undefined, error: undefined };
}

export const GetCredentialResponse = {
  encode(message: GetCredentialResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.credential !== undefined) {
      Credential.encode(message.credential, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCredentialResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCredentialResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.credential = Credential.decode(reader, reader.uint32());
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

  fromJSON(object: any): GetCredentialResponse {
    return {
      credential: isSet(object.credential) ? Credential.fromJSON(object.credential) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GetCredentialResponse): unknown {
    const obj: any = {};
    if (message.credential !== undefined) {
      obj.credential = Credential.toJSON(message.credential);
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetCredentialResponse>, I>>(base?: I): GetCredentialResponse {
    return GetCredentialResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetCredentialResponse>, I>>(object: I): GetCredentialResponse {
    const message = createBaseGetCredentialResponse();
    message.credential = (object.credential !== undefined && object.credential !== null)
      ? Credential.fromPartial(object.credential)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseGetCredentialOfferRequest(): GetCredentialOfferRequest {
  return { configData: undefined, credentialId: "", key: undefined };
}

export const GetCredentialOfferRequest = {
  encode(message: GetCredentialOfferRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.credentialId !== "") {
      writer.uint32(18).string(message.credentialId);
    }
    if (message.key !== undefined) {
      Key.encode(message.key, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCredentialOfferRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCredentialOfferRequest();
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

          message.credentialId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.key = Key.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetCredentialOfferRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      credentialId: isSet(object.credentialId) ? globalThis.String(object.credentialId) : "",
      key: isSet(object.key) ? Key.fromJSON(object.key) : undefined,
    };
  },

  toJSON(message: GetCredentialOfferRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.credentialId !== "") {
      obj.credentialId = message.credentialId;
    }
    if (message.key !== undefined) {
      obj.key = Key.toJSON(message.key);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetCredentialOfferRequest>, I>>(base?: I): GetCredentialOfferRequest {
    return GetCredentialOfferRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetCredentialOfferRequest>, I>>(object: I): GetCredentialOfferRequest {
    const message = createBaseGetCredentialOfferRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.credentialId = object.credentialId ?? "";
    message.key = (object.key !== undefined && object.key !== null) ? Key.fromPartial(object.key) : undefined;
    return message;
  },
};

function createBaseGetCredentialOfferResponse(): GetCredentialOfferResponse {
  return { credentialOffer: "", error: undefined };
}

export const GetCredentialOfferResponse = {
  encode(message: GetCredentialOfferResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.credentialOffer !== "") {
      writer.uint32(10).string(message.credentialOffer);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCredentialOfferResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCredentialOfferResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.credentialOffer = reader.string();
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

  fromJSON(object: any): GetCredentialOfferResponse {
    return {
      credentialOffer: isSet(object.credentialOffer) ? globalThis.String(object.credentialOffer) : "",
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GetCredentialOfferResponse): unknown {
    const obj: any = {};
    if (message.credentialOffer !== "") {
      obj.credentialOffer = message.credentialOffer;
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetCredentialOfferResponse>, I>>(base?: I): GetCredentialOfferResponse {
    return GetCredentialOfferResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetCredentialOfferResponse>, I>>(object: I): GetCredentialOfferResponse {
    const message = createBaseGetCredentialOfferResponse();
    message.credentialOffer = object.credentialOffer ?? "";
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

export interface IdentityService {
  CreateHolder(request: CreateHolderRequest): Promise<CreateHolderResponse>;
  CreateIssuer(request: CreateIssuerRequest): Promise<CreateIssuerResponse>;
  ImportIssuer(request: ImportIssuerRequest): Promise<ImportIssuerResponse>;
  BuildSchema(request: BuildSchemaRequest): Promise<BuildSchemaResponse>;
  GetSchema(request: GetSchemaRequest): Promise<GetSchemaResponse>;
  CreateCredential(request: CreateCredentialRequest): Promise<CreateCredentialResponse>;
  GetCredential(request: GetCredentialRequest): Promise<GetCredentialResponse>;
  GetCredentialProof(request: GetCredentialProofRequest): Promise<GetCredentialProofResponse>;
  RevokeCredential(request: RevokeCredentialRequest): Promise<RevokeCredentialResponse>;
  CredentialToJson(request: CredentialToJsonRequest): Promise<CredentialToJsonResponse>;
  CredentialFromJson(request: CredentialFromJsonRequest): Promise<CredentialFromJsonResponse>;
  GetCredentialOffer(request: GetCredentialOfferRequest): Promise<GetCredentialOfferResponse>;
  ForcePublishIssuerState(request: ForcePublishIssuerStateRequest): Promise<ForcePublishIssuerStateResponse>;
  CreateVerification(request: CreateVerificationRequest): Promise<CreateVerificationResponse>;
  WaitVerification(request: WaitVerificationRequest): Promise<WaitVerificationResponse>;
  GetVerificationStatus(request: GetVerificationStatusRequest): Promise<GetVerificationStatusResponse>;
}

export const IdentityServiceServiceName = "bloock.IdentityService";
export class IdentityServiceClientImpl implements IdentityService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || IdentityServiceServiceName;
    this.rpc = rpc;
    this.CreateHolder = this.CreateHolder.bind(this);
    this.CreateIssuer = this.CreateIssuer.bind(this);
    this.ImportIssuer = this.ImportIssuer.bind(this);
    this.BuildSchema = this.BuildSchema.bind(this);
    this.GetSchema = this.GetSchema.bind(this);
    this.CreateCredential = this.CreateCredential.bind(this);
    this.GetCredential = this.GetCredential.bind(this);
    this.GetCredentialProof = this.GetCredentialProof.bind(this);
    this.RevokeCredential = this.RevokeCredential.bind(this);
    this.CredentialToJson = this.CredentialToJson.bind(this);
    this.CredentialFromJson = this.CredentialFromJson.bind(this);
    this.GetCredentialOffer = this.GetCredentialOffer.bind(this);
    this.ForcePublishIssuerState = this.ForcePublishIssuerState.bind(this);
    this.CreateVerification = this.CreateVerification.bind(this);
    this.WaitVerification = this.WaitVerification.bind(this);
    this.GetVerificationStatus = this.GetVerificationStatus.bind(this);
  }
  CreateHolder(request: CreateHolderRequest): Promise<CreateHolderResponse> {
    const data = CreateHolderRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateHolder", data);
    return promise.then((data) => CreateHolderResponse.decode(_m0.Reader.create(data)));
  }

  CreateIssuer(request: CreateIssuerRequest): Promise<CreateIssuerResponse> {
    const data = CreateIssuerRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateIssuer", data);
    return promise.then((data) => CreateIssuerResponse.decode(_m0.Reader.create(data)));
  }

  ImportIssuer(request: ImportIssuerRequest): Promise<ImportIssuerResponse> {
    const data = ImportIssuerRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ImportIssuer", data);
    return promise.then((data) => ImportIssuerResponse.decode(_m0.Reader.create(data)));
  }

  BuildSchema(request: BuildSchemaRequest): Promise<BuildSchemaResponse> {
    const data = BuildSchemaRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "BuildSchema", data);
    return promise.then((data) => BuildSchemaResponse.decode(_m0.Reader.create(data)));
  }

  GetSchema(request: GetSchemaRequest): Promise<GetSchemaResponse> {
    const data = GetSchemaRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetSchema", data);
    return promise.then((data) => GetSchemaResponse.decode(_m0.Reader.create(data)));
  }

  CreateCredential(request: CreateCredentialRequest): Promise<CreateCredentialResponse> {
    const data = CreateCredentialRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateCredential", data);
    return promise.then((data) => CreateCredentialResponse.decode(_m0.Reader.create(data)));
  }

  GetCredential(request: GetCredentialRequest): Promise<GetCredentialResponse> {
    const data = GetCredentialRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetCredential", data);
    return promise.then((data) => GetCredentialResponse.decode(_m0.Reader.create(data)));
  }

  GetCredentialProof(request: GetCredentialProofRequest): Promise<GetCredentialProofResponse> {
    const data = GetCredentialProofRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetCredentialProof", data);
    return promise.then((data) => GetCredentialProofResponse.decode(_m0.Reader.create(data)));
  }

  RevokeCredential(request: RevokeCredentialRequest): Promise<RevokeCredentialResponse> {
    const data = RevokeCredentialRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "RevokeCredential", data);
    return promise.then((data) => RevokeCredentialResponse.decode(_m0.Reader.create(data)));
  }

  CredentialToJson(request: CredentialToJsonRequest): Promise<CredentialToJsonResponse> {
    const data = CredentialToJsonRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CredentialToJson", data);
    return promise.then((data) => CredentialToJsonResponse.decode(_m0.Reader.create(data)));
  }

  CredentialFromJson(request: CredentialFromJsonRequest): Promise<CredentialFromJsonResponse> {
    const data = CredentialFromJsonRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CredentialFromJson", data);
    return promise.then((data) => CredentialFromJsonResponse.decode(_m0.Reader.create(data)));
  }

  GetCredentialOffer(request: GetCredentialOfferRequest): Promise<GetCredentialOfferResponse> {
    const data = GetCredentialOfferRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetCredentialOffer", data);
    return promise.then((data) => GetCredentialOfferResponse.decode(_m0.Reader.create(data)));
  }

  ForcePublishIssuerState(request: ForcePublishIssuerStateRequest): Promise<ForcePublishIssuerStateResponse> {
    const data = ForcePublishIssuerStateRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ForcePublishIssuerState", data);
    return promise.then((data) => ForcePublishIssuerStateResponse.decode(_m0.Reader.create(data)));
  }

  CreateVerification(request: CreateVerificationRequest): Promise<CreateVerificationResponse> {
    const data = CreateVerificationRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateVerification", data);
    return promise.then((data) => CreateVerificationResponse.decode(_m0.Reader.create(data)));
  }

  WaitVerification(request: WaitVerificationRequest): Promise<WaitVerificationResponse> {
    const data = WaitVerificationRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "WaitVerification", data);
    return promise.then((data) => WaitVerificationResponse.decode(_m0.Reader.create(data)));
  }

  GetVerificationStatus(request: GetVerificationStatusRequest): Promise<GetVerificationStatusResponse> {
    const data = GetVerificationStatusRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetVerificationStatus", data);
    return promise.then((data) => GetVerificationStatusResponse.decode(_m0.Reader.create(data)));
  }
}

export type IdentityServiceDefinition = typeof IdentityServiceDefinition;
export const IdentityServiceDefinition = {
  name: "IdentityService",
  fullName: "bloock.IdentityService",
  methods: {
    createHolder: {
      name: "CreateHolder",
      requestType: CreateHolderRequest,
      requestStream: false,
      responseType: CreateHolderResponse,
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
    importIssuer: {
      name: "ImportIssuer",
      requestType: ImportIssuerRequest,
      requestStream: false,
      responseType: ImportIssuerResponse,
      responseStream: false,
      options: {},
    },
    buildSchema: {
      name: "BuildSchema",
      requestType: BuildSchemaRequest,
      requestStream: false,
      responseType: BuildSchemaResponse,
      responseStream: false,
      options: {},
    },
    getSchema: {
      name: "GetSchema",
      requestType: GetSchemaRequest,
      requestStream: false,
      responseType: GetSchemaResponse,
      responseStream: false,
      options: {},
    },
    createCredential: {
      name: "CreateCredential",
      requestType: CreateCredentialRequest,
      requestStream: false,
      responseType: CreateCredentialResponse,
      responseStream: false,
      options: {},
    },
    getCredential: {
      name: "GetCredential",
      requestType: GetCredentialRequest,
      requestStream: false,
      responseType: GetCredentialResponse,
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
      requestType: RevokeCredentialRequest,
      requestStream: false,
      responseType: RevokeCredentialResponse,
      responseStream: false,
      options: {},
    },
    credentialToJson: {
      name: "CredentialToJson",
      requestType: CredentialToJsonRequest,
      requestStream: false,
      responseType: CredentialToJsonResponse,
      responseStream: false,
      options: {},
    },
    credentialFromJson: {
      name: "CredentialFromJson",
      requestType: CredentialFromJsonRequest,
      requestStream: false,
      responseType: CredentialFromJsonResponse,
      responseStream: false,
      options: {},
    },
    getCredentialOffer: {
      name: "GetCredentialOffer",
      requestType: GetCredentialOfferRequest,
      requestStream: false,
      responseType: GetCredentialOfferResponse,
      responseStream: false,
      options: {},
    },
    forcePublishIssuerState: {
      name: "ForcePublishIssuerState",
      requestType: ForcePublishIssuerStateRequest,
      requestStream: false,
      responseType: ForcePublishIssuerStateResponse,
      responseStream: false,
      options: {},
    },
    createVerification: {
      name: "CreateVerification",
      requestType: CreateVerificationRequest,
      requestStream: false,
      responseType: CreateVerificationResponse,
      responseStream: false,
      options: {},
    },
    waitVerification: {
      name: "WaitVerification",
      requestType: WaitVerificationRequest,
      requestStream: false,
      responseType: WaitVerificationResponse,
      responseStream: false,
      options: {},
    },
    getVerificationStatus: {
      name: "GetVerificationStatus",
      requestType: GetVerificationStatusRequest,
      requestStream: false,
      responseType: GetVerificationStatusResponse,
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
