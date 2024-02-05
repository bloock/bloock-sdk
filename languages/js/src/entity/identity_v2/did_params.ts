import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";
import { NetworkId } from "./network";
import { Blockchain } from "./blockchain";
import { Method } from "./method";

/**
 * Represents parameters used for generating DIDs.
 */
export class DidParams {
  method: Method;
  blockchain: Blockchain;
  network: NetworkId;

  /**
   * Constructs a DidParams object with the specified parameters.
   * @param method 
   * @param blockchain 
   * @param network 
   */
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
