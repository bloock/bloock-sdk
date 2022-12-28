package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.RecordOuterClass;
import com.bloock.sdk.bridge.proto.RecordOuterClass.DataAvailabilityType;

public class IpfsLoader implements Loader {
  DataAvailabilityType type;
  LoaderArgs args;

  public IpfsLoader(String hash) {
    type = DataAvailabilityType.IPFS;
    args = new LoaderArgs(hash);
  }

  public RecordOuterClass.Loader toProto() {
    return RecordOuterClass.Loader.newBuilder()
        .setType(this.type)
        .setArgs(this.args.toProto())
        .build();
  }
}
