package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.RecordOuterClass;
import com.bloock.sdk.bridge.proto.RecordOuterClass.DataAvailabilityType;

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
