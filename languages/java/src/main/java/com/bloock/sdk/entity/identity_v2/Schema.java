package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;

public class Schema {
  private final String cid;
  private final String cidJsonLD;
  private final String schemaType;
  private final String json;

  public Schema(String cid, String cidJsonLD, String schemaType, String json) {
    this.cid = cid;
    this.cidJsonLD = cidJsonLD;
    this.schemaType = schemaType;
    this.json = json;
  }

  public static Schema fromProto(IdentityEntitiesV2.SchemaV2 res) {
    return new Schema(res.getCid(), res.getCidJsonLd(), res.getSchemaType(), res.getJson());
  }

  public IdentityEntitiesV2.SchemaV2 toProto() {
    return IdentityEntitiesV2.SchemaV2.newBuilder().setCid(this.cid).setCidJsonLd(this.cidJsonLD).setSchemaType(this.schemaType).setJson(this.json).build();
  }

  public String getCid() {
    return cid;
  }

  public String getCidJsonLD() {
    return cidJsonLD;
  }

  public String getSchemaType() {
    return schemaType;
  }

  public String getJson() {
    return json;
  }
}
