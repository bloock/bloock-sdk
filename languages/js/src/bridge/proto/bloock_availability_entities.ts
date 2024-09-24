/* eslint-disable */
import _m0 from "protobufjs/minimal";

export enum DataAvailabilityType {
  HOSTED = 0,
  IPFS = 1,
  IPNS = 2,
  UNRECOGNIZED = -1,
}

export function dataAvailabilityTypeFromJSON(object: any): DataAvailabilityType {
  switch (object) {
    case 0:
    case "HOSTED":
      return DataAvailabilityType.HOSTED;
    case 1:
    case "IPFS":
      return DataAvailabilityType.IPFS;
    case 2:
    case "IPNS":
      return DataAvailabilityType.IPNS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DataAvailabilityType.UNRECOGNIZED;
  }
}

export function dataAvailabilityTypeToJSON(object: DataAvailabilityType): string {
  switch (object) {
    case DataAvailabilityType.HOSTED:
      return "HOSTED";
    case DataAvailabilityType.IPFS:
      return "IPFS";
    case DataAvailabilityType.IPNS:
      return "IPNS";
    case DataAvailabilityType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Publisher {
  type: DataAvailabilityType;
  args?: PublisherArgs | undefined;
}

export interface PublisherArgs {
  ipnsKey?: IpnsKey | undefined;
}

export interface Loader {
  type: DataAvailabilityType;
  args?: LoaderArgs | undefined;
}

export interface LoaderArgs {
  id: string;
}

export interface IpnsKey {
  keyId: string;
}

function createBasePublisher(): Publisher {
  return { type: 0, args: undefined };
}

export const Publisher = {
  encode(message: Publisher, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.args !== undefined) {
      PublisherArgs.encode(message.args, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Publisher {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublisher();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.args = PublisherArgs.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Publisher {
    return {
      type: isSet(object.type) ? dataAvailabilityTypeFromJSON(object.type) : 0,
      args: isSet(object.args) ? PublisherArgs.fromJSON(object.args) : undefined,
    };
  },

  toJSON(message: Publisher): unknown {
    const obj: any = {};
    if (message.type !== 0) {
      obj.type = dataAvailabilityTypeToJSON(message.type);
    }
    if (message.args !== undefined) {
      obj.args = PublisherArgs.toJSON(message.args);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Publisher>, I>>(base?: I): Publisher {
    return Publisher.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Publisher>, I>>(object: I): Publisher {
    const message = createBasePublisher();
    message.type = object.type ?? 0;
    message.args = (object.args !== undefined && object.args !== null)
      ? PublisherArgs.fromPartial(object.args)
      : undefined;
    return message;
  },
};

function createBasePublisherArgs(): PublisherArgs {
  return { ipnsKey: undefined };
}

export const PublisherArgs = {
  encode(message: PublisherArgs, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ipnsKey !== undefined) {
      IpnsKey.encode(message.ipnsKey, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PublisherArgs {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublisherArgs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ipnsKey = IpnsKey.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PublisherArgs {
    return { ipnsKey: isSet(object.ipnsKey) ? IpnsKey.fromJSON(object.ipnsKey) : undefined };
  },

  toJSON(message: PublisherArgs): unknown {
    const obj: any = {};
    if (message.ipnsKey !== undefined) {
      obj.ipnsKey = IpnsKey.toJSON(message.ipnsKey);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PublisherArgs>, I>>(base?: I): PublisherArgs {
    return PublisherArgs.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PublisherArgs>, I>>(object: I): PublisherArgs {
    const message = createBasePublisherArgs();
    message.ipnsKey = (object.ipnsKey !== undefined && object.ipnsKey !== null)
      ? IpnsKey.fromPartial(object.ipnsKey)
      : undefined;
    return message;
  },
};

function createBaseLoader(): Loader {
  return { type: 0, args: undefined };
}

export const Loader = {
  encode(message: Loader, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.args !== undefined) {
      LoaderArgs.encode(message.args, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Loader {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.args = LoaderArgs.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Loader {
    return {
      type: isSet(object.type) ? dataAvailabilityTypeFromJSON(object.type) : 0,
      args: isSet(object.args) ? LoaderArgs.fromJSON(object.args) : undefined,
    };
  },

  toJSON(message: Loader): unknown {
    const obj: any = {};
    if (message.type !== 0) {
      obj.type = dataAvailabilityTypeToJSON(message.type);
    }
    if (message.args !== undefined) {
      obj.args = LoaderArgs.toJSON(message.args);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Loader>, I>>(base?: I): Loader {
    return Loader.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Loader>, I>>(object: I): Loader {
    const message = createBaseLoader();
    message.type = object.type ?? 0;
    message.args = (object.args !== undefined && object.args !== null)
      ? LoaderArgs.fromPartial(object.args)
      : undefined;
    return message;
  },
};

function createBaseLoaderArgs(): LoaderArgs {
  return { id: "" };
}

export const LoaderArgs = {
  encode(message: LoaderArgs, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoaderArgs {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoaderArgs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): LoaderArgs {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: LoaderArgs): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LoaderArgs>, I>>(base?: I): LoaderArgs {
    return LoaderArgs.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LoaderArgs>, I>>(object: I): LoaderArgs {
    const message = createBaseLoaderArgs();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseIpnsKey(): IpnsKey {
  return { keyId: "" };
}

export const IpnsKey = {
  encode(message: IpnsKey, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.keyId !== "") {
      writer.uint32(10).string(message.keyId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IpnsKey {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIpnsKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.keyId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IpnsKey {
    return { keyId: isSet(object.keyId) ? globalThis.String(object.keyId) : "" };
  },

  toJSON(message: IpnsKey): unknown {
    const obj: any = {};
    if (message.keyId !== "") {
      obj.keyId = message.keyId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IpnsKey>, I>>(base?: I): IpnsKey {
    return IpnsKey.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IpnsKey>, I>>(object: I): IpnsKey {
    const message = createBaseIpnsKey();
    message.keyId = object.keyId ?? "";
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
