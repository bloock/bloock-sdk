package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;

public class StringAttribute extends Attribute<String> {
  public StringAttribute(String id, String value) {
    super(id, value);
  }

  public static StringAttribute fromProto(IdentityEntitiesV2.StringAttributeV2 res) {
    return new StringAttribute(res.getId(), res.getValue());
  }

  public IdentityEntitiesV2.StringAttributeV2 toProto() {
    return IdentityEntitiesV2.StringAttributeV2.newBuilder()
        .setId(this.id)
        .setValue(this.value)
        .build();
  }
}
