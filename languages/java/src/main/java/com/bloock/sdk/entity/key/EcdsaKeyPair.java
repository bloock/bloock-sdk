package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.BloockKeys;

/**
 * Represents an ecdsa key pair, with private and public key.
 */
public class EcdsaKeyPair extends KeyPair {
  EcdsaKeyPair(String publicKey, String privateKey) {
    super(publicKey, privateKey);
  }

  public static EcdsaKeyPair fromProto(BloockKeys.GenerateLocalKeyResponse keys) {
    return new EcdsaKeyPair(keys.getLocalKey().getKey(), keys.getLocalKey().getPrivateKey());
  }
}
