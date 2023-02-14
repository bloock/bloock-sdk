package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.AvailabilityEntities;

public class LoaderArgs {
  String id;

  public LoaderArgs(String id) {
    this.id = id;
  }

  public AvailabilityEntities.LoaderArgs toProto() {
    return AvailabilityEntities.LoaderArgs.newBuilder().setId(this.id).build();
  }
}
