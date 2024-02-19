import * as identityEntitiesProto from "../../bridge/proto/identity_entities";

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

  public toProto(): identityEntitiesProto.Schema {
    return identityEntitiesProto.Schema.fromPartial({
      cid: this.cid,
      cidJsonLd: this.cidJsonLd,
      schemaType: this.schemaType,
      json: this.json
    });
  }

  static fromProto(r: identityEntitiesProto.Schema): Schema {
    return new Schema(r.cid, r.cidJsonLd, r.schemaType, r.json);
  }
}
