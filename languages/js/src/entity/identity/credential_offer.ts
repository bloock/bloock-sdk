import * as identityEntitiesProto from "../../bridge/proto/identity_entities";
import { CredentialOfferBody } from "./credential_offer_body";

export class CredentialOffer {
  id: string;
  typ: string;
  type: string;
  thid: string;
  body: CredentialOfferBody;
  from: string;
  to: string;

  constructor(
    id: string,
    typ: string,
    type: string,
    thid: string,
    body: CredentialOfferBody,
    from: string,
    to: string
  ) {
    this.id = id;
    this.typ = typ;
    this.type = type;
    this.thid = thid;
    this.body = body;
    this.from = from;
    this.to = to;
  }

  public toProto(): identityEntitiesProto.CredentialOffer {
    return identityEntitiesProto.CredentialOffer.fromPartial({
      id: this.id,
      typ: this.typ,
      type: this.type,
      thid: this.thid,
      body: this.body.toProto(),
      from: this.from,
      to: this.to
    });
  }

  static fromProto(r: identityEntitiesProto.CredentialOffer): CredentialOffer {
    return new CredentialOffer(
      r.id,
      r.typ,
      r.type,
      r.thid,
      CredentialOfferBody.fromProto(r.body!),
      r.from,
      r.to
    );
  }
}
