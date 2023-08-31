package com.bloock.sdk.entity.identity_v2;

public class AttributeDescriptor {
  String displayName;
  String technicalName;
  String description;
  Boolean required;

  public AttributeDescriptor(String displayName, String technicalName, String description, Boolean required) {
    this.displayName = displayName;
    this.technicalName = technicalName;
    this.description = description;
    this.required = required;
  }
}
