import * as proto from "../../bridge/proto/integrity_entities";

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
    return proto.AnchorNetwork.fromPartial({
      name: this.name,
      state: this.state,
      txHash: this.txHash
    });
  }
}
