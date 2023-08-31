package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;

public class CredentialStatus {
  private final String id;
  private final long revocationNonce;
  private final String type;

  public CredentialStatus(String id, long revocationNonce, String type) {
    this.id = id;
    this.revocationNonce = revocationNonce;
    this.type = type;
  }

  public static CredentialStatus fromProto(IdentityEntitiesV2.CredentialStatusV2 res) {
    return new CredentialStatus(res.getId(), res.getRevocationNonce(), res.getType());
  }

  public IdentityEntitiesV2.CredentialStatusV2 toProto() {
    return IdentityEntitiesV2.CredentialStatusV2.newBuilder()
        .setId(this.id)
        .setRevocationNonce(this.revocationNonce)
        .setType(this.type)
        .build();
  }

  public String getId() {
    return id;
  }

  public long getRevocationNonce() {
    return revocationNonce;
  }

  public String getType() {
    return type;
  }
}
