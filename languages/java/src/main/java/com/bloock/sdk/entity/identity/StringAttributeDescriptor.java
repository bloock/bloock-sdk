package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.BloockIdentityEntities;

/**
 * Represents a descriptor for an attribute with a string value.
 */
public class StringAttributeDescriptor extends AttributeDescriptor {

  /**
   * Constructs an StringAttributeDescriptor object with the specified parameters.
   * 
   * @param displayName
   * @param technicalName
   * @param description
   * @param required
   */
  public StringAttributeDescriptor(
      String displayName, String technicalName, String description, Boolean required) {
    super(displayName, technicalName, description, required);
  }

  public static StringAttributeDescriptor fromProto(
      BloockIdentityEntities.StringAttributeDefinition res) {
    return new StringAttributeDescriptor(
        res.getDisplayName(), res.getId(), res.getDescription(), res.getRequired());
  }

  public BloockIdentityEntities.StringAttributeDefinition toProto() {
    return BloockIdentityEntities.StringAttributeDefinition.newBuilder()
        .setDisplayName(this.displayName)
        .setId(this.technicalName)
        .setDescription(this.description)
        .setRequired(this.required)
        .build();
  }
}
