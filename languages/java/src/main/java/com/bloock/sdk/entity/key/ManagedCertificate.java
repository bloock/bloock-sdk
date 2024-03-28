package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.KeysEntities;

/**
 * Represents a managed certificate with its details.
 */
public class ManagedCertificate {
  /**
   * Is the identifier of the managed certificate (ex: 2abae00b-f3d9-410c-abdf-1ea391d633aa).
   */
  String id;
  /**
   * Is the protection level for the key.
   */
  KeyProtectionLevel protection;
  /**
   * Is the type of the key.
   */
  KeyType keyType;
  /**
   * Is the timestamp indicating when the certificate expires.
   */
  long expiration;
  /**
   * Is the certificate public key.
   */
  String key;
  /**
   * Is the access control type for the certificate.
   */
  AccessControlType accessControlType;

  /**
   * Constructs a ManagedCertificate object with the specified parameters.
   * @param id
   * @param protection
   * @param keyType
   * @param expiration
   * @param key
   */
  public ManagedCertificate(
      String id, KeyProtectionLevel protection, KeyType keyType, long expiration, String key, AccessControlType accessControlType) {
    this.id = id;
    this.protection = protection;
    this.keyType = keyType;
    this.expiration = expiration;
    this.key = key;
    this.accessControlType = accessControlType;
  }

  public static ManagedCertificate fromProto(KeysEntities.ManagedCertificate certificate) {
    return new ManagedCertificate(
        certificate.getId(),
        KeyProtectionLevel.fromProto(certificate.getProtection()),
        KeyType.fromProto(certificate.getKeyType()),
        certificate.getExpiration(),
        certificate.getKey(),
        AccessControlType.fromProto(certificate.getAccessControlType())
    );
  }

  public KeysEntities.ManagedCertificate toProto() {
    return KeysEntities.ManagedCertificate.newBuilder()
        .setId(this.id)
        .setProtection(this.protection.toProto())
        .setKeyType(this.keyType.toProto())
        .setExpiration(this.expiration)
        .setKey(this.key)
        .setAccessControlType(this.accessControlType.toProto())
        .build();
  }

  /**
   * Gets the id of the managed certificate.
   * @return
   */
  public String getId() {
    return id;
  }

  /**
   * Gets the protection level of the managed certificate.
   * @return
   */
  public KeyProtectionLevel getProtection() {
    return protection;
  }

  /**
   * Gets the key type associated to the managed certificate.
   * @return
   */
  public KeyType getKeyType() {
    return keyType;
  }

  /**
   * Gets the expiration of the managed certificate.
   * @return
   */
  public long getExpiration() {
    return expiration;
  }

  /**
   * Gets the public key associated to the managed certificate.
   * @return
   */
  public String getKey() {
    return key;
  }

  /**
   * Gets the access control type of the managed certificate.
   * @return
   */
  public AccessControlType getAccessControlType() {
    return accessControlType;
  }
}
