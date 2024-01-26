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
  anchor?: ProofAnchor | undefined;
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAnchor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.blockRoots.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.networks.push(AnchorNetwork.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.root = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.status = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Anchor {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      blockRoots: globalThis.Array.isArray(object?.blockRoots)
        ? object.blockRoots.map((e: any) => globalThis.String(e))
        : [],
      networks: globalThis.Array.isArray(object?.networks)
        ? object.networks.map((e: any) => AnchorNetwork.fromJSON(e))
        : [],
      root: isSet(object.root) ? globalThis.String(object.root) : "",
      status: isSet(object.status) ? globalThis.String(object.status) : "",
    };
  },

  toJSON(message: Anchor): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.blockRoots?.length) {
      obj.blockRoots = message.blockRoots;
    }
    if (message.networks?.length) {
      obj.networks = message.networks.map((e) => AnchorNetwork.toJSON(e));
    }
    if (message.root !== "") {
      obj.root = message.root;
    }
    if (message.status !== "") {
      obj.status = message.status;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Anchor>, I>>(base?: I): Anchor {
    return Anchor.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAnchorNetwork();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.state = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.txHash = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.root = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AnchorNetwork {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      state: isSet(object.state) ? globalThis.String(object.state) : "",
      txHash: isSet(object.txHash) ? globalThis.String(object.txHash) : "",
      root: isSet(object.root) ? globalThis.String(object.root) : undefined,
    };
  },

  toJSON(message: AnchorNetwork): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.state !== "") {
      obj.state = message.state;
    }
    if (message.txHash !== "") {
      obj.txHash = message.txHash;
    }
    if (message.root !== undefined) {
      obj.root = message.root;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AnchorNetwork>, I>>(base?: I): AnchorNetwork {
    return AnchorNetwork.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProof();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.leaves.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.nodes.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.depth = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.bitmap = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.anchor = ProofAnchor.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Proof {
    return {
      leaves: globalThis.Array.isArray(object?.leaves) ? object.leaves.map((e: any) => globalThis.String(e)) : [],
      nodes: globalThis.Array.isArray(object?.nodes) ? object.nodes.map((e: any) => globalThis.String(e)) : [],
      depth: isSet(object.depth) ? globalThis.String(object.depth) : "",
      bitmap: isSet(object.bitmap) ? globalThis.String(object.bitmap) : "",
      anchor: isSet(object.anchor) ? ProofAnchor.fromJSON(object.anchor) : undefined,
    };
  },

  toJSON(message: Proof): unknown {
    const obj: any = {};
    if (message.leaves?.length) {
      obj.leaves = message.leaves;
    }
    if (message.nodes?.length) {
      obj.nodes = message.nodes;
    }
    if (message.depth !== "") {
      obj.depth = message.depth;
    }
    if (message.bitmap !== "") {
      obj.bitmap = message.bitmap;
    }
    if (message.anchor !== undefined) {
      obj.anchor = ProofAnchor.toJSON(message.anchor);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Proof>, I>>(base?: I): Proof {
    return Proof.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProofAnchor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.anchorId = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.networks.push(AnchorNetwork.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.root = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.status = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProofAnchor {
    return {
      anchorId: isSet(object.anchorId) ? globalThis.Number(object.anchorId) : 0,
      networks: globalThis.Array.isArray(object?.networks)
        ? object.networks.map((e: any) => AnchorNetwork.fromJSON(e))
        : [],
      root: isSet(object.root) ? globalThis.String(object.root) : "",
      status: isSet(object.status) ? globalThis.String(object.status) : "",
    };
  },

  toJSON(message: ProofAnchor): unknown {
    const obj: any = {};
    if (message.anchorId !== 0) {
      obj.anchorId = Math.round(message.anchorId);
    }
    if (message.networks?.length) {
      obj.networks = message.networks.map((e) => AnchorNetwork.toJSON(e));
    }
    if (message.root !== "") {
      obj.root = message.root;
    }
    if (message.status !== "") {
      obj.status = message.status;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProofAnchor>, I>>(base?: I): ProofAnchor {
    return ProofAnchor.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordReceipt();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.anchor = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.client = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.record = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.status = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RecordReceipt {
    return {
      anchor: isSet(object.anchor) ? globalThis.Number(object.anchor) : 0,
      client: isSet(object.client) ? globalThis.String(object.client) : "",
      record: isSet(object.record) ? globalThis.String(object.record) : "",
      status: isSet(object.status) ? globalThis.String(object.status) : "",
    };
  },

  toJSON(message: RecordReceipt): unknown {
    const obj: any = {};
    if (message.anchor !== 0) {
      obj.anchor = Math.round(message.anchor);
    }
    if (message.client !== "") {
      obj.client = message.client;
    }
    if (message.record !== "") {
      obj.record = message.record;
    }
    if (message.status !== "") {
      obj.status = message.status;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RecordReceipt>, I>>(base?: I): RecordReceipt {
    return RecordReceipt.fromPartial(base ?? ({} as any));
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
