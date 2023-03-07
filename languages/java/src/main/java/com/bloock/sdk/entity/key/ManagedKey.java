package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.KeysEntities;

public class ManagedKey {
    String id;
    String name;
    KeyProtectionLevel protection;
    KeyType keyType;
    long expiration;
    String key;

    public ManagedKey(String id, String name, KeyProtectionLevel protection, KeyType keyType, long expiration, String key) {
        this.id = id;
        this.name = name;
        this.protection = protection;
        this.keyType = keyType;
        this.expiration = expiration;
        this.key = key;
    }

    public static ManagedKey fromProto(KeysEntities.ManagedKey key) {
        return new ManagedKey(
                key.getId(),
                key.getName(),
                KeyProtectionLevel.fromProto(key.getProtection()),
                KeyType.fromProto(key.getKeyType()),
                key.getExpiration(),
                key.getKey()
        );
    }

    public KeysEntities.ManagedKey toProto() {
        return KeysEntities.ManagedKey.newBuilder()
                .setId(this.id)
                .setName(this.key)
                .setProtection(this.protection.toProto())
                .setKeyType(this.keyType.toProto())
                .setExpiration(this.expiration)
                .setKey(this.key)
                .build();
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public KeyProtectionLevel getProtection() {
        return protection;
    }

    public KeyType getKeyType() {
        return keyType;
    }

    public long getExpiration() {
        return expiration;
    }

    public String getKey() {
        return key;
    }
}
