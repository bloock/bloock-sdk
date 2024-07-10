package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.BloockIdentityEntities;

/**
 * Represents the status information for a credential, including its ID,
 * revocation nonce, and type.
 */
public class CredentialStatus {
  private final String id;
  private final long revocationNonce;
  private final String type;

  /**
   * Constructs an CredentialStatus object with the specified parameters.
   * 
   * @param id
   * @param revocationNonce
   * @param type
   */
  public CredentialStatus(String id, long revocationNonce, String type) {
    this.id = id;
    this.revocationNonce = revocationNonce;
    this.type = type;
  }

  public static CredentialStatus fromProto(BloockIdentityEntities.CredentialStatus res) {
    return new CredentialStatus(res.getId(), res.getRevocationNonce(), res.getType());
  }

  public BloockIdentityEntities.CredentialStatus toProto() {
    return BloockIdentityEntities.CredentialStatus.newBuilder()
        .setId(this.id)
        .setRevocationNonce(this.revocationNonce)
        .setType(this.type)
        .build();
  }

  /**
   * Gets the ID associated with the credential.
   * 
   * @return
   */
  public String getId() {
    return id;
  }

  /**
   * Gets the revocation nonce associated with the credential.
   * 
   * @return
   */
  public long getRevocationNonce() {
    return revocationNonce;
  }

  /**
   * Gets the type of the credential.
   * 
   * @return
   */
  public String getType() {
    return type;
  }
}
