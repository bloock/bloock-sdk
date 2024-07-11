package com.bloock.sdk.entity.availability;

import com.bloock.sdk.bridge.proto.BloockAvailabilityEntities;

/**
 * Represents the arguments for a data loader.
 */
public class LoaderArgs {
  /**
   * Is a unique identifier associated with the loader.
   */
  String id;

  /**
   * Constructs a LoaderArgs object with the specified parameters.
   * 
   * @param id
   */
  public LoaderArgs(String id) {
    this.id = id;
  }

  public BloockAvailabilityEntities.LoaderArgs toProto() {
    return BloockAvailabilityEntities.LoaderArgs.newBuilder().setId(this.id).build();
  }
}
