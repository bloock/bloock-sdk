import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";

export class IssuerStateReceipt {
    txHash: string;

    constructor(txHash: string) {
        this.txHash = txHash
    }

    public toProto(): identityEntitiesProto.IssuerStateReceipt {
        return identityEntitiesProto.IssuerStateReceipt.fromPartial({
            txHash: this.txHash
        });
    }

    static fromProto(
        r: identityEntitiesProto.IssuerStateReceipt
    ): IssuerStateReceipt {
        return new IssuerStateReceipt(r.txHash);
    }
}
