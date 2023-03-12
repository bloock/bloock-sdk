import * as identityEntitiesProto from "../../bridge/proto/identity_entities";

export class CredentialSchema {
  id: string;
  type: string;

  constructor(id: string, type: string) {
    this.id = id;
    this.type = type;
  }

  public toProto(): identityEntitiesProto.CredentialSchema {
    return identityEntitiesProto.CredentialSchema.fromPartial({
      id: this.id,
      type: this.type
    });
  }

  static fromProto(
    r: identityEntitiesProto.CredentialSchema
  ): CredentialSchema {
    return new CredentialSchema(r.id, r.type);
  }
}
