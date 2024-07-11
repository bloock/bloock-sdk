package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.BloockKeysEntities;

/**
 * Represents a local key with its public and private components.
 */
public class LocalKey {
  /**
   * Is the public key.
   */
  String key;
  /**
   * Is the private key.
   */
  String privateKey;
  /**
   * Is the type of the key.
   */
  KeyType keyType;

  /**
   * Constructs a LocalKey object with the specified parameters.
   * 
   * @param key
   * @param privateKey
   * @param keyType
   */
  public LocalKey(String key, String privateKey, KeyType keyType) {
    this.key = key;
    this.privateKey = privateKey;
    this.keyType = keyType;
  }

  public static LocalKey fromProto(BloockKeysEntities.LocalKey key) {
    return new LocalKey(key.getKey(), key.getPrivateKey(), KeyType.fromProto(key.getKeyType()));
  }

  public BloockKeysEntities.LocalKey toProto() {
    BloockKeysEntities.LocalKey.Builder builder = BloockKeysEntities.LocalKey.newBuilder();

    if (this.key != null)
      builder.setKey(this.key);
    if (this.privateKey != null)
      builder.setPrivateKey(this.privateKey);

    builder.setKeyType(this.keyType.toProto());

    return builder.build();
  }

  /**
   * Gets the public key of the local key.
   * 
   * @return
   */
  public String getKey() {
    return key;
  }

  /**
   * Gets the private key of the local key.
   * 
   * @return
   */
  public String getPrivateKey() {
    return privateKey;
  }

  /**
   * Gets the key type of the local key.
   * 
   * @return
   */
  public KeyType getKeyType() {
    return keyType;
  }
}
