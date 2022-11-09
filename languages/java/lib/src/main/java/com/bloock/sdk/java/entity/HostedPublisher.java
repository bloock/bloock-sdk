package com.bloock.sdk.java.entity;

import com.bloock.sdk.java.bridge.proto.RecordOuterClass;
import com.bloock.sdk.java.bridge.proto.RecordOuterClass.DataAvailabilityType;

public class HostedPublisher implements Publisher {
  DataAvailabilityType type;
  PublisherArgs args;

  public HostedPublisher() {
    this.type = DataAvailabilityType.HOSTED;
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

class PublisherArgs {
  RecordOuterClass.PublisherArgs toProto() {
    return RecordOuterClass.PublisherArgs.newBuilder().build();
  }
}
