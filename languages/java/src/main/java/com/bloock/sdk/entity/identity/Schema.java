package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

/**
 * Represents a schema with its attributes.
 */
public class Schema {
  private final String cid;
  private final String cidJsonLD;
  private final String schemaType;
  private final String json;

  /**
   * Constructs a Schema object with the specified parameters.
   * @param cid
   * @param cidJsonLD
   * @param schemaType
   * @param json
   */
  public Schema(String cid, String cidJsonLD, String schemaType, String json) {
    this.cid = cid;
    this.cidJsonLD = cidJsonLD;
    this.schemaType = schemaType;
    this.json = json;
  }

  public static Schema fromProto(IdentityEntities.Schema res) {
    return new Schema(res.getCid(), res.getCidJsonLd(), res.getSchemaType(), res.getJson());
  }

  public IdentityEntities.Schema toProto() {
    return IdentityEntities.Schema.newBuilder()
        .setCid(this.cid)
        .setCidJsonLd(this.cidJsonLD)
        .setSchemaType(this.schemaType)
        .setJson(this.json)
        .build();
  }

  /**
   * Gets the cid of the schema.
   * @return
   */
  public String getCid() {
    return cid;
  }

  /**
   * Gets de cid json-ld of the schema.
   * @return
   */
  public String getCidJsonLD() {
    return cidJsonLD;
  }

  /**
   * Gets the schema type of the schema.
   * @return
   */
  public String getSchemaType() {
    return schemaType;
  }

  /**
   * Gets the json representation of the schema.
   * @return
   */
  public String getJson() {
    return json;
  }
}
