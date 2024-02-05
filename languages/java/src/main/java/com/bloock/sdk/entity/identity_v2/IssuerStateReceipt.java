package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;

/**
 * Represents a receipt for the issuer's state.
 */
public class IssuerStateReceipt {
  private final String txHash;

  /**
   * Constructs an IssuerStateReceipt object with the specified parameters.
   * @param txHash
   */
  public IssuerStateReceipt(String txHash) {
    this.txHash = txHash;
  }

  public static IssuerStateReceipt fromProto(IdentityEntitiesV2.IssuerStateReceipt res) {
    return new IssuerStateReceipt(res.getTxHash());
  }

  public IdentityEntitiesV2.IssuerStateReceipt toProto() {
    return IdentityEntitiesV2.IssuerStateReceipt.newBuilder().setTxHash(this.txHash).build();
  }

  /**
   * Gets the transaction hash of the issuer state receipt.
   * @return
   */
  public String getTxHash() {
    return txHash;
  }
}
