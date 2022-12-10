package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.RecordOuterClass;
import com.bloock.sdk.bridge.proto.RecordOuterClass.EncryptionAlg;

public class AesDecrypter implements Decrypter {
  EncryptionAlg alg;
  DecrypterArgs args;

  public AesDecrypter(String password) {
    this.alg = EncryptionAlg.A256GCM;
    this.args = new DecrypterArgs(password);
  }

  @Override
  public RecordOuterClass.Decrypter toProto() {
    return RecordOuterClass.Decrypter.newBuilder()
        .setAlg(this.alg)
        .setArgs(this.args.toProto())
        .build();
  }
}
