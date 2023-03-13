import * as identityEntitiesProto from "../../bridge/proto/identity_entities";
import { CredentialOfferBodyCredentials } from "./credential_offer_credentials";

export class CredentialOfferBody {
  url: string;
  credentials: CredentialOfferBodyCredentials[];

  constructor(url: string, credentials: CredentialOfferBodyCredentials[]) {
    this.url = url;
    this.credentials = credentials;
  }

  public toProto(): identityEntitiesProto.CredentialOfferBody {
    return identityEntitiesProto.CredentialOfferBody.fromPartial({
      url: this.url,
      credentials: this.credentials.map(c => c.toProto())
    });
  }

  static fromProto(
    r: identityEntitiesProto.CredentialOfferBody
  ): CredentialOfferBody {
    return new CredentialOfferBody(
      r.url,
      r.credentials.map(c => CredentialOfferBodyCredentials.fromProto(c))
    );
  }
}
