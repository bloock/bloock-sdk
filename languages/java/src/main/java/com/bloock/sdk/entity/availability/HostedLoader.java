package com.bloock.sdk.entity.availability;

import com.bloock.sdk.bridge.proto.AvailabilityEntities;
import com.bloock.sdk.bridge.proto.AvailabilityEntities.DataAvailabilityType;

public class HostedLoader implements Loader {
  DataAvailabilityType type;
  LoaderArgs args;

  public HostedLoader(String id) {
    type = DataAvailabilityType.HOSTED;
    args = new LoaderArgs(id);
  }

  public AvailabilityEntities.Loader toProto() {
    return AvailabilityEntities.Loader.newBuilder()
        .setType(this.type)
        .setArgs(this.args.toProto())
        .build();
  }
}
