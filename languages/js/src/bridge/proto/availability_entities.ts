/* eslint-disable */
import _m0 from "protobufjs/minimal";

export enum DataAvailabilityType {
  HOSTED = 0,
  IPFS = 1,
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
    case DataAvailabilityType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Publisher {
  type: DataAvailabilityType;
  args?: PublisherArgs;
}

export interface PublisherArgs {
}

export interface Loader {
  type: DataAvailabilityType;
  args?: LoaderArgs;
}

export interface LoaderArgs {
  id: string;
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublisher();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.args = PublisherArgs.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
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
    message.type !== undefined && (obj.type = dataAvailabilityTypeToJSON(message.type));
    message.args !== undefined && (obj.args = message.args ? PublisherArgs.toJSON(message.args) : undefined);
    return obj;
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
  return {};
}

export const PublisherArgs = {
  encode(_: PublisherArgs, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PublisherArgs {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublisherArgs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): PublisherArgs {
    return {};
  },

  toJSON(_: PublisherArgs): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PublisherArgs>, I>>(_: I): PublisherArgs {
    const message = createBasePublisherArgs();
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.args = LoaderArgs.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
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
    message.type !== undefined && (obj.type = dataAvailabilityTypeToJSON(message.type));
    message.args !== undefined && (obj.args = message.args ? LoaderArgs.toJSON(message.args) : undefined);
    return obj;
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoaderArgs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LoaderArgs {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: LoaderArgs): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LoaderArgs>, I>>(object: I): LoaderArgs {
    const message = createBaseLoaderArgs();
    message.id = object.id ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
