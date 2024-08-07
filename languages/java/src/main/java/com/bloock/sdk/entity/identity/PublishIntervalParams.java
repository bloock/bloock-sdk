package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.BloockIdentityEntities.PublishInterval;

/**
 * Represents different publish intervals.
 */
public enum PublishIntervalParams {
  /**
   * Represents a 5-minute publish interval.
   */
  Interval5,
  /**
   * Represents a 15-minute publish interval.
   */
  Interval15,
  /**
   * Represents a 60-minute publish interval.
   */
  Interval60;

  public static PublishIntervalParams fromProto(PublishInterval type) {
    switch (type) {
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
