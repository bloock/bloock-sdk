package com.bloock.sdk.java.entity;

import com.bloock.sdk.java.bridge.proto.RecordOuterClass;
import com.bloock.sdk.java.bridge.proto.RecordOuterClass.SignerAlg;

public class EcsdaSigner implements Signer {
  RecordOuterClass.SignerAlg alg;
  SignerArgs args;

  public EcsdaSigner(String privateKey) {
    this.alg = SignerAlg.ES256K;
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

class SignerArgs {
  String privateKey;

  SignerArgs(String privateKey) {
    this.privateKey = privateKey;
  }

  RecordOuterClass.SignerArgs toProto() {
    return RecordOuterClass.SignerArgs.newBuilder().setPrivateKey(privateKey).build();
  }
}
