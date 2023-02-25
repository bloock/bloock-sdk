package com.bloock.sdk.entity.authenticity;

import com.bloock.sdk.bridge.proto.AuthenticityEntities;
import com.bloock.sdk.bridge.proto.AuthenticityEntities.SignerAlg;

public class EcdsaSigner implements Signer {
  AuthenticityEntities.SignerAlg alg;
  SignerArgs args;

  public EcdsaSigner(String privateKey) {
    this.alg = SignerAlg.ES256K;
    this.args = new SignerArgs(privateKey);
  }

  public EcdsaSigner(SignerArgs args) {
    this.alg = SignerAlg.ES256K;
    this.args = args;
  }

  @Override
  public AuthenticityEntities.Signer toProto() {
    return AuthenticityEntities.Signer.newBuilder()
        .setAlg(this.alg)
        .setArgs(this.args.toProto())
        .build();
  }
}
