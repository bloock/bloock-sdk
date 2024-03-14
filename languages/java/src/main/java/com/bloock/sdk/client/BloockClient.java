package com.bloock.sdk.client;

import com.bloock.sdk.bridge.proto.Config.ConfigData;
import com.bloock.sdk.bridge.proto.Config.Configuration;
import com.bloock.sdk.config.Config;

/**
 * Represents a client for interacting with the Bloock SDK.
 */
public class BloockClient {
  private ConfigData configData;

  private final IntegrityClient integrityClient;
  private final AuthenticityClient authenticityClient;
  private final EncryptionClient encryptionClient;
  private final IdentityCoreClient identityCoreClient;
  private final IdentityClient identityClient;
  private final RecordClient recordClient;
  private final WebhookClient webhookClient;

  /**
   * Creates a new instance of the Bloock SDK client with the specified configuration.
   * @param apiKey
   * @param identityApiHost
   */
  public BloockClient(String apiKey, String identityApiHost) {
    ConfigData configData = Config.newConfigDataDefault();
    Configuration configuration =
        Configuration.newBuilder()
            .setApiKey(apiKey)
            .setIdentityApiHost(identityApiHost)
            .build();

    this.configData =
        ConfigData.newBuilder()
            .setConfig(configuration)
            .putAllNetworksConfig(configData.getNetworksConfigMap())
            .build();

    this.integrityClient = new IntegrityClient(this.configData);
    this.authenticityClient = new AuthenticityClient(this.configData);
    this.identityCoreClient = new IdentityCoreClient(this.configData);
    this.identityClient = new IdentityClient(this.configData);
    this.encryptionClient = new EncryptionClient(this.configData);
    this.recordClient = new RecordClient(this.configData);
    this.webhookClient = new WebhookClient(this.configData);
  }

  /**
   * Gets integrity client instance
   * @return
   */
  public IntegrityClient getIntegrityClient() {
    return this.integrityClient;
  }

  /**
   * Gets authenticity client instance
   * @return
   */
  public AuthenticityClient getAuthenticityClient() {
    return this.authenticityClient;
  }

  /**
   * Gets encryption client instance
   * @return
   */
  public EncryptionClient getEncryptionClient() {
    return this.encryptionClient;
  }

  /**
   * Gets authenticity client instance
   * @return
   */
  public RecordClient getRecordClient() {
    return this.recordClient;
  }

  /**
   * Gets webhook client instance
   * @return
   */
  public WebhookClient getWebhookClient() {
    return this.webhookClient;
  }

  /**
   * Gets identity core client instance
   * @return
   */
  public IdentityCoreClient getIdentityCoreClient() {
    return this.identityCoreClient;
  }

  /**
   * Gets identity client instance
   * @return
   */
  public IdentityClient getIdentityClient() {
    return this.identityClient;
  }
}
