package com.bloock.sdk.java.entity;

import com.bloock.sdk.java.bridge.proto.RecordOuterClass;
import com.bloock.sdk.java.bridge.proto.RecordOuterClass.DataAvailabilityType;

public class HostedLoader implements Loader {
  DataAvailabilityType type;
  LoaderArgs args;

  public HostedLoader(String hash) {
    type = DataAvailabilityType.HOSTED;
    args = new LoaderArgs(hash);
  }

  public RecordOuterClass.Loader toProto() {
    return RecordOuterClass.Loader.newBuilder()
        .setType(this.type)
        .setArgs(this.args.toProto())
        .build();
  }
}

class LoaderArgs {
  String hash;

  public LoaderArgs(String hash) {
    this.hash = hash;
  }

  public RecordOuterClass.LoaderArgs toProto() {
    return RecordOuterClass.LoaderArgs.newBuilder().setHash(this.hash).build();
  }
}
