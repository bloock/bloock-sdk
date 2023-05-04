package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.Keys;

public class EcdsaKeyPair extends KeyPair {
  EcdsaKeyPair(String publicKey, String privateKey) {
    super(publicKey, privateKey);
  }

  public static EcdsaKeyPair fromProto(Keys.GenerateLocalKeyResponse keys) {
    return new EcdsaKeyPair(keys.getLocalKey().getKey(), keys.getLocalKey().getPrivateKey());
  }
}
