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
  json: string;
}

export interface Credential {
  json: string;
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
  return { json: "" };
}

export const CredentialOffer = {
  encode(message: CredentialOffer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.json !== "") {
      writer.uint32(10).string(message.json);
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
          message.json = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CredentialOffer {
    return { json: isSet(object.json) ? String(object.json) : "" };
  },

  toJSON(message: CredentialOffer): unknown {
    const obj: any = {};
    message.json !== undefined && (obj.json = message.json);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CredentialOffer>, I>>(object: I): CredentialOffer {
    const message = createBaseCredentialOffer();
    message.json = object.json ?? "";
    return message;
  },
};

function createBaseCredential(): Credential {
  return { json: "" };
}

export const Credential = {
  encode(message: Credential, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.json !== "") {
      writer.uint32(10).string(message.json);
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
          message.json = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Credential {
    return { json: isSet(object.json) ? String(object.json) : "" };
  },

  toJSON(message: Credential): unknown {
    const obj: any = {};
    message.json !== undefined && (obj.json = message.json);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Credential>, I>>(object: I): Credential {
    const message = createBaseCredential();
    message.json = object.json ?? "";
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
