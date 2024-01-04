/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface Anchor {
  id: number;
  blockRoots: string[];
  networks: AnchorNetwork[];
  root: string;
  status: string;
}

export interface AnchorNetwork {
  name: string;
  state: string;
  txHash: string;
  root?: string | undefined;
}

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

export interface RecordReceipt {
  anchor: number;
  client: string;
  record: string;
  status: string;
}

function createBaseAnchor(): Anchor {
  return { id: 0, blockRoots: [], networks: [], root: "", status: "" };
}

export const Anchor = {
  encode(message: Anchor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int64(message.id);
    }
    for (const v of message.blockRoots) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.networks) {
      AnchorNetwork.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.root !== "") {
      writer.uint32(34).string(message.root);
    }
    if (message.status !== "") {
      writer.uint32(42).string(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Anchor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAnchor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.blockRoots.push(reader.string());
          break;
        case 3:
          message.networks.push(AnchorNetwork.decode(reader, reader.uint32()));
          break;
        case 4:
          message.root = reader.string();
          break;
        case 5:
          message.status = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Anchor {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      blockRoots: Array.isArray(object?.blockRoots) ? object.blockRoots.map((e: any) => String(e)) : [],
      networks: Array.isArray(object?.networks) ? object.networks.map((e: any) => AnchorNetwork.fromJSON(e)) : [],
      root: isSet(object.root) ? String(object.root) : "",
      status: isSet(object.status) ? String(object.status) : "",
    };
  },

  toJSON(message: Anchor): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    if (message.blockRoots) {
      obj.blockRoots = message.blockRoots.map((e) => e);
    } else {
      obj.blockRoots = [];
    }
    if (message.networks) {
      obj.networks = message.networks.map((e) => e ? AnchorNetwork.toJSON(e) : undefined);
    } else {
      obj.networks = [];
    }
    message.root !== undefined && (obj.root = message.root);
    message.status !== undefined && (obj.status = message.status);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Anchor>, I>>(object: I): Anchor {
    const message = createBaseAnchor();
    message.id = object.id ?? 0;
    message.blockRoots = object.blockRoots?.map((e) => e) || [];
    message.networks = object.networks?.map((e) => AnchorNetwork.fromPartial(e)) || [];
    message.root = object.root ?? "";
    message.status = object.status ?? "";
    return message;
  },
};

function createBaseAnchorNetwork(): AnchorNetwork {
  return { name: "", state: "", txHash: "", root: undefined };
}

export const AnchorNetwork = {
  encode(message: AnchorNetwork, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.state !== "") {
      writer.uint32(18).string(message.state);
    }
    if (message.txHash !== "") {
      writer.uint32(26).string(message.txHash);
    }
    if (message.root !== undefined) {
      writer.uint32(34).string(message.root);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AnchorNetwork {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAnchorNetwork();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.state = reader.string();
          break;
        case 3:
          message.txHash = reader.string();
          break;
        case 4:
          message.root = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AnchorNetwork {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      state: isSet(object.state) ? String(object.state) : "",
      txHash: isSet(object.txHash) ? String(object.txHash) : "",
      root: isSet(object.root) ? String(object.root) : undefined,
    };
  },

  toJSON(message: AnchorNetwork): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.state !== undefined && (obj.state = message.state);
    message.txHash !== undefined && (obj.txHash = message.txHash);
    message.root !== undefined && (obj.root = message.root);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AnchorNetwork>, I>>(object: I): AnchorNetwork {
    const message = createBaseAnchorNetwork();
    message.name = object.name ?? "";
    message.state = object.state ?? "";
    message.txHash = object.txHash ?? "";
    message.root = object.root ?? undefined;
    return message;
  },
};

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

function createBaseRecordReceipt(): RecordReceipt {
  return { anchor: 0, client: "", record: "", status: "" };
}

export const RecordReceipt = {
  encode(message: RecordReceipt, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.anchor !== 0) {
      writer.uint32(8).int64(message.anchor);
    }
    if (message.client !== "") {
      writer.uint32(18).string(message.client);
    }
    if (message.record !== "") {
      writer.uint32(26).string(message.record);
    }
    if (message.status !== "") {
      writer.uint32(34).string(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordReceipt {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordReceipt();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.anchor = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.client = reader.string();
          break;
        case 3:
          message.record = reader.string();
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

  fromJSON(object: any): RecordReceipt {
    return {
      anchor: isSet(object.anchor) ? Number(object.anchor) : 0,
      client: isSet(object.client) ? String(object.client) : "",
      record: isSet(object.record) ? String(object.record) : "",
      status: isSet(object.status) ? String(object.status) : "",
    };
  },

  toJSON(message: RecordReceipt): unknown {
    const obj: any = {};
    message.anchor !== undefined && (obj.anchor = Math.round(message.anchor));
    message.client !== undefined && (obj.client = message.client);
    message.record !== undefined && (obj.record = message.record);
    message.status !== undefined && (obj.status = message.status);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordReceipt>, I>>(object: I): RecordReceipt {
    const message = createBaseRecordReceipt();
    message.anchor = object.anchor ?? 0;
    message.client = object.client ?? "";
    message.record = object.record ?? "";
    message.status = object.status ?? "";
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
