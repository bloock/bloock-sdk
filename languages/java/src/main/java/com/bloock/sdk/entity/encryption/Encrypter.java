package com.bloock.sdk.entity.encryption;

import com.bloock.sdk.bridge.proto.EncryptionEntities;
import com.bloock.sdk.entity.key.*;

public class Encrypter {
  LocalKey localKey;
  ManagedKey managedKey;
  ManagedCertificate managedCertificate;
  LocalCertificate localCertificate;
  AccessControl accessControl;

  public Encrypter(LocalKey localKey) {
    this.localKey = localKey;
  }

  public Encrypter(ManagedKey managedKey, AccessControl accessControl) {
    this.managedKey = managedKey;
    this.accessControl = accessControl;
  }

  public Encrypter(ManagedCertificate managedCertificate, AccessControl accessControl) {
    this.managedCertificate = managedCertificate;
    this.accessControl = accessControl;
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

    if (this.accessControl != null) {
      builder.setAccessControl(this.accessControl.toProto());
    }

    return builder.build();
  }
}
