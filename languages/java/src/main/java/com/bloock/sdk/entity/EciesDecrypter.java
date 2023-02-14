package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.EncryptionEntities;
import com.bloock.sdk.bridge.proto.EncryptionEntities.EncryptionAlg;

public class EciesDecrypter implements Decrypter {
  EncryptionAlg alg;
  DecrypterArgs args;

  public EciesDecrypter(String publicKey) {
    this.alg = EncryptionAlg.ECIES;
    this.args = new DecrypterArgs(publicKey);
  }

  @Override
  public EncryptionEntities.Decrypter toProto() {
    return EncryptionEntities.Decrypter.newBuilder()
        .setAlg(this.alg)
        .setArgs(this.args.toProto())
        .build();
  }
}
