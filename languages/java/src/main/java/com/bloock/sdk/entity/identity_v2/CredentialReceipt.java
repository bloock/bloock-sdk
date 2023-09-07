package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;

public class CredentialReceipt {
  private final Credential credential;
  private final String credentialId;
  private final String credentialType;
  private final long anchorId;

  public CredentialReceipt(
      Credential credential, String credentialId, String credentialType, long anchorId) {
    this.credential = credential;
    this.credentialId = credentialId;
    this.credentialType = credentialType;
    this.anchorId = anchorId;
  }

  public static CredentialReceipt fromProto(IdentityEntitiesV2.CredentialReceiptV2 res) {
    return new CredentialReceipt(
        Credential.fromProto(res.getCredential()),
        res.getCredentialId(),
        res.getCredentialType(),
        res.getAnchorId());
  }

  public IdentityEntitiesV2.CredentialReceiptV2 toProto() {
    return IdentityEntitiesV2.CredentialReceiptV2.newBuilder()
        .setCredential(this.credential.toProto())
        .setCredentialId(this.credentialId)
        .setCredentialType(this.credentialType)
        .setAnchorId(this.anchorId)
        .build();
  }

  public Credential getCredential() {
    return credential;
  }

  public String getCredentialId() {
    return credentialId;
  }

  public String getCredentialType() {
    return credentialType;
  }

  public long getAnchorId() {
    return anchorId;
  }
}
