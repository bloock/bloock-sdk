/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Signer } from "./bloock_authenticity_entities";
import { Loader } from "./bloock_availability_entities";
import { ConfigData } from "./bloock_config";
import { Encrypter } from "./bloock_encryption_entities";
import { Proof } from "./bloock_integrity_entities";
import { Record, RecordDetails } from "./bloock_record_entities";
import { Error } from "./bloock_shared";

export interface RecordBuilderFromStringRequest {
  configData?: ConfigData | undefined;
  payload: string;
  signer?: Signer | undefined;
  encrypter?: Encrypter | undefined;
  decrypter?: Encrypter | undefined;
}

export interface RecordBuilderFromHexRequest {
  configData?: ConfigData | undefined;
  payload: string;
  signer?: Signer | undefined;
  encrypter?: Encrypter | undefined;
  decrypter?: Encrypter | undefined;
}

export interface RecordBuilderFromJSONRequest {
  configData?: ConfigData | undefined;
  payload: string;
  signer?: Signer | undefined;
  encrypter?: Encrypter | undefined;
  decrypter?: Encrypter | undefined;
}

export interface RecordBuilderFromBytesRequest {
  configData?: ConfigData | undefined;
  payload: Uint8Array;
  signer?: Signer | undefined;
  encrypter?: Encrypter | undefined;
  decrypter?: Encrypter | undefined;
}

export interface RecordBuilderFromFileRequest {
  configData?: ConfigData | undefined;
  payload: Uint8Array;
  signer?: Signer | undefined;
  encrypter?: Encrypter | undefined;
  decrypter?: Encrypter | undefined;
}

export interface RecordBuilderFromRecordRequest {
  configData?: ConfigData | undefined;
  payload?: Record | undefined;
  signer?: Signer | undefined;
  encrypter?: Encrypter | undefined;
  decrypter?: Encrypter | undefined;
}

export interface RecordBuilderResponse {
  record?: Record | undefined;
  error?: Error | undefined;
}

export interface RecordBuilderFromLoaderRequest {
  configData?: ConfigData | undefined;
  loader?: Loader | undefined;
  signer?: Signer | undefined;
  encrypter?: Encrypter | undefined;
  decrypter?: Encrypter | undefined;
}

export interface GetDetailsRequest {
  configData?: ConfigData | undefined;
  payload: Uint8Array;
}

export interface GetDetailsResponse {
  details?: RecordDetails | undefined;
  error?: Error | undefined;
}

export interface GetHashRequest {
  configData?: ConfigData | undefined;
  record?: Record | undefined;
}

export interface GetHashResponse {
  hash: string;
  error?: Error | undefined;
}

export interface GetPayloadRequest {
  configData?: ConfigData | undefined;
  record?: Record | undefined;
}

export interface GetPayloadResponse {
  payload: Uint8Array;
  error?: Error | undefined;
}

export interface SetProofRequest {
  configData?: ConfigData | undefined;
  record?: Record | undefined;
  proof?: Proof | undefined;
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
      Encrypter.encode(message.decrypter, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordBuilderFromStringRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordBuilderFromStringRequest();
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

          message.payload = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.signer = Signer.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.encrypter = Encrypter.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.decrypter = Encrypter.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RecordBuilderFromStringRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      payload: isSet(object.payload) ? globalThis.String(object.payload) : "",
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
      encrypter: isSet(object.encrypter) ? Encrypter.fromJSON(object.encrypter) : undefined,
      decrypter: isSet(object.decrypter) ? Encrypter.fromJSON(object.decrypter) : undefined,
    };
  },

  toJSON(message: RecordBuilderFromStringRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.payload !== "") {
      obj.payload = message.payload;
    }
    if (message.signer !== undefined) {
      obj.signer = Signer.toJSON(message.signer);
    }
    if (message.encrypter !== undefined) {
      obj.encrypter = Encrypter.toJSON(message.encrypter);
    }
    if (message.decrypter !== undefined) {
      obj.decrypter = Encrypter.toJSON(message.decrypter);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RecordBuilderFromStringRequest>, I>>(base?: I): RecordBuilderFromStringRequest {
    return RecordBuilderFromStringRequest.fromPartial(base ?? ({} as any));
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
      ? Encrypter.fromPartial(object.decrypter)
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
      Encrypter.encode(message.decrypter, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordBuilderFromHexRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordBuilderFromHexRequest();
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

          message.payload = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.signer = Signer.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.encrypter = Encrypter.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.decrypter = Encrypter.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RecordBuilderFromHexRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      payload: isSet(object.payload) ? globalThis.String(object.payload) : "",
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
      encrypter: isSet(object.encrypter) ? Encrypter.fromJSON(object.encrypter) : undefined,
      decrypter: isSet(object.decrypter) ? Encrypter.fromJSON(object.decrypter) : undefined,
    };
  },

  toJSON(message: RecordBuilderFromHexRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.payload !== "") {
      obj.payload = message.payload;
    }
    if (message.signer !== undefined) {
      obj.signer = Signer.toJSON(message.signer);
    }
    if (message.encrypter !== undefined) {
      obj.encrypter = Encrypter.toJSON(message.encrypter);
    }
    if (message.decrypter !== undefined) {
      obj.decrypter = Encrypter.toJSON(message.decrypter);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RecordBuilderFromHexRequest>, I>>(base?: I): RecordBuilderFromHexRequest {
    return RecordBuilderFromHexRequest.fromPartial(base ?? ({} as any));
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
      ? Encrypter.fromPartial(object.decrypter)
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
      Encrypter.encode(message.decrypter, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordBuilderFromJSONRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordBuilderFromJSONRequest();
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

          message.payload = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.signer = Signer.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.encrypter = Encrypter.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.decrypter = Encrypter.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RecordBuilderFromJSONRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      payload: isSet(object.payload) ? globalThis.String(object.payload) : "",
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
      encrypter: isSet(object.encrypter) ? Encrypter.fromJSON(object.encrypter) : undefined,
      decrypter: isSet(object.decrypter) ? Encrypter.fromJSON(object.decrypter) : undefined,
    };
  },

  toJSON(message: RecordBuilderFromJSONRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.payload !== "") {
      obj.payload = message.payload;
    }
    if (message.signer !== undefined) {
      obj.signer = Signer.toJSON(message.signer);
    }
    if (message.encrypter !== undefined) {
      obj.encrypter = Encrypter.toJSON(message.encrypter);
    }
    if (message.decrypter !== undefined) {
      obj.decrypter = Encrypter.toJSON(message.decrypter);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RecordBuilderFromJSONRequest>, I>>(base?: I): RecordBuilderFromJSONRequest {
    return RecordBuilderFromJSONRequest.fromPartial(base ?? ({} as any));
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
      ? Encrypter.fromPartial(object.decrypter)
      : undefined;
    return message;
  },
};

function createBaseRecordBuilderFromBytesRequest(): RecordBuilderFromBytesRequest {
  return {
    configData: undefined,
    payload: new Uint8Array(0),
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
      Encrypter.encode(message.decrypter, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordBuilderFromBytesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordBuilderFromBytesRequest();
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

          message.payload = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.signer = Signer.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.encrypter = Encrypter.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.decrypter = Encrypter.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RecordBuilderFromBytesRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      payload: isSet(object.payload) ? bytesFromBase64(object.payload) : new Uint8Array(0),
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
      encrypter: isSet(object.encrypter) ? Encrypter.fromJSON(object.encrypter) : undefined,
      decrypter: isSet(object.decrypter) ? Encrypter.fromJSON(object.decrypter) : undefined,
    };
  },

  toJSON(message: RecordBuilderFromBytesRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.payload.length !== 0) {
      obj.payload = base64FromBytes(message.payload);
    }
    if (message.signer !== undefined) {
      obj.signer = Signer.toJSON(message.signer);
    }
    if (message.encrypter !== undefined) {
      obj.encrypter = Encrypter.toJSON(message.encrypter);
    }
    if (message.decrypter !== undefined) {
      obj.decrypter = Encrypter.toJSON(message.decrypter);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RecordBuilderFromBytesRequest>, I>>(base?: I): RecordBuilderFromBytesRequest {
    return RecordBuilderFromBytesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RecordBuilderFromBytesRequest>, I>>(
    object: I,
  ): RecordBuilderFromBytesRequest {
    const message = createBaseRecordBuilderFromBytesRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.payload = object.payload ?? new Uint8Array(0);
    message.signer = (object.signer !== undefined && object.signer !== null)
      ? Signer.fromPartial(object.signer)
      : undefined;
    message.encrypter = (object.encrypter !== undefined && object.encrypter !== null)
      ? Encrypter.fromPartial(object.encrypter)
      : undefined;
    message.decrypter = (object.decrypter !== undefined && object.decrypter !== null)
      ? Encrypter.fromPartial(object.decrypter)
      : undefined;
    return message;
  },
};

function createBaseRecordBuilderFromFileRequest(): RecordBuilderFromFileRequest {
  return {
    configData: undefined,
    payload: new Uint8Array(0),
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
      Encrypter.encode(message.decrypter, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordBuilderFromFileRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordBuilderFromFileRequest();
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

          message.payload = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.signer = Signer.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.encrypter = Encrypter.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.decrypter = Encrypter.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RecordBuilderFromFileRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      payload: isSet(object.payload) ? bytesFromBase64(object.payload) : new Uint8Array(0),
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
      encrypter: isSet(object.encrypter) ? Encrypter.fromJSON(object.encrypter) : undefined,
      decrypter: isSet(object.decrypter) ? Encrypter.fromJSON(object.decrypter) : undefined,
    };
  },

  toJSON(message: RecordBuilderFromFileRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.payload.length !== 0) {
      obj.payload = base64FromBytes(message.payload);
    }
    if (message.signer !== undefined) {
      obj.signer = Signer.toJSON(message.signer);
    }
    if (message.encrypter !== undefined) {
      obj.encrypter = Encrypter.toJSON(message.encrypter);
    }
    if (message.decrypter !== undefined) {
      obj.decrypter = Encrypter.toJSON(message.decrypter);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RecordBuilderFromFileRequest>, I>>(base?: I): RecordBuilderFromFileRequest {
    return RecordBuilderFromFileRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RecordBuilderFromFileRequest>, I>>(object: I): RecordBuilderFromFileRequest {
    const message = createBaseRecordBuilderFromFileRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.payload = object.payload ?? new Uint8Array(0);
    message.signer = (object.signer !== undefined && object.signer !== null)
      ? Signer.fromPartial(object.signer)
      : undefined;
    message.encrypter = (object.encrypter !== undefined && object.encrypter !== null)
      ? Encrypter.fromPartial(object.encrypter)
      : undefined;
    message.decrypter = (object.decrypter !== undefined && object.decrypter !== null)
      ? Encrypter.fromPartial(object.decrypter)
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
      Encrypter.encode(message.decrypter, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordBuilderFromRecordRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordBuilderFromRecordRequest();
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

          message.payload = Record.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.signer = Signer.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.encrypter = Encrypter.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.decrypter = Encrypter.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RecordBuilderFromRecordRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      payload: isSet(object.payload) ? Record.fromJSON(object.payload) : undefined,
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
      encrypter: isSet(object.encrypter) ? Encrypter.fromJSON(object.encrypter) : undefined,
      decrypter: isSet(object.decrypter) ? Encrypter.fromJSON(object.decrypter) : undefined,
    };
  },

  toJSON(message: RecordBuilderFromRecordRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.payload !== undefined) {
      obj.payload = Record.toJSON(message.payload);
    }
    if (message.signer !== undefined) {
      obj.signer = Signer.toJSON(message.signer);
    }
    if (message.encrypter !== undefined) {
      obj.encrypter = Encrypter.toJSON(message.encrypter);
    }
    if (message.decrypter !== undefined) {
      obj.decrypter = Encrypter.toJSON(message.decrypter);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RecordBuilderFromRecordRequest>, I>>(base?: I): RecordBuilderFromRecordRequest {
    return RecordBuilderFromRecordRequest.fromPartial(base ?? ({} as any));
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
      ? Encrypter.fromPartial(object.decrypter)
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordBuilderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.record = Record.decode(reader, reader.uint32());
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

  fromJSON(object: any): RecordBuilderResponse {
    return {
      record: isSet(object.record) ? Record.fromJSON(object.record) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: RecordBuilderResponse): unknown {
    const obj: any = {};
    if (message.record !== undefined) {
      obj.record = Record.toJSON(message.record);
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RecordBuilderResponse>, I>>(base?: I): RecordBuilderResponse {
    return RecordBuilderResponse.fromPartial(base ?? ({} as any));
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
      Encrypter.encode(message.decrypter, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordBuilderFromLoaderRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordBuilderFromLoaderRequest();
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

          message.loader = Loader.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.signer = Signer.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.encrypter = Encrypter.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.decrypter = Encrypter.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RecordBuilderFromLoaderRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      loader: isSet(object.loader) ? Loader.fromJSON(object.loader) : undefined,
      signer: isSet(object.signer) ? Signer.fromJSON(object.signer) : undefined,
      encrypter: isSet(object.encrypter) ? Encrypter.fromJSON(object.encrypter) : undefined,
      decrypter: isSet(object.decrypter) ? Encrypter.fromJSON(object.decrypter) : undefined,
    };
  },

  toJSON(message: RecordBuilderFromLoaderRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.loader !== undefined) {
      obj.loader = Loader.toJSON(message.loader);
    }
    if (message.signer !== undefined) {
      obj.signer = Signer.toJSON(message.signer);
    }
    if (message.encrypter !== undefined) {
      obj.encrypter = Encrypter.toJSON(message.encrypter);
    }
    if (message.decrypter !== undefined) {
      obj.decrypter = Encrypter.toJSON(message.decrypter);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RecordBuilderFromLoaderRequest>, I>>(base?: I): RecordBuilderFromLoaderRequest {
    return RecordBuilderFromLoaderRequest.fromPartial(base ?? ({} as any));
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
      ? Encrypter.fromPartial(object.decrypter)
      : undefined;
    return message;
  },
};

function createBaseGetDetailsRequest(): GetDetailsRequest {
  return { configData: undefined, payload: new Uint8Array(0) };
}

export const GetDetailsRequest = {
  encode(message: GetDetailsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.payload.length !== 0) {
      writer.uint32(18).bytes(message.payload);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetDetailsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDetailsRequest();
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

          message.payload = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetDetailsRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      payload: isSet(object.payload) ? bytesFromBase64(object.payload) : new Uint8Array(0),
    };
  },

  toJSON(message: GetDetailsRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.payload.length !== 0) {
      obj.payload = base64FromBytes(message.payload);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetDetailsRequest>, I>>(base?: I): GetDetailsRequest {
    return GetDetailsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetDetailsRequest>, I>>(object: I): GetDetailsRequest {
    const message = createBaseGetDetailsRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.payload = object.payload ?? new Uint8Array(0);
    return message;
  },
};

function createBaseGetDetailsResponse(): GetDetailsResponse {
  return { details: undefined, error: undefined };
}

export const GetDetailsResponse = {
  encode(message: GetDetailsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== undefined) {
      RecordDetails.encode(message.details, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetDetailsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDetailsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.details = RecordDetails.decode(reader, reader.uint32());
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

  fromJSON(object: any): GetDetailsResponse {
    return {
      details: isSet(object.details) ? RecordDetails.fromJSON(object.details) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GetDetailsResponse): unknown {
    const obj: any = {};
    if (message.details !== undefined) {
      obj.details = RecordDetails.toJSON(message.details);
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetDetailsResponse>, I>>(base?: I): GetDetailsResponse {
    return GetDetailsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetDetailsResponse>, I>>(object: I): GetDetailsResponse {
    const message = createBaseGetDetailsResponse();
    message.details = (object.details !== undefined && object.details !== null)
      ? RecordDetails.fromPartial(object.details)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetHashRequest();
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

          message.record = Record.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
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
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.record !== undefined) {
      obj.record = Record.toJSON(message.record);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetHashRequest>, I>>(base?: I): GetHashRequest {
    return GetHashRequest.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetHashResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hash = reader.string();
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

  fromJSON(object: any): GetHashResponse {
    return {
      hash: isSet(object.hash) ? globalThis.String(object.hash) : "",
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GetHashResponse): unknown {
    const obj: any = {};
    if (message.hash !== "") {
      obj.hash = message.hash;
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetHashResponse>, I>>(base?: I): GetHashResponse {
    return GetHashResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetHashResponse>, I>>(object: I): GetHashResponse {
    const message = createBaseGetHashResponse();
    message.hash = object.hash ?? "";
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseGetPayloadRequest(): GetPayloadRequest {
  return { configData: undefined, record: undefined };
}

export const GetPayloadRequest = {
  encode(message: GetPayloadRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.record !== undefined) {
      Record.encode(message.record, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetPayloadRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPayloadRequest();
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

          message.record = Record.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetPayloadRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      record: isSet(object.record) ? Record.fromJSON(object.record) : undefined,
    };
  },

  toJSON(message: GetPayloadRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.record !== undefined) {
      obj.record = Record.toJSON(message.record);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetPayloadRequest>, I>>(base?: I): GetPayloadRequest {
    return GetPayloadRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetPayloadRequest>, I>>(object: I): GetPayloadRequest {
    const message = createBaseGetPayloadRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.record = (object.record !== undefined && object.record !== null)
      ? Record.fromPartial(object.record)
      : undefined;
    return message;
  },
};

function createBaseGetPayloadResponse(): GetPayloadResponse {
  return { payload: new Uint8Array(0), error: undefined };
}

export const GetPayloadResponse = {
  encode(message: GetPayloadResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.payload.length !== 0) {
      writer.uint32(10).bytes(message.payload);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetPayloadResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPayloadResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.payload = reader.bytes();
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

  fromJSON(object: any): GetPayloadResponse {
    return {
      payload: isSet(object.payload) ? bytesFromBase64(object.payload) : new Uint8Array(0),
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GetPayloadResponse): unknown {
    const obj: any = {};
    if (message.payload.length !== 0) {
      obj.payload = base64FromBytes(message.payload);
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetPayloadResponse>, I>>(base?: I): GetPayloadResponse {
    return GetPayloadResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetPayloadResponse>, I>>(object: I): GetPayloadResponse {
    const message = createBaseGetPayloadResponse();
    message.payload = object.payload ?? new Uint8Array(0);
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetProofRequest();
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

          message.record = Record.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.proof = Proof.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
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
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.record !== undefined) {
      obj.record = Record.toJSON(message.record);
    }
    if (message.proof !== undefined) {
      obj.proof = Proof.toJSON(message.proof);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SetProofRequest>, I>>(base?: I): SetProofRequest {
    return SetProofRequest.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetProofResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.record = Record.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
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
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.record !== undefined) {
      obj.record = Record.toJSON(message.record);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SetProofResponse>, I>>(base?: I): SetProofResponse {
    return SetProofResponse.fromPartial(base ?? ({} as any));
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
  GetDetails(request: GetDetailsRequest): Promise<GetDetailsResponse>;
  GetHash(request: GetHashRequest): Promise<GetHashResponse>;
  GetPayload(request: GetPayloadRequest): Promise<GetPayloadResponse>;
  SetProof(request: SetProofRequest): Promise<SetProofResponse>;
}

export const RecordServiceServiceName = "bloock.RecordService";
export class RecordServiceClientImpl implements RecordService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || RecordServiceServiceName;
    this.rpc = rpc;
    this.BuildRecordFromString = this.BuildRecordFromString.bind(this);
    this.BuildRecordFromHex = this.BuildRecordFromHex.bind(this);
    this.BuildRecordFromJson = this.BuildRecordFromJson.bind(this);
    this.BuildRecordFromFile = this.BuildRecordFromFile.bind(this);
    this.BuildRecordFromBytes = this.BuildRecordFromBytes.bind(this);
    this.BuildRecordFromRecord = this.BuildRecordFromRecord.bind(this);
    this.BuildRecordFromLoader = this.BuildRecordFromLoader.bind(this);
    this.GetDetails = this.GetDetails.bind(this);
    this.GetHash = this.GetHash.bind(this);
    this.GetPayload = this.GetPayload.bind(this);
    this.SetProof = this.SetProof.bind(this);
  }
  BuildRecordFromString(request: RecordBuilderFromStringRequest): Promise<RecordBuilderResponse> {
    const data = RecordBuilderFromStringRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "BuildRecordFromString", data);
    return promise.then((data) => RecordBuilderResponse.decode(_m0.Reader.create(data)));
  }

  BuildRecordFromHex(request: RecordBuilderFromHexRequest): Promise<RecordBuilderResponse> {
    const data = RecordBuilderFromHexRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "BuildRecordFromHex", data);
    return promise.then((data) => RecordBuilderResponse.decode(_m0.Reader.create(data)));
  }

  BuildRecordFromJson(request: RecordBuilderFromJSONRequest): Promise<RecordBuilderResponse> {
    const data = RecordBuilderFromJSONRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "BuildRecordFromJson", data);
    return promise.then((data) => RecordBuilderResponse.decode(_m0.Reader.create(data)));
  }

  BuildRecordFromFile(request: RecordBuilderFromFileRequest): Promise<RecordBuilderResponse> {
    const data = RecordBuilderFromFileRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "BuildRecordFromFile", data);
    return promise.then((data) => RecordBuilderResponse.decode(_m0.Reader.create(data)));
  }

  BuildRecordFromBytes(request: RecordBuilderFromBytesRequest): Promise<RecordBuilderResponse> {
    const data = RecordBuilderFromBytesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "BuildRecordFromBytes", data);
    return promise.then((data) => RecordBuilderResponse.decode(_m0.Reader.create(data)));
  }

  BuildRecordFromRecord(request: RecordBuilderFromRecordRequest): Promise<RecordBuilderResponse> {
    const data = RecordBuilderFromRecordRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "BuildRecordFromRecord", data);
    return promise.then((data) => RecordBuilderResponse.decode(_m0.Reader.create(data)));
  }

  BuildRecordFromLoader(request: RecordBuilderFromLoaderRequest): Promise<RecordBuilderResponse> {
    const data = RecordBuilderFromLoaderRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "BuildRecordFromLoader", data);
    return promise.then((data) => RecordBuilderResponse.decode(_m0.Reader.create(data)));
  }

  GetDetails(request: GetDetailsRequest): Promise<GetDetailsResponse> {
    const data = GetDetailsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetDetails", data);
    return promise.then((data) => GetDetailsResponse.decode(_m0.Reader.create(data)));
  }

  GetHash(request: GetHashRequest): Promise<GetHashResponse> {
    const data = GetHashRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetHash", data);
    return promise.then((data) => GetHashResponse.decode(_m0.Reader.create(data)));
  }

  GetPayload(request: GetPayloadRequest): Promise<GetPayloadResponse> {
    const data = GetPayloadRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetPayload", data);
    return promise.then((data) => GetPayloadResponse.decode(_m0.Reader.create(data)));
  }

  SetProof(request: SetProofRequest): Promise<SetProofResponse> {
    const data = SetProofRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SetProof", data);
    return promise.then((data) => SetProofResponse.decode(_m0.Reader.create(data)));
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
    getDetails: {
      name: "GetDetails",
      requestType: GetDetailsRequest,
      requestStream: false,
      responseType: GetDetailsResponse,
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
    getPayload: {
      name: "GetPayload",
      requestType: GetPayloadRequest,
      requestStream: false,
      responseType: GetPayloadResponse,
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
