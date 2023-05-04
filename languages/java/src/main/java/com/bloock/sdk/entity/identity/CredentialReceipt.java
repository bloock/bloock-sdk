package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

public class CredentialReceipt {
  private final String id;
  private final long anchorId;

  public CredentialReceipt(String id, long anchorId) {
    this.id = id;
    this.anchorId = anchorId;
  }

  public static CredentialReceipt fromProto(IdentityEntities.CredentialReceipt res) {
    return new CredentialReceipt(res.getId(), res.getAnchorId());
  }

  public IdentityEntities.CredentialReceipt toProto() {
    return IdentityEntities.CredentialReceipt.newBuilder()
        .setId(this.id)
        .setAnchorId(this.anchorId)
        .build();
  }

  public String getId() {
    return id;
  }

  public long getAnchorId() {
    return anchorId;
  }
}
