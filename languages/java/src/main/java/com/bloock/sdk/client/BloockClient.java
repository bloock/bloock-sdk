package com.bloock.sdk.client;

import com.bloock.sdk.bridge.proto.Config.ConfigData;
import com.bloock.sdk.bridge.proto.Config.Configuration;
import com.bloock.sdk.config.Config;

public class BloockClient {
    private ConfigData configData;

    private final IntegrityClient integrityClient;
    private final AuthenticityClient authenticityClient;
    private final EncryptionClient encryptionClient;
    private final RecordClient recordClient;
    private final WebhookClient webhookClient;

    public BloockClient(String apiKey) {
        ConfigData configData = Config.newConfigDataDefault();
        Configuration configuration =
                Configuration.newBuilder(this.configData.getConfig()).setApiKey(apiKey).build();

        this.configData =
                ConfigData.newBuilder()
                        .setConfig(configuration)
                        .putAllNetworksConfig(configData.getNetworksConfigMap())
                        .build();

        this.integrityClient = new IntegrityClient(this.configData);
        this.authenticityClient = new AuthenticityClient(this.configData);
        this.encryptionClient = new EncryptionClient(this.configData);
        this.recordClient = new RecordClient(this.configData);
        this.webhookClient = new WebhookClient(this.configData);
    }

    public IntegrityClient getIntegrityClient() {
        return this.integrityClient;
    }

    public AuthenticityClient getAuthenticityClient() {
        return this.authenticityClient;
    }

    public EncryptionClient getEncryptionClient() {
        return this.encryptionClient;
    }

    public RecordClient getRecordClient() {
        return this.recordClient;
    }

    public WebhookClient getWebhookClient() {
        return this.webhookClient;
    }
}
