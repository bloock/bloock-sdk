package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.BloockKeysEntities;

/**
 * Represents the parameters for creating a managed key.
 */
public class ManagedKeyParams {
  /**
   * Is the name of the managed key.
   */
  String name;
  /**
   * Is the protection level for the key.
   */
  KeyProtectionLevel protection;
  /**
   * Is the type of the key.
   */
  KeyType keyType;
  /**
   * Is the timestamp indicating when the key expires.
   */
  Long expiration;

  /**
   * Constructs a ManagedKeyParams object with the specified parameters.
   * 
   * @param protection
   * @param keyType
   * @param name
   * @param expiration
   */
  public ManagedKeyParams(
      KeyProtectionLevel protection, KeyType keyType, String name, long expiration) {
    this.name = name;
    this.protection = protection;
    this.keyType = keyType;
    this.expiration = expiration;
  }

  /**
   * Constructs a ManagedKeyParams object with the specified parameters.
   * 
   * @param protection
   * @param keyType
   */
  public ManagedKeyParams(KeyProtectionLevel protection, KeyType keyType) {
    this.protection = protection;
    this.keyType = keyType;
  }

  /**
   * Constructs a ManagedKeyParams object with the specified parameters.
   * 
   * @param protection
   * @param keyType
   * @param name
   */
  public ManagedKeyParams(KeyProtectionLevel protection, KeyType keyType, String name) {
    this.protection = protection;
    this.keyType = keyType;
    this.name = name;
  }

  /**
   * Constructs a ManagedKeyParams object with the specified parameters.
   * 
   * @param protection
   * @param keyType
   * @param expiration
   */
  public ManagedKeyParams(KeyProtectionLevel protection, KeyType keyType, long expiration) {
    this.protection = protection;
    this.keyType = keyType;
    this.expiration = expiration;
  }

  public static ManagedKeyParams fromProto(BloockKeysEntities.ManagedKeyParams params) {
    return new ManagedKeyParams(
        KeyProtectionLevel.fromProto(params.getProtection()),
        KeyType.fromProto(params.getKeyType()),
        params.getName(),
        params.getExpiration());
  }

  public BloockKeysEntities.ManagedKeyParams toProto() {
    BloockKeysEntities.ManagedKeyParams.Builder params = BloockKeysEntities.ManagedKeyParams.newBuilder()
        .setProtection(this.protection.toProto())
        .setKeyType(this.keyType.toProto());

    if (this.name != null)
      params.setName(this.name);
    if (this.expiration != null)
      params.setExpiration(this.expiration);

    return params.build();
  }

  /**
   * Gets the name of the managed key params.
   * 
   * @return
   */
  public String getName() {
    return name;
  }

  /**
   * Gets the protection level of the managed key params.
   * 
   * @return
   */
  public KeyProtectionLevel getProtection() {
    return protection;
  }

  /**
   * Gets the key type of the managed key params.
   * 
   * @return
   */
  public KeyType getKeyType() {
    return keyType;
  }

  /**
   * Gets the expiration of the managed key params.
   * 
   * @return
   */
  public long getExpiration() {
    return expiration;
  }
}
