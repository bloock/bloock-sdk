import {AnchorNetwork as AnchorNetworkProto} from '../bridge/proto/anchor';

export class AnchorNetwork {
  name: string;
  state: string;
  txHash: string;

  constructor(name: string, state: string, txHash: string) {
    this.name = name;
    this.state = state;
    this.txHash = txHash;
  }

  static fromProto(a: AnchorNetworkProto): AnchorNetwork {
    return new AnchorNetwork(a.name, a.state, a.txHash);
  }

  toProto(): AnchorNetworkProto {
    return AnchorNetworkProto.fromPartial({
      name: this.name,
      state: this.state,
      txHash: this.txHash,
    });
  }
}
