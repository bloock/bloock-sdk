package com.bloock.sdk.entity.identity;

/**
 * Represents a descriptor for an attribute.
 */
public class AttributeDescriptor {
  /**
   * Is the human-readable display name of the attribute.
   */
  String displayName;
  /**
   * Is the identifier for the attribute.
   */
  String technicalName;
  /**
   * Is a description providing additional information about the attribute.
   */
  String description;
  /**
   * Specifies whether the attribute is required.
   */
  Boolean required;

  /**
   * Constructs an AttributeDescriptor object with the specified parameters.
   * @param displayName
   * @param technicalName
   * @param description
   * @param required
   */
  public AttributeDescriptor(
      String displayName, String technicalName, String description, Boolean required) {
    this.displayName = displayName;
    this.technicalName = technicalName;
    this.description = description;
    this.required = required;
  }
}
