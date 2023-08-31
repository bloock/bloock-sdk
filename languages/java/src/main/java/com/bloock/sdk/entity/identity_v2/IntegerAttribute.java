package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;

public class IntegerAttribute extends Attribute<Long> {
  public IntegerAttribute(String id, Long value) {
    super(id, value);
  }

  public static IntegerAttribute fromProto(IdentityEntitiesV2.IntegerAttributeV2 res) {
    return new IntegerAttribute(res.getId(), res.getValue());
  }

  public IdentityEntitiesV2.IntegerAttributeV2 toProto() {
    return IdentityEntitiesV2.IntegerAttributeV2.newBuilder()
        .setId(this.id)
        .setValue(this.value)
        .build();
  }
}
