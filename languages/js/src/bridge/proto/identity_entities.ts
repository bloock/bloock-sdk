/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export enum Method {
  IDEN3 = 0,
  POLYGON_ID = 1,
  UNRECOGNIZED = -1,
}

export function methodFromJSON(object: any): Method {
  switch (object) {
    case 0:
    case "IDEN3":
      return Method.IDEN3;
    case 1:
    case "POLYGON_ID":
      return Method.POLYGON_ID;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Method.UNRECOGNIZED;
  }
}

export function methodToJSON(object: Method): string {
  switch (object) {
    case Method.IDEN3:
      return "IDEN3";
    case Method.POLYGON_ID:
      return "POLYGON_ID";
    case Method.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum Blockchain {
  ETHEREUM = 0,
  POLYGON = 1,
  UNKNOWN_CHAIN = 2,
  NO_CHAIN = 3,
  UNRECOGNIZED = -1,
}

export function blockchainFromJSON(object: any): Blockchain {
  switch (object) {
    case 0:
    case "ETHEREUM":
      return Blockchain.ETHEREUM;
    case 1:
    case "POLYGON":
      return Blockchain.POLYGON;
    case 2:
    case "UNKNOWN_CHAIN":
      return Blockchain.UNKNOWN_CHAIN;
    case 3:
    case "NO_CHAIN":
      return Blockchain.NO_CHAIN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Blockchain.UNRECOGNIZED;
  }
}

export function blockchainToJSON(object: Blockchain): string {
  switch (object) {
    case Blockchain.ETHEREUM:
      return "ETHEREUM";
    case Blockchain.POLYGON:
      return "POLYGON";
    case Blockchain.UNKNOWN_CHAIN:
      return "UNKNOWN_CHAIN";
    case Blockchain.NO_CHAIN:
      return "NO_CHAIN";
    case Blockchain.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum NetworkId {
  MAIN = 0,
  MUMBAI = 1,
  GOERLI = 2,
  UNKNOWN_NETWORK = 3,
  NO_NETWORK = 4,
  UNRECOGNIZED = -1,
}

export function networkIdFromJSON(object: any): NetworkId {
  switch (object) {
    case 0:
    case "MAIN":
      return NetworkId.MAIN;
    case 1:
    case "MUMBAI":
      return NetworkId.MUMBAI;
    case 2:
    case "GOERLI":
      return NetworkId.GOERLI;
    case 3:
    case "UNKNOWN_NETWORK":
      return NetworkId.UNKNOWN_NETWORK;
    case 4:
    case "NO_NETWORK":
      return NetworkId.NO_NETWORK;
    case -1:
    case "UNRECOGNIZED":
    default:
      return NetworkId.UNRECOGNIZED;
  }
}

export function networkIdToJSON(object: NetworkId): string {
  switch (object) {
    case NetworkId.MAIN:
      return "MAIN";
    case NetworkId.MUMBAI:
      return "MUMBAI";
    case NetworkId.GOERLI:
      return "GOERLI";
    case NetworkId.UNKNOWN_NETWORK:
      return "UNKNOWN_NETWORK";
    case NetworkId.NO_NETWORK:
      return "NO_NETWORK";
    case NetworkId.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum PublishInterval {
  INTERVAL_5 = 0,
  INTERVAL_15 = 1,
  INTERVAL_60 = 2,
  UNRECOGNIZED = -1,
}

export function publishIntervalFromJSON(object: any): PublishInterval {
  switch (object) {
    case 0:
    case "INTERVAL_5":
      return PublishInterval.INTERVAL_5;
    case 1:
    case "INTERVAL_15":
      return PublishInterval.INTERVAL_15;
    case 2:
    case "INTERVAL_60":
      return PublishInterval.INTERVAL_60;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PublishInterval.UNRECOGNIZED;
  }
}

export function publishIntervalToJSON(object: PublishInterval): string {
  switch (object) {
    case PublishInterval.INTERVAL_5:
      return "INTERVAL_5";
    case PublishInterval.INTERVAL_15:
      return "INTERVAL_15";
    case PublishInterval.INTERVAL_60:
      return "INTERVAL_60";
    case PublishInterval.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Credential {
  context: string[];
  id: string;
  type: string[];
  issuanceDate: string;
  expiration: string;
  credentialSubject: string;
  credentialStatus?: CredentialStatus | undefined;
  issuer: string;
  credentialSchema?: CredentialSchema | undefined;
  proof?: CredentialProof | undefined;
}

export interface CredentialProof {
  signatureProof: string;
  sparseMtProof?: string | undefined;
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

export interface StringAttribute {
  id: string;
  value: string;
}

export interface IntegerAttribute {
  id: string;
  value: number;
}

export interface DecimalAttribute {
  id: string;
  value: number;
}

export interface BooleanAttribute {
  id: string;
  value: boolean;
}

export interface DateAttribute {
  id: string;
  value: string;
}

export interface DateTimeAttribute {
  id: string;
  value: string;
}

export interface StringAttributeDefinition {
  displayName: string;
  id: string;
  description: string;
  required: boolean;
}

export interface IntegerAttributeDefinition {
  displayName: string;
  id: string;
  description: string;
  required: boolean;
}

export interface DecimalAttributeDefinition {
  displayName: string;
  id: string;
  description: string;
  required: boolean;
}

export interface BooleanAttributeDefinition {
  displayName: string;
  id: string;
  description: string;
  required: boolean;
}

export interface DateAttributeDefinition {
  displayName: string;
  id: string;
  description: string;
  required: boolean;
}

export interface DateTimeAttributeDefinition {
  displayName: string;
  id: string;
  description: string;
  required: boolean;
}

export interface StringEnumAttributeDefinition {
  displayName: string;
  id: string;
  description: string;
  required: boolean;
  enum: string[];
}

export interface IntegerEnumAttributeDefinition {
  displayName: string;
  id: string;
  description: string;
  required: boolean;
  enum: number[];
}

export interface DecimalEnumAttributeDefinition {
  displayName: string;
  id: string;
  description: string;
  required: boolean;
  enum: number[];
}

export interface CredentialReceipt {
  credential?: Credential | undefined;
  credentialId: string;
  credentialType: string;
}

export interface IssuerStateReceipt {
  txHash: string;
}

export interface Schema {
  cid: string;
  cidJsonLd: string;
  schemaType: string;
  json: string;
}

export interface CredentialRevocation {
  success: boolean;
}

export interface VerificationReceipt {
  verificationRequest: string;
  sessionId: number;
}

export interface DidType {
  method: Method;
  blockchain: Blockchain;
  networkId: NetworkId;
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

function createBaseCredential(): Credential {
  return {
    context: [],
    id: "",
    type: [],
    issuanceDate: "",
    expiration: "",
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
    if (message.expiration !== "") {
      writer.uint32(42).string(message.expiration);
    }
    if (message.credentialSubject !== "") {
      writer.uint32(50).string(message.credentialSubject);
    }
    if (message.credentialStatus !== undefined) {
      CredentialStatus.encode(message.credentialStatus, writer.uint32(58).fork()).ldelim();
    }
    if (message.issuer !== "") {
      writer.uint32(66).string(message.issuer);
    }
    if (message.credentialSchema !== undefined) {
      CredentialSchema.encode(message.credentialSchema, writer.uint32(74).fork()).ldelim();
    }
    if (message.proof !== undefined) {
      CredentialProof.encode(message.proof, writer.uint32(82).fork()).ldelim();
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

          message.expiration = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.credentialSubject = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.credentialStatus = CredentialStatus.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.issuer = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.credentialSchema = CredentialSchema.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
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
      expiration: isSet(object.expiration) ? globalThis.String(object.expiration) : "",
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
    if (message.expiration !== "") {
      obj.expiration = message.expiration;
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
    message.expiration = object.expiration ?? "";
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

function createBaseCredentialProof(): CredentialProof {
  return { signatureProof: "", sparseMtProof: undefined };
}

export const CredentialProof = {
  encode(message: CredentialProof, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signatureProof !== "") {
      writer.uint32(10).string(message.signatureProof);
    }
    if (message.sparseMtProof !== undefined) {
      writer.uint32(18).string(message.sparseMtProof);
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

          message.signatureProof = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sparseMtProof = reader.string();
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
      signatureProof: isSet(object.signatureProof) ? globalThis.String(object.signatureProof) : "",
      sparseMtProof: isSet(object.sparseMtProof) ? globalThis.String(object.sparseMtProof) : undefined,
    };
  },

  toJSON(message: CredentialProof): unknown {
    const obj: any = {};
    if (message.signatureProof !== "") {
      obj.signatureProof = message.signatureProof;
    }
    if (message.sparseMtProof !== undefined) {
      obj.sparseMtProof = message.sparseMtProof;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CredentialProof>, I>>(base?: I): CredentialProof {
    return CredentialProof.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CredentialProof>, I>>(object: I): CredentialProof {
    const message = createBaseCredentialProof();
    message.signatureProof = object.signatureProof ?? "";
    message.sparseMtProof = object.sparseMtProof ?? undefined;
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

function createBaseIntegerAttribute(): IntegerAttribute {
  return { id: "", value: 0 };
}

export const IntegerAttribute = {
  encode(message: IntegerAttribute, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.value !== 0) {
      writer.uint32(16).int64(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IntegerAttribute {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIntegerAttribute();
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

  fromJSON(object: any): IntegerAttribute {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      value: isSet(object.value) ? globalThis.Number(object.value) : 0,
    };
  },

  toJSON(message: IntegerAttribute): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IntegerAttribute>, I>>(base?: I): IntegerAttribute {
    return IntegerAttribute.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IntegerAttribute>, I>>(object: I): IntegerAttribute {
    const message = createBaseIntegerAttribute();
    message.id = object.id ?? "";
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseDecimalAttribute(): DecimalAttribute {
  return { id: "", value: 0 };
}

export const DecimalAttribute = {
  encode(message: DecimalAttribute, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.value !== 0) {
      writer.uint32(17).double(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DecimalAttribute {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDecimalAttribute();
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
          if (tag !== 17) {
            break;
          }

          message.value = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DecimalAttribute {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      value: isSet(object.value) ? globalThis.Number(object.value) : 0,
    };
  },

  toJSON(message: DecimalAttribute): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.value !== 0) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DecimalAttribute>, I>>(base?: I): DecimalAttribute {
    return DecimalAttribute.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DecimalAttribute>, I>>(object: I): DecimalAttribute {
    const message = createBaseDecimalAttribute();
    message.id = object.id ?? "";
    message.value = object.value ?? 0;
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
  return { id: "", value: "" };
}

export const DateAttribute = {
  encode(message: DateAttribute, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
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

  fromJSON(object: any): DateAttribute {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: DateAttribute): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DateAttribute>, I>>(base?: I): DateAttribute {
    return DateAttribute.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DateAttribute>, I>>(object: I): DateAttribute {
    const message = createBaseDateAttribute();
    message.id = object.id ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseDateTimeAttribute(): DateTimeAttribute {
  return { id: "", value: "" };
}

export const DateTimeAttribute = {
  encode(message: DateTimeAttribute, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
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

  fromJSON(object: any): DateTimeAttribute {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: DateTimeAttribute): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DateTimeAttribute>, I>>(base?: I): DateTimeAttribute {
    return DateTimeAttribute.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DateTimeAttribute>, I>>(object: I): DateTimeAttribute {
    const message = createBaseDateTimeAttribute();
    message.id = object.id ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseStringAttributeDefinition(): StringAttributeDefinition {
  return { displayName: "", id: "", description: "", required: false };
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
    if (message.required === true) {
      writer.uint32(32).bool(message.required);
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
        case 4:
          if (tag !== 32) {
            break;
          }

          message.required = reader.bool();
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
      required: isSet(object.required) ? globalThis.Boolean(object.required) : false,
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
    if (message.required === true) {
      obj.required = message.required;
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
    message.required = object.required ?? false;
    return message;
  },
};

function createBaseIntegerAttributeDefinition(): IntegerAttributeDefinition {
  return { displayName: "", id: "", description: "", required: false };
}

export const IntegerAttributeDefinition = {
  encode(message: IntegerAttributeDefinition, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.displayName !== "") {
      writer.uint32(10).string(message.displayName);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.required === true) {
      writer.uint32(32).bool(message.required);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IntegerAttributeDefinition {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIntegerAttributeDefinition();
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
        case 4:
          if (tag !== 32) {
            break;
          }

          message.required = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IntegerAttributeDefinition {
    return {
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      required: isSet(object.required) ? globalThis.Boolean(object.required) : false,
    };
  },

  toJSON(message: IntegerAttributeDefinition): unknown {
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
    if (message.required === true) {
      obj.required = message.required;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IntegerAttributeDefinition>, I>>(base?: I): IntegerAttributeDefinition {
    return IntegerAttributeDefinition.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IntegerAttributeDefinition>, I>>(object: I): IntegerAttributeDefinition {
    const message = createBaseIntegerAttributeDefinition();
    message.displayName = object.displayName ?? "";
    message.id = object.id ?? "";
    message.description = object.description ?? "";
    message.required = object.required ?? false;
    return message;
  },
};

function createBaseDecimalAttributeDefinition(): DecimalAttributeDefinition {
  return { displayName: "", id: "", description: "", required: false };
}

export const DecimalAttributeDefinition = {
  encode(message: DecimalAttributeDefinition, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.displayName !== "") {
      writer.uint32(10).string(message.displayName);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.required === true) {
      writer.uint32(32).bool(message.required);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DecimalAttributeDefinition {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDecimalAttributeDefinition();
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
        case 4:
          if (tag !== 32) {
            break;
          }

          message.required = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DecimalAttributeDefinition {
    return {
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      required: isSet(object.required) ? globalThis.Boolean(object.required) : false,
    };
  },

  toJSON(message: DecimalAttributeDefinition): unknown {
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
    if (message.required === true) {
      obj.required = message.required;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DecimalAttributeDefinition>, I>>(base?: I): DecimalAttributeDefinition {
    return DecimalAttributeDefinition.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DecimalAttributeDefinition>, I>>(object: I): DecimalAttributeDefinition {
    const message = createBaseDecimalAttributeDefinition();
    message.displayName = object.displayName ?? "";
    message.id = object.id ?? "";
    message.description = object.description ?? "";
    message.required = object.required ?? false;
    return message;
  },
};

function createBaseBooleanAttributeDefinition(): BooleanAttributeDefinition {
  return { displayName: "", id: "", description: "", required: false };
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
    if (message.required === true) {
      writer.uint32(32).bool(message.required);
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
        case 4:
          if (tag !== 32) {
            break;
          }

          message.required = reader.bool();
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
      required: isSet(object.required) ? globalThis.Boolean(object.required) : false,
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
    if (message.required === true) {
      obj.required = message.required;
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
    message.required = object.required ?? false;
    return message;
  },
};

function createBaseDateAttributeDefinition(): DateAttributeDefinition {
  return { displayName: "", id: "", description: "", required: false };
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
    if (message.required === true) {
      writer.uint32(32).bool(message.required);
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
        case 4:
          if (tag !== 32) {
            break;
          }

          message.required = reader.bool();
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
      required: isSet(object.required) ? globalThis.Boolean(object.required) : false,
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
    if (message.required === true) {
      obj.required = message.required;
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
    message.required = object.required ?? false;
    return message;
  },
};

function createBaseDateTimeAttributeDefinition(): DateTimeAttributeDefinition {
  return { displayName: "", id: "", description: "", required: false };
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
    if (message.required === true) {
      writer.uint32(32).bool(message.required);
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
        case 4:
          if (tag !== 32) {
            break;
          }

          message.required = reader.bool();
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
      required: isSet(object.required) ? globalThis.Boolean(object.required) : false,
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
    if (message.required === true) {
      obj.required = message.required;
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
    message.required = object.required ?? false;
    return message;
  },
};

function createBaseStringEnumAttributeDefinition(): StringEnumAttributeDefinition {
  return { displayName: "", id: "", description: "", required: false, enum: [] };
}

export const StringEnumAttributeDefinition = {
  encode(message: StringEnumAttributeDefinition, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.displayName !== "") {
      writer.uint32(10).string(message.displayName);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.required === true) {
      writer.uint32(32).bool(message.required);
    }
    for (const v of message.enum) {
      writer.uint32(42).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StringEnumAttributeDefinition {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStringEnumAttributeDefinition();
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
        case 4:
          if (tag !== 32) {
            break;
          }

          message.required = reader.bool();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.enum.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StringEnumAttributeDefinition {
    return {
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      required: isSet(object.required) ? globalThis.Boolean(object.required) : false,
      enum: globalThis.Array.isArray(object?.enum) ? object.enum.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: StringEnumAttributeDefinition): unknown {
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
    if (message.required === true) {
      obj.required = message.required;
    }
    if (message.enum?.length) {
      obj.enum = message.enum;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StringEnumAttributeDefinition>, I>>(base?: I): StringEnumAttributeDefinition {
    return StringEnumAttributeDefinition.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StringEnumAttributeDefinition>, I>>(
    object: I,
  ): StringEnumAttributeDefinition {
    const message = createBaseStringEnumAttributeDefinition();
    message.displayName = object.displayName ?? "";
    message.id = object.id ?? "";
    message.description = object.description ?? "";
    message.required = object.required ?? false;
    message.enum = object.enum?.map((e) => e) || [];
    return message;
  },
};

function createBaseIntegerEnumAttributeDefinition(): IntegerEnumAttributeDefinition {
  return { displayName: "", id: "", description: "", required: false, enum: [] };
}

export const IntegerEnumAttributeDefinition = {
  encode(message: IntegerEnumAttributeDefinition, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.displayName !== "") {
      writer.uint32(10).string(message.displayName);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.required === true) {
      writer.uint32(32).bool(message.required);
    }
    writer.uint32(42).fork();
    for (const v of message.enum) {
      writer.int64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IntegerEnumAttributeDefinition {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIntegerEnumAttributeDefinition();
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
        case 4:
          if (tag !== 32) {
            break;
          }

          message.required = reader.bool();
          continue;
        case 5:
          if (tag === 40) {
            message.enum.push(longToNumber(reader.int64() as Long));

            continue;
          }

          if (tag === 42) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.enum.push(longToNumber(reader.int64() as Long));
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IntegerEnumAttributeDefinition {
    return {
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      required: isSet(object.required) ? globalThis.Boolean(object.required) : false,
      enum: globalThis.Array.isArray(object?.enum) ? object.enum.map((e: any) => globalThis.Number(e)) : [],
    };
  },

  toJSON(message: IntegerEnumAttributeDefinition): unknown {
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
    if (message.required === true) {
      obj.required = message.required;
    }
    if (message.enum?.length) {
      obj.enum = message.enum.map((e) => Math.round(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IntegerEnumAttributeDefinition>, I>>(base?: I): IntegerEnumAttributeDefinition {
    return IntegerEnumAttributeDefinition.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IntegerEnumAttributeDefinition>, I>>(
    object: I,
  ): IntegerEnumAttributeDefinition {
    const message = createBaseIntegerEnumAttributeDefinition();
    message.displayName = object.displayName ?? "";
    message.id = object.id ?? "";
    message.description = object.description ?? "";
    message.required = object.required ?? false;
    message.enum = object.enum?.map((e) => e) || [];
    return message;
  },
};

function createBaseDecimalEnumAttributeDefinition(): DecimalEnumAttributeDefinition {
  return { displayName: "", id: "", description: "", required: false, enum: [] };
}

export const DecimalEnumAttributeDefinition = {
  encode(message: DecimalEnumAttributeDefinition, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.displayName !== "") {
      writer.uint32(10).string(message.displayName);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.required === true) {
      writer.uint32(32).bool(message.required);
    }
    writer.uint32(42).fork();
    for (const v of message.enum) {
      writer.double(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DecimalEnumAttributeDefinition {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDecimalEnumAttributeDefinition();
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
        case 4:
          if (tag !== 32) {
            break;
          }

          message.required = reader.bool();
          continue;
        case 5:
          if (tag === 41) {
            message.enum.push(reader.double());

            continue;
          }

          if (tag === 42) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.enum.push(reader.double());
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DecimalEnumAttributeDefinition {
    return {
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      required: isSet(object.required) ? globalThis.Boolean(object.required) : false,
      enum: globalThis.Array.isArray(object?.enum) ? object.enum.map((e: any) => globalThis.Number(e)) : [],
    };
  },

  toJSON(message: DecimalEnumAttributeDefinition): unknown {
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
    if (message.required === true) {
      obj.required = message.required;
    }
    if (message.enum?.length) {
      obj.enum = message.enum;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DecimalEnumAttributeDefinition>, I>>(base?: I): DecimalEnumAttributeDefinition {
    return DecimalEnumAttributeDefinition.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DecimalEnumAttributeDefinition>, I>>(
    object: I,
  ): DecimalEnumAttributeDefinition {
    const message = createBaseDecimalEnumAttributeDefinition();
    message.displayName = object.displayName ?? "";
    message.id = object.id ?? "";
    message.description = object.description ?? "";
    message.required = object.required ?? false;
    message.enum = object.enum?.map((e) => e) || [];
    return message;
  },
};

function createBaseCredentialReceipt(): CredentialReceipt {
  return { credential: undefined, credentialId: "", credentialType: "" };
}

export const CredentialReceipt = {
  encode(message: CredentialReceipt, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.credential !== undefined) {
      Credential.encode(message.credential, writer.uint32(10).fork()).ldelim();
    }
    if (message.credentialId !== "") {
      writer.uint32(18).string(message.credentialId);
    }
    if (message.credentialType !== "") {
      writer.uint32(26).string(message.credentialType);
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

          message.credential = Credential.decode(reader, reader.uint32());
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

          message.credentialType = reader.string();
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
      credential: isSet(object.credential) ? Credential.fromJSON(object.credential) : undefined,
      credentialId: isSet(object.credentialId) ? globalThis.String(object.credentialId) : "",
      credentialType: isSet(object.credentialType) ? globalThis.String(object.credentialType) : "",
    };
  },

  toJSON(message: CredentialReceipt): unknown {
    const obj: any = {};
    if (message.credential !== undefined) {
      obj.credential = Credential.toJSON(message.credential);
    }
    if (message.credentialId !== "") {
      obj.credentialId = message.credentialId;
    }
    if (message.credentialType !== "") {
      obj.credentialType = message.credentialType;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CredentialReceipt>, I>>(base?: I): CredentialReceipt {
    return CredentialReceipt.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CredentialReceipt>, I>>(object: I): CredentialReceipt {
    const message = createBaseCredentialReceipt();
    message.credential = (object.credential !== undefined && object.credential !== null)
      ? Credential.fromPartial(object.credential)
      : undefined;
    message.credentialId = object.credentialId ?? "";
    message.credentialType = object.credentialType ?? "";
    return message;
  },
};

function createBaseIssuerStateReceipt(): IssuerStateReceipt {
  return { txHash: "" };
}

export const IssuerStateReceipt = {
  encode(message: IssuerStateReceipt, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.txHash !== "") {
      writer.uint32(10).string(message.txHash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IssuerStateReceipt {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIssuerStateReceipt();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.txHash = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IssuerStateReceipt {
    return { txHash: isSet(object.txHash) ? globalThis.String(object.txHash) : "" };
  },

  toJSON(message: IssuerStateReceipt): unknown {
    const obj: any = {};
    if (message.txHash !== "") {
      obj.txHash = message.txHash;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IssuerStateReceipt>, I>>(base?: I): IssuerStateReceipt {
    return IssuerStateReceipt.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IssuerStateReceipt>, I>>(object: I): IssuerStateReceipt {
    const message = createBaseIssuerStateReceipt();
    message.txHash = object.txHash ?? "";
    return message;
  },
};

function createBaseSchema(): Schema {
  return { cid: "", cidJsonLd: "", schemaType: "", json: "" };
}

export const Schema = {
  encode(message: Schema, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.cid !== "") {
      writer.uint32(10).string(message.cid);
    }
    if (message.cidJsonLd !== "") {
      writer.uint32(18).string(message.cidJsonLd);
    }
    if (message.schemaType !== "") {
      writer.uint32(26).string(message.schemaType);
    }
    if (message.json !== "") {
      writer.uint32(34).string(message.json);
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

          message.cid = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.cidJsonLd = reader.string();
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

  fromJSON(object: any): Schema {
    return {
      cid: isSet(object.cid) ? globalThis.String(object.cid) : "",
      cidJsonLd: isSet(object.cidJsonLd) ? globalThis.String(object.cidJsonLd) : "",
      schemaType: isSet(object.schemaType) ? globalThis.String(object.schemaType) : "",
      json: isSet(object.json) ? globalThis.String(object.json) : "",
    };
  },

  toJSON(message: Schema): unknown {
    const obj: any = {};
    if (message.cid !== "") {
      obj.cid = message.cid;
    }
    if (message.cidJsonLd !== "") {
      obj.cidJsonLd = message.cidJsonLd;
    }
    if (message.schemaType !== "") {
      obj.schemaType = message.schemaType;
    }
    if (message.json !== "") {
      obj.json = message.json;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Schema>, I>>(base?: I): Schema {
    return Schema.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Schema>, I>>(object: I): Schema {
    const message = createBaseSchema();
    message.cid = object.cid ?? "";
    message.cidJsonLd = object.cidJsonLd ?? "";
    message.schemaType = object.schemaType ?? "";
    message.json = object.json ?? "";
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

function createBaseVerificationReceipt(): VerificationReceipt {
  return { verificationRequest: "", sessionId: 0 };
}

export const VerificationReceipt = {
  encode(message: VerificationReceipt, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.verificationRequest !== "") {
      writer.uint32(10).string(message.verificationRequest);
    }
    if (message.sessionId !== 0) {
      writer.uint32(16).int64(message.sessionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerificationReceipt {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerificationReceipt();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.verificationRequest = reader.string();
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

  fromJSON(object: any): VerificationReceipt {
    return {
      verificationRequest: isSet(object.verificationRequest) ? globalThis.String(object.verificationRequest) : "",
      sessionId: isSet(object.sessionId) ? globalThis.Number(object.sessionId) : 0,
    };
  },

  toJSON(message: VerificationReceipt): unknown {
    const obj: any = {};
    if (message.verificationRequest !== "") {
      obj.verificationRequest = message.verificationRequest;
    }
    if (message.sessionId !== 0) {
      obj.sessionId = Math.round(message.sessionId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerificationReceipt>, I>>(base?: I): VerificationReceipt {
    return VerificationReceipt.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerificationReceipt>, I>>(object: I): VerificationReceipt {
    const message = createBaseVerificationReceipt();
    message.verificationRequest = object.verificationRequest ?? "";
    message.sessionId = object.sessionId ?? 0;
    return message;
  },
};

function createBaseDidType(): DidType {
  return { method: 0, blockchain: 0, networkId: 0 };
}

export const DidType = {
  encode(message: DidType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.method !== 0) {
      writer.uint32(8).int32(message.method);
    }
    if (message.blockchain !== 0) {
      writer.uint32(16).int32(message.blockchain);
    }
    if (message.networkId !== 0) {
      writer.uint32(24).int32(message.networkId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DidType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDidType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.method = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.blockchain = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.networkId = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DidType {
    return {
      method: isSet(object.method) ? methodFromJSON(object.method) : 0,
      blockchain: isSet(object.blockchain) ? blockchainFromJSON(object.blockchain) : 0,
      networkId: isSet(object.networkId) ? networkIdFromJSON(object.networkId) : 0,
    };
  },

  toJSON(message: DidType): unknown {
    const obj: any = {};
    if (message.method !== 0) {
      obj.method = methodToJSON(message.method);
    }
    if (message.blockchain !== 0) {
      obj.blockchain = blockchainToJSON(message.blockchain);
    }
    if (message.networkId !== 0) {
      obj.networkId = networkIdToJSON(message.networkId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DidType>, I>>(base?: I): DidType {
    return DidType.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DidType>, I>>(object: I): DidType {
    const message = createBaseDidType();
    message.method = object.method ?? 0;
    message.blockchain = object.blockchain ?? 0;
    message.networkId = object.networkId ?? 0;
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
