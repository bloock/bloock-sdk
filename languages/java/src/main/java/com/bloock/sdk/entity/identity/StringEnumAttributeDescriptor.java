package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.BloockIdentityEntities;
import java.util.List;

/**
 * Represents a descriptor for an attribute with a string enum value.
 */
public class StringEnumAttributeDescriptor extends AttributeDescriptor {
  private List<String> enumeration;

  /**
   * Constructs an StringEnumAttributeDescriptor object with the specified
   * parameters.
   * 
   * @param displayName
   * @param technicalName
   * @param description
   * @param required
   * @param enumeration
   */
  public StringEnumAttributeDescriptor(
      String displayName,
      String technicalName,
      String description,
      Boolean required,
      List<String> enumeration) {
    super(displayName, technicalName, description, required);
    this.enumeration = enumeration;
  }

  public static StringEnumAttributeDescriptor fromProto(
      BloockIdentityEntities.StringEnumAttributeDefinition res) {
    return new StringEnumAttributeDescriptor(
        res.getDisplayName(),
        res.getId(),
        res.getDescription(),
        res.getRequired(),
        res.getEnumList());
  }

  public BloockIdentityEntities.StringEnumAttributeDefinition toProto() {
    return BloockIdentityEntities.StringEnumAttributeDefinition.newBuilder()
        .setDisplayName(this.displayName)
        .setId(this.technicalName)
        .setDescription(this.description)
        .setRequired(this.required)
        .addAllEnum(this.enumeration)
        .build();
  }
}
