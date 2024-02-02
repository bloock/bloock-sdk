package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;

/**
 * Represents the schema information for a credential, including its ID and type.
 */
public class CredentialSchema {
  private final String id;
  private final String type;

  /**
   * Constructs an CredentialSchema object with the specified parameters.
   * @param id
   * @param type
   */
  public CredentialSchema(String id, String type) {
    this.id = id;
    this.type = type;
  }

  public static CredentialSchema fromProto(IdentityEntitiesV2.CredentialSchemaV2 res) {
    return new CredentialSchema(res.getId(), res.getType());
  }

  public IdentityEntitiesV2.CredentialSchemaV2 toProto() {
    return IdentityEntitiesV2.CredentialSchemaV2.newBuilder()
        .setId(this.id)
        .setType(this.type)
        .build();
  }

  /**
   * Gets the type of the credential.
   * @return
   */
  public String getCredentialType() {
    return type;
  }
}
