package com.bloock.sdk.entity.authenticity;

import com.bloock.sdk.bridge.proto.AuthenticityEntities;
import com.bloock.sdk.entity.key.LocalCertificate;
import com.bloock.sdk.entity.key.LocalKey;
import com.bloock.sdk.entity.key.ManagedCertificate;
import com.bloock.sdk.entity.key.ManagedKey;

public class Signer {

  LocalKey localKey;
  ManagedKey managedKey;
  ManagedCertificate managedCertificate;
  LocalCertificate localCertificate;

  public Signer(LocalKey localKey) {
    this.localKey = localKey;
  }

  public Signer(ManagedKey managedKey) {
    this.managedKey = managedKey;
  }

  public Signer(ManagedCertificate managedCertificate) {
    this.managedCertificate = managedCertificate;
  }

  public Signer(LocalCertificate localCertificate) {
    this.localCertificate = localCertificate;
  }

  public AuthenticityEntities.Signer toProto() {
    AuthenticityEntities.Signer.Builder builder = AuthenticityEntities.Signer.newBuilder();

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
