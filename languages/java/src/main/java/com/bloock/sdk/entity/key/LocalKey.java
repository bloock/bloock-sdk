package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.KeysEntities;

public class LocalKey {
    String key;
    String privateKey;

    LocalKey(String key, String privateKey) {
        this.key = key;
        this.privateKey = privateKey;
    }

    public static LocalKey fromProto(KeysEntities.LocalKey key) {
        return new LocalKey(
                key.getKey(),
                key.getPrivateKey()
        );
    }

    public KeysEntities.LocalKey toProto() {
        return KeysEntities.LocalKey.newBuilder()
                .setKey(this.key)
                .setPrivateKey(this.privateKey)
                .build();
    }

    public String getKey() {
        return key;
    }

    public String getPrivateKey() {
        return privateKey;
    }
}
