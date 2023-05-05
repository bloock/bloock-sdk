package com.bloock.sdk.entity.authenticity;

import com.bloock.sdk.bridge.proto.AuthenticityEntities;
import com.bloock.sdk.bridge.proto.AuthenticityEntities.SignerAlg;

public class EcdsaSigner implements Signer {
  AuthenticityEntities.SignerAlg alg;
  SignerArgs args;

  public EcdsaSigner(SignerArgs args) {
    this.alg = SignerAlg.ES256K;
    this.args = args;
  }

  @Override
  public AuthenticityEntities.Signer toProto() {
    AuthenticityEntities.Signer.Builder builder =
        AuthenticityEntities.Signer.newBuilder().setAlg(this.alg);

    if (this.args.localKey != null) {
      builder.setLocalKey(this.args.localKey.toProto());
    }

    if (this.args.managedKey != null) {
      builder.setManagedKey(this.args.managedKey.toProto());
    }

    if (this.args.commonName != null) {
      builder.setCommonName(this.args.commonName);
    }

    return builder.build();
  }
}
