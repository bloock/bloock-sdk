package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.RecordOuterClass;

public class SignerArgs {
  String privateKey;
  String commonName;

  public SignerArgs(String privateKey) {
    this.privateKey = privateKey;
  }

  public SignerArgs(String privateKey, String commonName) {
    this.privateKey = privateKey;
    this.commonName = commonName;
  }

  RecordOuterClass.SignerArgs toProto() {
    RecordOuterClass.SignerArgs.Builder builder = RecordOuterClass.SignerArgs
        .newBuilder()
        .setPrivateKey(privateKey);

    if (commonName != null) {
        builder.setCommonName(commonName);
    }

    return builder.build();
  }
}
