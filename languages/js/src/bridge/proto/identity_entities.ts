/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface Identity {
  mnemonic: string;
  key: string;
  privateKey: string;
}

export interface BooleanAttributeDefinition {
  displayName: string;
  id: string;
  description: string;
}

export interface DateAttributeDefinition {
  displayName: string;
  id: string;
  description: string;
}

export interface DateTimeAttributeDefinition {
  displayName: string;
  id: string;
  description: string;
}

export interface MultiChoiceAttributeDefinition {
  displayName: string;
  id: string;
  description: string;
  allowedValues: string[];
}

export interface NumberAttributeDefinition {
  displayName: string;
  id: string;
  description: string;
}

export interface BooleanAttribute {
  id: string;
  value: boolean;
}

export interface DateAttribute {
  id: string;
  value: number;
}

export interface DateTimeAttribute {
  id: string;
  value: number;
}

export interface MultiChoiceAttribute {
  id: string;
  value: string;
}

export interface NumberAttribute {
  id: string;
  value: number;
}

export interface Schema {
  id: string;
  jsonLd: string;
}

export interface CredentialOffer {
  id: string;
  typ: string;
  type: string;
  thid: string;
  body?: CredentialOfferBody;
  from: string;
  to: string;
}

export interface CredentialOfferBody {
  url: string;
  credentials?: CredentialOfferBodyCredentials;
}

export interface CredentialOfferBodyCredentials {
  id: string;
  description: string;
}

export interface CredentialReceipt {
  id: string;
  anchorId: number;
}

export interface Credential {
  threadId: string;
  body?: CredentialBody;
}

export interface CredentialBody {
  id: string;
  type: string[];
  issuanceDate: string;
  credentialSubject: string;
  credentialStatus?: CredentialStatus;
  issuer: string;
  credentialSchema?: CredentialSchema;
  proof: string;
}

export interface CredentialStatus {
  id: string;
  revocationNonce: number;
  type: string;
}

export interface CredentialSchema {
  id: string;
  type: string;
}

export interface CredentialVerification {
  timestamp: number;
  issuer: string;
  revocation: number;
}

export interface CredentialRevocation {
  timestamp: number;
}

function createBaseIdentity(): Identity {
  return { mnemonic: "", key: "", privateKey: "" };
}

export const Identity = {
  encode(message: Identity, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.mnemonic !== "") {
      writer.uint32(10).string(message.mnemonic);
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    if (message.privateKey !== "") {
      writer.uint32(26).string(message.privateKey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Identity {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIdentity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.mnemonic = reader.string();
          break;
        case 2:
          message.key = reader.string();
          break;
        case 3:
          message.privateKey = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Identity {
    return {
      mnemonic: isSet(object.mnemonic) ? String(object.mnemonic) : "",
      key: isSet(object.key) ? String(object.key) : "",
      privateKey: isSet(object.privateKey) ? String(object.privateKey) : "",
    };
  },

  toJSON(message: Identity): unknown {
    const obj: any = {};
    message.mnemonic !== undefined && (obj.mnemonic = message.mnemonic);
    message.key !== undefined && (obj.key = message.key);
    message.privateKey !== undefined && (obj.privateKey = message.privateKey);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Identity>, I>>(object: I): Identity {
    const message = createBaseIdentity();
    message.mnemonic = object.mnemonic ?? "";
    message.key = object.key ?? "";
    message.privateKey = object.privateKey ?? "";
    return message;
  },
};

function createBaseBooleanAttributeDefinition(): BooleanAttributeDefinition {
  return { displayName: "", id: "", description: "" };
}

export const BooleanAttributeDefinition = {
  encode(message: BooleanAttributeDefinition, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.displayName !== "") {
      writer.uint32(10).string(message.displayName);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BooleanAttributeDefinition {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBooleanAttributeDefinition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.displayName = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BooleanAttributeDefinition {
    return {
      displayName: isSet(object.displayName) ? String(object.displayName) : "",
      id: isSet(object.id) ? String(object.id) : "",
      description: isSet(object.description) ? String(object.description) : "",
    };
  },

  toJSON(message: BooleanAttributeDefinition): unknown {
    const obj: any = {};
    message.displayName !== undefined && (obj.displayName = message.displayName);
    message.id !== undefined && (obj.id = message.id);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BooleanAttributeDefinition>, I>>(object: I): BooleanAttributeDefinition {
    const message = createBaseBooleanAttributeDefinition();
    message.displayName = object.displayName ?? "";
    message.id = object.id ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseDateAttributeDefinition(): DateAttributeDefinition {
  return { displayName: "", id: "", description: "" };
}

export const DateAttributeDefinition = {
  encode(message: DateAttributeDefinition, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.displayName !== "") {
      writer.uint32(10).string(message.displayName);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DateAttributeDefinition {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDateAttributeDefinition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.displayName = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DateAttributeDefinition {
    return {
      displayName: isSet(object.displayName) ? String(object.displayName) : "",
      id: isSet(object.id) ? String(object.id) : "",
      description: isSet(object.description) ? String(object.description) : "",
    };
  },

  toJSON(message: DateAttributeDefinition): unknown {
    const obj: any = {};
    message.displayName !== undefined && (obj.displayName = message.displayName);
    message.id !== undefined && (obj.id = message.id);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DateAttributeDefinition>, I>>(object: I): DateAttributeDefinition {
    const message = createBaseDateAttributeDefinition();
    message.displayName = object.displayName ?? "";
    message.id = object.id ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseDateTimeAttributeDefinition(): DateTimeAttributeDefinition {
  return { displayName: "", id: "", description: "" };
}

export const DateTimeAttributeDefinition = {
  encode(message: DateTimeAttributeDefinition, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.displayName !== "") {
      writer.uint32(10).string(message.displayName);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DateTimeAttributeDefinition {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDateTimeAttributeDefinition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.displayName = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DateTimeAttributeDefinition {
    return {
      displayName: isSet(object.displayName) ? String(object.displayName) : "",
      id: isSet(object.id) ? String(object.id) : "",
      description: isSet(object.description) ? String(object.description) : "",
    };
  },

  toJSON(message: DateTimeAttributeDefinition): unknown {
    const obj: any = {};
    message.displayName !== undefined && (obj.displayName = message.displayName);
    message.id !== undefined && (obj.id = message.id);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DateTimeAttributeDefinition>, I>>(object: I): DateTimeAttributeDefinition {
    const message = createBaseDateTimeAttributeDefinition();
    message.displayName = object.displayName ?? "";
    message.id = object.id ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseMultiChoiceAttributeDefinition(): MultiChoiceAttributeDefinition {
  return { displayName: "", id: "", description: "", allowedValues: [] };
}

export const MultiChoiceAttributeDefinition = {
  encode(message: MultiChoiceAttributeDefinition, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.displayName !== "") {
      writer.uint32(10).string(message.displayName);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    for (const v of message.allowedValues) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MultiChoiceAttributeDefinition {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMultiChoiceAttributeDefinition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.displayName = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.allowedValues.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MultiChoiceAttributeDefinition {
    return {
      displayName: isSet(object.displayName) ? String(object.displayName) : "",
      id: isSet(object.id) ? String(object.id) : "",
      description: isSet(object.description) ? String(object.description) : "",
      allowedValues: Array.isArray(object?.allowedValues) ? object.allowedValues.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: MultiChoiceAttributeDefinition): unknown {
    const obj: any = {};
    message.displayName !== undefined && (obj.displayName = message.displayName);
    message.id !== undefined && (obj.id = message.id);
    message.description !== undefined && (obj.description = message.description);
    if (message.allowedValues) {
      obj.allowedValues = message.allowedValues.map((e) => e);
    } else {
      obj.allowedValues = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MultiChoiceAttributeDefinition>, I>>(
    object: I,
  ): MultiChoiceAttributeDefinition {
    const message = createBaseMultiChoiceAttributeDefinition();
    message.displayName = object.displayName ?? "";
    message.id = object.id ?? "";
    message.description = object.description ?? "";
    message.allowedValues = object.allowedValues?.map((e) => e) || [];
    return message;
  },
};

function createBaseNumberAttributeDefinition(): NumberAttributeDefinition {
  return { displayName: "", id: "", description: "" };
}

export const NumberAttributeDefinition = {
  encode(message: NumberAttributeDefinition, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.displayName !== "") {
      writer.uint32(10).string(message.displayName);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NumberAttributeDefinition {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNumberAttributeDefinition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.displayName = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NumberAttributeDefinition {
    return {
      displayName: isSet(object.displayName) ? String(object.displayName) : "",
      id: isSet(object.id) ? String(object.id) : "",
      description: isSet(object.description) ? String(object.description) : "",
    };
  },

  toJSON(message: NumberAttributeDefinition): unknown {
    const obj: any = {};
    message.displayName !== undefined && (obj.displayName = message.displayName);
    message.id !== undefined && (obj.id = message.id);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NumberAttributeDefinition>, I>>(object: I): NumberAttributeDefinition {
    const message = createBaseNumberAttributeDefinition();
    message.displayName = object.displayName ?? "";
    message.id = object.id ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseBooleanAttribute(): BooleanAttribute {
  return { id: "", value: false };
}

export const BooleanAttribute = {
  encode(message: BooleanAttribute, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.value === true) {
      writer.uint32(16).bool(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BooleanAttribute {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBooleanAttribute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.value = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BooleanAttribute {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      value: isSet(object.value) ? Boolean(object.value) : false,
    };
  },

  toJSON(message: BooleanAttribute): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BooleanAttribute>, I>>(object: I): BooleanAttribute {
    const message = createBaseBooleanAttribute();
    message.id = object.id ?? "";
    message.value = object.value ?? false;
    return message;
  },
};

function createBaseDateAttribute(): DateAttribute {
  return { id: "", value: 0 };
}

export const DateAttribute = {
  encode(message: DateAttribute, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.value !== 0) {
      writer.uint32(16).int64(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DateAttribute {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDateAttribute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.value = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DateAttribute {
    return { id: isSet(object.id) ? String(object.id) : "", value: isSet(object.value) ? Number(object.value) : 0 };
  },

  toJSON(message: DateAttribute): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.value !== undefined && (obj.value = Math.round(message.value));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DateAttribute>, I>>(object: I): DateAttribute {
    const message = createBaseDateAttribute();
    message.id = object.id ?? "";
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseDateTimeAttribute(): DateTimeAttribute {
  return { id: "", value: 0 };
}

export const DateTimeAttribute = {
  encode(message: DateTimeAttribute, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.value !== 0) {
      writer.uint32(16).int64(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DateTimeAttribute {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDateTimeAttribute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.value = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DateTimeAttribute {
    return { id: isSet(object.id) ? String(object.id) : "", value: isSet(object.value) ? Number(object.value) : 0 };
  },

  toJSON(message: DateTimeAttribute): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.value !== undefined && (obj.value = Math.round(message.value));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DateTimeAttribute>, I>>(object: I): DateTimeAttribute {
    const message = createBaseDateTimeAttribute();
    message.id = object.id ?? "";
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseMultiChoiceAttribute(): MultiChoiceAttribute {
  return { id: "", value: "" };
}

export const MultiChoiceAttribute = {
  encode(message: MultiChoiceAttribute, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MultiChoiceAttribute {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMultiChoiceAttribute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MultiChoiceAttribute {
    return { id: isSet(object.id) ? String(object.id) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: MultiChoiceAttribute): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MultiChoiceAttribute>, I>>(object: I): MultiChoiceAttribute {
    const message = createBaseMultiChoiceAttribute();
    message.id = object.id ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseNumberAttribute(): NumberAttribute {
  return { id: "", value: 0 };
}

export const NumberAttribute = {
  encode(message: NumberAttribute, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.value !== 0) {
      writer.uint32(16).int64(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NumberAttribute {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNumberAttribute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.value = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NumberAttribute {
    return { id: isSet(object.id) ? String(object.id) : "", value: isSet(object.value) ? Number(object.value) : 0 };
  },

  toJSON(message: NumberAttribute): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.value !== undefined && (obj.value = Math.round(message.value));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NumberAttribute>, I>>(object: I): NumberAttribute {
    const message = createBaseNumberAttribute();
    message.id = object.id ?? "";
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseSchema(): Schema {
  return { id: "", jsonLd: "" };
}

export const Schema = {
  encode(message: Schema, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.jsonLd !== "") {
      writer.uint32(18).string(message.jsonLd);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Schema {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSchema();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.jsonLd = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Schema {
    return { id: isSet(object.id) ? String(object.id) : "", jsonLd: isSet(object.jsonLd) ? String(object.jsonLd) : "" };
  },

  toJSON(message: Schema): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.jsonLd !== undefined && (obj.jsonLd = message.jsonLd);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Schema>, I>>(object: I): Schema {
    const message = createBaseSchema();
    message.id = object.id ?? "";
    message.jsonLd = object.jsonLd ?? "";
    return message;
  },
};

function createBaseCredentialOffer(): CredentialOffer {
  return { id: "", typ: "", type: "", thid: "", body: undefined, from: "", to: "" };
}

export const CredentialOffer = {
  encode(message: CredentialOffer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.typ !== "") {
      writer.uint32(18).string(message.typ);
    }
    if (message.type !== "") {
      writer.uint32(26).string(message.type);
    }
    if (message.thid !== "") {
      writer.uint32(34).string(message.thid);
    }
    if (message.body !== undefined) {
      CredentialOfferBody.encode(message.body, writer.uint32(42).fork()).ldelim();
    }
    if (message.from !== "") {
      writer.uint32(50).string(message.from);
    }
    if (message.to !== "") {
      writer.uint32(58).string(message.to);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialOffer {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialOffer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.typ = reader.string();
          break;
        case 3:
          message.type = reader.string();
          break;
        case 4:
          message.thid = reader.string();
          break;
        case 5:
          message.body = CredentialOfferBody.decode(reader, reader.uint32());
          break;
        case 6:
          message.from = reader.string();
          break;
        case 7:
          message.to = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CredentialOffer {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      typ: isSet(object.typ) ? String(object.typ) : "",
      type: isSet(object.type) ? String(object.type) : "",
      thid: isSet(object.thid) ? String(object.thid) : "",
      body: isSet(object.body) ? CredentialOfferBody.fromJSON(object.body) : undefined,
      from: isSet(object.from) ? String(object.from) : "",
      to: isSet(object.to) ? String(object.to) : "",
    };
  },

  toJSON(message: CredentialOffer): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.typ !== undefined && (obj.typ = message.typ);
    message.type !== undefined && (obj.type = message.type);
    message.thid !== undefined && (obj.thid = message.thid);
    message.body !== undefined && (obj.body = message.body ? CredentialOfferBody.toJSON(message.body) : undefined);
    message.from !== undefined && (obj.from = message.from);
    message.to !== undefined && (obj.to = message.to);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CredentialOffer>, I>>(object: I): CredentialOffer {
    const message = createBaseCredentialOffer();
    message.id = object.id ?? "";
    message.typ = object.typ ?? "";
    message.type = object.type ?? "";
    message.thid = object.thid ?? "";
    message.body = (object.body !== undefined && object.body !== null)
      ? CredentialOfferBody.fromPartial(object.body)
      : undefined;
    message.from = object.from ?? "";
    message.to = object.to ?? "";
    return message;
  },
};

function createBaseCredentialOfferBody(): CredentialOfferBody {
  return { url: "", credentials: undefined };
}

export const CredentialOfferBody = {
  encode(message: CredentialOfferBody, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.url !== "") {
      writer.uint32(10).string(message.url);
    }
    if (message.credentials !== undefined) {
      CredentialOfferBodyCredentials.encode(message.credentials, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialOfferBody {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialOfferBody();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.url = reader.string();
          break;
        case 2:
          message.credentials = CredentialOfferBodyCredentials.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CredentialOfferBody {
    return {
      url: isSet(object.url) ? String(object.url) : "",
      credentials: isSet(object.credentials) ? CredentialOfferBodyCredentials.fromJSON(object.credentials) : undefined,
    };
  },

  toJSON(message: CredentialOfferBody): unknown {
    const obj: any = {};
    message.url !== undefined && (obj.url = message.url);
    message.credentials !== undefined &&
      (obj.credentials = message.credentials ? CredentialOfferBodyCredentials.toJSON(message.credentials) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CredentialOfferBody>, I>>(object: I): CredentialOfferBody {
    const message = createBaseCredentialOfferBody();
    message.url = object.url ?? "";
    message.credentials = (object.credentials !== undefined && object.credentials !== null)
      ? CredentialOfferBodyCredentials.fromPartial(object.credentials)
      : undefined;
    return message;
  },
};

function createBaseCredentialOfferBodyCredentials(): CredentialOfferBodyCredentials {
  return { id: "", description: "" };
}

export const CredentialOfferBodyCredentials = {
  encode(message: CredentialOfferBodyCredentials, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialOfferBodyCredentials {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialOfferBodyCredentials();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CredentialOfferBodyCredentials {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      description: isSet(object.description) ? String(object.description) : "",
    };
  },

  toJSON(message: CredentialOfferBodyCredentials): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CredentialOfferBodyCredentials>, I>>(
    object: I,
  ): CredentialOfferBodyCredentials {
    const message = createBaseCredentialOfferBodyCredentials();
    message.id = object.id ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseCredentialReceipt(): CredentialReceipt {
  return { id: "", anchorId: 0 };
}

export const CredentialReceipt = {
  encode(message: CredentialReceipt, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.anchorId !== 0) {
      writer.uint32(16).int64(message.anchorId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialReceipt {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialReceipt();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.anchorId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CredentialReceipt {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      anchorId: isSet(object.anchorId) ? Number(object.anchorId) : 0,
    };
  },

  toJSON(message: CredentialReceipt): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.anchorId !== undefined && (obj.anchorId = Math.round(message.anchorId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CredentialReceipt>, I>>(object: I): CredentialReceipt {
    const message = createBaseCredentialReceipt();
    message.id = object.id ?? "";
    message.anchorId = object.anchorId ?? 0;
    return message;
  },
};

function createBaseCredential(): Credential {
  return { threadId: "", body: undefined };
}

export const Credential = {
  encode(message: Credential, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.threadId !== "") {
      writer.uint32(10).string(message.threadId);
    }
    if (message.body !== undefined) {
      CredentialBody.encode(message.body, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Credential {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredential();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.threadId = reader.string();
          break;
        case 2:
          message.body = CredentialBody.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Credential {
    return {
      threadId: isSet(object.threadId) ? String(object.threadId) : "",
      body: isSet(object.body) ? CredentialBody.fromJSON(object.body) : undefined,
    };
  },

  toJSON(message: Credential): unknown {
    const obj: any = {};
    message.threadId !== undefined && (obj.threadId = message.threadId);
    message.body !== undefined && (obj.body = message.body ? CredentialBody.toJSON(message.body) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Credential>, I>>(object: I): Credential {
    const message = createBaseCredential();
    message.threadId = object.threadId ?? "";
    message.body = (object.body !== undefined && object.body !== null)
      ? CredentialBody.fromPartial(object.body)
      : undefined;
    return message;
  },
};

function createBaseCredentialBody(): CredentialBody {
  return {
    id: "",
    type: [],
    issuanceDate: "",
    credentialSubject: "",
    credentialStatus: undefined,
    issuer: "",
    credentialSchema: undefined,
    proof: "",
  };
}

export const CredentialBody = {
  encode(message: CredentialBody, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    for (const v of message.type) {
      writer.uint32(18).string(v!);
    }
    if (message.issuanceDate !== "") {
      writer.uint32(26).string(message.issuanceDate);
    }
    if (message.credentialSubject !== "") {
      writer.uint32(34).string(message.credentialSubject);
    }
    if (message.credentialStatus !== undefined) {
      CredentialStatus.encode(message.credentialStatus, writer.uint32(42).fork()).ldelim();
    }
    if (message.issuer !== "") {
      writer.uint32(50).string(message.issuer);
    }
    if (message.credentialSchema !== undefined) {
      CredentialSchema.encode(message.credentialSchema, writer.uint32(58).fork()).ldelim();
    }
    if (message.proof !== "") {
      writer.uint32(66).string(message.proof);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialBody {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialBody();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.type.push(reader.string());
          break;
        case 3:
          message.issuanceDate = reader.string();
          break;
        case 4:
          message.credentialSubject = reader.string();
          break;
        case 5:
          message.credentialStatus = CredentialStatus.decode(reader, reader.uint32());
          break;
        case 6:
          message.issuer = reader.string();
          break;
        case 7:
          message.credentialSchema = CredentialSchema.decode(reader, reader.uint32());
          break;
        case 8:
          message.proof = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CredentialBody {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      type: Array.isArray(object?.type) ? object.type.map((e: any) => String(e)) : [],
      issuanceDate: isSet(object.issuanceDate) ? String(object.issuanceDate) : "",
      credentialSubject: isSet(object.credentialSubject) ? String(object.credentialSubject) : "",
      credentialStatus: isSet(object.credentialStatus) ? CredentialStatus.fromJSON(object.credentialStatus) : undefined,
      issuer: isSet(object.issuer) ? String(object.issuer) : "",
      credentialSchema: isSet(object.credentialSchema) ? CredentialSchema.fromJSON(object.credentialSchema) : undefined,
      proof: isSet(object.proof) ? String(object.proof) : "",
    };
  },

  toJSON(message: CredentialBody): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    if (message.type) {
      obj.type = message.type.map((e) => e);
    } else {
      obj.type = [];
    }
    message.issuanceDate !== undefined && (obj.issuanceDate = message.issuanceDate);
    message.credentialSubject !== undefined && (obj.credentialSubject = message.credentialSubject);
    message.credentialStatus !== undefined &&
      (obj.credentialStatus = message.credentialStatus ? CredentialStatus.toJSON(message.credentialStatus) : undefined);
    message.issuer !== undefined && (obj.issuer = message.issuer);
    message.credentialSchema !== undefined &&
      (obj.credentialSchema = message.credentialSchema ? CredentialSchema.toJSON(message.credentialSchema) : undefined);
    message.proof !== undefined && (obj.proof = message.proof);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CredentialBody>, I>>(object: I): CredentialBody {
    const message = createBaseCredentialBody();
    message.id = object.id ?? "";
    message.type = object.type?.map((e) => e) || [];
    message.issuanceDate = object.issuanceDate ?? "";
    message.credentialSubject = object.credentialSubject ?? "";
    message.credentialStatus = (object.credentialStatus !== undefined && object.credentialStatus !== null)
      ? CredentialStatus.fromPartial(object.credentialStatus)
      : undefined;
    message.issuer = object.issuer ?? "";
    message.credentialSchema = (object.credentialSchema !== undefined && object.credentialSchema !== null)
      ? CredentialSchema.fromPartial(object.credentialSchema)
      : undefined;
    message.proof = object.proof ?? "";
    return message;
  },
};

function createBaseCredentialStatus(): CredentialStatus {
  return { id: "", revocationNonce: 0, type: "" };
}

export const CredentialStatus = {
  encode(message: CredentialStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.revocationNonce !== 0) {
      writer.uint32(16).int64(message.revocationNonce);
    }
    if (message.type !== "") {
      writer.uint32(26).string(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialStatus {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.revocationNonce = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CredentialStatus {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      revocationNonce: isSet(object.revocationNonce) ? Number(object.revocationNonce) : 0,
      type: isSet(object.type) ? String(object.type) : "",
    };
  },

  toJSON(message: CredentialStatus): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.revocationNonce !== undefined && (obj.revocationNonce = Math.round(message.revocationNonce));
    message.type !== undefined && (obj.type = message.type);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CredentialStatus>, I>>(object: I): CredentialStatus {
    const message = createBaseCredentialStatus();
    message.id = object.id ?? "";
    message.revocationNonce = object.revocationNonce ?? 0;
    message.type = object.type ?? "";
    return message;
  },
};

function createBaseCredentialSchema(): CredentialSchema {
  return { id: "", type: "" };
}

export const CredentialSchema = {
  encode(message: CredentialSchema, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialSchema {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialSchema();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CredentialSchema {
    return { id: isSet(object.id) ? String(object.id) : "", type: isSet(object.type) ? String(object.type) : "" };
  },

  toJSON(message: CredentialSchema): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.type !== undefined && (obj.type = message.type);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CredentialSchema>, I>>(object: I): CredentialSchema {
    const message = createBaseCredentialSchema();
    message.id = object.id ?? "";
    message.type = object.type ?? "";
    return message;
  },
};

function createBaseCredentialVerification(): CredentialVerification {
  return { timestamp: 0, issuer: "", revocation: 0 };
}

export const CredentialVerification = {
  encode(message: CredentialVerification, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).int64(message.timestamp);
    }
    if (message.issuer !== "") {
      writer.uint32(18).string(message.issuer);
    }
    if (message.revocation !== 0) {
      writer.uint32(24).int64(message.revocation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialVerification {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialVerification();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timestamp = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.issuer = reader.string();
          break;
        case 3:
          message.revocation = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CredentialVerification {
    return {
      timestamp: isSet(object.timestamp) ? Number(object.timestamp) : 0,
      issuer: isSet(object.issuer) ? String(object.issuer) : "",
      revocation: isSet(object.revocation) ? Number(object.revocation) : 0,
    };
  },

  toJSON(message: CredentialVerification): unknown {
    const obj: any = {};
    message.timestamp !== undefined && (obj.timestamp = Math.round(message.timestamp));
    message.issuer !== undefined && (obj.issuer = message.issuer);
    message.revocation !== undefined && (obj.revocation = Math.round(message.revocation));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CredentialVerification>, I>>(object: I): CredentialVerification {
    const message = createBaseCredentialVerification();
    message.timestamp = object.timestamp ?? 0;
    message.issuer = object.issuer ?? "";
    message.revocation = object.revocation ?? 0;
    return message;
  },
};

function createBaseCredentialRevocation(): CredentialRevocation {
  return { timestamp: 0 };
}

export const CredentialRevocation = {
  encode(message: CredentialRevocation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).int64(message.timestamp);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialRevocation {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialRevocation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timestamp = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CredentialRevocation {
    return { timestamp: isSet(object.timestamp) ? Number(object.timestamp) : 0 };
  },

  toJSON(message: CredentialRevocation): unknown {
    const obj: any = {};
    message.timestamp !== undefined && (obj.timestamp = Math.round(message.timestamp));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CredentialRevocation>, I>>(object: I): CredentialRevocation {
    const message = createBaseCredentialRevocation();
    message.timestamp = object.timestamp ?? 0;
    return message;
  },
};

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
