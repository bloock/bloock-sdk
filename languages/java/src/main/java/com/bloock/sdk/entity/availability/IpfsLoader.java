package com.bloock.sdk.entity.availability;

import com.bloock.sdk.bridge.proto.BloockAvailabilityEntities;
import com.bloock.sdk.bridge.proto.BloockAvailabilityEntities.DataAvailabilityType;

/**
 * Represents a loader for IPFS data availability.
 */
public class IpfsLoader implements Loader {
  DataAvailabilityType type;
  LoaderArgs args;

  /**
   * Constructs a IpfsLoader object with the specified parameters.
   * 
   * @param id
   */
  public IpfsLoader(String id) {
    type = DataAvailabilityType.IPFS;
    args = new LoaderArgs(id);
  }

  public BloockAvailabilityEntities.Loader toProto() {
    return BloockAvailabilityEntities.Loader.newBuilder()
        .setType(this.type)
        .setArgs(this.args.toProto())
        .build();
  }
}
