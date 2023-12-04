import * as proto from "../../bridge/proto/integrity_entities";

export class AnchorNetwork {
  name: string;
  state: string;
  txHash: string;
  root?: string;

  constructor(name: string, state: string, txHash: string, root?: string) {
    this.name = name;
    this.state = state;
    this.txHash = txHash;
    this.root = root;
  }

  static fromProto(a: proto.AnchorNetwork): AnchorNetwork {
    return new AnchorNetwork(a.name, a.state, a.txHash, a.root);
  }

  toProto(): proto.AnchorNetwork {
    return proto.AnchorNetwork.fromPartial({
      name: this.name,
      state: this.state,
      txHash: this.txHash,
      root: this.root
    });
  }
}
