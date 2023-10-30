package com.bloock.sdk.entity.authenticity;

import com.bloock.sdk.bridge.proto.AuthenticityEntities;

public class Signer {
  SignerArgs args;

  public Signer(SignerArgs args) {
    this.args = args;
  }

  public AuthenticityEntities.Signer toProto() {
    AuthenticityEntities.Signer.Builder builder = AuthenticityEntities.Signer.newBuilder();

    if (this.args.localKey != null) {
      builder.setLocalKey(this.args.localKey.toProto());
    }

    if (this.args.managedKey != null) {
      builder.setManagedKey(this.args.managedKey.toProto());
    }

    if (this.args.commonName != null) {
      builder.setCommonName(this.args.commonName);
    }

    if (this.args.managedCertificate != null) {
      builder.setManagedCertificate(this.args.managedCertificate.toProto());
    }

    if (this.args.localCertificate != null) {
      builder.setLocalCertificate(this.args.localCertificate.toProto());
    }

    return builder.build();
  }
}
