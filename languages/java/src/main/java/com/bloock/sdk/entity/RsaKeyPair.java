package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.Encryption.GenerateRsaKeyPairResponse;

public class RsaKeyPair extends KeyPair {
  RsaKeyPair(String publicKey, String privateKey) {
    super(publicKey, privateKey);
  }

  public static RsaKeyPair fromProto(GenerateRsaKeyPairResponse keys) {
    return new RsaKeyPair(keys.getPublicKey(), keys.getPrivateKey());
  }
}
