package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.KeysEntities;

public class AccessControlSecret {
    String secret;

    public AccessControlSecret(String secret) {
        this.secret = secret;
    }

    public KeysEntities.AccessControlSecret toProto() {
        KeysEntities.AccessControlSecret.Builder builder = KeysEntities.AccessControlSecret.newBuilder();

        builder.setSecret(this.secret);

        return builder.build();
    }
}
