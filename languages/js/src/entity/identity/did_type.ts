import * as identityEntitiesProto from "../../bridge/proto/identity_entities";
import { NetworkId } from "./network";
import { Blockchain } from "./blockchain";
import { Method } from "./method";

/**
 * Represents parameters used for generating DIDs.
 */
export class DidType {
  method: Method;
  blockchain: Blockchain;
  network: NetworkId;

  /**
   * Constructs a DidType object with the specified parameters.
   * @param method 
   * @param blockchain 
   * @param network 
   */
  constructor(method: Method, blockchain: Blockchain, network: NetworkId) {
    this.method = method;
    this.blockchain = blockchain;
    this.network = network;
  }

  public toProto(): identityEntitiesProto.DidType {
    return identityEntitiesProto.DidType.fromPartial({
      method: Method.toProto(this.method),
      blockchain: Blockchain.toProto(this.blockchain),
      networkId: NetworkId.toProto(this.network)
    });
  }
}
