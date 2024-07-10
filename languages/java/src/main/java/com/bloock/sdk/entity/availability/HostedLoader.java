package com.bloock.sdk.entity.availability;

import com.bloock.sdk.bridge.proto.BloockAvailabilityEntities;
import com.bloock.sdk.bridge.proto.BloockAvailabilityEntities.DataAvailabilityType;

/**
 * Represents a loader for hosted data availability.
 */
public class HostedLoader implements Loader {
  DataAvailabilityType type;
  LoaderArgs args;

  /**
   * Constructs a HostedLoader object with the specified parameters.
   * 
   * @param id
   */
  public HostedLoader(String id) {
    type = DataAvailabilityType.HOSTED;
    args = new LoaderArgs(id);
  }

  public BloockAvailabilityEntities.Loader toProto() {
    return BloockAvailabilityEntities.Loader.newBuilder()
        .setType(this.type)
        .setArgs(this.args.toProto())
        .build();
  }
}
