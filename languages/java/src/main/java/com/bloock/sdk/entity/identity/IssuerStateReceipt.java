package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.BloockIdentityEntities;

/**
 * Represents a receipt for the issuer's state.
 */
public class IssuerStateReceipt {
  private final String txHash;

  /**
   * Constructs an IssuerStateReceipt object with the specified parameters.
   * 
   * @param txHash
   */
  public IssuerStateReceipt(String txHash) {
    this.txHash = txHash;
  }

  public static IssuerStateReceipt fromProto(BloockIdentityEntities.IssuerStateReceipt res) {
    return new IssuerStateReceipt(res.getTxHash());
  }

  public BloockIdentityEntities.IssuerStateReceipt toProto() {
    return BloockIdentityEntities.IssuerStateReceipt.newBuilder().setTxHash(this.txHash).build();
  }

  /**
   * Gets the transaction hash of the issuer state receipt.
   * 
   * @return
   */
  public String getTxHash() {
    return txHash;
  }
}
