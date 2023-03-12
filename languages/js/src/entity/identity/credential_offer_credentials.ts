import * as identityEntitiesProto from "../../bridge/proto/identity_entities";

export class CredentialOfferBodyCredentials {
  id: string;
  description: string;

  constructor(id: string, description: string) {
    this.id = id;
    this.description = description;
  }

  public toProto(): identityEntitiesProto.CredentialOfferBodyCredentials {
    return identityEntitiesProto.CredentialOfferBodyCredentials.fromPartial({
      id: this.id,
      description: this.description
    });
  }

  static fromProto(
    r: identityEntitiesProto.CredentialOfferBodyCredentials
  ): CredentialOfferBodyCredentials {
    return new CredentialOfferBodyCredentials(r.id, r.description);
  }
}
