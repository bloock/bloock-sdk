package com.bloock.sdk.client;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.Config;
import com.bloock.sdk.entity.identity.CredentialCoreBuilder;
import com.bloock.sdk.entity.identity.Issuer;

/**
 * Represents a client for interacting with the <a href="https://dashboard.bloock.com/login">Bloock Identity service</a>.
 */
public class IdentityCoreClient {
    private final Bridge bridge;
    private final Config.ConfigData configData;

    /**
     * Creates a new instance of the IdentityCoreClient with default configuration.
     */
    public IdentityCoreClient() {
        this.bridge = new Bridge();
        this.configData = com.bloock.sdk.config.Config.newConfigDataDefault();
    }

    /**
     * Creates a new instance of the IdentityCoreClient with the provided configuration.
     * @param configData
     */
    public IdentityCoreClient(Config.ConfigData configData) {
        this.bridge = new Bridge();
        this.configData = com.bloock.sdk.config.Config.newConfigData(configData);
    }

    /**
     * Creates a new credential builder for defining a credential on the Bloock Identity service.
     * @param issuer
     * @param schemaId
     * @param holderDid
     * @param expiration
     * @param version
     * @return
     * @throws Exception
     */
    public CredentialCoreBuilder buildCredential(
            Issuer issuer, String schemaId, String holderDid, Long expiration, int version)
            throws Exception {
        return new CredentialCoreBuilder(
                issuer, schemaId, holderDid, expiration, version, this.configData);
    }
}
