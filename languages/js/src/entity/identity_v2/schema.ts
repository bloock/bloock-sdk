import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";

/**
 * Represents a schema with its attributes.
 */
export class Schema {
  cid: string;
  cidJsonLd: string;
  schemaType: string;
  json: string;

  /**
   * Constructs a Schema object with the specified parameters.
   * @param cid 
   * @param cidJsonLd 
   * @param schemaType 
   * @param json 
   */
  constructor(
    cid: string,
    cidJsonLd: string,
    schemaType: string,
    json: string
  ) {
    this.cid = cid;
    this.cidJsonLd = cidJsonLd;
    this.schemaType = schemaType;
    this.json = json;
  }

  public toProto(): identityEntitiesProto.SchemaV2 {
    return identityEntitiesProto.SchemaV2.fromPartial({
      cid: this.cid,
      cidJsonLd: this.cidJsonLd,
      schemaType: this.schemaType,
      json: this.json
    });
  }

  static fromProto(r: identityEntitiesProto.SchemaV2): Schema {
    return new Schema(r.cid, r.cidJsonLd, r.schemaType, r.json);
  }
}
