import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";

export class Schema {
  id: string;
  jsonLd: string;

  constructor(id: string, jsonLd: string) {
    this.id = id;
    this.jsonLd = jsonLd;
  }

  public toProto(): identityEntitiesProto.SchemaV2 {
    return identityEntitiesProto.SchemaV2.fromPartial({
      id: this.id,
      jsonLd: this.jsonLd
    });
  }

  static fromProto(r: identityEntitiesProto.SchemaV2): Schema {
    return new Schema(r.id, r.jsonLd);
  }
}
