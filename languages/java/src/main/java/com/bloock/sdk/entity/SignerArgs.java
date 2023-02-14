package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.AuthenticityEntities;

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

  AuthenticityEntities.SignerArgs toProto() {
    AuthenticityEntities.SignerArgs.Builder builder =
        AuthenticityEntities.SignerArgs.newBuilder().setPrivateKey(privateKey);

    if (commonName != null) {
      builder.setCommonName(commonName);
    }

    return builder.build();
  }
}
