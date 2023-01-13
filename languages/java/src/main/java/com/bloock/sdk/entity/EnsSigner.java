package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.RecordOuterClass;
import com.bloock.sdk.bridge.proto.RecordOuterClass.SignerAlg;

public class EnsSigner implements Signer {
  RecordOuterClass.SignerAlg alg;
  SignerArgs args;

  public EnsSigner(String privateKey) {
    this.alg = SignerAlg.ENS;
    this.args = new SignerArgs(privateKey);
  }

  @Override
  public RecordOuterClass.Signer toProto() {
    return RecordOuterClass.Signer.newBuilder()
        .setAlg(this.alg)
        .setArgs(this.args.toProto())
        .build();
  }
}
