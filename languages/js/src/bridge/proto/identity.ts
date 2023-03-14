/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { ConfigData } from "./config";
import {
  BooleanAttribute,
  BooleanAttributeDefinition,
  Credential,
  CredentialOffer,
  CredentialReceipt,
  CredentialRevocation,
  CredentialVerification,
  DateAttribute,
  DateAttributeDefinition,
  DateTimeAttribute,
  DateTimeAttributeDefinition,
  Identity,
  MultiChoiceAttribute,
  MultiChoiceAttributeDefinition,
  NumberAttribute,
  NumberAttributeDefinition,
  Schema,
} from "./identity_entities";
import { Error } from "./shared";

export interface CreateIdentityRequest {
  configData?: ConfigData;
}

export interface CreateIdentityResponse {
  identity?: Identity;
  error?: Error | undefined;
}

export interface LoadIdentityRequest {
  configData?: ConfigData;
  mnemonic: string;
}

export interface LoadIdentityResponse {
  identity?: Identity;
  error?: Error | undefined;
}

export interface BuildSchemaRequest {
  configData?: ConfigData;
  displayName: string;
  technicalName: string;
  booleanAttributes: BooleanAttributeDefinition[];
  dateAttributes: DateAttributeDefinition[];
  datetimeAttributes: DateTimeAttributeDefinition[];
  multichoiceAttributes: MultiChoiceAttributeDefinition[];
  numberAttributes: NumberAttributeDefinition[];
}

export interface BuildSchemaResponse {
  schema?: Schema;
  error?: Error | undefined;
}

export interface GetSchemaRequest {
  configData?: ConfigData;
  id: string;
}

export interface GetSchemaResponse {
  schema?: Schema;
  error?: Error | undefined;
}

export interface CreateCredentialRequest {
  configData?: ConfigData;
  schemaId: string;
  holderKey: string;
  booleanAttributes: BooleanAttribute[];
  dateAttributes: DateAttribute[];
  datetimeAttributes: DateTimeAttribute[];
  multichoiceAttributes: MultiChoiceAttribute[];
  numberAttributes: NumberAttribute[];
}

export interface CreateCredentialResponse {
  credentialReceipt?: CredentialReceipt;
  error?: Error | undefined;
}

export interface GetOfferRequest {
  configData?: ConfigData;
  id: string;
}

export interface GetOfferResponse {
  offer?: CredentialOffer;
  error?: Error | undefined;
}

export interface WaitOfferRequest {
  configData?: ConfigData;
  offerId: string;
  timeout: number;
}

export interface WaitOfferResponse {
  offer?: CredentialOffer | undefined;
  error?: Error | undefined;
}

export interface CredentialOfferToJsonRequest {
  configData?: ConfigData;
  credentialOffer?: CredentialOffer;
}

export interface CredentialOfferToJsonResponse {
  json: string;
  error?: Error | undefined;
}

export interface CredentialOfferFromJsonRequest {
  configData?: ConfigData;
  json: string;
}

export interface CredentialOfferFromJsonResponse {
  credentialOffer?: CredentialOffer;
  error?: Error | undefined;
}

export interface CredentialOfferRedeemRequest {
  configData?: ConfigData;
  credentialOffer?: CredentialOffer;
  identityPrivateKey: string;
}

export interface CredentialOfferRedeemResponse {
  credential?: Credential;
  error?: Error | undefined;
}

export interface CredentialToJsonRequest {
  configData?: ConfigData;
  credential?: Credential;
}

export interface CredentialToJsonResponse {
  json: string;
  error?: Error | undefined;
}

export interface CredentialFromJsonRequest {
  configData?: ConfigData;
  json: string;
}

export interface CredentialFromJsonResponse {
  credential?: Credential;
  error?: Error | undefined;
}

export interface VerifyCredentialRequest {
  configData?: ConfigData;
  credential?: Credential;
}

export interface VerifyCredentialResponse {
  result?: CredentialVerification;
  error?: Error | undefined;
}

export interface RevokeCredentialRequest {
  configData?: ConfigData;
  credential?: Credential;
}

export interface RevokeCredentialResponse {
  result?: CredentialRevocation;
  error?: Error | undefined;
}

function createBaseCreateIdentityRequest(): CreateIdentityRequest {
  return { configData: undefined };
}

export const CreateIdentityRequest = {
  encode(message: CreateIdentityRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateIdentityRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateIdentityRequest();
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

  fromJSON(object: any): CreateIdentityRequest {
    return { configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined };
  },

  toJSON(message: CreateIdentityRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateIdentityRequest>, I>>(object: I): CreateIdentityRequest {
    const message = createBaseCreateIdentityRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    return message;
  },
};

function createBaseCreateIdentityResponse(): CreateIdentityResponse {
  return { identity: undefined, error: undefined };
}

export const CreateIdentityResponse = {
  encode(message: CreateIdentityResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.identity !== undefined) {
      Identity.encode(message.identity, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateIdentityResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateIdentityResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.identity = Identity.decode(reader, reader.uint32());
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

  fromJSON(object: any): CreateIdentityResponse {
    return {
      identity: isSet(object.identity) ? Identity.fromJSON(object.identity) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: CreateIdentityResponse): unknown {
    const obj: any = {};
    message.identity !== undefined && (obj.identity = message.identity ? Identity.toJSON(message.identity) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateIdentityResponse>, I>>(object: I): CreateIdentityResponse {
    const message = createBaseCreateIdentityResponse();
    message.identity = (object.identity !== undefined && object.identity !== null)
      ? Identity.fromPartial(object.identity)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseLoadIdentityRequest(): LoadIdentityRequest {
  return { configData: undefined, mnemonic: "" };
}

export const LoadIdentityRequest = {
  encode(message: LoadIdentityRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.mnemonic !== "") {
      writer.uint32(18).string(message.mnemonic);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoadIdentityRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoadIdentityRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.mnemonic = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LoadIdentityRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      mnemonic: isSet(object.mnemonic) ? String(object.mnemonic) : "",
    };
  },

  toJSON(message: LoadIdentityRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.mnemonic !== undefined && (obj.mnemonic = message.mnemonic);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LoadIdentityRequest>, I>>(object: I): LoadIdentityRequest {
    const message = createBaseLoadIdentityRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.mnemonic = object.mnemonic ?? "";
    return message;
  },
};

function createBaseLoadIdentityResponse(): LoadIdentityResponse {
  return { identity: undefined, error: undefined };
}

export const LoadIdentityResponse = {
  encode(message: LoadIdentityResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.identity !== undefined) {
      Identity.encode(message.identity, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoadIdentityResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoadIdentityResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.identity = Identity.decode(reader, reader.uint32());
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

  fromJSON(object: any): LoadIdentityResponse {
    return {
      identity: isSet(object.identity) ? Identity.fromJSON(object.identity) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: LoadIdentityResponse): unknown {
    const obj: any = {};
    message.identity !== undefined && (obj.identity = message.identity ? Identity.toJSON(message.identity) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LoadIdentityResponse>, I>>(object: I): LoadIdentityResponse {
    const message = createBaseLoadIdentityResponse();
    message.identity = (object.identity !== undefined && object.identity !== null)
      ? Identity.fromPartial(object.identity)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseBuildSchemaRequest(): BuildSchemaRequest {
  return {
    configData: undefined,
    displayName: "",
    technicalName: "",
    booleanAttributes: [],
    dateAttributes: [],
    datetimeAttributes: [],
    multichoiceAttributes: [],
    numberAttributes: [],
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
    if (message.technicalName !== "") {
      writer.uint32(26).string(message.technicalName);
    }
    for (const v of message.booleanAttributes) {
      BooleanAttributeDefinition.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.dateAttributes) {
      DateAttributeDefinition.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.datetimeAttributes) {
      DateTimeAttributeDefinition.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.multichoiceAttributes) {
      MultiChoiceAttributeDefinition.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.numberAttributes) {
      NumberAttributeDefinition.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BuildSchemaRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBuildSchemaRequest();
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
          message.technicalName = reader.string();
          break;
        case 4:
          message.booleanAttributes.push(BooleanAttributeDefinition.decode(reader, reader.uint32()));
          break;
        case 5:
          message.dateAttributes.push(DateAttributeDefinition.decode(reader, reader.uint32()));
          break;
        case 6:
          message.datetimeAttributes.push(DateTimeAttributeDefinition.decode(reader, reader.uint32()));
          break;
        case 7:
          message.multichoiceAttributes.push(MultiChoiceAttributeDefinition.decode(reader, reader.uint32()));
          break;
        case 8:
          message.numberAttributes.push(NumberAttributeDefinition.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BuildSchemaRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      displayName: isSet(object.displayName) ? String(object.displayName) : "",
      technicalName: isSet(object.technicalName) ? String(object.technicalName) : "",
      booleanAttributes: Array.isArray(object?.booleanAttributes)
        ? object.booleanAttributes.map((e: any) => BooleanAttributeDefinition.fromJSON(e))
        : [],
      dateAttributes: Array.isArray(object?.dateAttributes)
        ? object.dateAttributes.map((e: any) => DateAttributeDefinition.fromJSON(e))
        : [],
      datetimeAttributes: Array.isArray(object?.datetimeAttributes)
        ? object.datetimeAttributes.map((e: any) => DateTimeAttributeDefinition.fromJSON(e))
        : [],
      multichoiceAttributes: Array.isArray(object?.multichoiceAttributes)
        ? object.multichoiceAttributes.map((e: any) => MultiChoiceAttributeDefinition.fromJSON(e))
        : [],
      numberAttributes: Array.isArray(object?.numberAttributes)
        ? object.numberAttributes.map((e: any) => NumberAttributeDefinition.fromJSON(e))
        : [],
    };
  },

  toJSON(message: BuildSchemaRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.displayName !== undefined && (obj.displayName = message.displayName);
    message.technicalName !== undefined && (obj.technicalName = message.technicalName);
    if (message.booleanAttributes) {
      obj.booleanAttributes = message.booleanAttributes.map((e) =>
        e ? BooleanAttributeDefinition.toJSON(e) : undefined
      );
    } else {
      obj.booleanAttributes = [];
    }
    if (message.dateAttributes) {
      obj.dateAttributes = message.dateAttributes.map((e) => e ? DateAttributeDefinition.toJSON(e) : undefined);
    } else {
      obj.dateAttributes = [];
    }
    if (message.datetimeAttributes) {
      obj.datetimeAttributes = message.datetimeAttributes.map((e) =>
        e ? DateTimeAttributeDefinition.toJSON(e) : undefined
      );
    } else {
      obj.datetimeAttributes = [];
    }
    if (message.multichoiceAttributes) {
      obj.multichoiceAttributes = message.multichoiceAttributes.map((e) =>
        e ? MultiChoiceAttributeDefinition.toJSON(e) : undefined
      );
    } else {
      obj.multichoiceAttributes = [];
    }
    if (message.numberAttributes) {
      obj.numberAttributes = message.numberAttributes.map((e) => e ? NumberAttributeDefinition.toJSON(e) : undefined);
    } else {
      obj.numberAttributes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BuildSchemaRequest>, I>>(object: I): BuildSchemaRequest {
    const message = createBaseBuildSchemaRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.displayName = object.displayName ?? "";
    message.technicalName = object.technicalName ?? "";
    message.booleanAttributes = object.booleanAttributes?.map((e) => BooleanAttributeDefinition.fromPartial(e)) || [];
    message.dateAttributes = object.dateAttributes?.map((e) => DateAttributeDefinition.fromPartial(e)) || [];
    message.datetimeAttributes = object.datetimeAttributes?.map((e) => DateTimeAttributeDefinition.fromPartial(e)) ||
      [];
    message.multichoiceAttributes =
      object.multichoiceAttributes?.map((e) => MultiChoiceAttributeDefinition.fromPartial(e)) || [];
    message.numberAttributes = object.numberAttributes?.map((e) => NumberAttributeDefinition.fromPartial(e)) || [];
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBuildSchemaResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.schema = Schema.decode(reader, reader.uint32());
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

  fromJSON(object: any): BuildSchemaResponse {
    return {
      schema: isSet(object.schema) ? Schema.fromJSON(object.schema) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: BuildSchemaResponse): unknown {
    const obj: any = {};
    message.schema !== undefined && (obj.schema = message.schema ? Schema.toJSON(message.schema) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSchemaRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetSchemaRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: GetSchemaRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.id !== undefined && (obj.id = message.id);
    return obj;
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSchemaResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.schema = Schema.decode(reader, reader.uint32());
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

  fromJSON(object: any): GetSchemaResponse {
    return {
      schema: isSet(object.schema) ? Schema.fromJSON(object.schema) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GetSchemaResponse): unknown {
    const obj: any = {};
    message.schema !== undefined && (obj.schema = message.schema ? Schema.toJSON(message.schema) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
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

function createBaseCreateCredentialRequest(): CreateCredentialRequest {
  return {
    configData: undefined,
    schemaId: "",
    holderKey: "",
    booleanAttributes: [],
    dateAttributes: [],
    datetimeAttributes: [],
    multichoiceAttributes: [],
    numberAttributes: [],
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
    if (message.holderKey !== "") {
      writer.uint32(26).string(message.holderKey);
    }
    for (const v of message.booleanAttributes) {
      BooleanAttribute.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.dateAttributes) {
      DateAttribute.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.datetimeAttributes) {
      DateTimeAttribute.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.multichoiceAttributes) {
      MultiChoiceAttribute.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.numberAttributes) {
      NumberAttribute.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateCredentialRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateCredentialRequest();
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
          message.holderKey = reader.string();
          break;
        case 4:
          message.booleanAttributes.push(BooleanAttribute.decode(reader, reader.uint32()));
          break;
        case 5:
          message.dateAttributes.push(DateAttribute.decode(reader, reader.uint32()));
          break;
        case 6:
          message.datetimeAttributes.push(DateTimeAttribute.decode(reader, reader.uint32()));
          break;
        case 7:
          message.multichoiceAttributes.push(MultiChoiceAttribute.decode(reader, reader.uint32()));
          break;
        case 8:
          message.numberAttributes.push(NumberAttribute.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateCredentialRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      schemaId: isSet(object.schemaId) ? String(object.schemaId) : "",
      holderKey: isSet(object.holderKey) ? String(object.holderKey) : "",
      booleanAttributes: Array.isArray(object?.booleanAttributes)
        ? object.booleanAttributes.map((e: any) => BooleanAttribute.fromJSON(e))
        : [],
      dateAttributes: Array.isArray(object?.dateAttributes)
        ? object.dateAttributes.map((e: any) => DateAttribute.fromJSON(e))
        : [],
      datetimeAttributes: Array.isArray(object?.datetimeAttributes)
        ? object.datetimeAttributes.map((e: any) => DateTimeAttribute.fromJSON(e))
        : [],
      multichoiceAttributes: Array.isArray(object?.multichoiceAttributes)
        ? object.multichoiceAttributes.map((e: any) => MultiChoiceAttribute.fromJSON(e))
        : [],
      numberAttributes: Array.isArray(object?.numberAttributes)
        ? object.numberAttributes.map((e: any) => NumberAttribute.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CreateCredentialRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.schemaId !== undefined && (obj.schemaId = message.schemaId);
    message.holderKey !== undefined && (obj.holderKey = message.holderKey);
    if (message.booleanAttributes) {
      obj.booleanAttributes = message.booleanAttributes.map((e) => e ? BooleanAttribute.toJSON(e) : undefined);
    } else {
      obj.booleanAttributes = [];
    }
    if (message.dateAttributes) {
      obj.dateAttributes = message.dateAttributes.map((e) => e ? DateAttribute.toJSON(e) : undefined);
    } else {
      obj.dateAttributes = [];
    }
    if (message.datetimeAttributes) {
      obj.datetimeAttributes = message.datetimeAttributes.map((e) => e ? DateTimeAttribute.toJSON(e) : undefined);
    } else {
      obj.datetimeAttributes = [];
    }
    if (message.multichoiceAttributes) {
      obj.multichoiceAttributes = message.multichoiceAttributes.map((e) =>
        e ? MultiChoiceAttribute.toJSON(e) : undefined
      );
    } else {
      obj.multichoiceAttributes = [];
    }
    if (message.numberAttributes) {
      obj.numberAttributes = message.numberAttributes.map((e) => e ? NumberAttribute.toJSON(e) : undefined);
    } else {
      obj.numberAttributes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateCredentialRequest>, I>>(object: I): CreateCredentialRequest {
    const message = createBaseCreateCredentialRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.schemaId = object.schemaId ?? "";
    message.holderKey = object.holderKey ?? "";
    message.booleanAttributes = object.booleanAttributes?.map((e) => BooleanAttribute.fromPartial(e)) || [];
    message.dateAttributes = object.dateAttributes?.map((e) => DateAttribute.fromPartial(e)) || [];
    message.datetimeAttributes = object.datetimeAttributes?.map((e) => DateTimeAttribute.fromPartial(e)) || [];
    message.multichoiceAttributes = object.multichoiceAttributes?.map((e) => MultiChoiceAttribute.fromPartial(e)) || [];
    message.numberAttributes = object.numberAttributes?.map((e) => NumberAttribute.fromPartial(e)) || [];
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateCredentialResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.credentialReceipt = CredentialReceipt.decode(reader, reader.uint32());
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
    message.credentialReceipt !== undefined && (obj.credentialReceipt = message.credentialReceipt
      ? CredentialReceipt.toJSON(message.credentialReceipt)
      : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
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

function createBaseGetOfferRequest(): GetOfferRequest {
  return { configData: undefined, id: "" };
}

export const GetOfferRequest = {
  encode(message: GetOfferRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetOfferRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetOfferRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetOfferRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: GetOfferRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetOfferRequest>, I>>(object: I): GetOfferRequest {
    const message = createBaseGetOfferRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseGetOfferResponse(): GetOfferResponse {
  return { offer: undefined, error: undefined };
}

export const GetOfferResponse = {
  encode(message: GetOfferResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.offer !== undefined) {
      CredentialOffer.encode(message.offer, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetOfferResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetOfferResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.offer = CredentialOffer.decode(reader, reader.uint32());
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

  fromJSON(object: any): GetOfferResponse {
    return {
      offer: isSet(object.offer) ? CredentialOffer.fromJSON(object.offer) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GetOfferResponse): unknown {
    const obj: any = {};
    message.offer !== undefined && (obj.offer = message.offer ? CredentialOffer.toJSON(message.offer) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetOfferResponse>, I>>(object: I): GetOfferResponse {
    const message = createBaseGetOfferResponse();
    message.offer = (object.offer !== undefined && object.offer !== null)
      ? CredentialOffer.fromPartial(object.offer)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseWaitOfferRequest(): WaitOfferRequest {
  return { configData: undefined, offerId: "", timeout: 0 };
}

export const WaitOfferRequest = {
  encode(message: WaitOfferRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.offerId !== "") {
      writer.uint32(18).string(message.offerId);
    }
    if (message.timeout !== 0) {
      writer.uint32(24).int64(message.timeout);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WaitOfferRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWaitOfferRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.offerId = reader.string();
          break;
        case 3:
          message.timeout = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WaitOfferRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      offerId: isSet(object.offerId) ? String(object.offerId) : "",
      timeout: isSet(object.timeout) ? Number(object.timeout) : 0,
    };
  },

  toJSON(message: WaitOfferRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.offerId !== undefined && (obj.offerId = message.offerId);
    message.timeout !== undefined && (obj.timeout = Math.round(message.timeout));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WaitOfferRequest>, I>>(object: I): WaitOfferRequest {
    const message = createBaseWaitOfferRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.offerId = object.offerId ?? "";
    message.timeout = object.timeout ?? 0;
    return message;
  },
};

function createBaseWaitOfferResponse(): WaitOfferResponse {
  return { offer: undefined, error: undefined };
}

export const WaitOfferResponse = {
  encode(message: WaitOfferResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.offer !== undefined) {
      CredentialOffer.encode(message.offer, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WaitOfferResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWaitOfferResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.offer = CredentialOffer.decode(reader, reader.uint32());
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

  fromJSON(object: any): WaitOfferResponse {
    return {
      offer: isSet(object.offer) ? CredentialOffer.fromJSON(object.offer) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: WaitOfferResponse): unknown {
    const obj: any = {};
    message.offer !== undefined && (obj.offer = message.offer ? CredentialOffer.toJSON(message.offer) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WaitOfferResponse>, I>>(object: I): WaitOfferResponse {
    const message = createBaseWaitOfferResponse();
    message.offer = (object.offer !== undefined && object.offer !== null)
      ? CredentialOffer.fromPartial(object.offer)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseCredentialOfferToJsonRequest(): CredentialOfferToJsonRequest {
  return { configData: undefined, credentialOffer: undefined };
}

export const CredentialOfferToJsonRequest = {
  encode(message: CredentialOfferToJsonRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.credentialOffer !== undefined) {
      CredentialOffer.encode(message.credentialOffer, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialOfferToJsonRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialOfferToJsonRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.credentialOffer = CredentialOffer.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CredentialOfferToJsonRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      credentialOffer: isSet(object.credentialOffer) ? CredentialOffer.fromJSON(object.credentialOffer) : undefined,
    };
  },

  toJSON(message: CredentialOfferToJsonRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.credentialOffer !== undefined &&
      (obj.credentialOffer = message.credentialOffer ? CredentialOffer.toJSON(message.credentialOffer) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CredentialOfferToJsonRequest>, I>>(object: I): CredentialOfferToJsonRequest {
    const message = createBaseCredentialOfferToJsonRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.credentialOffer = (object.credentialOffer !== undefined && object.credentialOffer !== null)
      ? CredentialOffer.fromPartial(object.credentialOffer)
      : undefined;
    return message;
  },
};

function createBaseCredentialOfferToJsonResponse(): CredentialOfferToJsonResponse {
  return { json: "", error: undefined };
}

export const CredentialOfferToJsonResponse = {
  encode(message: CredentialOfferToJsonResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.json !== "") {
      writer.uint32(10).string(message.json);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialOfferToJsonResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialOfferToJsonResponse();
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

  fromJSON(object: any): CredentialOfferToJsonResponse {
    return {
      json: isSet(object.json) ? String(object.json) : "",
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: CredentialOfferToJsonResponse): unknown {
    const obj: any = {};
    message.json !== undefined && (obj.json = message.json);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CredentialOfferToJsonResponse>, I>>(
    object: I,
  ): CredentialOfferToJsonResponse {
    const message = createBaseCredentialOfferToJsonResponse();
    message.json = object.json ?? "";
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseCredentialOfferFromJsonRequest(): CredentialOfferFromJsonRequest {
  return { configData: undefined, json: "" };
}

export const CredentialOfferFromJsonRequest = {
  encode(message: CredentialOfferFromJsonRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.json !== "") {
      writer.uint32(18).string(message.json);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialOfferFromJsonRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialOfferFromJsonRequest();
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

  fromJSON(object: any): CredentialOfferFromJsonRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      json: isSet(object.json) ? String(object.json) : "",
    };
  },

  toJSON(message: CredentialOfferFromJsonRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.json !== undefined && (obj.json = message.json);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CredentialOfferFromJsonRequest>, I>>(
    object: I,
  ): CredentialOfferFromJsonRequest {
    const message = createBaseCredentialOfferFromJsonRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.json = object.json ?? "";
    return message;
  },
};

function createBaseCredentialOfferFromJsonResponse(): CredentialOfferFromJsonResponse {
  return { credentialOffer: undefined, error: undefined };
}

export const CredentialOfferFromJsonResponse = {
  encode(message: CredentialOfferFromJsonResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.credentialOffer !== undefined) {
      CredentialOffer.encode(message.credentialOffer, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialOfferFromJsonResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialOfferFromJsonResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.credentialOffer = CredentialOffer.decode(reader, reader.uint32());
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

  fromJSON(object: any): CredentialOfferFromJsonResponse {
    return {
      credentialOffer: isSet(object.credentialOffer) ? CredentialOffer.fromJSON(object.credentialOffer) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: CredentialOfferFromJsonResponse): unknown {
    const obj: any = {};
    message.credentialOffer !== undefined &&
      (obj.credentialOffer = message.credentialOffer ? CredentialOffer.toJSON(message.credentialOffer) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CredentialOfferFromJsonResponse>, I>>(
    object: I,
  ): CredentialOfferFromJsonResponse {
    const message = createBaseCredentialOfferFromJsonResponse();
    message.credentialOffer = (object.credentialOffer !== undefined && object.credentialOffer !== null)
      ? CredentialOffer.fromPartial(object.credentialOffer)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseCredentialOfferRedeemRequest(): CredentialOfferRedeemRequest {
  return { configData: undefined, credentialOffer: undefined, identityPrivateKey: "" };
}

export const CredentialOfferRedeemRequest = {
  encode(message: CredentialOfferRedeemRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.credentialOffer !== undefined) {
      CredentialOffer.encode(message.credentialOffer, writer.uint32(18).fork()).ldelim();
    }
    if (message.identityPrivateKey !== "") {
      writer.uint32(26).string(message.identityPrivateKey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialOfferRedeemRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialOfferRedeemRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.credentialOffer = CredentialOffer.decode(reader, reader.uint32());
          break;
        case 3:
          message.identityPrivateKey = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CredentialOfferRedeemRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      credentialOffer: isSet(object.credentialOffer) ? CredentialOffer.fromJSON(object.credentialOffer) : undefined,
      identityPrivateKey: isSet(object.identityPrivateKey) ? String(object.identityPrivateKey) : "",
    };
  },

  toJSON(message: CredentialOfferRedeemRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.credentialOffer !== undefined &&
      (obj.credentialOffer = message.credentialOffer ? CredentialOffer.toJSON(message.credentialOffer) : undefined);
    message.identityPrivateKey !== undefined && (obj.identityPrivateKey = message.identityPrivateKey);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CredentialOfferRedeemRequest>, I>>(object: I): CredentialOfferRedeemRequest {
    const message = createBaseCredentialOfferRedeemRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.credentialOffer = (object.credentialOffer !== undefined && object.credentialOffer !== null)
      ? CredentialOffer.fromPartial(object.credentialOffer)
      : undefined;
    message.identityPrivateKey = object.identityPrivateKey ?? "";
    return message;
  },
};

function createBaseCredentialOfferRedeemResponse(): CredentialOfferRedeemResponse {
  return { credential: undefined, error: undefined };
}

export const CredentialOfferRedeemResponse = {
  encode(message: CredentialOfferRedeemResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.credential !== undefined) {
      Credential.encode(message.credential, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialOfferRedeemResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialOfferRedeemResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.credential = Credential.decode(reader, reader.uint32());
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

  fromJSON(object: any): CredentialOfferRedeemResponse {
    return {
      credential: isSet(object.credential) ? Credential.fromJSON(object.credential) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: CredentialOfferRedeemResponse): unknown {
    const obj: any = {};
    message.credential !== undefined &&
      (obj.credential = message.credential ? Credential.toJSON(message.credential) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CredentialOfferRedeemResponse>, I>>(
    object: I,
  ): CredentialOfferRedeemResponse {
    const message = createBaseCredentialOfferRedeemResponse();
    message.credential = (object.credential !== undefined && object.credential !== null)
      ? Credential.fromPartial(object.credential)
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialToJsonRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.credential = Credential.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
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
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.credential !== undefined &&
      (obj.credential = message.credential ? Credential.toJSON(message.credential) : undefined);
    return obj;
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialToJsonResponse();
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

  fromJSON(object: any): CredentialToJsonResponse {
    return {
      json: isSet(object.json) ? String(object.json) : "",
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: CredentialToJsonResponse): unknown {
    const obj: any = {};
    message.json !== undefined && (obj.json = message.json);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialFromJsonRequest();
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

  fromJSON(object: any): CredentialFromJsonRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      json: isSet(object.json) ? String(object.json) : "",
    };
  },

  toJSON(message: CredentialFromJsonRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.json !== undefined && (obj.json = message.json);
    return obj;
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialFromJsonResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.credential = Credential.decode(reader, reader.uint32());
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

  fromJSON(object: any): CredentialFromJsonResponse {
    return {
      credential: isSet(object.credential) ? Credential.fromJSON(object.credential) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: CredentialFromJsonResponse): unknown {
    const obj: any = {};
    message.credential !== undefined &&
      (obj.credential = message.credential ? Credential.toJSON(message.credential) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
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

function createBaseVerifyCredentialRequest(): VerifyCredentialRequest {
  return { configData: undefined, credential: undefined };
}

export const VerifyCredentialRequest = {
  encode(message: VerifyCredentialRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.credential !== undefined) {
      Credential.encode(message.credential, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyCredentialRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyCredentialRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.credential = Credential.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VerifyCredentialRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      credential: isSet(object.credential) ? Credential.fromJSON(object.credential) : undefined,
    };
  },

  toJSON(message: VerifyCredentialRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.credential !== undefined &&
      (obj.credential = message.credential ? Credential.toJSON(message.credential) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<VerifyCredentialRequest>, I>>(object: I): VerifyCredentialRequest {
    const message = createBaseVerifyCredentialRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.credential = (object.credential !== undefined && object.credential !== null)
      ? Credential.fromPartial(object.credential)
      : undefined;
    return message;
  },
};

function createBaseVerifyCredentialResponse(): VerifyCredentialResponse {
  return { result: undefined, error: undefined };
}

export const VerifyCredentialResponse = {
  encode(message: VerifyCredentialResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result !== undefined) {
      CredentialVerification.encode(message.result, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyCredentialResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyCredentialResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = CredentialVerification.decode(reader, reader.uint32());
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

  fromJSON(object: any): VerifyCredentialResponse {
    return {
      result: isSet(object.result) ? CredentialVerification.fromJSON(object.result) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: VerifyCredentialResponse): unknown {
    const obj: any = {};
    message.result !== undefined &&
      (obj.result = message.result ? CredentialVerification.toJSON(message.result) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<VerifyCredentialResponse>, I>>(object: I): VerifyCredentialResponse {
    const message = createBaseVerifyCredentialResponse();
    message.result = (object.result !== undefined && object.result !== null)
      ? CredentialVerification.fromPartial(object.result)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseRevokeCredentialRequest(): RevokeCredentialRequest {
  return { configData: undefined, credential: undefined };
}

export const RevokeCredentialRequest = {
  encode(message: RevokeCredentialRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.credential !== undefined) {
      Credential.encode(message.credential, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RevokeCredentialRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRevokeCredentialRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.credential = Credential.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RevokeCredentialRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      credential: isSet(object.credential) ? Credential.fromJSON(object.credential) : undefined,
    };
  },

  toJSON(message: RevokeCredentialRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.credential !== undefined &&
      (obj.credential = message.credential ? Credential.toJSON(message.credential) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RevokeCredentialRequest>, I>>(object: I): RevokeCredentialRequest {
    const message = createBaseRevokeCredentialRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.credential = (object.credential !== undefined && object.credential !== null)
      ? Credential.fromPartial(object.credential)
      : undefined;
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRevokeCredentialResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = CredentialRevocation.decode(reader, reader.uint32());
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

  fromJSON(object: any): RevokeCredentialResponse {
    return {
      result: isSet(object.result) ? CredentialRevocation.fromJSON(object.result) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: RevokeCredentialResponse): unknown {
    const obj: any = {};
    message.result !== undefined &&
      (obj.result = message.result ? CredentialRevocation.toJSON(message.result) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
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

export interface IdentityService {
  CreateIdentity(request: CreateIdentityRequest): Promise<CreateIdentityResponse>;
  LoadIdentity(request: LoadIdentityRequest): Promise<LoadIdentityResponse>;
  BuildSchema(request: BuildSchemaRequest): Promise<BuildSchemaResponse>;
  GetSchema(request: GetSchemaRequest): Promise<GetSchemaResponse>;
  CreateCredential(request: CreateCredentialRequest): Promise<CreateCredentialResponse>;
  GetOffer(request: GetOfferRequest): Promise<GetOfferResponse>;
  WaitOffer(request: WaitOfferRequest): Promise<WaitOfferResponse>;
  CredentialOfferToJson(request: CredentialOfferToJsonRequest): Promise<CredentialOfferToJsonResponse>;
  CredentialOfferFromJson(request: CredentialOfferFromJsonRequest): Promise<CredentialOfferFromJsonResponse>;
  CredentialOfferRedeem(request: CredentialOfferRedeemRequest): Promise<CredentialOfferRedeemResponse>;
  CredentialToJson(request: CredentialToJsonRequest): Promise<CredentialToJsonResponse>;
  CredentialFromJson(request: CredentialFromJsonRequest): Promise<CredentialFromJsonResponse>;
  VerifyCredential(request: VerifyCredentialRequest): Promise<VerifyCredentialResponse>;
  RevokeCredential(request: RevokeCredentialRequest): Promise<RevokeCredentialResponse>;
}

export class IdentityServiceClientImpl implements IdentityService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateIdentity = this.CreateIdentity.bind(this);
    this.LoadIdentity = this.LoadIdentity.bind(this);
    this.BuildSchema = this.BuildSchema.bind(this);
    this.GetSchema = this.GetSchema.bind(this);
    this.CreateCredential = this.CreateCredential.bind(this);
    this.GetOffer = this.GetOffer.bind(this);
    this.WaitOffer = this.WaitOffer.bind(this);
    this.CredentialOfferToJson = this.CredentialOfferToJson.bind(this);
    this.CredentialOfferFromJson = this.CredentialOfferFromJson.bind(this);
    this.CredentialOfferRedeem = this.CredentialOfferRedeem.bind(this);
    this.CredentialToJson = this.CredentialToJson.bind(this);
    this.CredentialFromJson = this.CredentialFromJson.bind(this);
    this.VerifyCredential = this.VerifyCredential.bind(this);
    this.RevokeCredential = this.RevokeCredential.bind(this);
  }
  CreateIdentity(request: CreateIdentityRequest): Promise<CreateIdentityResponse> {
    const data = CreateIdentityRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.IdentityService", "CreateIdentity", data);
    return promise.then((data) => CreateIdentityResponse.decode(new _m0.Reader(data)));
  }

  LoadIdentity(request: LoadIdentityRequest): Promise<LoadIdentityResponse> {
    const data = LoadIdentityRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.IdentityService", "LoadIdentity", data);
    return promise.then((data) => LoadIdentityResponse.decode(new _m0.Reader(data)));
  }

  BuildSchema(request: BuildSchemaRequest): Promise<BuildSchemaResponse> {
    const data = BuildSchemaRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.IdentityService", "BuildSchema", data);
    return promise.then((data) => BuildSchemaResponse.decode(new _m0.Reader(data)));
  }

  GetSchema(request: GetSchemaRequest): Promise<GetSchemaResponse> {
    const data = GetSchemaRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.IdentityService", "GetSchema", data);
    return promise.then((data) => GetSchemaResponse.decode(new _m0.Reader(data)));
  }

  CreateCredential(request: CreateCredentialRequest): Promise<CreateCredentialResponse> {
    const data = CreateCredentialRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.IdentityService", "CreateCredential", data);
    return promise.then((data) => CreateCredentialResponse.decode(new _m0.Reader(data)));
  }

  GetOffer(request: GetOfferRequest): Promise<GetOfferResponse> {
    const data = GetOfferRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.IdentityService", "GetOffer", data);
    return promise.then((data) => GetOfferResponse.decode(new _m0.Reader(data)));
  }

  WaitOffer(request: WaitOfferRequest): Promise<WaitOfferResponse> {
    const data = WaitOfferRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.IdentityService", "WaitOffer", data);
    return promise.then((data) => WaitOfferResponse.decode(new _m0.Reader(data)));
  }

  CredentialOfferToJson(request: CredentialOfferToJsonRequest): Promise<CredentialOfferToJsonResponse> {
    const data = CredentialOfferToJsonRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.IdentityService", "CredentialOfferToJson", data);
    return promise.then((data) => CredentialOfferToJsonResponse.decode(new _m0.Reader(data)));
  }

  CredentialOfferFromJson(request: CredentialOfferFromJsonRequest): Promise<CredentialOfferFromJsonResponse> {
    const data = CredentialOfferFromJsonRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.IdentityService", "CredentialOfferFromJson", data);
    return promise.then((data) => CredentialOfferFromJsonResponse.decode(new _m0.Reader(data)));
  }

  CredentialOfferRedeem(request: CredentialOfferRedeemRequest): Promise<CredentialOfferRedeemResponse> {
    const data = CredentialOfferRedeemRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.IdentityService", "CredentialOfferRedeem", data);
    return promise.then((data) => CredentialOfferRedeemResponse.decode(new _m0.Reader(data)));
  }

  CredentialToJson(request: CredentialToJsonRequest): Promise<CredentialToJsonResponse> {
    const data = CredentialToJsonRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.IdentityService", "CredentialToJson", data);
    return promise.then((data) => CredentialToJsonResponse.decode(new _m0.Reader(data)));
  }

  CredentialFromJson(request: CredentialFromJsonRequest): Promise<CredentialFromJsonResponse> {
    const data = CredentialFromJsonRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.IdentityService", "CredentialFromJson", data);
    return promise.then((data) => CredentialFromJsonResponse.decode(new _m0.Reader(data)));
  }

  VerifyCredential(request: VerifyCredentialRequest): Promise<VerifyCredentialResponse> {
    const data = VerifyCredentialRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.IdentityService", "VerifyCredential", data);
    return promise.then((data) => VerifyCredentialResponse.decode(new _m0.Reader(data)));
  }

  RevokeCredential(request: RevokeCredentialRequest): Promise<RevokeCredentialResponse> {
    const data = RevokeCredentialRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.IdentityService", "RevokeCredential", data);
    return promise.then((data) => RevokeCredentialResponse.decode(new _m0.Reader(data)));
  }
}

export type IdentityServiceDefinition = typeof IdentityServiceDefinition;
export const IdentityServiceDefinition = {
  name: "IdentityService",
  fullName: "bloock.IdentityService",
  methods: {
    createIdentity: {
      name: "CreateIdentity",
      requestType: CreateIdentityRequest,
      requestStream: false,
      responseType: CreateIdentityResponse,
      responseStream: false,
      options: {},
    },
    loadIdentity: {
      name: "LoadIdentity",
      requestType: LoadIdentityRequest,
      requestStream: false,
      responseType: LoadIdentityResponse,
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
    getOffer: {
      name: "GetOffer",
      requestType: GetOfferRequest,
      requestStream: false,
      responseType: GetOfferResponse,
      responseStream: false,
      options: {},
    },
    waitOffer: {
      name: "WaitOffer",
      requestType: WaitOfferRequest,
      requestStream: false,
      responseType: WaitOfferResponse,
      responseStream: false,
      options: {},
    },
    credentialOfferToJson: {
      name: "CredentialOfferToJson",
      requestType: CredentialOfferToJsonRequest,
      requestStream: false,
      responseType: CredentialOfferToJsonResponse,
      responseStream: false,
      options: {},
    },
    credentialOfferFromJson: {
      name: "CredentialOfferFromJson",
      requestType: CredentialOfferFromJsonRequest,
      requestStream: false,
      responseType: CredentialOfferFromJsonResponse,
      responseStream: false,
      options: {},
    },
    credentialOfferRedeem: {
      name: "CredentialOfferRedeem",
      requestType: CredentialOfferRedeemRequest,
      requestStream: false,
      responseType: CredentialOfferRedeemResponse,
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
    verifyCredential: {
      name: "VerifyCredential",
      requestType: VerifyCredentialRequest,
      requestStream: false,
      responseType: VerifyCredentialResponse,
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
