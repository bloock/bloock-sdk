package com.bloock.sdk.entity.availability;

import com.bloock.sdk.bridge.proto.BloockAvailabilityEntities;

/**
 * Represents the arguments for a data publisher.
 */
public class PublisherArgs {
  BloockAvailabilityEntities.PublisherArgs toProto() {
    return BloockAvailabilityEntities.PublisherArgs.newBuilder().build();
  }
}
