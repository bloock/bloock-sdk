package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

/**
 * Represents an attribute with a string value.
 */
public class StringAttribute extends Attribute<String> {
  /**
   * Creates a new StringAttribute instance with the provided key and value.
   * @param id
   * @param value
   */
  public StringAttribute(String id, String value) {
    super(id, value);
  }

  public static StringAttribute fromProto(IdentityEntities.StringAttribute res) {
    return new StringAttribute(res.getId(), res.getValue());
  }

  public IdentityEntities.StringAttribute toProto() {
    return IdentityEntities.StringAttribute.newBuilder()
        .setId(this.id)
        .setValue(this.value)
        .build();
  }
}
