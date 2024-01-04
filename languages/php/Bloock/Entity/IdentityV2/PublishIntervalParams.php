<?php

namespace Bloock\Entity\IdentityV2;

class PublishIntervalParams
{
    const Interval1 = 1;
    const Interval5 = 5;
    const Interval15 = 15;
    const Interval60 = 60;

    public static function toProto(int $type): int
    {
        switch ($type) {
            case PublishIntervalParams::Interval1:
                return \Bloock\PublishInterval::INTERVAL_1;
            case PublishIntervalParams::Interval5:
                return \Bloock\PublishInterval::INTERVAL_5;
            case PublishIntervalParams::Interval15:
                return \Bloock\PublishInterval::INTERVAL_15;
            case PublishIntervalParams::Interval60:
                return \Bloock\PublishInterval::INTERVAL_60;
            default:
                return \Bloock\PublishInterval::INTERVAL_60;
        }
    }

    public static function fromProto(int $alg): int
    {
        switch ($alg) {
            case \Bloock\PublishInterval::INTERVAL_1:
                return PublishIntervalParams::Interval1;
            case \Bloock\PublishInterval::INTERVAL_5:
                return PublishIntervalParams::Interval5;
            case \Bloock\PublishInterval::INTERVAL_15:
                return PublishIntervalParams::Interval15;
            case \Bloock\PublishInterval::INTERVAL_60:
                return PublishIntervalParams::Interval60;
            default:
                return PublishIntervalParams::Interval60;
        }
    }
}
