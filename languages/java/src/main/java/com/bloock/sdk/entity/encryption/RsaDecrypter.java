package com.bloock.sdk.entity.encryption;

import com.bloock.sdk.bridge.proto.EncryptionEntities;
import com.bloock.sdk.bridge.proto.EncryptionEntities.EncryptionAlg;
import com.bloock.sdk.entity.key.LocalKey;
import com.bloock.sdk.entity.key.ManagedKey;

public class RsaDecrypter implements Decrypter {
  EncryptionAlg alg;
  DecrypterArgs args;

  public RsaDecrypter(String privateKey) {
    this.alg = EncryptionAlg.RSA;
    this.args = new DecrypterArgs(new LocalKey(null, privateKey));
  }

  public RsaDecrypter(LocalKey localKey) {
    this.alg = EncryptionAlg.RSA;
    this.args = new DecrypterArgs(localKey);
  }

  public RsaDecrypter(ManagedKey managedKey) {
    this.alg = EncryptionAlg.RSA;
    this.args = new DecrypterArgs(managedKey);
  }

  @Override
  public EncryptionEntities.Decrypter toProto() {
    EncryptionEntities.Decrypter.Builder builder =
        EncryptionEntities.Decrypter.newBuilder().setAlg(this.alg);

    if (this.args.localKey != null) {
      builder.setLocalKey(this.args.localKey.toProto());
    }

    if (this.args.managedKey != null) {
      builder.setManagedKey(this.args.managedKey.toProto());
    }

    return builder.build();
  }
}
