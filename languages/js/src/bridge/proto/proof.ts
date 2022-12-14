/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { AnchorNetwork } from "./anchor";
import { ConfigData, Network, networkFromJSON, networkToJSON } from "./config";
import { Record } from "./record";
import { Error } from "./shared";

export interface Proof {
  leaves: string[];
  nodes: string[];
  depth: string;
  bitmap: string;
  anchor?: ProofAnchor;
}

export interface ProofAnchor {
  anchorId: number;
  networks: AnchorNetwork[];
  root: string;
  status: string;
}

export interface GetProofRequest {
  configData?: ConfigData;
  records: Record[];
}

export interface GetProofResponse {
  proof?: Proof;
  error?: Error | undefined;
}

export interface ValidateRootRequest {
  configData?: ConfigData;
  root: string;
  network?: Network | undefined;
}

export interface ValidateRootResponse {
  /** TODO Should be u128 */
  timestamp: number;
  error?: Error | undefined;
}

export interface VerifyProofRequest {
  configData?: ConfigData;
  proof?: Proof;
}

export interface VerifyProofResponse {
  record?: string | undefined;
  error?: Error | undefined;
}

export interface VerifyRecordsRequest {
  configData?: ConfigData;
  records: Record[];
  network?: Network | undefined;
}

export interface VerifyRecordsResponse {
  /** TODO Should be u128 */
  timestamp: number;
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

function createBaseProof(): Proof {
  return { leaves: [], nodes: [], depth: "", bitmap: "", anchor: undefined };
}

export const Proof = {
  encode(message: Proof, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.leaves) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.nodes) {
      writer.uint32(18).string(v!);
    }
    if (message.depth !== "") {
      writer.uint32(26).string(message.depth);
    }
    if (message.bitmap !== "") {
      writer.uint32(34).string(message.bitmap);
    }
    if (message.anchor !== undefined) {
      ProofAnchor.encode(message.anchor, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Proof {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProof();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.leaves.push(reader.string());
          break;
        case 2:
          message.nodes.push(reader.string());
          break;
        case 3:
          message.depth = reader.string();
          break;
        case 4:
          message.bitmap = reader.string();
          break;
        case 5:
          message.anchor = ProofAnchor.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Proof {
    return {
      leaves: Array.isArray(object?.leaves) ? object.leaves.map((e: any) => String(e)) : [],
      nodes: Array.isArray(object?.nodes) ? object.nodes.map((e: any) => String(e)) : [],
      depth: isSet(object.depth) ? String(object.depth) : "",
      bitmap: isSet(object.bitmap) ? String(object.bitmap) : "",
      anchor: isSet(object.anchor) ? ProofAnchor.fromJSON(object.anchor) : undefined,
    };
  },

  toJSON(message: Proof): unknown {
    const obj: any = {};
    if (message.leaves) {
      obj.leaves = message.leaves.map((e) => e);
    } else {
      obj.leaves = [];
    }
    if (message.nodes) {
      obj.nodes = message.nodes.map((e) => e);
    } else {
      obj.nodes = [];
    }
    message.depth !== undefined && (obj.depth = message.depth);
    message.bitmap !== undefined && (obj.bitmap = message.bitmap);
    message.anchor !== undefined && (obj.anchor = message.anchor ? ProofAnchor.toJSON(message.anchor) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Proof>, I>>(object: I): Proof {
    const message = createBaseProof();
    message.leaves = object.leaves?.map((e) => e) || [];
    message.nodes = object.nodes?.map((e) => e) || [];
    message.depth = object.depth ?? "";
    message.bitmap = object.bitmap ?? "";
    message.anchor = (object.anchor !== undefined && object.anchor !== null)
      ? ProofAnchor.fromPartial(object.anchor)
      : undefined;
    return message;
  },
};

function createBaseProofAnchor(): ProofAnchor {
  return { anchorId: 0, networks: [], root: "", status: "" };
}

export const ProofAnchor = {
  encode(message: ProofAnchor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.anchorId !== 0) {
      writer.uint32(8).int64(message.anchorId);
    }
    for (const v of message.networks) {
      AnchorNetwork.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.root !== "") {
      writer.uint32(26).string(message.root);
    }
    if (message.status !== "") {
      writer.uint32(34).string(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProofAnchor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProofAnchor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.anchorId = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.networks.push(AnchorNetwork.decode(reader, reader.uint32()));
          break;
        case 3:
          message.root = reader.string();
          break;
        case 4:
          message.status = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProofAnchor {
    return {
      anchorId: isSet(object.anchorId) ? Number(object.anchorId) : 0,
      networks: Array.isArray(object?.networks) ? object.networks.map((e: any) => AnchorNetwork.fromJSON(e)) : [],
      root: isSet(object.root) ? String(object.root) : "",
      status: isSet(object.status) ? String(object.status) : "",
    };
  },

  toJSON(message: ProofAnchor): unknown {
    const obj: any = {};
    message.anchorId !== undefined && (obj.anchorId = Math.round(message.anchorId));
    if (message.networks) {
      obj.networks = message.networks.map((e) => e ? AnchorNetwork.toJSON(e) : undefined);
    } else {
      obj.networks = [];
    }
    message.root !== undefined && (obj.root = message.root);
    message.status !== undefined && (obj.status = message.status);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProofAnchor>, I>>(object: I): ProofAnchor {
    const message = createBaseProofAnchor();
    message.anchorId = object.anchorId ?? 0;
    message.networks = object.networks?.map((e) => AnchorNetwork.fromPartial(e)) || [];
    message.root = object.root ?? "";
    message.status = object.status ?? "";
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetProofRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.records.push(Record.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetProofRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      records: Array.isArray(object?.records) ? object.records.map((e: any) => Record.fromJSON(e)) : [],
    };
  },

  toJSON(message: GetProofRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    if (message.records) {
      obj.records = message.records.map((e) => e ? Record.toJSON(e) : undefined);
    } else {
      obj.records = [];
    }
    return obj;
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetProofResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proof = Proof.decode(reader, reader.uint32());
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

  fromJSON(object: any): GetProofResponse {
    return {
      proof: isSet(object.proof) ? Proof.fromJSON(object.proof) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GetProofResponse): unknown {
    const obj: any = {};
    message.proof !== undefined && (obj.proof = message.proof ? Proof.toJSON(message.proof) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetProofResponse>, I>>(object: I): GetProofResponse {
    const message = createBaseGetProofResponse();
    message.proof = (object.proof !== undefined && object.proof !== null) ? Proof.fromPartial(object.proof) : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseValidateRootRequest(): ValidateRootRequest {
  return { configData: undefined, root: "", network: undefined };
}

export const ValidateRootRequest = {
  encode(message: ValidateRootRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.configData !== undefined) {
      ConfigData.encode(message.configData, writer.uint32(10).fork()).ldelim();
    }
    if (message.root !== "") {
      writer.uint32(18).string(message.root);
    }
    if (message.network !== undefined) {
      writer.uint32(24).int32(message.network);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidateRootRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidateRootRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.root = reader.string();
          break;
        case 3:
          message.network = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValidateRootRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      root: isSet(object.root) ? String(object.root) : "",
      network: isSet(object.network) ? networkFromJSON(object.network) : undefined,
    };
  },

  toJSON(message: ValidateRootRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.root !== undefined && (obj.root = message.root);
    message.network !== undefined &&
      (obj.network = message.network !== undefined ? networkToJSON(message.network) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ValidateRootRequest>, I>>(object: I): ValidateRootRequest {
    const message = createBaseValidateRootRequest();
    message.configData = (object.configData !== undefined && object.configData !== null)
      ? ConfigData.fromPartial(object.configData)
      : undefined;
    message.root = object.root ?? "";
    message.network = object.network ?? undefined;
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidateRootResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timestamp = longToNumber(reader.uint64() as Long);
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

  fromJSON(object: any): ValidateRootResponse {
    return {
      timestamp: isSet(object.timestamp) ? Number(object.timestamp) : 0,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: ValidateRootResponse): unknown {
    const obj: any = {};
    message.timestamp !== undefined && (obj.timestamp = Math.round(message.timestamp));
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyProofRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.proof = Proof.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
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
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    message.proof !== undefined && (obj.proof = message.proof ? Proof.toJSON(message.proof) : undefined);
    return obj;
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyProofResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.record = reader.string();
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

  fromJSON(object: any): VerifyProofResponse {
    return {
      record: isSet(object.record) ? String(object.record) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: VerifyProofResponse): unknown {
    const obj: any = {};
    message.record !== undefined && (obj.record = message.record);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyRecordsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.configData = ConfigData.decode(reader, reader.uint32());
          break;
        case 2:
          message.records.push(Record.decode(reader, reader.uint32()));
          break;
        case 3:
          message.network = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VerifyRecordsRequest {
    return {
      configData: isSet(object.configData) ? ConfigData.fromJSON(object.configData) : undefined,
      records: Array.isArray(object?.records) ? object.records.map((e: any) => Record.fromJSON(e)) : [],
      network: isSet(object.network) ? networkFromJSON(object.network) : undefined,
    };
  },

  toJSON(message: VerifyRecordsRequest): unknown {
    const obj: any = {};
    message.configData !== undefined &&
      (obj.configData = message.configData ? ConfigData.toJSON(message.configData) : undefined);
    if (message.records) {
      obj.records = message.records.map((e) => e ? Record.toJSON(e) : undefined);
    } else {
      obj.records = [];
    }
    message.network !== undefined &&
      (obj.network = message.network !== undefined ? networkToJSON(message.network) : undefined);
    return obj;
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyRecordsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timestamp = longToNumber(reader.uint64() as Long);
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

  fromJSON(object: any): VerifyRecordsResponse {
    return {
      timestamp: isSet(object.timestamp) ? Number(object.timestamp) : 0,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: VerifyRecordsResponse): unknown {
    const obj: any = {};
    message.timestamp !== undefined && (obj.timestamp = Math.round(message.timestamp));
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<VerifyRecordsResponse>, I>>(object: I): VerifyRecordsResponse {
    const message = createBaseVerifyRecordsResponse();
    message.timestamp = object.timestamp ?? 0;
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

export interface ProofService {
  GetProof(request: GetProofRequest): Promise<GetProofResponse>;
  ValidateRoot(request: ValidateRootRequest): Promise<ValidateRootResponse>;
  VerifyProof(request: VerifyProofRequest): Promise<VerifyProofResponse>;
  VerifyRecords(request: VerifyRecordsRequest): Promise<VerifyRecordsResponse>;
  SetProof(request: SetProofRequest): Promise<SetProofResponse>;
}

export class ProofServiceClientImpl implements ProofService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "bloock.ProofService";
    this.rpc = rpc;
    this.GetProof = this.GetProof.bind(this);
    this.ValidateRoot = this.ValidateRoot.bind(this);
    this.VerifyProof = this.VerifyProof.bind(this);
    this.VerifyRecords = this.VerifyRecords.bind(this);
    this.SetProof = this.SetProof.bind(this);
  }
  GetProof(request: GetProofRequest): Promise<GetProofResponse> {
    const data = GetProofRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetProof", data);
    return promise.then((data) => GetProofResponse.decode(new _m0.Reader(data)));
  }

  ValidateRoot(request: ValidateRootRequest): Promise<ValidateRootResponse> {
    const data = ValidateRootRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ValidateRoot", data);
    return promise.then((data) => ValidateRootResponse.decode(new _m0.Reader(data)));
  }

  VerifyProof(request: VerifyProofRequest): Promise<VerifyProofResponse> {
    const data = VerifyProofRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "VerifyProof", data);
    return promise.then((data) => VerifyProofResponse.decode(new _m0.Reader(data)));
  }

  VerifyRecords(request: VerifyRecordsRequest): Promise<VerifyRecordsResponse> {
    const data = VerifyRecordsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "VerifyRecords", data);
    return promise.then((data) => VerifyRecordsResponse.decode(new _m0.Reader(data)));
  }

  SetProof(request: SetProofRequest): Promise<SetProofResponse> {
    const data = SetProofRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SetProof", data);
    return promise.then((data) => SetProofResponse.decode(new _m0.Reader(data)));
  }
}

export type ProofServiceDefinition = typeof ProofServiceDefinition;
export const ProofServiceDefinition = {
  name: "ProofService",
  fullName: "bloock.ProofService",
  methods: {
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
