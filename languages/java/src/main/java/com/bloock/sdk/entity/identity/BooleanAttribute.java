package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

public class BooleanAttribute extends Attribute<Boolean> {
  public BooleanAttribute(String id, boolean value) {
    super(id, value);
  }

  public static BooleanAttribute fromProto(IdentityEntities.BooleanAttribute res) {
    return new BooleanAttribute(res.getId(), res.getValue());
  }

  public IdentityEntities.BooleanAttribute toProto() {
    return IdentityEntities.BooleanAttribute.newBuilder()
        .setId(this.id)
        .setValue(this.value)
        .build();
  }
}
