package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.KeysEntities;

public enum KeyType {
  EcP256k,
  Rsa2048,
  Rsa3072,
  Rsa4096,
  UNRECOGNIZED;

  public static KeyType fromProto(KeysEntities.KeyType type) {
    return switch (type) {
      case EcP256k -> KeyType.EcP256k;
      case Rsa2048 -> KeyType.Rsa2048;
      case Rsa3072 -> KeyType.Rsa3072;
      case Rsa4096 -> KeyType.Rsa4096;
      default -> KeyType.UNRECOGNIZED;
    };
  }

  public KeysEntities.KeyType toProto() {
    return switch (this) {
      case EcP256k -> KeysEntities.KeyType.EcP256k;
      case Rsa2048 -> KeysEntities.KeyType.Rsa2048;
      case Rsa3072 -> KeysEntities.KeyType.Rsa3072;
      case Rsa4096 -> KeysEntities.KeyType.Rsa4096;
      default -> KeysEntities.KeyType.UNRECOGNIZED;
    };
  }
}
