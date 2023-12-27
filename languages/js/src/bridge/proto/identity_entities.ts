/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Proof } from "./integrity_entities";

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

export interface StringAttributeDefinition {
  displayName: string;
  id: string;
  description: string;
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

export interface StringAttribute {
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
  thid: string;
  body?: CredentialOfferBody | undefined;
  From: string;
  To: string;
}

export interface CredentialOfferBody {
  url: string;
  credentials: CredentialOfferBodyCredentials[];
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
  context: string[];
  id: string;
  type: string[];
  issuanceDate: string;
  credentialSubject: string;
  credentialStatus?: CredentialStatus | undefined;
  issuer: string;
  credentialSchema?: CredentialSchema | undefined;
  proof?: CredentialProof | undefined;
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

export interface CredentialProof {
  bloockProof?: Proof | undefined;
  signatureProof?: SignatureJWS | undefined;
}

export interface CredentialVerification {
  timestamp: number;
  issuer: string;
  revocation: number;
}

export interface CredentialRevocation {
  success: boolean;
}

export interface SignatureJWS {
  signature: string;
  protected: string;
  header?: SignatureHeaderJWS | undefined;
  messageHash: string;
}

export interface SignatureHeaderJWS {
  alg: string;
  kid: string;
  subject?: string | undefined;
  hashAlg?: string | undefined;
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIdentity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.mnemonic = reader.string();
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

          message.privateKey = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Identity {
    return {
      mnemonic: isSet(object.mnemonic) ? globalThis.String(object.mnemonic) : "",
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      privateKey: isSet(object.privateKey) ? globalThis.String(object.privateKey) : "",
    };
  },

  toJSON(message: Identity): unknown {
    const obj: any = {};
    if (message.mnemonic !== "") {
      obj.mnemonic = message.mnemonic;
    }
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.privateKey !== "") {
      obj.privateKey = message.privateKey;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Identity>, I>>(base?: I): Identity {
    return Identity.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBooleanAttributeDefinition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.description = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BooleanAttributeDefinition {
    return {
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
    };
  },

  toJSON(message: BooleanAttributeDefinition): unknown {
    const obj: any = {};
    if (message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BooleanAttributeDefinition>, I>>(base?: I): BooleanAttributeDefinition {
    return BooleanAttributeDefinition.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDateAttributeDefinition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.description = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DateAttributeDefinition {
    return {
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
    };
  },

  toJSON(message: DateAttributeDefinition): unknown {
    const obj: any = {};
    if (message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DateAttributeDefinition>, I>>(base?: I): DateAttributeDefinition {
    return DateAttributeDefinition.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDateTimeAttributeDefinition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.description = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DateTimeAttributeDefinition {
    return {
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
    };
  },

  toJSON(message: DateTimeAttributeDefinition): unknown {
    const obj: any = {};
    if (message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DateTimeAttributeDefinition>, I>>(base?: I): DateTimeAttributeDefinition {
    return DateTimeAttributeDefinition.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DateTimeAttributeDefinition>, I>>(object: I): DateTimeAttributeDefinition {
    const message = createBaseDateTimeAttributeDefinition();
    message.displayName = object.displayName ?? "";
    message.id = object.id ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseStringAttributeDefinition(): StringAttributeDefinition {
  return { displayName: "", id: "", description: "" };
}

export const StringAttributeDefinition = {
  encode(message: StringAttributeDefinition, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): StringAttributeDefinition {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStringAttributeDefinition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.description = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StringAttributeDefinition {
    return {
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
    };
  },

  toJSON(message: StringAttributeDefinition): unknown {
    const obj: any = {};
    if (message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StringAttributeDefinition>, I>>(base?: I): StringAttributeDefinition {
    return StringAttributeDefinition.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StringAttributeDefinition>, I>>(object: I): StringAttributeDefinition {
    const message = createBaseStringAttributeDefinition();
    message.displayName = object.displayName ?? "";
    message.id = object.id ?? "";
    message.description = object.description ?? "";
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNumberAttributeDefinition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.description = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NumberAttributeDefinition {
    return {
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
    };
  },

  toJSON(message: NumberAttributeDefinition): unknown {
    const obj: any = {};
    if (message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NumberAttributeDefinition>, I>>(base?: I): NumberAttributeDefinition {
    return NumberAttributeDefinition.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBooleanAttribute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.value = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BooleanAttribute {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      value: isSet(object.value) ? globalThis.Boolean(object.value) : false,
    };
  },

  toJSON(message: BooleanAttribute): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.value === true) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BooleanAttribute>, I>>(base?: I): BooleanAttribute {
    return BooleanAttribute.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDateAttribute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.value = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DateAttribute {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      value: isSet(object.value) ? globalThis.Number(object.value) : 0,
    };
  },

  toJSON(message: DateAttribute): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DateAttribute>, I>>(base?: I): DateAttribute {
    return DateAttribute.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDateTimeAttribute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.value = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DateTimeAttribute {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      value: isSet(object.value) ? globalThis.Number(object.value) : 0,
    };
  },

  toJSON(message: DateTimeAttribute): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DateTimeAttribute>, I>>(base?: I): DateTimeAttribute {
    return DateTimeAttribute.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DateTimeAttribute>, I>>(object: I): DateTimeAttribute {
    const message = createBaseDateTimeAttribute();
    message.id = object.id ?? "";
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseStringAttribute(): StringAttribute {
  return { id: "", value: "" };
}

export const StringAttribute = {
  encode(message: StringAttribute, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StringAttribute {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStringAttribute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StringAttribute {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: StringAttribute): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StringAttribute>, I>>(base?: I): StringAttribute {
    return StringAttribute.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StringAttribute>, I>>(object: I): StringAttribute {
    const message = createBaseStringAttribute();
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNumberAttribute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.value = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NumberAttribute {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      value: isSet(object.value) ? globalThis.Number(object.value) : 0,
    };
  },

  toJSON(message: NumberAttribute): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NumberAttribute>, I>>(base?: I): NumberAttribute {
    return NumberAttribute.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSchema();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.jsonLd = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Schema {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      jsonLd: isSet(object.jsonLd) ? globalThis.String(object.jsonLd) : "",
    };
  },

  toJSON(message: Schema): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.jsonLd !== "") {
      obj.jsonLd = message.jsonLd;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Schema>, I>>(base?: I): Schema {
    return Schema.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Schema>, I>>(object: I): Schema {
    const message = createBaseSchema();
    message.id = object.id ?? "";
    message.jsonLd = object.jsonLd ?? "";
    return message;
  },
};

function createBaseCredentialOffer(): CredentialOffer {
  return { thid: "", body: undefined, From: "", To: "" };
}

export const CredentialOffer = {
  encode(message: CredentialOffer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.thid !== "") {
      writer.uint32(10).string(message.thid);
    }
    if (message.body !== undefined) {
      CredentialOfferBody.encode(message.body, writer.uint32(18).fork()).ldelim();
    }
    if (message.From !== "") {
      writer.uint32(26).string(message.From);
    }
    if (message.To !== "") {
      writer.uint32(34).string(message.To);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialOffer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialOffer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.thid = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.body = CredentialOfferBody.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.From = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.To = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CredentialOffer {
    return {
      thid: isSet(object.thid) ? globalThis.String(object.thid) : "",
      body: isSet(object.body) ? CredentialOfferBody.fromJSON(object.body) : undefined,
      From: isSet(object.From) ? globalThis.String(object.From) : "",
      To: isSet(object.To) ? globalThis.String(object.To) : "",
    };
  },

  toJSON(message: CredentialOffer): unknown {
    const obj: any = {};
    if (message.thid !== "") {
      obj.thid = message.thid;
    }
    if (message.body !== undefined) {
      obj.body = CredentialOfferBody.toJSON(message.body);
    }
    if (message.From !== "") {
      obj.From = message.From;
    }
    if (message.To !== "") {
      obj.To = message.To;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CredentialOffer>, I>>(base?: I): CredentialOffer {
    return CredentialOffer.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CredentialOffer>, I>>(object: I): CredentialOffer {
    const message = createBaseCredentialOffer();
    message.thid = object.thid ?? "";
    message.body = (object.body !== undefined && object.body !== null)
      ? CredentialOfferBody.fromPartial(object.body)
      : undefined;
    message.From = object.From ?? "";
    message.To = object.To ?? "";
    return message;
  },
};

function createBaseCredentialOfferBody(): CredentialOfferBody {
  return { url: "", credentials: [] };
}

export const CredentialOfferBody = {
  encode(message: CredentialOfferBody, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.url !== "") {
      writer.uint32(10).string(message.url);
    }
    for (const v of message.credentials) {
      CredentialOfferBodyCredentials.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialOfferBody {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialOfferBody();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.url = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.credentials.push(CredentialOfferBodyCredentials.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CredentialOfferBody {
    return {
      url: isSet(object.url) ? globalThis.String(object.url) : "",
      credentials: globalThis.Array.isArray(object?.credentials)
        ? object.credentials.map((e: any) => CredentialOfferBodyCredentials.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CredentialOfferBody): unknown {
    const obj: any = {};
    if (message.url !== "") {
      obj.url = message.url;
    }
    if (message.credentials?.length) {
      obj.credentials = message.credentials.map((e) => CredentialOfferBodyCredentials.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CredentialOfferBody>, I>>(base?: I): CredentialOfferBody {
    return CredentialOfferBody.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CredentialOfferBody>, I>>(object: I): CredentialOfferBody {
    const message = createBaseCredentialOfferBody();
    message.url = object.url ?? "";
    message.credentials = object.credentials?.map((e) => CredentialOfferBodyCredentials.fromPartial(e)) || [];
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialOfferBodyCredentials();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CredentialOfferBodyCredentials {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
    };
  },

  toJSON(message: CredentialOfferBodyCredentials): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CredentialOfferBodyCredentials>, I>>(base?: I): CredentialOfferBodyCredentials {
    return CredentialOfferBodyCredentials.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialReceipt();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.anchorId = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CredentialReceipt {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      anchorId: isSet(object.anchorId) ? globalThis.Number(object.anchorId) : 0,
    };
  },

  toJSON(message: CredentialReceipt): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.anchorId !== 0) {
      obj.anchorId = Math.round(message.anchorId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CredentialReceipt>, I>>(base?: I): CredentialReceipt {
    return CredentialReceipt.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CredentialReceipt>, I>>(object: I): CredentialReceipt {
    const message = createBaseCredentialReceipt();
    message.id = object.id ?? "";
    message.anchorId = object.anchorId ?? 0;
    return message;
  },
};

function createBaseCredential(): Credential {
  return {
    context: [],
    id: "",
    type: [],
    issuanceDate: "",
    credentialSubject: "",
    credentialStatus: undefined,
    issuer: "",
    credentialSchema: undefined,
    proof: undefined,
  };
}

export const Credential = {
  encode(message: Credential, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.context) {
      writer.uint32(10).string(v!);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    for (const v of message.type) {
      writer.uint32(26).string(v!);
    }
    if (message.issuanceDate !== "") {
      writer.uint32(34).string(message.issuanceDate);
    }
    if (message.credentialSubject !== "") {
      writer.uint32(42).string(message.credentialSubject);
    }
    if (message.credentialStatus !== undefined) {
      CredentialStatus.encode(message.credentialStatus, writer.uint32(50).fork()).ldelim();
    }
    if (message.issuer !== "") {
      writer.uint32(58).string(message.issuer);
    }
    if (message.credentialSchema !== undefined) {
      CredentialSchema.encode(message.credentialSchema, writer.uint32(66).fork()).ldelim();
    }
    if (message.proof !== undefined) {
      CredentialProof.encode(message.proof, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Credential {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredential();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.context.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.type.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.issuanceDate = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.credentialSubject = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.credentialStatus = CredentialStatus.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.issuer = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.credentialSchema = CredentialSchema.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.proof = CredentialProof.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Credential {
    return {
      context: globalThis.Array.isArray(object?.context) ? object.context.map((e: any) => globalThis.String(e)) : [],
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      type: globalThis.Array.isArray(object?.type) ? object.type.map((e: any) => globalThis.String(e)) : [],
      issuanceDate: isSet(object.issuanceDate) ? globalThis.String(object.issuanceDate) : "",
      credentialSubject: isSet(object.credentialSubject) ? globalThis.String(object.credentialSubject) : "",
      credentialStatus: isSet(object.credentialStatus) ? CredentialStatus.fromJSON(object.credentialStatus) : undefined,
      issuer: isSet(object.issuer) ? globalThis.String(object.issuer) : "",
      credentialSchema: isSet(object.credentialSchema) ? CredentialSchema.fromJSON(object.credentialSchema) : undefined,
      proof: isSet(object.proof) ? CredentialProof.fromJSON(object.proof) : undefined,
    };
  },

  toJSON(message: Credential): unknown {
    const obj: any = {};
    if (message.context?.length) {
      obj.context = message.context;
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.type?.length) {
      obj.type = message.type;
    }
    if (message.issuanceDate !== "") {
      obj.issuanceDate = message.issuanceDate;
    }
    if (message.credentialSubject !== "") {
      obj.credentialSubject = message.credentialSubject;
    }
    if (message.credentialStatus !== undefined) {
      obj.credentialStatus = CredentialStatus.toJSON(message.credentialStatus);
    }
    if (message.issuer !== "") {
      obj.issuer = message.issuer;
    }
    if (message.credentialSchema !== undefined) {
      obj.credentialSchema = CredentialSchema.toJSON(message.credentialSchema);
    }
    if (message.proof !== undefined) {
      obj.proof = CredentialProof.toJSON(message.proof);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Credential>, I>>(base?: I): Credential {
    return Credential.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Credential>, I>>(object: I): Credential {
    const message = createBaseCredential();
    message.context = object.context?.map((e) => e) || [];
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
    message.proof = (object.proof !== undefined && object.proof !== null)
      ? CredentialProof.fromPartial(object.proof)
      : undefined;
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.revocationNonce = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
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

  fromJSON(object: any): CredentialStatus {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      revocationNonce: isSet(object.revocationNonce) ? globalThis.Number(object.revocationNonce) : 0,
      type: isSet(object.type) ? globalThis.String(object.type) : "",
    };
  },

  toJSON(message: CredentialStatus): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.revocationNonce !== 0) {
      obj.revocationNonce = Math.round(message.revocationNonce);
    }
    if (message.type !== "") {
      obj.type = message.type;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CredentialStatus>, I>>(base?: I): CredentialStatus {
    return CredentialStatus.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialSchema();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
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

  fromJSON(object: any): CredentialSchema {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      type: isSet(object.type) ? globalThis.String(object.type) : "",
    };
  },

  toJSON(message: CredentialSchema): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.type !== "") {
      obj.type = message.type;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CredentialSchema>, I>>(base?: I): CredentialSchema {
    return CredentialSchema.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CredentialSchema>, I>>(object: I): CredentialSchema {
    const message = createBaseCredentialSchema();
    message.id = object.id ?? "";
    message.type = object.type ?? "";
    return message;
  },
};

function createBaseCredentialProof(): CredentialProof {
  return { bloockProof: undefined, signatureProof: undefined };
}

export const CredentialProof = {
  encode(message: CredentialProof, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.bloockProof !== undefined) {
      Proof.encode(message.bloockProof, writer.uint32(10).fork()).ldelim();
    }
    if (message.signatureProof !== undefined) {
      SignatureJWS.encode(message.signatureProof, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialProof {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialProof();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.bloockProof = Proof.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.signatureProof = SignatureJWS.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CredentialProof {
    return {
      bloockProof: isSet(object.bloockProof) ? Proof.fromJSON(object.bloockProof) : undefined,
      signatureProof: isSet(object.signatureProof) ? SignatureJWS.fromJSON(object.signatureProof) : undefined,
    };
  },

  toJSON(message: CredentialProof): unknown {
    const obj: any = {};
    if (message.bloockProof !== undefined) {
      obj.bloockProof = Proof.toJSON(message.bloockProof);
    }
    if (message.signatureProof !== undefined) {
      obj.signatureProof = SignatureJWS.toJSON(message.signatureProof);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CredentialProof>, I>>(base?: I): CredentialProof {
    return CredentialProof.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CredentialProof>, I>>(object: I): CredentialProof {
    const message = createBaseCredentialProof();
    message.bloockProof = (object.bloockProof !== undefined && object.bloockProof !== null)
      ? Proof.fromPartial(object.bloockProof)
      : undefined;
    message.signatureProof = (object.signatureProof !== undefined && object.signatureProof !== null)
      ? SignatureJWS.fromPartial(object.signatureProof)
      : undefined;
    return message;
  },
};

function createBaseCredentialVerification(): CredentialVerification {
  return { timestamp: 0, issuer: "", revocation: 0 };
}

export const CredentialVerification = {
  encode(message: CredentialVerification, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.issuer !== "") {
      writer.uint32(18).string(message.issuer);
    }
    if (message.revocation !== 0) {
      writer.uint32(24).uint64(message.revocation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialVerification {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialVerification();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.issuer = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.revocation = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CredentialVerification {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      issuer: isSet(object.issuer) ? globalThis.String(object.issuer) : "",
      revocation: isSet(object.revocation) ? globalThis.Number(object.revocation) : 0,
    };
  },

  toJSON(message: CredentialVerification): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.issuer !== "") {
      obj.issuer = message.issuer;
    }
    if (message.revocation !== 0) {
      obj.revocation = Math.round(message.revocation);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CredentialVerification>, I>>(base?: I): CredentialVerification {
    return CredentialVerification.fromPartial(base ?? ({} as any));
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
  return { success: false };
}

export const CredentialRevocation = {
  encode(message: CredentialRevocation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialRevocation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialRevocation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.success = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CredentialRevocation {
    return { success: isSet(object.success) ? globalThis.Boolean(object.success) : false };
  },

  toJSON(message: CredentialRevocation): unknown {
    const obj: any = {};
    if (message.success === true) {
      obj.success = message.success;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CredentialRevocation>, I>>(base?: I): CredentialRevocation {
    return CredentialRevocation.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CredentialRevocation>, I>>(object: I): CredentialRevocation {
    const message = createBaseCredentialRevocation();
    message.success = object.success ?? false;
    return message;
  },
};

function createBaseSignatureJWS(): SignatureJWS {
  return { signature: "", protected: "", header: undefined, messageHash: "" };
}

export const SignatureJWS = {
  encode(message: SignatureJWS, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signature !== "") {
      writer.uint32(10).string(message.signature);
    }
    if (message.protected !== "") {
      writer.uint32(18).string(message.protected);
    }
    if (message.header !== undefined) {
      SignatureHeaderJWS.encode(message.header, writer.uint32(26).fork()).ldelim();
    }
    if (message.messageHash !== "") {
      writer.uint32(34).string(message.messageHash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignatureJWS {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignatureJWS();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signature = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.protected = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.header = SignatureHeaderJWS.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.messageHash = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SignatureJWS {
    return {
      signature: isSet(object.signature) ? globalThis.String(object.signature) : "",
      protected: isSet(object.protected) ? globalThis.String(object.protected) : "",
      header: isSet(object.header) ? SignatureHeaderJWS.fromJSON(object.header) : undefined,
      messageHash: isSet(object.messageHash) ? globalThis.String(object.messageHash) : "",
    };
  },

  toJSON(message: SignatureJWS): unknown {
    const obj: any = {};
    if (message.signature !== "") {
      obj.signature = message.signature;
    }
    if (message.protected !== "") {
      obj.protected = message.protected;
    }
    if (message.header !== undefined) {
      obj.header = SignatureHeaderJWS.toJSON(message.header);
    }
    if (message.messageHash !== "") {
      obj.messageHash = message.messageHash;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SignatureJWS>, I>>(base?: I): SignatureJWS {
    return SignatureJWS.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SignatureJWS>, I>>(object: I): SignatureJWS {
    const message = createBaseSignatureJWS();
    message.signature = object.signature ?? "";
    message.protected = object.protected ?? "";
    message.header = (object.header !== undefined && object.header !== null)
      ? SignatureHeaderJWS.fromPartial(object.header)
      : undefined;
    message.messageHash = object.messageHash ?? "";
    return message;
  },
};

function createBaseSignatureHeaderJWS(): SignatureHeaderJWS {
  return { alg: "", kid: "", subject: undefined, hashAlg: undefined };
}

export const SignatureHeaderJWS = {
  encode(message: SignatureHeaderJWS, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.alg !== "") {
      writer.uint32(10).string(message.alg);
    }
    if (message.kid !== "") {
      writer.uint32(18).string(message.kid);
    }
    if (message.subject !== undefined) {
      writer.uint32(26).string(message.subject);
    }
    if (message.hashAlg !== undefined) {
      writer.uint32(34).string(message.hashAlg);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignatureHeaderJWS {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignatureHeaderJWS();
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

          message.kid = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.subject = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.hashAlg = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SignatureHeaderJWS {
    return {
      alg: isSet(object.alg) ? globalThis.String(object.alg) : "",
      kid: isSet(object.kid) ? globalThis.String(object.kid) : "",
      subject: isSet(object.subject) ? globalThis.String(object.subject) : undefined,
      hashAlg: isSet(object.hashAlg) ? globalThis.String(object.hashAlg) : undefined,
    };
  },

  toJSON(message: SignatureHeaderJWS): unknown {
    const obj: any = {};
    if (message.alg !== "") {
      obj.alg = message.alg;
    }
    if (message.kid !== "") {
      obj.kid = message.kid;
    }
    if (message.subject !== undefined) {
      obj.subject = message.subject;
    }
    if (message.hashAlg !== undefined) {
      obj.hashAlg = message.hashAlg;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SignatureHeaderJWS>, I>>(base?: I): SignatureHeaderJWS {
    return SignatureHeaderJWS.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SignatureHeaderJWS>, I>>(object: I): SignatureHeaderJWS {
    const message = createBaseSignatureHeaderJWS();
    message.alg = object.alg ?? "";
    message.kid = object.kid ?? "";
    message.subject = object.subject ?? undefined;
    message.hashAlg = object.hashAlg ?? undefined;
    return message;
  },
};

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
