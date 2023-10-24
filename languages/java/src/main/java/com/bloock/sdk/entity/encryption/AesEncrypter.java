package com.bloock.sdk.entity.encryption;

import com.bloock.sdk.bridge.proto.EncryptionEntities;
import com.bloock.sdk.bridge.proto.EncryptionEntities.EncryptionAlg;
import com.bloock.sdk.entity.key.KeyType;
import com.bloock.sdk.entity.key.LocalKey;
import com.bloock.sdk.entity.key.ManagedKey;

public class AesEncrypter implements Encrypter {
  EncryptionAlg alg;
  EncrypterArgs args;

  public AesEncrypter(String password) {
    this.alg = EncryptionAlg.A256GCM;
    this.args = new EncrypterArgs(new LocalKey(password, null, KeyType.Aes256));
  }

  public AesEncrypter(LocalKey localKey) {
    this.alg = EncryptionAlg.A256GCM;
    this.args = new EncrypterArgs(localKey);
  }

  public AesEncrypter(ManagedKey managedKey) {
    this.alg = EncryptionAlg.A256GCM;
    this.args = new EncrypterArgs(managedKey);
  }

  @Override
  public EncryptionEntities.Encrypter toProto() {
    EncryptionEntities.Encrypter.Builder builder =
        EncryptionEntities.Encrypter.newBuilder().setAlg(this.alg);

    if (this.args.localKey != null) {
      builder.setLocalKey(this.args.localKey.toProto());
    }

    if (this.args.managedKey != null) {
      builder.setManagedKey(this.args.managedKey.toProto());
    }

    return builder.build();
  }
}
