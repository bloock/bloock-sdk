package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2.PublishInterval;

public enum PublishIntervalParams {
  Interval1,
  Interval5,
  Interval15,
  Interval60;

  public static PublishIntervalParams fromProto(PublishInterval type) {
    switch (type) {
      case INTERVAL_1:
        return PublishIntervalParams.Interval1;
      case INTERVAL_5:
        return PublishIntervalParams.Interval5;
      case INTERVAL_15:
        return PublishIntervalParams.Interval15;
      case INTERVAL_60:
        return PublishIntervalParams.Interval60;
      default:
        return PublishIntervalParams.Interval60;
    }
  }

  public PublishInterval toProto() {
    switch (this) {
      case Interval1:
        return PublishInterval.INTERVAL_1;
      case Interval5:
        return PublishInterval.INTERVAL_5;
      case Interval15:
        return PublishInterval.INTERVAL_15;
      case Interval60:
        return PublishInterval.INTERVAL_60;
      default:
        return PublishInterval.UNRECOGNIZED;
    }
  }
}
