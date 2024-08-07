import { PublishInterval } from "../../bridge/proto/bloock_identity_entities";

/**
 * Represents different publish intervals.
 */
export enum PublishIntervalParams {
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
  Interval60
}

export namespace PublishIntervalParams {
  export function toProto(type: PublishIntervalParams): PublishInterval {
    switch (type) {
      case PublishIntervalParams.Interval5:
        return PublishInterval.INTERVAL_5;
      case PublishIntervalParams.Interval15:
        return PublishInterval.INTERVAL_15;
      case PublishIntervalParams.Interval60:
        return PublishInterval.INTERVAL_60;
      default:
        return PublishInterval.INTERVAL_60;
    }
  }

  export function fromProto(
    type: PublishInterval | undefined
  ): PublishIntervalParams {
    switch (type) {
      case PublishInterval.INTERVAL_5:
        return PublishIntervalParams.Interval5;
      case PublishInterval.INTERVAL_15:
        return PublishIntervalParams.Interval15;
      case PublishInterval.INTERVAL_60:
        return PublishIntervalParams.Interval60;
      default:
        return PublishIntervalParams.Interval60;
    }
  }
}
