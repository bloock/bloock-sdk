package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.RecordOuterClass;
import com.bloock.sdk.bridge.proto.RecordOuterClass.DataAvailabilityType;

public class IpfsPublisher implements Publisher {
  DataAvailabilityType type;
  PublisherArgs args;

  public IpfsPublisher() {
    this.type = DataAvailabilityType.IPFS;
    this.args = new PublisherArgs();
  }

  @Override
  public RecordOuterClass.Publisher toProto() {
    return RecordOuterClass.Publisher.newBuilder()
        .setType(this.type)
        .setArgs(this.args.toProto())
        .build();
  }
}
