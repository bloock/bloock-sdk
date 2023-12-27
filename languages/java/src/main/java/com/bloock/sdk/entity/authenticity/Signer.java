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

  HashAlg hashAlg;

  public Signer(LocalKey localKey) {
    this.localKey = localKey;
  }

  public Signer(LocalKey localKey, HashAlg hashAlg) {
    this.localKey = localKey;
    this.hashAlg = hashAlg;
  }

  public Signer(ManagedKey managedKey) {
    this.managedKey = managedKey;
  }

  public Signer(ManagedKey managedKey, HashAlg hashAlg) {
    this.managedKey = managedKey;
    this.hashAlg = hashAlg;
  }

  public Signer(ManagedCertificate managedCertificate) {
    this.managedCertificate = managedCertificate;
  }

  public Signer(ManagedCertificate managedCertificate, HashAlg hashAlg) {
    this.managedCertificate = managedCertificate;
    this.hashAlg = hashAlg;
  }

  public Signer(LocalCertificate localCertificate) {
    this.localCertificate = localCertificate;
  }

  public Signer(LocalCertificate localCertificate, HashAlg hashAlg) {
    this.localCertificate = localCertificate;
    this.hashAlg = hashAlg;
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

    if (this.hashAlg != null) {
      builder.setHashAlg(this.hashAlg.toProto());
    }

    return builder.build();
  }
}
