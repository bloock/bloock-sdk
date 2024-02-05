import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";

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
