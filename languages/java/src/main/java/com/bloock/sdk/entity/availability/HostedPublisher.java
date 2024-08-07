package com.bloock.sdk.entity.availability;

import com.bloock.sdk.bridge.proto.BloockAvailabilityEntities;
import com.bloock.sdk.bridge.proto.BloockAvailabilityEntities.DataAvailabilityType;

/**
 * Represents a publisher for hosted data availability.
 */
public class HostedPublisher implements Publisher {
  DataAvailabilityType type;
  PublisherArgs args;

  /**
   * Constructs a HostedPublisher object with the specified parameters.
   */
  public HostedPublisher() {
    this.type = DataAvailabilityType.HOSTED;
    this.args = new PublisherArgs();
  }

  @Override
  public BloockAvailabilityEntities.Publisher toProto() {
    return BloockAvailabilityEntities.Publisher.newBuilder()
        .setType(this.type)
        .setArgs(this.args.toProto())
        .build();
  }
}
