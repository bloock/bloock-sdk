import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";

export class Schema {
  cid: string;
  cidJsonLd: string;
  json: string;

  constructor(cid: string, cidJsonLd: string, json: string) {
    this.cid = cid;
    this.cidJsonLd = cidJsonLd;
    this.json = json;
  }

  public toProto(): identityEntitiesProto.SchemaV2 {
    return identityEntitiesProto.SchemaV2.fromPartial({
      cid: this.cid,
      cidJsonLd: this.cidJsonLd,
      json: this.json
    });
  }

  static fromProto(r: identityEntitiesProto.SchemaV2): Schema {
    return new Schema(r.cid, r.cidJsonLd, r.json);
  }
}
