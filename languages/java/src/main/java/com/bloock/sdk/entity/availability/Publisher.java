package com.bloock.sdk.entity.availability;

import com.bloock.sdk.bridge.proto.BloockAvailabilityEntities;

public interface Publisher {
  BloockAvailabilityEntities.Publisher toProto();
}
