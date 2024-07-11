package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.BloockKeysEntities;

/**
 * Represents a secret used for secret-based access control.
 */
public class AccessControlSecret {
    String secret;

    /**
     * Creates a new AccessControlSecret instance with the provided secret.
     * 
     * @param secret
     */
    public AccessControlSecret(String secret) {
        this.secret = secret;
    }

    public BloockKeysEntities.AccessControlSecret toProto() {
        BloockKeysEntities.AccessControlSecret.Builder builder = BloockKeysEntities.AccessControlSecret.newBuilder();

        builder.setSecret(this.secret);

        return builder.build();
    }
}
