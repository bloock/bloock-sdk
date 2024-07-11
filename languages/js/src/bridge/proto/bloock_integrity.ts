/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { ConfigData, Network, networkFromJSON, networkToJSON } from "./bloock_config";
import { Anchor, Proof, RecordReceipt } from "./bloock_integrity_entities";
import { Record } from "./bloock_record_entities";
import { Error } from "./bloock_shared";

export interface SendRecordsRequest {
  configData?: ConfigData | undefined;
  records: Record[];
}

export interface SendRecordsResponse {
  records: RecordReceipt[];
  error?: Error | undefined;
}

export interface GetAnchorRequest {
  configData?: ConfigData | undefined;
  anchorId: number;
}

export interface GetAnchorResponse {
  anchor?: Anchor | undefined;
  error?: Error | undefined;
}

export interface WaitAnchorRequest {
  configData?: ConfigData | undefined;
  anchorId: number;
  timeout: number;
}

export interface WaitAnchorResponse {
  anchor?: Anchor | undefined;
  error?: Error | undefined;
}

export interface GetProofRequest {
  configData?: ConfigData | undefined;
  records: Record[];
}

export interface GetProofResponse {
  proof?: Proof | undefined;
  error?: Error | undefined;
}

export interface ValidateRootRequest {
  configData?: ConfigData | undefined;
  root: string;
  network: Network;
}

export interface ValidateRootResponse {
  /** TODO Should be u128 */
  timestamp: number;
  error?: Error | undefined;
}

export interface VerifyProofRequest {
  configData?: ConfigData | undefined;
  proof?: Proof | undefined;
}

export interface VerifyProofResponse {
  record?: string | undefined;
  error?: Error | undefined;
}

export interface VerifyRecordsRequest {
  configData?: ConfigData | undefined;
  records: Record[];
  network?: Network | undefined;
}

export interface VerifyRecordsResponse {
  /** TODO Should be u128 */
  timestamp: number;
  error?: Error | undefined;
}

function createBaseSendRecordsRequest(): SendRecordsRequest {
  return { configData: undefined, records: [] };
}

export const SendRecordsRequest = {
  encode(message: SendRecordsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.records) {
      Record.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendRecordsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendRecordsRequest();
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

          message.records.push(Record.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SendRecordsRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      records: globalThis.Array.isArray(object?.records) ? object.records.map((e: any) => Record.fromJSON(e)) : [],
    };
  },

  toJSON(message: SendRecordsRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.records?.length) {
      obj.records = message.records.map((e) => Record.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SendRecordsRequest>, I>>(base?: I): SendRecordsRequest {
    return SendRecordsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SendRecordsRequest>, I>>(object: I): SendRecordsRequest {
    const message = createBaseSendRecordsRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.records = object.records?.map((e) => Record.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSendRecordsResponse(): SendRecordsResponse {
  return { records: [], error: undefined };
}

export const SendRecordsResponse = {
  encode(message: SendRecordsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.records) {
      RecordReceipt.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendRecordsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendRecordsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.records.push(RecordReceipt.decode(reader, reader.uint32()));
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

  fromJSON(object: any): SendRecordsResponse {
    return {
      records: globalThis.Array.isArray(object?.records)
        ? object.records.map((e: any) => RecordReceipt.fromJSON(e))
        : [],
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: SendRecordsResponse): unknown {
    const obj: any = {};
    if (message.records?.length) {
      obj.records = message.records.map((e) => RecordReceipt.toJSON(e));
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SendRecordsResponse>, I>>(base?: I): SendRecordsResponse {
    return SendRecordsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SendRecordsResponse>, I>>(object: I): SendRecordsResponse {
    const message = createBaseSendRecordsResponse();
    message.records = object.records?.map((e) => RecordReceipt.fromPartial(e)) || [];
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseGetAnchorRequest(): GetAnchorRequest {
  return { configData: undefined, anchorId: 0 };
}

export const GetAnchorRequest = {
  encode(message: GetAnchorRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.anchorId !== 0) {
      writer.uint32(16).int64(message.anchorId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAnchorRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAnchorRequest();
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

  fromJSON(object: any): GetAnchorRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      anchorId: isSet(object.anchorId) ? globalThis.Number(object.anchorId) : 0,
    };
  },

  toJSON(message: GetAnchorRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.anchorId !== 0) {
      obj.anchorId = Math.round(message.anchorId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetAnchorRequest>, I>>(base?: I): GetAnchorRequest {
    return GetAnchorRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetAnchorRequest>, I>>(object: I): GetAnchorRequest {
    const message = createBaseGetAnchorRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.anchorId = object.anchorId ?? 0;
    return message;
  },
};

function createBaseGetAnchorResponse(): GetAnchorResponse {
  return { anchor: undefined, error: undefined };
}

export const GetAnchorResponse = {
  encode(message: GetAnchorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.anchor !== undefined) {
      Anchor.encode(message.anchor, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAnchorResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAnchorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.anchor = Anchor.decode(reader, reader.uint32());
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

  fromJSON(object: any): GetAnchorResponse {
    return {
      anchor: isSet(object.anchor) ? Anchor.fromJSON(object.anchor) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GetAnchorResponse): unknown {
    const obj: any = {};
    if (message.anchor !== undefined) {
      obj.anchor = Anchor.toJSON(message.anchor);
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetAnchorResponse>, I>>(base?: I): GetAnchorResponse {
    return GetAnchorResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetAnchorResponse>, I>>(object: I): GetAnchorResponse {
    const message = createBaseGetAnchorResponse();
    message.anchor = (object.anchor !== undefined && object.anchor !== null)
      ? Anchor.fromPartial(object.anchor)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseWaitAnchorRequest(): WaitAnchorRequest {
  return { configData: undefined, anchorId: 0, timeout: 0 };
}

export const WaitAnchorRequest = {
  encode(message: WaitAnchorRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.anchorId !== 0) {
      writer.uint32(16).int64(message.anchorId);
    }
    if (message.timeout !== 0) {
      writer.uint32(24).int64(message.timeout);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WaitAnchorRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWaitAnchorRequest();
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
          if (tag !== 16) {
            break;
          }

          message.anchorId = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.timeout = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WaitAnchorRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      anchorId: isSet(object.anchorId) ? globalThis.Number(object.anchorId) : 0,
      timeout: isSet(object.timeout) ? globalThis.Number(object.timeout) : 0,
    };
  },

  toJSON(message: WaitAnchorRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.anchorId !== 0) {
      obj.anchorId = Math.round(message.anchorId);
    }
    if (message.timeout !== 0) {
      obj.timeout = Math.round(message.timeout);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WaitAnchorRequest>, I>>(base?: I): WaitAnchorRequest {
    return WaitAnchorRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WaitAnchorRequest>, I>>(object: I): WaitAnchorRequest {
    const message = createBaseWaitAnchorRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.anchorId = object.anchorId ?? 0;
    message.timeout = object.timeout ?? 0;
    return message;
  },
};

function createBaseWaitAnchorResponse(): WaitAnchorResponse {
  return { anchor: undefined, error: undefined };
}

export const WaitAnchorResponse = {
  encode(message: WaitAnchorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.anchor !== undefined) {
      Anchor.encode(message.anchor, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WaitAnchorResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWaitAnchorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.anchor = Anchor.decode(reader, reader.uint32());
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

  fromJSON(object: any): WaitAnchorResponse {
    return {
      anchor: isSet(object.anchor) ? Anchor.fromJSON(object.anchor) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: WaitAnchorResponse): unknown {
    const obj: any = {};
    if (message.anchor !== undefined) {
      obj.anchor = Anchor.toJSON(message.anchor);
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WaitAnchorResponse>, I>>(base?: I): WaitAnchorResponse {
    return WaitAnchorResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WaitAnchorResponse>, I>>(object: I): WaitAnchorResponse {
    const message = createBaseWaitAnchorResponse();
    message.anchor = (object.anchor !== undefined && object.anchor !== null)
      ? Anchor.fromPartial(object.anchor)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseGetProofRequest(): GetProofRequest {
  return { configData: undefined, records: [] };
}

export const GetProofRequest = {
  encode(message: GetProofRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.records) {
      Record.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetProofRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetProofRequest();
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

          message.records.push(Record.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetProofRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      records: globalThis.Array.isArray(object?.records) ? object.records.map((e: any) => Record.fromJSON(e)) : [],
    };
  },

  toJSON(message: GetProofRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.records?.length) {
      obj.records = message.records.map((e) => Record.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetProofRequest>, I>>(base?: I): GetProofRequest {
    return GetProofRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetProofRequest>, I>>(object: I): GetProofRequest {
    const message = createBaseGetProofRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.records = object.records?.map((e) => Record.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetProofResponse(): GetProofResponse {
  return { proof: undefined, error: undefined };
}

export const GetProofResponse = {
  encode(message: GetProofResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proof !== undefined) {
      Proof.encode(message.proof, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetProofResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetProofResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.proof = Proof.decode(reader, reader.uint32());
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

  fromJSON(object: any): GetProofResponse {
    return {
      proof: isSet(object.proof) ? Proof.fromJSON(object.proof) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GetProofResponse): unknown {
    const obj: any = {};
    if (message.proof !== undefined) {
      obj.proof = Proof.toJSON(message.proof);
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetProofResponse>, I>>(base?: I): GetProofResponse {
    return GetProofResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetProofResponse>, I>>(object: I): GetProofResponse {
    const message = createBaseGetProofResponse();
    message.proof = (object.proof !== undefined && object.proof !== null) ? Proof.fromPartial(object.proof) : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseValidateRootRequest(): ValidateRootRequest {
  return { configData: undefined, root: "", network: 0 };
}

export const ValidateRootRequest = {
  encode(message: ValidateRootRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.root !== "") {
      writer.uint32(18).string(message.root);
    }
    if (message.network !== 0) {
      writer.uint32(24).int32(message.network);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidateRootRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidateRootRequest();
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

          message.root = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.network = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValidateRootRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      root: isSet(object.root) ? globalThis.String(object.root) : "",
      network: isSet(object.network) ? networkFromJSON(object.network) : 0,
    };
  },

  toJSON(message: ValidateRootRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.root !== "") {
      obj.root = message.root;
    }
    if (message.network !== 0) {
      obj.network = networkToJSON(message.network);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidateRootRequest>, I>>(base?: I): ValidateRootRequest {
    return ValidateRootRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidateRootRequest>, I>>(object: I): ValidateRootRequest {
    const message = createBaseValidateRootRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.root = object.root ?? "";
    message.network = object.network ?? 0;
    return message;
  },
};

function createBaseValidateRootResponse(): ValidateRootResponse {
  return { timestamp: 0, error: undefined };
}

export const ValidateRootResponse = {
  encode(message: ValidateRootResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidateRootResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidateRootResponse();
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

  fromJSON(object: any): ValidateRootResponse {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: ValidateRootResponse): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidateRootResponse>, I>>(base?: I): ValidateRootResponse {
    return ValidateRootResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidateRootResponse>, I>>(object: I): ValidateRootResponse {
    const message = createBaseValidateRootResponse();
    message.timestamp = object.timestamp ?? 0;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseVerifyProofRequest(): VerifyProofRequest {
  return { configData: undefined, proof: undefined };
}

export const VerifyProofRequest = {
  encode(message: VerifyProofRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.proof !== undefined) {
      Proof.encode(message.proof, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyProofRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyProofRequest();
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

  fromJSON(object: any): VerifyProofRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      proof: isSet(object.proof) ? Proof.fromJSON(object.proof) : undefined,
    };
  },

  toJSON(message: VerifyProofRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.proof !== undefined) {
      obj.proof = Proof.toJSON(message.proof);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerifyProofRequest>, I>>(base?: I): VerifyProofRequest {
    return VerifyProofRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerifyProofRequest>, I>>(object: I): VerifyProofRequest {
    const message = createBaseVerifyProofRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.proof = (object.proof !== undefined && object.proof !== null) ? Proof.fromPartial(object.proof) : undefined;
    return message;
  },
};

function createBaseVerifyProofResponse(): VerifyProofResponse {
  return { record: undefined, error: undefined };
}

export const VerifyProofResponse = {
  encode(message: VerifyProofResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.record !== undefined) {
      writer.uint32(10).string(message.record);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyProofResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyProofResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.record = reader.string();
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

  fromJSON(object: any): VerifyProofResponse {
    return {
      record: isSet(object.record) ? globalThis.String(object.record) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: VerifyProofResponse): unknown {
    const obj: any = {};
    if (message.record !== undefined) {
      obj.record = message.record;
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerifyProofResponse>, I>>(base?: I): VerifyProofResponse {
    return VerifyProofResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerifyProofResponse>, I>>(object: I): VerifyProofResponse {
    const message = createBaseVerifyProofResponse();
    message.record = object.record ?? undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseVerifyRecordsRequest(): VerifyRecordsRequest {
  return { configData: undefined, records: [], network: undefined };
}

export const VerifyRecordsRequest = {
  encode(message: VerifyRecordsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.records) {
      Record.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.network !== undefined) {
      writer.uint32(24).int32(message.network);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyRecordsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyRecordsRequest();
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

          message.records.push(Record.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.network = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VerifyRecordsRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      records: globalThis.Array.isArray(object?.records) ? object.records.map((e: any) => Record.fromJSON(e)) : [],
      network: isSet(object.network) ? networkFromJSON(object.network) : undefined,
    };
  },

  toJSON(message: VerifyRecordsRequest): unknown {
    const obj: any = {};
    if (message.configData !== undefined) {
      obj.configData = ConfigData.toJSON(message.configData);
    }
    if (message.records?.length) {
      obj.records = message.records.map((e) => Record.toJSON(e));
    }
    if (message.network !== undefined) {
      obj.network = networkToJSON(message.network);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerifyRecordsRequest>, I>>(base?: I): VerifyRecordsRequest {
    return VerifyRecordsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerifyRecordsRequest>, I>>(object: I): VerifyRecordsRequest {
    const message = createBaseVerifyRecordsRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.records = object.records?.map((e) => Record.fromPartial(e)) || [];
    message.network = object.network ?? undefined;
    return message;
  },
};

function createBaseVerifyRecordsResponse(): VerifyRecordsResponse {
  return { timestamp: 0, error: undefined };
}

export const VerifyRecordsResponse = {
  encode(message: VerifyRecordsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyRecordsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyRecordsResponse();
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

  fromJSON(object: any): VerifyRecordsResponse {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: VerifyRecordsResponse): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerifyRecordsResponse>, I>>(base?: I): VerifyRecordsResponse {
    return VerifyRecordsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerifyRecordsResponse>, I>>(object: I): VerifyRecordsResponse {
    const message = createBaseVerifyRecordsResponse();
    message.timestamp = object.timestamp ?? 0;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

export interface IntegrityService {
  SendRecords(request: SendRecordsRequest): Promise<SendRecordsResponse>;
  GetAnchor(request: GetAnchorRequest): Promise<GetAnchorResponse>;
  WaitAnchor(request: WaitAnchorRequest): Promise<WaitAnchorResponse>;
  GetProof(request: GetProofRequest): Promise<GetProofResponse>;
  ValidateRoot(request: ValidateRootRequest): Promise<ValidateRootResponse>;
  VerifyProof(request: VerifyProofRequest): Promise<VerifyProofResponse>;
  VerifyRecords(request: VerifyRecordsRequest): Promise<VerifyRecordsResponse>;
}

export const IntegrityServiceServiceName = "bloock.IntegrityService";
export class IntegrityServiceClientImpl implements IntegrityService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || IntegrityServiceServiceName;
    this.rpc = rpc;
    this.SendRecords = this.SendRecords.bind(this);
    this.GetAnchor = this.GetAnchor.bind(this);
    this.WaitAnchor = this.WaitAnchor.bind(this);
    this.GetProof = this.GetProof.bind(this);
    this.ValidateRoot = this.ValidateRoot.bind(this);
    this.VerifyProof = this.VerifyProof.bind(this);
    this.VerifyRecords = this.VerifyRecords.bind(this);
  }
  SendRecords(request: SendRecordsRequest): Promise<SendRecordsResponse> {
    const data = SendRecordsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SendRecords", data);
    return promise.then((data) => SendRecordsResponse.decode(_m0.Reader.create(data)));
  }

  GetAnchor(request: GetAnchorRequest): Promise<GetAnchorResponse> {
    const data = GetAnchorRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetAnchor", data);
    return promise.then((data) => GetAnchorResponse.decode(_m0.Reader.create(data)));
  }

  WaitAnchor(request: WaitAnchorRequest): Promise<WaitAnchorResponse> {
    const data = WaitAnchorRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "WaitAnchor", data);
    return promise.then((data) => WaitAnchorResponse.decode(_m0.Reader.create(data)));
  }

  GetProof(request: GetProofRequest): Promise<GetProofResponse> {
    const data = GetProofRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetProof", data);
    return promise.then((data) => GetProofResponse.decode(_m0.Reader.create(data)));
  }

  ValidateRoot(request: ValidateRootRequest): Promise<ValidateRootResponse> {
    const data = ValidateRootRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ValidateRoot", data);
    return promise.then((data) => ValidateRootResponse.decode(_m0.Reader.create(data)));
  }

  VerifyProof(request: VerifyProofRequest): Promise<VerifyProofResponse> {
    const data = VerifyProofRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "VerifyProof", data);
    return promise.then((data) => VerifyProofResponse.decode(_m0.Reader.create(data)));
  }

  VerifyRecords(request: VerifyRecordsRequest): Promise<VerifyRecordsResponse> {
    const data = VerifyRecordsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "VerifyRecords", data);
    return promise.then((data) => VerifyRecordsResponse.decode(_m0.Reader.create(data)));
  }
}

export type IntegrityServiceDefinition = typeof IntegrityServiceDefinition;
export const IntegrityServiceDefinition = {
  name: "IntegrityService",
  fullName: "bloock.IntegrityService",
  methods: {
    sendRecords: {
      name: "SendRecords",
      requestType: SendRecordsRequest,
      requestStream: false,
      responseType: SendRecordsResponse,
      responseStream: false,
      options: {},
    },
    getAnchor: {
      name: "GetAnchor",
      requestType: GetAnchorRequest,
      requestStream: false,
      responseType: GetAnchorResponse,
      responseStream: false,
      options: {},
    },
    waitAnchor: {
      name: "WaitAnchor",
      requestType: WaitAnchorRequest,
      requestStream: false,
      responseType: WaitAnchorResponse,
      responseStream: false,
      options: {},
    },
    getProof: {
      name: "GetProof",
      requestType: GetProofRequest,
      requestStream: false,
      responseType: GetProofResponse,
      responseStream: false,
      options: {},
    },
    validateRoot: {
      name: "ValidateRoot",
      requestType: ValidateRootRequest,
      requestStream: false,
      responseType: ValidateRootResponse,
      responseStream: false,
      options: {},
    },
    verifyProof: {
      name: "VerifyProof",
      requestType: VerifyProofRequest,
      requestStream: false,
      responseType: VerifyProofResponse,
      responseStream: false,
      options: {},
    },
    verifyRecords: {
      name: "VerifyRecords",
      requestType: VerifyRecordsRequest,
      requestStream: false,
      responseType: VerifyRecordsResponse,
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
