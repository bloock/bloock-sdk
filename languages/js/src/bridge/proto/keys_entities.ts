/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export enum KeyType {
  EcP256k = 0,
  Rsa2048 = 1,
  Rsa3072 = 2,
  Rsa4096 = 3,
  Aes128 = 4,
  Aes256 = 5,
  Bjj = 6,
  UNRECOGNIZED = -1,
}

export function keyTypeFromJSON(object: any): KeyType {
  switch (object) {
    case 0:
    case "EcP256k":
      return KeyType.EcP256k;
    case 1:
    case "Rsa2048":
      return KeyType.Rsa2048;
    case 2:
    case "Rsa3072":
      return KeyType.Rsa3072;
    case 3:
    case "Rsa4096":
      return KeyType.Rsa4096;
    case 4:
    case "Aes128":
      return KeyType.Aes128;
    case 5:
    case "Aes256":
      return KeyType.Aes256;
    case 6:
    case "Bjj":
      return KeyType.Bjj;
    case -1:
    case "UNRECOGNIZED":
    default:
      return KeyType.UNRECOGNIZED;
  }
}

export function keyTypeToJSON(object: KeyType): string {
  switch (object) {
    case KeyType.EcP256k:
      return "EcP256k";
    case KeyType.Rsa2048:
      return "Rsa2048";
    case KeyType.Rsa3072:
      return "Rsa3072";
    case KeyType.Rsa4096:
      return "Rsa4096";
    case KeyType.Aes128:
      return "Aes128";
    case KeyType.Aes256:
      return "Aes256";
    case KeyType.Bjj:
      return "Bjj";
    case KeyType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum KeyProtectionLevel {
  SOFTWARE = 0,
  HSM = 1,
  UNRECOGNIZED = -1,
}

export function keyProtectionLevelFromJSON(object: any): KeyProtectionLevel {
  switch (object) {
    case 0:
    case "SOFTWARE":
      return KeyProtectionLevel.SOFTWARE;
    case 1:
    case "HSM":
      return KeyProtectionLevel.HSM;
    case -1:
    case "UNRECOGNIZED":
    default:
      return KeyProtectionLevel.UNRECOGNIZED;
  }
}

export function keyProtectionLevelToJSON(object: KeyProtectionLevel): string {
  switch (object) {
    case KeyProtectionLevel.SOFTWARE:
      return "SOFTWARE";
    case KeyProtectionLevel.HSM:
      return "HSM";
    case KeyProtectionLevel.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum CertificateType {
  PEM = 0,
  PFX = 1,
  UNRECOGNIZED = -1,
}

export function certificateTypeFromJSON(object: any): CertificateType {
  switch (object) {
    case 0:
    case "PEM":
      return CertificateType.PEM;
    case 1:
    case "PFX":
      return CertificateType.PFX;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CertificateType.UNRECOGNIZED;
  }
}

export function certificateTypeToJSON(object: CertificateType): string {
  switch (object) {
    case CertificateType.PEM:
      return "PEM";
    case CertificateType.PFX:
      return "PFX";
    case CertificateType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface LocalKey {
  key: string;
  keyType: KeyType;
  privateKey?: string | undefined;
}

export interface ManagedKeyParams {
  protection: KeyProtectionLevel;
  keyType: KeyType;
  name?: string | undefined;
  expiration?: number | undefined;
}

export interface ManagedKey {
  id: string;
  key: string;
  protection: KeyProtectionLevel;
  keyType: KeyType;
  name: string;
  expiration: number;
}

export interface CertificateSubject {
  commonName: string;
  organizationalUnit?: string | undefined;
  organization?: string | undefined;
  location?: string | undefined;
  state?: string | undefined;
  country?: string | undefined;
}

export interface LocalCertificateParams {
  keyType: KeyType;
  password: string;
  subject?: CertificateSubject;
  expiration: number;
}

export interface LocalCertificate {
  pkcs12: Uint8Array;
  password: string;
}

export interface ManagedCertificateParams {
  keyType: KeyType;
  expiration: number;
  subject?: CertificateSubject;
}

export interface ManagedCertificate {
  id: string;
  key: string;
  protection: KeyProtectionLevel;
  keyType: KeyType;
  expiration: number;
}

function createBaseLocalKey(): LocalKey {
  return { key: "", keyType: 0, privateKey: undefined };
}

export const LocalKey = {
  encode(message: LocalKey, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.keyType !== 0) {
      writer.uint32(16).int32(message.keyType);
    }
    if (message.privateKey !== undefined) {
      writer.uint32(26).string(message.privateKey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LocalKey {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLocalKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.keyType = reader.int32() as any;
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

  fromJSON(object: any): LocalKey {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      keyType: isSet(object.keyType) ? keyTypeFromJSON(object.keyType) : 0,
      privateKey: isSet(object.privateKey) ? String(object.privateKey) : undefined,
    };
  },

  toJSON(message: LocalKey): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.keyType !== undefined && (obj.keyType = keyTypeToJSON(message.keyType));
    message.privateKey !== undefined && (obj.privateKey = message.privateKey);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LocalKey>, I>>(object: I): LocalKey {
    const message = createBaseLocalKey();
    message.key = object.key ?? "";
    message.keyType = object.keyType ?? 0;
    message.privateKey = object.privateKey ?? undefined;
    return message;
  },
};

function createBaseManagedKeyParams(): ManagedKeyParams {
  return { protection: 0, keyType: 0, name: undefined, expiration: undefined };
}

export const ManagedKeyParams = {
  encode(message: ManagedKeyParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.protection !== 0) {
      writer.uint32(8).int32(message.protection);
    }
    if (message.keyType !== 0) {
      writer.uint32(16).int32(message.keyType);
    }
    if (message.name !== undefined) {
      writer.uint32(26).string(message.name);
    }
    if (message.expiration !== undefined) {
      writer.uint32(32).int64(message.expiration);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ManagedKeyParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseManagedKeyParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.protection = reader.int32() as any;
          break;
        case 2:
          message.keyType = reader.int32() as any;
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.expiration = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ManagedKeyParams {
    return {
      protection: isSet(object.protection) ? keyProtectionLevelFromJSON(object.protection) : 0,
      keyType: isSet(object.keyType) ? keyTypeFromJSON(object.keyType) : 0,
      name: isSet(object.name) ? String(object.name) : undefined,
      expiration: isSet(object.expiration) ? Number(object.expiration) : undefined,
    };
  },

  toJSON(message: ManagedKeyParams): unknown {
    const obj: any = {};
    message.protection !== undefined && (obj.protection = keyProtectionLevelToJSON(message.protection));
    message.keyType !== undefined && (obj.keyType = keyTypeToJSON(message.keyType));
    message.name !== undefined && (obj.name = message.name);
    message.expiration !== undefined && (obj.expiration = Math.round(message.expiration));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ManagedKeyParams>, I>>(object: I): ManagedKeyParams {
    const message = createBaseManagedKeyParams();
    message.protection = object.protection ?? 0;
    message.keyType = object.keyType ?? 0;
    message.name = object.name ?? undefined;
    message.expiration = object.expiration ?? undefined;
    return message;
  },
};

function createBaseManagedKey(): ManagedKey {
  return { id: "", key: "", protection: 0, keyType: 0, name: "", expiration: 0 };
}

export const ManagedKey = {
  encode(message: ManagedKey, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    if (message.protection !== 0) {
      writer.uint32(24).int32(message.protection);
    }
    if (message.keyType !== 0) {
      writer.uint32(32).int32(message.keyType);
    }
    if (message.name !== "") {
      writer.uint32(42).string(message.name);
    }
    if (message.expiration !== 0) {
      writer.uint32(48).int64(message.expiration);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ManagedKey {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseManagedKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.key = reader.string();
          break;
        case 3:
          message.protection = reader.int32() as any;
          break;
        case 4:
          message.keyType = reader.int32() as any;
          break;
        case 5:
          message.name = reader.string();
          break;
        case 6:
          message.expiration = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ManagedKey {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      key: isSet(object.key) ? String(object.key) : "",
      protection: isSet(object.protection) ? keyProtectionLevelFromJSON(object.protection) : 0,
      keyType: isSet(object.keyType) ? keyTypeFromJSON(object.keyType) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      expiration: isSet(object.expiration) ? Number(object.expiration) : 0,
    };
  },

  toJSON(message: ManagedKey): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.key !== undefined && (obj.key = message.key);
    message.protection !== undefined && (obj.protection = keyProtectionLevelToJSON(message.protection));
    message.keyType !== undefined && (obj.keyType = keyTypeToJSON(message.keyType));
    message.name !== undefined && (obj.name = message.name);
    message.expiration !== undefined && (obj.expiration = Math.round(message.expiration));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ManagedKey>, I>>(object: I): ManagedKey {
    const message = createBaseManagedKey();
    message.id = object.id ?? "";
    message.key = object.key ?? "";
    message.protection = object.protection ?? 0;
    message.keyType = object.keyType ?? 0;
    message.name = object.name ?? "";
    message.expiration = object.expiration ?? 0;
    return message;
  },
};

function createBaseCertificateSubject(): CertificateSubject {
  return {
    commonName: "",
    organizationalUnit: undefined,
    organization: undefined,
    location: undefined,
    state: undefined,
    country: undefined,
  };
}

export const CertificateSubject = {
  encode(message: CertificateSubject, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.commonName !== "") {
      writer.uint32(10).string(message.commonName);
    }
    if (message.organizationalUnit !== undefined) {
      writer.uint32(18).string(message.organizationalUnit);
    }
    if (message.organization !== undefined) {
      writer.uint32(26).string(message.organization);
    }
    if (message.location !== undefined) {
      writer.uint32(34).string(message.location);
    }
    if (message.state !== undefined) {
      writer.uint32(42).string(message.state);
    }
    if (message.country !== undefined) {
      writer.uint32(50).string(message.country);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CertificateSubject {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCertificateSubject();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.commonName = reader.string();
          break;
        case 2:
          message.organizationalUnit = reader.string();
          break;
        case 3:
          message.organization = reader.string();
          break;
        case 4:
          message.location = reader.string();
          break;
        case 5:
          message.state = reader.string();
          break;
        case 6:
          message.country = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CertificateSubject {
    return {
      commonName: isSet(object.commonName) ? String(object.commonName) : "",
      organizationalUnit: isSet(object.organizationalUnit) ? String(object.organizationalUnit) : undefined,
      organization: isSet(object.organization) ? String(object.organization) : undefined,
      location: isSet(object.location) ? String(object.location) : undefined,
      state: isSet(object.state) ? String(object.state) : undefined,
      country: isSet(object.country) ? String(object.country) : undefined,
    };
  },

  toJSON(message: CertificateSubject): unknown {
    const obj: any = {};
    message.commonName !== undefined && (obj.commonName = message.commonName);
    message.organizationalUnit !== undefined && (obj.organizationalUnit = message.organizationalUnit);
    message.organization !== undefined && (obj.organization = message.organization);
    message.location !== undefined && (obj.location = message.location);
    message.state !== undefined && (obj.state = message.state);
    message.country !== undefined && (obj.country = message.country);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CertificateSubject>, I>>(object: I): CertificateSubject {
    const message = createBaseCertificateSubject();
    message.commonName = object.commonName ?? "";
    message.organizationalUnit = object.organizationalUnit ?? undefined;
    message.organization = object.organization ?? undefined;
    message.location = object.location ?? undefined;
    message.state = object.state ?? undefined;
    message.country = object.country ?? undefined;
    return message;
  },
};

function createBaseLocalCertificateParams(): LocalCertificateParams {
  return { keyType: 0, password: "", subject: undefined, expiration: 0 };
}

export const LocalCertificateParams = {
  encode(message: LocalCertificateParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.keyType !== 0) {
      writer.uint32(8).int32(message.keyType);
    }
    if (message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    if (message.subject !== undefined) {
      CertificateSubject.encode(message.subject, writer.uint32(26).fork()).ldelim();
    }
    if (message.expiration !== 0) {
      writer.uint32(32).int32(message.expiration);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LocalCertificateParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLocalCertificateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.keyType = reader.int32() as any;
          break;
        case 2:
          message.password = reader.string();
          break;
        case 3:
          message.subject = CertificateSubject.decode(reader, reader.uint32());
          break;
        case 4:
          message.expiration = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LocalCertificateParams {
    return {
      keyType: isSet(object.keyType) ? keyTypeFromJSON(object.keyType) : 0,
      password: isSet(object.password) ? String(object.password) : "",
      subject: isSet(object.subject) ? CertificateSubject.fromJSON(object.subject) : undefined,
      expiration: isSet(object.expiration) ? Number(object.expiration) : 0,
    };
  },

  toJSON(message: LocalCertificateParams): unknown {
    const obj: any = {};
    message.keyType !== undefined && (obj.keyType = keyTypeToJSON(message.keyType));
    message.password !== undefined && (obj.password = message.password);
    message.subject !== undefined &&
      (obj.subject = message.subject ? CertificateSubject.toJSON(message.subject) : undefined);
    message.expiration !== undefined && (obj.expiration = Math.round(message.expiration));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LocalCertificateParams>, I>>(object: I): LocalCertificateParams {
    const message = createBaseLocalCertificateParams();
    message.keyType = object.keyType ?? 0;
    message.password = object.password ?? "";
    message.subject = (object.subject !== undefined && object.subject !== null)
      ? CertificateSubject.fromPartial(object.subject)
      : undefined;
    message.expiration = object.expiration ?? 0;
    return message;
  },
};

function createBaseLocalCertificate(): LocalCertificate {
  return { pkcs12: new Uint8Array(), password: "" };
}

export const LocalCertificate = {
  encode(message: LocalCertificate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pkcs12.length !== 0) {
      writer.uint32(10).bytes(message.pkcs12);
    }
    if (message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LocalCertificate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLocalCertificate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pkcs12 = reader.bytes();
          break;
        case 2:
          message.password = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LocalCertificate {
    return {
      pkcs12: isSet(object.pkcs12) ? bytesFromBase64(object.pkcs12) : new Uint8Array(),
      password: isSet(object.password) ? String(object.password) : "",
    };
  },

  toJSON(message: LocalCertificate): unknown {
    const obj: any = {};
    message.pkcs12 !== undefined &&
      (obj.pkcs12 = base64FromBytes(message.pkcs12 !== undefined ? message.pkcs12 : new Uint8Array()));
    message.password !== undefined && (obj.password = message.password);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LocalCertificate>, I>>(object: I): LocalCertificate {
    const message = createBaseLocalCertificate();
    message.pkcs12 = object.pkcs12 ?? new Uint8Array();
    message.password = object.password ?? "";
    return message;
  },
};

function createBaseManagedCertificateParams(): ManagedCertificateParams {
  return { keyType: 0, expiration: 0, subject: undefined };
}

export const ManagedCertificateParams = {
  encode(message: ManagedCertificateParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.keyType !== 0) {
      writer.uint32(8).int32(message.keyType);
    }
    if (message.expiration !== 0) {
      writer.uint32(16).int32(message.expiration);
    }
    if (message.subject !== undefined) {
      CertificateSubject.encode(message.subject, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ManagedCertificateParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseManagedCertificateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.keyType = reader.int32() as any;
          break;
        case 2:
          message.expiration = reader.int32();
          break;
        case 3:
          message.subject = CertificateSubject.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ManagedCertificateParams {
    return {
      keyType: isSet(object.keyType) ? keyTypeFromJSON(object.keyType) : 0,
      expiration: isSet(object.expiration) ? Number(object.expiration) : 0,
      subject: isSet(object.subject) ? CertificateSubject.fromJSON(object.subject) : undefined,
    };
  },

  toJSON(message: ManagedCertificateParams): unknown {
    const obj: any = {};
    message.keyType !== undefined && (obj.keyType = keyTypeToJSON(message.keyType));
    message.expiration !== undefined && (obj.expiration = Math.round(message.expiration));
    message.subject !== undefined &&
      (obj.subject = message.subject ? CertificateSubject.toJSON(message.subject) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ManagedCertificateParams>, I>>(object: I): ManagedCertificateParams {
    const message = createBaseManagedCertificateParams();
    message.keyType = object.keyType ?? 0;
    message.expiration = object.expiration ?? 0;
    message.subject = (object.subject !== undefined && object.subject !== null)
      ? CertificateSubject.fromPartial(object.subject)
      : undefined;
    return message;
  },
};

function createBaseManagedCertificate(): ManagedCertificate {
  return { id: "", key: "", protection: 0, keyType: 0, expiration: 0 };
}

export const ManagedCertificate = {
  encode(message: ManagedCertificate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    if (message.protection !== 0) {
      writer.uint32(24).int32(message.protection);
    }
    if (message.keyType !== 0) {
      writer.uint32(32).int32(message.keyType);
    }
    if (message.expiration !== 0) {
      writer.uint32(48).int64(message.expiration);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ManagedCertificate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseManagedCertificate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.key = reader.string();
          break;
        case 3:
          message.protection = reader.int32() as any;
          break;
        case 4:
          message.keyType = reader.int32() as any;
          break;
        case 6:
          message.expiration = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ManagedCertificate {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      key: isSet(object.key) ? String(object.key) : "",
      protection: isSet(object.protection) ? keyProtectionLevelFromJSON(object.protection) : 0,
      keyType: isSet(object.keyType) ? keyTypeFromJSON(object.keyType) : 0,
      expiration: isSet(object.expiration) ? Number(object.expiration) : 0,
    };
  },

  toJSON(message: ManagedCertificate): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.key !== undefined && (obj.key = message.key);
    message.protection !== undefined && (obj.protection = keyProtectionLevelToJSON(message.protection));
    message.keyType !== undefined && (obj.keyType = keyTypeToJSON(message.keyType));
    message.expiration !== undefined && (obj.expiration = Math.round(message.expiration));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ManagedCertificate>, I>>(object: I): ManagedCertificate {
    const message = createBaseManagedCertificate();
    message.id = object.id ?? "";
    message.key = object.key ?? "";
    message.protection = object.protection ?? 0;
    message.keyType = object.keyType ?? 0;
    message.expiration = object.expiration ?? 0;
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
