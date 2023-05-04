package com.bloock.sdk.client;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.Config.ConfigData;
import com.bloock.sdk.bridge.proto.Shared.Error;
import com.bloock.sdk.bridge.proto.Webhook.VerifyWebhookSignatureRequest;
import com.bloock.sdk.bridge.proto.Webhook.VerifyWebhookSignatureResponse;
import com.bloock.sdk.config.Config;
import com.google.protobuf.ByteString;

public class WebhookClient {
  private final Bridge bridge;
  private final ConfigData configData;

  public WebhookClient() {
    this.bridge = new Bridge();
    this.configData = Config.newConfigDataDefault();
  }

  public WebhookClient(ConfigData configData) {
    this.bridge = new Bridge();
    this.configData = Config.newConfigData(configData);
  }

  public boolean verifyWebhookSignature(
      byte[] payload, String header, String secretKey, boolean enforceTolerance) throws Exception {
    VerifyWebhookSignatureRequest request =
        VerifyWebhookSignatureRequest.newBuilder()
            .setConfigData(this.configData)
            .setPayload(ByteString.copyFrom(payload))
            .setHeader(header)
            .setSecretKey(secretKey)
            .setEnforceTolerance(enforceTolerance)
            .build();

    VerifyWebhookSignatureResponse response = bridge.getWebhook().verifyWebhookSignature(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getIsValid();
  }
}
