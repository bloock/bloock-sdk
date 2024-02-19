/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { ConfigData } from "./config";
import {
  BooleanAttribute,
  CredentialReceipt,
  DateAttribute,
  DateTimeAttribute,
  DecimalAttribute,
  IntegerAttribute,
  StringAttribute,
} from "./identity_entities";
import { Key } from "./keys_entities";
import { Error } from "./shared";

export interface CreateCoreCredentialRequest {
  configData?: ConfigData | undefined;
  schemaId: string;
  issuerDid: string;
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

export interface CreateCoreCredentialResponse {
  credentialReceipt?: CredentialReceipt | undefined;
  error?: Error | undefined;
}

function createBaseCreateCoreCredentialRequest(): CreateCoreCredentialRequest {
  return {
    configData: undefined,
    schemaId: "",
    issuerDid: "",
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

export const CreateCoreCredentialRequest = {
  encode(message: CreateCoreCredentialRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
    if (message.key !== undefined) {
      Key.encode(message.key, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.stringAttributes) {
      StringAttribute.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.integerAttributes) {
      IntegerAttribute.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.decimalAttributes) {
      DecimalAttribute.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    for (const v of message.booleanAttributes) {
      BooleanAttribute.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    for (const v of message.dateAttributes) {
      DateAttribute.encode(v!, writer.uint32(98).fork()).ldelim();
    }
    for (const v of message.datetimeAttributes) {
      DateTimeAttribute.encode(v!, writer.uint32(106).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateCoreCredentialRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateCoreCredentialRequest();
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

          message.key = Key.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.stringAttributes.push(StringAttribute.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.integerAttributes.push(IntegerAttribute.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.decimalAttributes.push(DecimalAttribute.decode(reader, reader.uint32()));
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.booleanAttributes.push(BooleanAttribute.decode(reader, reader.uint32()));
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.dateAttributes.push(DateAttribute.decode(reader, reader.uint32()));
          continue;
        case 13:
          if (tag !== 106) {
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

  fromJSON(object: any): CreateCoreCredentialRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      schemaId: isSet(object.schemaId) ? globalThis.String(object.schemaId) : "",
      issuerDid: isSet(object.issuerDid) ? globalThis.String(object.issuerDid) : "",
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

  toJSON(message: CreateCoreCredentialRequest): unknown {
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

  create<I extends Exact<DeepPartial<CreateCoreCredentialRequest>, I>>(base?: I): CreateCoreCredentialRequest {
    return CreateCoreCredentialRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateCoreCredentialRequest>, I>>(object: I): CreateCoreCredentialRequest {
    const message = createBaseCreateCoreCredentialRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.schemaId = object.schemaId ?? "";
    message.issuerDid = object.issuerDid ?? "";
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

function createBaseCreateCoreCredentialResponse(): CreateCoreCredentialResponse {
  return { credentialReceipt: undefined, error: undefined };
}

export const CreateCoreCredentialResponse = {
  encode(message: CreateCoreCredentialResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.credentialReceipt !== undefined) {
      CredentialReceipt.encode(message.credentialReceipt, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateCoreCredentialResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateCoreCredentialResponse();
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

  fromJSON(object: any): CreateCoreCredentialResponse {
    return {
      credentialReceipt: isSet(object.credentialReceipt)
        ? CredentialReceipt.fromJSON(object.credentialReceipt)
        : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: CreateCoreCredentialResponse): unknown {
    const obj: any = {};
    if (message.credentialReceipt !== undefined) {
      obj.credentialReceipt = CredentialReceipt.toJSON(message.credentialReceipt);
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateCoreCredentialResponse>, I>>(base?: I): CreateCoreCredentialResponse {
    return CreateCoreCredentialResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateCoreCredentialResponse>, I>>(object: I): CreateCoreCredentialResponse {
    const message = createBaseCreateCoreCredentialResponse();
    message.credentialReceipt = (object.credentialReceipt !== undefined && object.credentialReceipt !== null)
      ? CredentialReceipt.fromPartial(object.credentialReceipt)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

export interface IdentityCoreService {
  CreateCoreCredential(request: CreateCoreCredentialRequest): Promise<CreateCoreCredentialResponse>;
}

export const IdentityCoreServiceServiceName = "bloock.IdentityCoreService";
export class IdentityCoreServiceClientImpl implements IdentityCoreService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || IdentityCoreServiceServiceName;
    this.rpc = rpc;
    this.CreateCoreCredential = this.CreateCoreCredential.bind(this);
  }
  CreateCoreCredential(request: CreateCoreCredentialRequest): Promise<CreateCoreCredentialResponse> {
    const data = CreateCoreCredentialRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateCoreCredential", data);
    return promise.then((data) => CreateCoreCredentialResponse.decode(_m0.Reader.create(data)));
  }
}

export type IdentityCoreServiceDefinition = typeof IdentityCoreServiceDefinition;
export const IdentityCoreServiceDefinition = {
  name: "IdentityCoreService",
  fullName: "bloock.IdentityCoreService",
  methods: {
    createCoreCredential: {
      name: "CreateCoreCredential",
      requestType: CreateCoreCredentialRequest,
      requestStream: false,
      responseType: CreateCoreCredentialResponse,
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
