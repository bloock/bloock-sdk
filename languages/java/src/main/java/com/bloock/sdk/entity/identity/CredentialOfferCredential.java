package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

public class CredentialOfferCredential {
  private final String id;
  private final String description;

  public CredentialOfferCredential(String id, String description) {
    this.id = id;
    this.description = description;
  }

  public static CredentialOfferCredential fromProto(
      IdentityEntities.CredentialOfferBodyCredentials res) {
    return new CredentialOfferCredential(res.getId(), res.getDescription());
  }

  public IdentityEntities.CredentialOfferBodyCredentials toProto() {
    return IdentityEntities.CredentialOfferBodyCredentials.newBuilder()
        .setId(this.id)
        .setDescription(this.description)
        .build();
  }

  public String getId() {
    return id;
  }

  public String getDescription() {
    return description;
  }
}
