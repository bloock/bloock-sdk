package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.Authenticity.GenerateEcdsaKeysResponse;

public class EcdsaKeyPair extends KeyPair {
  EcdsaKeyPair(String publicKey, String privateKey) {
    super(publicKey, privateKey);
  }

  public static EcdsaKeyPair fromProto(GenerateEcdsaKeysResponse keys) {
    return new EcdsaKeyPair(keys.getPublicKey(), keys.getPrivateKey());
  }
}
