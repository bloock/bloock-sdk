package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.RecordOuterClass.GenerateKeysResponse;

public class Keys extends KeyPair {
  Keys(String publicKey, String privateKey) {
    super(publicKey, privateKey);
  }

  public static Keys fromProto(GenerateKeysResponse keys) {
    return new Keys(keys.getPublicKey(), keys.getPrivateKey());
  }
}
