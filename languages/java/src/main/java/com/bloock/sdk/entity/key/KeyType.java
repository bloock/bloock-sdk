package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.KeysEntities;

public enum KeyType {
  EcP256k,
  Rsa2048,
  Rsa3072,
  Rsa4096,
  Aes128,
  Aes256,
  Bjj,
  UNRECOGNIZED;

  public static KeyType fromProto(KeysEntities.KeyType type) {
    switch (type) {
      case EcP256k:
        return KeyType.EcP256k;
      case Rsa2048:
        return KeyType.Rsa2048;
      case Rsa3072:
        return KeyType.Rsa3072;
      case Rsa4096:
        return KeyType.Rsa4096;
      case Aes128:
        return KeyType.Aes128;
      case Aes256:
        return KeyType.Aes256;
      case Bjj:
        return KeyType.Bjj;
      default:
        return KeyType.UNRECOGNIZED;
    }
  }

  public KeysEntities.KeyType toProto() {
    switch (this) {
      case EcP256k:
        return KeysEntities.KeyType.EcP256k;
      case Rsa2048:
        return KeysEntities.KeyType.Rsa2048;
      case Rsa3072:
        return KeysEntities.KeyType.Rsa3072;
      case Rsa4096:
        return KeysEntities.KeyType.Rsa4096;
      case Aes128:
        return KeysEntities.KeyType.Aes128;
      case Aes256:
        return KeysEntities.KeyType.Aes256;
      case Bjj:
        return KeysEntities.KeyType.Bjj;
      default:
        return KeysEntities.KeyType.UNRECOGNIZED;
    }
  }
}
