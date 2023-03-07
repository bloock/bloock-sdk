package com.bloock.sdk.entity.availability;

import com.bloock.sdk.bridge.proto.AvailabilityEntities;

public interface Publisher {
    AvailabilityEntities.Publisher toProto();
}
