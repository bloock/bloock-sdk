package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.RecordOuterClass;
import com.bloock.sdk.bridge.proto.RecordOuterClass.EncryptionAlg;

public class RsaDecrypter implements Decrypter {
  EncryptionAlg alg;
  DecrypterArgs args;

  public RsaDecrypter(String publicKey) {
    this.alg = EncryptionAlg.RSA;
    this.args = new DecrypterArgs(publicKey);
  }

  @Override
  public RecordOuterClass.Decrypter toProto() {
    return RecordOuterClass.Decrypter.newBuilder()
        .setAlg(this.alg)
        .setArgs(this.args.toProto())
        .build();
  }
}
