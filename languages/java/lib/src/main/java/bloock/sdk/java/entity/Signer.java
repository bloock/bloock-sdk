package bloock.sdk.java.entity;

import bloock.sdk.java.bridge.proto.RecordOuterClass;

public interface Signer {
  RecordOuterClass.Signer toProto();
}

class EcsdaSigner implements Signer {
  RecordOuterClass.SignerAlg alg;
  SignerArgs args;

  EcsdaSigner(RecordOuterClass.SignerAlg alg, SignerArgs args) {
    this.alg = alg;
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

class SignerArgs {
  String privateKey;

  SignerArgs(String privateKey) {
    this.privateKey = privateKey;
  }

  RecordOuterClass.SignerArgs toProto() {
    return RecordOuterClass.SignerArgs.newBuilder().setPrivateKey(privateKey).build();
  }
}
