package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

/**
 * Represents a receipt for a credential, including the credential itself, its ID, and type.
 */
public class CredentialReceipt {
  private final Credential credential;
  private final String credentialId;
  private final String credentialType;

  /**
   * Constructs an CredentialReceipt object with the specified parameters.
   * @param credential
   * @param credentialId
   * @param credentialType
   */
  public CredentialReceipt(Credential credential, String credentialId, String credentialType) {
    this.credential = credential;
    this.credentialId = credentialId;
    this.credentialType = credentialType;
  }

  public static CredentialReceipt fromProto(IdentityEntities.CredentialReceipt res) {
    return new CredentialReceipt(
        Credential.fromProto(res.getCredential()), res.getCredentialId(), res.getCredentialType());
  }

  public IdentityEntities.CredentialReceipt toProto() {
    return IdentityEntities.CredentialReceipt.newBuilder()
        .setCredential(this.credential.toProto())
        .setCredentialId(this.credentialId)
        .setCredentialType(this.credentialType)
        .build();
  }

  /**
   * Gets the credential object.
   * @return
   */
  public Credential getCredential() {
    return credential;
  }

  /**
   * Gets the ID associated with the credential.
   * @return
   */
  public String getCredentialId() {
    return credentialId;
  }

  /**
   * Gets the type of the credential.
   * @return
   */
  public String getCredentialType() {
    return credentialType;
  }
}
