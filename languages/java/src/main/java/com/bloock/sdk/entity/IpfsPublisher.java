package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.AvailabilityEntities;
import com.bloock.sdk.bridge.proto.AvailabilityEntities.DataAvailabilityType;

public class IpfsPublisher implements Publisher {
  DataAvailabilityType type;
  PublisherArgs args;

  public IpfsPublisher() {
    this.type = DataAvailabilityType.IPFS;
    this.args = new PublisherArgs();
  }

  @Override
  public AvailabilityEntities.Publisher toProto() {
    return AvailabilityEntities.Publisher.newBuilder()
        .setType(this.type)
        .setArgs(this.args.toProto())
        .build();
  }
}
