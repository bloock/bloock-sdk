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
  private final IdentityLegacyClient identityLegacyClient;
  private final IdentityClient identityClient;
  private final RecordClient recordClient;
  private final WebhookClient webhookClient;

  /**
   * Creates a new instance of the Bloock SDK client with the specified configuration.
   * @param apiKey
   * @param identityApiHost
   * @param forceEnv
   */
  public BloockClient(String apiKey, String identityApiHost, String forceEnv) {
    ConfigData configData = Config.newConfigDataDefault();
    Configuration configuration =
        Configuration.newBuilder()
            .setApiKey(apiKey)
            .setEnvironment(forceEnv)
            .setIdentityApiHost(identityApiHost)
            .build();

    this.configData =
        ConfigData.newBuilder()
            .setConfig(configuration)
            .putAllNetworksConfig(configData.getNetworksConfigMap())
            .build();

    this.integrityClient = new IntegrityClient(this.configData);
    this.authenticityClient = new AuthenticityClient(this.configData);
    this.identityLegacyClient = new IdentityLegacyClient(this.configData);
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
   * Gets identity legacy client instance
   * @return
   */
  public IdentityLegacyClient getIdentityLegacyClient() {
    return this.identityLegacyClient;
  }

  /**
   * Gets identity client instance
   * @return
   */
  public IdentityClient getIdentityClient() {
    return this.identityClient;
  }
}
