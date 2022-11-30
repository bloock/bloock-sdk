package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.RecordOuterClass.GenerateRsaKeyPairResponse;

public class RsaKeyPair {
  String publicKey;
  String privateKey;

  RsaKeyPair(String publicKey, String privateKey) {
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  public static RsaKeyPair fromProto(GenerateRsaKeyPairResponse keys) {
    return new RsaKeyPair(keys.getPublicKey(), keys.getPrivateKey());
  }

  public String getPublicKey() {
    return publicKey;
  }

  public String getPrivateKey() {
    return privateKey;
  }
}
