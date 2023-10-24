package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.KeysEntities;

public class LocalKey {
  String key;
  String privateKey;
  KeyType keyType;

  public LocalKey(String key, String privateKey, KeyType keyType) {
    this.key = key;
    this.privateKey = privateKey;
    this.keyType = keyType;
  }

  public static LocalKey fromProto(KeysEntities.LocalKey key) {
    return new LocalKey(key.getKey(), key.getPrivateKey(), KeyType.fromProto(key.getKeyType()));
  }

  public KeysEntities.LocalKey toProto() {
    KeysEntities.LocalKey.Builder builder = KeysEntities.LocalKey.newBuilder();

    if (this.key != null) builder.setKey(this.key);
    if (this.privateKey != null) builder.setPrivateKey(this.privateKey);

    builder.setKeyType(this.keyType.toProto());

    return builder.build();
  }

  public String getKey() {
    return key;
  }

  public String getPrivateKey() {
    return privateKey;
  }

  public KeyType getKeyType() {
    return keyType;
  }
}
