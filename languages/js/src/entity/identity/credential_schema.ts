import * as identityEntitiesProto from "../../bridge/proto/identity_entities";

/**
 * Represents the schema information for a credential, including its ID and type.
 */
export class CredentialSchema {
  id: string;
  type: string;

  /**
   * Constructs an CredentialSchema object with the specified parameters.
   * @param id 
   * @param type 
   */
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
