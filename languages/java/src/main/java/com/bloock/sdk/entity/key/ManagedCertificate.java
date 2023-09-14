package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.KeysEntities;

public class ManagedCertificate {
  String id;
  KeyProtectionLevel protection;
  KeyType keyType;
  long expiration;
  String key;

  public ManagedCertificate(
      String id, KeyProtectionLevel protection, KeyType keyType, long expiration, String key) {
    this.id = id;
    this.protection = protection;
    this.keyType = keyType;
    this.expiration = expiration;
    this.key = key;
  }

  public static ManagedCertificate fromProto(KeysEntities.ManagedCertificate certificate) {
    return new ManagedCertificate(
        certificate.getId(),
        KeyProtectionLevel.fromProto(certificate.getProtection()),
        KeyType.fromProto(certificate.getKeyType()),
        certificate.getExpiration(),
        certificate.getKey());
  }

  public KeysEntities.ManagedCertificate toProto() {
    return KeysEntities.ManagedCertificate.newBuilder()
        .setId(this.id)
        .setProtection(this.protection.toProto())
        .setKeyType(this.keyType.toProto())
        .setExpiration(this.expiration)
        .setKey(this.key)
        .build();
  }

  public String getId() {
    return id;
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
