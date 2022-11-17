package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.RecordOuterClass;
import com.bloock.sdk.bridge.proto.RecordOuterClass.EncryptionAlg;

public class AesEncrypter implements Encrypter {
  EncryptionAlg alg;
  EncrypterArgs args;

  public AesEncrypter(String password) {
    this.alg = EncryptionAlg.A256GCM;
    this.args = new EncrypterArgs(password);
  }

  @Override
  public RecordOuterClass.Encrypter toProto() {
    return RecordOuterClass.Encrypter.newBuilder()
        .setAlg(this.alg)
        .setArgs(this.args.toProto())
        .build();
  }
}

class EncrypterArgs {
  String password;

  EncrypterArgs(String password) {
    this.password = password;
  }

  RecordOuterClass.EncrypterArgs toProto() {
    return RecordOuterClass.EncrypterArgs.newBuilder().setPassword(this.password).build();
  }
}
