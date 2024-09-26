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
   * Constructs a publisher for IPNS data availability with creation option.
   */
  public IpnsPublisher() {
    this.type = DataAvailabilityType.IPNS;
    this.args = new PublisherArgs();
  }

  /**
   * Constructs a publisher for IPNS data availability with update option.
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
