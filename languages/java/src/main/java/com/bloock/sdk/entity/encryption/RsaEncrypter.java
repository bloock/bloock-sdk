package com.bloock.sdk.entity.encryption;

import com.bloock.sdk.bridge.proto.EncryptionEntities;
import com.bloock.sdk.bridge.proto.EncryptionEntities.EncryptionAlg;

public class RsaEncrypter implements Encrypter {
  EncryptionAlg alg;
  EncrypterArgs args;

  public RsaEncrypter(String publicKey) {
    this.alg = EncryptionAlg.RSA;
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
