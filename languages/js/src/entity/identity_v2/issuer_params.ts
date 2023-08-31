import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";
import { NetworkId } from "./network";
import { Blockchain } from "./blockchain";
import { Method } from "./method";

export class IssuerParams {
    method: Method;
    blockchain: Blockchain;
    network: NetworkId;

    constructor(method: Method, blockchain: Blockchain, network: NetworkId) {
        this.method = method
        this.blockchain = blockchain
        this.network = network
    }

    public toProto(): identityEntitiesProto.IssuerParams {
        return identityEntitiesProto.IssuerParams.fromPartial({
            method: this.method,
            blockchain: this.blockchain,
            networkId: this.network
        });
    }
}