package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.RecordOuterClass;

public class LoaderArgs {
  String hash;

  public LoaderArgs(String hash) {
    this.hash = hash;
  }

  public RecordOuterClass.LoaderArgs toProto() {
    return RecordOuterClass.LoaderArgs.newBuilder().setHash(this.hash).build();
  }
}
