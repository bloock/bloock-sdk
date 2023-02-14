package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.EncryptionEntities;
import com.bloock.sdk.bridge.proto.EncryptionEntities.EncryptionAlg;

public class EciesEncrypter implements Encrypter {
  EncryptionAlg alg;
  EncrypterArgs args;

  public EciesEncrypter(String publicKey) {
    this.alg = EncryptionAlg.ECIES;
    this.args = new EncrypterArgs(publicKey);
  }

  @Override
  public EncryptionEntities.Encrypter toProto() {
    return EncryptionEntities.Encrypter.newBuilder()
        .setAlg(this.alg)
        .setArgs(this.args.toProto())
        .build();
  }
}
