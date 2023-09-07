package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;

public class IssuerStateReceipt {
  private final String txHash;

  public IssuerStateReceipt(String txHash) {
    this.txHash = txHash;
  }

  public static IssuerStateReceipt fromProto(IdentityEntitiesV2.IssuerStateReceipt res) {
    return new IssuerStateReceipt(res.getTxHash());
  }

  public IdentityEntitiesV2.IssuerStateReceipt toProto() {
    return IdentityEntitiesV2.IssuerStateReceipt.newBuilder().setTxHash(this.txHash).build();
  }

  public String getTxHash() {
    return txHash;
  }
}
