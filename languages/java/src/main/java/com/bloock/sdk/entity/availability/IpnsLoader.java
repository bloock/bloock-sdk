package com.bloock.sdk.entity.availability;

import com.bloock.sdk.bridge.proto.BloockAvailabilityEntities;
import com.bloock.sdk.bridge.proto.BloockAvailabilityEntities.DataAvailabilityType;

/**
 * Represents a loader for IPNS data availability.
 */
public class IpnsLoader implements Loader {
  DataAvailabilityType type;
  LoaderArgs args;

  /**
   * Constructs a IpnsLoader object with the specified parameters.
   * 
   * @param id
   */
  public IpnsLoader(String id) {
    type = DataAvailabilityType.IPNS;
    args = new LoaderArgs(id);
  }

  public BloockAvailabilityEntities.Loader toProto() {
    return BloockAvailabilityEntities.Loader.newBuilder()
        .setType(this.type)
        .setArgs(this.args.toProto())
        .build();
  }
}
