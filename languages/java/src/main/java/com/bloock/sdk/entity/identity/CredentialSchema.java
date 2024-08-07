package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.BloockIdentityEntities;

/**
 * Represents the schema information for a credential, including its ID and
 * type.
 */
public class CredentialSchema {
  private final String id;
  private final String type;

  /**
   * Constructs an CredentialSchema object with the specified parameters.
   * 
   * @param id
   * @param type
   */
  public CredentialSchema(String id, String type) {
    this.id = id;
    this.type = type;
  }

  public static CredentialSchema fromProto(BloockIdentityEntities.CredentialSchema res) {
    return new CredentialSchema(res.getId(), res.getType());
  }

  public BloockIdentityEntities.CredentialSchema toProto() {
    return BloockIdentityEntities.CredentialSchema.newBuilder()
        .setId(this.id)
        .setType(this.type)
        .build();
  }

  /**
   * Gets the id of the credential.
   * 
   * @return
   */
  public String getCredentialID() {
    return id;
  }

  /**
   * Gets the type of the credential.
   * 
   * @return
   */
  public String getCredentialType() {
    return type;
  }
}
