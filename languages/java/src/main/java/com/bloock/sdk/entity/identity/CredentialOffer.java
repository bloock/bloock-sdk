package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.Identity;
import com.bloock.sdk.bridge.proto.IdentityEntities;
import com.bloock.sdk.bridge.proto.Shared;
import com.bloock.sdk.config.Config;

public class CredentialOffer {
  private final String thid;
  private final CredentialOfferBody body;
  private final String from;
  private final String to;

  public CredentialOffer(String thid, CredentialOfferBody body, String from, String to) {
    this.thid = thid;
    this.body = body;
    this.from = from;
    this.to = to;
  }

  public static CredentialOffer fromProto(IdentityEntities.CredentialOffer res) {
    return new CredentialOffer(
        res.getThid(), CredentialOfferBody.fromProto(res.getBody()), res.getFrom(), res.getTo());
  }

  public static CredentialOffer fromJson(String json) throws Exception {
    Bridge bridge = new Bridge();

    Identity.CredentialOfferFromJsonRequest req =
        com.bloock.sdk.bridge.proto.Identity.CredentialOfferFromJsonRequest.newBuilder()
            .setConfigData(Config.newConfigDataDefault())
            .setJson(json)
            .build();

    Identity.CredentialOfferFromJsonResponse response =
        bridge.getIdentity().credentialOfferFromJson(req);

    if (response.getError() != Shared.Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return CredentialOffer.fromProto(response.getCredentialOffer());
  }

  public IdentityEntities.CredentialOffer toProto() {
    return IdentityEntities.CredentialOffer.newBuilder()
        .setThid(this.thid)
        .setBody(this.body.toProto())
        .setFrom(this.from)
        .setTo(this.to)
        .build();
  }

  public String toJson() throws Exception {
    Bridge bridge = new Bridge();

    Identity.CredentialOfferToJsonRequest req =
        com.bloock.sdk.bridge.proto.Identity.CredentialOfferToJsonRequest.newBuilder()
            .setConfigData(Config.newConfigDataDefault())
            .setCredentialOffer(this.toProto())
            .build();

    Identity.CredentialOfferToJsonResponse response =
        bridge.getIdentity().credentialOfferToJson(req);

    if (response.getError() != Shared.Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getJson();
  }

  public String getThid() {
    return thid;
  }

  public CredentialOfferBody getBody() {
    return body;
  }

  public String getFrom() {
    return from;
  }

  public String getTo() {
    return to;
  }
}
