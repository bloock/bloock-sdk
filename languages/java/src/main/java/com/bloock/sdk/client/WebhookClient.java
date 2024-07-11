package com.bloock.sdk.client;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.BloockConfig.ConfigData;
import com.bloock.sdk.bridge.proto.BloockShared.Error;
import com.bloock.sdk.bridge.proto.BloockWebhook.VerifyWebhookSignatureRequest;
import com.bloock.sdk.bridge.proto.BloockWebhook.VerifyWebhookSignatureResponse;
import com.bloock.sdk.config.Config;
import com.google.protobuf.ByteString;

/**
 * Provides functionality for interacting with
 * <a href="https://dashboard.bloock.com/login">Bloock webhooks</a>.
 */
public class WebhookClient {
  private final Bridge bridge;
  private final ConfigData configData;

  /**
   * Creates a new WebhookClient with default configuration.
   */
  public WebhookClient() {
    this.bridge = new Bridge();
    this.configData = Config.newConfigDataDefault();
  }

  /**
   * Creates a new WebhookClient with the provided configuration.
   * 
   * @param configData
   */
  public WebhookClient(ConfigData configData) {
    this.bridge = new Bridge();
    this.configData = Config.newConfigData(configData);
  }

  /**
   * Verifies the signature of a webhook payload using the provided parameters.
   * 
   * @param payload
   * @param header
   * @param secretKey
   * @param enforceTolerance
   * @return
   * @throws Exception
   */
  public boolean verifyWebhookSignature(
      byte[] payload, String header, String secretKey, boolean enforceTolerance) throws Exception {
    VerifyWebhookSignatureRequest request = VerifyWebhookSignatureRequest.newBuilder()
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
