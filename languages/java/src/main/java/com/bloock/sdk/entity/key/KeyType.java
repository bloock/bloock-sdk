package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.BloockKeysEntities;

/**
 * Represents the type of cryptographic key.
 */
public enum KeyType {
  /**
   * Represents the elliptic curve key type P-256k.
   */
  EcP256k,
  /**
   * Represents the RSA key type with a 2048-bit modulus.
   */
  Rsa2048,
  /**
   * Represents the RSA key type with a 3072-bit modulus.
   */
  Rsa3072,
  /**
   * Represents the RSA key type with a 4096-bit modulus.
   */
  Rsa4096,
  /**
   * Represents the AES key type with a 128-bit key length.
   */
  Aes128,
  /**
   * Represents the AES key type with a 256-bit key length.
   */
  Aes256,
  /**
   * Represents the Baby JubJub key type, elliptic curve defined over the large
   * prime subgroup of BN128.
   */
  Bjj,
  UNRECOGNIZED;

  public static KeyType fromProto(BloockKeysEntities.KeyType type) {
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

  public BloockKeysEntities.KeyType toProto() {
    switch (this) {
      case EcP256k:
        return BloockKeysEntities.KeyType.EcP256k;
      case Rsa2048:
        return BloockKeysEntities.KeyType.Rsa2048;
      case Rsa3072:
        return BloockKeysEntities.KeyType.Rsa3072;
      case Rsa4096:
        return BloockKeysEntities.KeyType.Rsa4096;
      case Aes128:
        return BloockKeysEntities.KeyType.Aes128;
      case Aes256:
        return BloockKeysEntities.KeyType.Aes256;
      case Bjj:
        return BloockKeysEntities.KeyType.Bjj;
      default:
        return BloockKeysEntities.KeyType.UNRECOGNIZED;
    }
  }
}
