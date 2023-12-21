import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";
import { NetworkId } from "./network";
import { Blockchain } from "./blockchain";
import { Method } from "./method";

export class DidParams {
  method: Method;
  blockchain: Blockchain;
  network: NetworkId;

  constructor(method: Method, blockchain: Blockchain, network: NetworkId) {
    this.method = method;
    this.blockchain = blockchain;
    this.network = network;
  }

  public toProto(): identityEntitiesProto.DidParams {
    return identityEntitiesProto.DidParams.fromPartial({
      method: Method.toProto(this.method),
      blockchain: Blockchain.toProto(this.blockchain),
      networkId: NetworkId.toProto(this.network)
    });
  }
}
