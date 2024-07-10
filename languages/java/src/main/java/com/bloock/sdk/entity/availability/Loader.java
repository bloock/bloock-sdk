package com.bloock.sdk.entity.availability;

import com.bloock.sdk.bridge.proto.BloockAvailabilityEntities;

public interface Loader {
  BloockAvailabilityEntities.Loader toProto();
}
