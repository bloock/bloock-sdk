/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Signer } from "./authenticity_entities";
import { Loader } from "./availability_entities";
import { ConfigData } from "./config";
import { Decrypter, Encrypter } from "./encryption_entities";
import { Proof } from "./integrity_entities";
import { Record } from "./record_entities";
import { Error } from "./shared";

export interface RecordBuilderFromStringRequest {
  configData?: ConfigData;
  payload: string;
  signer?: Signer | undefined;
  encrypter?: Encrypter | undefined;
  decrypter?: Decrypter | undefined;
}

export interface RecordBuilderFromHexRequest {
  configData?: ConfigData;
  payload: string;
  signer?: Signer | undefined;
  encrypter?: Encrypter | undefined;
  decrypter?: Decrypter | undefined;
}

export interface RecordBuilderFromJSONRequest {
  configData?: ConfigData;
  payload: string;
  signer?: Signer | undefined;
  encrypter?: Encrypter | undefined;
  decrypter?: Decrypter | undefined;
}

export interface RecordBuilderFromBytesRequest {
  configData?: ConfigData;
  payload: Uint8Array;
  signer?: Signer | undefined;
  encrypter?: Encrypter | undefined;
  decrypter?: Decrypter | undefined;
}

export interface RecordBuilderFromFileRequest {
  configData?: ConfigData;
  payload: Uint8Array;
  signer?: Signer | undefined;
  encrypter?: Encrypter | undefined;
  decrypter?: Decrypter | undefined;
}

export interface RecordBuilderFromRecordRequest {
  configData?: ConfigData;
  payload?: Record;
  signer?: Signer | undefined;
  encrypter?: Encrypter | undefined;
  decrypter?: Decrypter | undefined;
}

export interface RecordBuilderResponse {
  record?: Record;
  error?: Error | undefined;
}

export interface RecordBuilderFromLoaderRequest {
  configData?: ConfigData;
  loader?: Loader;
  signer?: Signer | undefined;
  encrypter?: Encrypter | undefined;
  decrypter?: Decrypter | undefined;
}

export interface GetHashRequest {
  configData?: ConfigData;
  record?: Record;
}

export interface GetHashResponse {
  hash: string;
  error?: Error | undefined;
}

export interface SetProofRequest {
  configData?: ConfigData;
  record?: Record;
  proof?: Proof;
}

export interface SetProofResponse {
  error?: Error | undefined;
  record?: Record | undefined;
}

function createBaseRecordBuilderFromStringRequest(): RecordBuilderFromStringRequest {
  return { configData: undefined, payload: "", signer: undefined, encrypter: undefined, decrypter: undefined };
}

export const RecordBuilderFromStringRequest = {
  encode(message: RecordBuilderFromStringRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.payload !== "") {
      writer.uint32(18).string(message.payload);
    }
    if (message.signer !== undefined) {
      Signer.encode(message.signer, writer.uint32(26).fork()).ldelim();
    }
    if (message.encrypter !== undefined) {
      Encrypter.encode(message.encrypter, writer.uint32(34).fork()).ldelim();
    }
    if (message.decrypter !== undefined) {
      Decrypter.encode(message.decrypter, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordBuilderFromStringRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordBuilderFromStringRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.payload = reader.string();
          break;
        case 3:
          message.signer = Signer.decode(reader, reader.uint32());
          break;
        case 4:
          message.encrypter = Encrypter.decode(reader, reader.uint32());
          break;
        case 5:
          message.decrypter = Decrypter.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordBuilderFromStringRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      payload: isSet(object.payload) ? String(object.payload) : "",
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
      encrypter: isSet(object.encrypter) ? Encrypter.fromJSON(object.encrypter) : undefined,
      decrypter: isSet(object.decrypter) ? Decrypter.fromJSON(object.decrypter) : undefined,
    };
  },

  toJSON(message: RecordBuilderFromStringRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.payload !== undefined && (obj.payload = message.payload);
    message.signer !== undefined && (obj.signer = message.signer ? Signer.toJSON(message.signer) : undefined);
    message.encrypter !== undefined &&
      (obj.encrypter = message.encrypter ? Encrypter.toJSON(message.encrypter) : undefined);
    message.decrypter !== undefined &&
      (obj.decrypter = message.decrypter ? Decrypter.toJSON(message.decrypter) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordBuilderFromStringRequest>, I>>(
    object: I,
  ): RecordBuilderFromStringRequest {
    const message = createBaseRecordBuilderFromStringRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.payload = object.payload ?? "";
    message.signer = (object.signer !== undefined && object.signer !== null)
      ? Signer.fromPartial(object.signer)
      : undefined;
    message.encrypter = (object.encrypter !== undefined && object.encrypter !== null)
      ? Encrypter.fromPartial(object.encrypter)
      : undefined;
    message.decrypter = (object.decrypter !== undefined && object.decrypter !== null)
      ? Decrypter.fromPartial(object.decrypter)
      : undefined;
    return message;
  },
};

function createBaseRecordBuilderFromHexRequest(): RecordBuilderFromHexRequest {
  return { configData: undefined, payload: "", signer: undefined, encrypter: undefined, decrypter: undefined };
}

export const RecordBuilderFromHexRequest = {
  encode(message: RecordBuilderFromHexRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.payload !== "") {
      writer.uint32(18).string(message.payload);
    }
    if (message.signer !== undefined) {
      Signer.encode(message.signer, writer.uint32(26).fork()).ldelim();
    }
    if (message.encrypter !== undefined) {
      Encrypter.encode(message.encrypter, writer.uint32(34).fork()).ldelim();
    }
    if (message.decrypter !== undefined) {
      Decrypter.encode(message.decrypter, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordBuilderFromHexRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordBuilderFromHexRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.payload = reader.string();
          break;
        case 3:
          message.signer = Signer.decode(reader, reader.uint32());
          break;
        case 4:
          message.encrypter = Encrypter.decode(reader, reader.uint32());
          break;
        case 5:
          message.decrypter = Decrypter.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordBuilderFromHexRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      payload: isSet(object.payload) ? String(object.payload) : "",
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
      encrypter: isSet(object.encrypter) ? Encrypter.fromJSON(object.encrypter) : undefined,
      decrypter: isSet(object.decrypter) ? Decrypter.fromJSON(object.decrypter) : undefined,
    };
  },

  toJSON(message: RecordBuilderFromHexRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.payload !== undefined && (obj.payload = message.payload);
    message.signer !== undefined && (obj.signer = message.signer ? Signer.toJSON(message.signer) : undefined);
    message.encrypter !== undefined &&
      (obj.encrypter = message.encrypter ? Encrypter.toJSON(message.encrypter) : undefined);
    message.decrypter !== undefined &&
      (obj.decrypter = message.decrypter ? Decrypter.toJSON(message.decrypter) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordBuilderFromHexRequest>, I>>(object: I): RecordBuilderFromHexRequest {
    const message = createBaseRecordBuilderFromHexRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.payload = object.payload ?? "";
    message.signer = (object.signer !== undefined && object.signer !== null)
      ? Signer.fromPartial(object.signer)
      : undefined;
    message.encrypter = (object.encrypter !== undefined && object.encrypter !== null)
      ? Encrypter.fromPartial(object.encrypter)
      : undefined;
    message.decrypter = (object.decrypter !== undefined && object.decrypter !== null)
      ? Decrypter.fromPartial(object.decrypter)
      : undefined;
    return message;
  },
};

function createBaseRecordBuilderFromJSONRequest(): RecordBuilderFromJSONRequest {
  return { configData: undefined, payload: "", signer: undefined, encrypter: undefined, decrypter: undefined };
}

export const RecordBuilderFromJSONRequest = {
  encode(message: RecordBuilderFromJSONRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.payload !== "") {
      writer.uint32(18).string(message.payload);
    }
    if (message.signer !== undefined) {
      Signer.encode(message.signer, writer.uint32(26).fork()).ldelim();
    }
    if (message.encrypter !== undefined) {
      Encrypter.encode(message.encrypter, writer.uint32(34).fork()).ldelim();
    }
    if (message.decrypter !== undefined) {
      Decrypter.encode(message.decrypter, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordBuilderFromJSONRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordBuilderFromJSONRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.payload = reader.string();
          break;
        case 3:
          message.signer = Signer.decode(reader, reader.uint32());
          break;
        case 4:
          message.encrypter = Encrypter.decode(reader, reader.uint32());
          break;
        case 5:
          message.decrypter = Decrypter.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordBuilderFromJSONRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      payload: isSet(object.payload) ? String(object.payload) : "",
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
      encrypter: isSet(object.encrypter) ? Encrypter.fromJSON(object.encrypter) : undefined,
      decrypter: isSet(object.decrypter) ? Decrypter.fromJSON(object.decrypter) : undefined,
    };
  },

  toJSON(message: RecordBuilderFromJSONRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.payload !== undefined && (obj.payload = message.payload);
    message.signer !== undefined && (obj.signer = message.signer ? Signer.toJSON(message.signer) : undefined);
    message.encrypter !== undefined &&
      (obj.encrypter = message.encrypter ? Encrypter.toJSON(message.encrypter) : undefined);
    message.decrypter !== undefined &&
      (obj.decrypter = message.decrypter ? Decrypter.toJSON(message.decrypter) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordBuilderFromJSONRequest>, I>>(object: I): RecordBuilderFromJSONRequest {
    const message = createBaseRecordBuilderFromJSONRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.payload = object.payload ?? "";
    message.signer = (object.signer !== undefined && object.signer !== null)
      ? Signer.fromPartial(object.signer)
      : undefined;
    message.encrypter = (object.encrypter !== undefined && object.encrypter !== null)
      ? Encrypter.fromPartial(object.encrypter)
      : undefined;
    message.decrypter = (object.decrypter !== undefined && object.decrypter !== null)
      ? Decrypter.fromPartial(object.decrypter)
      : undefined;
    return message;
  },
};

function createBaseRecordBuilderFromBytesRequest(): RecordBuilderFromBytesRequest {
  return {
    configData: undefined,
    payload: new Uint8Array(),
    signer: undefined,
    encrypter: undefined,
    decrypter: undefined,
  };
}

export const RecordBuilderFromBytesRequest = {
  encode(message: RecordBuilderFromBytesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.payload.length !== 0) {
      writer.uint32(18).bytes(message.payload);
    }
    if (message.signer !== undefined) {
      Signer.encode(message.signer, writer.uint32(26).fork()).ldelim();
    }
    if (message.encrypter !== undefined) {
      Encrypter.encode(message.encrypter, writer.uint32(34).fork()).ldelim();
    }
    if (message.decrypter !== undefined) {
      Decrypter.encode(message.decrypter, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordBuilderFromBytesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordBuilderFromBytesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.payload = reader.bytes();
          break;
        case 3:
          message.signer = Signer.decode(reader, reader.uint32());
          break;
        case 4:
          message.encrypter = Encrypter.decode(reader, reader.uint32());
          break;
        case 5:
          message.decrypter = Decrypter.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordBuilderFromBytesRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      payload: isSet(object.payload) ? bytesFromBase64(object.payload) : new Uint8Array(),
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
      encrypter: isSet(object.encrypter) ? Encrypter.fromJSON(object.encrypter) : undefined,
      decrypter: isSet(object.decrypter) ? Decrypter.fromJSON(object.decrypter) : undefined,
    };
  },

  toJSON(message: RecordBuilderFromBytesRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.payload !== undefined &&
      (obj.payload = base64FromBytes(message.payload !== undefined ? message.payload : new Uint8Array()));
    message.signer !== undefined && (obj.signer = message.signer ? Signer.toJSON(message.signer) : undefined);
    message.encrypter !== undefined &&
      (obj.encrypter = message.encrypter ? Encrypter.toJSON(message.encrypter) : undefined);
    message.decrypter !== undefined &&
      (obj.decrypter = message.decrypter ? Decrypter.toJSON(message.decrypter) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordBuilderFromBytesRequest>, I>>(
    object: I,
  ): RecordBuilderFromBytesRequest {
    const message = createBaseRecordBuilderFromBytesRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.payload = object.payload ?? new Uint8Array();
    message.signer = (object.signer !== undefined && object.signer !== null)
      ? Signer.fromPartial(object.signer)
      : undefined;
    message.encrypter = (object.encrypter !== undefined && object.encrypter !== null)
      ? Encrypter.fromPartial(object.encrypter)
      : undefined;
    message.decrypter = (object.decrypter !== undefined && object.decrypter !== null)
      ? Decrypter.fromPartial(object.decrypter)
      : undefined;
    return message;
  },
};

function createBaseRecordBuilderFromFileRequest(): RecordBuilderFromFileRequest {
  return {
    configData: undefined,
    payload: new Uint8Array(),
    signer: undefined,
    encrypter: undefined,
    decrypter: undefined,
  };
}

export const RecordBuilderFromFileRequest = {
  encode(message: RecordBuilderFromFileRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.payload.length !== 0) {
      writer.uint32(18).bytes(message.payload);
    }
    if (message.signer !== undefined) {
      Signer.encode(message.signer, writer.uint32(26).fork()).ldelim();
    }
    if (message.encrypter !== undefined) {
      Encrypter.encode(message.encrypter, writer.uint32(34).fork()).ldelim();
    }
    if (message.decrypter !== undefined) {
      Decrypter.encode(message.decrypter, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordBuilderFromFileRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordBuilderFromFileRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.payload = reader.bytes();
          break;
        case 3:
          message.signer = Signer.decode(reader, reader.uint32());
          break;
        case 4:
          message.encrypter = Encrypter.decode(reader, reader.uint32());
          break;
        case 5:
          message.decrypter = Decrypter.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordBuilderFromFileRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      payload: isSet(object.payload) ? bytesFromBase64(object.payload) : new Uint8Array(),
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
      encrypter: isSet(object.encrypter) ? Encrypter.fromJSON(object.encrypter) : undefined,
      decrypter: isSet(object.decrypter) ? Decrypter.fromJSON(object.decrypter) : undefined,
    };
  },

  toJSON(message: RecordBuilderFromFileRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.payload !== undefined &&
      (obj.payload = base64FromBytes(message.payload !== undefined ? message.payload : new Uint8Array()));
    message.signer !== undefined && (obj.signer = message.signer ? Signer.toJSON(message.signer) : undefined);
    message.encrypter !== undefined &&
      (obj.encrypter = message.encrypter ? Encrypter.toJSON(message.encrypter) : undefined);
    message.decrypter !== undefined &&
      (obj.decrypter = message.decrypter ? Decrypter.toJSON(message.decrypter) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordBuilderFromFileRequest>, I>>(object: I): RecordBuilderFromFileRequest {
    const message = createBaseRecordBuilderFromFileRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.payload = object.payload ?? new Uint8Array();
    message.signer = (object.signer !== undefined && object.signer !== null)
      ? Signer.fromPartial(object.signer)
      : undefined;
    message.encrypter = (object.encrypter !== undefined && object.encrypter !== null)
      ? Encrypter.fromPartial(object.encrypter)
      : undefined;
    message.decrypter = (object.decrypter !== undefined && object.decrypter !== null)
      ? Decrypter.fromPartial(object.decrypter)
      : undefined;
    return message;
  },
};

function createBaseRecordBuilderFromRecordRequest(): RecordBuilderFromRecordRequest {
  return { configData: undefined, payload: undefined, signer: undefined, encrypter: undefined, decrypter: undefined };
}

export const RecordBuilderFromRecordRequest = {
  encode(message: RecordBuilderFromRecordRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.payload !== undefined) {
      Record.encode(message.payload, writer.uint32(18).fork()).ldelim();
    }
    if (message.signer !== undefined) {
      Signer.encode(message.signer, writer.uint32(26).fork()).ldelim();
    }
    if (message.encrypter !== undefined) {
      Encrypter.encode(message.encrypter, writer.uint32(34).fork()).ldelim();
    }
    if (message.decrypter !== undefined) {
      Decrypter.encode(message.decrypter, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordBuilderFromRecordRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordBuilderFromRecordRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.payload = Record.decode(reader, reader.uint32());
          break;
        case 3:
          message.signer = Signer.decode(reader, reader.uint32());
          break;
        case 4:
          message.encrypter = Encrypter.decode(reader, reader.uint32());
          break;
        case 5:
          message.decrypter = Decrypter.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordBuilderFromRecordRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      payload: isSet(object.payload) ? Record.fromJSON(object.payload) : undefined,
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
      encrypter: isSet(object.encrypter) ? Encrypter.fromJSON(object.encrypter) : undefined,
      decrypter: isSet(object.decrypter) ? Decrypter.fromJSON(object.decrypter) : undefined,
    };
  },

  toJSON(message: RecordBuilderFromRecordRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.payload !== undefined && (obj.payload = message.payload ? Record.toJSON(message.payload) : undefined);
    message.signer !== undefined && (obj.signer = message.signer ? Signer.toJSON(message.signer) : undefined);
    message.encrypter !== undefined &&
      (obj.encrypter = message.encrypter ? Encrypter.toJSON(message.encrypter) : undefined);
    message.decrypter !== undefined &&
      (obj.decrypter = message.decrypter ? Decrypter.toJSON(message.decrypter) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordBuilderFromRecordRequest>, I>>(
    object: I,
  ): RecordBuilderFromRecordRequest {
    const message = createBaseRecordBuilderFromRecordRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.payload = (object.payload !== undefined && object.payload !== null)
      ? Record.fromPartial(object.payload)
      : undefined;
    message.signer = (object.signer !== undefined && object.signer !== null)
      ? Signer.fromPartial(object.signer)
      : undefined;
    message.encrypter = (object.encrypter !== undefined && object.encrypter !== null)
      ? Encrypter.fromPartial(object.encrypter)
      : undefined;
    message.decrypter = (object.decrypter !== undefined && object.decrypter !== null)
      ? Decrypter.fromPartial(object.decrypter)
      : undefined;
    return message;
  },
};

function createBaseRecordBuilderResponse(): RecordBuilderResponse {
  return { record: undefined, error: undefined };
}

export const RecordBuilderResponse = {
  encode(message: RecordBuilderResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.record !== undefined) {
      Record.encode(message.record, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordBuilderResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordBuilderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.record = Record.decode(reader, reader.uint32());
          break;
        case 2:
          message.error = Error.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordBuilderResponse {
    return {
      record: isSet(object.record) ? Record.fromJSON(object.record) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: RecordBuilderResponse): unknown {
    const obj: any = {};
    message.record !== undefined && (obj.record = message.record ? Record.toJSON(message.record) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordBuilderResponse>, I>>(object: I): RecordBuilderResponse {
    const message = createBaseRecordBuilderResponse();
    message.record = (object.record !== undefined && object.record !== null)
      ? Record.fromPartial(object.record)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseRecordBuilderFromLoaderRequest(): RecordBuilderFromLoaderRequest {
  return { configData: undefined, loader: undefined, signer: undefined, encrypter: undefined, decrypter: undefined };
}

export const RecordBuilderFromLoaderRequest = {
  encode(message: RecordBuilderFromLoaderRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.loader !== undefined) {
      Loader.encode(message.loader, writer.uint32(18).fork()).ldelim();
    }
    if (message.signer !== undefined) {
      Signer.encode(message.signer, writer.uint32(26).fork()).ldelim();
    }
    if (message.encrypter !== undefined) {
      Encrypter.encode(message.encrypter, writer.uint32(34).fork()).ldelim();
    }
    if (message.decrypter !== undefined) {
      Decrypter.encode(message.decrypter, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordBuilderFromLoaderRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordBuilderFromLoaderRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.loader = Loader.decode(reader, reader.uint32());
          break;
        case 3:
          message.signer = Signer.decode(reader, reader.uint32());
          break;
        case 4:
          message.encrypter = Encrypter.decode(reader, reader.uint32());
          break;
        case 5:
          message.decrypter = Decrypter.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordBuilderFromLoaderRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      loader: isSet(object.loader) ? Loader.fromJSON(object.loader) : undefined,
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
      encrypter: isSet(object.encrypter) ? Encrypter.fromJSON(object.encrypter) : undefined,
      decrypter: isSet(object.decrypter) ? Decrypter.fromJSON(object.decrypter) : undefined,
    };
  },

  toJSON(message: RecordBuilderFromLoaderRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.loader !== undefined && (obj.loader = message.loader ? Loader.toJSON(message.loader) : undefined);
    message.signer !== undefined && (obj.signer = message.signer ? Signer.toJSON(message.signer) : undefined);
    message.encrypter !== undefined &&
      (obj.encrypter = message.encrypter ? Encrypter.toJSON(message.encrypter) : undefined);
    message.decrypter !== undefined &&
      (obj.decrypter = message.decrypter ? Decrypter.toJSON(message.decrypter) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordBuilderFromLoaderRequest>, I>>(
    object: I,
  ): RecordBuilderFromLoaderRequest {
    const message = createBaseRecordBuilderFromLoaderRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.loader = (object.loader !== undefined && object.loader !== null)
      ? Loader.fromPartial(object.loader)
      : undefined;
    message.signer = (object.signer !== undefined && object.signer !== null)
      ? Signer.fromPartial(object.signer)
      : undefined;
    message.encrypter = (object.encrypter !== undefined && object.encrypter !== null)
      ? Encrypter.fromPartial(object.encrypter)
      : undefined;
    message.decrypter = (object.decrypter !== undefined && object.decrypter !== null)
      ? Decrypter.fromPartial(object.decrypter)
      : undefined;
    return message;
  },
};

function createBaseGetHashRequest(): GetHashRequest {
  return { configData: undefined, record: undefined };
}

export const GetHashRequest = {
  encode(message: GetHashRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.record !== undefined) {
      Record.encode(message.record, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetHashRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetHashRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.record = Record.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetHashRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      record: isSet(object.record) ? Record.fromJSON(object.record) : undefined,
    };
  },

  toJSON(message: GetHashRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.record !== undefined && (obj.record = message.record ? Record.toJSON(message.record) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetHashRequest>, I>>(object: I): GetHashRequest {
    const message = createBaseGetHashRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.record = (object.record !== undefined && object.record !== null)
      ? Record.fromPartial(object.record)
      : undefined;
    return message;
  },
};

function createBaseGetHashResponse(): GetHashResponse {
  return { hash: "", error: undefined };
}

export const GetHashResponse = {
  encode(message: GetHashResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hash !== "") {
      writer.uint32(10).string(message.hash);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetHashResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetHashResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.string();
          break;
        case 2:
          message.error = Error.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetHashResponse {
    return {
      hash: isSet(object.hash) ? String(object.hash) : "",
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GetHashResponse): unknown {
    const obj: any = {};
    message.hash !== undefined && (obj.hash = message.hash);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetHashResponse>, I>>(object: I): GetHashResponse {
    const message = createBaseGetHashResponse();
    message.hash = object.hash ?? "";
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseSetProofRequest(): SetProofRequest {
  return { configData: undefined, record: undefined, proof: undefined };
}

export const SetProofRequest = {
  encode(message: SetProofRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.record !== undefined) {
      Record.encode(message.record, writer.uint32(18).fork()).ldelim();
    }
    if (message.proof !== undefined) {
      Proof.encode(message.proof, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetProofRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetProofRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.record = Record.decode(reader, reader.uint32());
          break;
        case 3:
          message.proof = Proof.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetProofRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      record: isSet(object.record) ? Record.fromJSON(object.record) : undefined,
      proof: isSet(object.proof) ? Proof.fromJSON(object.proof) : undefined,
    };
  },

  toJSON(message: SetProofRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.record !== undefined && (obj.record = message.record ? Record.toJSON(message.record) : undefined);
    message.proof !== undefined && (obj.proof = message.proof ? Proof.toJSON(message.proof) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetProofRequest>, I>>(object: I): SetProofRequest {
    const message = createBaseSetProofRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.record = (object.record !== undefined && object.record !== null)
      ? Record.fromPartial(object.record)
      : undefined;
    message.proof = (object.proof !== undefined && object.proof !== null) ? Proof.fromPartial(object.proof) : undefined;
    return message;
  },
};

function createBaseSetProofResponse(): SetProofResponse {
  return { error: undefined, record: undefined };
}

export const SetProofResponse = {
  encode(message: SetProofResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.record !== undefined) {
      Record.encode(message.record, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetProofResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetProofResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.error = Error.decode(reader, reader.uint32());
          break;
        case 2:
          message.record = Record.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetProofResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      record: isSet(object.record) ? Record.fromJSON(object.record) : undefined,
    };
  },

  toJSON(message: SetProofResponse): unknown {
    const obj: any = {};
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    message.record !== undefined && (obj.record = message.record ? Record.toJSON(message.record) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetProofResponse>, I>>(object: I): SetProofResponse {
    const message = createBaseSetProofResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.record = (object.record !== undefined && object.record !== null)
      ? Record.fromPartial(object.record)
      : undefined;
    return message;
  },
};

export interface RecordService {
  BuildRecordFromString(request: RecordBuilderFromStringRequest): Promise<RecordBuilderResponse>;
  BuildRecordFromHex(request: RecordBuilderFromHexRequest): Promise<RecordBuilderResponse>;
  BuildRecordFromJson(request: RecordBuilderFromJSONRequest): Promise<RecordBuilderResponse>;
  BuildRecordFromFile(request: RecordBuilderFromFileRequest): Promise<RecordBuilderResponse>;
  BuildRecordFromBytes(request: RecordBuilderFromBytesRequest): Promise<RecordBuilderResponse>;
  BuildRecordFromRecord(request: RecordBuilderFromRecordRequest): Promise<RecordBuilderResponse>;
  BuildRecordFromLoader(request: RecordBuilderFromLoaderRequest): Promise<RecordBuilderResponse>;
  GetHash(request: GetHashRequest): Promise<GetHashResponse>;
  SetProof(request: SetProofRequest): Promise<SetProofResponse>;
}

export class RecordServiceClientImpl implements RecordService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.BuildRecordFromString = this.BuildRecordFromString.bind(this);
    this.BuildRecordFromHex = this.BuildRecordFromHex.bind(this);
    this.BuildRecordFromJson = this.BuildRecordFromJson.bind(this);
    this.BuildRecordFromFile = this.BuildRecordFromFile.bind(this);
    this.BuildRecordFromBytes = this.BuildRecordFromBytes.bind(this);
    this.BuildRecordFromRecord = this.BuildRecordFromRecord.bind(this);
    this.BuildRecordFromLoader = this.BuildRecordFromLoader.bind(this);
    this.GetHash = this.GetHash.bind(this);
    this.SetProof = this.SetProof.bind(this);
  }
  BuildRecordFromString(request: RecordBuilderFromStringRequest): Promise<RecordBuilderResponse> {
    const data = RecordBuilderFromStringRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.RecordService", "BuildRecordFromString", data);
    return promise.then((data) => RecordBuilderResponse.decode(new _m0.Reader(data)));
  }

  BuildRecordFromHex(request: RecordBuilderFromHexRequest): Promise<RecordBuilderResponse> {
    const data = RecordBuilderFromHexRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.RecordService", "BuildRecordFromHex", data);
    return promise.then((data) => RecordBuilderResponse.decode(new _m0.Reader(data)));
  }

  BuildRecordFromJson(request: RecordBuilderFromJSONRequest): Promise<RecordBuilderResponse> {
    const data = RecordBuilderFromJSONRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.RecordService", "BuildRecordFromJson", data);
    return promise.then((data) => RecordBuilderResponse.decode(new _m0.Reader(data)));
  }

  BuildRecordFromFile(request: RecordBuilderFromFileRequest): Promise<RecordBuilderResponse> {
    const data = RecordBuilderFromFileRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.RecordService", "BuildRecordFromFile", data);
    return promise.then((data) => RecordBuilderResponse.decode(new _m0.Reader(data)));
  }

  BuildRecordFromBytes(request: RecordBuilderFromBytesRequest): Promise<RecordBuilderResponse> {
    const data = RecordBuilderFromBytesRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.RecordService", "BuildRecordFromBytes", data);
    return promise.then((data) => RecordBuilderResponse.decode(new _m0.Reader(data)));
  }

  BuildRecordFromRecord(request: RecordBuilderFromRecordRequest): Promise<RecordBuilderResponse> {
    const data = RecordBuilderFromRecordRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.RecordService", "BuildRecordFromRecord", data);
    return promise.then((data) => RecordBuilderResponse.decode(new _m0.Reader(data)));
  }

  BuildRecordFromLoader(request: RecordBuilderFromLoaderRequest): Promise<RecordBuilderResponse> {
    const data = RecordBuilderFromLoaderRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.RecordService", "BuildRecordFromLoader", data);
    return promise.then((data) => RecordBuilderResponse.decode(new _m0.Reader(data)));
  }

  GetHash(request: GetHashRequest): Promise<GetHashResponse> {
    const data = GetHashRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.RecordService", "GetHash", data);
    return promise.then((data) => GetHashResponse.decode(new _m0.Reader(data)));
  }

  SetProof(request: SetProofRequest): Promise<SetProofResponse> {
    const data = SetProofRequest.encode(request).finish();
    const promise = this.rpc.request("bloock.RecordService", "SetProof", data);
    return promise.then((data) => SetProofResponse.decode(new _m0.Reader(data)));
  }
}

export type RecordServiceDefinition = typeof RecordServiceDefinition;
export const RecordServiceDefinition = {
  name: "RecordService",
  fullName: "bloock.RecordService",
  methods: {
    buildRecordFromString: {
      name: "BuildRecordFromString",
      requestType: RecordBuilderFromStringRequest,
      requestStream: false,
      responseType: RecordBuilderResponse,
      responseStream: false,
      options: {},
    },
    buildRecordFromHex: {
      name: "BuildRecordFromHex",
      requestType: RecordBuilderFromHexRequest,
      requestStream: false,
      responseType: RecordBuilderResponse,
      responseStream: false,
      options: {},
    },
    buildRecordFromJson: {
      name: "BuildRecordFromJson",
      requestType: RecordBuilderFromJSONRequest,
      requestStream: false,
      responseType: RecordBuilderResponse,
      responseStream: false,
      options: {},
    },
    buildRecordFromFile: {
      name: "BuildRecordFromFile",
      requestType: RecordBuilderFromFileRequest,
      requestStream: false,
      responseType: RecordBuilderResponse,
      responseStream: false,
      options: {},
    },
    buildRecordFromBytes: {
      name: "BuildRecordFromBytes",
      requestType: RecordBuilderFromBytesRequest,
      requestStream: false,
      responseType: RecordBuilderResponse,
      responseStream: false,
      options: {},
    },
    buildRecordFromRecord: {
      name: "BuildRecordFromRecord",
      requestType: RecordBuilderFromRecordRequest,
      requestStream: false,
      responseType: RecordBuilderResponse,
      responseStream: false,
      options: {},
    },
    buildRecordFromLoader: {
      name: "BuildRecordFromLoader",
      requestType: RecordBuilderFromLoaderRequest,
      requestStream: false,
      responseType: RecordBuilderResponse,
      responseStream: false,
      options: {},
    },
    getHash: {
      name: "GetHash",
      requestType: GetHashRequest,
      requestStream: false,
      responseType: GetHashResponse,
      responseStream: false,
      options: {},
    },
    setProof: {
      name: "SetProof",
      requestType: SetProofRequest,
      requestStream: false,
      responseType: SetProofResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
