package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.BloockKeysEntities;

/**
 * Represents a managed key.
 */
public class ManagedKey {
  /**
   * Is the unique identifier of the managed key (ex:
   * 46c49ee7-ef44-472c-a873-ce81a2d5d764).
   */
  String id;
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
  long expiration;
  /**
   * Is the actual public key.
   */
  String key;
  /**
   * Is the access control type for the key.
   */
  AccessControlType accessControlType;

  /**
   * Constructs a ManagedKey object with the specified parameters.
   * 
   * @param id
   * @param name
   * @param protection
   * @param keyType
   * @param expiration
   * @param key
   */
  public ManagedKey(
      String id,
      String name,
      KeyProtectionLevel protection,
      KeyType keyType,
      long expiration,
      String key,
      AccessControlType accessControlType) {
    this.id = id;
    this.name = name;
    this.protection = protection;
    this.keyType = keyType;
    this.expiration = expiration;
    this.key = key;
    this.accessControlType = accessControlType;
  }

  public static ManagedKey fromProto(BloockKeysEntities.ManagedKey key) {
    return new ManagedKey(
        key.getId(),
        key.getName(),
        KeyProtectionLevel.fromProto(key.getProtection()),
        KeyType.fromProto(key.getKeyType()),
        key.getExpiration(),
        key.getKey(),
        AccessControlType.fromProto(key.getAccessControlType()));
  }

  public BloockKeysEntities.ManagedKey toProto() {
    return BloockKeysEntities.ManagedKey.newBuilder()
        .setId(this.id)
        .setName(this.key)
        .setProtection(this.protection.toProto())
        .setKeyType(this.keyType.toProto())
        .setExpiration(this.expiration)
        .setKey(this.key)
        .setAccessControlType(this.accessControlType.toProto())
        .build();
  }

  /**
   * Gets the id of the managed key
   * 
   * @return
   */
  public String getId() {
    return id;
  }

  /**
   * Gets the name of the managed key
   * 
   * @return
   */
  public String getName() {
    return name;
  }

  /**
   * Gets the protection level of the managed key.
   * 
   * @return
   */
  public KeyProtectionLevel getProtection() {
    return protection;
  }

  /**
   * Gets the key type of the managed key.
   * 
   * @return
   */
  public KeyType getKeyType() {
    return keyType;
  }

  /**
   * Gets the expiration of the managed key.
   * 
   * @return
   */
  public long getExpiration() {
    return expiration;
  }

  /**
   * Gets the public key of the managed key.
   * 
   * @return
   */
  public String getKey() {
    return key;
  }

  /**
   * Gets the access control type of the managed key.
   * 
   * @return
   */
  public AccessControlType getAccessControlType() {
    return accessControlType;
  }
}
