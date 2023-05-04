package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

public class CredentialStatus {
  private final String id;
  private final long revocationNonce;
  private final String type;

  public CredentialStatus(String id, long revocationNonce, String type) {
    this.id = id;
    this.revocationNonce = revocationNonce;
    this.type = type;
  }

  public static CredentialStatus fromProto(IdentityEntities.CredentialStatus res) {
    return new CredentialStatus(res.getId(), res.getRevocationNonce(), res.getType());
  }

  public IdentityEntities.CredentialStatus toProto() {
    return IdentityEntities.CredentialStatus.newBuilder()
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
