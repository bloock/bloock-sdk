package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.RecordOuterClass;
import com.bloock.sdk.bridge.proto.RecordOuterClass.SignerAlg;

public class EcsdaSigner implements Signer {
  RecordOuterClass.SignerAlg alg;
  SignerArgs args;

  public EcsdaSigner(String privateKey) {
    this.alg = SignerAlg.ES256K;
    this.args = new SignerArgs(privateKey);
  }

  public EcsdaSigner(SignerArgs args) {
    this.alg = SignerAlg.ES256K;
    this.args = args;
  }

  @Override
  public RecordOuterClass.Signer toProto() {
    return RecordOuterClass.Signer.newBuilder()
        .setAlg(this.alg)
        .setArgs(this.args.toProto())
        .build();
  }
}
