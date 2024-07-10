import * as keysEntitiesProto from "../../bridge/proto/bloock_keys_entities";

/**
 * Represents the type of cryptographic key.
 */
export enum KeyType {
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
   * Represents the Baby JubJub key type, elliptic curve defined over the large prime subgroup of BN128.
   */
  Bjj
}

export namespace KeyType {
  export function toProto(type: KeyType): keysEntitiesProto.KeyType {
    switch (type) {
      case KeyType.EcP256k:
        return keysEntitiesProto.KeyType.EcP256k;
      case KeyType.Rsa2048:
        return keysEntitiesProto.KeyType.Rsa2048;
      case KeyType.Rsa3072:
        return keysEntitiesProto.KeyType.Rsa3072;
      case KeyType.Rsa4096:
        return keysEntitiesProto.KeyType.Rsa4096;
      case KeyType.Aes128:
        return keysEntitiesProto.KeyType.Aes128;
      case KeyType.Aes256:
        return keysEntitiesProto.KeyType.Aes256;
      case KeyType.Bjj:
        return keysEntitiesProto.KeyType.Bjj;
    }
  }

  export function fromProto(
    type: keysEntitiesProto.KeyType | undefined
  ): KeyType {
    switch (type) {
      case keysEntitiesProto.KeyType.Rsa2048:
        return KeyType.Rsa2048;
      case keysEntitiesProto.KeyType.Rsa3072:
        return KeyType.Rsa3072;
      case keysEntitiesProto.KeyType.Rsa4096:
        return KeyType.Rsa4096;
      case keysEntitiesProto.KeyType.Aes128:
        return KeyType.Aes128;
      case keysEntitiesProto.KeyType.Aes256:
        return KeyType.Aes256;
      case keysEntitiesProto.KeyType.Bjj:
        return KeyType.Bjj;
      default:
        return KeyType.EcP256k;
    }
  }
}
