package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.RecordOuterClass.GenerateEciesKeyPairResponse;

public class EciesKeyPair extends KeyPair {
  EciesKeyPair(String publicKey, String privateKey) {
    super(publicKey, privateKey);
  }

  public static EciesKeyPair fromProto(GenerateEciesKeyPairResponse keys) {
    return new EciesKeyPair(keys.getPublicKey(), keys.getPrivateKey());
  }
}
