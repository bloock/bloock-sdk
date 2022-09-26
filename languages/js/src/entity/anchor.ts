import * as proto from "../bridge/proto/anchor";

export class Anchor {
  id: number;
  blockRoots: string[];
  networks: AnchorNetwork[];
  root: string;
  status: string;

  constructor(
    id: number,
    blockRoots: string[],
    networks: AnchorNetwork[],
    root: string,
    status: string
  ) {
    this.id = id;
    this.blockRoots = blockRoots;
    this.networks = networks;
    this.root = root;
    this.status = status;
  }

  static fromProto(a: proto.Anchor): Anchor {
    return new Anchor(
      a.id, a.blockRoots,
      a.networks.map((n) => AnchorNetwork.fromProto(n)),
      a.root, a.status
    );
  }
}

export class AnchorNetwork {
  name: string;
  state: string;
  txHash: string;

  constructor(name: string, state: string, txHash: string) {
    this.name = name;
    this.state = state;
    this.txHash = txHash;
  }

  static fromProto(a: proto.AnchorNetwork): AnchorNetwork {
    return new AnchorNetwork(a.name, a.state, a.txHash);
  }

  toProto(): proto.AnchorNetwork {
    return proto.AnchorNetwork.fromPartial({ name: this.name, state: this.state, txHash: this.txHash });
  }
}
