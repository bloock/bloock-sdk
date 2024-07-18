package com.bloock.sdk.entity.availability;

import com.bloock.sdk.bridge.proto.BloockAvailabilityEntities;
import com.bloock.sdk.bridge.proto.BloockAvailabilityEntities.DataAvailabilityType;

/**
 * Represents a publisher for IPNS data availability.
 */
public class IpnsPublisher implements Publisher {
  DataAvailabilityType type;
  PublisherArgs args;

  /**
   * Constructs a IpnsPublisher object with the specified parameters.
   */
  public IpnsPublisher(IpnsKey ipnsKey) {
    this.type = DataAvailabilityType.IPNS;
    this.args = new PublisherArgs(ipnsKey);
  }

  @Override
  public BloockAvailabilityEntities.Publisher toProto() {
    return BloockAvailabilityEntities.Publisher.newBuilder()
        .setType(this.type)
        .setArgs(this.args.toProto())
        .build();
  }
}
