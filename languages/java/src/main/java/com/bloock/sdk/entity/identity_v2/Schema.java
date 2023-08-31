package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;

public class Schema {
  private final String id;
  private final String json;

  public Schema(String id, String json) {
    this.id = id;
    this.json = json;
  }

  public static Schema fromProto(IdentityEntitiesV2.SchemaV2 res) {
    return new Schema(res.getId(), res.getJsonLd());
  }

  public IdentityEntitiesV2.SchemaV2 toProto() {
    return IdentityEntitiesV2.SchemaV2.newBuilder().setId(this.id).setJsonLd(this.json).build();
  }

  public String getId() {
    return id;
  }

  public String getJson() {
    return json;
  }
}
