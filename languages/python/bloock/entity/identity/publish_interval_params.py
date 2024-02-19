from __future__ import annotations

from enum import Enum

import bloock._bridge.proto.identity_entities_pb2 as proto


class PublishIntervalParams(Enum):
    """
    Represents different publish intervals.
    """
    Interval5 = 2
    """
    Represents a 5-minute publish interval.
    """
    Interval15 = 3
    """
    Represents a 15-minute publish interval.
    """
    Interval60 = 4
    """
    Represents a 60-minute publish interval.
    """

    def __int__(self):
        return self.value

    @staticmethod
    def from_proto(p: proto.PublishInterval.ValueType | None) -> PublishIntervalParams:
        if p == proto.PublishInterval.INTERVAL_5:
            return PublishIntervalParams.Interval5
        elif p == proto.PublishInterval.INTERVAL_15:
            return PublishIntervalParams.Interval15
        elif p == proto.PublishInterval.INTERVAL_60:
            return PublishIntervalParams.Interval60
        else:
            return PublishIntervalParams.Interval60

    def to_proto(self) -> proto.PublishInterval:
        if self == PublishIntervalParams.Interval5:
            return proto.PublishInterval.INTERVAL_5
        elif self == PublishIntervalParams.Interval15:
            return proto.PublishInterval.INTERVAL_15
        elif self == PublishIntervalParams.Interval60:
            return proto.PublishInterval.INTERVAL_60
        else:
            return proto.PublishInterval.INTERVAL_60