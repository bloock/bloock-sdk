import * as identityEntitiesProto from "../../bridge/proto/bloock_identity_entities";

/**
 * Represents a receipt for the issuer's state.
 */
export class IssuerStateReceipt {
  txHash: string;

  /**
   * Constructs an IssuerStateReceipt object with the specified parameters.
   * @param txHash
   */
  constructor(txHash: string) {
    this.txHash = txHash;
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
