package com.bloock.sdk.entity.encryption;

import com.bloock.sdk.bridge.proto.EncryptionEntities;
import com.bloock.sdk.entity.key.LocalCertificate;
import com.bloock.sdk.entity.key.LocalKey;
import com.bloock.sdk.entity.key.ManagedCertificate;
import com.bloock.sdk.entity.key.ManagedKey;

public class Encrypter {
  LocalKey localKey;
  ManagedKey managedKey;
  ManagedCertificate managedCertificate;
  LocalCertificate localCertificate;

  public Encrypter(LocalKey localKey) {
    this.localKey = localKey;
  }

  public Encrypter(ManagedKey managedKey) {
    this.managedKey = managedKey;
  }

  public Encrypter(ManagedCertificate managedCertificate) {
    this.managedCertificate = managedCertificate;
  }

  public Encrypter(LocalCertificate localCertificate) {
    this.localCertificate = localCertificate;
  }

  public EncryptionEntities.Encrypter toProto() {
    EncryptionEntities.Encrypter.Builder builder = EncryptionEntities.Encrypter.newBuilder();

    if (this.localKey != null) {
      builder.setLocalKey(this.localKey.toProto());
    }

    if (this.managedKey != null) {
      builder.setManagedKey(this.managedKey.toProto());
    }

    if (this.managedCertificate != null) {
      builder.setManagedCertificate(this.managedCertificate.toProto());
    }

    if (this.localCertificate != null) {
      builder.setLocalCertificate(this.localCertificate.toProto());
    }

    return builder.build();
  }
}