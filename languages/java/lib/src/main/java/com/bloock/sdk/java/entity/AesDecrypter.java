package com.bloock.sdk.java.entity;

import com.bloock.sdk.java.bridge.proto.RecordOuterClass;
import com.bloock.sdk.java.bridge.proto.RecordOuterClass.EncryptionAlg;

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

class DecrypterArgs {
  String password;

  DecrypterArgs(String password) {
    this.password = password;
  }

  RecordOuterClass.DecrypterArgs toProto() {
    return RecordOuterClass.DecrypterArgs.newBuilder().setPassword(this.password).build();
  }
}
