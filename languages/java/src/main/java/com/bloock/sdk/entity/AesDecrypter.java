package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.EncryptionEntities;
import com.bloock.sdk.bridge.proto.EncryptionEntities.EncryptionAlg;

public class AesDecrypter implements Decrypter {
  EncryptionAlg alg;
  DecrypterArgs args;

  public AesDecrypter(String password) {
    this.alg = EncryptionAlg.A256GCM;
    this.args = new DecrypterArgs(password);
  }

  @Override
  public EncryptionEntities.Decrypter toProto() {
    return EncryptionEntities.Decrypter.newBuilder()
        .setAlg(this.alg)
        .setArgs(this.args.toProto())
        .build();
  }
}
