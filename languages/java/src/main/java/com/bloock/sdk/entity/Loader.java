package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.AvailabilityEntities;

public interface Loader {
  AvailabilityEntities.Loader toProto();
}
