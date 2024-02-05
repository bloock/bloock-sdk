package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.KeysEntities;

/**
 * Represents a secret used for secret-based access control.
 */
public class AccessControlSecret {
    String secret;

    /**
     * Creates a new AccessControlSecret instance with the provided secret.
     * @param secret
     */
    public AccessControlSecret(String secret) {
        this.secret = secret;
    }

    public KeysEntities.AccessControlSecret toProto() {
        KeysEntities.AccessControlSecret.Builder builder = KeysEntities.AccessControlSecret.newBuilder();

        builder.setSecret(this.secret);

        return builder.build();
    }
}
