package com.bloock.sdk.entity.availability;

import com.bloock.sdk.bridge.proto.AvailabilityEntities;

public class PublisherArgs {
  AvailabilityEntities.PublisherArgs toProto() {
    return AvailabilityEntities.PublisherArgs.newBuilder().build();
  }
}
