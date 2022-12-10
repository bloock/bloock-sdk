package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.RecordOuterClass;
import com.bloock.sdk.bridge.proto.RecordOuterClass.EncryptionAlg;

public class RsaEncrypter implements Encrypter {
  EncryptionAlg alg;
  EncrypterArgs args;

  public RsaEncrypter(String publicKey) {
    this.alg = EncryptionAlg.RSA;
    this.args = new EncrypterArgs(publicKey);
  }

  @Override
  public RecordOuterClass.Encrypter toProto() {
    return RecordOuterClass.Encrypter.newBuilder()
        .setAlg(this.alg)
        .setArgs(this.args.toProto())
        .build();
  }
}
