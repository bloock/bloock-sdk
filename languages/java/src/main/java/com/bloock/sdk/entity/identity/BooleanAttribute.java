package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.BloockIdentityEntities;

/**
 * Represents an attribute with a boolean value.
 */
public class BooleanAttribute extends Attribute<Boolean> {
  /**
   * Creates a new BooleanAttribute instance with the provided key and value.
   * 
   * @param id
   * @param value
   */
  public BooleanAttribute(String id, boolean value) {
    super(id, value);
  }

  public static BooleanAttribute fromProto(BloockIdentityEntities.BooleanAttribute res) {
    return new BooleanAttribute(res.getId(), res.getValue());
  }

  public BloockIdentityEntities.BooleanAttribute toProto() {
    return BloockIdentityEntities.BooleanAttribute.newBuilder()
        .setId(this.id)
        .setValue(this.value)
        .build();
  }
}
