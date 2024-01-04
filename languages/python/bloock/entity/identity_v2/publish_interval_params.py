from __future__ import annotations

from enum import Enum

import bloock._bridge.proto.identity_entities_v2_pb2 as proto


class PublishIntervalParams(Enum):
    Interval1 = 1
    Interval5 = 2
    Interval15 = 3
    Interval60 = 4

    def __int__(self):
        return self.value

    @staticmethod
    def from_proto(p: proto.PublishInterval.ValueType | None) -> PublishIntervalParams:
        if p == proto.PublishInterval.INTERVAL_1:
            return PublishIntervalParams.Interval1
        elif p == proto.PublishInterval.INTERVAL_5:
            return PublishIntervalParams.Interval5
        elif p == proto.PublishInterval.INTERVAL_15:
            return PublishIntervalParams.Interval15
        elif p == proto.PublishInterval.INTERVAL_60:
            return PublishIntervalParams.Interval60
        else:
            return PublishIntervalParams.Interval60

    def to_proto(self) -> proto.PublishInterval:
        if self == PublishIntervalParams.Interval1:
            return proto.PublishInterval.INTERVAL_1
        elif self == PublishIntervalParams.Interval5:
            return proto.PublishInterval.INTERVAL_5
        elif self == PublishIntervalParams.Interval15:
            return proto.PublishInterval.INTERVAL_15
        elif self == PublishIntervalParams.Interval60:
            return proto.PublishInterval.INTERVAL_60
        else:
            return proto.PublishInterval.INTERVAL_60