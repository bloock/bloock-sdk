package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.KeysEntities;

public class ManagedKeyParams {
  String name;
  KeyProtectionLevel protection;
  KeyType keyType;
  Long expiration;

  public ManagedKeyParams(
      KeyProtectionLevel protection, KeyType keyType, String name, long expiration) {
    this.name = name;
    this.protection = protection;
    this.keyType = keyType;
    this.expiration = expiration;
  }

  public ManagedKeyParams(KeyProtectionLevel protection, KeyType keyType) {
    this.protection = protection;
    this.keyType = keyType;
  }

  public ManagedKeyParams(KeyProtectionLevel protection, KeyType keyType, String name) {
    this.protection = protection;
    this.keyType = keyType;
    this.name = name;
  }

  public ManagedKeyParams(KeyProtectionLevel protection, KeyType keyType, long expiration) {
    this.protection = protection;
    this.keyType = keyType;
    this.expiration = expiration;
  }

  public static ManagedKeyParams fromProto(KeysEntities.ManagedKeyParams params) {
    return new ManagedKeyParams(
        KeyProtectionLevel.fromProto(params.getProtection()),
        KeyType.fromProto(params.getKeyType()),
        params.getName(),
        params.getExpiration());
  }

  public KeysEntities.ManagedKeyParams toProto() {
    KeysEntities.ManagedKeyParams.Builder params =
        KeysEntities.ManagedKeyParams.newBuilder()
            .setProtection(this.protection.toProto())
            .setKeyType(this.keyType.toProto());

    if (this.name != null) params.setName(this.name);
    if (this.expiration != null) params.setExpiration(this.expiration);

    return params.build();
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
}
