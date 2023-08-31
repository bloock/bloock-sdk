package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.AuthenticityEntities;
import com.bloock.sdk.bridge.proto.Config;
import com.bloock.sdk.bridge.proto.IdentityV2;
import com.bloock.sdk.bridge.proto.Shared;

public class IssuerStatePublisher {
  private final String issuerDid;
  private AuthenticityEntities.Signer signer;
  private final Config.ConfigData configData;

  public IssuerStatePublisher(String issuerDid, Config.ConfigData configData) {
    this.issuerDid = issuerDid;
    this.configData = configData;
    this.signer = null;
  }

  public IssuerStatePublisher withSigner(com.bloock.sdk.entity.authenticity.Signer signer) {
    this.signer = signer.toProto();
    return this;
  }

  public IssuerStateReceipt build() throws Exception {
    Bridge bridge = new Bridge();

    IdentityV2.PublishIssuerStateRequest req = IdentityV2.PublishIssuerStateRequest.newBuilder()
        .setConfigData(this.configData)
        .setIssuerDid(this.issuerDid)
        .setSigner(this.signer)
        .build();

    IdentityV2.PublishIssuerStateResponse response = bridge.getIdentityV2().publishIssuerState(req);

    if (response.getError() != Shared.Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return IssuerStateReceipt.fromProto(response.getStateReceipt());
  }
}
