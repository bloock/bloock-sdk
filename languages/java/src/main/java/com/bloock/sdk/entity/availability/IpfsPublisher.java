package com.bloock.sdk.entity.availability;

import com.bloock.sdk.bridge.proto.AvailabilityEntities;
import com.bloock.sdk.bridge.proto.AvailabilityEntities.DataAvailabilityType;

/**
 * Represents a publisher for IPFS data availability.
 */
public class IpfsPublisher implements Publisher {
  DataAvailabilityType type;
  PublisherArgs args;

  /**
   * Constructs a IpfsPublisher object with the specified parameters.
   */
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
