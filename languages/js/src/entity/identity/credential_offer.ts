import * as identityEntitiesProto from "../../bridge/proto/identity_entities";

export class CredentialOffer {
  json: string;

  constructor(json: string) {
    this.json = json;
  }

  public toJSON(): string {
    return this.json;
  }

  static fromJSON(json: string): CredentialOffer {
    return new CredentialOffer(json);
  }

  public toProto(): identityEntitiesProto.CredentialOffer {
    return identityEntitiesProto.CredentialOffer.fromPartial({
      json: this.json
    });
  }

  static fromProto(r: identityEntitiesProto.CredentialOffer): CredentialOffer {
    return new CredentialOffer(r.json);
  }
}
