package com.bloock.sdk.entity.encryption;

import com.bloock.sdk.bridge.proto.EncryptionEntities;
import com.bloock.sdk.bridge.proto.EncryptionEntities.EncryptionAlg;
import com.bloock.sdk.entity.key.KeyType;
import com.bloock.sdk.entity.key.LocalKey;
import com.bloock.sdk.entity.key.ManagedKey;

public class RsaEncrypter implements Encrypter {
  EncryptionAlg alg;
  EncrypterArgs args;

  public RsaEncrypter(String publicKey) {
    this.alg = EncryptionAlg.RSA;
    this.args = new EncrypterArgs(new LocalKey(publicKey, null, KeyType.Rsa2048));
  }

  public RsaEncrypter(LocalKey localKey) {
    this.alg = EncryptionAlg.RSA;
    this.args = new EncrypterArgs(localKey);
  }

  public RsaEncrypter(ManagedKey managedKey) {
    this.alg = EncryptionAlg.RSA;
    this.args = new EncrypterArgs(managedKey);
  }

  @Override
  public EncryptionEntities.Encrypter toProto() {
    EncryptionEntities.Encrypter.Builder builder = EncryptionEntities.Encrypter.newBuilder();
    builder.setAlg(this.alg);

    if (this.args.localKey != null) {
      builder.setLocalKey(this.args.localKey.toProto());
    }

    if (this.args.managedKey != null) {
      builder.setManagedKey(this.args.managedKey.toProto());
    }

    return builder.build();
  }
}
