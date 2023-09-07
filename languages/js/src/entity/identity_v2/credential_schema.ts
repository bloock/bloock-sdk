import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";

export class CredentialSchema {
  id: string;
  type: string;

  constructor(id: string, type: string) {
    this.id = id;
    this.type = type;
  }

  public toProto(): identityEntitiesProto.CredentialSchemaV2 {
    return identityEntitiesProto.CredentialSchemaV2.fromPartial({
      id: this.id,
      type: this.type
    });
  }

  static fromProto(
    r: identityEntitiesProto.CredentialSchemaV2
  ): CredentialSchema {
    return new CredentialSchema(r.id, r.type);
  }
}
