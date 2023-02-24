import * as identityEntitiesProto from "../bridge/proto/identity_entities";

export class Schema {
  id: string;
  jsonLd: string;

  constructor(id: string, jsonLd: string) {
    this.id = id;
    this.jsonLd = jsonLd;
  }

  public toProto(): identityEntitiesProto.Schema {
    return identityEntitiesProto.Schema.fromPartial({
      id: this.id,
      jsonLd: this.jsonLd
    });
  }

  static fromProto(r: identityEntitiesProto.Schema): Schema {
    return new Schema(r.id, r.jsonLd);
  }
}
