/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { LocalKey, ManagedKey } from "./keys_entities";

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
  INTERVAL_1 = 0,
  INTERVAL_5 = 1,
  INTERVAL_15 = 2,
  INTERVAL_60 = 3,
  UNRECOGNIZED = -1,
}

export function publishIntervalFromJSON(object: any): PublishInterval {
  switch (object) {
    case 0:
    case "INTERVAL_1":
      return PublishInterval.INTERVAL_1;
    case 1:
    case "INTERVAL_5":
      return PublishInterval.INTERVAL_5;
    case 2:
    case "INTERVAL_15":
      return PublishInterval.INTERVAL_15;
    case 3:
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
    case PublishInterval.INTERVAL_1:
      return "INTERVAL_1";
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

export interface IdentityKey {
  localKey?: LocalKey | undefined;
  managedKey?: ManagedKey | undefined;
}

export interface CredentialV2 {
  context: string[];
  id: string;
  type: string[];
  issuanceDate: string;
  expiration: string;
  credentialSubject: string;
  credentialStatus?: CredentialStatusV2 | undefined;
  issuer: string;
  credentialSchema?: CredentialSchemaV2 | undefined;
  proof?: CredentialProofV2 | undefined;
}

export interface CredentialProofV2 {
  signatureProof: string;
  sparseMtProof?: string | undefined;
}

export interface CredentialStatusV2 {
  id: string;
  revocationNonce: number;
  type: string;
}

export interface CredentialSchemaV2 {
  id: string;
  type: string;
}

export interface StringAttributeV2 {
  id: string;
  value: string;
}

export interface IntegerAttributeV2 {
  id: string;
  value: number;
}

export interface DecimalAttributeV2 {
  id: string;
  value: number;
}

export interface BooleanAttributeV2 {
  id: string;
  value: boolean;
}

export interface DateAttributeV2 {
  id: string;
  value: string;
}

export interface DateTimeAttributeV2 {
  id: string;
  value: string;
}

export interface StringAttributeDefinitionV2 {
  displayName: string;
  id: string;
  description: string;
  required: boolean;
}

export interface IntegerAttributeDefinitionV2 {
  displayName: string;
  id: string;
  description: string;
  required: boolean;
}

export interface DecimalAttributeDefinitionV2 {
  displayName: string;
  id: string;
  description: string;
  required: boolean;
}

export interface BooleanAttributeDefinitionV2 {
  displayName: string;
  id: string;
  description: string;
  required: boolean;
}

export interface DateAttributeDefinitionV2 {
  displayName: string;
  id: string;
  description: string;
  required: boolean;
}

export interface DateTimeAttributeDefinitionV2 {
  displayName: string;
  id: string;
  description: string;
  required: boolean;
}

export interface StringEnumAttributeDefinitionV2 {
  displayName: string;
  id: string;
  description: string;
  required: boolean;
  enum: string[];
}

export interface IntegerEnumAttributeDefinitionV2 {
  displayName: string;
  id: string;
  description: string;
  required: boolean;
  enum: number[];
}

export interface DecimalEnumAttributeDefinitionV2 {
  displayName: string;
  id: string;
  description: string;
  required: boolean;
  enum: number[];
}

export interface CredentialReceiptV2 {
  credential?: CredentialV2 | undefined;
  credentialId: string;
  credentialType: string;
}

export interface IssuerStateReceipt {
  txHash: string;
}

export interface SchemaV2 {
  cid: string;
  cidJsonLd: string;
  schemaType: string;
  json: string;
}

export interface CredentialRevocationV2 {
  success: boolean;
}

export interface VerificationReceipt {
  verificationRequest: string;
  sessionId: number;
}

export interface DidParams {
  method: Method;
  blockchain: Blockchain;
  networkId: NetworkId;
}

function createBaseIdentityKey(): IdentityKey {
  return { localKey: undefined, managedKey: undefined };
}

export const IdentityKey = {
  encode(message: IdentityKey, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.localKey !== undefined) {
      LocalKey.encode(message.localKey, writer.uint32(10).fork()).ldelim();
    }
    if (message.managedKey !== undefined) {
      ManagedKey.encode(message.managedKey, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IdentityKey {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIdentityKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.localKey = LocalKey.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.managedKey = ManagedKey.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IdentityKey {
    return {
      localKey: isSet(object.localKey) ? LocalKey.fromJSON(object.localKey) : undefined,
      managedKey: isSet(object.managedKey) ? ManagedKey.fromJSON(object.managedKey) : undefined,
    };
  },

  toJSON(message: IdentityKey): unknown {
    const obj: any = {};
    if (message.localKey !== undefined) {
      obj.localKey = LocalKey.toJSON(message.localKey);
    }
    if (message.managedKey !== undefined) {
      obj.managedKey = ManagedKey.toJSON(message.managedKey);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IdentityKey>, I>>(base?: I): IdentityKey {
    return IdentityKey.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IdentityKey>, I>>(object: I): IdentityKey {
    const message = createBaseIdentityKey();
    message.localKey = (object.localKey !== undefined && object.localKey !== null)
      ? LocalKey.fromPartial(object.localKey)
      : undefined;
    message.managedKey = (object.managedKey !== undefined && object.managedKey !== null)
      ? ManagedKey.fromPartial(object.managedKey)
      : undefined;
    return message;
  },
};

function createBaseCredentialV2(): CredentialV2 {
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

export const CredentialV2 = {
  encode(message: CredentialV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
      CredentialStatusV2.encode(message.credentialStatus, writer.uint32(58).fork()).ldelim();
    }
    if (message.issuer !== "") {
      writer.uint32(66).string(message.issuer);
    }
    if (message.credentialSchema !== undefined) {
      CredentialSchemaV2.encode(message.credentialSchema, writer.uint32(74).fork()).ldelim();
    }
    if (message.proof !== undefined) {
      CredentialProofV2.encode(message.proof, writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialV2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialV2();
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

          message.credentialStatus = CredentialStatusV2.decode(reader, reader.uint32());
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

          message.credentialSchema = CredentialSchemaV2.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.proof = CredentialProofV2.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CredentialV2 {
    return {
      context: globalThis.Array.isArray(object?.context) ? object.context.map((e: any) => globalThis.String(e)) : [],
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      type: globalThis.Array.isArray(object?.type) ? object.type.map((e: any) => globalThis.String(e)) : [],
      issuanceDate: isSet(object.issuanceDate) ? globalThis.String(object.issuanceDate) : "",
      expiration: isSet(object.expiration) ? globalThis.String(object.expiration) : "",
      credentialSubject: isSet(object.credentialSubject) ? globalThis.String(object.credentialSubject) : "",
      credentialStatus: isSet(object.credentialStatus)
        ? CredentialStatusV2.fromJSON(object.credentialStatus)
        : undefined,
      issuer: isSet(object.issuer) ? globalThis.String(object.issuer) : "",
      credentialSchema: isSet(object.credentialSchema)
        ? CredentialSchemaV2.fromJSON(object.credentialSchema)
        : undefined,
      proof: isSet(object.proof) ? CredentialProofV2.fromJSON(object.proof) : undefined,
    };
  },

  toJSON(message: CredentialV2): unknown {
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
      obj.credentialStatus = CredentialStatusV2.toJSON(message.credentialStatus);
    }
    if (message.issuer !== "") {
      obj.issuer = message.issuer;
    }
    if (message.credentialSchema !== undefined) {
      obj.credentialSchema = CredentialSchemaV2.toJSON(message.credentialSchema);
    }
    if (message.proof !== undefined) {
      obj.proof = CredentialProofV2.toJSON(message.proof);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CredentialV2>, I>>(base?: I): CredentialV2 {
    return CredentialV2.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CredentialV2>, I>>(object: I): CredentialV2 {
    const message = createBaseCredentialV2();
    message.context = object.context?.map((e) => e) || [];
    message.id = object.id ?? "";
    message.type = object.type?.map((e) => e) || [];
    message.issuanceDate = object.issuanceDate ?? "";
    message.expiration = object.expiration ?? "";
    message.credentialSubject = object.credentialSubject ?? "";
    message.credentialStatus = (object.credentialStatus !== undefined && object.credentialStatus !== null)
      ? CredentialStatusV2.fromPartial(object.credentialStatus)
      : undefined;
    message.issuer = object.issuer ?? "";
    message.credentialSchema = (object.credentialSchema !== undefined && object.credentialSchema !== null)
      ? CredentialSchemaV2.fromPartial(object.credentialSchema)
      : undefined;
    message.proof = (object.proof !== undefined && object.proof !== null)
      ? CredentialProofV2.fromPartial(object.proof)
      : undefined;
    return message;
  },
};

function createBaseCredentialProofV2(): CredentialProofV2 {
  return { signatureProof: "", sparseMtProof: undefined };
}

export const CredentialProofV2 = {
  encode(message: CredentialProofV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signatureProof !== "") {
      writer.uint32(10).string(message.signatureProof);
    }
    if (message.sparseMtProof !== undefined) {
      writer.uint32(18).string(message.sparseMtProof);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialProofV2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialProofV2();
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

  fromJSON(object: any): CredentialProofV2 {
    return {
      signatureProof: isSet(object.signatureProof) ? globalThis.String(object.signatureProof) : "",
      sparseMtProof: isSet(object.sparseMtProof) ? globalThis.String(object.sparseMtProof) : undefined,
    };
  },

  toJSON(message: CredentialProofV2): unknown {
    const obj: any = {};
    if (message.signatureProof !== "") {
      obj.signatureProof = message.signatureProof;
    }
    if (message.sparseMtProof !== undefined) {
      obj.sparseMtProof = message.sparseMtProof;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CredentialProofV2>, I>>(base?: I): CredentialProofV2 {
    return CredentialProofV2.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CredentialProofV2>, I>>(object: I): CredentialProofV2 {
    const message = createBaseCredentialProofV2();
    message.signatureProof = object.signatureProof ?? "";
    message.sparseMtProof = object.sparseMtProof ?? undefined;
    return message;
  },
};

function createBaseCredentialStatusV2(): CredentialStatusV2 {
  return { id: "", revocationNonce: 0, type: "" };
}

export const CredentialStatusV2 = {
  encode(message: CredentialStatusV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialStatusV2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialStatusV2();
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

  fromJSON(object: any): CredentialStatusV2 {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      revocationNonce: isSet(object.revocationNonce) ? globalThis.Number(object.revocationNonce) : 0,
      type: isSet(object.type) ? globalThis.String(object.type) : "",
    };
  },

  toJSON(message: CredentialStatusV2): unknown {
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

  create<I extends Exact<DeepPartial<CredentialStatusV2>, I>>(base?: I): CredentialStatusV2 {
    return CredentialStatusV2.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CredentialStatusV2>, I>>(object: I): CredentialStatusV2 {
    const message = createBaseCredentialStatusV2();
    message.id = object.id ?? "";
    message.revocationNonce = object.revocationNonce ?? 0;
    message.type = object.type ?? "";
    return message;
  },
};

function createBaseCredentialSchemaV2(): CredentialSchemaV2 {
  return { id: "", type: "" };
}

export const CredentialSchemaV2 = {
  encode(message: CredentialSchemaV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialSchemaV2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialSchemaV2();
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

  fromJSON(object: any): CredentialSchemaV2 {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      type: isSet(object.type) ? globalThis.String(object.type) : "",
    };
  },

  toJSON(message: CredentialSchemaV2): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.type !== "") {
      obj.type = message.type;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CredentialSchemaV2>, I>>(base?: I): CredentialSchemaV2 {
    return CredentialSchemaV2.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CredentialSchemaV2>, I>>(object: I): CredentialSchemaV2 {
    const message = createBaseCredentialSchemaV2();
    message.id = object.id ?? "";
    message.type = object.type ?? "";
    return message;
  },
};

function createBaseStringAttributeV2(): StringAttributeV2 {
  return { id: "", value: "" };
}

export const StringAttributeV2 = {
  encode(message: StringAttributeV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StringAttributeV2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStringAttributeV2();
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

  fromJSON(object: any): StringAttributeV2 {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: StringAttributeV2): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StringAttributeV2>, I>>(base?: I): StringAttributeV2 {
    return StringAttributeV2.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StringAttributeV2>, I>>(object: I): StringAttributeV2 {
    const message = createBaseStringAttributeV2();
    message.id = object.id ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseIntegerAttributeV2(): IntegerAttributeV2 {
  return { id: "", value: 0 };
}

export const IntegerAttributeV2 = {
  encode(message: IntegerAttributeV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.value !== 0) {
      writer.uint32(16).int64(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IntegerAttributeV2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIntegerAttributeV2();
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

  fromJSON(object: any): IntegerAttributeV2 {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      value: isSet(object.value) ? globalThis.Number(object.value) : 0,
    };
  },

  toJSON(message: IntegerAttributeV2): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IntegerAttributeV2>, I>>(base?: I): IntegerAttributeV2 {
    return IntegerAttributeV2.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IntegerAttributeV2>, I>>(object: I): IntegerAttributeV2 {
    const message = createBaseIntegerAttributeV2();
    message.id = object.id ?? "";
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseDecimalAttributeV2(): DecimalAttributeV2 {
  return { id: "", value: 0 };
}

export const DecimalAttributeV2 = {
  encode(message: DecimalAttributeV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.value !== 0) {
      writer.uint32(17).double(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DecimalAttributeV2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDecimalAttributeV2();
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

  fromJSON(object: any): DecimalAttributeV2 {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      value: isSet(object.value) ? globalThis.Number(object.value) : 0,
    };
  },

  toJSON(message: DecimalAttributeV2): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.value !== 0) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DecimalAttributeV2>, I>>(base?: I): DecimalAttributeV2 {
    return DecimalAttributeV2.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DecimalAttributeV2>, I>>(object: I): DecimalAttributeV2 {
    const message = createBaseDecimalAttributeV2();
    message.id = object.id ?? "";
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseBooleanAttributeV2(): BooleanAttributeV2 {
  return { id: "", value: false };
}

export const BooleanAttributeV2 = {
  encode(message: BooleanAttributeV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.value === true) {
      writer.uint32(16).bool(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BooleanAttributeV2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBooleanAttributeV2();
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

  fromJSON(object: any): BooleanAttributeV2 {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      value: isSet(object.value) ? globalThis.Boolean(object.value) : false,
    };
  },

  toJSON(message: BooleanAttributeV2): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.value === true) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BooleanAttributeV2>, I>>(base?: I): BooleanAttributeV2 {
    return BooleanAttributeV2.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BooleanAttributeV2>, I>>(object: I): BooleanAttributeV2 {
    const message = createBaseBooleanAttributeV2();
    message.id = object.id ?? "";
    message.value = object.value ?? false;
    return message;
  },
};

function createBaseDateAttributeV2(): DateAttributeV2 {
  return { id: "", value: "" };
}

export const DateAttributeV2 = {
  encode(message: DateAttributeV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DateAttributeV2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDateAttributeV2();
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

  fromJSON(object: any): DateAttributeV2 {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: DateAttributeV2): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DateAttributeV2>, I>>(base?: I): DateAttributeV2 {
    return DateAttributeV2.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DateAttributeV2>, I>>(object: I): DateAttributeV2 {
    const message = createBaseDateAttributeV2();
    message.id = object.id ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseDateTimeAttributeV2(): DateTimeAttributeV2 {
  return { id: "", value: "" };
}

export const DateTimeAttributeV2 = {
  encode(message: DateTimeAttributeV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DateTimeAttributeV2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDateTimeAttributeV2();
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

  fromJSON(object: any): DateTimeAttributeV2 {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: DateTimeAttributeV2): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DateTimeAttributeV2>, I>>(base?: I): DateTimeAttributeV2 {
    return DateTimeAttributeV2.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DateTimeAttributeV2>, I>>(object: I): DateTimeAttributeV2 {
    const message = createBaseDateTimeAttributeV2();
    message.id = object.id ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseStringAttributeDefinitionV2(): StringAttributeDefinitionV2 {
  return { displayName: "", id: "", description: "", required: false };
}

export const StringAttributeDefinitionV2 = {
  encode(message: StringAttributeDefinitionV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): StringAttributeDefinitionV2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStringAttributeDefinitionV2();
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

  fromJSON(object: any): StringAttributeDefinitionV2 {
    return {
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      required: isSet(object.required) ? globalThis.Boolean(object.required) : false,
    };
  },

  toJSON(message: StringAttributeDefinitionV2): unknown {
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

  create<I extends Exact<DeepPartial<StringAttributeDefinitionV2>, I>>(base?: I): StringAttributeDefinitionV2 {
    return StringAttributeDefinitionV2.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StringAttributeDefinitionV2>, I>>(object: I): StringAttributeDefinitionV2 {
    const message = createBaseStringAttributeDefinitionV2();
    message.displayName = object.displayName ?? "";
    message.id = object.id ?? "";
    message.description = object.description ?? "";
    message.required = object.required ?? false;
    return message;
  },
};

function createBaseIntegerAttributeDefinitionV2(): IntegerAttributeDefinitionV2 {
  return { displayName: "", id: "", description: "", required: false };
}

export const IntegerAttributeDefinitionV2 = {
  encode(message: IntegerAttributeDefinitionV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): IntegerAttributeDefinitionV2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIntegerAttributeDefinitionV2();
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

  fromJSON(object: any): IntegerAttributeDefinitionV2 {
    return {
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      required: isSet(object.required) ? globalThis.Boolean(object.required) : false,
    };
  },

  toJSON(message: IntegerAttributeDefinitionV2): unknown {
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

  create<I extends Exact<DeepPartial<IntegerAttributeDefinitionV2>, I>>(base?: I): IntegerAttributeDefinitionV2 {
    return IntegerAttributeDefinitionV2.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IntegerAttributeDefinitionV2>, I>>(object: I): IntegerAttributeDefinitionV2 {
    const message = createBaseIntegerAttributeDefinitionV2();
    message.displayName = object.displayName ?? "";
    message.id = object.id ?? "";
    message.description = object.description ?? "";
    message.required = object.required ?? false;
    return message;
  },
};

function createBaseDecimalAttributeDefinitionV2(): DecimalAttributeDefinitionV2 {
  return { displayName: "", id: "", description: "", required: false };
}

export const DecimalAttributeDefinitionV2 = {
  encode(message: DecimalAttributeDefinitionV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): DecimalAttributeDefinitionV2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDecimalAttributeDefinitionV2();
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

  fromJSON(object: any): DecimalAttributeDefinitionV2 {
    return {
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      required: isSet(object.required) ? globalThis.Boolean(object.required) : false,
    };
  },

  toJSON(message: DecimalAttributeDefinitionV2): unknown {
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

  create<I extends Exact<DeepPartial<DecimalAttributeDefinitionV2>, I>>(base?: I): DecimalAttributeDefinitionV2 {
    return DecimalAttributeDefinitionV2.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DecimalAttributeDefinitionV2>, I>>(object: I): DecimalAttributeDefinitionV2 {
    const message = createBaseDecimalAttributeDefinitionV2();
    message.displayName = object.displayName ?? "";
    message.id = object.id ?? "";
    message.description = object.description ?? "";
    message.required = object.required ?? false;
    return message;
  },
};

function createBaseBooleanAttributeDefinitionV2(): BooleanAttributeDefinitionV2 {
  return { displayName: "", id: "", description: "", required: false };
}

export const BooleanAttributeDefinitionV2 = {
  encode(message: BooleanAttributeDefinitionV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): BooleanAttributeDefinitionV2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBooleanAttributeDefinitionV2();
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

  fromJSON(object: any): BooleanAttributeDefinitionV2 {
    return {
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      required: isSet(object.required) ? globalThis.Boolean(object.required) : false,
    };
  },

  toJSON(message: BooleanAttributeDefinitionV2): unknown {
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

  create<I extends Exact<DeepPartial<BooleanAttributeDefinitionV2>, I>>(base?: I): BooleanAttributeDefinitionV2 {
    return BooleanAttributeDefinitionV2.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BooleanAttributeDefinitionV2>, I>>(object: I): BooleanAttributeDefinitionV2 {
    const message = createBaseBooleanAttributeDefinitionV2();
    message.displayName = object.displayName ?? "";
    message.id = object.id ?? "";
    message.description = object.description ?? "";
    message.required = object.required ?? false;
    return message;
  },
};

function createBaseDateAttributeDefinitionV2(): DateAttributeDefinitionV2 {
  return { displayName: "", id: "", description: "", required: false };
}

export const DateAttributeDefinitionV2 = {
  encode(message: DateAttributeDefinitionV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): DateAttributeDefinitionV2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDateAttributeDefinitionV2();
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

  fromJSON(object: any): DateAttributeDefinitionV2 {
    return {
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      required: isSet(object.required) ? globalThis.Boolean(object.required) : false,
    };
  },

  toJSON(message: DateAttributeDefinitionV2): unknown {
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

  create<I extends Exact<DeepPartial<DateAttributeDefinitionV2>, I>>(base?: I): DateAttributeDefinitionV2 {
    return DateAttributeDefinitionV2.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DateAttributeDefinitionV2>, I>>(object: I): DateAttributeDefinitionV2 {
    const message = createBaseDateAttributeDefinitionV2();
    message.displayName = object.displayName ?? "";
    message.id = object.id ?? "";
    message.description = object.description ?? "";
    message.required = object.required ?? false;
    return message;
  },
};

function createBaseDateTimeAttributeDefinitionV2(): DateTimeAttributeDefinitionV2 {
  return { displayName: "", id: "", description: "", required: false };
}

export const DateTimeAttributeDefinitionV2 = {
  encode(message: DateTimeAttributeDefinitionV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): DateTimeAttributeDefinitionV2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDateTimeAttributeDefinitionV2();
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

  fromJSON(object: any): DateTimeAttributeDefinitionV2 {
    return {
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      required: isSet(object.required) ? globalThis.Boolean(object.required) : false,
    };
  },

  toJSON(message: DateTimeAttributeDefinitionV2): unknown {
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

  create<I extends Exact<DeepPartial<DateTimeAttributeDefinitionV2>, I>>(base?: I): DateTimeAttributeDefinitionV2 {
    return DateTimeAttributeDefinitionV2.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DateTimeAttributeDefinitionV2>, I>>(
    object: I,
  ): DateTimeAttributeDefinitionV2 {
    const message = createBaseDateTimeAttributeDefinitionV2();
    message.displayName = object.displayName ?? "";
    message.id = object.id ?? "";
    message.description = object.description ?? "";
    message.required = object.required ?? false;
    return message;
  },
};

function createBaseStringEnumAttributeDefinitionV2(): StringEnumAttributeDefinitionV2 {
  return { displayName: "", id: "", description: "", required: false, enum: [] };
}

export const StringEnumAttributeDefinitionV2 = {
  encode(message: StringEnumAttributeDefinitionV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): StringEnumAttributeDefinitionV2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStringEnumAttributeDefinitionV2();
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

  fromJSON(object: any): StringEnumAttributeDefinitionV2 {
    return {
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      required: isSet(object.required) ? globalThis.Boolean(object.required) : false,
      enum: globalThis.Array.isArray(object?.enum) ? object.enum.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: StringEnumAttributeDefinitionV2): unknown {
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

  create<I extends Exact<DeepPartial<StringEnumAttributeDefinitionV2>, I>>(base?: I): StringEnumAttributeDefinitionV2 {
    return StringEnumAttributeDefinitionV2.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StringEnumAttributeDefinitionV2>, I>>(
    object: I,
  ): StringEnumAttributeDefinitionV2 {
    const message = createBaseStringEnumAttributeDefinitionV2();
    message.displayName = object.displayName ?? "";
    message.id = object.id ?? "";
    message.description = object.description ?? "";
    message.required = object.required ?? false;
    message.enum = object.enum?.map((e) => e) || [];
    return message;
  },
};

function createBaseIntegerEnumAttributeDefinitionV2(): IntegerEnumAttributeDefinitionV2 {
  return { displayName: "", id: "", description: "", required: false, enum: [] };
}

export const IntegerEnumAttributeDefinitionV2 = {
  encode(message: IntegerEnumAttributeDefinitionV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): IntegerEnumAttributeDefinitionV2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIntegerEnumAttributeDefinitionV2();
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

  fromJSON(object: any): IntegerEnumAttributeDefinitionV2 {
    return {
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      required: isSet(object.required) ? globalThis.Boolean(object.required) : false,
      enum: globalThis.Array.isArray(object?.enum) ? object.enum.map((e: any) => globalThis.Number(e)) : [],
    };
  },

  toJSON(message: IntegerEnumAttributeDefinitionV2): unknown {
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

  create<I extends Exact<DeepPartial<IntegerEnumAttributeDefinitionV2>, I>>(
    base?: I,
  ): IntegerEnumAttributeDefinitionV2 {
    return IntegerEnumAttributeDefinitionV2.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IntegerEnumAttributeDefinitionV2>, I>>(
    object: I,
  ): IntegerEnumAttributeDefinitionV2 {
    const message = createBaseIntegerEnumAttributeDefinitionV2();
    message.displayName = object.displayName ?? "";
    message.id = object.id ?? "";
    message.description = object.description ?? "";
    message.required = object.required ?? false;
    message.enum = object.enum?.map((e) => e) || [];
    return message;
  },
};

function createBaseDecimalEnumAttributeDefinitionV2(): DecimalEnumAttributeDefinitionV2 {
  return { displayName: "", id: "", description: "", required: false, enum: [] };
}

export const DecimalEnumAttributeDefinitionV2 = {
  encode(message: DecimalEnumAttributeDefinitionV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): DecimalEnumAttributeDefinitionV2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDecimalEnumAttributeDefinitionV2();
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

  fromJSON(object: any): DecimalEnumAttributeDefinitionV2 {
    return {
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      required: isSet(object.required) ? globalThis.Boolean(object.required) : false,
      enum: globalThis.Array.isArray(object?.enum) ? object.enum.map((e: any) => globalThis.Number(e)) : [],
    };
  },

  toJSON(message: DecimalEnumAttributeDefinitionV2): unknown {
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

  create<I extends Exact<DeepPartial<DecimalEnumAttributeDefinitionV2>, I>>(
    base?: I,
  ): DecimalEnumAttributeDefinitionV2 {
    return DecimalEnumAttributeDefinitionV2.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DecimalEnumAttributeDefinitionV2>, I>>(
    object: I,
  ): DecimalEnumAttributeDefinitionV2 {
    const message = createBaseDecimalEnumAttributeDefinitionV2();
    message.displayName = object.displayName ?? "";
    message.id = object.id ?? "";
    message.description = object.description ?? "";
    message.required = object.required ?? false;
    message.enum = object.enum?.map((e) => e) || [];
    return message;
  },
};

function createBaseCredentialReceiptV2(): CredentialReceiptV2 {
  return { credential: undefined, credentialId: "", credentialType: "" };
}

export const CredentialReceiptV2 = {
  encode(message: CredentialReceiptV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.credential !== undefined) {
      CredentialV2.encode(message.credential, writer.uint32(10).fork()).ldelim();
    }
    if (message.credentialId !== "") {
      writer.uint32(18).string(message.credentialId);
    }
    if (message.credentialType !== "") {
      writer.uint32(26).string(message.credentialType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialReceiptV2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialReceiptV2();
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

  fromJSON(object: any): CredentialReceiptV2 {
    return {
      credential: isSet(object.credential) ? CredentialV2.fromJSON(object.credential) : undefined,
      credentialId: isSet(object.credentialId) ? globalThis.String(object.credentialId) : "",
      credentialType: isSet(object.credentialType) ? globalThis.String(object.credentialType) : "",
    };
  },

  toJSON(message: CredentialReceiptV2): unknown {
    const obj: any = {};
    if (message.credential !== undefined) {
      obj.credential = CredentialV2.toJSON(message.credential);
    }
    if (message.credentialId !== "") {
      obj.credentialId = message.credentialId;
    }
    if (message.credentialType !== "") {
      obj.credentialType = message.credentialType;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CredentialReceiptV2>, I>>(base?: I): CredentialReceiptV2 {
    return CredentialReceiptV2.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CredentialReceiptV2>, I>>(object: I): CredentialReceiptV2 {
    const message = createBaseCredentialReceiptV2();
    message.credential = (object.credential !== undefined && object.credential !== null)
      ? CredentialV2.fromPartial(object.credential)
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

function createBaseSchemaV2(): SchemaV2 {
  return { cid: "", cidJsonLd: "", schemaType: "", json: "" };
}

export const SchemaV2 = {
  encode(message: SchemaV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): SchemaV2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSchemaV2();
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

  fromJSON(object: any): SchemaV2 {
    return {
      cid: isSet(object.cid) ? globalThis.String(object.cid) : "",
      cidJsonLd: isSet(object.cidJsonLd) ? globalThis.String(object.cidJsonLd) : "",
      schemaType: isSet(object.schemaType) ? globalThis.String(object.schemaType) : "",
      json: isSet(object.json) ? globalThis.String(object.json) : "",
    };
  },

  toJSON(message: SchemaV2): unknown {
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

  create<I extends Exact<DeepPartial<SchemaV2>, I>>(base?: I): SchemaV2 {
    return SchemaV2.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SchemaV2>, I>>(object: I): SchemaV2 {
    const message = createBaseSchemaV2();
    message.cid = object.cid ?? "";
    message.cidJsonLd = object.cidJsonLd ?? "";
    message.schemaType = object.schemaType ?? "";
    message.json = object.json ?? "";
    return message;
  },
};

function createBaseCredentialRevocationV2(): CredentialRevocationV2 {
  return { success: false };
}

export const CredentialRevocationV2 = {
  encode(message: CredentialRevocationV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialRevocationV2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialRevocationV2();
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

  fromJSON(object: any): CredentialRevocationV2 {
    return { success: isSet(object.success) ? globalThis.Boolean(object.success) : false };
  },

  toJSON(message: CredentialRevocationV2): unknown {
    const obj: any = {};
    if (message.success === true) {
      obj.success = message.success;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CredentialRevocationV2>, I>>(base?: I): CredentialRevocationV2 {
    return CredentialRevocationV2.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CredentialRevocationV2>, I>>(object: I): CredentialRevocationV2 {
    const message = createBaseCredentialRevocationV2();
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

function createBaseDidParams(): DidParams {
  return { method: 0, blockchain: 0, networkId: 0 };
}

export const DidParams = {
  encode(message: DidParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): DidParams {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDidParams();
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

  fromJSON(object: any): DidParams {
    return {
      method: isSet(object.method) ? methodFromJSON(object.method) : 0,
      blockchain: isSet(object.blockchain) ? blockchainFromJSON(object.blockchain) : 0,
      networkId: isSet(object.networkId) ? networkIdFromJSON(object.networkId) : 0,
    };
  },

  toJSON(message: DidParams): unknown {
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

  create<I extends Exact<DeepPartial<DidParams>, I>>(base?: I): DidParams {
    return DidParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DidParams>, I>>(object: I): DidParams {
    const message = createBaseDidParams();
    message.method = object.method ?? 0;
    message.blockchain = object.blockchain ?? 0;
    message.networkId = object.networkId ?? 0;
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
