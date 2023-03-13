import { BloockBridge } from "../../bridge/bridge";
import {
  CredentialOfferToJsonRequest,
  CredentialOfferFromJsonRequest
} from "../../bridge/proto/identity";
import * as identityEntitiesProto from "../../bridge/proto/identity_entities";
import { NewConfigData } from "../../config/config";
import { CredentialOfferBody } from "./credential_offer_body";

export class CredentialOffer {
  thid: string;
  body: CredentialOfferBody;
  from: string;
  to: string;

  constructor(
    thid: string,
    body: CredentialOfferBody,
    from: string,
    to: string
  ) {
    this.thid = thid;
    this.body = body;
    this.from = from;
    this.to = to;
  }

  public toProto(): identityEntitiesProto.CredentialOffer {
    return identityEntitiesProto.CredentialOffer.fromPartial({
      thid: this.thid,
      body: this.body.toProto(),
      From: this.from,
      To: this.to
    });
  }

  static fromProto(r: identityEntitiesProto.CredentialOffer): CredentialOffer {
    return new CredentialOffer(
      r.thid,
      CredentialOfferBody.fromProto(r.body!),
      r.From,
      r.To
    );
  }

  public toJson(): Promise<string> {
    const bridge = new BloockBridge();

    const req = CredentialOfferToJsonRequest.fromPartial({
      configData: NewConfigData(undefined),
      credentialOffer: this.toProto()
    });

    return bridge
      .getIdentity()
      .CredentialOfferToJson(req)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return res.json;
      });
  }

  static fromJson(json: string): Promise<CredentialOffer> {
    const bridge = new BloockBridge();

    const req = CredentialOfferFromJsonRequest.fromPartial({
      configData: NewConfigData(undefined),
      json: json
    });

    return bridge
      .getIdentity()
      .CredentialOfferFromJson(req)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return CredentialOffer.fromProto(res.credentialOffer!);
      });
  }
}
