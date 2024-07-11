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

export enum AccessControlType {
  NO_ACCESS_CONTROL = 0,
  TOTP = 1,
  SECRET = 2,
  UNRECOGNIZED = -1,
}

export function accessControlTypeFromJSON(object: any): AccessControlType {
  switch (object) {
    case 0:
    case "NO_ACCESS_CONTROL":
      return AccessControlType.NO_ACCESS_CONTROL;
    case 1:
    case "TOTP":
      return AccessControlType.TOTP;
    case 2:
    case "SECRET":
      return AccessControlType.SECRET;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AccessControlType.UNRECOGNIZED;
  }
}

export function accessControlTypeToJSON(object: AccessControlType): string {
  switch (object) {
    case AccessControlType.NO_ACCESS_CONTROL:
      return "NO_ACCESS_CONTROL";
    case AccessControlType.TOTP:
      return "TOTP";
    case AccessControlType.SECRET:
      return "SECRET";
    case AccessControlType.UNRECOGNIZED:
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
  accessControlType: AccessControlType;
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
  subject?: CertificateSubject | undefined;
  expiration: number;
}

export interface LocalCertificate {
  pkcs12: Uint8Array;
  password: string;
}

export interface ManagedCertificateParams {
  keyType: KeyType;
  expiration: number;
  subject?: CertificateSubject | undefined;
}

export interface ManagedCertificate {
  id: string;
  key: string;
  protection: KeyProtectionLevel;
  keyType: KeyType;
  expiration: number;
  accessControlType: AccessControlType;
}

export interface AccessControl {
  accessControlTotp?: AccessControlTotp | undefined;
  accessControlSecret?: AccessControlSecret | undefined;
}

export interface AccessControlTotp {
  code: string;
}

export interface AccessControlSecret {
  secret: string;
}

export interface Key {
  localKey?: LocalKey | undefined;
  managedKey?: ManagedKey | undefined;
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLocalKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.keyType = reader.int32() as any;
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

  fromJSON(object: any): LocalKey {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      keyType: isSet(object.keyType) ? keyTypeFromJSON(object.keyType) : 0,
      privateKey: isSet(object.privateKey) ? globalThis.String(object.privateKey) : undefined,
    };
  },

  toJSON(message: LocalKey): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.keyType !== 0) {
      obj.keyType = keyTypeToJSON(message.keyType);
    }
    if (message.privateKey !== undefined) {
      obj.privateKey = message.privateKey;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LocalKey>, I>>(base?: I): LocalKey {
    return LocalKey.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseManagedKeyParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.protection = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.keyType = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.expiration = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ManagedKeyParams {
    return {
      protection: isSet(object.protection) ? keyProtectionLevelFromJSON(object.protection) : 0,
      keyType: isSet(object.keyType) ? keyTypeFromJSON(object.keyType) : 0,
      name: isSet(object.name) ? globalThis.String(object.name) : undefined,
      expiration: isSet(object.expiration) ? globalThis.Number(object.expiration) : undefined,
    };
  },

  toJSON(message: ManagedKeyParams): unknown {
    const obj: any = {};
    if (message.protection !== 0) {
      obj.protection = keyProtectionLevelToJSON(message.protection);
    }
    if (message.keyType !== 0) {
      obj.keyType = keyTypeToJSON(message.keyType);
    }
    if (message.name !== undefined) {
      obj.name = message.name;
    }
    if (message.expiration !== undefined) {
      obj.expiration = Math.round(message.expiration);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ManagedKeyParams>, I>>(base?: I): ManagedKeyParams {
    return ManagedKeyParams.fromPartial(base ?? ({} as any));
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
  return { id: "", key: "", protection: 0, keyType: 0, name: "", expiration: 0, accessControlType: 0 };
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
    if (message.accessControlType !== 0) {
      writer.uint32(56).int32(message.accessControlType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ManagedKey {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseManagedKey();
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

          message.key = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.protection = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.keyType = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.name = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.expiration = longToNumber(reader.int64() as Long);
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.accessControlType = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ManagedKey {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      protection: isSet(object.protection) ? keyProtectionLevelFromJSON(object.protection) : 0,
      keyType: isSet(object.keyType) ? keyTypeFromJSON(object.keyType) : 0,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      expiration: isSet(object.expiration) ? globalThis.Number(object.expiration) : 0,
      accessControlType: isSet(object.accessControlType) ? accessControlTypeFromJSON(object.accessControlType) : 0,
    };
  },

  toJSON(message: ManagedKey): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.protection !== 0) {
      obj.protection = keyProtectionLevelToJSON(message.protection);
    }
    if (message.keyType !== 0) {
      obj.keyType = keyTypeToJSON(message.keyType);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.expiration !== 0) {
      obj.expiration = Math.round(message.expiration);
    }
    if (message.accessControlType !== 0) {
      obj.accessControlType = accessControlTypeToJSON(message.accessControlType);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ManagedKey>, I>>(base?: I): ManagedKey {
    return ManagedKey.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ManagedKey>, I>>(object: I): ManagedKey {
    const message = createBaseManagedKey();
    message.id = object.id ?? "";
    message.key = object.key ?? "";
    message.protection = object.protection ?? 0;
    message.keyType = object.keyType ?? 0;
    message.name = object.name ?? "";
    message.expiration = object.expiration ?? 0;
    message.accessControlType = object.accessControlType ?? 0;
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCertificateSubject();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.commonName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.organizationalUnit = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.organization = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.location = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.state = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.country = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CertificateSubject {
    return {
      commonName: isSet(object.commonName) ? globalThis.String(object.commonName) : "",
      organizationalUnit: isSet(object.organizationalUnit) ? globalThis.String(object.organizationalUnit) : undefined,
      organization: isSet(object.organization) ? globalThis.String(object.organization) : undefined,
      location: isSet(object.location) ? globalThis.String(object.location) : undefined,
      state: isSet(object.state) ? globalThis.String(object.state) : undefined,
      country: isSet(object.country) ? globalThis.String(object.country) : undefined,
    };
  },

  toJSON(message: CertificateSubject): unknown {
    const obj: any = {};
    if (message.commonName !== "") {
      obj.commonName = message.commonName;
    }
    if (message.organizationalUnit !== undefined) {
      obj.organizationalUnit = message.organizationalUnit;
    }
    if (message.organization !== undefined) {
      obj.organization = message.organization;
    }
    if (message.location !== undefined) {
      obj.location = message.location;
    }
    if (message.state !== undefined) {
      obj.state = message.state;
    }
    if (message.country !== undefined) {
      obj.country = message.country;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CertificateSubject>, I>>(base?: I): CertificateSubject {
    return CertificateSubject.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLocalCertificateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.keyType = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.password = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.subject = CertificateSubject.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.expiration = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LocalCertificateParams {
    return {
      keyType: isSet(object.keyType) ? keyTypeFromJSON(object.keyType) : 0,
      password: isSet(object.password) ? globalThis.String(object.password) : "",
      subject: isSet(object.subject) ? CertificateSubject.fromJSON(object.subject) : undefined,
      expiration: isSet(object.expiration) ? globalThis.Number(object.expiration) : 0,
    };
  },

  toJSON(message: LocalCertificateParams): unknown {
    const obj: any = {};
    if (message.keyType !== 0) {
      obj.keyType = keyTypeToJSON(message.keyType);
    }
    if (message.password !== "") {
      obj.password = message.password;
    }
    if (message.subject !== undefined) {
      obj.subject = CertificateSubject.toJSON(message.subject);
    }
    if (message.expiration !== 0) {
      obj.expiration = Math.round(message.expiration);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LocalCertificateParams>, I>>(base?: I): LocalCertificateParams {
    return LocalCertificateParams.fromPartial(base ?? ({} as any));
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
  return { pkcs12: new Uint8Array(0), password: "" };
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLocalCertificate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pkcs12 = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.password = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LocalCertificate {
    return {
      pkcs12: isSet(object.pkcs12) ? bytesFromBase64(object.pkcs12) : new Uint8Array(0),
      password: isSet(object.password) ? globalThis.String(object.password) : "",
    };
  },

  toJSON(message: LocalCertificate): unknown {
    const obj: any = {};
    if (message.pkcs12.length !== 0) {
      obj.pkcs12 = base64FromBytes(message.pkcs12);
    }
    if (message.password !== "") {
      obj.password = message.password;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LocalCertificate>, I>>(base?: I): LocalCertificate {
    return LocalCertificate.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LocalCertificate>, I>>(object: I): LocalCertificate {
    const message = createBaseLocalCertificate();
    message.pkcs12 = object.pkcs12 ?? new Uint8Array(0);
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseManagedCertificateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.keyType = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.expiration = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.subject = CertificateSubject.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ManagedCertificateParams {
    return {
      keyType: isSet(object.keyType) ? keyTypeFromJSON(object.keyType) : 0,
      expiration: isSet(object.expiration) ? globalThis.Number(object.expiration) : 0,
      subject: isSet(object.subject) ? CertificateSubject.fromJSON(object.subject) : undefined,
    };
  },

  toJSON(message: ManagedCertificateParams): unknown {
    const obj: any = {};
    if (message.keyType !== 0) {
      obj.keyType = keyTypeToJSON(message.keyType);
    }
    if (message.expiration !== 0) {
      obj.expiration = Math.round(message.expiration);
    }
    if (message.subject !== undefined) {
      obj.subject = CertificateSubject.toJSON(message.subject);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ManagedCertificateParams>, I>>(base?: I): ManagedCertificateParams {
    return ManagedCertificateParams.fromPartial(base ?? ({} as any));
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
  return { id: "", key: "", protection: 0, keyType: 0, expiration: 0, accessControlType: 0 };
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
    if (message.accessControlType !== 0) {
      writer.uint32(56).int32(message.accessControlType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ManagedCertificate {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseManagedCertificate();
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

          message.key = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.protection = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.keyType = reader.int32() as any;
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.expiration = longToNumber(reader.int64() as Long);
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.accessControlType = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ManagedCertificate {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      protection: isSet(object.protection) ? keyProtectionLevelFromJSON(object.protection) : 0,
      keyType: isSet(object.keyType) ? keyTypeFromJSON(object.keyType) : 0,
      expiration: isSet(object.expiration) ? globalThis.Number(object.expiration) : 0,
      accessControlType: isSet(object.accessControlType) ? accessControlTypeFromJSON(object.accessControlType) : 0,
    };
  },

  toJSON(message: ManagedCertificate): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.protection !== 0) {
      obj.protection = keyProtectionLevelToJSON(message.protection);
    }
    if (message.keyType !== 0) {
      obj.keyType = keyTypeToJSON(message.keyType);
    }
    if (message.expiration !== 0) {
      obj.expiration = Math.round(message.expiration);
    }
    if (message.accessControlType !== 0) {
      obj.accessControlType = accessControlTypeToJSON(message.accessControlType);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ManagedCertificate>, I>>(base?: I): ManagedCertificate {
    return ManagedCertificate.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ManagedCertificate>, I>>(object: I): ManagedCertificate {
    const message = createBaseManagedCertificate();
    message.id = object.id ?? "";
    message.key = object.key ?? "";
    message.protection = object.protection ?? 0;
    message.keyType = object.keyType ?? 0;
    message.expiration = object.expiration ?? 0;
    message.accessControlType = object.accessControlType ?? 0;
    return message;
  },
};

function createBaseAccessControl(): AccessControl {
  return { accessControlTotp: undefined, accessControlSecret: undefined };
}

export const AccessControl = {
  encode(message: AccessControl, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accessControlTotp !== undefined) {
      AccessControlTotp.encode(message.accessControlTotp, writer.uint32(10).fork()).ldelim();
    }
    if (message.accessControlSecret !== undefined) {
      AccessControlSecret.encode(message.accessControlSecret, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccessControl {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccessControl();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessControlTotp = AccessControlTotp.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.accessControlSecret = AccessControlSecret.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccessControl {
    return {
      accessControlTotp: isSet(object.accessControlTotp)
        ? AccessControlTotp.fromJSON(object.accessControlTotp)
        : undefined,
      accessControlSecret: isSet(object.accessControlSecret)
        ? AccessControlSecret.fromJSON(object.accessControlSecret)
        : undefined,
    };
  },

  toJSON(message: AccessControl): unknown {
    const obj: any = {};
    if (message.accessControlTotp !== undefined) {
      obj.accessControlTotp = AccessControlTotp.toJSON(message.accessControlTotp);
    }
    if (message.accessControlSecret !== undefined) {
      obj.accessControlSecret = AccessControlSecret.toJSON(message.accessControlSecret);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccessControl>, I>>(base?: I): AccessControl {
    return AccessControl.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccessControl>, I>>(object: I): AccessControl {
    const message = createBaseAccessControl();
    message.accessControlTotp = (object.accessControlTotp !== undefined && object.accessControlTotp !== null)
      ? AccessControlTotp.fromPartial(object.accessControlTotp)
      : undefined;
    message.accessControlSecret = (object.accessControlSecret !== undefined && object.accessControlSecret !== null)
      ? AccessControlSecret.fromPartial(object.accessControlSecret)
      : undefined;
    return message;
  },
};

function createBaseAccessControlTotp(): AccessControlTotp {
  return { code: "" };
}

export const AccessControlTotp = {
  encode(message: AccessControlTotp, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== "") {
      writer.uint32(10).string(message.code);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccessControlTotp {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccessControlTotp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.code = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccessControlTotp {
    return { code: isSet(object.code) ? globalThis.String(object.code) : "" };
  },

  toJSON(message: AccessControlTotp): unknown {
    const obj: any = {};
    if (message.code !== "") {
      obj.code = message.code;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccessControlTotp>, I>>(base?: I): AccessControlTotp {
    return AccessControlTotp.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccessControlTotp>, I>>(object: I): AccessControlTotp {
    const message = createBaseAccessControlTotp();
    message.code = object.code ?? "";
    return message;
  },
};

function createBaseAccessControlSecret(): AccessControlSecret {
  return { secret: "" };
}

export const AccessControlSecret = {
  encode(message: AccessControlSecret, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.secret !== "") {
      writer.uint32(10).string(message.secret);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccessControlSecret {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccessControlSecret();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.secret = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccessControlSecret {
    return { secret: isSet(object.secret) ? globalThis.String(object.secret) : "" };
  },

  toJSON(message: AccessControlSecret): unknown {
    const obj: any = {};
    if (message.secret !== "") {
      obj.secret = message.secret;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccessControlSecret>, I>>(base?: I): AccessControlSecret {
    return AccessControlSecret.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccessControlSecret>, I>>(object: I): AccessControlSecret {
    const message = createBaseAccessControlSecret();
    message.secret = object.secret ?? "";
    return message;
  },
};

function createBaseKey(): Key {
  return { localKey: undefined, managedKey: undefined };
}

export const Key = {
  encode(message: Key, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.localKey !== undefined) {
      LocalKey.encode(message.localKey, writer.uint32(10).fork()).ldelim();
    }
    if (message.managedKey !== undefined) {
      ManagedKey.encode(message.managedKey, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Key {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKey();
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

  fromJSON(object: any): Key {
    return {
      localKey: isSet(object.localKey) ? LocalKey.fromJSON(object.localKey) : undefined,
      managedKey: isSet(object.managedKey) ? ManagedKey.fromJSON(object.managedKey) : undefined,
    };
  },

  toJSON(message: Key): unknown {
    const obj: any = {};
    if (message.localKey !== undefined) {
      obj.localKey = LocalKey.toJSON(message.localKey);
    }
    if (message.managedKey !== undefined) {
      obj.managedKey = ManagedKey.toJSON(message.managedKey);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Key>, I>>(base?: I): Key {
    return Key.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Key>, I>>(object: I): Key {
    const message = createBaseKey();
    message.localKey = (object.localKey !== undefined && object.localKey !== null)
      ? LocalKey.fromPartial(object.localKey)
      : undefined;
    message.managedKey = (object.managedKey !== undefined && object.managedKey !== null)
      ? ManagedKey.fromPartial(object.managedKey)
      : undefined;
    return message;
  },
};

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
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
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
